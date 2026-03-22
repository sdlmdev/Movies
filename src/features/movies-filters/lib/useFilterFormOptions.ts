import {
	MOVIE_AGE_RATING_FILTER_VALUES,
	MOVIE_IS_SERIES_FILTER_VALUE,
	useFilterOptions,
} from '@entities/movie';
import type { RatingProvider, SortField, SortOrder } from '@entities/movie';
import { EXCLUDED_RATING_PROVIDERS, SORT_FIELDS, SORT_ORDERS } from '@shared/constants/api';
import { useDictionary } from '@shared/hooks';

const EXCLUDED_PROVIDERS_SET = new Set<string>(EXCLUDED_RATING_PROVIDERS);

export const useFilterFormOptions = () => {
	const t = useDictionary();

	const {
		genres: availableGenres,
		countries: availableCountries,
		isLoading: isOptionsLoading,
	} = useFilterOptions();

	const sortFieldOptions: Array<{ value: SortField | ''; label: string }> = [
		{ value: '', label: t.filters.sortNone },
		{ value: SORT_FIELDS.RATING, label: t.common.rating },
		{ value: SORT_FIELDS.YEAR, label: t.common.year },
		{ value: SORT_FIELDS.DURATION, label: t.common.duration },
	];

	const sortOrderOptions: Array<{ value: SortOrder; label: string }> = [
		{ value: SORT_ORDERS.DESC, label: t.filters.sortDesc },
		{ value: SORT_ORDERS.ASC, label: t.filters.sortAsc },
	];

	const isSeriesOptions = [
		{ value: MOVIE_IS_SERIES_FILTER_VALUE.any, label: t.filters.typeAny },
		{ value: MOVIE_IS_SERIES_FILTER_VALUE.movie, label: t.filters.typeMovie },
		{ value: MOVIE_IS_SERIES_FILTER_VALUE.series, label: t.filters.typeSeries },
	];

	const ageRatingOptions = MOVIE_AGE_RATING_FILTER_VALUES.map((value) => ({
		value,
		label: `${value}+`,
	}));

	const genreOptions = availableGenres.map((g) => ({ value: g.id, label: g.label }));
	const countryOptions = availableCountries.map((c) => ({ value: c.id, label: c.label }));

	const providerOptions = Object.entries(t.ratings)
		.filter(([key]) => !EXCLUDED_PROVIDERS_SET.has(key))
		.map(([key, label]) => ({
			value: key as RatingProvider,
			label,
		}));

	return {
		sortFieldOptions,
		sortOrderOptions,
		isSeriesOptions,
		ageRatingOptions,
		genreOptions,
		countryOptions,
		providerOptions,
		isOptionsLoading,
	};
};
