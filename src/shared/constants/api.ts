export const API_BASE_URL = 'https://api.poiskkino.dev';
export const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;

export const API_ENDPOINTS = {
	MOVIES: '/v1.4/movie',
	SEARCH: '/v1.4/movie/search',
	POSSIBLE_VALUES: '/v1/movie/possible-values-by-field',
} as const;

export const API_LIMITS = {
	MOVIES_PER_PAGE: 50,
	MAX_RATING: 10,
	MIN_YEAR: 1990,
} as const;

export const SORT_DIRECTION = {
	DESC: '-1',
	ASC: '1',
} as const;

export const KINOPOISK_DEV_URL = 'https://kinopoisk.dev';

export const MAX_COMPARE_MOVIES = 2;

export const DEFAULT_RATING_PROVIDER = 'kp';
export const RATING_PROVIDERS = ['kp', 'imdb', 'tmdb', 'filmCritics'] as const;
export const EXCLUDED_RATING_PROVIDERS = ['await'] as const;

export const QUERY_KEYS = {
	MOVIES: 'movies',
	MOVIE_DETAIL: 'movie-detail',
	FILTER_OPTIONS: 'filter-options',
} as const;

export const FILTER_FIELDS = {
	GENRES: 'genres.name',
	COUNTRIES: 'countries.name',
} as const;

export const SORT_FIELDS = {
	RATING: 'rating',
	YEAR: 'year',
	DURATION: 'duration',
} as const;

export const SORT_ORDERS = {
	ASC: 'asc',
	DESC: 'desc',
} as const;

export const SEARCH_PARAMS = {
	QUERY: 'query',
	GENRES: 'genres',
	COUNTRIES: 'countries',
	IS_SERIES: 'isSeries',
	AGE_RATING: 'ageRating',
	RATING_FROM: 'ratingFrom',
	RATING_TO: 'ratingTo',
	YEAR_FROM: 'yearFrom',
	YEAR_TO: 'yearTo',
	RATING_PROVIDER: 'ratingProvider',
	SORT_BY: 'sortBy',
	SORT_ORDER: 'sortOrder',
} as const;

export const API_PARAMS = {
	PAGE: 'page',
	LIMIT: 'limit',
	QUERY: 'query',
	IS_SERIES: 'isSeries',
	AGE_RATING: 'ageRating',
	YEAR: 'year',
	SORT_FIELD: 'sortField',
	SORT_TYPE: 'sortType',
} as const;

export const API_FIELDS = {
	MOVIE_LENGTH: 'movieLength',
} as const;

export const API_QUERY_PREFIXES = {
	RATING: 'rating.',
} as const;
