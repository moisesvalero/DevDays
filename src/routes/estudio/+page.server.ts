import { fail, error } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  /**
   * Marca un día como completado para el usuario actual.
   * Hace UPSERT contra la PK compuesta (user_id, dia) para sobrescribir si ya existía.
   */
  marcar: async ({ request, locals }) => {
    if (!locals.user) throw error(401, 'No autorizado');

    const fd = await request.formData();
    const dia = Number(fd.get('dia'));
    if (!Number.isInteger(dia) || dia < 1 || dia > 35) {
      return fail(400, { error: 'Día inválido' });
    }

    const { error: dbError } = await locals.supabase.from('progreso').upsert(
      {
        user_id: locals.user.id,
        dia,
        estado: 'completado',
        fecha: new Date().toISOString()
      },
      { onConflict: 'user_id,dia' }
    );

    if (dbError) {
      return fail(500, { error: dbError.message });
    }

    return { ok: true, dia };
  }
};
