import type { Leccion, LeccionNormal } from '$lib/types/lesson';

export const NOTEBOOKLM_URL = 'https://notebooklm.google.com/';

/** Texto para pegar en «¿En qué deben centrarse los presentadores…?» (válido todo el curso). */
export const NOTEBOOKLM_EPISODE_FOCUS = `Clase completa de bootcamp de programación web en español, para principiante. Usa SOLO el documento subido: recórrelo en orden (todas las secciones o todos los días que incluya) y explica cada concepto con su nombre técnico (JavaScript, Svelte, SvelteKit, variables, funciones, arrays, rutas, componentes, etc., según aparezca en el texto).

Estilo profesor paciente y claro: qué es, qué hace en código y para qué sirve en una aplicación real. La analogía del documento: como máximo una frase de apoyo; el tema es programación, no logística ni metáforas largas. No leer sintaxis letra por letra.

PROHIBIDO: decir que investigue por su cuenta, que busque en Google, que lea documentación externa o que "profundice fuera". La lección debe sentirse cerrada con este material.

Cierre obligatorio: resumen oral de lo visto ("hoy / esta semana has visto…") y animar a practicar en DevDays (ejercicios o retos del portal), sin deberes vagos ni tareas genéricas fuera de la plataforma.`;

const PROMPT_LECCION = `INSTRUCCIONES PARA NOTEBOOKLM (Audio Overview — tratar como CLASE, no como podcast suelto)
- Idioma: español.
- Es una lección de un bootcamp de PROGRAMACIÓN WEB (JavaScript → SvelteKit). El oyente es principiante.
- Recorre TODAS las secciones del documento en orden: explica qué es, qué hace en código y para qué sirve.
- Usa SIEMPRE los términos técnicos del texto (variable, const, let, función, array, etc.).
- La analogía del documento: máximo una frase de apoyo; NO conviertas el audio en logística ni transporte.
- Estilo: profesor claro, paciente, como una clase bien explicada. Ejemplos con palabras, no leer código letra por letra.
- PROHIBIDO al final: decir "investiga por tu cuenta", "búscalo en Google", "lee la documentación" o mandar fuera de la lección. La clase debe sentirse COMPLETA con lo que trae este documento.
- Cierre obligatorio: resumen de 30–60 segundos con los puntos del día ("hoy has visto…") y una frase de transición a practicar en DevDays (sin dar deberes genéricos).
- Duración: corta, pero densa en contenido del documento; no rellenes con charla vacía.`;

const PROMPT_REPASO = `INSTRUCCIONES PARA NOTEBOOKLM (Audio Overview — REPASO SEMANAL, estilo clase)
- Idioma: español.
- Repaso de una semana completa del bootcamp JavaScript → SvelteKit. Oyente principiante.
- Recorre los días del documento en orden; conecta ideas y nombra cada concepto técnico.
- Analogías solo como apoyo breve; el tema es PROGRAMACIÓN, no logística.
- Estilo: clase de repaso clara, no entrevista dispersa. No mandar a investigar por fuera ni a "profundizar por tu cuenta".
- Cierre: mapa mental verbal de la semana ("esta semana pasaste de… a…") y preparación para los retos del examen en DevDays.
- No dictar sintaxis al detalle; sí explicar qué hace cada idea y cuándo usarla.`;

function isLeccionNormal(l: Leccion): l is LeccionNormal {
  return l.tipo === 'leccion';
}

function formatSeccion(s: LeccionNormal['contenido']['secciones'][0]): string {
  const parts = [
    `### ${s.titulo}`,
    '',
    `**En código (JavaScript / web):** ${s.texto}`,
    '',
    `**Para qué sirve:** ${s.paraQueSirve}`,
    '',
    `**Analogía breve:** ${s.analogia}`
  ];
  if (s.ejemplo?.trim()) {
    parts.push('', '```js', s.ejemplo.trim(), '```');
  }
  return parts.join('\n');
}

function formatLeccionBody(l: LeccionNormal): string {
  const lines = [
    `## ${l.titulo}`,
    '',
    `**Objetivo:** ${l.objetivo}`,
    '',
    l.contenido.intro,
    ''
  ];
  for (const s of l.contenido.secciones) {
    lines.push(formatSeccion(s), '');
  }
  lines.push('### Resumen del día', '');
  for (const r of l.contenido.resumen) {
    lines.push(`- ${r}`);
  }
  return lines.join('\n');
}

/** Markdown de un día de lección (sin ejercicios). */
export function lessonToNotebookMarkdown(lesson: Leccion): string {
  if (!isLeccionNormal(lesson)) {
    return weekRecapMarkdown([lesson], lesson.semana);
  }

  return [
    `# DevDays — Día ${lesson.dia} · Semana ${lesson.semana}`,
    '',
    PROMPT_LECCION,
    '',
    '---',
    '',
    formatLeccionBody(lesson)
  ].join('\n');
}

/** Markdown con todos los días de lección de una semana (para día de repaso 7, 14…). */
export function weekRecapMarkdown(allLessons: Leccion[], semana: number): string {
  const diasLeccion = allLessons
    .filter((l): l is LeccionNormal => l.semana === semana && l.tipo === 'leccion')
    .sort((a, b) => a.dia - b.dia);

  const bodies = diasLeccion.map((l) => formatLeccionBody(l));

  return [
    `# DevDays — Repaso Semana ${semana}`,
    '',
    PROMPT_REPASO,
    '',
    `Días incluidos: ${diasLeccion.map((d) => d.dia).join(', ')}`,
    '',
    '---',
    '',
    bodies.join('\n\n---\n\n')
  ].join('\n');
}

export function notebookMarkdownForLesson(lesson: Leccion, allLessons: Leccion[]): string {
  if (lesson.tipo === 'examen') {
    return weekRecapMarkdown(allLessons, lesson.semana);
  }
  return lessonToNotebookMarkdown(lesson);
}

export function notebookDownloadFilename(lesson: Leccion): string {
  if (lesson.tipo === 'examen') {
    return `DevDays-repaso-semana-${lesson.semana}.md`;
  }
  return `DevDays-dia-${String(lesson.dia).padStart(2, '0')}.md`;
}

export function downloadNotebookMarkdown(lesson: Leccion, allLessons: Leccion[]): void {
  const md = notebookMarkdownForLesson(lesson, allLessons);
  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = notebookDownloadFilename(lesson);
  a.click();
  URL.revokeObjectURL(url);
}

export async function copyNotebookEpisodeFocus(): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(NOTEBOOKLM_EPISODE_FOCUS);
    return true;
  } catch {
    return false;
  }
}

/** Abre NotebookLM en pestaña nueva (respaldo programático). */
export function openNotebookLM(): void {
  const a = document.createElement('a');
  a.href = NOTEBOOKLM_URL;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.click();
}
