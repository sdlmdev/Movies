import { expect, test } from '@playwright/test';
import { TEST_TIMEOUTS } from '@shared/test/constants';

test.describe('Shared Components Visual', () => {
	test.beforeEach(async ({ page }) => {
		await page.addInitScript(() => {
			window.localStorage.setItem('i18nextLng', 'ru');
		});

		await page.goto('/');
	});

	test('should render Logo correctly', async ({ page }) => {
		const logo = page.getByTestId('logo').first();

		await expect(logo).toBeVisible({ timeout: TEST_TIMEOUTS.VISIBLE });
		await expect(logo).toHaveScreenshot('logo.png');
	});

	test('should render NavigationButton correctly', async ({ page }) => {
		const navBtn = page.getByRole('link', { name: /Назад|Back/i }).first();

		if (await navBtn.isVisible()) {
			await expect(navBtn).toHaveScreenshot('navigation-button.png');
		}
	});
});
