import type { ReactNode } from 'react';
import { useState } from 'react';
import { FavoritesContext } from '@app/providers/FavoritesProvider/FavoritesContext';
import type { Movie } from '@entities/movie/model/types';
import { MOVIES_FAVORITES } from '@shared/constants/localStorageKeys';
import { useLocalStorage } from '@shared/hooks/useLocalStorage';

interface FavoritesProviderProps {
	children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
	const [favorites, setFavorites] = useLocalStorage<Array<Movie>>(MOVIES_FAVORITES, []);
	const [pendingMovie, setPendingMovie] = useState<Movie | null>(null);
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);

	const isFavorite = (id: number) => favorites.some((m) => m.id === id);

	const requestAddToFavorites = (movie: Movie) => {
		if (!isFavorite(movie.id)) {
			setPendingMovie(movie);
			setIsConfirmOpen(true);
		}
	};

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

	const removeFromFavorites = (id: number) => {
		setFavorites((prev) => prev.filter((m) => m.id !== id));
	};

	return (
		<FavoritesContext
			value={{
				favorites,
				isFavorite,
				requestAddToFavorites,
				confirmAdd,
				cancelAdd,
				removeFromFavorites,
				isConfirmOpen,
				pendingMovie,
			}}
		>
			{children}
		</FavoritesContext>
	);
};
