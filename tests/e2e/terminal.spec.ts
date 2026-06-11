import { expect, test } from '@playwright/test';

test('protege el curso de terminal si no hay sesión', async ({ page }) => {
	await page.goto('/terminal', { waitUntil: 'domcontentloaded' });

	await expect(page).toHaveURL(/\/login$/);
	await expect(page.getByRole('heading', { name: 'Service Desk Studio' })).toBeVisible();
});
