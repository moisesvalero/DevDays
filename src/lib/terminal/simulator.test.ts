import { describe, expect, it } from 'vitest';
import { terminalLessons } from '$lib/data/terminal-lessons';
import {
	applyTerminalResult,
	createTerminalSession,
	isLessonComplete,
	runTerminalCommand
} from './simulator';

describe('terminal simulator', () => {
	it('permite practicar navegación WSL y completar la primera misión', () => {
		const lesson = terminalLessons[0];
		let session = createTerminalSession(lesson);

		for (const command of ['pwd', 'cd ~/webs', 'ls']) {
			const result = runTerminalCommand(lesson, session, command);
			session = applyTerminalResult(session, command, result);
		}

		expect(session.cwd).toBe('/home/moises/webs');
		expect(session.score).toBe(100);
		expect(isLessonComplete(lesson, session)).toBe(true);
	});

	it('bloquea rutas Windows y explica la ruta correcta en WSL', () => {
		const lesson = terminalLessons[0];
		const session = createTerminalSession(lesson);
		const result = runTerminalCommand(lesson, session, 'cd D:\\webs');

		expect(result.ok).toBe(false);
		expect(result.output.join(' ')).toContain('usa ~/webs');
	});

	it('rechaza npm y dirige a pnpm', () => {
		const lesson = terminalLessons[1];
		const session = createTerminalSession(lesson);
		const result = runTerminalCommand(lesson, session, 'npm install');

		expect(result.ok).toBe(false);
		expect(result.output.join(' ')).toContain('usa pnpm');
	});

	it('simula validación completa sin ejecutar comandos reales', () => {
		const lesson = terminalLessons.find((item) => item.lessonId === 'TERM-008');
		expect(lesson).toBeDefined();
		if (!lesson) return;

		let session = createTerminalSession(lesson);
		for (const command of ['pnpm lint', 'pnpm knip', 'pnpm check', 'pnpm test', 'pnpm build']) {
			const result = runTerminalCommand(lesson, session, command);
			expect(result.ok).toBe(true);
			session = applyTerminalResult(session, command, result);
		}

		expect(session.completedExerciseIds).toEqual(['validate-flow']);
		expect(session.score).toBe(100);
	});
});
