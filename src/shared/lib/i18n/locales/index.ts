import { translation as en } from './en/translation';
import { translation as ru } from './ru/translation';

export const resources = {
	en: { translation: en },
	ru: { translation: ru },
} as const;
