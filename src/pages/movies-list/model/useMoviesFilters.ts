import { useCallback } from 'react';
import { useSearchParams } from 'react-router';
import type {
	MovieFilters,
	RatingProvider,
	SortField,
	SortOrder,
} from '@entities/movie/model/types';
import { API_LIMITS, DEFAULT_RATING_PROVIDER } from '@shared/constants/api';

const VALID_PROVIDERS: Array<RatingProvider> = ['kp', 'imdb', 'tmdb', 'filmCritics'];
const VALID_SORT_FIELDS: Array<SortField> = ['rating', 'year', 'duration'];

const PARAMS = {
	query: 'query',
	genres: 'genres',
	countries: 'countries',
	isSeries: 'isSeries',
	ageRating: 'ageRating',
	ratingFrom: 'ratingFrom',
	ratingTo: 'ratingTo',
	yearFrom: 'yearFrom',
	yearTo: 'yearTo',
	ratingProvider: 'ratingProvider',
	sortBy: 'sortBy',
	sortOrder: 'sortOrder',
} as const;

const parseNumber = (value: string | null): number | undefined => {
	if (!value) {
		return undefined;
	}

	const n = Number(value);

	return Number.isFinite(n) ? n : undefined;
};

const parseProvider = (value: string | null): RatingProvider => {
	if (value && VALID_PROVIDERS.includes(value as RatingProvider)) {
		return value as RatingProvider;
	}

	return DEFAULT_RATING_PROVIDER;
};

const parseSortField = (value: string | null): SortField | undefined => {
	if (value && VALID_SORT_FIELDS.includes(value as SortField)) {
		return value as SortField;
	}

	return undefined;
};

const parseSortOrder = (value: string | null): SortOrder => {
	return value === 'asc' ? 'asc' : 'desc';
};

export const useMoviesFilters = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const query = searchParams.get(PARAMS.query) || undefined;
	const genres = searchParams.getAll(PARAMS.genres);
	const countries = searchParams.getAll(PARAMS.countries);
	const isSeries = searchParams.getAll(PARAMS.isSeries);
	const ageRating = searchParams.getAll(PARAMS.ageRating);

	const ratingFrom = parseNumber(searchParams.get(PARAMS.ratingFrom));
	const ratingTo = parseNumber(searchParams.get(PARAMS.ratingTo));
	const yearFrom = parseNumber(searchParams.get(PARAMS.yearFrom));
	const yearTo = parseNumber(searchParams.get(PARAMS.yearTo));
	const ratingProvider = parseProvider(searchParams.get(PARAMS.ratingProvider));
	const sortBy = parseSortField(searchParams.get(PARAMS.sortBy));
	const sortOrder = parseSortOrder(searchParams.get(PARAMS.sortOrder));

	const filters: Omit<MovieFilters, 'page' | 'limit'> = {
		...(query && { query }),
		...(genres.length > 0 && { genres }),
		...(countries.length > 0 && { countries }),
		...(isSeries.length > 0 && { isSeries }),
		...(ageRating.length > 0 && { ageRating }),
		...(ratingFrom !== undefined && { ratingFrom }),
		...(ratingTo !== undefined && { ratingTo }),
		...(yearFrom !== undefined && { yearFrom }),
		...(yearTo !== undefined && { yearTo }),
		ratingProvider,
		...(sortBy !== undefined && { sortBy }),
		...(sortOrder !== 'desc' && { sortOrder }),
	};

	const activeFiltersCount =
		(query ? 1 : 0) +
		(genres.length > 0 ? 1 : 0) +
		(countries.length > 0 ? 1 : 0) +
		(isSeries.length > 0 ? 1 : 0) +
		(ageRating.length > 0 ? 1 : 0) +
		(ratingFrom !== undefined || ratingTo !== undefined ? 1 : 0) +
		(yearFrom !== undefined || yearTo !== undefined ? 1 : 0) +
		(ratingProvider !== DEFAULT_RATING_PROVIDER ? 1 : 0) +
		(sortBy !== undefined ? 1 : 0);

	const setFilters = useCallback(
		(newFilters: Omit<MovieFilters, 'page' | 'limit'>) => {
			setSearchParams(
				(prev) => {
					const next = new URLSearchParams(prev);

					if (newFilters.query) {
						next.set(PARAMS.query, newFilters.query);
					} else {
						next.delete(PARAMS.query);
					}

					next.delete(PARAMS.genres);
					newFilters.genres?.forEach((g) => next.append(PARAMS.genres, g));

					next.delete(PARAMS.countries);
					newFilters.countries?.forEach((c) => next.append(PARAMS.countries, c));

					next.delete(PARAMS.isSeries);
					newFilters.isSeries?.forEach((s) => next.append(PARAMS.isSeries, s));

					next.delete(PARAMS.ageRating);
					newFilters.ageRating?.forEach((r) => next.append(PARAMS.ageRating, r));

					if (newFilters.ratingFrom !== undefined) {
						next.set(PARAMS.ratingFrom, String(newFilters.ratingFrom));
					} else {
						next.delete(PARAMS.ratingFrom);
					}

					if (newFilters.ratingTo !== undefined) {
						next.set(PARAMS.ratingTo, String(newFilters.ratingTo));
					} else {
						next.delete(PARAMS.ratingTo);
					}

					if (newFilters.yearFrom !== undefined) {
						next.set(PARAMS.yearFrom, String(newFilters.yearFrom));
					} else {
						next.delete(PARAMS.yearFrom);
					}

					if (newFilters.yearTo !== undefined) {
						next.set(PARAMS.yearTo, String(newFilters.yearTo));
					} else {
						next.delete(PARAMS.yearTo);
					}

					const provider = newFilters.ratingProvider ?? DEFAULT_RATING_PROVIDER;

					if (provider !== DEFAULT_RATING_PROVIDER) {
						next.set(PARAMS.ratingProvider, provider);
					} else {
						next.delete(PARAMS.ratingProvider);
					}

					if (newFilters.sortBy) {
						next.set(PARAMS.sortBy, newFilters.sortBy);
					} else {
						next.delete(PARAMS.sortBy);
					}

					if (newFilters.sortOrder && newFilters.sortOrder !== 'desc') {
						next.set(PARAMS.sortOrder, newFilters.sortOrder);
					} else {
						next.delete(PARAMS.sortOrder);
					}

					return next;
				},
				{ replace: true },
			);
		},
		[setSearchParams],
	);

	const resetFilters = useCallback(() => {
		setSearchParams({}, { replace: true });
	}, [setSearchParams]);

	return {
		filters,
		query,
		genres,
		ratingFrom,
		ratingTo,
		yearFrom: yearFrom ?? API_LIMITS.MIN_YEAR,
		yearTo: yearTo ?? new Date().getFullYear(),
		ratingProvider,
		sortBy,
		sortOrder,
		activeFiltersCount,
		setFilters,
		resetFilters,
	};
};
