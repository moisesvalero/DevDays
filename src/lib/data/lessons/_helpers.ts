import type { Ejercicio, Seccion } from '$lib/types/lesson';

/** En cada sección: `texto` = técnico (JavaScript); `analogia` = 1–2 frases de apoyo. */
export function sec(
  titulo: string,
  analogia: string,
  paraQueSirve: string,
  texto: string,
  ejemplo?: string
): Seccion {
  return { titulo, analogia, paraQueSirve, texto, ejemplo };
}

export function ej(
  numero: number,
  historia: string,
  enunciado: string,
  queDebePasar: string[],
  criteriosLogica: string[],
  plantilla: string
): Ejercicio {
  return { numero, historia, enunciado, queDebePasar, criteriosLogica, plantilla };
}
