# Cómo sacar partido a DevDays

## Ritmo recomendado (35 días)

| Días  | Contenido                                |
| ----- | ---------------------------------------- |
| 1–6   | JavaScript base (variables → arrays)     |
| 7     | **Examen S1** — repaso visual + 5 retos  |
| 8–13  | Objetos, bucles, async, DOM              |
| 14    | **Examen S2**                            |
| 15–20 | Svelte 5 (componentes, runes, eventos)   |
| 21    | **Examen S3**                            |
| 22–27 | SvelteKit (rutas, load, forms, Supabase) |
| 28    | **Examen S4**                            |
| 29–34 | TypeScript, deploy, proyecto final       |
| 35    | **Examen S5**                            |

## En cada lección (no examen)

1. **Laboratorio visual** — tres bloques con el mismo título que los retos. Mueve controles y lee «Código en vivo».
2. **Retos de consola** — replica la lógica del spec; usa «Corregir» cuando la salida coincida.
3. **No memorices sintaxis** — el corrector evalúa el _efecto_ (salida, datos), no cada punto y coma.

## En cada examen (días 7, 14, 21, 28, 35)

1. **Repaso visual** — tres mini-labs alineados con la semana.
2. **Cinco retos** — integran varios días; las notas del enunciado citan qué repasar.
3. Puedes exportar el podcast NotebookLM desde la cabecera del examen.

## Local

```bash
npm install
cp .env.example .env   # si existe; rellena claves para IA/Supabase
npm run dev
```

Abre `/estudio` y avanza por días. `npm run check` y `npm test` validan el curso en CI.

## Extender el curso (mantenedores)

Ver `src/lib/components/study/labs/README.md`.
