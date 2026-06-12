import { dev } from '$app/environment';
import { env as publicEnv } from '$env/dynamic/public';
import { fail, redirect } from '@sveltejs/kit';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { isEmailAllowed } from '$lib/server/allowlist';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) throw redirect(303, '/');
	return {};
};

export const actions: Actions = {
	magic: async ({ request, url, locals }) => {
		const data = await request.formData();
		const email = String(data.get('email') || '')
			.trim()
			.toLowerCase();

		if (!email || !email.includes('@')) {
			return fail(400, { error: 'Introduce un email válido.' });
		}

		if (!isEmailAllowed(email)) {
			// No revelamos si el email existe o no en nuestra whitelist; mensaje genérico.
			return fail(403, {
				error: 'Este email no tiene acceso a la app. Pide permiso al administrador.'
			});
		}

		if (
			PUBLIC_SUPABASE_URL.includes('placeholder') ||
			PUBLIC_SUPABASE_ANON_KEY.includes('placeholder')
		) {
			return fail(500, {
				error:
					'Supabase no está configurado en este entorno. Revisa PUBLIC_SUPABASE_URL y PUBLIC_SUPABASE_ANON_KEY.'
			});
		}

		const configuredSiteUrl = (publicEnv.PUBLIC_SITE_URL ?? '').trim();
		const shouldUseRequestOrigin =
			!configuredSiteUrl ||
			(!dev &&
				(configuredSiteUrl.includes('localhost') || configuredSiteUrl.includes('127.0.0.1')));
		const siteUrl = (shouldUseRequestOrigin ? url.origin : configuredSiteUrl).replace(/\/$/, '');

		const { error } = await locals.supabase.auth.signInWithOtp({
			email,
			options: { emailRedirectTo: `${siteUrl}/auth/callback` }
		});

		if (error) {
			console.error('Supabase magic link error:', {
				message: error.message,
				status: error.status,
				code: error.code
			});

			return fail(500, {
				error:
					'No se pudo enviar el enlace de acceso. Revisa Supabase Auth, SMTP y las URLs de redirección.'
			});
		}

		return { sent: true, email };
	}
};
