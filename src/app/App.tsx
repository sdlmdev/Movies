import { AppProvider, AppRouter } from './providers';

export const App = () => {
	return (
		<AppProvider>
			<AppRouter />
		</AppProvider>
	);
};
