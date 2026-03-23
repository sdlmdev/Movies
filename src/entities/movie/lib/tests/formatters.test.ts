import { describe, expect, it } from 'vitest';
import { MINUTES_IN_HOUR } from '@shared/constants/common';
import { translation } from '@shared/lib/i18n/locales/ru/translation';
import {
	formatCurrency,
	formatDate,
	formatDuration,
	formatYear,
	getMovieName,
} from '../formatters';

const YEAR = 2024;
const DURATION_SHORT = 45;
const DURATION_HOURS = 2;
const DURATION_MINUTES = 15;
const CURRENCY_VALUE = 1000000;
const DATE_STRING = '2024-03-23T00:00:00.000Z';
const MOVIE_NAME = 'Name';
const MOVIE_ALT_NAME = 'Alt';
const CURRENCY_SYMBOL = '$';
const INVALID_DATE = 'invalid';

const HOUR_LABEL = translation.common.hour;
const MIN_LABEL = translation.common.min;

describe('formatters', () => {
	describe('getMovieName', () => {
		it('returns name if present', () => {
			expect(getMovieName({ name: MOVIE_NAME } as any)).toBe(MOVIE_NAME);
		});

		it('returns alternativeName if name is missing', () => {
			expect(getMovieName({ alternativeName: MOVIE_ALT_NAME } as any)).toBe(MOVIE_ALT_NAME);
		});

		it('returns empty string if both names are missing', () => {
			expect(getMovieName({} as any)).toBe('');
		});
	});

	describe('formatYear', () => {
		it('returns string year', () => {
			expect(formatYear(YEAR)).toBe(String(YEAR));
		});

		it('returns null if no year', () => {
			expect(formatYear()).toBeNull();
		});
	});

	describe('formatDuration', () => {
		it('formats hours and minutes', () => {
			const minutes = MINUTES_IN_HOUR * DURATION_HOURS + DURATION_MINUTES;
			const expected = `${DURATION_HOURS} ${HOUR_LABEL} ${DURATION_MINUTES} ${MIN_LABEL}`;

			expect(formatDuration(minutes, HOUR_LABEL, MIN_LABEL)).toBe(expected);
		});

		it('formats only hours if minutes are 0', () => {
			const minutes = MINUTES_IN_HOUR * DURATION_HOURS;
			const expected = `${DURATION_HOURS} ${HOUR_LABEL}`;

			expect(formatDuration(minutes, HOUR_LABEL, MIN_LABEL)).toBe(expected);
		});

		it('formats only minutes if hours are 0', () => {
			const expected = `${DURATION_SHORT} ${MIN_LABEL}`;

			expect(formatDuration(DURATION_SHORT, HOUR_LABEL, MIN_LABEL)).toBe(expected);
		});

		it('returns null if no minutes', () => {
			expect(formatDuration()).toBeNull();
		});
	});

	describe('formatCurrency', () => {
		it('formats USD', () => {
			expect(formatCurrency(CURRENCY_VALUE, CURRENCY_SYMBOL)).toContain(CURRENCY_SYMBOL);
		});

		it('uses default currency if label is missing', () => {
			expect(formatCurrency(CURRENCY_VALUE)).toContain(CURRENCY_SYMBOL);
		});

		it('returns null if no value', () => {
			expect(formatCurrency()).toBeNull();
		});
	});

	describe('formatDate', () => {
		it('formats date in default locale', () => {
			const result = formatDate(DATE_STRING);

			expect(result).toContain(String(YEAR));
		});

		it('returns null if no date', () => {
			expect(formatDate()).toBeNull();
		});

		it('returns original string on error', () => {
			expect(formatDate(INVALID_DATE)).toBe(INVALID_DATE);
		});
	});
});
