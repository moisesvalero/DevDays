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

export type PortfolioProject = {
	id: number;
	title: string;
	description: string;
	tag: string;
	featured: boolean;
};

export type PortfolioProfile = {
	name: string;
	role: string;
	bio: string;
	location: string;
	email: string;
	skills: string[];
	projects: PortfolioProject[];
};
