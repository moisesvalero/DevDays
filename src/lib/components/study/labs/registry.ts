import type { Component } from 'svelte';
import type { IdLaboratorio } from '$lib/types/laboratorio';
import { LAB_CONFIGS } from './lab-configs';

type LessonLoader = () => Promise<{ default: Component }>;

/** Días con carpeta dayN/ y labs artesanales (estilo día 2). */
export const LAB_LOADERS: Partial<Record<IdLaboratorio, LessonLoader>> = {
	'dia-1-variables': () => import('./day1/Day1VisualLesson.svelte'),
	'dia-2-operadores': () => import('./day2/Day2VisualLesson.svelte'),
	'dia-3-condicionales': () => import('./day3/Day3VisualLesson.svelte'),
	'dia-4-funciones': () => import('./day4/Day4VisualLesson.svelte'),
	'dia-5-arrays-transform': () => import('./day5/Day5VisualLesson.svelte'),
	'dia-6-arrays-aggregate': () => import('./day6/Day6VisualLesson.svelte'),
	'dia-8-objetos': () => import('./day8/Day8VisualLesson.svelte'),
	'dia-9-bucles': () => import('./day9/Day9VisualLesson.svelte'),
	'dia-10-closures': () => import('./day10/Day10VisualLesson.svelte'),
	'dia-11-promesas': () => import('./day11/Day11VisualLesson.svelte'),
	'dia-12-async': () => import('./day12/Day12VisualLesson.svelte'),
	'dia-13-dom': () => import('./day13/Day13VisualLesson.svelte'),
	'dia-15-svelte-stack': () => import('./day15/Day15VisualLesson.svelte'),
	'dia-16-svelte-archivo': () => import('./day16/Day16VisualLesson.svelte'),
	'dia-17-state': () => import('./day17/Day17VisualLesson.svelte'),
	'dia-18-derived': () => import('./day18/Day18VisualLesson.svelte'),
	'dia-19-props': () => import('./day19/Day19VisualLesson.svelte'),
	'dia-20-eventos': () => import('./day20/Day20VisualLesson.svelte'),
	'dia-22-rutas': () => import('./day22/Day22VisualLesson.svelte'),
	'dia-23-layouts': () => import('./day23/Day23VisualLesson.svelte'),
	'dia-24-dinamicas': () => import('./day24/Day24VisualLesson.svelte'),
	'dia-25-load': () => import('./day25/Day25VisualLesson.svelte'),
	'dia-26-forms': () => import('./day26/Day26VisualLesson.svelte'),
	'dia-27-supabase': () => import('./day27/Day27VisualLesson.svelte'),
	'dia-29-typescript': () => import('./day29/Day29VisualLesson.svelte'),
	'dia-30-env': () => import('./day30/Day30VisualLesson.svelte'),
	'dia-31-deploy': () => import('./day31/Day31VisualLesson.svelte'),
	'dia-32-stack-story': () => import('./day32/Day32VisualLesson.svelte'),
	'dia-33-entrevista': () => import('./day33/Day33VisualLesson.svelte'),
	'dia-34-proyecto': () => import('./day34/Day34VisualLesson.svelte'),
	'repaso-s1': () => import('./repaso-s1/RepasoS1Visual.svelte'),
	'repaso-s2': () => import('./repaso-s2/RepasoS2Visual.svelte'),
	'repaso-s3': () => import('./repaso-s3/RepasoS3Visual.svelte'),
	'repaso-s4': () => import('./repaso-s4/RepasoS4Visual.svelte'),
	'repaso-s5': () => import('./repaso-s5/RepasoS5Visual.svelte')
};

export const REPASO_IDS: IdLaboratorio[] = [
	'repaso-s1',
	'repaso-s2',
	'repaso-s3',
	'repaso-s4',
	'repaso-s5'
];

export function isRepasoId(id: IdLaboratorio): boolean {
	return REPASO_IDS.includes(id);
}

export function isArtisanalLessonId(id: IdLaboratorio): boolean {
	return id in LAB_LOADERS;
}

export function isPremiumLessonId(id: IdLaboratorio): boolean {
	return id in LAB_CONFIGS && !isArtisanalLessonId(id);
}
