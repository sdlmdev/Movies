import { type ReactNode, useState } from 'react';
import type { Movie } from '@entities/movie/model/types';
import { MOVIES_FAVORITES } from '@shared/constants/localStorageKeys';
import { useLocalStorage } from '@shared/hooks/useLocalStorage';
import {
	FavoritesActionsContext,
	FavoritesDataContext,
	FavoritesModalContext,
} from './FavoritesContext';

interface FavoritesProviderProps {
	children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
	const [favorites, setFavorites] = useLocalStorage<Array<Movie>>(MOVIES_FAVORITES, []);
	const [pendingMovie, setPendingMovie] = useState<Movie | null>(null);
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);

	const isFavorite = (id: number) => favorites.some((m) => m.id === id);

	const dataValue = { favorites, isFavorite };

	const requestAddToFavorites = (movie: Movie) => {
		if (!favorites.some((m) => m.id === movie.id)) {
			setPendingMovie(movie);
			setIsConfirmOpen(true);
		}
	};

	const removeFromFavorites = (id: number) => {
		setFavorites((prev) => prev.filter((m) => m.id !== id));
	};

	const actionsValue = { requestAddToFavorites, removeFromFavorites };

	const confirmAdd = () => {
		if (pendingMovie) {
			setFavorites((prev) => [...prev, pendingMovie]);
		}

		setPendingMovie(null);
		setIsConfirmOpen(false);
	};

	const cancelAdd = () => {
		setPendingMovie(null);
		setIsConfirmOpen(false);
	};

	const modalValue = { isConfirmOpen, pendingMovie, confirmAdd, cancelAdd };

	return (
		<FavoritesDataContext.Provider value={dataValue}>
			<FavoritesActionsContext.Provider value={actionsValue}>
				<FavoritesModalContext.Provider value={modalValue}>
					{children}
				</FavoritesModalContext.Provider>
			</FavoritesActionsContext.Provider>
		</FavoritesDataContext.Provider>
	);
};
