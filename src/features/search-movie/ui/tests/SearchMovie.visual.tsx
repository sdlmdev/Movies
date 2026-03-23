import { expect, test } from '@playwright/test';
import { TEST_COUNTS, TEST_TIMEOUTS } from '@shared/test/constants';
import { mockDictionaryApi, mockSearchApi } from '@shared/test/playwright-mocks';

const DEBOUNCE_WAIT = 1000;

test.describe('SearchMovie Visual', () => {
	test.beforeEach(async ({ page }) => {
		await page.addInitScript(() => {
			window.localStorage.setItem('i18nextLng', 'ru');
		});

		await mockSearchApi(page, TEST_COUNTS.DEFAULT_MOVIES);
		await mockDictionaryApi(page);
		await page.goto('/');
	});

	test('should show search results in popover', async ({ page }) => {
		const searchInput = page.locator('input[type="search"], input').first();

		await expect(searchInput).toBeVisible();
		await searchInput.pressSequentially('Movie', { delay: 50 });
		await page.waitForTimeout(DEBOUNCE_WAIT);

		const popover = page.getByTestId('search-results');

		await expect(popover).toBeVisible({ timeout: TEST_TIMEOUTS.VISIBLE });
		await expect(popover).toHaveScreenshot('search-results-popover.png');
	});

	test('should navigate to movie page on result click', async ({ page }) => {
		const searchInput = page.locator('input[type="search"], input').first();
		await searchInput.fill('Movie');

		await page.waitForTimeout(DEBOUNCE_WAIT);

		const firstResult = page.getByTestId('movie-search-cell').first();

		await expect(firstResult).toBeVisible({ timeout: TEST_TIMEOUTS.VISIBLE });
		await firstResult.click();
		await expect(page).toHaveURL(/\/movie\/\d+/);
	});
});
