import { useMutation } from 'react-query';
import { useApiConnector } from '../api';

// Delete a patient
export function useDeletePatient() {
  const { patient } = useApiConnector();

  return useMutation(async (id: string) => {
    const response = await patient.deletePatient(id);
    return response;
  });
}
