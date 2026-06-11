import { expect, test } from '@playwright/test';

test('permite practicar comandos WSL en la terminal simulada', async ({ page }) => {
	const browserErrors: string[] = [];
	page.on('pageerror', (error) => browserErrors.push(error.message));
	page.on('console', (message) => {
		if (message.type() === 'error') browserErrors.push(message.text());
	});

	await page.setViewportSize({ width: 1440, height: 1000 });
	await page.goto('/terminal');
	await page.waitForLoadState('networkidle');

	await expect(page.getByRole('heading', { name: 'Terminal Studio' })).toBeVisible();
	await expect(page.getByText('WSL, Git y pnpm')).toBeVisible();
	await expect(page.getByText('Terminal Ubuntu-Dev')).toBeVisible();

	const terminal = page.locator('.xterm').first();
	await terminal.click();
	for (const command of ['pwd', 'cd ~/webs', 'ls']) {
		await page.keyboard.type(command);
		await page.keyboard.press('Enter');
	}

	await expect(page.getByText('100%')).toBeVisible();
	await expect(
		page.getByText('Ya estás en la carpeta correcta para trabajar desde WSL')
	).toBeVisible();
	expect(browserErrors, browserErrors.join('\n')).toEqual([]);
});
