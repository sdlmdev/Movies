import { act, render, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GRID_CONFIG } from '@shared/constants/ui';
import { useGridColumns } from './useGridColumns';

const MOCK_WIDTH = 1200;
const TEST_ID = 'grid-container';

class ResizeObserverMock {
	observe = vi.fn();
	unobserve = vi.fn();
	disconnect = vi.fn();
	constructor(public callback: ResizeObserverCallback) {
		(ResizeObserverMock as unknown as { callback: ResizeObserverCallback }).callback = callback;
	}
}

describe('useGridColumns', () => {
	beforeEach(() => {
		vi.stubGlobal('ResizeObserver', ResizeObserverMock);
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('should return default columns initially', () => {
		const { result } = renderHook(() => useGridColumns());

		expect(result.current.columns).toBe(GRID_CONFIG.DEFAULT_COLUMNS);
	});

	it('should calculate and set new columns when ResizeObserver triggers', () => {
		const TestComponent = () => {
			const { containerRef, columns } = useGridColumns();

			return (
				<div ref={containerRef} data-testid={TEST_ID}>
					{columns}
				</div>
			);
		};

		const { getByTestId } = render(<TestComponent />);

		const callback = (ResizeObserverMock as unknown as { callback: ResizeObserverCallback })
			.callback;

		expect(callback).toBeDefined();

		const el = getByTestId(TEST_ID);
		Object.defineProperty(el, 'offsetWidth', { configurable: true, value: MOCK_WIDTH });

		act(() => {
			callback([] as unknown as Array<ResizeObserverEntry>, {} as ResizeObserver);
		});

		const expectedCols = Math.max(
			1,
			Math.floor((MOCK_WIDTH + GRID_CONFIG.GAP) / (GRID_CONFIG.CARD_MIN_WIDTH + GRID_CONFIG.GAP)),
		);

		expect(el.textContent).toBe(String(expectedCols));
	});
});
