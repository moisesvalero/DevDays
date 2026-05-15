import type { Ejercicio, EnunciadoEjercicio, Seccion } from '$lib/types/lesson';

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

/**
 * Ejercicio de práctica.
 *
 * `enunciado`: tono impersonal / usted, planteamiento + requisitos (a)(b) + salida esperada.
 * `criteriosLogica`: solo para la IA al corregir.
 */
export function ej(
  numero: number,
  titulo: string,
  enunciado: EnunciadoEjercicio,
  criteriosLogica: string[],
  plantilla: string,
  queDebePasar?: string[]
): Ejercicio {
  return { numero, titulo, enunciado, criteriosLogica, plantilla, queDebePasar };
}

const LETRAS = 'abcdefghijklmnopqrstuvwxyz';

/** Texto plano del enunciado para /api/corregir y tutor IA. */
export function enunciadoParaIA(enunciado: EnunciadoEjercicio): string {
  const reqs = enunciado.requisitos
    .map((r, i) => `(${LETRAS[i] ?? i + 1}) ${r}`)
    .join('\n');
  const partes = [
    enunciado.planteamiento,
    '',
    'Requisitos:',
    reqs,
    '',
    `Salida esperada:\n${enunciado.salidaEsperada}`
  ];
  if (enunciado.notas?.trim()) {
    partes.push('', `Notas: ${enunciado.notas}`);
  }
  return partes.join('\n');
}
