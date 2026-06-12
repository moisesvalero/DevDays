import { lessons } from '$lib/data/lessons';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	return {
		lessons,
		userEmail: locals.user?.email ?? null,
		userMetadata: locals.user?.user_metadata ?? null
	};
};
