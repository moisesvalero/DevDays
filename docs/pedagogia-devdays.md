# Pedagogía DevDays

## Principio

El alumno aprende **qué hace** cada cosa y **para qué sirve**. La sintaxis la completa con autocompletado (Tab), el tutor IA y búsquedas.

## Estructura de cada sección (UI)

1. **En código** (`texto`) — explicación técnica con términos JavaScript / SvelteKit.
2. **Para qué sirve** (`paraQueSirve`) — uso en proyectos reales y en DevDays.
3. **Analogía breve** (`analogia`) — 1–2 frases de apoyo; no sustituye lo técnico.
4. **Referencia** (`ejemplo`) — código de referencia; alineado con el ejercicio del mismo índice.
5. **En la práctica** (`pasosPractica`) — pasos numerados visibles en UI; mismos pasos que el ejercicio (sin dar la solución completa).

En los datos (`sec()` en `week*.ts`), el orden de parámetros sigue siendo `analogia` luego `texto`; la pantalla prioriza `texto` primero.

## Regla 1:1 sección ↔ ejercicio

| Regla | Detalle |
|-------|---------|
| Lección (30 días) | Exactamente **3 secciones** y **3 ejercicios**, mismo orden: ejercicio N solo usa la sección N. |
| `seccionRef` | Título **exacto** de esa sección (obligatorio en cada enunciado). |
| `notas` | Obligatorio; debe citar la sección («Véase sección X»). |
| Examen (días 7, 14, 21, 28, 35) | `seccionRef: 'Repaso semana N'`; `notas` citan los días de la semana. |

Antes de merge: `npm run test` debe pasar `lesson-coverage.test.ts` (auditoría automática en `lesson-audit.ts`).

## Ejercicios

- `titulo` — nombre corto en la pestaña (técnico, sin metáforas largas).
- `enunciado` — objeto `EnunciadoEjercicio` mostrado como manual universitario:
  - **Planteamiento** — prosa formal (2–4 frases).
  - **Tareas** — requisitos (a), (b), (c) con verbos: «Declare», «Escriba», «Calcule»…
  - **Salida esperada** — valor concreto de consola (bloque monospace).
  - **seccionRef** — título de la sección del mismo día (enlace en UI).
  - **Notas** — aclaraciones y enlace a la sección del día.
- `criteriosLogica` — solo para la IA en `/api/corregir`; el alumno no lo ve.
- `plantilla` — código de partida en el editor.

La UI usa [`ExerciseEnunciado.svelte`](../src/lib/components/study/ExerciseEnunciado.svelte). Para la API se serializa con `enunciadoParaIA()`.

## Corrección IA

- Aprobar si la **lógica** cumple `criteriosLogica`.
- No rechazar por typos, `const`/`let`, o método equivalente (`for` vs `map`).

## Regla día ↔ ejercicio (resumen)

Cada ejercicio solo puede pedir lo ya explicado **en su sección** (`seccionRef`). Si falta un concepto (p. ej. `if` en día 2), primero ampliar esa sección y `pasosPractica`, luego el enunciado.

## Progreso

- Todos los días abiertos.
- Marcar día completado es **opcional**.
- No hay soft-lock por exámenes.

## NotebookLM (audio)

- Botón en cada lección: exporta `.md` del día o repaso semanal (días 7, 14, 21, 28, 35).
- El markdown incluye instrucciones para Audio Overview en español, con **términos técnicos** (no podcast de logística).
- Lección diaria → Brief/Short; repaso semanal → Default/Deep Dive.
