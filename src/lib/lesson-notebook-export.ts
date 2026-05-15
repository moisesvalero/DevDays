import type { Leccion, LeccionNormal } from '$lib/types/lesson';

const NOTEBOOKLM_URL = 'https://notebooklm.google.com';

const PROMPT_LECCION = `INSTRUCCIONES PARA NOTEBOOKLM (Audio Overview)
- Idioma: español.
- Es un bootcamp de PROGRAMACIÓN WEB (JavaScript, luego Svelte/SvelteKit).
- Usa SIEMPRE los términos técnicos del texto: variable, const, let, función, array, etc.
- La analogía es solo ayuda visual (1 frase), NO conviertas esto en podcast de logística o transporte.
- Formato recomendado: **The Brief** o **Short** (audio corto, unos minutos).
- No dictes sintaxis letra por letra ni ejercicios para escribir en casa.
- Objetivo: que el oyente ENTIENDA qué hace cada concepto en código.`;

const PROMPT_REPASO = `INSTRUCCIONES PARA NOTEBOOKLM (Audio Overview — REPASO SEMANAL)
- Idioma: español.
- Repaso de una semana completa de un bootcamp JavaScript → SvelteKit.
- Conecta ideas entre días; menciona nombres técnicos de cada concepto.
- Analogías solo como apoyo breve; el tema es PROGRAMACIÓN, no logística.
- Formato recomendado: **Default** o **Deep Dive** (puede ser más largo que un día suelto).
- No dictar sintaxis; resumir qué hace cada idea y para qué sirve.`;

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
    parts.push('', `*Referencia (no memorizar):*`, '```js', s.ejemplo.trim(), '```');
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

export async function copyNotebookMarkdown(lesson: Leccion, allLessons: Leccion[]): Promise<boolean> {
  const md = notebookMarkdownForLesson(lesson, allLessons);
  try {
    await navigator.clipboard.writeText(md);
    return true;
  } catch {
    return false;
  }
}

export function openNotebookLM(): void {
  window.open(NOTEBOOKLM_URL, '_blank', 'noopener,noreferrer');
}
