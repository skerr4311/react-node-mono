import { useMutation } from 'react-query';
import { useApiConnector } from '../api';

// Types
import { PatientInput } from '@mono-repo/api-clients/patient-api';

// Create a new patient
export function useCreatePatient() {
  const { patient } = useApiConnector();

  return useMutation(async (payload: PatientInput) => {
    const response = await patient.createPatient(payload);
    return response;
  });
}
