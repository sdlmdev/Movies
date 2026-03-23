import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useLocalStorage } from './useLocalStorage';

const KEY = 'test-key';
const INITIAL_VALUE = 'initial';
const STORED_VALUE = 'stored';
const UPDATED_VALUE = 'updated';

const ARRAY_INITIAL = ['a'];
const ARRAY_ADDING = 'b';
const ARRAY_UPDATED = ['a', 'b'];

describe('useLocalStorage', () => {
	beforeEach(() => {
		window.localStorage.clear();
	});

	afterEach(() => {
		window.localStorage.clear();
		vi.restoreAllMocks();
	});

	it('should initialize with provided value when localStorage is empty', () => {
		const { result } = renderHook(() => useLocalStorage(KEY, INITIAL_VALUE));

		expect(result.current[0]).toBe(INITIAL_VALUE);
		expect(window.localStorage.getItem(KEY)).toBe(JSON.stringify(INITIAL_VALUE));
	});

	it('should initialize with stored value if localStorage has data', () => {
		window.localStorage.setItem(KEY, JSON.stringify(STORED_VALUE));

		const { result } = renderHook(() => useLocalStorage(KEY, INITIAL_VALUE));

		expect(result.current[0]).toBe(STORED_VALUE);
	});

	it('should update stored value and localStorage when setValue is called', () => {
		const { result } = renderHook(() => useLocalStorage(KEY, INITIAL_VALUE));

		act(() => {
			result.current[1](UPDATED_VALUE);
		});

		expect(result.current[0]).toBe(UPDATED_VALUE);
		expect(window.localStorage.getItem(KEY)).toBe(JSON.stringify(UPDATED_VALUE));
	});

	it('should pass previous state to updater function', () => {
		const { result } = renderHook(() => useLocalStorage<Array<string>>(KEY, ARRAY_INITIAL));

		act(() => {
			result.current[1]((prev) => [...prev, ARRAY_ADDING]);
		});

		expect(result.current[0]).toEqual(ARRAY_UPDATED);
		expect(window.localStorage.getItem(KEY)).toBe(JSON.stringify(ARRAY_UPDATED));
	});
});
