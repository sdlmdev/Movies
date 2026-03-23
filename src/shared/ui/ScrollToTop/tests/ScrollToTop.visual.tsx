import { expect, test } from '@playwright/test';
import { mockMoviesApi } from '../../../test/playwright-mocks';

const SCROLL_AMOUNT = 1000;
const SCROLL_TRIGGER_COUNT = 12;

test.describe('ScrollToTop Visual', () => {
	test.beforeEach(async ({ page }) => {
		await mockMoviesApi(page, SCROLL_TRIGGER_COUNT);
		await page.goto('/', { waitUntil: 'networkidle' });
	});

	test('should appear and look correct after scroll', async ({ page }) => {
		const scrollBtn = page
			.locator('.vkuiScrollArrow, .vkuiInternalScrollArrow, button:has(svg)')
			.last();

		await expect(scrollBtn).toHaveCSS('opacity', '0');
		await page.evaluate((amount) => window.scrollTo(0, amount), SCROLL_AMOUNT);
		await expect(scrollBtn).toHaveCSS('opacity', '1', { timeout: 10000 });
		await expect(scrollBtn).toHaveScreenshot('scroll-to-top.png');
	});
});
