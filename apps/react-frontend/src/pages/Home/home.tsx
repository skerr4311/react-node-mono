import { FC, useState } from 'react';

import { Patient } from '@mono-repo/api-clients/patient-api';
import { Table } from '@mono-repo/ui-shared';
import { usePatients } from '@mono-repo/api';

export const HomePage: FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient>();
  const { data: patients } = usePatients();

  const handleSelectedPatient = (patient: Patient | undefined) => setSelectedPatient(patient);

  return (
    <Table
      patients={patients}
      onRowClick={(patient) => handleSelectedPatient(patient)}
      selectedPatient={selectedPatient}
    />
  );
};
