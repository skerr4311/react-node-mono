import { FC, useState } from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

import { Patient } from '@mono-repo/api-clients/patient-api';

import { columns, getDiagnosisColor } from './util';
import { EmptyWrapper } from './styles';

interface TableProps {
  patients: Patient[];
  onRowClick: (patient: Patient) => void;
  selectedPatient?: Patient;
}

export const Table: FC<TableProps> = ({ patients, onRowClick, selectedPatient }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <MuiTable stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((patient) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={patient.id}
                  onClick={() => onRowClick(patient)}
                  selected={selectedPatient?.id === patient.id}
                >
                  {columns.map((column) => {
                    const value =
                      column.id === 'email' || column.id === 'phone'
                        ? patient.contactInfo[column.id]
                        : patient[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{
                          ...(column.id === 'adhdDiagnosis'
                            ? { backgroundColor: getDiagnosisColor(patient.adhdDiagnosis), color: 'white' }
                            : {}),
                        }}
                      >
                        {typeof value === 'string' ? value : column.format ? column.format(value) : ''}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MuiTable>
      </TableContainer>
      {patients.length > 10 && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={patients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
      {patients.length === 0 && (
        <EmptyWrapper>
          <Typography variant="h6">You have no patients at this stage. Please add one.</Typography>
        </EmptyWrapper>
      )}
    </Paper>
  );
};
