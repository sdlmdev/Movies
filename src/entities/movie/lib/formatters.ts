import { DEFAULT_CURRENCY, DEFAULT_LOCALE, MINUTES_IN_HOUR } from '@shared/constants/common';
import type { Movie } from '../model/types';

export const getMovieName = (movie: Movie): string => movie.name || movie.alternativeName || '';

export const formatYear = (year?: number) => {
	if (!year) {
		return null;
	}

	return String(year);
};

export const formatDuration = (minutes?: number, hourLabel?: string, minLabel?: string) => {
	if (!minutes) {
		return null;
	}

	const h = Math.floor(minutes / MINUTES_IN_HOUR);
	const m = minutes % MINUTES_IN_HOUR;

	if (h === 0) {
		return `${m} ${minLabel}`;
	}

	return `${h} ${hourLabel} ${m} ${minLabel}`;
};

export const formatCurrency = (value?: number, currency?: string) => {
	if (!value) {
		return null;
	}

	const currencyMap: Record<string, string> = {
		$: 'USD',
		'€': 'EUR',
		'₽': 'RUB',
	};

	const isoCode = currencyMap[currency || ''] || DEFAULT_CURRENCY;

	try {
		return new Intl.NumberFormat(DEFAULT_LOCALE, {
			style: 'currency',
			currency: isoCode,
			maximumFractionDigits: 0,
		}).format(value);
	} catch {
		return `${value} ${currency}`;
	}
};

export const formatDate = (dateString?: string, locale = DEFAULT_LOCALE) => {
	if (!dateString) {
		return null;
	}

	try {
		return new Intl.DateTimeFormat(locale, {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}).format(new Date(dateString));
	} catch {
		return dateString;
	}
};
