import { apiInstance } from '@shared/api/instance';
import type { PaginatedResponse } from '@shared/api/types';
import {
	API_ENDPOINTS,
	API_FIELDS,
	API_LIMITS,
	API_PARAMS,
	API_QUERY_PREFIXES,
	FILTER_FIELDS,
	SORT_DIRECTION,
	SORT_FIELDS,
	SORT_ORDERS,
} from '@shared/constants/api';
import { CURRENT_YEAR } from '@shared/constants/common';
import { UI_CHARS } from '@shared/constants/ui';
import type { Movie, MovieFilters, RatingProvider } from '../model/types';
import { DEFAULT_RATING_PROVIDER } from '../model/types';

export interface MovieApiParams {
	[API_PARAMS.PAGE]?: number;
	[API_PARAMS.LIMIT]?: number;
	[API_PARAMS.QUERY]?: string;
	[FILTER_FIELDS.GENRES]?: Array<string>;
	[FILTER_FIELDS.COUNTRIES]?: Array<string>;
	[API_PARAMS.IS_SERIES]?: Array<string>;
	[API_PARAMS.AGE_RATING]?: Array<string>;
	[API_PARAMS.YEAR]?: string;
	[API_PARAMS.SORT_FIELD]?: string;
	[API_PARAMS.SORT_TYPE]?: string;
	[key: string]: unknown;
}

export const movieApi = {
	getMovies: async (filters: MovieFilters): Promise<PaginatedResponse<Movie>> => {
		const {
			genres,
			ratingFrom,
			ratingTo,
			yearFrom,
			yearTo,
			ratingProvider,
			sortBy,
			sortOrder,
			page,
			limit,
			query,
			countries,
			isSeries,
			ageRating,
		} = filters;

		const provider: RatingProvider = ratingProvider ?? DEFAULT_RATING_PROVIDER;

		const params: MovieApiParams = {};

		if (page !== undefined) {
			params[API_PARAMS.PAGE] = page;
		}

		if (limit !== undefined) {
			params[API_PARAMS.LIMIT] = limit;
		}

		if (query) {
			params[API_PARAMS.QUERY] = query;
		}

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
			params[`${API_QUERY_PREFIXES.RATING}${provider}`] = `${ratingFrom ?? 0}${
				UI_CHARS.DASH
			}${ratingTo ?? API_LIMITS.MAX_RATING}`;
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

		const endpoint = query ? API_ENDPOINTS.SEARCH : API_ENDPOINTS.MOVIES;

		const { data } = await apiInstance.get<PaginatedResponse<Movie>>(endpoint, {
			params,
			paramsSerializer: { indexes: null },
		});

		return data;
	},

	getMovieById: async (id: number | string): Promise<Movie> => {
		const { data } = await apiInstance.get<Movie>(`${API_ENDPOINTS.MOVIES}/${id}`);

		return data;
	},

	getPossibleValues: async (
		field: typeof FILTER_FIELDS.GENRES | typeof FILTER_FIELDS.COUNTRIES,
	): Promise<Array<{ name: string; slug: string }>> => {
		const { data } = await apiInstance.get<Array<{ name: string; slug: string }>>(
			API_ENDPOINTS.POSSIBLE_VALUES,
			{
				params: { field },
			},
		);

		return data;
	},
};
