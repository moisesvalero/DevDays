import type { Leccion } from '$lib/types/lesson';
import { ej, contenidoLab } from './_helpers';

export const week4: Leccion[] = [
	{
		dia: 22,
		semana: 4,
		tipo: 'leccion',
		titulo: 'Rutas: el plano de la app',
		objetivo:
			'Entender que en SvelteKit las carpetas de src/routes son las URLs, sin configurar un router aparte.',
		contenido: contenidoLab('dia-22-rutas', 'Laboratorio: mapa de rutas de la app.', [
			'Navegación',
			'Link activo',
			'404'
		]),
		ejercicios: [
			ej(
				1,
				'Plano del sitio pequeño',
				{
					planteamiento:
						'En SvelteKit, la estructura de carpetas bajo `src/routes` define el mapa de URLs de la aplicación. Se solicita representar en memoria el plano de un sitio pequeño.',
					requisitos: [
						'Declare el array `rutas` con tres strings: `/`, `/contacto` y `/proyectos`.',
						'Escriba en consola el array con `console.log`.'
					],
					salidaEsperada: 'Un array de 3 URLs que incluye la raíz y dos rutas adicionales.',
					seccionRef: 'Navegación',
					notas: 'Véase la sección «Plano: carpetas y URLs» y el ejemplo de árbol de carpetas.'
				},
				['rutas es array', 'length 3 o tres strings correctos'],
				`// Día 22 — Plano del sitio\nconst rutas = [];\nconsole.log(rutas);\n`
			),
			ej(
				2,
				'¿Dónde vive la página de precios?',
				{
					planteamiento:
						'Cada URL pública corresponde a un archivo `+page.svelte` dentro de `src/routes`. Se pide identificar la ubicación del archivo que atiende una ruta concreta.',
					requisitos: [
						'Asigne a la variable `path` la ruta del archivo `+page.svelte` que responde a la URL `/precios` (desde `src/routes`).',
						'Escriba en consola el valor de `path`.'
					],
					salidaEsperada: 'Un string que menciona `precios` y `+page.svelte`.',
					seccionRef: 'Link activo',
					notas: 'La convención está explicada en «+page.svelte: la pantalla».'
				},
				['String con routes/precios y +page'],
				`// Archivo que responde a /precios\nconst path = '';\nconsole.log(path);\n`
			),
			ej(
				3,
				'Menú de navegación',
				{
					planteamiento:
						'Los menús de navegación enlazan rutas internas mediante etiquetas `<a href="/ruta">`. Se solicita modelar un menú mínimo y generar su marcado HTML.',
					requisitos: [
						'Declare el array `enlaces` con al menos tres objetos `{ href, label }`.',
						'Construya un string `html` con tres etiquetas `<a>` (puede usar plantilla literal).',
						'Escriba en consola el string resultante.'
					],
					salidaEsperada: 'Tres enlaces con `href` y `label`; el markup incluye `<a href=`.',
					seccionRef: '404',
					notas: 'Use template literals como en el ejemplo de «Enlaces sin recargar».'
				},
				['Array 3 elementos', 'String con etiquetas a'],
				`const enlaces = [\n  { href: '/', label: 'Inicio' }\n];\nconst html = '';\nconsole.log(html);\n`
			)
		]
	},
	{
		dia: 23,
		semana: 4,
		tipo: 'leccion',
		titulo: 'Layouts: marco común',
		objetivo:
			'Poner header, footer o menú una sola vez y dejar que cada página llene el hueco central.',
		contenido: contenidoLab('dia-23-layouts', 'Laboratorio: layouts y slots.', [
			'Shell',
			'Slot principal',
			'Layout anidado'
		]),
		ejercicios: [
			ej(
				1,
				'Bosquejo de layout',
				{
					planteamiento:
						'El archivo `+layout.svelte` define el marco compartido de un conjunto de rutas. Se solicita bosquejar su estructura mínima en un string.',
					requisitos: [
						'Asigne a `codigo` un string que incluya la palabra `header`, un `nav` y la línea de renderizado de children.',
						'Escriba en consola si `codigo` incluye la cadena `"children"`.'
					],
					salidaEsperada: 'Un string con `header` y `children`; la comprobación devuelve `true`.',
					seccionRef: 'Shell',
					notas: 'Copie el patrón del ejemplo en «Layout raíz».'
				},
				['codigo incluye header', 'codigo incluye render o children'],
				`const codigo = \`...\`;\nconsole.log(codigo.includes('children'));\n`
			),
			ej(
				2,
				'Layout solo para administración',
				{
					planteamiento:
						'Los layouts pueden anidarse por carpeta: un `+layout.svelte` dentro de `admin/` solo envuelve las rutas bajo `/admin`.',
					requisitos: [
						'Asigne a `ubicacion` la ruta del archivo `+layout.svelte` que envuelve únicamente `/admin`.',
						'Escriba en consola el valor.'
					],
					salidaEsperada: 'Un string que menciona `admin` y `+layout`.',
					seccionRef: 'Slot principal',
					notas: 'Véase el ejemplo de ruta en «Layouts anidados».'
				},
				['String routes/admin o src/routes/admin con layout'],
				`const ubicacion = '';\nconsole.log(ubicacion);\n`
			),
			ej(
				3,
				'La línea clave',
				{
					planteamiento:
						'En Svelte 5, el contenido de la página hija se inserta en el layout mediante el snippet `children`. Se pide registrar la sintaxis exacta.',
					requisitos: [
						'Asigne a `linea` el texto exacto `{@render children?.()}`.',
						'Escriba en consola el valor de `linea`.'
					],
					salidaEsperada: '`{@render children?.()}` impreso en consola.',
					seccionRef: 'Layout anidado',
					notas: 'La sintaxis exacta está en «Snippet children en Svelte 5».'
				},
				['linea coincide con render children'],
				`const linea = '{@render children?.()}';\nconsole.log(linea);\n`
			)
		]
	},
	{
		dia: 24,
		semana: 4,
		tipo: 'leccion',
		titulo: 'Rutas dinámicas [slug]',
		objetivo:
			'Una sola plantilla de página para miles de URLs que solo cambian un trozo (post, producto, día).',
		contenido: contenidoLab('dia-24-dinamicas', 'Laboratorio: rutas dinámicas [slug].', [
			'Lista → detalle',
			'params.slug',
			'404 producto'
		]),
		ejercicios: [
			ej(
				1,
				'Título del post',
				{
					planteamiento:
						'En una ruta dinámica `[slug]`, el parámetro de URL identifica el recurso (por ejemplo, un post del blog). Se solicita simular ese valor y formatear un título.',
					requisitos: [
						'Declare `slug` con el valor `"mi-post"`.',
						'Escriba en consola un mensaje `Post: mi-post` usando plantilla literal o concatenación.'
					],
					salidaEsperada: 'Salida que incluye `mi-post`.',
					seccionRef: 'Lista → detalle',
					notas: 'Use `const` y template literals como en «Carpeta [param]».'
				},
				['Usa slug en el mensaje', 'Texto Post: mi-post o equivalente'],
				`const slug = 'mi-post';\nconsole.log(\`Post: \${slug}\`);\n`
			),
			ej(
				2,
				'Ruta del archivo plantilla',
				{
					planteamiento:
						'Una sola plantilla `+page.svelte` dentro de `[slug]` atiende infinitas URLs del tipo `/blog/<slug>`. Se pide ubicar ese archivo en el árbol del proyecto.',
					requisitos: [
						'Asigne a `path` la ruta del `+page.svelte` dinámico para blog con parámetro `slug` (incluya corchetes).',
						'Escriba en consola `path`.'
					],
					salidaEsperada: 'Un string que contiene `[slug]` y `+page.svelte`.',
					seccionRef: 'params.slug',
					notas: 'La ruta del archivo está en el ejemplo de «Leer el parámetro en load».'
				},
				['String blog/[slug]/+page o src/routes/blog/[slug]/+page.svelte'],
				`const path = 'src/routes/blog/[slug]/+page.svelte';\nconsole.log(path);\n`
			),
			ej(
				3,
				'Dos URLs, mismo patrón',
				{
					planteamiento:
						'Dos URLs que comparten el prefijo `/blog/` siguen el mismo patrón de ruta dinámica con distinto valor de `slug`.',
					requisitos: [
						'Declare el array `urls` con los strings `/blog/a` y `/blog/b`.',
						'Escriba en consola la propiedad `length` del array.'
					],
					salidaEsperada: 'El número `2` en consola.',
					seccionRef: '404 producto',
					notas: 'Véase el array de ejemplo en «Enlaces a rutas dinámicas».'
				},
				['Array dos elementos', 'Mismo prefijo /blog/'],
				`const urls = ['/blog/a', '/blog/b'];\nconsole.log(urls.length);\n`
			)
		]
	},
	{
		dia: 25,
		semana: 4,
		tipo: 'leccion',
		titulo: 'load: datos antes de pintar',
		objetivo:
			'Usar +page.ts o +page.server.ts para traer datos y pasarlos a la pantalla de forma tipada.',
		contenido: contenidoLab('dia-25-load', 'Laboratorio: load antes de pintar.', [
			'load function',
			'Skeleton',
			'$props data'
		]),
		ejercicios: [
			ej(
				1,
				'Load simulado',
				{
					planteamiento:
						'La función `load` en SvelteKit prepara datos antes de renderizar la página. Se solicita una implementación síncrona mínima.',
					requisitos: [
						'Defina la función `load` que devuelva `{ titulo: "Hola" }`.',
						'Escriba en consola `load().titulo`.'
					],
					salidaEsperada: '`Hola` en consola.',
					seccionRef: 'load function',
					notas: 'Patrón de `return` en «export const load».'
				},
				['load devuelve objeto con titulo', 'Salida Hola'],
				`function load() {\n  return { titulo: 'Hola' };\n}\nconsole.log(load().titulo);\n`
			),
			ej(
				2,
				'Load async',
				{
					planteamiento:
						'Muchas cargas reales son asíncronas (fetch, base de datos). Se pide simular un `load` que resuelve una promesa.',
					requisitos: [
						'Defina `async function load` que haga `await Promise.resolve([1, 2])` y devuelva `{ n: resultado }`.',
						'Escriba en consola la longitud del array en `n` tras ejecutar `load()`.'
					],
					salidaEsperada: '`2` (array de dos elementos).',
					seccionRef: 'Skeleton',
					notas: 'Use `async`/`await` como en «Tipos, $props() y load con params».'
				},
				['async/await', 'n con dos elementos'],
				`async function load() {\n  return { n: await Promise.resolve([1, 2]) };\n}\nload().then((d) => console.log(d.n.length));\n`
			),
			ej(
				3,
				'¿Dónde van los secretos?',
				{
					planteamiento:
						'SvelteKit distingue entre `+page.ts` y `+page.server.ts` según dónde puede ejecutarse el código y qué datos puede ver el cliente.',
					requisitos: [
						'Asigne a `respuesta` una frase que explique la diferencia y cuál usar para API keys.',
						'Escriba en consola `respuesta`.'
					],
					salidaEsperada: 'Texto que menciona servidor o secretos en `+page.server.ts`.',
					seccionRef: '$props data',
					notas: 'Compare ambos archivos en la sección homónima.'
				},
				['Texto que ubica secretos en server'],
				`const respuesta = \`...\`;\nconsole.log(respuesta);\n`
			)
		]
	},
	{
		dia: 26,
		semana: 4,
		tipo: 'leccion',
		titulo: 'Form actions: enviar al servidor',
		objetivo:
			'Procesar POST en +page.server.ts con actions, validar y devolver éxito o error sin exponer lógica al cliente.',
		contenido: contenidoLab('dia-26-forms', 'Laboratorio: form actions.', [
			'POST action',
			'Validación',
			'Progressive'
		]),
		ejercicios: [
			ej(
				1,
				'Para qué sirve una action',
				{
					planteamiento:
						'Las form actions de SvelteKit procesan envíos POST en el servidor sin exponer la lógica al cliente.',
					requisitos: [
						'Escriba un comentario de una línea que explique qué hace una action de formulario en SvelteKit.'
					],
					salidaEsperada: 'Comentario que menciona servidor o procesar el formulario.',
					seccionRef: 'POST action',
					notas: 'Véase el bloque `export const actions` en la sección homónima.'
				},
				['Comentario con idea de POST/servidor'],
				`// Una action en +page.server.ts...\n\n`
			),
			ej(
				2,
				'Validar email',
				{
					planteamiento:
						'Antes de persistir datos, las actions suelen validar los campos recibidos. Se solicita una función de validación mínima.',
					requisitos: [
						'Defina `validar(email)`: si está vacío devuelve `"fail"`, si no `"ok"`.',
						'Pruebe con `""` y escriba en consola el resultado.'
					],
					salidaEsperada: '`fail` al validar cadena vacía.',
					seccionRef: 'Validación',
					notas: 'Patrón condicional como en «fail y FormData».'
				},
				['Condicional email vacío', 'Salida fail'],
				`function validar(email) {\n  return email ? 'ok' : 'fail';\n}\nconsole.log(validar(''));\n`
			),
			ej(
				3,
				'¿Qué mejora enhance?',
				{
					planteamiento:
						'La directiva `use:enhance` de `$app/forms` mejora la experiencia de envío de formularios.',
					requisitos: [
						'Asigne a `respuesta` una frase sobre qué mejora `use:enhance` (por ejemplo, evitar recarga brusca).',
						'Escriba en consola `respuesta`.'
					],
					salidaEsperada: 'Menciona recarga, UX o experiencia de usuario.',
					seccionRef: 'Progressive',
					notas: 'Consulte el ejemplo `<form method="POST" use:enhance>`.'
				},
				['Texto sobre enhance/UX'],
				`const respuesta = \`...\`;\nconsole.log(respuesta);\n`
			)
		]
	},
	{
		dia: 27,
		semana: 4,
		tipo: 'leccion',
		titulo: 'Supabase: base de datos y auth',
		objetivo:
			'Conectar SvelteKit con Postgres + autenticación como en DevDays (magic link, progreso, RLS).',
		contenido: contenidoLab('dia-27-supabase', 'Laboratorio: auth y datos Supabase.', [
			'Login',
			'Query',
			'RLS'
		]),
		ejercicios: [
			ej(
				1,
				'Qué hace .select()',
				{
					planteamiento:
						'El cliente de Supabase encadena métodos para consultar tablas de Postgres.',
					requisitos: [
						'Escriba un comentario que explique qué devuelve `supabase.from("tabla").select()`.'
					],
					salidaEsperada: 'Comentario que menciona filas o lectura de datos.',
					seccionRef: 'Login',
					notas: 'Véase `createClient` y las consultas en «Cliente createClient».'
				},
				['Idea de lectura de tabla'],
				`// supabase.from('progreso').select()\n// → ...\n\n`
			),
			ej(
				2,
				'Magic link en una frase',
				{
					planteamiento:
						'DevDays usa autenticación por magic link (OTP por email) en lugar de contraseña.',
					requisitos: [
						'Asigne a `respuesta` una frase que explique el magic link (email con enlace para entrar).',
						'Escriba en consola `respuesta`.'
					],
					salidaEsperada: 'Menciona email o enlace.',
					seccionRef: 'Query',
					notas: 'Véase `signInWithOtp` en «Auth: magic link (OTP)».'
				},
				['Texto coherente con OTP/magic link'],
				`const respuesta = \`...\`;\nconsole.log(respuesta);\n`
			),
			ej(
				3,
				'¿Por qué RLS?',
				{
					planteamiento:
						'La anon key de Supabase está visible en el cliente; Row Level Security limita qué filas puede leer o escribir cada usuario.',
					requisitos: [
						'Asigne a `respuesta` una frase sobre por qué hace falta RLS con la anon key en el navegador.',
						'Escriba en consola `respuesta`.'
					],
					salidaEsperada: 'Menciona seguridad, permisos o que solo ve sus propias filas.',
					seccionRef: 'RLS',
					notas: 'Lea el ejemplo de política SQL en «RLS (Row Level Security)».'
				},
				['Texto sobre restricción por usuario'],
				`const respuesta = \`...\`;\nconsole.log(respuesta);\n`
			)
		]
	},
	{
		dia: 28,
		semana: 4,
		tipo: 'examen',
		repasoVisual: 'repaso-s4',
		titulo: 'Repaso Semana 4: SvelteKit y datos',
		objetivo:
			'Demostrar que entiendes rutas, layouts, dinámicas, load, forms y Supabase a nivel concepto (la IA mira el efecto, no la sintaxis perfecta).',
		instrucciones: `Cinco retos cortos. Puedes usar comentarios, strings o código mínimo. Ir a otro día no depende de aprobar esto.`,
		ejercicios: [
			ej(
				1,
				'Plano rápido',
				{
					planteamiento:
						'Repaso de la semana: represente en memoria un mapa de rutas de una aplicación SvelteKit.',
					requisitos: [
						'Declare el array `rutas` con `/`, `/about` y una tercera ruta que usted invente.',
						'Escriba en consola el array.'
					],
					salidaEsperada: 'Al menos 3 strings que empiezan por `/`.',
					seccionRef: 'Repaso semana 4',
					notas: 'Repaso días 22-23: carpetas en `src/routes` y convención `+page.svelte`.'
				},
				['Array 3 urls'],
				`const rutas = ['/', '/about'];\nconsole.log(rutas);\n`
			),
			ej(
				2,
				'Hueco del layout',
				{
					planteamiento:
						'Repaso: en un layout de Svelte 5, una línea concreta inyecta el contenido de la página hija.',
					requisitos: ['Escriba en consola la línea exacta `{@render children?.()}`.'],
					salidaEsperada: 'Salida que contiene `render` y `children`.',
					seccionRef: 'Repaso semana 4',
					notas: 'Repaso día 23: snippet `children` en `+layout.svelte`.'
				},
				['String o log con render children'],
				`console.log('{@render children?.()}');\n`
			),
			ej(
				3,
				'Post dinámico',
				{
					planteamiento:
						'Repaso: formatee un mensaje de artículo usando un valor de slug dinámico.',
					requisitos: [
						'Declare `s` con valor `"intro-kit"`.',
						'Escriba en consola un mensaje tipo `Artículo: intro-kit`.'
					],
					salidaEsperada: 'Salida que incluye `intro-kit`.',
					seccionRef: 'Repaso semana 4',
					notas: 'Repaso día 24: rutas `[slug]` y template literals.'
				},
				['Template o texto con s'],
				`const s = 'intro-kit';\nconsole.log(\`Artículo: \${s}\`);\n`
			),
			ej(
				4,
				'Data de load',
				{
					planteamiento:
						'Repaso: el valor devuelto por `load` se expone como `data` en el componente de página.',
					requisitos: [
						'Cree un objeto `{ ok: true }` y escríbalo en consola (simula el return de `load`).'
					],
					salidaEsperada: 'Objeto con `ok: true` visible en consola.',
					seccionRef: 'Repaso semana 4',
					notas: 'Repaso día 25: función `load` y objeto devuelto.'
				},
				['Objeto con ok true'],
				`console.log({ ok: true });\n`
			),
			ej(
				5,
				'Auth en una frase',
				{
					planteamiento: 'Repaso: describa en una frase el mecanismo de login por magic link.',
					requisitos: [
						'Asigne a `r` una frase sobre magic link por email (o equivalente).',
						'Escriba en consola `r`.'
					],
					salidaEsperada: 'Menciona email o enlace mágico.',
					seccionRef: 'Repaso semana 4',
					notas: 'Repaso días 26-27: form actions en servidor y Supabase OTP.'
				},
				['Texto sobre magic link'],
				`const r = \`magic link por email\`;\nconsole.log(r);\n`
			)
		]
	}
];
