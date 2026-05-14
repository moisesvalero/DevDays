import { fail, redirect } from '@sveltejs/kit';
import { PUBLIC_SITE_URL } from '$env/static/public';
import { isEmailAllowed } from '$lib/server/allowlist';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) throw redirect(303, '/estudio');
  return {};
};

export const actions: Actions = {
  magic: async ({ request, locals }) => {
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

    const { error } = await locals.supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${PUBLIC_SITE_URL}/auth/callback` }
    });

    if (error) {
      return fail(500, { error: error.message });
    }

    return { sent: true, email };
  }
};
