import { error, json } from '@sveltejs/kit';
import { saveTerminalProgress } from '$lib/server/terminal-progress';
import type { TerminalProgress } from '$lib/types/terminal';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) throw error(401, 'Inicia sesión para guardar progreso en Supabase.');

	const progress = (await request.json()) as TerminalProgress;
	if (!progress.lessonId) throw error(400, 'Falta lessonId.');

	const { error: dbError } = await saveTerminalProgress(locals.supabase, locals.user.id, {
		...progress,
		updatedAt: new Date().toISOString()
	});

	if (dbError) throw error(500, 'No se pudo guardar el progreso del curso terminal.');

	return json({ ok: true });
};
