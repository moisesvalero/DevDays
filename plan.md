# DevDays — Portal de estudio de 35 días

> Este archivo es el **contrato de ejecución** para el agente que implemente la app.
> Léelo entero antes de tocar nada. Ejecuta los todos del final **en orden, uno por uno**.
> Si algo no está aquí, **pregunta antes** de improvisar.

---

## 0. Contexto y stack

- **Proyecto**: SvelteKit 2 + Svelte 5 (runes) + TS + Tailwind v4 + shadcn-svelte (ya instalado).
- **Objetivo**: portal interactivo de 35 días para aprender JS y SvelteKit. Layout de 3 columnas (lista de días | explicación + ejercicios + editor | tutor IA).
- **Diseño**: replicar [DISEÑO UI/code.html](DISEÑO%20UI/code.html). Tokens documentados en [DISEÑO UI/DESIGN.md](DISEÑO%20UI/DESIGN.md).
- **Temario**: 35 días en 5 semanas, definido en [ESTUDIO.txt](ESTUDIO.txt). **No modificar títulos ni objetivos**, solo añadir explicación breve + 3 ejercicios concretos por día.
- **Auth**: obligatoria, Magic Link de Supabase.
- **Persistencia**: tabla `progreso` en Supabase (RLS).
- **Corrección de código**: Gemini API gratis (`gemini-2.5-flash`), llamada SOLO desde server.
- **Editor**: CodeMirror 6 con lang JS y tema One Dark.

### Variables de entorno (ya están en `.env`)

```
PUBLIC_SUPABASE_URL=...
PUBLIC_SUPABASE_ANON_KEY=...
GEMINI_API_KEY=...
```

No las toques. Si faltara alguna, avisa.

---

## 1. Dependencias a instalar

```bash
npm i @supabase/ssr @codemirror/state @codemirror/view @codemirror/commands @codemirror/language @codemirror/lang-javascript @codemirror/theme-one-dark
```

**Importante**: usar paquetes individuales de CodeMirror 6 (NO el meta-package `codemirror`). Esto evita duplicados de `@codemirror/state` que rompen el editor.

---

## 2. Supabase — SQL a ejecutar manualmente

El usuario lo ejecuta en el SQL Editor de Supabase. **No intentes ejecutarlo desde el agente.** Solo deja claro al usuario que debe pegarlo:

```sql
create table public.progreso (
  user_id uuid not null references auth.users(id) on delete cascade,
  dia int not null check (dia between 1 and 35),
  estado text not null default 'pendiente' check (estado in ('pendiente','completado')),
  fecha timestamptz not null default now(),
  primary key (user_id, dia)
);

alter table public.progreso enable row level security;

create policy "user sees own progreso"
  on public.progreso for select using (auth.uid() = user_id);

create policy "user inserts own progreso"
  on public.progreso for insert with check (auth.uid() = user_id);

create policy "user updates own progreso"
  on public.progreso for update using (auth.uid() = user_id);
```

También en **Authentication → URL Configuration**: añadir `http://localhost:5173/auth/callback` como Redirect URL.

---

## 3. Tipos

### `src/lib/types/lesson.ts` (nuevo)

```ts
export type Ejercicio = {
	numero: 1 | 2 | 3;
	enunciado: string;
	plantilla: string;
};

export type Leccion = {
	dia: number;
	semana: 1 | 2 | 3 | 4 | 5;
	titulo: string;
	objetivo: string;
	explicacion: string;
	ejercicios: [Ejercicio, Ejercicio, Ejercicio];
};

export type EstadoDia = 'pendiente' | 'completado';

export type FilaProgreso = {
	user_id: string;
	dia: number;
	estado: EstadoDia;
	fecha: string;
};
```

### `src/app.d.ts` (modificar — añadir tipado de `locals`)

```ts
import type { SupabaseClient, User } from '@supabase/supabase-js';

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient;
			user: User | null;
		}
	}
}
export {};
```

(Mantén lo que ya hubiera en `app.d.ts`.)

---

## 4. Contenido de las lecciones — `src/lib/data/lessons.ts`

Genera los 35 días respetando los títulos y objetivos de `ESTUDIO.txt`. Para cada día:

