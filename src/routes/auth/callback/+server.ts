import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * Endpoint al que vuelve el Magic Link de Supabase.
 * Recibe `?code=...` y lo intercambia por una sesión válida (cookies).
 * Si todo va bien, redirige al portal de estudio.
 */
export const GET: RequestHandler = async ({ url, locals }) => {
	const code = url.searchParams.get('code');
	const next = url.searchParams.get('next') ?? '/';

	if (code) {
		const { error } = await locals.supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			throw redirect(303, next);
		}
	}

	throw redirect(303, '/login?error=callback');
};
