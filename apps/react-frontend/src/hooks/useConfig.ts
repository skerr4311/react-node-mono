import { useContext } from 'react';
import { AppContext, AppContextProps } from '../providers/AppContext';

export const useConfig = (): AppContextProps['config'] => {
  const { config } = useContext(AppContext);
  return config;
};
