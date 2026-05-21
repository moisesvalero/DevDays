export type Callout = {
  tipo: 'tip' | 'warning' | 'info';
  texto: string;
};

export type Seccion = {
  titulo: string;
  analogia: string;
  paraQueSirve: string;
  texto: string;
  ejemplo?: string;
  /** Pasos numerados mostrados en UI; alineados con el ejercicio del mismo índice */
  pasosPractica?: string[];
  nota?: Callout;
};

import type { IdLaboratorio } from './laboratorio';

export type { IdLaboratorio };

export type ModoContenido = 'clasico' | 'laboratorio';

export type ContenidoLeccion = {
  intro: string;
  /** Por defecto `clasico` (texto + CodeBlock). `laboratorio` activa UI interactiva. */
  modo?: ModoContenido;
  laboratorio?: IdLaboratorio;
  secciones: Seccion[];
  resumen: string[];
};

/** Enunciado visible al alumno (formato manual universitario). */
export type EnunciadoEjercicio = {
  /** Contexto del problema en prosa formal */
  planteamiento: string;
  /** Tareas (a), (b), (c) — qué debe hacer el programa */
  requisitos: string[];
  /** Salida exacta o ejemplo de consola */
  salidaEsperada: string;
  /** Aclaraciones opcionales (sección del día, sintaxis permitida) */
  notas?: string;
  /** Título exacto de la sección del mismo día (lección) o «Repaso semana N» (examen) */
  seccionRef: string;
};

export type Ejercicio = {
  numero: number;
  /** Título corto en la pestaña del ejercicio */
  titulo: string;
  enunciado: EnunciadoEjercicio;
  /** Solo para la IA en /api/corregir; no se muestra al alumno */
  queDebePasar?: string[];
  criteriosLogica: string[];
  plantilla: string;
};

type Base = {
  dia: number;
  semana: 1 | 2 | 3 | 4 | 5;
  titulo: string;
  objetivo: string;
};

export type LeccionNormal = Base & {
  tipo: 'leccion';
  contenido: ContenidoLeccion;
  ejercicios: [Ejercicio, Ejercicio, Ejercicio];
};

export type LeccionExamen = Base & {
  tipo: 'examen';
  /** Mini-lab visual de repaso antes de los 5 retos */
  repasoVisual?: IdLaboratorio;
  instrucciones: string;
  ejercicios: [Ejercicio, Ejercicio, Ejercicio, Ejercicio, Ejercicio];
};

export type Leccion = LeccionNormal | LeccionExamen;

export type EstadoDia = 'pendiente' | 'completado';

export type FilaProgreso = {
  user_id: string;
  dia: number;
  estado: EstadoDia;
  fecha: string;
};
