# AGENTS.md — Instrucciones para agentes IA

## Proyecto: DevDays

Bootcamp interno de **35 días** para aprender JavaScript + SvelteKit con un tutor IA que corrige código.
Stack: **SvelteKit 2 + Svelte 5 (runes) + TypeScript + Tailwind v4 + Supabase + CodeMirror 6 + OpenAI (primario) / Gemini (fallback)**.

---

## REGLA DE ORO

**No reescribas la plantilla original.** Este repo ya está limpio: solo queda lo que usa el portal.
**No metas marketing**, secciones de landing, blogs, ni newsletters. Esto es una app, no un sitio comercial.

Si necesitas un componente nuevo:

- Genérico → `src/lib/components/ui/`
- Específico del estudio → `src/lib/components/study/`

---

## Estructura real

| Carpeta                                    | Qué hay                                                                                       |
| ------------------------------------------ | --------------------------------------------------------------------------------------------- |
| `src/routes/+page.svelte` + `+page.ts`     | Redirect a `/estudio`                                                                         |
| `src/routes/+layout.svelte`                | Layout raíz: `ModeWatcher`, Sonner + ToastContainer                                           |
| `src/routes/login/`                        | Login con Magic Link de Supabase (forzado dark mode)                                          |
| `src/routes/auth/callback/+server.ts`      | Intercambio de code → sesión                                                                  |
| `src/routes/estudio/`                      | Portal con guard de auth + carga de lecciones y progreso                                      |
| `src/routes/api/corregir/+server.ts`       | Endpoint que corrige el código con la IA                                                      |
| `src/routes/api/preguntar/+server.ts`      | Endpoint para chat libre con el tutor                                                         |
| `src/routes/api/locale/+server.ts`         | Cookie de idioma (solo `es` por ahora)                                                        |
| `src/lib/data/lessons/`                    | **35 lecciones conceptuales** (`week1.ts`…`week5.ts`, ver `docs/pedagogia-devdays.md`)        |
| `src/lib/types/lesson.ts`                  | Tipos `LeccionNormal` y `LeccionExamen`                                                       |
| `src/lib/components/study/`                | `DayList`, `LessonContent`, `CodeEditor`, `AiTutor`, `AskTutorDialog`, `CodeBlock`, `Callout` |
| `src/lib/server/ai.ts`                     | Orquestador: intenta OpenAI primero, falla → Gemini                                           |
| `src/lib/server/openai.ts`                 | Llamada a OpenAI con JSON schema                                                              |
| `src/lib/server/gemini.ts`                 | Llamada a Gemini con reintentos exponenciales                                                 |
| `src/lib/server/supabase/server-client.ts` | Cliente SSR de Supabase                                                                       |
| `src/lib/server/allowlist.ts`              | Whitelist de emails permitidos                                                                |
| `src/hooks.server.ts`                      | Auth + cabeceras de seguridad + idioma SSR                                                    |

---

## Componentes shadcn disponibles

`Button`, `Card` (+ `CardContent`, `CardHeader`, `CardTitle`, `CardFooter`, `CardDescription`, `CardAction`), `Dialog`, `Input`, `Textarea`, `Label`, `Skeleton`, `Spinner`, `Sonner (Toaster)`.

Todos en `$lib/components/ui/<name>`.

---

## Patrones obligatorios (Svelte 5 runes)

```svelte
<script lang="ts">
	let { titulo, items = [] }: { titulo: string; items?: string[] } = $props();
	let abierto = $state(false);
	const total = $derived(items.length);
	$effect(() => {
		console.log('abierto:', abierto);
	});
</script>
```

- Slots → snippets: `{@render children?.()}`.
- Tipos de props **siempre** con `$props()`, nunca con genéricos.
- Importa `Snippet` con `import type { Snippet } from 'svelte'`.

---

## Tutor IA — Reglas

- **Corrección por lógica**, no por sintaxis perfecta (`criteriosLogica` + `queDebePasar` en cada ejercicio).
- La IA marca `correcto: true` en `/api/corregir` si el efecto del código cumple la intención.
- **Todos los días están abiertos**; no hay soft-lock por exámenes.
- Marcar día completado en Supabase es **opcional** (botón "Marcar día (opcional)").
- Pedagogía: analogías, qué hace / para qué sirve — ver `docs/pedagogia-devdays.md`.

---

## Variables de entorno

Ver `.env.example`. Las claves de IA son **opcionales en build** (`$env/dynamic/private`), pero al menos una de las dos (`OPENAI_API_KEY` o `GEMINI_API_KEY`) debe existir en runtime.

| Variable                   | Obligatoria | Uso                          |
| -------------------------- | ----------- | ---------------------------- |
| `PUBLIC_SUPABASE_URL`      | Sí          | Supabase auth                |
| `PUBLIC_SUPABASE_ANON_KEY` | Sí          | Supabase auth                |
| `PUBLIC_SITE_URL`          | Sí en prod  | Redirect del Magic Link      |
| `OPENAI_API_KEY`           | Recomendada | IA primaria                  |
| `GEMINI_API_KEY`           | Recomendada | Fallback de IA               |
| `ALLOWED_EMAILS`           | Opcional    | Whitelist separada por comas |

---

## Comandos

Este proyecto usa `pnpm`. No uses `npm` ni generes `package-lock.json` salvo petición explícita.

```bash
pnpm run dev      # desarrollo
pnpm run build    # build producción
pnpm run check    # svelte-check + tsc
pnpm run lint     # ESLint + Prettier
pnpm run format   # autoformat
```

Antes de cerrar una tarea: `pnpm run check` debe pasar.
