import { SORT_FIELDS, SORT_ORDERS } from '@shared/constants/api';
import type { Movie, RatingProvider, SortField, SortOrder } from '../model/types';
import { getPrimaryRating } from './getRatings';

const compareValues = (valA: number | null, valB: number | null, sortOrder: SortOrder): number => {
	if (valA === valB) {
		return 0;
	}

	if (valA === null) {
		return 1;
	}

	if (valB === null) {
		return -1;
	}

	return sortOrder === SORT_ORDERS.ASC ? valA - valB : valB - valA;
};

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
		switch (sortBy) {
			case SORT_FIELDS.RATING: {
				const rA = getPrimaryRating(a.rating, ratingProvider);
				const rB = getPrimaryRating(b.rating, ratingProvider);
				const valA = rA && rA.value > 0 ? rA.value : null;
				const valB = rB && rB.value > 0 ? rB.value : null;

				return compareValues(valA, valB, sortOrder);
			}

			case SORT_FIELDS.YEAR: {
				return compareValues(a.year ?? null, b.year ?? null, sortOrder);
			}

			case SORT_FIELDS.DURATION: {
				return compareValues(a.movieLength ?? null, b.movieLength ?? null, sortOrder);
			}

			default: {
				return 0;
			}
		}
	});
};
