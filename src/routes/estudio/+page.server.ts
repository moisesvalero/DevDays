import { taskCourseDays } from '$lib/data/task-course';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	return {
		days: taskCourseDays
	};
};
