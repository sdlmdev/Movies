import { expect, test } from '@playwright/test';
import { mockMoviesApi } from '../../../test/playwright-mocks';

test.describe('Logo Visual', () => {
	test.beforeEach(async ({ page }) => {
		await mockMoviesApi(page);
		await page.goto('/', { waitUntil: 'networkidle' });
	});

	test('should look correct', async ({ page }) => {
		const logo = page.locator('.vkuiPanelHeader__before, header div:first-child').first();

		await expect(logo).toHaveScreenshot('logo.png');
	});
});