- `explicacion`: 4-8 líneas claras y breves (sin teoría larga, así lo pide el temario).
- `ejercicios`: 3 ejercicios concretos en JS, dificultad progresiva.
- `plantilla`: código semilla que aparece en el editor (con comentarios guía).

**Importante**: los días 8-14 (Svelte) y 15-28 (SvelteKit/Supabase) **se practican en JS plano**, porque CodeMirror está configurado solo para JS. Plantea los ejercicios como funciones JS que simulan el comportamiento Svelte (ej. "escribe una función `render(props)` que devuelva el string HTML que generaría un componente"). Indícalo en el enunciado.

Ejemplo de la forma exacta esperada (Día 1, Variables):

```ts
import type { Leccion } from '$lib/types/lesson';

export const lessons: Leccion[] = [
	{
		dia: 1,
		semana: 1,
		titulo: 'Variables',
		objetivo: 'Entender let, const, texto y números.',
		explicacion: `En JavaScript hay dos formas principales de declarar variables: let y const.
let permite reasignar el valor más tarde. const fija el valor y no se puede cambiar.
Los tipos básicos son string (texto entre comillas), number (números), boolean (true/false).
Regla práctica: usa const por defecto y let solo cuando sepas que vas a reasignar.`,
		ejercicios: [
			{
				numero: 1,
				enunciado:
					'Declara una constante llamada `nombre` con tu nombre y muéstrala con console.log.',
				plantilla: `// Día 1 - Ejercicio 1\n// Declara una constante 'nombre' con tu nombre.\n\n`
			},
			{
				numero: 2,
				enunciado:
					'Declara una variable `edad` con let, asígnale 25 y luego cámbiala a 26. Muestra ambos valores.',
				plantilla: `// Día 1 - Ejercicio 2\n\n`
			},
			{
				numero: 3,
				enunciado: 'Crea una constante `pi = 3.14` e intenta reasignarla. Comenta qué pasa.',
				plantilla: `// Día 1 - Ejercicio 3\n\n`
			}
		]
	}
	// ... días 2 a 35
];
```

Mantén exactamente los títulos del temario:

- Semana 1: 1 Variables, 2 Arrays y objetos, 3 Funciones, 4 Condiciones, 5 Bucles y listas (map/filter), 6 Eventos y async/await, 7 Repaso JS.
- Semana 2: 8 Qué es Svelte, 9 Componentes, 10 Variables en Svelte, 11 Props, 12 Eventos, 13 {#if} y {#each}, 14 bind:value.
- Semana 3: 15 Estructura SvelteKit, 16 Rutas, 17 +page.svelte, 18 +layout.svelte, 19 Rutas dinámicas, 20 Navegación, 21 Mini web.
- Semana 4: 22 Formularios, 23 Actions, 24 Fetch, 25 Loading y error, 26 Load, 27 Supabase básico, 28 Mini app real.
- Semana 5: 29 Explicar tu stack, 30 Preguntas de entrevista, 31 Defender proyectos, 32 Revisión técnica, 33 Simulación real, 34 Repaso general, 35 Código real (leer línea a línea).

Para los días 29-35 (más de entrevistas que de código), los ejercicios pueden ser: escribir una función que devuelva un string con tu respuesta a una pregunta. La corrección la hará Gemini igual.

---

## 5. Cliente Supabase para SSR — `src/lib/server/supabase/server-client.ts` (nuevo)

```ts
import { createServerClient } from '@supabase/ssr';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { RequestEvent } from '@sveltejs/kit';

export function createSupabaseServerClient(event: RequestEvent) {
	return createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			getAll: () => event.cookies.getAll(),
			setAll: (cookies) => {
				cookies.forEach(({ name, value, options }) =>
					event.cookies.set(name, value, { ...options, path: '/' })
				);
			}
		}
	});
}
```

**No borres** ni modifiques `src/lib/server/supabase/client.ts` (puede usarse en otros sitios). Crea el nuevo aparte.

---

## 6. `src/hooks.server.ts` (modificar — añadir Supabase sin romper CSP/lang)

El archivo actual tiene un `handle` con CSP, lang, cache, etc. **No lo borres**. Encadénalo con un nuevo handler usando `sequence`:

```ts
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import { createSupabaseServerClient } from '$lib/server/supabase/server-client';

