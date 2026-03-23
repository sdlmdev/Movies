import type { Page } from '@playwright/test';

export const mockMoviesApi = async (page: Page, length: number = 0) => {
	await page.route('**/v1.4/movie**', async (route) => {
		if (route.request().url().includes('/search')) {
			return route.fallback();
		}

		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify({
				docs: Array.from({ length }, (_, i) => ({
					id: i,
					name: `Movie ${i}`,
					poster: { url: 'https://via.placeholder.com/300x450' },
					rating: { kp: 8.5 },
					year: 2024,
					genres: [{ name: 'Action' }],
				})),
				total: length,
				limit: 10,
				page: 1,
				pages: 1,
			}),
		});
	});
};

export const mockSearchApi = async (page: Page, length: number = 0) => {
	await page.route('**/v1.4/movie/search*', async (route) => {
		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify({
				docs: Array.from({ length }, (_, i) => ({
					id: i,
					name: `Movie ${i}`,
					poster: { url: 'https://via.placeholder.com/300x450' },
					rating: { kp: 8.5 },
					year: 2024,
					genres: [{ name: 'Action' }],
				})),
				total: length,
				limit: 10,
				page: 1,
				pages: 1,
			}),
		});
	});
};

export const mockDictionaryApi = async (page: Page) => {
	await page.route('**/possible-values-by-field**', async (route) => {
		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify([
				{ name: 'Action', slug: 'action' },
				{ name: 'Comedy', slug: 'comedy' },
			]),
		});
	});
};
