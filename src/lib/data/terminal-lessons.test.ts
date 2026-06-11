import { describe, expect, it } from 'vitest';
import { terminalLessons } from './terminal-lessons';

describe('terminalLessons', () => {
	it('define un curso práctico ordenado para el día a día', () => {
		expect(terminalLessons).toHaveLength(12);
		expect(terminalLessons.map((lesson) => lesson.lessonId)).toEqual(
			Array.from({ length: 12 }, (_, index) => `TERM-${String(index + 1).padStart(3, '0')}`)
		);
	});

	it('incluye explicación, práctica y comandos clave por lección', () => {
		for (const lesson of terminalLessons) {
			expect(lesson.objective.length).toBeGreaterThan(20);
			expect(lesson.explanation.length).toBeGreaterThan(60);
			expect(lesson.dailyUse.length).toBeGreaterThan(20);
			expect(lesson.keyCommands.length).toBeGreaterThanOrEqual(3);
			expect(lesson.commandNotes.length).toBeGreaterThanOrEqual(3);
			expect(lesson.exercises.length).toBeGreaterThanOrEqual(1);
			expect(lesson.hints.length).toBeGreaterThanOrEqual(2);
		}
	});

	it('cubre comandos frecuentes añadidos al PDF', () => {
		const allCommands = terminalLessons.flatMap((lesson) => lesson.keyCommands);
		expect(allCommands).toContain('code .');
		expect(allCommands).toContain('git pull');
		expect(allCommands).toContain('rg terminal src');
		expect(allCommands).toContain('git remote -v');
		expect(allCommands).toContain('pnpm format');
	});
});
