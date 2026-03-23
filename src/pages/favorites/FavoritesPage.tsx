import { useNavigate } from 'react-router';
import { Icon56BookmarkOutline } from '@vkontakte/icons';
import { Group, Header, Placeholder } from '@vkontakte/vkui';
import { useFavorites } from '@app/providers/FavoritesProvider/FavoritesContext';
import {
	movieMatchesAgeRatingFilters,
	movieMatchesIsSeriesFilter,
	MovieVirtualGrid,
} from '@entities/movie';
import { getPrimaryRating } from '@entities/movie/lib/getRatings';
import { sortMovies } from '@entities/movie/lib/sortMovies';
import type { Movie, RatingProvider } from '@entities/movie/model/types';
import { getRouteMovie } from '@shared/constants/router';
import { useDictionary } from '@shared/hooks';
import { useMoviesFilters } from '../movies-list/model/useMoviesFilters';

type FavoritesFilters = Omit<ReturnType<typeof useMoviesFilters>['filters'], 'page' | 'limit'>;

const movieMatchesFilters = (
	movie: Movie,
	filters: FavoritesFilters,
	ratingProvider: RatingProvider,
): boolean => {
	if (filters.query) {
		const q = filters.query.toLowerCase();
		const mName = movie.name?.toLowerCase() || '';
		const altName = movie.alternativeName?.toLowerCase() || '';

		if (!mName.includes(q) && !altName.includes(q)) {
			return false;
		}
	}

	if (filters.genres && filters.genres.length > 0) {
		const movieGenres = movie.genres?.map((g) => g.name.toLowerCase()) || [];
		const someMatch = filters.genres.some((g) => movieGenres.includes(g.toLowerCase()));

		if (!someMatch) {
			return false;
		}
	}

	if (filters.countries && filters.countries.length > 0) {
		const movieCountries = movie.countries?.map((c) => c.name.toLowerCase()) || [];
		const someMatch = filters.countries.some((c) => movieCountries.includes(c.toLowerCase()));

		if (!someMatch) {
			return false;
		}
	}

	if (filters.isSeries && filters.isSeries.length > 0) {
		if (!movieMatchesIsSeriesFilter(filters.isSeries[0], movie.isSeries)) {
			return false;
		}
	}

	if (filters.ageRating && filters.ageRating.length > 0) {
		if (!movieMatchesAgeRatingFilters(filters.ageRating, movie.ageRating)) {
			return false;
		}
	}

	if (filters.ratingFrom !== undefined || filters.ratingTo !== undefined) {
		const ratingItem = getPrimaryRating(movie.rating, ratingProvider);
		const ratingValue = ratingItem?.value ?? 0;

		if (filters.ratingFrom !== undefined && ratingValue < filters.ratingFrom) {
			return false;
		}

		if (filters.ratingTo !== undefined && ratingValue > filters.ratingTo) {
			return false;
		}
	}

	if (filters.yearFrom !== undefined || filters.yearTo !== undefined) {
		const y = movie.year ?? 0;

		if (filters.yearFrom !== undefined && y < filters.yearFrom) {
			return false;
		}

		if (filters.yearTo !== undefined && y > filters.yearTo) {
			return false;
		}
	}

	return true;
};

const applyLocalFilters = (
	movies: Array<Movie>,
	filters: FavoritesFilters,
	ratingProvider: ReturnType<typeof useMoviesFilters>['ratingProvider'],
): Array<Movie> => {
	return movies.filter((movie) => movieMatchesFilters(movie, filters, ratingProvider));
};

const FavoritesPage = () => {
	const t = useDictionary();
	const navigate = useNavigate();
	const { favorites } = useFavorites();
	const { filters, ratingProvider, sortBy, sortOrder } = useMoviesFilters();

	const filtered = applyLocalFilters(favorites, filters, ratingProvider);
	const processedFavorites = sortMovies(filtered, sortBy, sortOrder, ratingProvider);

	if (!favorites.length) {
		return (
			<Placeholder icon={<Icon56BookmarkOutline />} title={t.favorites.empty}>
				{t.favorites.emptyHint}
			</Placeholder>
		);
	}

	return (
		<Group header={<Header>{t.common.favorites}</Header>}>
			{!processedFavorites.length ? (
				<Placeholder title={t.common.noResults} />
			) : (
				<MovieVirtualGrid
					movies={processedFavorites}
					ratingProvider={ratingProvider}
					onMovieClick={async (movie) => navigate(getRouteMovie(movie.id))}
				/>
			)}
		</Group>
	);
};

export default FavoritesPage;
