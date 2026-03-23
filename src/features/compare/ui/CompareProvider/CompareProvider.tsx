import { type ReactNode, useState } from 'react';
import type { Movie } from '@entities/movie/model/types';
import { MOVIES_COMPARE } from '@shared/constants/localStorageKeys';
import { useLocalStorage } from '@shared/hooks/useLocalStorage';
import { CompareActionsContext, CompareDataContext, CompareModalContext } from './CompareContext';

interface CompareProviderProps {
	children: ReactNode;
}

const MAX_COMPARE_ITEMS = 2;

export const CompareProvider = ({ children }: CompareProviderProps) => {
	const [compareList, setCompareList] = useLocalStorage<Array<Movie>>(MOVIES_COMPARE, []);
	const [isCompareOpen, setIsCompareOpen] = useState(false);

	const isInCompare = (id: number) => compareList.some((m) => m.id === id);

	const dataValue = { compareList, isInCompare };

	const addToCompare = (movie: Movie) => {
		setCompareList((prev) => {
			if (!prev.some((m) => m.id === movie.id)) {
				const newList = [...prev, movie];

				if (newList.length > MAX_COMPARE_ITEMS) {
					return newList.slice(newList.length - MAX_COMPARE_ITEMS);
				}

				return newList;
			}

			return prev;
		});
	};

	const removeFromCompare = (id: number) => {
		setCompareList((prev) => prev.filter((m) => m.id !== id));
	};

	const clearCompare = () => {
		setCompareList([]);
	};

	const actionsValue = { addToCompare, removeFromCompare, clearCompare };

	const openCompare = () => {
		setIsCompareOpen(true);
	};

	const closeCompare = () => {
		setIsCompareOpen(false);
	};

	const modalValue = { isCompareOpen, openCompare, closeCompare };

	return (
		<CompareDataContext.Provider value={dataValue}>
			<CompareActionsContext.Provider value={actionsValue}>
				<CompareModalContext.Provider value={modalValue}>{children}</CompareModalContext.Provider>
			</CompareActionsContext.Provider>
		</CompareDataContext.Provider>
	);
};
