export const IS_SERIES_FILTER_ANY = '';

export const IS_SERIES_FILTER_MOVIE = 'false';
export const IS_SERIES_FILTER_SERIES = 'true';

export const MOVIE_IS_SERIES_FILTER_VALUE = {
	any: IS_SERIES_FILTER_ANY,
	movie: IS_SERIES_FILTER_MOVIE,
	series: IS_SERIES_FILTER_SERIES,
} as const;

export const MOVIE_AGE_RATING_FILTER_VALUES = ['0', '6', '12', '16', '18'] as const;

export const movieMatchesIsSeriesFilter = (filterValue: string, movieIsSeries?: boolean) =>
	filterValue === String(Boolean(movieIsSeries));

export const movieMatchesAgeRatingFilters = (
	filterValues: Array<string>,
	movieAgeRating?: number,
) => filterValues.includes(String(movieAgeRating ?? 0));
