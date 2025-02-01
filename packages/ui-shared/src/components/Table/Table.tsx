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
} from '@mui/material';

import { Patient, PatientAdhdDiagnosis } from '@mono-repo/api-clients/patient-api';

const diagnosisColors: Record<PatientAdhdDiagnosis, string> = {
  [PatientAdhdDiagnosis.Mild]: '#7AC74F', // Soft Green
  [PatientAdhdDiagnosis.Moderate]: '#F4C430', // Warm Yellow
  [PatientAdhdDiagnosis.Severe]: '#D32F2F', // Alert Red
};

const getDiagnosisColor = (diagnosis: string): string => {
  const matchedDiagnosis = PatientAdhdDiagnosis[diagnosis as keyof typeof PatientAdhdDiagnosis];
  return matchedDiagnosis ? diagnosisColors[matchedDiagnosis] : '#ffff';
};

type PatientIdType = keyof Patient | keyof NonNullable<Patient['contactInfo']>;

interface Column {
  id: PatientIdType;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (date: Date) => string;
}

const columns: readonly Column[] = [
  { id: 'fullName', label: 'Name', minWidth: 170 },
  { id: 'adhdDiagnosis', label: 'Diagnosis', minWidth: 100 },
  {
    id: 'dateOfBirth',
    label: 'DOB',
    minWidth: 170,
    align: 'right',
    format: (date: Date) => date.toLocaleDateString('en-GB'),
  },
  {
    id: 'phone',
    label: 'Phone',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
    align: 'right',
  },
];
interface TableProps {
  patients: Patient[];
}

export const Table: FC<TableProps> = ({ patients }) => {
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
                <TableRow hover role="checkbox" tabIndex={-1} key={patient.id}>
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={patients.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
