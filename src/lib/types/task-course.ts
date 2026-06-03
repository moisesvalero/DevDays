export type CourseBlock = 'javascript' | 'svelte' | 'sveltekit';

export type TaskCourseDay = {
	day: number;
	block: CourseBlock;
	title: string;
	objective: string;
	productStory: string;
	concept: string;
	guidedSteps: string[];
	miniChallenge: string;
	expectedState: string;
	codeFocus: string;
	codeSample: string;
	mentorPrompts: string[];
};

export type TaskItem = {
	id: number;
	title: string;
	done: boolean;
	tag: string;
};
