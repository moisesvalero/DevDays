import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		throw error(401, 'No autorizado. Inicia sesión para modificar tu perfil.');
	}

	try {
		const { full_name, avatar_url } = await request.json();
		if (!full_name?.trim()) {
			throw error(400, 'El nombre es obligatorio.');
		}

		const { data, error: updateError } = await locals.supabase.auth.updateUser({
			data: { full_name, avatar_url }
		});

		if (updateError) {
			console.error('Error actualizando perfil Supabase:', updateError);
			throw error(500, 'Error interno al actualizar el perfil.');
		}

		return json({ user: data.user });
	} catch (err: any) {
		throw error(err.status || 500, err.message || 'Error en la petición.');
	}
};
