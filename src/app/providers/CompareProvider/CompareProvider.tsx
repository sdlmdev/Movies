import { ReactNode, useState } from 'react';
import { Movie } from '@entities/movie/model/types';
import { MAX_COMPARE_MOVIES } from '@shared/constants/api';
import { MOVIES_COMPARE } from '@shared/constants/localStorageKeys';
import { useLocalStorage } from '@shared/hooks/useLocalStorage';
import { CompareContext } from './CompareContext';

interface CompareProviderProps {
	children: ReactNode;
}

export const CompareProvider = ({ children }: CompareProviderProps) => {
	const [compareList, setCompareList] = useLocalStorage<Array<Movie>>(MOVIES_COMPARE, []);
	const [isCompareOpen, setIsCompareOpen] = useState(false);

	const isInCompare = (id: number) => compareList.some((m) => m.id === id);

	const addToCompare = (movie: Movie) => {
		if (isInCompare(movie.id)) {
			return;
		}

		setCompareList((prev) => {
			if (prev.length >= MAX_COMPARE_MOVIES) {
				return [...prev.slice(1), movie];
			}

			return [...prev, movie];
		});
	};

	const removeFromCompare = (id: number) => {
		setCompareList((prev) => prev.filter((m) => m.id !== id));
	};

	const clearCompare = () => setCompareList([]);

	const openCompare = () => setIsCompareOpen(true);
	const closeCompare = () => setIsCompareOpen(false);

	return (
		<CompareContext
			value={{
				compareList,
				isInCompare,
				addToCompare,
				removeFromCompare,
				clearCompare,
				isCompareOpen,
				openCompare,
				closeCompare,
			}}
		>
			{children}
		</CompareContext>
	);
};
