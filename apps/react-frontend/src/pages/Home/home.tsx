import { FC, useState } from 'react';

import { Patient } from '@mono-repo/api-clients/patient-api';
import { Form, Table } from '@mono-repo/ui-shared';
import { usePatients } from '@mono-repo/api';
import { PageWrapper } from './styles';

export const HomePage: FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient>();
  const { data: patients } = usePatients();

  const handleSelectedPatient = (patient: Patient | undefined) => setSelectedPatient(patient);

  return (
    <PageWrapper>
      <Form />
      <Table
        patients={patients}
        onRowClick={(patient) => handleSelectedPatient(patient)}
        selectedPatient={selectedPatient}
      />
    </PageWrapper>
  );
};
