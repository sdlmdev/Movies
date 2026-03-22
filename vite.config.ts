import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	base: '/',
	plugins: [
		react({
			babel: {
				plugins: [['babel-plugin-react-compiler']],
			},
		}),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.ico', 'icon.svg'],
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
	server: {
		proxy: {
			'/api-proxy': {
				target: 'https://api.kinopoisk.dev',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api-proxy/, ''),
			},
		},
	},
});
