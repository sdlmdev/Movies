import { createContext, use } from 'react';
import type { Movie } from '@entities/movie/model/types';

export interface CompareDataContextValue {
	compareList: Array<Movie>;
	isInCompare: (id: number) => boolean;
}

export interface CompareActionsContextValue {
	addToCompare: (movie: Movie) => void;
	removeFromCompare: (id: number) => void;
	clearCompare: VoidFunction;
}

export interface CompareModalContextValue {
	isCompareOpen: boolean;
	openCompare: VoidFunction;
	closeCompare: VoidFunction;
}

export const CompareDataContext = createContext<CompareDataContextValue | null>(null);
export const CompareActionsContext = createContext<CompareActionsContextValue | null>(null);
export const CompareModalContext = createContext<CompareModalContextValue | null>(null);

export const useCompareData = () => {
	const ctx = use(CompareDataContext);

	if (!ctx) {
		throw new Error('useCompareData must be used within CompareProvider');
	}

	return ctx;
};

export const useCompareActions = () => {
	const ctx = use(CompareActionsContext);

	if (!ctx) {
		throw new Error('useCompareActions must be used within CompareProvider');
	}

	return ctx;
};

export const useCompareModal = () => {
	const ctx = use(CompareModalContext);

	if (!ctx) {
		throw new Error('useCompareModal must be used within CompareProvider');
	}

	return ctx;
};
