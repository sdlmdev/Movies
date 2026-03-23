import { act, useContext } from 'react';
import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import type { Movie } from '@entities/movie/model/types';
import { CompareActionsContext, CompareDataContext, CompareModalContext } from '../CompareContext';
import { CompareProvider, MAX_COMPARE_ITEMS } from '../CompareProvider';

const MOVIE_ID_1 = 1;
const MOVIE_ID_2 = 2;
const MOVIE_ID_3 = 3;

const MOVIE_NAME_1 = 'Movie 1';
const MOVIE_NAME_2 = 'Movie 2';
const MOVIE_NAME_3 = 'Movie 3';

const MOVIE_1 = { id: MOVIE_ID_1, name: MOVIE_NAME_1 } as Movie;
const MOVIE_2 = { id: MOVIE_ID_2, name: MOVIE_NAME_2 } as Movie;
const MOVIE_3 = { id: MOVIE_ID_3, name: MOVIE_NAME_3 } as Movie;

const wrapper = ({ children }: { children: React.ReactNode }) => (
	<CompareProvider>{children}</CompareProvider>
);

describe('CompareProvider', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	const useCompare = () => ({
		data: useContext(CompareDataContext),
		actions: useContext(CompareActionsContext),
		modal: useContext(CompareModalContext),
	});

	it('starts with empty list', () => {
		const { result } = renderHook(() => useCompare(), { wrapper });
		expect(result.current.data?.compareList).toEqual([]);
	});

	it('adds movies to compare', () => {
		const { result } = renderHook(() => useCompare(), { wrapper });

		act(() => {
			result.current.actions?.addToCompare(MOVIE_1);
		});

		expect(result.current.data?.compareList).toHaveLength(1);
		expect(result.current.data?.isInCompare(MOVIE_1.id)).toBe(true);
	});

	it(`respects MAX_COMPARE_ITEMS limit (${MAX_COMPARE_ITEMS})`, () => {
		const { result } = renderHook(() => useCompare(), { wrapper });

		act(() => {
			result.current.actions?.addToCompare(MOVIE_1);
			result.current.actions?.addToCompare(MOVIE_2);
			result.current.actions?.addToCompare(MOVIE_3);
		});

		expect(result.current.data?.compareList).toHaveLength(MAX_COMPARE_ITEMS);
		expect(result.current.data?.compareList?.[0].id).toBe(MOVIE_ID_2);
		expect(result.current.data?.compareList?.[1].id).toBe(MOVIE_ID_3);
	});

	it('removes from compare', () => {
		const { result } = renderHook(() => useCompare(), { wrapper });

		act(() => {
			result.current.actions?.addToCompare(MOVIE_1);
			result.current.actions?.removeFromCompare(MOVIE_1.id);
		});

		expect(result.current.data?.compareList).toHaveLength(0);
	});

	it('toggles modal state', () => {
		const { result } = renderHook(() => useCompare(), { wrapper });

		expect(result.current.modal?.isCompareOpen).toBe(false);

		act(() => {
			result.current.modal?.openCompare();
		});

		expect(result.current.modal?.isCompareOpen).toBe(true);

		act(() => {
			result.current.modal?.closeCompare();
		});

		expect(result.current.modal?.isCompareOpen).toBe(false);
	});
});
