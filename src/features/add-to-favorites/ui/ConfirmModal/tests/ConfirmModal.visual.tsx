import { expect, test } from '@playwright/test';
import { TEST_COUNTS, TEST_TIMEOUTS } from '@shared/test/constants';
import { mockDictionaryApi, mockMoviesApi } from '@shared/test/playwright-mocks';

test.describe('ConfirmModal Visual', () => {
	test.beforeEach(async ({ page }) => {
		await page.addInitScript(() => {
			window.localStorage.setItem('i18nextLng', 'ru');
		});

		await mockMoviesApi(page, TEST_COUNTS.MIN_MOVIES);
		await mockDictionaryApi(page);
		await page.goto('/', { waitUntil: 'domcontentloaded' });
		await page.waitForSelector('button', { timeout: TEST_TIMEOUTS.VISIBLE });
	});

	test('should show confirm modal with movies', async ({ page }) => {
		await mockMoviesApi(page, TEST_COUNTS.MIN_MOVIES);
		await page.waitForSelector('img[alt]', { timeout: TEST_TIMEOUTS.VISUAL });

		const favoriteBtn = page.getByTestId('favorite-button').last();
		await expect(favoriteBtn).toBeVisible({ timeout: TEST_TIMEOUTS.VISIBLE });

		await favoriteBtn.click({ force: true });

		const modal = page.locator('.vkuiModalRoot, .vkuiModalCard, [role="dialog"]').first();
		await expect(modal).toBeVisible({ timeout: TEST_TIMEOUTS.VISIBLE });

		await expect(modal).toContainText(/Добавить в избранное|Add to favorites/i);
		await expect(modal).toHaveScreenshot('confirm-modal.png');
	});
});
