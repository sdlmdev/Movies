import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ScrollToTop } from '../ScrollToTop';

describe('ScrollToTop', () => {
	it('matches snapshot when hidden', () => {
		const { container } = render(<ScrollToTop />);

		expect(container.firstChild).toMatchSnapshot();
	});
});
