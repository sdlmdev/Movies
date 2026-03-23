import { describe, expect, it } from 'vitest';
import { DEFAULT_RATING_PROVIDER } from '@shared/constants/api';
import type { Movie } from '../../model/types';
import { movieMatchesFilters } from '../filterMovies';

const MOVIE_NAME = 'Matrix';
const QUERY_MATCH = 'Mat';
const QUERY_NO_MATCH = 'Avatar';
const GENRE_ACTION = 'Action';
const GENRE_COMEDY = 'Comedy';

const YEAR = 1999;
const RATING = 8.5;
const YEAR_FROM = 1990;
const YEAR_TO = 2000;
const YEAR_FUTURE = 2010;
const RATING_FROM = 8;
const RATING_TO = 7;

const MOVIE = {
	name: MOVIE_NAME,
	year: YEAR,
	rating: { kp: RATING },
	genres: [{ name: GENRE_ACTION }],
} as Movie;

describe('filterMovies', () => {
	it('matches by query (name)', () => {
		expect(movieMatchesFilters(MOVIE, { query: QUERY_MATCH }, DEFAULT_RATING_PROVIDER)).toBe(true);

		expect(movieMatchesFilters(MOVIE, { query: QUERY_NO_MATCH }, DEFAULT_RATING_PROVIDER)).toBe(
			false,
		);
	});

	it('matches by genres', () => {
		expect(movieMatchesFilters(MOVIE, { genres: [GENRE_ACTION] }, DEFAULT_RATING_PROVIDER)).toBe(
			true,
		);

		expect(movieMatchesFilters(MOVIE, { genres: [GENRE_COMEDY] }, DEFAULT_RATING_PROVIDER)).toBe(
			false,
		);
	});

	it('matches by year range', () => {
		expect(
			movieMatchesFilters(MOVIE, { yearFrom: YEAR_FROM, yearTo: YEAR_TO }, DEFAULT_RATING_PROVIDER),
		).toBe(true);

		expect(movieMatchesFilters(MOVIE, { yearFrom: YEAR_FUTURE }, DEFAULT_RATING_PROVIDER)).toBe(
			false,
		);
	});

	it('matches by rating range', () => {
		expect(movieMatchesFilters(MOVIE, { ratingFrom: RATING_FROM }, DEFAULT_RATING_PROVIDER)).toBe(
			true,
		);

		expect(movieMatchesFilters(MOVIE, { ratingTo: RATING_TO }, DEFAULT_RATING_PROVIDER)).toBe(
			false,
		);
	});

	it('returns true for empty filters', () => {
		expect(movieMatchesFilters(MOVIE, {}, DEFAULT_RATING_PROVIDER)).toBe(true);
	});
});
