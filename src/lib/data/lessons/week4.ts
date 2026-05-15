import type { Leccion } from '$lib/types/lesson';
import { sec, ej } from './_helpers';

export const week4: Leccion[] = [
  {
    dia: 22,
    semana: 4,
    tipo: 'leccion',
    titulo: 'Rutas: el plano de la app',
    objetivo: 'Entender que en SvelteKit las carpetas de src/routes son las URLs, sin configurar un router aparte.',
    contenido: {
      intro: `Hasta ahora piezas Svelte sueltas. Ahora el edificio: cada carpeta bajo src/routes es una habitación con dirección pública. Quieres /contacto → creas contacto/+page.svelte. El sistema lee el disco y arma el mapa de navegación.`,
      secciones: [
        sec(
          'Plano: carpetas y URLs',
          'Como plano de un centro comercial: cada local tiene cartel (página) y a veces mostrador trasero (API).',
          'Organizar la app por URLs sin listar rutas a mano en un archivo gigante.',
          'SvelteKit reconoce convenciones: `+page.svelte` = pantalla visible; `+layout.svelte` = marco compartido; `+server.ts` = endpoint HTTP. Cada carpeta bajo `src/routes` es un tramo de URL. `src/routes/+page.svelte` → `/`. `src/routes/contacto/+page.svelte` → `/contacto`.',
          'src/routes/\n  +page.svelte\n  contacto/\n    +page.svelte',
          [
            'Declare `const rutas` con tres strings: `/`, `/contacto` y `/proyectos`.',
            'Use `console.log(rutas)` para ver el plano en consola.',
            'Compruebe que el array tiene longitud 3.'
          ]
        ),
        sec(
          '+page.svelte: la pantalla',
          'La habitación que el visitante entra: muestra contenido concreto.',
          'Cada URL “final” que el usuario ve (inicio, contacto, lección del día).',
          'Es un componente Svelte normal en `src/routes/<carpeta>/+page.svelte`. Puede recibir datos de `load` en `+page.ts` o `+page.server.ts` y usarlos con `$props()`.',
          '<script lang="ts">\n  let { data } = $props();\n</script>\n<h1>{data.titulo}</h1>',
          [
            'Asigne a `const path` la ruta del archivo `+page.svelte` que responde a `/precios`.',
            'El string debe incluir `precios` y `+page.svelte`.',
            'Muestre `path` con `console.log`.'
          ]
        ),
        sec(
          'Enlaces sin recargar',
          'Pasillos internos del edificio: cambias de sala sin salir al parking y volver a entrar.',
          'Navegación fluida entre páginas del mismo sitio (menús, listas de días, etc.).',
          'Use `<a href="/ruta">` con rutas relativas a su app. SvelteKit intercepta el clic y actualiza solo lo necesario. Puede armar HTML con template literals: `` `<a href="${href}">${label}</a>` ``.',
          '<a href="/estudio">Ir al estudio</a>',
          [
            'Declare `const enlaces` con al menos tres objetos `{ href, label }`.',
            'Construya un `const html` con tres etiquetas `<a>` (plantilla literal).',
            'Escriba `html` en consola con `console.log`.'
          ]
        )
      ],
      resumen: [
        'Carpeta en src/routes ≈ tramo de URL.',
        '+page.svelte = pantalla de esa ruta.',
        '<a href> = ir a otra ruta de la app.',
        'Convención de nombres; no router manual.'
      ]
    },
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
          seccionRef: 'Plano: carpetas y URLs',
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
          seccionRef: '+page.svelte: la pantalla',
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
          seccionRef: 'Enlaces sin recargar',
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
    objetivo: 'Poner header, footer o menú una sola vez y dejar que cada página llene el hueco central.',
    contenido: {
      intro: `Repetir el mismo menú en diez +page.svelte es copiar el marco de la puerta en cada habitación. +layout.svelte es el marco fijo; {@render children?.()} es el hueco donde entra el contenido de la página hija.`,
      secciones: [
        sec(
          'Layout raíz',
          'La fachada del edificio: logo y menú visibles en todas las plantas.',
          'Nav global, tema, toasts, cosas que no quieres duplicar.',
          '`src/routes/+layout.svelte` envuelve todas las rutas hijas. Dentro del HTML llama `{@render children?.()}` donde debe aparecer la página actual. Puede incluir `header` y `nav`.',
          '<header>DevDays</header>\n<main>{@render children?.()}</main>',
          [
            'Asigne a `codigo` un string que incluya `header`, `nav` y `{@render children?.()}`.',
            'Use `console.log(codigo.includes("children"))` para comprobar.',
            'La salida debe ser `true`.'
          ]
        ),
        sec(
          'Layouts anidados',
          'Un piso del edificio con decoración distinta (solo blog, solo admin).',
          'Secciones con chrome diferente sin tocar el layout raíz.',
          '`blog/+layout.svelte` solo envuelve rutas bajo `/blog`. Para `/admin` el archivo vive en `src/routes/admin/+layout.svelte`.',
          'src/routes/admin/+layout.svelte',
          [
            'Asigne a `ubicacion` la ruta del `+layout.svelte` que envuelve solo `/admin`.',
            'El string debe mencionar `admin` y `+layout`.',
            'Muestre el valor con `console.log`.'
          ]
        ),
        sec(
          'Snippet children en Svelte 5',
          'El hueco del marco no es un slot antiguo: es un snippet que renderizas.',
          'Migración mental: layout = componente padre; página = hijo inyectado.',
          'Sintaxis exacta: `{@render children?.()}`. En `+layout.server.ts` o `+layout.ts` puede exportar `load` para datos compartidos (sesión, idioma).',
          '{@render children?.()}',
          [
            'Asigne a `linea` el texto exacto `{@render children?.()}`.',
            'Escriba en consola `linea` con `console.log`.',
            'Compruebe que la salida contiene `render` y `children`.'
          ]
        )
      ],
      resumen: [
        '+layout.svelte = marco repetido.',
        'children = contenido de la ruta hija.',
        'Layouts anidables por carpeta.',
        'load en layout = datos para todo el subárbol.'
      ]
    },
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
          seccionRef: 'Layout raíz',
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
          seccionRef: 'Layouts anidados',
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
          seccionRef: 'Snippet children en Svelte 5',
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
    objetivo: 'Una sola plantilla de página para miles de URLs que solo cambian un trozo (post, producto, día).',
    contenido: {
      intro: `No puedes crear blog/post-1, blog/post-2… a mano. Carpeta [slug] = comodín: /blog/hola → slug vale "hola". Una plantilla, muchas direcciones.`,
      secciones: [
        sec(
          'Carpeta [param]',
          'Etiqueta en el pasillo: “aquí va cualquier nombre de habitación”.',
          'Posts, productos, perfiles, lecciones por id o slug.',
          'El nombre entre corchetes es la clave en `params`: `[slug]` → `params.slug`. Archivo: `blog/[slug]/+page.svelte`. Existen variantes `[[lang]]` y `[...rest]` para casos avanzados.',
          'src/routes/blog/[slug]/+page.svelte',
          [
            'Declare `const slug = "mi-post"`.',
            'Escriba en consola `Post: mi-post` con plantilla literal `` `Post: ${slug}` ``.',
            'La salida debe incluir `mi-post`.'
          ]
        ),
        sec(
          'Leer el parámetro en load',
          'El mozo lee la etiqueta del pasillo antes de abrir la puerta.',
          'Cargar el post correcto desde API o base de datos según la URL.',
          '`export const load = async ({ params }) => { const slug = params.slug; return { slug }; }`. La página usa `data.slug` en el template.',
          'params.slug en +page.ts o +page.server.ts',
          [
            'Asigne a `path` la ruta del `+page.svelte` dinámico para blog con parámetro `slug` (incluya corchetes).',
            'Use `console.log(path)`.',
            'El string debe contener `[slug]` y `+page.svelte`.'
          ]
        ),
        sec(
          'Enlaces a rutas dinámicas',
          'Construyes la dirección con el valor concreto del slug.',
          'Listas de artículos, días del bootcamp, enlaces desde el menú lateral.',
          '`` href={`/blog/${post.slug}`} `` o `const urls = ["/blog/a", "/blog/b"]`. Misma plantilla, distinta URL al hacer clic.',
          '<a href="/blog/intro-js">Intro</a>',
          [
            'Declare `const urls` con `/blog/a` y `/blog/b`.',
            'Escriba en consola `urls.length`.',
            'La salida debe ser `2`.'
          ]
        )
      ],
      resumen: [
        '[nombre] = segmento dinámico de URL.',
        'params en load trae el valor.',
        'Un +page.svelte, muchas URLs.',
        'Enlaces armados con el slug concreto.'
      ]
    },
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
          seccionRef: 'Carpeta [param]',
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
          seccionRef: 'Leer el parámetro en load',
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
          seccionRef: 'Enlaces a rutas dinámicas',
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
    objetivo: 'Usar +page.ts o +page.server.ts para traer datos y pasarlos a la pantalla de forma tipada.',
    contenido: {
      intro: `La página no debería “llegar vacía” y luego rellenarse a ciegas si los datos son públicos en el servidor. load corre antes del render: trae posts, usuario, lección del día y devuelve un objeto data.`,
      secciones: [
        sec(
          'export const load',
          'El mozo va al archivador antes de abrir la tienda.',
          'Fetch, leer fichero, consultar Supabase, preparar props de la página.',
          'En `+page.ts` o `+page.server.ts`: `export const load = async () => { return { titulo: "Hola" }; }`. También puede ser función síncrona: `function load() { return { titulo: "Hola" }; }`. El `return` se fusiona en `data` para el componente.',
          'export const load = async () => ({ titulo: "Hola" });',
          [
            'Defina `function load` que devuelva `{ titulo: "Hola" }`.',
            'Escriba en consola `load().titulo` con `console.log`.',
            'La salida debe ser `Hola`.'
          ]
        ),
        sec(
          'Tipos, $props() y load con params',
          'Etiquetas en las cajas y conexión URL → datos.',
          'Menos errores al usar `data.titulo` en el markup; páginas dinámicas coherentes con la barra de direcciones.',
          '`let { data } = $props()` en `+page.svelte`. `export const load = async ({ params }) => ({ slug: params.slug })`. Para datos async: `await Promise.resolve([1, 2])` dentro de `load`.',
          'let { data }: { data: { titulo: string } } = $props();',
          [
            'Defina `async function load` que haga `await Promise.resolve([1, 2])` y devuelva `{ n: resultado }`.',
            'Tras `load()`, escriba en consola `d.n.length`.',
            'La salida debe ser `2`.'
          ]
        ),
        sec(
          '+page.ts vs +page.server.ts',
          'Universal = puede correr en servidor y en cliente según navegación. Server = solo en el servidor, seguro para secretos.',
          'Claves API, service role de Supabase, lógica que no debe filtrarse al navegador.',
          '`+page.ts`: load visible en ambos entornos (cuidado con secretos). `+page.server.ts`: solo servidor; ideal para cookies, sesión, API keys. En DevDays el estudio usa server load para auth y progreso.',
          '+page.server.ts → load con cookies y Supabase',
          [
            'Asigne a `respuesta` una frase que explique la diferencia y cuál usar para API keys.',
            'Escriba en consola `respuesta`.',
            'El texto debe mencionar servidor o `+page.server.ts`.'
          ]
        )
      ],
      resumen: [
        'load = preparar data antes de la UI.',
        'return → objeto data en la página.',
        'server = secretos y sesión.',
        'params conectan URL y fetch.'
      ]
    },
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
          seccionRef: 'export const load',
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
          seccionRef: 'Tipos, $props() y load con params',
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
          seccionRef: '+page.ts vs +page.server.ts',
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
    objetivo: 'Procesar POST en +page.server.ts con actions, validar y devolver éxito o error sin exponer lógica al cliente.',
    contenido: {
      intro: `Un formulario HTML puede apuntar a una action del servidor: como dejar una nota en el almacén tras el mostrador. El navegador envía; SvelteKit ejecuta tu función en +page.server.ts y puede devolver datos o fail.`,
      secciones: [
        sec(
          'export const actions',
          'Buzón del almacén: cada nombre de action es un cajón distinto.',
          'Login, contacto, guardar progreso, borrar fila — lógica que debe correr en servidor.',
          'En `+page.server.ts`: `export const actions = { default: async ({ request }) => { const fd = await request.formData(); ... } }`. En el form: `<form method="POST">` o `action="?/nombreAction"`.',
          'export const actions = { default: async ({ request }) => ({ ok: true }) };',
          [
            'Escriba un comentario de una línea que explique qué hace una action en SvelteKit.',
            'El comentario debe mencionar servidor o POST.',
            'No hace falta código ejecutable más allá del comentario.'
          ]
        ),
        sec(
          'fail y FormData',
          'Si falta el email, devuelves error 400 con mensaje; lees campos del sobre.',
          'Validación y feedback al usuario (errores de campo, toast).',
          '`import { fail } from "@sveltejs/kit"`. `return fail(400, { error: "Email vacío" })`. `const fd = await request.formData(); const email = fd.get("email")?.toString() ?? ""`. Función `validar(email)` puede devolver `"ok"` o `"fail"`.',
          'return fail(400, { mensaje: "Revisa el formulario" });',
          [
            'Defina `function validar(email)`: si está vacío devuelve `"fail"`, si no `"ok"`.',
            'Pruebe con `""` y escriba en consola el resultado con `console.log`.',
            'La salida debe ser `fail`.'
          ]
        ),
        sec(
          'use:enhance',
          'El formulario sigue yendo al servidor, pero la página no parpadea como recarga completa de los 90.',
          'Mejor UX: spinner, mantener scroll, actualizar solo lo necesario.',
          '`import { enhance } from "$app/forms"`. `<form method="POST" use:enhance>`. Progresivo: sin JS sigue funcionando el POST clásico.',
          '<form method="POST" use:enhance>',
          [
            'Asigne a `respuesta` una frase sobre qué mejora `use:enhance` (evitar recarga brusca).',
            'Escriba en consola `respuesta`.',
            'Mencione UX, recarga o experiencia de usuario.'
          ]
        )
      ],
      resumen: [
        'actions = funciones POST en servidor.',
        'fail = error con código HTTP.',
        'use:enhance = UX moderna.',
        'formData = campos del formulario.'
      ]
    },
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
          seccionRef: 'export const actions',
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
          seccionRef: 'fail y FormData',
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
          seccionRef: 'use:enhance',
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
    objetivo: 'Conectar SvelteKit con Postgres + autenticación como en DevDays (magic link, progreso, RLS).',
    contenido: {
      intro: `Supabase es Postgres en la nube con auth y APIs listas. En este portal: magic link por email, callback que cambia code por sesión, tabla de progreso. Cliente con URL pública y anon key; reglas RLS en la base.`,
      secciones: [
        sec(
          'Cliente createClient',
          'Llave de la recepción: entra a zonas permitidas, no al almacén privado completo.',
          'Leer y escribir filas desde el navegador o el servidor con las mismas reglas.',
          '`const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)`. Consultas: `await supabase.from("progreso").select("*").eq("user_id", id)`. En servidor SSR usa cookies (`@supabase/ssr`).',
          'const supabase = createClient(url, anonKey);\nsupabase.from("progreso").select("dia, estado")',
          [
            'Escriba un comentario que explique qué devuelve `supabase.from("tabla").select()`.',
            'El comentario debe mencionar filas o lectura de datos.',
            'No requiere ejecutar Supabase real.'
          ]
        ),
        sec(
          'Auth: magic link (OTP)',
          'Te mandan un enlace mágico al correo; un clic y la sesión queda abierta.',
          'Login sin contraseña nueva que recordar — igual que /login en DevDays.',
          '`await supabase.auth.signInWithOtp({ email: "tu@mail.com" })`. El usuario abre el enlace → `/auth/callback` intercambia el code por sesión.',
          'await supabase.auth.signInWithOtp({ email: "tu@mail.com" })',
          [
            'Asigne a `respuesta` una frase que explique el magic link (email con enlace para entrar).',
            'Escriba en consola `respuesta`.',
            'Debe mencionar email o enlace.'
          ]
        ),
        sec(
          'RLS (Row Level Security)',
          'Cada fila lleva permiso: “solo el dueño puede leer su progreso”.',
          'Seguridad en la base aunque alguien tenga la anon key en el navegador.',
          'Políticas SQL: `auth.uid() = user_id` en SELECT/INSERT. Sin RLS, la anon key sería demasiado poderosa.',
          'POLICY "solo mi progreso" ON progreso FOR SELECT USING (auth.uid() = user_id);',
          [
            'Asigne a `respuesta` una frase sobre por qué hace falta RLS con la anon key en el navegador.',
            'Escriba en consola `respuesta`.',
            'Mencione seguridad, permisos o “solo sus filas”.'
          ]
        )
      ],
      resumen: [
        'Supabase = Postgres + auth + API.',
        'from/select = leer tablas.',
        'OTP = magic link por email.',
        'RLS = permisos por fila.'
      ]
    },
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
          seccionRef: 'Cliente createClient',
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
          seccionRef: 'Auth: magic link (OTP)',
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
          seccionRef: 'RLS (Row Level Security)',
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
    titulo: 'Repaso Semana 4: SvelteKit y datos',
    objetivo: 'Demostrar que entiendes rutas, layouts, dinámicas, load, forms y Supabase a nivel concepto (la IA mira el efecto, no la sintaxis perfecta).',
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
