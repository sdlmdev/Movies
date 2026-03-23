import { expect, test } from '@playwright/test';
import { TEST_COUNTS, TEST_TIMEOUTS } from '@shared/test/constants';
import { mockDictionaryApi, mockMoviesApi } from '@shared/test/playwright-mocks';

test.use({ viewport: { width: 1440, height: 900 } });

test.describe('MoviesFiltersModal Visual', () => {
	test.beforeEach(async ({ page }) => {
		await page.addInitScript(() => {
			window.localStorage.setItem('i18nextLng', 'ru');
		});

		await mockMoviesApi(page, TEST_COUNTS.MIN_MOVIES);
		await mockDictionaryApi(page);
		await page.goto('/', { waitUntil: 'domcontentloaded' });
	});

	test('should show filters modal', async ({ page }) => {
		const filtersBtn = page.getByTestId('filters-button');
		await expect(filtersBtn).toBeVisible({ timeout: TEST_TIMEOUTS.VISUAL });
		await filtersBtn.click({ force: true });

		const modal = page.locator('.vkuiModalRoot, .vkuiModalPage, [role="dialog"]').first();
		await expect(modal).toBeVisible({ timeout: TEST_TIMEOUTS.VISUAL });

		await page.waitForTimeout(TEST_TIMEOUTS.MODAL_TRANSITION);

		await expect(modal).toHaveScreenshot('movies-filters-modal.png');
	});
});
