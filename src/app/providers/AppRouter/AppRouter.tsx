import { createBrowserRouter, RouterProvider } from 'react-router';
import { PageError } from '@widgets/PageError';
import { AppLayout } from '../../ui/AppLayout';
import { routeConfig } from './routeConfig';

const router = createBrowserRouter(
	[
		{
			element: <AppLayout />,
			errorElement: <PageError />,
			children: Object.values(routeConfig),
		},
	],
	{
		basename: import.meta.env.BASE_URL,
	},
);

export const AppRouter = () => {
	return <RouterProvider router={router} />;
};