const handleSupabase: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient(event);
	const {
		data: { user }
	} = await event.locals.supabase.auth.getUser();
	event.locals.user = user;
	return resolve(event);
};

// El `handle` original con CSP/lang se renombra a `handleSecurity`.
// Al final del archivo:
export const handle = sequence(handleSupabase, handleSecurity);
```

**Usa siempre `getUser()` en server** (valida el JWT). No uses `getSession()` aquí.

---

## 7. Auth

### `src/routes/login/+page.svelte` (nuevo)

Formulario con un input email + botón "Enviar Magic Link". Usa `<form method="POST" action="?/magic">` con `enhance`. Muestra mensaje cuando se envíe el link. Diseño consistente con el resto del proyecto (puedes usar `<Card>`, `<Input>`, `<Button>`, `<Label>` de shadcn).

### `src/routes/login/+page.server.ts` (nuevo)

```ts
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { PUBLIC_SITE_URL } from '$env/static/public';

export const actions: Actions = {
	magic: async ({ request, locals }) => {
		const data = await request.formData();
		const email = String(data.get('email') || '').trim();
		if (!email) return fail(400, { error: 'Email requerido' });
		const { error } = await locals.supabase.auth.signInWithOtp({
			email,
			options: { emailRedirectTo: `${PUBLIC_SITE_URL}/auth/callback` }
		});
		if (error) return fail(500, { error: error.message });
		return { sent: true };
	}
};
```

### `src/routes/auth/callback/+server.ts` (nuevo)

```ts
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
	const code = url.searchParams.get('code');
	if (code) {
		await locals.supabase.auth.exchangeCodeForSession(code);
	}
	throw redirect(303, '/estudio');
};
```

---

## 8. Layout y datos de `/estudio`

### `src/routes/estudio/+layout.server.ts` (nuevo)

```ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { lessons } from '$lib/data/lessons';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) throw redirect(303, '/login');
	const { data: progreso } = await locals.supabase
		.from('progreso')
		.select('dia, estado, fecha')
		.eq('user_id', locals.user.id);
	return {
		user: { id: locals.user.id, email: locals.user.email },
		lessons,
		progreso: progreso ?? []
	};
};
```

### `src/routes/estudio/+layout.svelte` (nuevo)

Layout fullscreen, **sin** la nav superior global del layout raíz. Aplica clase `.dark` envolviendo todo para forzar tema oscuro del diseño:

```svelte
<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
</script>

<div class="dark fixed inset-0 flex flex-col bg-background text-on-surface overflow-hidden">
	{@render children()}
</div>
```

Esto pisa el `pt-32` y la nav del layout raíz porque `fixed inset-0` ocupa todo.

---

## 9. Tokens Material que faltan — añadir a `src/app.css`

Dentro del bloque `@theme inline` ya existente (cerca de la línea 98), añade estos colores:

```css
--color-surface-container: #201f1f;
--color-surface-container-low: #1c1b1b;
--color-surface-container-lowest: #0e0e0e;
--color-surface-container-high: #2a2a2a;
--color-on-surface: #e5e2e1;
--color-on-surface-variant: #c2c6d6;
--color-outline: #8c909f;
--color-outline-variant: #424754;
--color-tertiary: #ffb786;
--color-tertiary-container: #df7412;
--color-secondary-container: #474746;
--color-on-secondary-container: #b7b5b4;
--color-on-primary: #002e6a;
```

No tocar las variables shadcn (`--color-primary`, etc.). Solo añadir las Material que faltan.

---

## 10. Componentes del portal (en `src/lib/components/study/`)

### `DayList.svelte` — columna izquierda

Props: `lessons: Leccion[]`, `progreso: FilaProgreso[]`, `currentDay: number`, `onSelect: (dia: number) => void`.

Por cada lección:

- Círculo verde (Material icon `check_circle` con color `#10B981`) si `progreso.find(p => p.dia === dia)?.estado === 'completado'`.
- Círculo gris (`circle` outline) si pendiente.
- Si `dia === currentDay`: borde izquierdo de 4px en `--color-primary` y texto en primary.

Header con título "DevDays 35" + porcentaje completado.

### `LessonContent.svelte` — columna central (parte superior)

Props: `lesson: Leccion`, `correctos: Set<number>`, `ejercicioActivo: number`, `onSelectEjercicio: (n: number) => void`.

