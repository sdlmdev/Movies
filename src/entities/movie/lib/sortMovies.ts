import { SORT_FIELDS, SORT_ORDERS } from '@shared/constants/api';
import type { Movie, RatingProvider, SortField, SortOrder } from '../model/types';
import { getPrimaryRating } from './getRatings';

export const sortMovies = (
	movies: Array<Movie>,
	sortBy: SortField | undefined,
	sortOrder: SortOrder,
	ratingProvider: RatingProvider,
): Array<Movie> => {
	if (!sortBy) {
		return movies;
	}

	return [...movies].sort((a, b) => {
		if (sortBy === SORT_FIELDS.RATING) {
			const rA = getPrimaryRating(a.rating, ratingProvider);
			const rB = getPrimaryRating(b.rating, ratingProvider);
			const valA = rA && rA.value > 0 ? rA.value : null;
			const valB = rB && rB.value > 0 ? rB.value : null;

			if (valA === null && valB === null) {
				return 0;
			}

			if (valA === null) {
				return 1;
			}

			if (valB === null) {
				return -1;
			}

			return sortOrder === SORT_ORDERS.ASC ? valA - valB : valB - valA;
		}

		if (sortBy === SORT_FIELDS.YEAR) {
			const valA = a.year ?? null;
			const valB = b.year ?? null;

			if (valA === null && valB === null) {
				return 0;
			}

			if (valA === null) {
				return 1;
			}

			if (valB === null) {
				return -1;
			}

			return sortOrder === SORT_ORDERS.ASC ? valA - valB : valB - valA;
		}

		const valA = a.movieLength ?? null;
		const valB = b.movieLength ?? null;

		if (valA === null && valB === null) {
			return 0;
		}

		if (valA === null) {
			return 1;
		}

		if (valB === null) {
			return -1;
		}

		return sortOrder === SORT_ORDERS.ASC ? valA - valB : valB - valA;
	});
};
