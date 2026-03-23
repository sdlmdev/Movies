import { useFavorites } from '@app/providers/FavoritesProvider/FavoritesContext';
import { useMoviesFilters } from '@features/movies-filters';
import { movieMatchesFilters } from '@entities/movie/lib/filterMovies';
import { sortMovies } from '@entities/movie/lib/sortMovies';
import { DEFAULT_RATING_PROVIDER, SORT_ORDERS } from '@shared/constants/api';

export const useFilteredFavorites = () => {
	const { favorites } = useFavorites();
	const { filters } = useMoviesFilters();
	const { sortBy, sortOrder } = filters;
	const ratingProvider = filters.ratingProvider ?? DEFAULT_RATING_PROVIDER;

	const filtered = favorites.filter((movie) => movieMatchesFilters(movie, filters, ratingProvider));

	return {
		movies: sortMovies(filtered, sortBy, sortOrder ?? SORT_ORDERS.DESC, ratingProvider),
		ratingProvider,
	};
};
