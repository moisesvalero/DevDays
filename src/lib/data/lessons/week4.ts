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
          'Archivos que definen pantallas y APIs',
          'Como plano de un centro comercial: cada local tiene cartel (página) y a veces mostrador trasero (API).',
          'Organizar la app por URLs sin listar rutas a mano en un archivo gigante.',
          'SvelteKit reconoce convenciones: +page.svelte = pantalla visible; +layout.svelte = marco compartido; +server.ts = endpoint HTTP en esa ruta.',
          'src/routes/about/+page.svelte → URL /about'
        ),
        sec(
          '+page.svelte: la pantalla',
          'La habitación que el visitante entra: muestra contenido concreto.',
          'Cada URL “final” que el usuario ve (inicio, contacto, lección del día).',
          'Es un componente Svelte normal. Puede recibir datos de una función load en +page.ts o +page.server.ts y usarlos con $props().',
          '<script lang="ts">\n  let { data } = $props();\n</script>\n<h1>{data.titulo}</h1>'
        ),
        sec(
          'Enlaces sin recargar toda la web',
          'Pasillos internos del edificio: cambias de sala sin salir al parking y volver a entrar.',
          'Navegación fluida entre páginas del mismo sitio (menús, listas de días, etc.).',
          'Usa <a href="/ruta"> con rutas relativas a tu app. SvelteKit intercepta el clic y actualiza solo lo necesario (navegación del lado cliente).',
          '<a href="/estudio">Ir al estudio</a>'
        ),
        sec(
          'Estructura típica de carpetas',
          'Cada carpeta = un tramo de dirección; subcarpetas = rutas anidadas.',
          'Proyectos reales: /, /blog, /blog/mi-articulo (este último con [slug], día 24).',
          'src/routes/+page.svelte → /. src/routes/contacto/+page.svelte → /contacto. No hace falta registrar rutas en otro sitio.',
          'src/routes/\n  +page.svelte\n  contacto/\n    +page.svelte\n  proyectos/\n    +page.svelte'
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
          notas: 'Consulte la sección «Estructura típica de carpetas».'
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
          salidaEsperada: 'Un string que menciona `precios` y `+page.svelte`.'
        },
        ['String con routes/precios y +page'],
        `// Archivo que responde a /precios\nconst path = '';\nconsole.log(path);\n`
      ),
      ej(
        3,
        'Menú de navegación',
        {
          planteamiento:
            'Los menús de navegación enlazan rutas internas mediante etiquetas `<a href="...">`. Se solicita modelar un menú mínimo y generar su marcado HTML.',
          requisitos: [
            'Declare el array `enlaces` con al menos tres objetos `{ href, label }`.',
            'Construya un string `html` con tres etiquetas `<a>` (puede usar plantilla literal).',
            'Escriba en consola el string resultante.'
          ],
          salidaEsperada: 'Tres enlaces con `href` y `label`; el markup incluye `<a href=`.'
        },
        ['Array 3 elementos', 'String con etiquetas a'],
        `const enlaces = [\n  { href: '/', label: 'Inicio' }\n];\nconst html = \`...\`;\nconsole.log(html);\n`
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
          'src/routes/+layout.svelte envuelve todas las rutas hijas. Dentro del HTML llamas {@render children?.()} donde debe aparecer la página actual.',
          '<header>DevDays</header>\n<main>{@render children?.()}</main>'
        ),
        sec(
          'Layouts anidados',
          'Un piso del edificio con decoración distinta (solo blog, solo admin).',
          'Secciones con chrome diferente sin tocar el layout raíz.',
          'blog/+layout.svelte solo envuelve rutas bajo /blog. Puede anidar otro {@render children?.()} y datos propios con +layout.ts.',
          'src/routes/blog/+layout.svelte'
        ),
        sec(
          'Datos compartidos en el layout',
          'El portero conoce tu nombre y se lo dice a todas las habitaciones que visites.',
          'Sesión de usuario, idioma, permisos disponibles en menú y páginas hijas.',
          '+layout.server.ts o +layout.ts exporta load; el layout y las páginas hijas reciben data. Útil para “¿está logueado?” sin repetir fetch.',
          'export const load = async () => ({ usuario: null });'
        ),
        sec(
          'Snippet children en Svelte 5',
          'El hueco del marco no es un slot antiguo: es un snippet que renderizas.',
          'Migración mental: layout = componente padre; página = hijo inyectado.',
          'En script no hace falta importar children: viene en el ámbito del layout. Sintaxis: {@render children?.()} (el ? evita error si no hay hijo).',
          '{@render children?.()}'
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
          salidaEsperada: 'Un string con `header` y `children`; la comprobación devuelve `true`.'
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
          salidaEsperada: 'Un string que menciona `admin` y `+layout`.'
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
          notas: 'Consulte la sección «Snippet children en Svelte 5».'
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
          'El nombre entre corchetes es la clave en params: [slug] → params.slug, [id] → params.id. Archivo: blog/[slug]/+page.svelte.',
          'src/routes/blog/[slug]/+page.svelte'
        ),
        sec(
          'Leer el parámetro en load',
          'El mozo lee la etiqueta del pasillo antes de abrir la puerta.',
          'Cargar el post correcto desde API o base de datos según la URL.',
          'export const load = async ({ params }) => { const slug = params.slug; return { slug }; }. La página usa data.slug en el template.',
          'params.slug en +page.ts o +page.server.ts'
        ),
        sec(
          'Opcional [[lang]] y catch-all [...rest]',
          '[[lang]] = idioma opcional en la URL; [...rest] = “todo lo que quede del path”.',
          'Sitios multidioma o documentación con rutas profundas variables.',
          '[[lang]]/docs → params.lang puede faltar. docs/[...path] captura docs/a/b/c en params.path. Menos frecuente al inicio; sabe que existen.',
          'src/routes/[[lang]]/home/+page.svelte'
        ),
        sec(
          'Enlaces a rutas dinámicas',
          'Construyes la dirección con el valor concreto del slug.',
          'Listas de artículos, días del bootcamp, enlaces desde el menú lateral.',
          'href="/blog/" + slug o template string: href={`/blog/${post.slug}`}. Misma plantilla, distinta URL al hacer clic.',
          '<a href="/blog/intro-js">Intro</a>'
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
          salidaEsperada: 'Salida que incluye `mi-post`.'
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
          salidaEsperada: 'Un string que contiene `[slug]` y `+page.svelte`.'
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
          salidaEsperada: 'El número `2` en consola.'
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
          'En +page.ts o +page.server.ts: export const load = async () => { return { posts: [] }; }. El return se fusiona en data para el componente.',
          'export const load = async () => ({ titulo: "Hola" });'
        ),
        sec(
          'Tipos y $props()',
          'Etiquetas en las cajas para que el editor te ayude.',
          'Menos errores al usar data.titulo en el markup.',
          'PageLoad y tipos generados (./$types) describen data. En +page.svelte: let { data } = $props(); y usas data.titulo.',
          'let { data }: { data: { titulo: string } } = $props();'
        ),
        sec(
          '+page.ts vs +page.server.ts',
          'Universal = puede correr en servidor y en cliente según navegación. Server = solo en el servidor, seguro para secretos.',
          'Claves API, service role de Supabase, lógica que no debe filtrarse al navegador.',
          '+page.ts: load visible en ambos entornos (cuidado con secretos). +page.server.ts: solo servidor; ideal para cookies, sesión, claves. En DevDays el estudio usa server load para auth y progreso.',
          '+page.server.ts → load con cookies y Supabase'
        ),
        sec(
          'load con params y dependencias',
          'Si la URL trae [slug], load recibe params.slug para buscar el registro correcto.',
          'Páginas dinámicas con datos coherentes con la barra de direcciones.',
          'export const load = async ({ params, url, fetch }) => { ... }. Al cambiar de ruta, SvelteKit vuelve a ejecutar load cuando corresponde.',
          'load async ({ params }) => ({ slug: params.slug })'
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
          salidaEsperada: '`Hola` en consola.'
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
          salidaEsperada: '`2` (array de dos elementos).'
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
          notas: 'Consulte la sección «+page.ts vs +page.server.ts».'
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
          'En +page.server.ts: export const actions = { default: async ({ request }) => { const fd = await request.formData(); ... } }. En el form: <form method="POST"> o action="?/nombreAction".',
          'export const actions = { default: async ({ request }) => ({ ok: true }) };'
        ),
        sec(
          'fail y success',
          'Si falta el email, devuelves error 400 con mensaje; si todo bien, datos para la UI.',
          'Validación y feedback al usuario (errores de campo, toast).',
          'import { fail } from "@sveltejs/kit". return fail(400, { error: "Email vacío" }) o return { success: true }. La página lee form prop o result según el patrón.',
          'return fail(400, { mensaje: "Revisa el formulario" });'
        ),
        sec(
          'use:enhance',
          'El formulario sigue yendo al servidor, pero la página no parpadea como recarga completa de los 90.',
          'Mejor UX: spinner, mantener scroll, actualizar solo lo necesario.',
          'import { enhance } from "$app/forms". <form method="POST" use:enhance>. Progresivo: sin JS sigue funcionando el POST clásico.',
          '<form method="POST" use:enhance>'
        ),
        sec(
          'FormData',
          'El sobre trae campos con nombre: email, password, mensaje.',
          'Leer lo que el usuario envió sin montar JSON a mano en el cliente.',
          'const email = fd.get("email")?.toString() ?? "". Comprueba vacíos antes de escribir en base de datos.',
          'const fd = await request.formData();\nconst email = fd.get("email");'
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
          salidaEsperada: 'Comentario que menciona servidor o procesar el formulario.'
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
          salidaEsperada: '`fail` al validar cadena vacía.'
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
          notas: 'Consulte la sección «use:enhance».'
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
          'createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY). En servidor SSR usas cookies para que la sesión sobreviva entre peticiones (patrón @supabase/ssr en hooks y load).',
          'const supabase = createClient(url, anonKey);'
        ),
        sec(
          'Consultas .from().select()',
          'Preguntas al archivador: “dame las filas de progreso de este usuario”.',
          'Listar lecciones completadas, guardar estado de día, perfiles.',
          'await supabase.from("progreso").select("*").eq("user_id", id). insert / update / delete siguen el mismo estilo encadenado.',
          'supabase.from("progreso").select("dia, estado")'
        ),
        sec(
          'Auth: magic link (OTP)',
          'Te mandan un enlace mágico al correo; un clic y la sesión queda abierta.',
          'Login sin contraseña nueva que recordar — igual que /login en DevDays.',
          'signInWithOtp({ email }). El usuario abre el enlace → /auth/callback intercambia el code por sesión (exchangeCodeForSession o equivalente en tu versión del SDK).',
          'await supabase.auth.signInWithOtp({ email: "tu@mail.com" })'
        ),
        sec(
          'RLS (Row Level Security)',
          'Cada fila lleva permiso: “solo el dueño puede leer su progreso”.',
          'Seguridad en la base aunque alguien tenga la anon key en el navegador.',
          'Políticas SQL en Supabase: por ejemplo auth.uid() = user_id en SELECT/INSERT. Sin RLS, la anon key sería demasiado poderosa.',
          'POLICY "solo mi progreso" ON progreso FOR SELECT USING (auth.uid() = user_id);'
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
          notas: 'Consulte la sección «Consultas .from().select()».'
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
          salidaEsperada: 'Menciona email o enlace.'
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
          notas: 'Consulte la sección «RLS (Row Level Security)».'
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
          salidaEsperada: 'Al menos 3 strings que empiezan por `/`.'
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
          salidaEsperada: 'Salida que contiene `render` y `children`.'
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
          salidaEsperada: 'Salida que incluye `intro-kit`.'
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
          salidaEsperada: 'Objeto con `ok: true` visible en consola.'
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
          salidaEsperada: 'Menciona email o enlace mágico.'
        },
        ['Texto sobre magic link'],
        `const r = \`magic link por email\`;\nconsole.log(r);\n`
      )
    ]
  }
];
