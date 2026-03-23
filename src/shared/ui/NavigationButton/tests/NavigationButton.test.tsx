import { MemoryRouter, useLocation } from 'react-router';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NavigationButton } from '../NavigationButton';

const LocationDisplay = () => {
	const location = useLocation();

	return <div data-testid="location">{location.pathname}</div>;
};

describe('NavigationButton', () => {
	it('navigates to "to" prop on click', () => {
		render(
			<MemoryRouter initialEntries={['/']}>
				<NavigationButton to="/test">Click me</NavigationButton>
				<LocationDisplay />
			</MemoryRouter>,
		);

		fireEvent.click(screen.getByRole('button'));
		expect(screen.getByTestId('location')).toHaveTextContent('/test');
	});

	it('shows active state when pathname matches', () => {
		render(
			<MemoryRouter initialEntries={['/test']}>
				<NavigationButton to="/test">Click me</NavigationButton>
			</MemoryRouter>,
		);

		const button = screen.getByRole('button');

		expect(button).toBeInTheDocument();
	});

	it('matches snapshot', () => {
		const { baseElement } = render(
			<MemoryRouter>
				<NavigationButton to="/test">Click me</NavigationButton>
			</MemoryRouter>,
		);

		expect(baseElement).toMatchSnapshot();
	});
});
