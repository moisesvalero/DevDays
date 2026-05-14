import { env } from '$env/dynamic/private';

/**
 * Devuelve la lista de emails permitidos (en minúsculas, sin duplicados).
 * Lee `ALLOWED_EMAILS` de las env vars: si está vacía o no existe, devuelve [].
 * - [] significa "todo bloqueado" (modo paranoia: nadie entra).
 */
export function getAllowedEmails(): string[] {
  const raw = env.ALLOWED_EMAILS ?? '';
  return [
    ...new Set(
      raw
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean)
    )
  ];
}

/** ¿El email pasa la whitelist? Si la lista está vacía → false (no entra nadie). */
export function isEmailAllowed(email: string | null | undefined): boolean {
  if (!email) return false;
  const allowed = getAllowedEmails();
  if (allowed.length === 0) return false;
  return allowed.includes(email.trim().toLowerCase());
}
