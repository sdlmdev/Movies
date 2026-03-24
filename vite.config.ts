import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const isGhPages = env.VITE_APP_GH_PAGES === 'true';
	const base = isGhPages ? '/Movies/' : '/';

	return {
		base,
		plugins: [
			react({
				babel: {
					plugins: [['babel-plugin-react-compiler']],
				},
			}),
			VitePWA({
				base,
				registerType: 'autoUpdate',
				includeAssets: ['favicon.ico', 'icon.svg', 'apple-touch-icon.png', 'mask-icon.svg'],
				manifest: {
					name: 'Movies',
					short_name: 'Movies',
					description: 'Приложение для просмотра информации о фильмах',
					theme_color: '#0077FF',
					background_color: '#1C1C1E',
					display: 'standalone',
					icons: [
						{
							src: 'icon.svg',
							sizes: 'any',
							type: 'image/svg+xml',
							purpose: 'any maskable',
						},
					],
				},
				workbox: {
					globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
				},
			}),
		],
		resolve: {
			alias: {
				'@app': resolve(__dirname, 'src/app'),
				'@pages': resolve(__dirname, 'src/pages'),
				'@widgets': resolve(__dirname, 'src/widgets'),
				'@features': resolve(__dirname, 'src/features'),
				'@entities': resolve(__dirname, 'src/entities'),
				'@shared': resolve(__dirname, 'src/shared'),
			},
		},
		css: {
			modules: {
				localsConvention: 'camelCase',
			},
			preprocessorOptions: {
				scss: {
					additionalData: `@use "${resolve(__dirname, 'src/app/styles/_mixins.scss').replace(/\\/g, '/')}" as *;`,
				},
			},
		},
	};
});
