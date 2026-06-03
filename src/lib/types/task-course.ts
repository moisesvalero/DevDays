export type CourseBlock = 'javascript' | 'svelte' | 'sveltekit';

export type TaskCourseDay = {
	day: number;
	block: CourseBlock;
	title: string;
	introSummary: string;
	missionTitle: string;
	objective: string;
	productStory: string;
	concept: string;
	guidedSteps: string[];
	checklist: string[];
	miniChallenge: string;
	expectedState: string;
	codeFocus: string;
	codeSample: string;
	mentorPrompts: string[];
	mentorHints: string[];
	completionCue: string;
	difficulty: 'suave' | 'media' | 'reto';
	estimatedMinutes: number;
};

export type TaskItem = {
	id: number;
	title: string;
	done: boolean;
	tag: string;
};
