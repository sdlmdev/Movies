import { createContext, use } from 'react';
import type { Movie } from '@entities/movie/model/types';

export interface FavoritesDataContextValue {
	favorites: Array<Movie>;
	isFavorite: (id: number) => boolean;
}

export interface FavoritesActionsContextValue {
	requestAddToFavorites: (movie: Movie) => void;
	removeFromFavorites: (id: number) => void;
}

export interface FavoritesModalContextValue {
	isConfirmOpen: boolean;
	pendingMovie: Movie | null;
	confirmAdd: VoidFunction;
	cancelAdd: VoidFunction;
}

export const FavoritesDataContext = createContext<FavoritesDataContextValue | null>(null);
export const FavoritesActionsContext = createContext<FavoritesActionsContextValue | null>(null);
export const FavoritesModalContext = createContext<FavoritesModalContextValue | null>(null);

export const useFavoritesData = () => {
	const ctx = use(FavoritesDataContext);

	if (!ctx) {
		throw new Error('useFavoritesData must be used within FavoritesProvider');
	}

	return ctx;
};

export const useFavoritesActions = () => {
	const ctx = use(FavoritesActionsContext);

	if (!ctx) {
		throw new Error('useFavoritesActions must be used within FavoritesProvider');
	}

	return ctx;
};

export const useFavoritesModal = () => {
	const ctx = use(FavoritesModalContext);

	if (!ctx) {
		throw new Error('useFavoritesModal must be used within FavoritesProvider');
	}

	return ctx;
};
