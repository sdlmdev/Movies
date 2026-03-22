export const getRouteMain = () => '/';
export const getRouteMovie = (id: string | number) => `/movie/${id}`;
export const getRouteFavorites = () => '/favorites';
export const getRouteNotFound = () => '*';

export const AppRoutes = {
	MAIN: 'main',
	MOVIE: 'movie',
	FAVORITES: 'favorites',
	NOT_FOUND: 'not_found',
} as const;

export type AppRoutesType = (typeof AppRoutes)[keyof typeof AppRoutes];
