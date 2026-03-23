import { defineConfig, devices } from '@playwright/test';

const IS_CI = !!process.env.CI;
const BASE_URL = 'http://localhost:4173';
const CI_RETRIES = 2;
const CI_WORKERS = 2;

export default defineConfig({
	testDir: './src',
	testMatch: '**/*.visual.{ts,tsx}',
	fullyParallel: true,
	timeout: 60000,
	expect: {
		timeout: 10000,
		toHaveScreenshot: {
			maxDiffPixelRatio: 0.01,
		},
	},
	forbidOnly: IS_CI,
	retries: IS_CI ? CI_RETRIES : 0,
	workers: IS_CI ? CI_WORKERS : undefined,
	reporter: [['html', { outputFolder: 'playwright-report' }]],
	use: {
		baseURL: BASE_URL,
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
	webServer: {
		command: 'npm run preview',
		url: 'http://localhost:4173',
		reuseExistingServer: !IS_CI,
		timeout: 120000,
	},
});
