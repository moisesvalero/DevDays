import { expect, test } from '@playwright/test';

test('permite practicar y corregir un ticket sin sesión', async ({ page }) => {
	const browserErrors: string[] = [];
	page.on('pageerror', (error) => browserErrors.push(error.message));
	page.on('console', (message) => {
		if (message.type() === 'error') browserErrors.push(message.text());
	});

	await page.setViewportSize({ width: 1440, height: 1000 });
	await page.goto('/estudio');
	await page.waitForLoadState('networkidle');

	await expect(page.getByRole('heading', { name: 'Service Desk Studio' })).toBeVisible();
	await expect(page.getByText('Gestión de Incidentes')).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Contraseña caducada' })).toBeVisible();

	await page.getByRole('button', { name: /Interrogar/ }).click();
	await page
		.getByRole('button', { name: /Configuración/ })
		.first()
		.click();
	await page.getByRole('button', { name: /Guiar cambio/ }).click();

	await page
		.getByPlaceholder('Análisis del problema...')
		.fill('Cuenta activa con contraseña caducada o expirada.');
	await page
		.getByPlaceholder('Instrucciones para el cliente...')
		.fill('Verificar identidad, cambiar contraseña e iniciar sesión otra vez.');

	const correctionResponse = page.waitForResponse((response) =>
		response.url().includes('/api/corregir')
	);
	await page.getByRole('button', { name: 'Corregir Ticket' }).click();
	expect((await correctionResponse).ok(), browserErrors.join('\n')).toBe(true);

	await expect(page.getByText('Evaluación')).toBeVisible();
});
