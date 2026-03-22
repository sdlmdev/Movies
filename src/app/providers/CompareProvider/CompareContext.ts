import { createContext, use } from 'react';
import type { Movie } from '@entities/movie/model/types';

interface CompareContextValue {
	compareList: Array<Movie>;
	isInCompare: (id: number) => boolean;
	addToCompare: (movie: Movie) => void;
	removeFromCompare: (id: number) => void;
	clearCompare: VoidFunction;
	isCompareOpen: boolean;
	openCompare: VoidFunction;
	closeCompare: VoidFunction;
}

export const CompareContext = createContext<CompareContextValue | null>(null);

export const useCompare = () => {
	const ctx = use(CompareContext);

	if (!ctx) {
		throw new Error('useCompare must be used within CompareProvider');
	}

	return ctx;
};
