import { expect, test } from '@playwright/test';
import { mockMoviesApi } from '../../../test/playwright-mocks';

test.describe('NavigationButton Visual', () => {
	test.beforeEach(async ({ page }) => {
		await mockMoviesApi(page);
		await page.goto('/', { waitUntil: 'networkidle' });
	});

	test('should look correct', async ({ page }) => {
		const navBtn = page.locator('.vkuiPanelHeader__after, header div:last-child').first();

		await expect(navBtn).toHaveScreenshot('nav-button.png');
	});
});
