import { useTranslation } from 'react-i18next';
import { resources } from '../lib/i18n/locales';

export const useDictionary = () => {
	const { i18n } = useTranslation();
	const currentLang = (i18n.language || 'ru') as keyof typeof resources;

	return resources[currentLang].translation || resources.ru.translation;
};
