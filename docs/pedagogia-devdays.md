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

- `historia` — contexto narrativo.
- `queDebePasar` — checklist visible.
- `criteriosLogica` — lo que evalúa la IA (efecto, no sintaxis).
- `plantilla` — comentarios-guía; puede ir casi vacía.

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
