import { useMemo } from 'react';
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

type LocalFilterOp =
	| { type: 'query'; q: string }
	| { type: 'genres'; genres: Array<string> }
	| { type: 'countries'; countries: Array<string> }
	| { type: 'isSeries'; value: string }
	| { type: 'ageRating'; values: Array<string> }
	| { type: 'rating'; from?: number; to?: number }
	| { type: 'year'; from?: number; to?: number };

const buildLocalFilterOps = (filters: FavoritesFilters): Array<LocalFilterOp> => {
	const ops: Array<LocalFilterOp> = [];

	if (filters.query) {
		ops.push({ type: 'query', q: filters.query.toLowerCase() });
	}

	if (filters.genres && filters.genres.length > 0) {
		ops.push({
			type: 'genres',
			genres: filters.genres.map((g) => g.toLowerCase()),
		});
	}

	if (filters.countries && filters.countries.length > 0) {
		ops.push({
			type: 'countries',
			countries: filters.countries.map((c) => c.toLowerCase()),
		});
	}

	if (filters.isSeries && filters.isSeries.length > 0) {
		ops.push({ type: 'isSeries', value: filters.isSeries[0] });
	}

	if (filters.ageRating && filters.ageRating.length > 0) {
		ops.push({ type: 'ageRating', values: filters.ageRating });
	}

	if (filters.ratingFrom !== undefined || filters.ratingTo !== undefined) {
		ops.push({
			type: 'rating',
			from: filters.ratingFrom,
			to: filters.ratingTo,
		});
	}

	if (filters.yearFrom !== undefined || filters.yearTo !== undefined) {
		ops.push({
			type: 'year',
			from: filters.yearFrom,
			to: filters.yearTo,
		});
	}

	return ops;
};

const movieMatchesLocalFilterOp = (
	movie: Movie,
	op: LocalFilterOp,
	ratingProvider: RatingProvider,
): boolean => {
	switch (op.type) {
		case 'query': {
			const mName = movie.name?.toLowerCase() || '';
			const altName = movie.alternativeName?.toLowerCase() || '';

			return mName.includes(op.q) || altName.includes(op.q);
		}

		case 'genres': {
			const movieGenres = movie.genres?.map((g) => g.name.toLowerCase()) || [];

			return op.genres.some((g) => movieGenres.includes(g));
		}

		case 'countries': {
			const movieCountries = movie.countries?.map((c) => c.name.toLowerCase()) || [];

			return op.countries.some((c) => movieCountries.includes(c));
		}

		case 'isSeries': {
			return movieMatchesIsSeriesFilter(op.value, movie.isSeries);
		}

		case 'ageRating': {
			return movieMatchesAgeRatingFilters(op.values, movie.ageRating);
		}

		case 'rating': {
			const ratingItem = getPrimaryRating(movie.rating, ratingProvider);
			const ratingValue = ratingItem?.value ?? 0;

			if (op.from !== undefined && ratingValue < op.from) {
				return false;
			}

			if (op.to !== undefined && ratingValue > op.to) {
				return false;
			}

			return true;
		}

		case 'year': {
			const y = movie.year ?? 0;

			if (op.from !== undefined && y < op.from) {
				return false;
			}

			if (op.to !== undefined && y > op.to) {
				return false;
			}

			return true;
		}

		default: {
			return op;
		}
	}
};

const applyLocalFilters = (
	movies: Array<Movie>,
	filters: FavoritesFilters,
	ratingProvider: ReturnType<typeof useMoviesFilters>['ratingProvider'],
): Array<Movie> => {
	const ops = buildLocalFilterOps(filters);

	if (ops.length === 0) {
		return movies;
	}

	return movies.filter((movie) =>
		ops.every((op) => movieMatchesLocalFilterOp(movie, op, ratingProvider)),
	);
};

const FavoritesPage = () => {
	const t = useDictionary();
	const navigate = useNavigate();
	const { favorites } = useFavorites();
	const { filters, ratingProvider, sortBy, sortOrder } = useMoviesFilters();

	const processedFavorites = useMemo(() => {
		const filtered = applyLocalFilters(favorites, filters, ratingProvider);

		return sortMovies(filtered, sortBy, sortOrder, ratingProvider);
	}, [favorites, filters, ratingProvider, sortBy, sortOrder]);

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
