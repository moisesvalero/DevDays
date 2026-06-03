# DevDays - Mi bootcamp interno para dejar de copiar y empezar a entender

**🇪🇸 Español** · [🇬🇧 English](./README.en.md)

> Llevo años haciendo webs con WordPress. Ahora estoy haciendo el salto al desarrollo moderno (SvelteKit, TypeScript, Supabase) y aprendiendo a sacar partido a la IA en mi día a día.
> Pero hay una cosa que tengo clara: **no quiero depender de la IA. Quiero entender lo que hago.**

Así que me he montado mi propio bootcamp interno: una plataforma de **35 días** que combina lecciones, ejercicios prácticos y un tutor IA que me corrige el código. Cada día estudio un tema, lo programo, el tutor lo revisa, y solo avanzo cuando demuestro que lo he entendido. Al final de cada semana hay un **examen con bloqueo**: si no apruebo, no paso al siguiente bloque.

El stack es el mismo que estoy aprendiendo:

- **SvelteKit 5** con runes (`$state`, `$derived`, `$effect`, `$props`)
- **TypeScript** estricto en todo el código
- **Supabase** para auth (Magic Link) y base de datos
- **Tailwind CSS v4** + tokens Material 3
- **CodeMirror 6** como editor real con resaltado de sintaxis
- **OpenAI + Gemini** con failover automático cuando uno falla

Cuando termine los 35 días, el plan es volver a leer el código línea a línea y refactorizar lo que toque, ya entendiendo qué hace cada parte. Y empezar a buscar curro de frontend.

