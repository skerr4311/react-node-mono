import React, { useContext } from 'react';

import * as Patient from '@mono-repo/api-clients/patient-api';

export const getApis = (apiUrl: string) => {
  const patientConfig = new Patient.Configuration({
    basePath: apiUrl,
  });

  return {
    // Patient API
    patient: new Patient.PatientsApi(patientConfig),
  };
};

export type Apis = ReturnType<typeof getApis>;

export const ApiContext = React.createContext<Apis | null>(null);

export const useApiConnector = () => {
  const apis = useContext(ApiContext);
  if (apis === null) {
    throw new Error('Called useApiConnector() outside of a context provider!');
  }

  return apis;
};
