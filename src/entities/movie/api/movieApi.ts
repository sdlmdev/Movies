import { apiInstance } from '@shared/api/instance';
import type { PaginatedResponse } from '@shared/api/types';
import {
	API_ENDPOINTS,
	API_FIELDS,
	API_LIMITS,
	API_PARAMS,
	API_QUERY_PREFIXES,
	DEFAULT_RATING_PROVIDER,
	FILTER_FIELDS,
	FILTERABLE_RATING_PROVIDERS,
	SORT_DIRECTION,
	SORT_FIELDS,
	SORT_ORDERS,
} from '@shared/constants/api';
import { CURRENT_YEAR } from '@shared/constants/common';
import { UI_CHARS } from '@shared/constants/ui';
import type { Movie, MovieFilters, RatingProvider } from '../model/types';

type FilterableRatingProvider = (typeof FILTERABLE_RATING_PROVIDERS)[number];

type RatingFilterKey = `${typeof API_QUERY_PREFIXES.RATING}${FilterableRatingProvider}`;

type MovieApiParams = {
	[API_PARAMS.PAGE]?: number;
	[API_PARAMS.LIMIT]?: number;
	[FILTER_FIELDS.GENRES]?: Array<string>;
	[FILTER_FIELDS.COUNTRIES]?: Array<string>;
	[API_PARAMS.IS_SERIES]?: Array<string>;
	[API_PARAMS.AGE_RATING]?: Array<string>;
	[API_PARAMS.YEAR]?: string;
	[API_PARAMS.SORT_FIELD]?: string;
	[API_PARAMS.SORT_TYPE]?: string;
} & Partial<Record<RatingFilterKey, string>>;

const FILTERABLE_PROVIDERS_SET = new Set<string>(FILTERABLE_RATING_PROVIDERS);

const toFilterableProvider = (provider: RatingProvider): FilterableRatingProvider => {
	if (FILTERABLE_PROVIDERS_SET.has(provider)) {
		return provider as FilterableRatingProvider;
	}

	return DEFAULT_RATING_PROVIDER;
};

const buildMovieParams = (filters: Omit<MovieFilters, 'page' | 'limit'>): MovieApiParams => {
	const {
		genres,
		ratingFrom,
		ratingTo,
		yearFrom,
		yearTo,
		ratingProvider,
		sortBy,
		sortOrder,
		countries,
		isSeries,
		ageRating,
	} = filters;

	const provider = toFilterableProvider(ratingProvider ?? DEFAULT_RATING_PROVIDER);

	const params: MovieApiParams = {};

	if (genres && genres.length > 0) {
		params[FILTER_FIELDS.GENRES] = genres;
	}

	if (countries && countries.length > 0) {
		params[FILTER_FIELDS.COUNTRIES] = countries;
	}

	if (isSeries && isSeries.length > 0) {
		params[API_PARAMS.IS_SERIES] = isSeries;
	}

	if (ageRating && ageRating.length > 0) {
		params[API_PARAMS.AGE_RATING] = ageRating;
	}

	if (ratingFrom !== undefined || ratingTo !== undefined) {
		const ratingKey: RatingFilterKey = `${API_QUERY_PREFIXES.RATING}${provider}`;

		params[ratingKey] = `${ratingFrom ?? 0}${UI_CHARS.DASH}${ratingTo ?? API_LIMITS.MAX_RATING}`;
	}

	if (yearFrom !== undefined || yearTo !== undefined) {
		const from = yearFrom ?? API_LIMITS.MIN_YEAR;
		const to = yearTo ?? CURRENT_YEAR;

		params[API_PARAMS.YEAR] = `${from}${UI_CHARS.DASH}${to}`;
	}

	if (sortBy) {
		const sortField =
			sortBy === SORT_FIELDS.RATING
				? `${API_QUERY_PREFIXES.RATING}${provider}`
				: sortBy === SORT_FIELDS.DURATION
					? API_FIELDS.MOVIE_LENGTH
					: sortBy;

		params[API_PARAMS.SORT_FIELD] = sortField;

		params[API_PARAMS.SORT_TYPE] =
			sortOrder === SORT_ORDERS.ASC ? SORT_DIRECTION.ASC : SORT_DIRECTION.DESC;
	}

	return params;
};

export const movieApi = {
	getMovies: async (
		filters: MovieFilters,
		signal?: AbortSignal,
	): Promise<PaginatedResponse<Movie>> => {
		const { page, limit, ...filterParams } = filters;

		const params: MovieApiParams = {
			...buildMovieParams(filterParams),
			...(page !== undefined && { [API_PARAMS.PAGE]: page }),
			...(limit !== undefined && { [API_PARAMS.LIMIT]: limit }),
		};

		const { data } = await apiInstance.get<PaginatedResponse<Movie>>(API_ENDPOINTS.MOVIES, {
			params,
			paramsSerializer: { indexes: null },
			signal,
		});

		return data;
	},

	searchMovies: async (
		query: string,
		page: number,
		limit: number,
		signal?: AbortSignal,
	): Promise<PaginatedResponse<Movie>> => {
		const { data } = await apiInstance.get<PaginatedResponse<Movie>>(API_ENDPOINTS.SEARCH, {
			params: {
				[API_PARAMS.QUERY]: query,
				[API_PARAMS.PAGE]: page,
				[API_PARAMS.LIMIT]: limit,
			},
			signal,
		});

		return data;
	},

	getMovieById: async (id: number | string, signal?: AbortSignal): Promise<Movie> => {
		const { data } = await apiInstance.get<Movie>(`${API_ENDPOINTS.MOVIES}/${id}`, { signal });

		return data;
	},

	getPossibleValues: async (
		field: typeof FILTER_FIELDS.GENRES | typeof FILTER_FIELDS.COUNTRIES,
		signal?: AbortSignal,
	): Promise<Array<{ name: string; slug: string }>> => {
		const { data } = await apiInstance.get<Array<{ name: string; slug: string }>>(
			API_ENDPOINTS.POSSIBLE_VALUES,
			{
				params: { field },
				signal,
			},
		);

		return data;
	},
};
