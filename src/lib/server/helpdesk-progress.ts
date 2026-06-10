import type { SupabaseClient } from '@supabase/supabase-js';
import type { TicketDecision, TicketProgress, TicketProgressStatus } from '$lib/types/helpdesk';

type TicketProgressRow = {
	ticket_id: string;
	status: TicketProgressStatus;
	selected_action_ids: string[];
	notes: string;
	diagnosis: string;
	solution: string;
	user_reply: string;
	decision: TicketDecision;
	score: number;
	feedback: string;
	updated_at: string;
};

export async function loadTicketProgress(
	supabase: SupabaseClient,
	userId: string | null
): Promise<Record<string, TicketProgress>> {
	if (!userId) return {};

	const { data, error } = await supabase
		.from('ticket_progress')
		.select(
			'ticket_id,status,selected_action_ids,notes,diagnosis,solution,user_reply,decision,score,feedback,updated_at'
		)
		.eq('user_id', userId);

	if (error || !data) return {};

	return Object.fromEntries(
		(data as TicketProgressRow[]).map((row) => [
			row.ticket_id,
			{
				ticketId: row.ticket_id,
				status: row.status,
				selectedActionIds: row.selected_action_ids ?? [],
				notes: row.notes ?? '',
				diagnosis: row.diagnosis ?? '',
				solution: row.solution ?? '',
				userReply: row.user_reply ?? '',
				decision: row.decision ?? 'cerrar',
				score: row.score ?? 0,
				feedback: row.feedback ?? '',
				updatedAt: row.updated_at
			}
		])
	);
}

export async function saveTicketProgress(
	supabase: SupabaseClient,
	userId: string,
	progress: TicketProgress
) {
	return supabase.from('ticket_progress').upsert(
		{
			user_id: userId,
			ticket_id: progress.ticketId,
			status: progress.status,
			selected_action_ids: progress.selectedActionIds,
			notes: progress.notes,
			diagnosis: progress.diagnosis,
			solution: progress.solution,
			user_reply: progress.userReply,
			decision: progress.decision,
			score: progress.score,
			feedback: progress.feedback,
			updated_at: progress.updatedAt
		},
		{ onConflict: 'user_id,ticket_id' }
	);
}
