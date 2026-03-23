import { expect, test } from '@playwright/test';
import { TEST_TIMEOUTS } from '@shared/test/constants';
import { mockMoviesApi } from '../../../test/playwright-mocks';

test.describe('Logo Visual', () => {
	test.beforeEach(async ({ page }) => {
		await mockMoviesApi(page);
		await page.goto('/', { waitUntil: 'networkidle' });
	});

	test('should look correct', async ({ page }) => {
		const logo = page.getByTestId('logo');

		await expect(logo).toBeInViewport({ timeout: TEST_TIMEOUTS.VISUAL });

		await expect(logo).toHaveScreenshot('logo.png');
	});
});
