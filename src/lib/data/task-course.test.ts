import { describe, expect, it } from 'vitest';
import { taskCourseDays } from './task-course';

describe('taskCourseDays', () => {
	it('define exactamente 21 días ordenados', () => {
		expect(taskCourseDays).toHaveLength(21);
		expect(taskCourseDays.map((day) => day.day)).toEqual(
			Array.from({ length: 21 }, (_, i) => i + 1)
		);
	});

	it('mantiene un único objetivo principal por día', () => {
		for (const day of taskCourseDays) {
			expect(day.objective.trim()).toBe(day.objective);
			expect(day.objective).toMatch(/\.$/);
			expect(day.objective.split(/[.;]/).filter(Boolean)).toHaveLength(1);
		}
	});

	it('referencia el estado esperado del gestor de tareas en cada día', () => {
		for (const day of taskCourseDays) {
			expect(day.expectedState.toLowerCase()).toMatch(/gestor de tareas/);
		}
	});

	it('incluye misión, checklist y pistas locales en cada día', () => {
		for (const day of taskCourseDays) {
			expect(day.missionTitle).toContain(`Misión ${day.day}`);
			expect(day.introSummary.length).toBeGreaterThan(20);
			expect(day.checklist.length).toBeGreaterThanOrEqual(4);
			expect(day.mentorHints.length).toBeGreaterThanOrEqual(3);
			expect(day.completionCue).toContain(`día ${day.day}`);
			expect(day.estimatedMinutes).toBeGreaterThan(0);
		}
	});

	it('no usa estructura de examen en el curso principal', () => {
		const serialized = JSON.stringify(taskCourseDays).toLowerCase();
		expect(serialized).not.toContain('examen');
		expect(serialized).not.toContain('aprobado');
		expect(serialized).not.toContain('suspendido');
	});
});
