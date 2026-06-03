import type { Ejercicio, Leccion, LeccionNormal, Seccion } from '$lib/types/lesson';

export type AuditIssue = {
	dia: number;
	ejercicio?: number;
	codigo: string;
	mensaje: string;
};

/** Conceptos que deben aparecer en la sección referenciada si se mencionan en el enunciado */
const CONCEPTO_PATRONES: { id: string; patrones: RegExp[] }[] = [
	{ id: 'if', patrones: [/\bif\s*\(/, /\belse\b/, /\belse\s+if\b/i] },
	{ id: 'ternario', patrones: [/\?[^:]+:\s*[^;]+;/, /\bternario\b/i] },
	{ id: 'switch', patrones: [/\bswitch\s*\(/] },
	{ id: 'map', patrones: [/\.\s*map\s*\(/, /\bmap\s*\(/] },
	{ id: 'filter', patrones: [/\.\s*filter\s*\(/, /\bfilter\s*\(/] },
	{ id: 'find', patrones: [/\.\s*find\s*\(/, /\bfind\s*\(/] },
	{ id: 'reduce', patrones: [/\.\s*reduce\s*\(/, /\breduce\s*\(/] },
	{ id: 'some', patrones: [/\.\s*some\s*\(/, /\bsome\s*\(/] },
	{ id: 'every', patrones: [/\.\s*every\s*\(/, /\bevery\s*\(/] },
	{ id: 'sort', patrones: [/\.\s*sort\s*\(/, /\bsort\s*\(/] },
	{ id: 'async', patrones: [/\basync\b/, /\bawait\b/] },
	{ id: 'fetch', patrones: [/\bfetch\s*\(/] },
	{ id: 'destructur', patrones: [/\bdestructur/, /\{\s*\w+.*\}\s*=/] },
	{ id: 'spread', patrones: [/\.\.\./] },
	{ id: 'template', patrones: [/\$\{/, /template\s*literal/i, /backtick/i] },
	{ id: 'arrow', patrones: [/=>/] },
	{ id: 'function', patrones: [/\bfunction\s+\w+/, /\breturn\b/] },
	{ id: 'Math.max', patrones: [/\bMath\.max\b/] },
	{ id: 'forof', patrones: [/\bfor\s*\(\s*const\s+\w+\s+of\b/] },
	{ id: 'for', patrones: [/\bfor\s*\(\s*let\s+\w+\s*=/] },
	{ id: 'while', patrones: [/\bwhile\s*\(/] },
	{ id: 'console', patrones: [/\bconsole\.log\b/] },
	{ id: 'let', patrones: [/\blet\s+\w+/] },
	{ id: 'const', patrones: [/\bconst\s+\w+/] }
];

function textoSeccion(s: Seccion): string {
	return [s.texto, s.ejemplo ?? '', ...(s.pasosPractica ?? [])].join('\n');
}

function mencionaConcepto(texto: string, conceptoId: string): boolean {
	const entry = CONCEPTO_PATRONES.find((c) => c.id === conceptoId);
	if (!entry) return false;
	return entry.patrones.some((p) => p.test(texto));
}

function textoEnunciado(ej: Ejercicio): string {
	const en = ej.enunciado;
	return [en.planteamiento, ...en.requisitos, en.notas ?? ''].join('\n');
}

function auditarLeccion(lesson: LeccionNormal): AuditIssue[] {
	const issues: AuditIssue[] = [];
	const { dia, contenido, ejercicios } = lesson;
	const esLaboratorio = contenido.modo === 'laboratorio';
	const secciones = contenido.secciones;
	const titulos = new Set(secciones.map((s) => s.titulo));

	if (secciones.length !== 3) {
		issues.push({
			dia,
			codigo: 'SEC_COUNT',
			mensaje: `Se esperan 3 secciones, hay ${secciones.length}.`
		});
	}

	if (ejercicios.length !== 3) {
		issues.push({
			dia,
			codigo: 'EJ_COUNT',
			mensaje: `Se esperan 3 ejercicios, hay ${ejercicios.length}.`
		});
	}

	secciones.forEach((s, i) => {
		if (!esLaboratorio && !s.pasosPractica?.length) {
			issues.push({
				dia,
				codigo: 'SIN_PASOS',
				mensaje: `Sección «${s.titulo}» sin pasosPractica.`
			});
		}
		if (!esLaboratorio && !s.ejemplo?.trim()) {
			issues.push({
				dia,
				codigo: 'SIN_EJEMPLO',
				mensaje: `Sección «${s.titulo}» sin ejemplo de código.`
			});
		}
		const ej = ejercicios[i];
		if (ej && s.titulo !== ej.enunciado.seccionRef) {
			issues.push({
				dia,
				ejercicio: ej.numero,
				codigo: 'SEC_EJ_MISMATCH',
				mensaje: `Ejercicio ${ej.numero} referencia «${ej.enunciado.seccionRef}» pero la sección ${i + 1} es «${s.titulo}».`
			});
		}
	});

	for (const ej of ejercicios) {
		const ref = ej.enunciado.seccionRef;
		if (!titulos.has(ref)) {
			issues.push({
				dia,
				ejercicio: ej.numero,
				codigo: 'SEC_REF_INVALIDA',
				mensaje: `seccionRef «${ref}» no existe en las secciones del día ${dia}.`
			});
		}

		if (!ej.enunciado.notas?.trim()) {
			issues.push({
				dia,
				ejercicio: ej.numero,
				codigo: 'SIN_NOTAS',
				mensaje: `Ejercicio ${ej.numero} sin campo notas.`
			});
		}

		const sec = secciones.find((s) => s.titulo === ref);
		if (!sec) continue;

		if (esLaboratorio) continue;

		const corpusSec = textoSeccion(sec);
		const corpusEj = textoEnunciado(ej);

		for (const { id } of CONCEPTO_PATRONES) {
			if (mencionaConcepto(corpusEj, id) && !mencionaConcepto(corpusSec, id)) {
				issues.push({
					dia,
					ejercicio: ej.numero,
					codigo: 'CONCEPTO_NO_ENSEÑADO',
					mensaje: `Ejercicio ${ej.numero} usa «${id}» pero la sección «${ref}» no lo explica.`
				});
			}
		}
	}

	return issues;
}

function auditarExamen(lesson: Extract<Leccion, { tipo: 'examen' }>): AuditIssue[] {
	const issues: AuditIssue[] = [];
	const refEsperada = `Repaso semana ${lesson.semana}`;

	for (const ej of lesson.ejercicios) {
		if (ej.enunciado.seccionRef !== refEsperada) {
			issues.push({
				dia: lesson.dia,
				ejercicio: ej.numero,
				codigo: 'EXAM_SEC_REF',
				mensaje: `Examen: seccionRef debe ser «${refEsperada}».`
			});
		}
		if (!ej.enunciado.notas?.match(/d[ií]a|repaso|semana/i)) {
			issues.push({
				dia: lesson.dia,
				ejercicio: ej.numero,
				codigo: 'EXAM_SIN_REPASO',
				mensaje: `Examen ejercicio ${ej.numero}: notas deben citar días de repaso.`
			});
		}
	}

	return issues;
}

export function auditarLecciones(lecciones: Leccion[]): AuditIssue[] {
	const issues: AuditIssue[] = [];
	for (const lesson of lecciones) {
		if (lesson.tipo === 'leccion') {
			issues.push(...auditarLeccion(lesson));
		} else {
			issues.push(...auditarExamen(lesson));
		}
	}
	return issues;
}

export function formatearInforme(issues: AuditIssue[]): string {
	if (issues.length === 0) return 'Sin problemas de cobertura lección ↔ ejercicio.';
	return issues
		.map((i) => {
			const ej = i.ejercicio ? ` ej.${i.ejercicio}` : '';
			return `Día ${i.dia}${ej} [${i.codigo}]: ${i.mensaje}`;
		})
		.join('\n');
}
