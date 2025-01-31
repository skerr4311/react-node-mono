import { useQuery, UseQueryOptions } from 'react-query';
import { useApiConnector } from '../api';
import { QueryKeys } from './queryKeys';

import { Patient } from '@mono-repo/api-clients/patient-api';

// Fetch all patients
export function usePatients(queryOptions?: UseQueryOptions<Patient[]>) {
  const { patient } = useApiConnector();

  const query = useQuery<Patient[]>(QueryKeys.patients(), () => patient.getPatients(), {
    ...queryOptions,
  });
  return {
    ...query,
    data: query.data || [],
  };
}
