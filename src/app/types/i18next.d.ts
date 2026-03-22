import 'i18next';
import { resources } from '@shared/lib/i18n/locales';

declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: 'translation';
		resources: {
			translation: typeof resources.ru.translation;
		};
	}
}
