import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Logo } from '../Logo';

vi.mock('@shared/hooks', () => ({
	useDictionary: () => ({
		common: { movies: 'Movies' },
	}),
}));

describe('Logo', () => {
	it('renders correctly with link to home', () => {
		render(
			<MemoryRouter initialEntries={['/test?q=query']}>
				<Logo />
			</MemoryRouter>,
		);

		const link = screen.getByRole('link');

		expect(link).toHaveAttribute('href', '/?q=query');
		expect(screen.getByText('Movies')).toBeInTheDocument();
	});

	it('matches snapshot', () => {
		const { baseElement } = render(
			<MemoryRouter>
				<Logo />
			</MemoryRouter>,
		);

		expect(baseElement).toMatchSnapshot();
	});
});
