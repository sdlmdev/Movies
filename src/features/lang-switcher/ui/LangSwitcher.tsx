import { PanelHeaderButton } from '@vkontakte/vkui';
import { useTranslation } from 'react-i18next';

export const LangSwitcher = () => {
	const { i18n } = useTranslation();

	const toggleLanguage = () => {
		const nextLang = i18n.language === 'ru' ? 'en' : 'ru';

		i18n.changeLanguage(nextLang);
	};

	const displayLang = i18n.language.toUpperCase();

	return (
		<PanelHeaderButton
			onClick={toggleLanguage}
			aria-label="switch language"
			data-testid="lang-switcher"
		>
			{displayLang}
		</PanelHeaderButton>
	);
};
