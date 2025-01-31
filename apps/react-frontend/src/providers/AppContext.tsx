import { createContext } from 'react';

import { Config, getConfig } from '../configuration';

export type AppContextProps = {
  config: Config;
};

const makeContext = (): AppContextProps => {
  // change to window.process.env if not using vite
  const config = getConfig(import.meta.env);
  return { config };
};

export const defaultContext = makeContext();
export const AppContext = createContext<AppContextProps>(defaultContext);
