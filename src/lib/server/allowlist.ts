import { env } from '$env/dynamic/private';

const OWNER_EMAILS = ['moisesvs84@gmail.com'];

/**
 * Devuelve la lista de emails permitidos (en minúsculas, sin duplicados).
 * Lee `ALLOWED_EMAILS` y añade el email propietario para no perder acceso.
 * - El email propietario queda permitido para no bloquear el acceso operativo.
 */
function getAllowedEmails(): string[] {
	const raw = env.ALLOWED_EMAILS ?? '';
	return [
		...new Set(
			[...OWNER_EMAILS, ...raw.split(',')].map((s) => s.trim().toLowerCase()).filter(Boolean)
		)
	];
}

/** ¿El email pasa la whitelist? */
export function isEmailAllowed(email: string | null | undefined): boolean {
	if (!email) return false;
	const allowed = getAllowedEmails();
	return allowed.includes(email.trim().toLowerCase());
}
