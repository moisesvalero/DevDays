import { helpdeskTickets } from '$lib/data/helpdesk-tickets';
import { loadTicketProgress } from '$lib/server/helpdesk-progress';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const progress = await loadTicketProgress(locals.supabase, locals.user?.id ?? null);

	return {
		tickets: helpdeskTickets,
		progress,
		userEmail: locals.user?.email ?? null,
		userMetadata: locals.user?.user_metadata ?? null
	};
};
