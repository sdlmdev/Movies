import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SEARCH_CONFIG } from '@shared/constants/common';
import { useDebounce } from './useDebounce';

const INITIAL_VALUE = 'test';
const UPDATED_VALUE = 'updated';
const DELAY = SEARCH_CONFIG.DEBOUNCE_DELAY;

describe('useDebounce', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('should return initial value immediately', () => {
		const { result } = renderHook(() => useDebounce(INITIAL_VALUE, DELAY));

		expect(result.current).toBe(INITIAL_VALUE);
	});

	it('should debounce value changes', () => {
		const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
			initialProps: { value: INITIAL_VALUE, delay: DELAY },
		});

		expect(result.current).toBe(INITIAL_VALUE);
		rerender({ value: UPDATED_VALUE, delay: DELAY });
		expect(result.current).toBe(INITIAL_VALUE);

		act(() => {
			vi.advanceTimersByTime(DELAY);
		});

		expect(result.current).toBe(UPDATED_VALUE);
	});
});
