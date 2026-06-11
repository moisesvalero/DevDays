import type { SupabaseClient } from '@supabase/supabase-js';
import type { TerminalProgress, TerminalProgressStatus } from '$lib/types/terminal';

type TerminalProgressRow = {
	lesson_id: string;
	status: TerminalProgressStatus;
	cwd: string;
	history: { command: string; output: string[]; ok: boolean }[];
	completed_exercise_ids: string[];
	score: number;
	updated_at: string;
};

export async function loadTerminalProgress(
	supabase: SupabaseClient,
	userId: string | null
): Promise<Record<string, TerminalProgress>> {
	if (!userId) return {};

	const { data, error } = await supabase
		.from('terminal_progress')
		.select('lesson_id,status,cwd,history,completed_exercise_ids,score,updated_at')
		.eq('user_id', userId);

	if (error || !data) return {};

	return Object.fromEntries(
		(data as TerminalProgressRow[]).map((row) => [
			row.lesson_id,
			{
				lessonId: row.lesson_id,
				status: row.status,
				cwd: row.cwd,
				history: row.history ?? [],
				completedExerciseIds: row.completed_exercise_ids ?? [],
				score: row.score ?? 0,
				updatedAt: row.updated_at
			}
		])
	);
}

export async function saveTerminalProgress(
	supabase: SupabaseClient,
	userId: string,
	progress: TerminalProgress
) {
	return supabase.from('terminal_progress').upsert(
		{
			user_id: userId,
			lesson_id: progress.lessonId,
			status: progress.status,
			cwd: progress.cwd,
			history: progress.history,
			completed_exercise_ids: progress.completedExerciseIds,
			score: progress.score,
			updated_at: progress.updatedAt
		},
		{ onConflict: 'user_id,lesson_id' }
	);
}
