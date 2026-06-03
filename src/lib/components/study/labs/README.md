# Laboratorios visuales (DevDays)

## Flujo del alumno

`weekN.ts` → `contenidoLab(id, intro, titulos)` → `LessonContent` → `VisualLessonRenderer` → carpeta `dayN/` o `repaso-sN/`.

Cada bloque del laboratorio comparte **título** con `ejercicios[i].enunciado.seccionRef`.

## Tipos de lección

| Tipo           | Carpeta            | Renderer                                            |
| -------------- | ------------------ | --------------------------------------------------- |
| Día artesanal  | `dayN/*.svelte`    | `LAB_LOADERS['dia-N-…']`                            |
| Examen repaso  | `repaso-sN/`       | `LAB_LOADERS['repaso-sN']`                          |
| Legacy premium | solo `lab-configs` | `DedicatedDayLesson` (ya no usado en días migrados) |

Referencia de calidad: **día 2** (`day2/`) y **repaso-s1**.

## Añadir un día artesanal

1. Crear `dayN/DayNVisualLesson.svelte` + tres `*Lab.svelte` con `InteractiveLabLayout` + `LiveSpecPanel`.
2. Registrar loader en `registry.ts`.
3. En `weekN.ts`: `contenidoLab('dia-N-slug', intro, [t1, t2, t3])` — títulos = `seccionRef` de ejercicios.
4. Opcional: `DayLabConfig` en `lab-configs/weekN.ts` (documentación / fallback).

## Añadir repaso de examen

1. Carpeta `repaso-sN/` con `RepasoSNVisual.svelte` y 3 labs.
2. `repasoVisual: 'repaso-sN'` en el examen de `weekN.ts`.
3. Loader en `registry.ts`.

## Reglas

- No cambiar `salidaEsperada` sin revisar `/api/corregir`.
- Evitar `{` y backticks en atributos `spec=` de `LabSection` (rompe el parser).
- Modo `laboratorio`: la enseñanza vive en el UI; `lesson-audit` no exige teoría duplicada en secciones.

## Scripts

- `scripts/gen-artisanal-days.mjs` — scaffolding de días (revisar a mano después).
- `npm run check` — tipos Svelte/TS.
- `npm test` — cobertura lección ↔ ejercicio.
