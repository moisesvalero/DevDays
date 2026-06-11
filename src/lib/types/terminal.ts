export type TerminalModule = 'wsl' | 'proyectos' | 'git' | 'validacion' | 'diagnostico';

type TerminalDifficulty = 'suave' | 'media' | 'reto';

export type TerminalProgressStatus = 'sin_empezar' | 'en_progreso' | 'resuelto';

export type TerminalExercise = {
	id: string;
	title: string;
	prompt: string;
	expectedCommands: string[];
	successMessage: string;
};

export type TerminalCommandNote = {
	command: string;
	description: string;
};

export type TerminalLesson = {
	lessonId: string;
	module: TerminalModule;
	difficulty: TerminalDifficulty;
	estimatedMinutes: number;
	title: string;
	objective: string;
	explanation: string;
	dailyUse: string;
	keyCommands: string[];
	commandNotes: TerminalCommandNote[];
	exercises: TerminalExercise[];
	hints: string[];
};

export type TerminalEntry = {
	command: string;
	output: string[];
	ok: boolean;
};

export type TerminalSession = {
	lessonId: string;
	cwd: string;
	history: TerminalEntry[];
	completedExerciseIds: string[];
	score: number;
};

export type TerminalCommandResult = {
	cwd: string;
	output: string[];
	ok: boolean;
	completedExerciseIds: string[];
	score: number;
};

export type TerminalProgress = TerminalSession & {
	status: TerminalProgressStatus;
	updatedAt: string;
};
