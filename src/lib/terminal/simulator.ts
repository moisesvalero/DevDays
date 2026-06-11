import type {
	TerminalCommandResult,
	TerminalExercise,
	TerminalLesson,
	TerminalSession
} from '$lib/types/terminal';

const START_CWD = '/home/usuario';
const WEBS_CWD = '/home/usuario/webs';
const PROJECTS = ['DevDays', 'mi-proyecto', 'mi-app', 'mi-next', 'repositorio', 'mi-nueva-web'];
const DANGEROUS_COMMANDS = /^(rm|sudo|chmod|chown|mv|cp|curl|wget|ssh|scp|docker)\b/;
const BLOCKED_TOOLS = /^(npm|npx|yarn|bun)\b/;

export function createTerminalSession(lesson: TerminalLesson): TerminalSession {
	return {
		lessonId: lesson.lessonId,
		cwd: START_CWD,
		history: [],
		completedExerciseIds: [],
		score: 0
	};
}

export function runTerminalCommand(
	lesson: TerminalLesson,
	session: TerminalSession,
	rawCommand: string
): TerminalCommandResult {
	const command = normalizeCommand(rawCommand);
	const base = {
		cwd: session.cwd,
		completedExerciseIds: session.completedExerciseIds,
		score: session.score
	};

	if (!command) return { ...base, output: [], ok: true };
	if (command === 'clear') return { ...base, output: ['__CLEAR__'], ok: true };
	if (BLOCKED_TOOLS.test(command)) {
		return {
			...base,
			output: ['En este entorno usa pnpm. Evita npm, npx, yarn y bun para estos proyectos.'],
			ok: false
		};
	}
	if (DANGEROUS_COMMANDS.test(command)) {
		return {
			...base,
			output: ['Comando bloqueado en el simulador. Aquí practicamos sin tocar archivos reales.'],
			ok: false
		};
	}
	if (/^[a-zA-Z]:\\/.test(command) || command.includes('D:\\')) {
		return {
			...base,
			output: ['Estás en WSL: usa ~/webs para proyectos activos, no rutas tipo D:\\webs.'],
			ok: false
		};
	}

	const execution = executeAllowedCommand(session.cwd, command);
	const nextCompleted = completeExercises(lesson.exercises, [
		...session.history.map((entry) => entry.command),
		command
	]);
	const score = Math.round((nextCompleted.length / lesson.exercises.length) * 100);

	return {
		cwd: execution.cwd,
		output: execution.output,
		ok: execution.ok,
		completedExerciseIds: nextCompleted,
		score
	};
}

export function applyTerminalResult(
	session: TerminalSession,
	command: string,
	result: TerminalCommandResult
): TerminalSession {
	const entry = {
		command: normalizeCommand(command),
		output: result.output,
		ok: result.ok
	};
	return {
		lessonId: session.lessonId,
		cwd: result.cwd,
		history: result.output.includes('__CLEAR__') ? [] : [...session.history, entry],
		completedExerciseIds: result.completedExerciseIds,
		score: result.score
	};
}

export function isLessonComplete(lesson: TerminalLesson, session: TerminalSession): boolean {
	return lesson.exercises.every((exercise) => session.completedExerciseIds.includes(exercise.id));
}

