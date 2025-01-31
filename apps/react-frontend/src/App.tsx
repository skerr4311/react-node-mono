import { FC, useMemo } from 'react';
import { useConfig } from './hooks';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from './pages/Home/home';
import { QueryClientProvider } from './providers';

import { ApiContext, getApis } from '@mono-repo/api';

const App: FC = () => {
  const { environment, apiEndpoint } = useConfig();
  const api = useMemo(() => getApis(apiEndpoint), [apiEndpoint]);

  return (
    <Router>
      <ApiContext.Provider value={api}>
        <QueryClientProvider showDevtools={environment === 'development'}>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </QueryClientProvider>
      </ApiContext.Provider>
    </Router>
  );
};

export default App;
