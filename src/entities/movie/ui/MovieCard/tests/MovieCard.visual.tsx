import { expect, test } from '@playwright/test';
import { TEST_TIMEOUTS } from '@shared/test/constants';
import { mockMoviesApi } from '@shared/test/playwright-mocks';

test.describe('MovieCard Visual', () => {
	test.beforeEach(async ({ page }) => {
		const MOCK_MOVIES_COUNT = 1;
		await mockMoviesApi(page, MOCK_MOVIES_COUNT);
		await page.goto('/');
	});

	test('should render movie card correctly', async ({ page }) => {
		const movieTitle = page.getByText('Movie 0').first();
		await movieTitle.scrollIntoViewIfNeeded();
		await expect(movieTitle).toBeVisible({ timeout: TEST_TIMEOUTS.VISUAL });

		const movieCard = page.locator('div').filter({ has: movieTitle }).first();
		await expect(movieCard).toHaveScreenshot('movie-card-default.png');
	});
});