function executeAllowedCommand(cwd: string, command: string) {
	if (command === 'pwd') return ok(cwd, [displayPath(cwd)]);
	if (command === 'ls') return ok(cwd, listDirectory(cwd));
	if (command.startsWith('cd ')) return changeDirectory(cwd, command.slice(3).trim());
	if (command === 'pnpm install') return ok(cwd, ['Lockfile actualizado, dependencias listas.']);
	if (command === 'pnpm dev') {
		return ok(cwd, ['VITE listo en http://127.0.0.1:5173/', 'Pulsa Ctrl+C para parar.']);
	}
	if (command.startsWith('pnpm create svelte@latest ')) {
		return ok(WEBS_CWD, ['Scaffold SvelteKit creado. Entra en la carpeta y ejecuta pnpm install.']);
	}
	if (command.startsWith('pnpm create next-app@latest ')) {
		return ok(WEBS_CWD, ['Proyecto Next.js creado con configuración interactiva simulada.']);
	}
	if (command.startsWith('pnpm add ')) return ok(cwd, ['Dependencia añadida al proyecto.']);
	if (command.startsWith('pnpm remove ')) return ok(cwd, ['Dependencia eliminada del proyecto.']);
	if (command.startsWith('pnpm exec '))
		return ok(cwd, ['Comando ejecutado dentro del entorno pnpm.']);
	if (command === 'pnpm lint') return ok(cwd, ['Found 0 warnings and 0 errors.']);
	if (command === 'pnpm knip') return ok(cwd, ['Sin dependencias ni exports muertos detectados.']);
	if (command === 'pnpm check') return ok(cwd, ['svelte-check found 0 errors and 0 warnings.']);
	if (command === 'pnpm test') return ok(cwd, ['Test Files 4 passed. Tests 10 passed.']);
	if (command === 'pnpm build') return ok(cwd, ['✓ built successfully.']);
	if (command === 'pnpm format') return ok(cwd, ['Archivos formateados con Prettier.']);
	if (command === 'git status')
		return ok(cwd, ['On branch main', 'Changes not staged for commit.']);
	if (command === 'git diff')
		return ok(cwd, [
			'diff --git a/src/routes/terminal/+page.svelte b/src/routes/terminal/+page.svelte'
		]);
	if (command === 'git log --oneline -5') {
		return ok(cwd, [
			'6b2e1bf feat: apply stitch service desk design',
			'8d49f56 feat: make helpdesk simulator main',
			'895ceb8 feat: add helpdesk simulator'
		]);
	}
	if (command === 'git add .') return ok(cwd, ['Cambios preparados para commit.']);
	if (/^git commit -m ".+"$/.test(command)) return ok(cwd, ['[main abc1234] commit creado.']);
	if (command === 'git push')
		return ok(cwd, ['main -> main', 'Vercel recibirá el push automáticamente.']);
	if (command === 'git branch') return ok(cwd, ['* main', '  legacy/devdays-course']);
	if (command.startsWith('git switch -c '))
		return ok(cwd, [`Switched to a new branch '${command.slice(14)}'.`]);
	if (command === 'git switch main') return ok(cwd, ["Switched to branch 'main'."]);
	if (command === 'git pull') return ok(cwd, ['Already up to date.']);
	if (command === 'git remote -v') {
		return ok(cwd, [
			'origin  https://github.com/usuario/mi-proyecto.git (fetch)',
			'origin  https://github.com/usuario/mi-proyecto.git (push)'
		]);
	}
	if (command === 'git fetch') return ok(cwd, ['origin actualizado.']);
	if (command === 'git restore --staged') return ok(cwd, ['Cambios quitados del stage.']);
	if (command.startsWith('git stash push -m '))
		return ok(cwd, ['Saved working directory and index state.']);
	if (command === 'git stash pop') return ok(cwd, ['Cambios recuperados del stash.']);
	if (command === 'gh auth status') return ok(cwd, ['Logged in to github.com as usuario.']);
	if (command.startsWith('gh repo clone ')) {
		return ok(WEBS_CWD, ['Cloning into repository...', 'remote: Enumerating objects: done.']);
	}
	if (command === 'node -v') return ok(cwd, ['v24.16.0']);
	if (command === 'pnpm -v') return ok(cwd, ['10.24.0']);
	if (command === 'code .') return ok(cwd, ['VS Code abierto en la carpeta actual.']);
	if (command.startsWith('mkdir ')) return ok(cwd, [`Carpeta '${command.slice(6)}' creada.`]);
	if (command.startsWith('touch ')) return ok(cwd, [`Archivo '${command.slice(6)}' creado.`]);
	if (command === 'cat package.json')
		return ok(cwd, ['{"scripts":{"dev":"vite dev","build":"vite build"}}']);
	if (command.startsWith('rg '))
		return ok(cwd, ['src/routes/terminal/+page.svelte: terminal simulator']);

	return {
		cwd,
		output: [`No reconozco "${command}" en esta práctica. Mira la guía lateral y prueba de nuevo.`],
		ok: false
	};
}

function changeDirectory(cwd: string, target: string) {
	if (target === '~' || target === '/home/usuario') return ok(START_CWD, []);
	if (target === '~/webs') return ok(WEBS_CWD, []);
	if (target.startsWith('~/webs/')) return ok(`${WEBS_CWD}/${target.split('/').pop()}`, []);
	if (PROJECTS.includes(target)) return ok(`${WEBS_CWD}/${target}`, []);
	if (target === '..') return ok(cwd.split('/').slice(0, -1).join('/') || '/', []);
	return {
		cwd,
		output: [`cd: no existe la ruta "${target}" en este laboratorio.`],
		ok: false
	};
}

function listDirectory(cwd: string): string[] {
	if (cwd === START_CWD) return ['webs'];
	if (cwd === WEBS_CWD) return PROJECTS;
	return ['package.json', 'src', 'tests', 'pnpm-lock.yaml'];
}

function completeExercises(exercises: TerminalExercise[], commands: string[]): string[] {
	return exercises
		.filter((exercise) =>
			exercise.expectedCommands.every((expected) =>
				commands.some((command) => normalizeCommand(command) === normalizeCommand(expected))
			)
		)
		.map((exercise) => exercise.id);
}

function ok(cwd: string, output: string[]) {
	return { cwd, output, ok: true };
}

function displayPath(cwd: string): string {
	return cwd.replace(/^\/home\/[^/]+/, '~');
}

function normalizeCommand(command: string): string {
	return command.replace(/\s+/g, ' ').trim();
}
