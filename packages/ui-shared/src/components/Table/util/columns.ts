import { Patient } from '@mono-repo/api-clients/patient-api';

type PatientIdType = keyof Patient | keyof NonNullable<Patient['contactInfo']>;

interface Column {
  id: PatientIdType;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (date: Date) => string;
}

export const columns: readonly Column[] = [
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