Muestra:

- `<h1>` con `lesson.titulo`.
- `<p>` con `lesson.explicacion` (preserva saltos de línea con `white-space: pre-line`).
- Lista de 3 ejercicios. El activo lleva borde primary, los completados un check verde, los demás borde outline-variant.

### `CodeEditor.svelte` — columna central (parte inferior)

Props: `value: string`, `onChange: (v: string) => void`, `filename: string`.
Expone método `getValue()` vía `bind:this`.

```svelte
<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { EditorState } from '@codemirror/state';
	import { EditorView, keymap, lineNumbers } from '@codemirror/view';
	import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
	import { javascript } from '@codemirror/lang-javascript';
	import { oneDark } from '@codemirror/theme-one-dark';

	let {
		value = $bindable(''),
		onChange,
		filename = 'exercise.js'
	}: { value: string; onChange?: (v: string) => void; filename?: string } = $props();

	let host: HTMLDivElement;
	let view: EditorView | undefined;

	export function getValue(): string {
		return view ? view.state.doc.toString() : value;
	}

	onMount(() => {
		view = new EditorView({
			parent: host,
			state: EditorState.create({
				doc: value,
				extensions: [
					lineNumbers(),
					history(),
					keymap.of([...defaultKeymap, ...historyKeymap]),
					javascript(),
					oneDark,
					EditorView.updateListener.of((u) => {
						if (u.docChanged) {
							const v = u.state.doc.toString();
							value = v;
							onChange?.(v);
						}
					})
				]
			})
		});
	});

	onDestroy(() => view?.destroy());

	$effect(() => {
		if (view && value !== view.state.doc.toString()) {
			view.dispatch({
				changes: { from: 0, to: view.state.doc.length, insert: value }
			});
		}
	});
</script>

<div class="border border-outline-variant rounded-lg overflow-hidden bg-surface-container-lowest">
	<div
		class="flex items-center justify-between bg-surface-container px-md py-sm border-b border-outline-variant"
	>
		<div class="flex items-center gap-sm">
			<span class="material-symbols-outlined text-on-surface-variant text-sm">terminal</span>
			<span class="font-mono text-xs text-on-surface-variant">{filename}</span>
		</div>
		<span class="font-mono text-xs text-on-surface-variant">JavaScript</span>
	</div>
	<div bind:this={host} class="min-h-[300px] text-sm"></div>
</div>
```

**Crítico**: `new EditorView` SOLO dentro de `onMount`. Nunca en `$effect` ni en setup.

### `AiTutor.svelte` — columna derecha

Props: `feedback: string | null`, `loading: boolean`, `correctoUltimo: boolean | null`, `dailyProgressPct: number`, `canComplete: boolean`, `onComplete: () => void`.

- Header con avatar IA + "AI Tutor" + estado.
- Si `loading`: spinner.
- Si `feedback`: panel con borde tertiary (si `correctoUltimo === false`) o success verde (si `correctoUltimo === true`). Renderiza el feedback en `<p>`.
- Barra de progreso del día (% basado en `correctos.size / 3`).
- Botón "Marcar día completado": disabled hasta que `canComplete === true` (los 3 ejercicios correctos). Cuando se pulsa llama `onComplete()`.

---

## 11. Página principal — `src/routes/estudio/+page.svelte` (nuevo)

Ensambla las 3 columnas. Estado con runes:

