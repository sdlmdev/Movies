import { useSearchParams } from 'react-router';
import type {
	MovieFilters,
	RatingProvider,
	SortField,
	SortOrder,
} from '@entities/movie/model/types';
import {
	API_LIMITS,
	DEFAULT_RATING_PROVIDER,
	RATING_PROVIDERS,
	SEARCH_PARAMS,
	SORT_FIELDS,
} from '@shared/constants/api';

const VALID_PROVIDERS: Array<RatingProvider> = [...RATING_PROVIDERS];
const VALID_SORT_FIELDS: Array<SortField> = Object.values(SORT_FIELDS);

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

	const query = searchParams.get(SEARCH_PARAMS.QUERY) || undefined;
	const genres = searchParams.getAll(SEARCH_PARAMS.GENRES);
	const countries = searchParams.getAll(SEARCH_PARAMS.COUNTRIES);
	const isSeries = searchParams.getAll(SEARCH_PARAMS.IS_SERIES);
	const ageRating = searchParams.getAll(SEARCH_PARAMS.AGE_RATING);

	const ratingFrom = parseNumber(searchParams.get(SEARCH_PARAMS.RATING_FROM));
	const ratingTo = parseNumber(searchParams.get(SEARCH_PARAMS.RATING_TO));
	const yearFrom = parseNumber(searchParams.get(SEARCH_PARAMS.YEAR_FROM));
	const yearTo = parseNumber(searchParams.get(SEARCH_PARAMS.YEAR_TO));
	const ratingProvider = parseProvider(searchParams.get(SEARCH_PARAMS.RATING_PROVIDER));
	const sortBy = parseSortField(searchParams.get(SEARCH_PARAMS.SORT_BY));
	const sortOrder = parseSortOrder(searchParams.get(SEARCH_PARAMS.SORT_ORDER));

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

	const setFilters = (newFilters: Omit<MovieFilters, 'page' | 'limit'>) => {
		setSearchParams(
			(prev) => {
				const next = new URLSearchParams(prev);

				if (newFilters.query) {
					next.set(SEARCH_PARAMS.QUERY, newFilters.query);
				} else {
					next.delete(SEARCH_PARAMS.QUERY);
				}

				next.delete(SEARCH_PARAMS.GENRES);
				newFilters.genres?.forEach((g) => next.append(SEARCH_PARAMS.GENRES, g));

				next.delete(SEARCH_PARAMS.COUNTRIES);
				newFilters.countries?.forEach((c) => next.append(SEARCH_PARAMS.COUNTRIES, c));

				next.delete(SEARCH_PARAMS.IS_SERIES);
				newFilters.isSeries?.forEach((s) => next.append(SEARCH_PARAMS.IS_SERIES, s));

				next.delete(SEARCH_PARAMS.AGE_RATING);
				newFilters.ageRating?.forEach((r) => next.append(SEARCH_PARAMS.AGE_RATING, r));

				if (newFilters.ratingFrom !== undefined) {
					next.set(SEARCH_PARAMS.RATING_FROM, String(newFilters.ratingFrom));
				} else {
					next.delete(SEARCH_PARAMS.RATING_FROM);
				}

				if (newFilters.ratingTo !== undefined) {
					next.set(SEARCH_PARAMS.RATING_TO, String(newFilters.ratingTo));
				} else {
					next.delete(SEARCH_PARAMS.RATING_TO);
				}

				if (newFilters.yearFrom !== undefined) {
					next.set(SEARCH_PARAMS.YEAR_FROM, String(newFilters.yearFrom));
				} else {
					next.delete(SEARCH_PARAMS.YEAR_FROM);
				}

				if (newFilters.yearTo !== undefined) {
					next.set(SEARCH_PARAMS.YEAR_TO, String(newFilters.yearTo));
				} else {
					next.delete(SEARCH_PARAMS.YEAR_TO);
				}

				const provider = newFilters.ratingProvider ?? DEFAULT_RATING_PROVIDER;

				if (provider !== DEFAULT_RATING_PROVIDER) {
					next.set(SEARCH_PARAMS.RATING_PROVIDER, provider);
				} else {
					next.delete(SEARCH_PARAMS.RATING_PROVIDER);
				}

				if (newFilters.sortBy) {
					next.set(SEARCH_PARAMS.SORT_BY, newFilters.sortBy);
				} else {
					next.delete(SEARCH_PARAMS.SORT_BY);
				}

				if (newFilters.sortOrder && newFilters.sortOrder !== 'desc') {
					next.set(SEARCH_PARAMS.SORT_ORDER, newFilters.sortOrder);
				} else {
					next.delete(SEARCH_PARAMS.SORT_ORDER);
				}

				return next;
			},
			{ replace: true },
		);
	};

	const resetFilters = () => {
		setSearchParams({}, { replace: true });
	};

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
