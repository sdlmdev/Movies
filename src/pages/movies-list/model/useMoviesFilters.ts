import { useSearchParams } from 'react-router';
import type { MovieFilters, RatingProvider, SortField } from '@entities/movie/model/types';
import {
	DEFAULT_RATING_PROVIDER,
	RATING_PROVIDERS,
	SEARCH_PARAMS,
	SORT_FIELDS,
	SORT_ORDERS,
} from '@shared/constants/api';

const VALID_PROVIDERS_SET = new Set<string>([...RATING_PROVIDERS]);
const VALID_SORT_FIELDS_SET = new Set<string>(Object.values(SORT_FIELDS));

const parseNumber = (value: string | null): number | undefined => {
	if (!value) {
		return undefined;
	}

	const n = Number(value);

	return Number.isFinite(n) ? n : undefined;
};

const isRatingProvider = (value: string): value is RatingProvider => VALID_PROVIDERS_SET.has(value);

const isSortField = (value: string): value is SortField => VALID_SORT_FIELDS_SET.has(value);

const parseProvider = (value: string | null): RatingProvider => {
	if (value && isRatingProvider(value)) {
		return value;
	}

	return DEFAULT_RATING_PROVIDER;
};

const parseSortField = (value: string | null): SortField | undefined => {
	if (value && isSortField(value)) {
		return value;
	}

	return undefined;
};

type FilterKey = keyof Omit<MovieFilters, 'page' | 'limit'>;

type FilterValue = MovieFilters[FilterKey];

interface FilterConfigItem {
	param: string;
	default?: FilterValue;
	parse: (params: URLSearchParams) => FilterValue;
}

const FILTER_CONFIG: Record<FilterKey, FilterConfigItem> = {
	query: {
		param: SEARCH_PARAMS.QUERY,
		parse: (p) => p.get(SEARCH_PARAMS.QUERY) || undefined,
	},
	genres: {
		param: SEARCH_PARAMS.GENRES,
		parse: (p) => p.getAll(SEARCH_PARAMS.GENRES),
	},
	countries: {
		param: SEARCH_PARAMS.COUNTRIES,
		parse: (p) => p.getAll(SEARCH_PARAMS.COUNTRIES),
	},
	isSeries: {
		param: SEARCH_PARAMS.IS_SERIES,
		parse: (p) => p.getAll(SEARCH_PARAMS.IS_SERIES),
	},
	ageRating: {
		param: SEARCH_PARAMS.AGE_RATING,
		parse: (p) => p.getAll(SEARCH_PARAMS.AGE_RATING),
	},
	ratingFrom: {
		param: SEARCH_PARAMS.RATING_FROM,
		parse: (p) => parseNumber(p.get(SEARCH_PARAMS.RATING_FROM)),
	},
	ratingTo: {
		param: SEARCH_PARAMS.RATING_TO,
		parse: (p) => parseNumber(p.get(SEARCH_PARAMS.RATING_TO)),
	},
	yearFrom: {
		param: SEARCH_PARAMS.YEAR_FROM,
		parse: (p) => parseNumber(p.get(SEARCH_PARAMS.YEAR_FROM)),
	},
	yearTo: {
		param: SEARCH_PARAMS.YEAR_TO,
		parse: (p) => parseNumber(p.get(SEARCH_PARAMS.YEAR_TO)),
	},
	ratingProvider: {
		param: SEARCH_PARAMS.RATING_PROVIDER,
		default: DEFAULT_RATING_PROVIDER,
		parse: (p) => parseProvider(p.get(SEARCH_PARAMS.RATING_PROVIDER)),
	},
	sortBy: {
		param: SEARCH_PARAMS.SORT_BY,
		parse: (p) => parseSortField(p.get(SEARCH_PARAMS.SORT_BY)),
	},
	sortOrder: {
		param: SEARCH_PARAMS.SORT_ORDER,
		default: SORT_ORDERS.DESC,
		parse: (p) => {
			const val = p.get(SEARCH_PARAMS.SORT_ORDER);

			return val === SORT_ORDERS.ASC ? SORT_ORDERS.ASC : SORT_ORDERS.DESC;
		},
	},
};

const FILTER_KEYS = Object.keys(FILTER_CONFIG) as Array<FilterKey>;

const isEmptyValue = (value: unknown): boolean =>
	value === undefined ||
	value === null ||
	value === '' ||
	(Array.isArray(value) && value.length === 0);

const isDefaultValue = (config: FilterConfigItem, value: unknown): boolean =>
	config.default !== undefined && value === config.default;

const parseFilters = (searchParams: URLSearchParams): Omit<MovieFilters, 'page' | 'limit'> => {
	const result: Omit<MovieFilters, 'page' | 'limit'> = {
		ratingProvider: DEFAULT_RATING_PROVIDER,
		sortOrder: SORT_ORDERS.DESC,
	};

	for (const key of FILTER_KEYS) {
		const config = FILTER_CONFIG[key];
		const value = config.parse(searchParams);

		if (!isEmptyValue(value) && !isDefaultValue(config, value)) {
			(result as Record<FilterKey, FilterValue>)[key] = value;
		}
	}

	if (!result.sortBy) {
		result.sortOrder = undefined;
	}

	return result;
};

export const useMoviesFilters = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const filters = parseFilters(searchParams);

	const activeFiltersCount = FILTER_KEYS.reduce((acc, key) => {
		const value = filters[key];
		const config = FILTER_CONFIG[key];

		if (isEmptyValue(value) || isDefaultValue(config, value)) {
			return acc;
		}

		return acc + 1;
	}, 0);

	const setFilters = (newFilters: Omit<MovieFilters, 'page' | 'limit'>) => {
		setSearchParams(
			(prev) => {
				const next = new URLSearchParams(prev);

				for (const key of FILTER_KEYS) {
					const value = newFilters[key];
					const config = FILTER_CONFIG[key];
					const paramKey = config.param;

					if (Array.isArray(value)) {
						next.delete(paramKey);
						value.forEach((v) => next.append(paramKey, String(v)));
						continue;
					}

					if (isEmptyValue(value) || isDefaultValue(config, value)) {
						next.delete(paramKey);
					} else {
						next.set(paramKey, String(value));
					}
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
		activeFiltersCount,
		setFilters,
		resetFilters,
	};
};
