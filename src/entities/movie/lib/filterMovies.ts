import type { Movie, MovieFilters, RatingProvider } from '../model/types';
import { getPrimaryRating } from './getRatings';
import { movieMatchesAgeRatingFilters, movieMatchesIsSeriesFilter } from './movieFilterValues';

type Filters = Omit<MovieFilters, 'page' | 'limit'>;

export const movieMatchesFilters = (
	movie: Movie,
	filters: Filters,
	ratingProvider: RatingProvider,
): boolean => {
	if (filters.query) {
		const q = filters.query.toLowerCase();
		const name = movie.name?.toLowerCase() ?? '';
		const altName = movie.alternativeName?.toLowerCase() ?? '';

		if (!name.includes(q) && !altName.includes(q)) {
			return false;
		}
	}

	if (filters.genres && filters.genres.length > 0) {
		const movieGenres = movie.genres?.map((g) => g.name.toLowerCase()) ?? [];
		const someMatch = filters.genres.some((g) => movieGenres.includes(g.toLowerCase()));

		if (!someMatch) {
			return false;
		}
	}

	if (filters.countries && filters.countries.length > 0) {
		const movieCountries = movie.countries?.map((c) => c.name.toLowerCase()) ?? [];
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
		const year = movie.year ?? 0;

		if (filters.yearFrom !== undefined && year < filters.yearFrom) {
			return false;
		}

		if (filters.yearTo !== undefined && year > filters.yearTo) {
			return false;
		}
	}

	return true;
};
