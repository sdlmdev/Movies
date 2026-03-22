/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/react" />

interface ImportMetaEnv {
	readonly VITE_KINOPOISK_API_KEY: string;
	readonly VITE_KINOPOISK_BASE_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
