import { Icon28MoonOutline, Icon28SunOutline } from '@vkontakte/icons';
import { IconButton } from '@vkontakte/vkui';
import { useTheme } from '@shared/hooks';
import { Theme } from '@shared/types/theme';

export const ThemeSwitcher = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<IconButton onClick={toggleTheme} aria-label="toggle theme" data-testid="theme-switcher">
			{theme === Theme.LIGHT ? <Icon28MoonOutline /> : <Icon28SunOutline />}
		</IconButton>
	);
};
