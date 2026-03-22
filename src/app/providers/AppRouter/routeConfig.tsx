import type { RouteObject } from 'react-router';
import { FavoritesPageAsync as FavoritesPage } from '@pages/favorites/FavoritesPage.async';
import { MovieDetailPageAsync as MovieDetailPage } from '@pages/movie-detail/MovieDetailPage.async';
import { MoviesListPageAsync as MoviesListPage } from '@pages/movies-list/MoviesListPage.async';
import { NotFoundPageAsync as NotFoundPage } from '@pages/not-found/NotFoundPage.async';
import {
	AppRoutes,
	type AppRoutesType,
	getRouteFavorites,
	getRouteMain,
	getRouteMovie,
	getRouteNotFound,
} from '@shared/constants/router';

export type AppRoutesProps = RouteObject;

export const routeConfig: Record<AppRoutesType, AppRoutesProps> = {
	[AppRoutes.MAIN]: {
		path: getRouteMain(),
		element: <MoviesListPage />,
	},
	[AppRoutes.MOVIE]: {
		path: getRouteMovie(':id'),
		element: <MovieDetailPage />,
	},
	[AppRoutes.FAVORITES]: {
		path: getRouteFavorites(),
		element: <FavoritesPage />,
	},
	[AppRoutes.NOT_FOUND]: {
		path: getRouteNotFound(),
		element: <NotFoundPage />,
	},
};