```svelte
<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import DayList from '$lib/components/study/DayList.svelte';
	import LessonContent from '$lib/components/study/LessonContent.svelte';
	import CodeEditor from '$lib/components/study/CodeEditor.svelte';
	import AiTutor from '$lib/components/study/AiTutor.svelte';
	import { Button } from '$lib/components/ui/button';

	let { data } = $props();

	let currentDay = $state(1);
	let ejercicioActivo = $state<1 | 2 | 3>(1);
	let correctosPorDia = $state<Map<number, Set<number>>>(new Map());
	let codigosPorEjercicio = $state<Map<string, string>>(new Map()); // clave: `${dia}-${ej}`
	let feedback = $state<string | null>(null);
	let correctoUltimo = $state<boolean | null>(null);
	let loading = $state(false);
	let editorRef: { getValue: () => string } | null = $state(null);

	const lesson = $derived(data.lessons.find((l) => l.dia === currentDay)!);
	const correctosDia = $derived(correctosPorDia.get(currentDay) ?? new Set<number>());
	const ejercicio = $derived(lesson.ejercicios.find((e) => e.numero === ejercicioActivo)!);
	const claveActual = $derived(`${currentDay}-${ejercicioActivo}`);
	const codigoActual = $derived(codigosPorEjercicio.get(claveActual) ?? ejercicio.plantilla);
	const canComplete = $derived(correctosDia.size === 3);
	const dailyProgressPct = $derived(Math.round((correctosDia.size / 3) * 100));

	function onChangeCode(v: string) {
		codigosPorEjercicio.set(claveActual, v);
		codigosPorEjercicio = new Map(codigosPorEjercicio);
	}

	async function corregir() {
		if (!editorRef) return;
		loading = true;
		feedback = null;
		try {
			const res = await fetch('/api/corregir', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({
					dia: currentDay,
					ejercicio: ejercicioActivo,
					enunciado: ejercicio.enunciado,
					codigo: editorRef.getValue()
				})
			});
			const json = await res.json();
			feedback = json.feedback;
			correctoUltimo = json.correcto;
			if (json.correcto) {
				const set = new Set(correctosDia);
				set.add(ejercicioActivo);
				correctosPorDia.set(currentDay, set);
				correctosPorDia = new Map(correctosPorDia);
			}
		} finally {
			loading = false;
		}
	}

	async function marcarCompletado() {
		const fd = new FormData();
		fd.append('dia', String(currentDay));
		await fetch('?/marcar', { method: 'POST', body: fd });
		await invalidateAll();
	}
</script>

<!-- Header superior (clon del TopNav del diseño) -->
<header
	class="flex justify-between items-center w-full px-6 h-16 bg-surface-container border-b border-outline-variant z-50 shrink-0"
>
	<span class="text-2xl font-bold text-primary">DevDays</span>
	<span class="text-xs text-on-surface-variant">{data.user.email}</span>
</header>

<main class="flex flex-1 overflow-hidden">
	<aside
		class="bg-surface-container-low border-r border-outline-variant flex flex-col overflow-hidden w-[260px] shrink-0"
	>
		<DayList
			lessons={data.lessons}
			progreso={data.progreso}
			{currentDay}
			onSelect={(d) => {
				currentDay = d;
				ejercicioActivo = 1;
				feedback = null;
				correctoUltimo = null;
			}}
		/>
	</aside>

	<section class="flex-1 flex flex-col bg-background overflow-y-auto">
		<div class="p-10 max-w-[900px] mx-auto w-full space-y-6">
			<LessonContent
				{lesson}
				correctos={correctosDia}
				{ejercicioActivo}
				onSelectEjercicio={(n) => {
					ejercicioActivo = n as 1 | 2 | 3;
					feedback = null;
					correctoUltimo = null;
				}}
			/>
			<CodeEditor
				bind:this={editorRef}
				value={codigoActual}
				onChange={onChangeCode}
				filename={`dia${currentDay}_ej${ejercicioActivo}.js`}
			/>
			<div class="flex justify-end">
				<Button onclick={corregir} disabled={loading}>
					{loading ? 'Corrigiendo...' : 'Corregir'}
				</Button>
			</div>
		</div>
	</section>

	<aside
		class="w-[28%] min-w-[320px] bg-surface-container border-l border-outline-variant flex flex-col p-6 shrink-0"
	>
		<AiTutor
			{feedback}
			{loading}
			{correctoUltimo}
			{dailyProgressPct}
			{canComplete}
			onComplete={marcarCompletado}
		/>
	</aside>
</main>
```

(Ajusta clases para que la columna izquierda y derecha tengan el mismo aspecto que el HTML del diseño. Usa los iconos `material-symbols-outlined` igual que en el HTML; ya están cargados en el `app.html` global o se cargan en `<svelte:head>` aquí.)

---

## 12. Endpoint de corrección — `src/routes/api/corregir/+server.ts` (nuevo)

```ts
import { json, error } from '@sveltejs/kit';
import { GEMINI_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

const MODEL = 'gemini-2.5-flash';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) throw error(401, 'No autorizado');
	const body = await request.json();
	const { dia, ejercicio, enunciado, codigo } = body as {
		dia: number;
		ejercicio: number;
		enunciado: string;
		codigo: string;
	};

	const prompt = `Eres un profesor estricto pero amable de JavaScript y SvelteKit.
