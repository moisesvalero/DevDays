import { expect, test } from '@playwright/test';

test('muestra una landing pública antes de entrar al simulador', async ({ page }) => {
	const browserErrors: string[] = [];
	page.on('pageerror', (error) => browserErrors.push(error.message));
	page.on('console', (message) => {
		if (message.type() === 'error') browserErrors.push(message.text());
	});

	await page.setViewportSize({ width: 1440, height: 1000 });
	await page.goto('/');
	await page.waitForLoadState('networkidle');

	await expect(page.getByRole('heading', { name: /Practica soporte IT/ })).toBeVisible();
	await expect(page.getByText('Simulador de incidencias IT')).toBeVisible();
	await expect(page.getByText('Laboratorio de comandos diarios')).toBeVisible();
	await expect(page.getByRole('link', { name: 'Iniciar sesión' }).first()).toBeVisible();
	await expect(page.getByRole('link', { name: 'Registrarse' }).first()).toBeVisible();

	await page.getByTestId('floating-support-toggle').click();
	await expect(page.locator('#support-panel')).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Guía rápida del simulador' })).toBeVisible();

	expect(browserErrors, browserErrors.join('\n')).toEqual([]);
});

test('protege el dashboard de tickets si no hay sesión', async ({ page }) => {
	await page.goto('/estudio', { waitUntil: 'domcontentloaded' });

	await expect(page).toHaveURL(/\/login$/);
	await expect(page.getByRole('heading', { name: 'Service Desk Studio' })).toBeVisible();
});
