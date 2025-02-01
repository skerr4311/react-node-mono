import { FC, useState } from 'react';

import { Patient, PatientInput } from '@mono-repo/api-clients/patient-api';
import { Form, Table } from '@mono-repo/ui-shared';
import { usePatients } from '@mono-repo/api';
import { PageWrapper } from './styles';
import { initialValues } from './initialFormValues';

export const HomePage: FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient>(initialValues);
  const { data: patients, refetch } = usePatients();

  const handleSelectedPatient = (patient: Patient | undefined) =>
    setSelectedPatient(() => (patient ? patient : initialValues));

  const handleNewPatient = (patient: PatientInput) => {
    console.log(patient);
  };

  const handleDeletePatient = (id: string) => {
    console.log(id);
  };

  const handleUpdatePatient = (patient: Patient) => {
    console.log(patient);
  };

  const handleClearForm = () => handleSelectedPatient(undefined);

  return (
    <PageWrapper>
      <Form
        patient={selectedPatient}
        onSubmit={(action, patient) => {
          if (action === 'new') handleNewPatient(patient as PatientInput);
          if (action === 'delete') handleDeletePatient(patient.id as string);
          if (action === 'update') handleUpdatePatient(patient as Patient);
          if (action === 'clear') handleClearForm();
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
