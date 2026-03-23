import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Logo } from '../Logo';

vi.mock('@shared/hooks', () => ({
	useDictionary: () => ({ common: { movies: 'Фильмы' } }),
}));

describe('Logo', () => {
	it('matches snapshot', () => {
		const { container } = render(
			<MemoryRouter>
				<Logo />
			</MemoryRouter>,
		);

		expect(container.firstChild).toMatchSnapshot();
	});
});
