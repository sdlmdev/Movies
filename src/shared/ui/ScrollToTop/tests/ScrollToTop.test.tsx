import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TEST_SCROLL } from '@shared/test/constants';
import { ScrollToTop } from '../ScrollToTop';

describe('ScrollToTop', () => {
	it('is hidden by default', () => {
		render(<ScrollToTop />);
		const arrow = screen.queryByRole('button');
		expect(arrow).not.toHaveClass(/visible/);
	});

	it('shows when scrolled past threshold', () => {
		render(<ScrollToTop />);

		Object.defineProperty(window, 'scrollY', { value: TEST_SCROLL.THRESHOLD + 1, writable: true });
		fireEvent.scroll(window);

		const arrow = screen.getByRole('button');
		expect(arrow).toBeInTheDocument();
	});
});
