import { describe, expect, it } from 'vitest';
import { DEFAULT_RATING_PROVIDER } from '@shared/constants/api';
import { translation } from '@shared/lib/i18n/locales/ru/translation';
import { getDetailedRatings, getPrimaryRating } from '../getRatings';

const IMDB_PROVIDER = 'imdb';
const TMDB_PROVIDER = 'tmdb';

const RATING_KP = 8.5;
const RATING_IMDB = 8.1;
const RATING_TMDB = 8.3;
const FALLBACK_RATING = 7;
const SINGLE_RATING_VAL = 1;

const RATING_DATA = {
	kp: RATING_KP,
	imdb: RATING_IMDB,
	tmdb: RATING_TMDB,
};

const DICT = {
	kp: translation.ratings.kp,
	imdb: translation.ratings.imdb,
	tmdb: translation.ratings.tmdb,
};

describe('getRatings', () => {
	describe('getPrimaryRating', () => {
		it('returns preferred provider if available', () => {
			const result = getPrimaryRating(RATING_DATA, IMDB_PROVIDER);

			expect(result?.id).toBe(IMDB_PROVIDER);
			expect(result?.value).toBe(RATING_IMDB);
		});

		it('falls back to first available if preferred is missing (and is default)', () => {
			const result = getPrimaryRating({ tmdb: FALLBACK_RATING } as any, DEFAULT_RATING_PROVIDER);

			expect(result?.id).toBe(TMDB_PROVIDER);
			expect(result?.value).toBe(FALLBACK_RATING);
		});

		it('returns null if preferred is missing and NOT default', () => {
			expect(getPrimaryRating({ kp: SINGLE_RATING_VAL } as any, IMDB_PROVIDER)).toBeNull();
		});

		it('returns null if no ratings data', () => {
			expect(getPrimaryRating({} as any)).toBeNull();
		});
	});

	describe('getDetailedRatings', () => {
		it('returns mapped rating items', () => {
			const result = getDetailedRatings(RATING_DATA, DICT);

			expect(result).toHaveLength(Object.keys(DICT).length);
			expect(result.find((r) => r.id === 'kp')?.header).toBe(translation.ratings.kp);
			expect(result.find((r) => r.id === TMDB_PROVIDER)?.header).toBe(translation.ratings.tmdb);
		});
	});
});
