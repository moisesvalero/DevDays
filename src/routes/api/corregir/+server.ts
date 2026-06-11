import { json, error } from '@sveltejs/kit';
import { getTicketById } from '$lib/data/helpdesk-tickets';
import { evaluateTicket } from '$lib/helpdesk/scoring';
import { reviewTicketResolution } from '$lib/server/ai';
import type { TicketDecision } from '$lib/types/helpdesk';
import type { RequestHandler } from './$types';

type Body = {
	ticketId: string;
	selectedActionIds: string[];
	notes: string;
	diagnosis: string;
	solution: string;
	userReply: string;
	decision: TicketDecision;
};

export const POST: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as Body;
	const ticket = getTicketById(body.ticketId);
	if (!ticket) throw error(404, 'Ticket no encontrado.');

	const submission = {
		ticketId: body.ticketId,
		selectedActionIds: body.selectedActionIds ?? [],
		notes: body.notes ?? '',
		diagnosis: body.diagnosis ?? '',
		solution: body.solution ?? '',
		userReply: body.userReply ?? '',
		decision: body.decision ?? 'cerrar'
	};
	const local = evaluateTicket(ticket, submission);
	const ai = await reviewTicketResolution({ ticket, submission, localEvaluation: local });

	return json({
		...local,
		aiFeedback: ai.feedback,
		aiHints: ai.hints,
		provider: ai.provider
	});
};
