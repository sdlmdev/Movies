import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MINUTES_IN_HOUR, MS_IN_SECOND } from '@shared/constants/common';

interface QueryProviderProps {
	children: ReactNode;
}

const STALE_TIME_MINUTES = 5;
const STALE_TIME = STALE_TIME_MINUTES * MINUTES_IN_HOUR * MS_IN_SECOND;
const MAX_RETRIES = 3;

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: STALE_TIME,
			retry: MAX_RETRIES,
			refetchOnWindowFocus: false,
		},
	},
});

export const QueryProvider = ({ children }: QueryProviderProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			{import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
		</QueryClientProvider>
	);
};
