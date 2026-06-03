import { taskCourseDays } from '$lib/data/task-course';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	return {
		days: taskCourseDays,
		userEmail: locals.user?.email ?? null
	};
};
