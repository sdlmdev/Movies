import { expect, test } from '@playwright/test';
import { TEST_COUNTS, TEST_TIMEOUTS } from '@shared/test/constants';
import { mockDictionaryApi, mockMoviesApi } from '@shared/test/playwright-mocks';

test.describe('CompareModal Visual', () => {
	test.beforeEach(async ({ page }) => {
		await page.addInitScript(() => {
			window.localStorage.setItem('i18nextLng', 'ru');
		});

		await mockMoviesApi(page, TEST_COUNTS.MIN_MOVIES);
		await mockDictionaryApi(page);
		await page.goto('/');
	});

	test('should show compare modal with movies', async ({ page }) => {
		await page.waitForSelector('text=Movie 0', { timeout: TEST_TIMEOUTS.VISUAL });

		const btn = page.getByTestId('compare-button').nth(1);

		await btn.click({ force: true });
		await btn.click({ force: true });

		const headerCompareBtn = page.getByTestId('compare-button').first();

		await expect(headerCompareBtn).toBeVisible({ timeout: TEST_TIMEOUTS.VISIBLE });
		await headerCompareBtn.click({ force: true });

		const modal = page.locator('.vkuiModalRoot, .vkuiModalPage, [role="dialog"]').first();
		await expect(modal).toBeVisible({ timeout: TEST_TIMEOUTS.VISUAL });

		await expect(modal).toHaveScreenshot('compare-modal.png');
	});
});
