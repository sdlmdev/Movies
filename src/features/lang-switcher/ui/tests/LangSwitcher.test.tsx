import { fireEvent, render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LangSwitcher } from '../LangSwitcher';

vi.mock('react-i18next', () => ({
	useTranslation: vi.fn(),
}));

describe('LangSwitcher', () => {
	const mockChangeLanguage = vi.fn();

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('renders current language and toggles it', () => {
		(useTranslation as any).mockReturnValue({
			i18n: {
				language: 'ru',
				changeLanguage: mockChangeLanguage,
			},
		});

		render(<LangSwitcher />);

		const toggle = screen.getByTestId('lang-switcher');

		expect(toggle).toHaveTextContent('RU');

		fireEvent.click(toggle);
		expect(mockChangeLanguage).toHaveBeenCalledWith('en');
	});

	it('toggles from en to ru', () => {
		(useTranslation as any).mockReturnValue({
			i18n: {
				language: 'en',
				changeLanguage: mockChangeLanguage,
			},
		});

		render(<LangSwitcher />);

		const toggle = screen.getByTestId('lang-switcher');

		expect(toggle).toHaveTextContent('EN');

		fireEvent.click(toggle);
		expect(mockChangeLanguage).toHaveBeenCalledWith('ru');
	});
});
