import { expect, test } from '@playwright/test';
import { TEST_TIMEOUTS } from '@shared/test/constants';

test.describe('ThemeSwitcher Visual', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should toggle theme and take screenshot', async ({ page }) => {
		const themeBtn = page.getByTestId('theme-switcher').first();

		await expect(themeBtn).toBeVisible({ timeout: TEST_TIMEOUTS.VISIBLE });
		await themeBtn.click();
		await page.waitForTimeout(TEST_TIMEOUTS.MODAL_TRANSITION);
		await expect(themeBtn).toHaveScreenshot('theme-switcher-toggled.png');
	});
});
