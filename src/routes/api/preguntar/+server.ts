import { json, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { getTicketById } from '$lib/data/helpdesk-tickets';
import { chatHelpdeskTutor } from '$lib/server/ai';
import type { RequestHandler } from './$types';

type ChatMsg = { role: 'user' | 'model'; text: string };

type Body = {
	ticketId: string;
	selectedActionIds?: string[];
	notes?: string;
	mensaje: string;
	historial: ChatMsg[];
};

/**
 * Chat libre con el tutor. SOLO para aclarar dudas.
 * No exige login porque el curso principal es accesible sin cuenta.
 * Reglas blindadas en el systemInstruction (ver $lib/server/ai.ts):
 * no aprueba, no da solución literal y explica con lenguaje sencillo.
 */
export const POST: RequestHandler = async ({ request }) => {
	if (!env.OPENAI_API_KEY && !env.GEMINI_API_KEY) {
		throw error(500, 'No hay ninguna API de IA configurada (OPENAI_API_KEY o GEMINI_API_KEY)');
	}

	const body = (await request.json()) as Body;
	if (!body.mensaje?.trim()) {
		throw error(400, 'Escribe una pregunta para el tutor.');
	}
	const ticket = getTicketById(body.ticketId);
	if (!ticket) throw error(404, 'Ticket no encontrado.');

	const result = await chatHelpdeskTutor({
		ticket,
		selectedActionIds: body.selectedActionIds ?? [],
		notes: body.notes ?? '',
		mensaje: body.mensaje,
		historial: body.historial ?? []
	});

	return json({ respuesta: result.respuesta });
};
