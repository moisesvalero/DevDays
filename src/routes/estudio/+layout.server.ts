import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { lessons } from '$lib/data/lessons';
import type { FilaProgreso } from '$lib/types/lesson';

/**
 * Guard de auth + carga inicial del portal.
 * Si no hay user → /login.
 * Si lo hay → devuelve user, lecciones y filas de progreso del usuario.
 */
export const load: LayoutServerLoad = async ({ locals }) => {
  if (!locals.user) throw redirect(303, '/login');

  const { data: progresoRaw } = await locals.supabase
    .from('progreso')
    .select('user_id, dia, estado, fecha')
    .eq('user_id', locals.user.id);

  const progreso = (progresoRaw ?? []) as FilaProgreso[];

  return {
    user: { id: locals.user.id, email: locals.user.email ?? '' },
    lessons,
    progreso
  };
};
