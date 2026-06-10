import { expect, test } from '@playwright/test';

test('permite practicar y corregir un ticket sin sesión', async ({ page }) => {
	const browserErrors: string[] = [];
	page.on('pageerror', (error) => browserErrors.push(error.message));
	page.on('console', (message) => {
		if (message.type() === 'error') browserErrors.push(message.text());
	});

	await page.goto('/estudio');
	await page.waitForLoadState('networkidle');

	await expect(page.getByRole('heading', { name: 'Cola' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Contraseña caducada' })).toBeVisible();

	await page.getByRole('button', { name: /Confirmar identidad/ }).click();
	await page.getByRole('button', { name: /Revisar estado de la cuenta/ }).click();
	await page.getByRole('button', { name: /Guiar cambio de contraseña/ }).click();

	await page.getByLabel('Notas técnicas').fill('Cuenta activa con contraseña caducada.');
	await page
		.getByLabel('Diagnóstico')
		.fill('La cuenta está activa y el problema es una contraseña caducada o expirada.');
	await page
		.getByLabel('Solución')
		.fill('Verificar identidad, cambiar contraseña e iniciar sesión otra vez.');
	await page
		.getByLabel('Respuesta al usuario')
		.fill(
			'Hola, he revisado la cuenta y estaba activa con la contraseña caducada. Ya puedes iniciar sesión con la nueva clave. Si vuelve a pasar, avísanos.'
		);

	const correctionResponse = page.waitForResponse((response) =>
		response.url().includes('/api/corregir')
	);
	await page.getByRole('button', { name: 'Corregir ticket' }).click();
	expect((await correctionResponse).ok(), browserErrors.join('\n')).toBe(true);

	await expect(page.getByText('/ 100')).toBeVisible();
	await expect(page.getByText('Pruebas mínimas')).toBeVisible();
});
