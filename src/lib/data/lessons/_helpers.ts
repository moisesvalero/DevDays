import type { Ejercicio, EnunciadoEjercicio, Seccion, ContenidoLeccion } from '$lib/types/lesson';
import type { IdLaboratorio } from '$lib/types/laboratorio';

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
	const reqs = enunciado.requisitos.map((r, i) => `(${LETRAS[i] ?? i + 1}) ${r}`).join('\n');
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

const PASOS_LAB = [
	'Abre el bloque visual con el mismo título y mueve los controles.',
	'Observa el panel «Código en vivo»: ahí está la spec que debes replicar en consola.',
	'Cuando entiendas el flujo, baja al reto de consola y valida la salida esperada.'
] as const;

const EJEMPLO_LAB =
	'// let / const / console.log / template literals — según el bloque del laboratorio.\nlet ejemplo = 0;\nconsole.log(ejemplo);';

/** Contenido en modo laboratorio visual (3 secciones alineadas con ejercicios). */
export function contenidoLab(
	laboratorio: IdLaboratorio,
	intro: string,
	titulos: [string, string, string]
): ContenidoLeccion {
	return {
		intro,
		modo: 'laboratorio',
		laboratorio,
		secciones: titulos.map((titulo) =>
			sec(
				titulo,
				'La explicación interactiva está en el laboratorio de arriba; esta sección enlaza el reto de consola.',
				'Validar en consola lo que ya viste mover en la UI.',
				'Practica primero en el laboratorio visual; luego replica la lógica en el editor de retos.',
				EJEMPLO_LAB,
				[...PASOS_LAB]
			)
		),
		resumen: [
			'Cada bloque visual corresponde 1:1 con un reto de consola (mismo título).',
			'Si el corrector falla, vuelve al spec del bloque y compara variable a variable.',
			'Los exámenes de semana incluyen un repaso visual antes de los cinco retos.'
		]
	};
}
