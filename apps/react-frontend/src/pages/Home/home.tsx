import { FC, useEffect, useState } from 'react';

import { Patient, PatientInput } from '@mono-repo/api-clients/patient-api';
import { Form, Table } from '@mono-repo/ui-shared';
import { useCreatePatient, useDeletePatient, usePatients, useUpdatePatient } from '@mono-repo/api';
import { PageWrapper } from './styles';
import { initialValues } from './initialFormValues';

export const HomePage: FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient>(initialValues);
  const [patients, setPatients] = useState<Patient[]>([]);

  const { data: fetchPatients } = usePatients();
  const { mutateAsync: saveNewPatient } = useCreatePatient();
  const { mutateAsync: deletePatient } = useDeletePatient();
  const { mutateAsync: updatePatient } = useUpdatePatient();

  const handleSelectedPatient = (patient: Patient | undefined) =>
    setSelectedPatient(() => (patient ? patient : initialValues));

  const handleClearForm = () => handleSelectedPatient(undefined);

  const handleNewPatient = async (newPatient: PatientInput, resetForm: () => void) => {
    const insertedPatient = await saveNewPatient(newPatient);
    setPatients((patients) => [insertedPatient, ...patients]);
    resetForm();
  };

  const handleDeletePatient = async (id: string) => {
    await deletePatient(id);
    setPatients((patients) => patients.filter((patient) => patient.id !== id));
    handleClearForm();
  };

  const handleUpdatePatient = async (patient: Patient) => {
    const { id, ...patientUpdatedetails } = patient;
    const updatedPatient = await updatePatient({ id, payload: patientUpdatedetails });
    setPatients((patients) =>
      patients.map((patient) => {
        if (updatedPatient.id === patient.id) return updatedPatient;
        return patient;
      }),
    );
    handleClearForm();
  };

  useEffect(() => {
    if (fetchPatients.length) {
      setPatients(fetchPatients);
    }
  }, [fetchPatients]);

  return (
    <PageWrapper>
      <Form
        patient={selectedPatient}
        onSubmit={(action, patient, resetForm) => {
          if (action === 'new') handleNewPatient(patient as PatientInput, resetForm);
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
