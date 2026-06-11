import { error, json } from '@sveltejs/kit';
import { saveTicketProgress } from '$lib/server/helpdesk-progress';
import type { TicketProgress } from '$lib/types/helpdesk';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) throw error(401, 'Inicia sesión para guardar progreso en Supabase.');

	const progress = (await request.json()) as TicketProgress;
	if (!progress.ticketId) throw error(400, 'Falta ticketId.');

	const { error: dbError } = await saveTicketProgress(locals.supabase, locals.user.id, {
		...progress,
		updatedAt: new Date().toISOString()
	});

	if (dbError) throw error(500, 'No se pudo guardar el progreso del ticket.');

	return json({ ok: true });
};
