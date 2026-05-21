import type { DayLabConfig, IdLaboratorio, RepasoLabConfig } from '$lib/types/laboratorio';
import * as w1 from './week1';
import * as w2 from './week2';
import * as w3 from './week3';
import * as w4 from './week4';
import * as w5 from './week5';
import * as repaso from './repaso';

export const LAB_CONFIGS: Partial<Record<IdLaboratorio, DayLabConfig>> = {
  'dia-1-variables': w1.day1,
  'dia-3-condicionales': w1.day3,
  'dia-4-funciones': w1.day4,
  'dia-5-arrays-transform': w1.day5,
  'dia-6-arrays-aggregate': w1.day6,
  'dia-8-objetos': w2.day8,
  'dia-9-bucles': w2.day9,
  'dia-10-closures': w2.day10,
  'dia-11-promesas': w2.day11,
  'dia-12-async': w2.day12,
  'dia-13-dom': w2.day13,
  'dia-15-svelte-stack': w3.day15,
  'dia-16-svelte-archivo': w3.day16,
  'dia-17-state': w3.day17,
  'dia-18-derived': w3.day18,
  'dia-19-props': w3.day19,
  'dia-20-eventos': w3.day20,
  'dia-22-rutas': w4.day22,
  'dia-23-layouts': w4.day23,
  'dia-24-dinamicas': w4.day24,
  'dia-25-load': w4.day25,
  'dia-26-forms': w4.day26,
  'dia-27-supabase': w4.day27,
  'dia-29-typescript': w5.day29,
  'dia-30-env': w5.day30,
  'dia-31-deploy': w5.day31,
  'dia-32-stack-story': w5.day32,
  'dia-33-entrevista': w5.day33,
  'dia-34-proyecto': w5.day34
};

export const REPASO_CONFIGS: Partial<Record<IdLaboratorio, RepasoLabConfig>> = {
  'repaso-s1': repaso.repasoS1,
  'repaso-s2': repaso.repasoS2,
  'repaso-s3': repaso.repasoS3,
  'repaso-s4': repaso.repasoS4,
  'repaso-s5': repaso.repasoS5
};
