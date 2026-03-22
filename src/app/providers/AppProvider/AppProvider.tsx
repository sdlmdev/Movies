import { Suspense } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { ScreenSpinner } from '@vkontakte/vkui';
import { I18nextProvider } from 'react-i18next';
import i18nConfig from '@shared/lib/i18n/config';
import { CompareProvider } from '../CompareProvider';
import { ErrorBoundary } from '../ErrorBoundary';
import { FavoritesProvider } from '../FavoritesProvider';
import { QueryProvider } from '../QueryProvider';
import { VKUIProvider } from '../VKUIProvider';

interface AppProviderProps {
	children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps): ReactElement => {
	return (
		<QueryProvider>
			<VKUIProvider>
				<I18nextProvider i18n={i18nConfig} defaultNS="translation">
					<ErrorBoundary>
						<Suspense fallback={<ScreenSpinner state="loading" />}>
							<FavoritesProvider>
								<CompareProvider>{children}</CompareProvider>
							</FavoritesProvider>
						</Suspense>
					</ErrorBoundary>
				</I18nextProvider>
			</VKUIProvider>
		</QueryProvider>
	);
};
