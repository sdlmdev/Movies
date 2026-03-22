import { useEffect } from 'react';
import { Theme, ThemeValues } from '@shared/types/theme';
import { THEME_KEY } from '../constants/localStorageKeys';
import { useLocalStorage } from './useLocalStorage';

export const useTheme = () => {
	const [theme, setTheme] = useLocalStorage<ThemeValues>(THEME_KEY, Theme.DARK);

	useEffect(() => {
		if (theme !== Theme.LIGHT && theme !== Theme.DARK) {
			setTheme(Theme.DARK);
		}
	}, [theme, setTheme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
	};

	return { theme, toggleTheme };
};
