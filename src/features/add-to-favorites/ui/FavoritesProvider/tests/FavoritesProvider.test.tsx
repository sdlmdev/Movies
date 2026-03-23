import { act, useContext } from 'react';
import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import type { Movie } from '@entities/movie/model/types';
import {
	FavoritesActionsContext,
	FavoritesDataContext,
	FavoritesModalContext,
} from '../FavoritesContext';
import { FavoritesProvider } from '../FavoritesProvider';

const MOVIE_ID = 1;
const MOVIE_NAME = 'Movie';
const MOVIE = { id: MOVIE_ID, name: MOVIE_NAME } as Movie;

const wrapper = ({ children }: { children: React.ReactNode }) => (
	<FavoritesProvider>{children}</FavoritesProvider>
);

describe('FavoritesProvider', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	const useFavorites = () => ({
		data: useContext(FavoritesDataContext),
		actions: useContext(FavoritesActionsContext),
		modal: useContext(FavoritesModalContext),
	});

	it('starts with empty favorites', () => {
		const { result } = renderHook(() => useFavorites(), { wrapper });
		expect(result.current.data?.favorites).toEqual([]);
	});

	it('handles confirm-to-add flow', () => {
		const { result } = renderHook(() => useFavorites(), { wrapper });

		act(() => {
			result.current.actions?.requestAddToFavorites(MOVIE);
		});

		expect(result.current.modal?.isConfirmOpen).toBe(true);
		expect(result.current.modal?.pendingMovie).toEqual(MOVIE);
		expect(result.current.data?.favorites).toHaveLength(0);

		act(() => {
			result.current.modal?.confirmAdd();
		});

		expect(result.current.modal?.isConfirmOpen).toBe(false);
		expect(result.current.data?.favorites).toHaveLength(1);
		expect(result.current.data?.isFavorite(MOVIE.id)).toBe(true);
	});

	it('handles cancel-add flow', () => {
		const { result } = renderHook(() => useFavorites(), { wrapper });

		act(() => {
			result.current.actions?.requestAddToFavorites(MOVIE);
		});

		act(() => {
			result.current.modal?.cancelAdd();
		});

		expect(result.current.modal?.isConfirmOpen).toBe(false);
		expect(result.current.modal?.pendingMovie).toBeNull();
	});

	it('removes from favorites', () => {
		const { result } = renderHook(() => useFavorites(), { wrapper });

		act(() => {
			result.current.actions?.requestAddToFavorites(MOVIE);
		});

		act(() => {
			result.current.modal?.confirmAdd();
		});

		act(() => {
			result.current.actions?.removeFromFavorites(MOVIE.id);
		});

		expect(result.current.data?.favorites).toHaveLength(0);
	});
});
