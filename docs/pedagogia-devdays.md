# Pedagogía DevDays

## Principio

El alumno aprende **qué hace** cada cosa y **para qué sirve**. La sintaxis la completa con autocompletado (Tab), el tutor IA y búsquedas.

## Estructura de cada sección (UI)

1. **En código** (`texto`) — explicación técnica con términos JavaScript / SvelteKit.
2. **Para qué sirve** (`paraQueSirve`) — uso en proyectos reales y en DevDays.
3. **Analogía breve** (`analogia`) — 1–2 frases de apoyo; no sustituye lo técnico.
4. **Referencia** (`ejemplo`) — opcional; no memorizar.

En los datos (`sec()` en `week*.ts`), el orden de parámetros sigue siendo `analogia` luego `texto`; la pantalla prioriza `texto` primero.

## Ejercicios

- `titulo` — nombre corto en la pestaña (técnico, sin metáforas largas).
- `enunciado` — objeto `EnunciadoEjercicio` mostrado como manual universitario:
  - **Planteamiento** — prosa formal (2–4 frases).
  - **Tareas** — requisitos (a), (b), (c) con verbos: «Declare», «Escriba», «Calcule»…
  - **Salida esperada** — valor concreto de consola (bloque monospace).
  - **Notas** — opcional (enlace a sección del día).
- `criteriosLogica` — solo para la IA en `/api/corregir`; el alumno no lo ve.
- `plantilla` — código de partida en el editor.

La UI usa [`ExerciseEnunciado.svelte`](../src/lib/components/study/ExerciseEnunciado.svelte). Para la API se serializa con `enunciadoParaIA()`.

## Corrección IA

- Aprobar si la **lógica** cumple `criteriosLogica`.
- No rechazar por typos, `const`/`let`, o método equivalente (`for` vs `map`).

## Progreso

- Todos los días abiertos.
- Marcar día completado es **opcional**.
- No hay soft-lock por exámenes.

## NotebookLM (audio)

- Botón en cada lección: exporta `.md` del día o repaso semanal (días 7, 14, 21, 28, 35).
- El markdown incluye instrucciones para Audio Overview en español, con **términos técnicos** (no podcast de logística).
- Lección diaria → Brief/Short; repaso semanal → Default/Deep Dive.
