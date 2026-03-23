import { describe, expect, it } from 'vitest';
import {
	IS_SERIES_FILTER_MOVIE,
	IS_SERIES_FILTER_SERIES,
	MOVIE_AGE_RATING_FILTER_VALUES,
	movieMatchesAgeRatingFilters,
	movieMatchesIsSeriesFilter,
} from '../movieFilterValues';

const AGE_18 = 18;
const AGE_12 = 12;

describe('movieFilterValues', () => {
	describe('movieMatchesIsSeriesFilter', () => {
		it('matches correct value', () => {
			expect(movieMatchesIsSeriesFilter(IS_SERIES_FILTER_SERIES, true)).toBe(true);
			expect(movieMatchesIsSeriesFilter(IS_SERIES_FILTER_MOVIE, true)).toBe(false);
		});

		it('returns false if movie value is undefined', () => {
			expect(movieMatchesIsSeriesFilter(IS_SERIES_FILTER_SERIES)).toBe(false);
		});
	});

	describe('movieMatchesAgeRatingFilters', () => {
		it('matches correct value', () => {
			expect(movieMatchesAgeRatingFilters([MOVIE_AGE_RATING_FILTER_VALUES[4]], AGE_18)).toBe(true);
			expect(movieMatchesAgeRatingFilters([MOVIE_AGE_RATING_FILTER_VALUES[2]], AGE_12)).toBe(true);
			expect(movieMatchesAgeRatingFilters([MOVIE_AGE_RATING_FILTER_VALUES[2]], AGE_18)).toBe(false);
		});

		it('returns false if movie value is undefined', () => {
			expect(movieMatchesAgeRatingFilters(['18'])).toBe(false);
		});
	});
});
