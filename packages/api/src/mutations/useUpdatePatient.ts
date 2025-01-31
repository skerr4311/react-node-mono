import { useMutation } from 'react-query';
import { useApiConnector } from '../api';

// Types
import { PatientInput } from '@mono-repo/api-clients/patient-api';

// Update an existing patient
export function useUpdatePatient() {
  const { patient } = useApiConnector();

  return useMutation(async ({ id, payload }: { id: string; payload: PatientInput }) => {
    const response = await patient.updatePatient(id, payload);
    return response;
  });
}
