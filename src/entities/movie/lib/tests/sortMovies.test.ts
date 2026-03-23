import { describe, expect, it } from 'vitest';
import { DEFAULT_RATING_PROVIDER, SORT_FIELDS, SORT_ORDERS } from '@shared/constants/api';
import type { Movie } from '../../model/types';
import { sortMovies } from '../sortMovies';

const ID_A = 1;
const ID_B = 2;
const ID_C = 3;
const YEAR_A = 2024;
const YEAR_B = 2023;
const YEAR_C = 2022;
const RATING_A = 8.5;
const RATING_B = 9.0;
const RATING_C = 7.0;
const LENGTH_A = 120;
const LENGTH_B = 90;
const LENGTH_C = 150;

const MOVIE_A = {
	id: ID_A,
	year: YEAR_A,
	rating: { kp: RATING_A },
	movieLength: LENGTH_A,
} as Movie;

const MOVIE_B = {
	id: ID_B,
	year: YEAR_B,
	rating: { kp: RATING_B },
	movieLength: LENGTH_B,
} as Movie;

const MOVIE_C = {
	id: ID_C,
	year: YEAR_C,
	rating: { kp: RATING_C },
	movieLength: LENGTH_C,
} as Movie;

const MOVIES = [MOVIE_A, MOVIE_B, MOVIE_C];

describe('sortMovies', () => {
	it('sorts by year ASC', () => {
		const result = sortMovies(MOVIES, SORT_FIELDS.YEAR, SORT_ORDERS.ASC, DEFAULT_RATING_PROVIDER);
		expect(result[0].id).toBe(ID_C);
		expect(result[2].id).toBe(ID_A);
	});

	it('sorts by year DESC', () => {
		const result = sortMovies(MOVIES, SORT_FIELDS.YEAR, SORT_ORDERS.DESC, DEFAULT_RATING_PROVIDER);
		expect(result[0].id).toBe(ID_A);
		expect(result[2].id).toBe(ID_C);
	});

	it('sorts by rating (kp) DESC', () => {
		const result = sortMovies(
			MOVIES,
			SORT_FIELDS.RATING,
			SORT_ORDERS.DESC,
			DEFAULT_RATING_PROVIDER,
		);

		expect(result[0].id).toBe(ID_B);
		expect(result[2].id).toBe(ID_C);
	});

	it('sorts by duration ASC', () => {
		const result = sortMovies(
			MOVIES,
			SORT_FIELDS.DURATION,
			SORT_ORDERS.ASC,
			DEFAULT_RATING_PROVIDER,
		);

		expect(result[0].id).toBe(ID_B);
		expect(result[2].id).toBe(ID_C);
	});

	it('returns original if no sortBy', () => {
		expect(sortMovies(MOVIES, undefined, SORT_ORDERS.DESC, DEFAULT_RATING_PROVIDER)).toEqual(
			MOVIES,
		);
	});
});
