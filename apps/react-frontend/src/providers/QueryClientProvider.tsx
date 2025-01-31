import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider as QCP } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

/* React-query client config. */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

interface QueryClientProviderProps {
  client?: QueryClient;
  showDevtools?: boolean;
}

export const QueryClientProvider = ({
  client = queryClient,
  showDevtools = false,
  children,
}: PropsWithChildren<QueryClientProviderProps>) => (
  <QCP client={client}>
    {showDevtools && <ReactQueryDevtools />}
    {children}
  </QCP>
);
