import { RATING_PRECISION } from '@shared/constants/ui';
import type { MovieRating, RatingProvider } from '../model/types';
import { DEFAULT_RATING_PROVIDER } from '../model/types';

export interface RatingItem {
	id: string;
	value: number;
	fixedValue: string;
	header?: string;
}

const filterRatings = (ratingData: MovieRating) => {
	return Object.entries(ratingData).filter(([_, value]) => value !== undefined && value !== null);
};

export const getPrimaryRating = (
	ratingData: MovieRating,
	provider: RatingProvider = DEFAULT_RATING_PROVIDER,
) => {
	const value = ratingData?.[provider];

	if (value !== undefined && value !== null) {
		return { id: provider, value, fixedValue: value.toFixed(RATING_PRECISION) };
	}

	if (provider === DEFAULT_RATING_PROVIDER) {
		const filtered = filterRatings(ratingData);

		if (!filtered.length) {
			return null;
		}

		const [id, val] = filtered[0];

		return { id, value: val, fixedValue: (val as number).toFixed(RATING_PRECISION) };
	}

	return null;
};

export const getDetailedRatings = (
	ratingData: MovieRating,
	ratingsDict: Record<string, string>,
): Array<RatingItem> => {
	return filterRatings(ratingData).map(([key, value]) => {
		return {
			id: key,
			value,
			fixedValue: value.toFixed(RATING_PRECISION),
			header: ratingsDict[key] || key,
		};
	});
};
