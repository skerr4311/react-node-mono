import { FC, useState } from 'react';

import { Patient } from '@mono-repo/api-clients/patient-api';
import { Form, Table } from '@mono-repo/ui-shared';
import { usePatients } from '@mono-repo/api';
import { PageWrapper } from './styles';
import { initialValues } from './initialFormValues';

export const HomePage: FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient>(initialValues);
  const { data: patients } = usePatients();

  const handleSelectedPatient = (patient: Patient | undefined) =>
    setSelectedPatient(() => (patient ? patient : initialValues));

  return (
    <PageWrapper>
      <Form
        patient={selectedPatient}
        onSubmit={(action, patient) => {
          console.log(action);
        }}
      />
      <Table
        patients={patients}
        onRowClick={(patient) => handleSelectedPatient(patient)}
        selectedPatient={selectedPatient}
      />
    </PageWrapper>
  );
};
