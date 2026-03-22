import { createContext, use } from 'react';
import type { Movie } from '@entities/movie/model/types';

interface FavoritesContextValue {
	favorites: Array<Movie>;
	isFavorite: (id: number) => boolean;
	requestAddToFavorites: (movie: Movie) => void;
	confirmAdd: VoidFunction;
	cancelAdd: VoidFunction;
	removeFromFavorites: (id: number) => void;
	isConfirmOpen: boolean;
	pendingMovie: Movie | null;
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export const useFavorites = () => {
	const ctx = use(FavoritesContext);

	if (!ctx) {
		throw new Error('useFavorites must be used within FavoritesProvider');
	}

	return ctx;
};
