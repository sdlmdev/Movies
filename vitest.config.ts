import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/shared/test/setup.ts'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			thresholds: {
				statements: 70,
				branches: 70,
				functions: 70,
				lines: 70,
			},
			exclude: [
				'node_modules/**',
				'dist/**',
				'src/**/*.d.ts',
				'src/app/**',
				'src/**/*.stories.tsx',
				'src/shared/test/**',
				'playwright.config.ts',
				'vite.config.ts',
				'eslint.config.ts',
			],
		},
	},
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
});
