import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NavigationButton } from '../NavigationButton';

const ICON_LABEL = 'home';
const TARGET_PATH = '/';

describe('NavigationButton', () => {
	it('matches snapshot when inactive', () => {
		const { container } = render(
			<MemoryRouter initialEntries={['/other']}>
				<NavigationButton to={TARGET_PATH}>{ICON_LABEL}</NavigationButton>
			</MemoryRouter>,
		);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('matches snapshot when active', () => {
		const { container } = render(
			<MemoryRouter initialEntries={[TARGET_PATH]}>
				<NavigationButton to={TARGET_PATH}>{ICON_LABEL}</NavigationButton>
			</MemoryRouter>,
		);

		expect(container.firstChild).toMatchSnapshot();
	});
});