Día ${dia}, Ejercicio ${ejercicio}.
Enunciado: ${enunciado}

Código del alumno:
\`\`\`js
${codigo}
\`\`\`

Tarea: decide si el código cumple el enunciado. Si tiene errores menores de estilo pero la lógica es correcta, considéralo correcto.
Responde con JSON estricto siguiendo el schema.
Sé breve (máximo 4 líneas en feedback). Habla en español, segunda persona.`;

	const res = await fetch(`${ENDPOINT}?key=${GEMINI_API_KEY}`, {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({
			contents: [{ parts: [{ text: prompt }] }],
			generationConfig: {
				responseMimeType: 'application/json',
				responseSchema: {
					type: 'object',
					properties: {
						correcto: { type: 'boolean' },
						feedback: { type: 'string' },
						sugerencia: { type: 'string' }
					},
					required: ['correcto', 'feedback']
				}
			}
		})
	});

	if (!res.ok) {
		return json(
			{ correcto: false, feedback: 'No pude conectar con la IA. Reintenta en unos segundos.' },
			{ status: 200 }
		);
	}

	const data = await res.json();
	const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}';
	try {
		const parsed = JSON.parse(text);
		return json({
			correcto: Boolean(parsed.correcto),
			feedback: String(parsed.feedback ?? ''),
			sugerencia: parsed.sugerencia ?? null
		});
	} catch {
		return json({ correcto: false, feedback: 'Respuesta de la IA no válida. Reintenta.' });
	}
};
```

---

## 13. Action para marcar día completado — `src/routes/estudio/+page.server.ts` (nuevo)

```ts
import { fail, error } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	marcar: async ({ request, locals }) => {
		if (!locals.user) throw error(401, 'No autorizado');
		const fd = await request.formData();
		const dia = Number(fd.get('dia'));
		if (!Number.isInteger(dia) || dia < 1 || dia > 35) return fail(400, { error: 'Día inválido' });
		const { error: dbError } = await locals.supabase
			.from('progreso')
			.upsert(
				{ user_id: locals.user.id, dia, estado: 'completado', fecha: new Date().toISOString() },
				{ onConflict: 'user_id,dia' }
			);
		if (dbError) return fail(500, { error: dbError.message });
		return { ok: true };
	}
};
```

---

## 14. Iconos Material en `/estudio`

El layout raíz **no** carga Material Symbols. Añade en `src/routes/estudio/+layout.svelte` un `<svelte:head>` con:

```svelte
<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
		rel="stylesheet"
	/>
</svelte:head>
```

Asegúrate de que la CSP en `hooks.server.ts` ya permite `fonts.googleapis.com` (sí lo hace: `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`).

---

## 15. Verificación final

1. `npm run check` → 0 errores.
2. `npm run dev`.
3. Ir a `/estudio` → redirige a `/login`.
4. Pedir Magic Link → revisar email → click → vuelve a `/estudio`.
5. Día 1 está activo. Escribir código del ejercicio 1. Pulsar Corregir.
6. Si correcto: feedback verde + tick en ejercicio 1. Repetir 2 y 3.
7. Botón "Marcar día completado" se habilita → click → Día 1 aparece con círculo verde en sidebar.
8. Recargar la página: el progreso persiste (viene de Supabase).

---

## Reglas para el agente ejecutor

- Sigue los todos del frontmatter en orden. **Uno por uno.**
- Tras cada paso que toque código, ejecuta `npm run check` y arregla solo lo de ese archivo.
- **No improvises**: si algo no está en este plan, pregunta.
- **No toques** el layout raíz, `+page.svelte` de la home, ni nada fuera de `src/routes/estudio`, `src/routes/login`, `src/routes/auth`, `src/routes/api/corregir`, `src/lib/components/study`, `src/lib/data`, `src/lib/types`, `src/lib/server/supabase/server-client.ts`, `src/hooks.server.ts`, `src/app.d.ts`, `src/app.css`.
- **No borres** archivos existentes.
- Commit recomendado al terminar cada bloque (A: 1-4, B: 5-8, C: 9-11, D: 12-15).
