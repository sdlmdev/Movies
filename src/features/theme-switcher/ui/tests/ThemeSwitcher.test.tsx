import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useTheme } from '@shared/hooks';
import { Theme } from '@shared/types/theme';
import { ThemeSwitcher } from '../ThemeSwitcher';

vi.mock('@shared/hooks', () => ({
	useTheme: vi.fn(),
}));

vi.mock('@vkontakte/icons', () => ({
	Icon28MoonOutline: () => <MockIcon name="moon" />,
	Icon28SunOutline: () => <MockIcon name="sun" />,
}));

const MockIcon = ({ name }: { name: string }) => <div data-testid={`icon-${name}`} />;

describe('ThemeSwitcher', () => {
	it('matches snapshot in LIGHT theme', () => {
		vi.mocked(useTheme).mockReturnValue({
			theme: Theme.LIGHT,
			toggleTheme: vi.fn(),
		});

		const { baseElement } = render(<ThemeSwitcher />);

		expect(screen.getByTestId('icon-moon')).toBeInTheDocument();
		expect(baseElement).toMatchSnapshot();
	});

	it('matches snapshot in DARK theme', () => {
		vi.mocked(useTheme).mockReturnValue({
			theme: Theme.DARK,
			toggleTheme: vi.fn(),
		});

		const { baseElement } = render(<ThemeSwitcher />);

		expect(screen.getByTestId('icon-sun')).toBeInTheDocument();
		expect(baseElement).toMatchSnapshot();
	});

	it('renders theme switcher', () => {
		vi.mocked(useTheme).mockReturnValue({
			theme: Theme.LIGHT,
			toggleTheme: vi.fn(),
		});

		render(<ThemeSwitcher />);
		expect(screen.getByTestId('theme-switcher')).toBeInTheDocument();
	});

	it('calls toggleTheme on click', () => {
		const toggleTheme = vi.fn();

		vi.mocked(useTheme).mockReturnValue({
			theme: Theme.LIGHT,
			toggleTheme,
		});

		render(<ThemeSwitcher />);

		fireEvent.click(screen.getByTestId('theme-switcher'));
		expect(toggleTheme).toHaveBeenCalled();
	});
});
