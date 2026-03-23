import { expect, test } from '@playwright/test';
import { mockMoviesApi } from '../../../../shared/test/playwright-mocks';

test.describe('LangSwitcher Visual', () => {
	test.beforeEach(async ({ page }) => {
		await page.addInitScript(() => {
			window.localStorage.setItem('i18nextLng', 'ru');
		});

		await mockMoviesApi(page);
		await page.goto('/', { waitUntil: 'domcontentloaded' });
	});

	test('should toggle language visually', async ({ page }) => {
		const langBtn = page.getByTestId('lang-switcher').first();

		await expect(langBtn).toContainText('RU');
		await expect(langBtn).toHaveScreenshot('lang-switcher-ru.png');

		await langBtn.click();
		await expect(langBtn).toContainText('EN');
		await expect(langBtn).toHaveScreenshot('lang-switcher-en.png');
	});
});
