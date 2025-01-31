import { useQuery, UseQueryOptions } from 'react-query';
import { useApiConnector } from '../api';
import { QueryKeys } from './queryKeys';

// Types
import { Patient } from '@mono-repo/api-clients/patient-api';

// Fetch a single patient by ID
export function usePatient(id: string, queryOptions?: UseQueryOptions<Patient>) {
  const { patient } = useApiConnector();

  const query = useQuery<Patient>(QueryKeys.patient(id), () => patient.getPatientById(id), {
    ...queryOptions,
    enabled: !!id,
  });
  return {
    ...query,
    data: query.data,
  };
}
