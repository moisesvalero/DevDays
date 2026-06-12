import { terminalLessons } from '$lib/data/terminal-lessons';
import { loadTerminalProgress } from '$lib/server/terminal-progress';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const progress = await loadTerminalProgress(locals.supabase, locals.user?.id ?? null);

	return {
		lessons: terminalLessons,
		progress,
		userEmail: locals.user?.email ?? null,
		userMetadata: locals.user?.user_metadata ?? null
	};
};