📫 **Si quieres hablar de proyectos o vacantes:** [info@moisesvalero.es](mailto:info@moisesvalero.es) · 🌐 [moisesvalero.es](https://moisesvalero.es)

---

## Captura

![DevDays — Día 15: ¿Qué es Svelte/SvelteKit?](./docs/screenshot.png)

Las tres columnas en acción: lista de días con soft-lock semanal a la izquierda, lección con bloques de código resaltados en el centro, y el tutor IA esperando código a la derecha.

---

## Qué hace la app

Un portal interactivo de **3 columnas**:

| Columna       | Contenido                                                                                                                                                         |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Izquierda** | Los 35 días en círculos (gris = pendiente, verde = completado). Soft-lock por semana si no apruebas el examen anterior.                                           |
| **Centro**    | Explicación estructurada del día (intro, secciones, ejemplos, callouts, resumen) + ejercicios numerados + editor CodeMirror con tema oscuro.                      |
| **Derecha**   | Respuesta del tutor IA tras pulsar **Corregir**. Da pistas, snippets de código y solo desbloquea el botón "Marcar día completado" cuando el código está correcto. |

### El meta-loop divertido

La plataforma la construí yo, y ahora la **uso para aprender lo que usé para construirla**.

### Reglas de progresión

- **Lecciones (días 1–6, 8–13, …):** 3 ejercicios por día. Hay que aprobar **los 3** para avanzar.
- **Exámenes (días 7, 14, 21, 28, 35):** 5 ejercicios. Hay que aprobar **al menos 4 de 5** para "Aprobar examen".
- El alumno **nunca** decide si está correcto. Solo el endpoint `/api/corregir` puede marcar un ejercicio como aprobado.

---

## Arquitectura en una imagen mental

```
Browser
   │
   ├─ /estudio  (3 columnas, CodeMirror, AskTutorDialog)
   │     │
   │     │  POST /api/corregir       ┌────────────┐
   │     ├──────────────────────────▶│ AI Orquesta│──▶ OpenAI ─┐
   │     │  POST /api/preguntar      │  (ai.ts)   │           │ fallback
   │     ├──────────────────────────▶│            │──▶ Gemini ◀┘
   │     │                           └────────────┘
   │     │
   │     └─ Supabase  (auth Magic Link + tabla `progreso`)
   │
   └─ hooks.server.ts  → guard de auth + cabeceras de seguridad (CSP, HSTS, etc.)
```

### Decisiones de diseño que merecen ser destacadas

1. **El alumno no puede saltarse temas.** El `correcto: true` solo viene del servidor. Si manipulas el cliente, no avanzas.
2. **Email allowlist.** El portal es personal. `ALLOWED_EMAILS` separa amigos vs. internet.
3. **Failover de IA.** Si OpenAI falla, el orquestador `src/lib/server/ai.ts` cae a Gemini con backoff exponencial. Si las dos fallan, el front muestra un error claro y dejas reintentar.
4. **Cabeceras de seguridad.** `hooks.server.ts` añade CSP, HSTS, Permissions-Policy, X-Frame-Options, etc. No es la app más segura del mundo, pero no es el típico starter con todo abierto.
5. **Forzar dark mode en el editor y login.** Es una app de estudio: cero distracciones.
6. **Tipos discriminados.** `Leccion = LeccionNormal | LeccionExamen`. El editor sabe en cada momento si renderiza 3 o 5 ejercicios y qué texto pinta. Sin `any`, sin `as`.

---

## Stack completo

| Capa             | Tecnología                                                                    |
| ---------------- | ----------------------------------------------------------------------------- |
| Framework        | SvelteKit 2 + Svelte 5 (runes)                                                |
| Lenguaje         | TypeScript estricto                                                           |
| Estilos          | Tailwind CSS v4 + variables Material Design 3                                 |
| UI               | shadcn-svelte (button, card, dialog, input, label, textarea, sonner, spinner) |
| Editor           | CodeMirror 6 con tema One Dark y `@codemirror/lang-javascript`                |
| Auth + DB        | Supabase (`@supabase/ssr` + Magic Link)                                       |
| IA               | OpenAI (`gpt-5.4-mini`) + Gemini (`gemini-2.5-flash`) con failover            |
| Resaltado código | highlight.js para los bloques de las lecciones                                |
| Despliegue       | Vercel (`@sveltejs/adapter-vercel`)                                           |
| Calidad          | ESLint, Prettier, svelte-check, Vitest                                        |

---

## Cómo correrlo en local

Requisitos: **Node 22+**.

```bash
git clone <este-repo>
cd DevDays
npm install
cp .env.example .env
# Edita .env con tus claves de Supabase y al menos una clave de IA
npm run dev
```

Abre `http://localhost:5173`. Te redirige a `/estudio`, te pide login con Magic Link, y a estudiar.

### Tabla `progreso` en Supabase

```sql
create table progreso (
  user_id uuid references auth.users on delete cascade,
  dia int not null,
  estado text not null default 'completado',
  fecha timestamptz not null default now(),
  primary key (user_id, dia)
);

alter table progreso enable row level security;

create policy "own progress read" on progreso
  for select using (auth.uid() = user_id);

create policy "own progress insert" on progreso
  for insert with check (auth.uid() = user_id);
```

### Despliegue

Mira `DEPLOY.md` para el checklist completo (variables de entorno, redirect URLs de Supabase, etc.).

---

## Estructura del repo

```
src/
├─ app.css                     Tailwind v4 + tokens Material 3
├─ app.html
├─ hooks.server.ts             Auth + cabeceras de seguridad
├─ lib/
│  ├─ components/
│  │  ├─ study/                DayList, LessonContent, CodeEditor, AiTutor, AskTutorDialog, CodeBlock, Callout
│  │  ├─ ui/                   shadcn-svelte (button, card, dialog, input, ...)
│  │  └─ ToastContainer.svelte
│  ├─ data/lessons.ts          Las 35 lecciones hardcodeadas
│  ├─ types/lesson.ts          LeccionNormal | LeccionExamen
│  ├─ server/
│  │  ├─ ai.ts                 Orquestador OpenAI → Gemini
│  │  ├─ openai.ts             OpenAI con JSON schema
│  │  ├─ gemini.ts             Gemini con reintentos exponenciales
│  │  ├─ allowlist.ts          Whitelist de emails
│  │  └─ supabase/             Cliente SSR de Supabase
│  ├─ i18n/                    Base mínima para idioma de la cookie
│  └─ stores/toast.ts
└─ routes/
   ├─ +layout.svelte           ModeWatcher + Toaster
   ├─ +page.ts                 Redirect a /estudio
   ├─ login/                   Login con Magic Link
   ├─ auth/callback/           Intercambio code → sesión
   ├─ estudio/                 Portal con guard de auth
   └─ api/
      ├─ corregir/             Corrección IA
      ├─ preguntar/            Chat libre con el tutor
      └─ locale/               Cookie de idioma
```

---

## Roadmap

- [x] 35 días de curriculum con 5 exámenes
- [x] Corrección IA con failover OpenAI/Gemini
- [x] Allowlist por email
- [x] Magic Link + RLS en Supabase
- [x] Dark/Light mode (editor y login siempre oscuros)
- [ ] Terminar los 35 días en primera persona
- [ ] Refactor línea a línea entendiendo qué hace cada parte
- [ ] Empezar a buscar curro de frontend

---

## Por qué este proyecto vale más que un curso de Udemy

Porque cuando termine, **el código de la plataforma seré yo quien lo refactorice y lo explique**. No es un tutorial que copié. Es un sistema en producción que mezcla auth, base de datos, dos proveedores de IA, soft-lock por semana, y tipos discriminados en TypeScript. Y ahora mismo lo estoy usando, todos los días, para aprender lo que aún no domino.

Si te interesa hablar de proyectos o vacantes de frontend, escríbeme a [info@moisesvalero.es](mailto:info@moisesvalero.es) o pásate por [moisesvalero.es](https://moisesvalero.es).
