import { createInstance } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { resources } from './locales';

const i18n = createInstance({
	fallbackLng: 'ru',
	supportedLngs: ['ru', 'en'],
	defaultNS: 'translation',
	resources,
	interpolation: {
		escapeValue: false,
	},
	detection: {
		order: ['localStorage', 'navigator'],
		caches: ['localStorage'],
	},
});

i18n.use(LanguageDetector).use(initReactI18next).init({});

export default i18n;
