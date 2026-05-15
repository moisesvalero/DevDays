import type { Ejercicio, EnunciadoEjercicio, Seccion } from '$lib/types/lesson';

/** En cada sección: `texto` = técnico (JavaScript); `analogia` = 1–2 frases de apoyo. */
export function sec(
  titulo: string,
  analogia: string,
  paraQueSirve: string,
  texto: string,
  ejemplo?: string,
  pasosPractica?: string[]
): Seccion {
  return { titulo, analogia, paraQueSirve, texto, ejemplo, pasosPractica };
}

/**
 * Ejercicio de práctica.
 * `enunciado.seccionRef` debe coincidir con una sección del mismo día (o «Repaso semana N» en exámenes).
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
    `Sección de referencia: ${enunciado.seccionRef}`,
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

/** Id HTML estable para anclas en /estudio */
export function seccionAnchorId(dia: number, indice: number): string {
  return `sec-d${dia}-${indice}`;
}
