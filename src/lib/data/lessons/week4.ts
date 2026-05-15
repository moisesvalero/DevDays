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
        'Plano del sitio pequeño.',
        'Array rutas con tres strings: /, /contacto y /proyectos. Muéstralo con console.log.',
        ['Array de 3 URLs', 'Incluye raíz y dos rutas'],
        ['rutas es array', 'length 3 o tres strings correctos'],
        `// Día 22 — Plano del sitio\nconst rutas = [];\nconsole.log(rutas);\n`
      ),
      ej(
        2,
        '¿Dónde vive la página de precios?',
        'Guarda en path la ruta del archivo +page.svelte para la URL /precios (desde src/routes).',
        ['path menciona precios y +page.svelte'],
        ['String con routes/precios y +page'],
        `// Archivo que responde a /precios\nconst path = '';\nconsole.log(path);\n`
      ),
      ej(
        3,
        'Menú de navegación.',
        'Array enlaces con al menos 3 objetos { href, label }. Construye un string html con tres <a> (puede ser plantilla) y muéstralo.',
        ['3 enlaces con href y label', 'Markup con <a href='],
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
        'Bosquejo de layout.',
        'String codigo que incluya la palabra header, un nav y la línea de render de children. console.log si incluye "children".',
        ['String con header y children'],
        ['codigo incluye header', 'codigo incluye render o children'],
        `const codigo = \`...\`;\nconsole.log(codigo.includes('children'));\n`
      ),
      ej(
        2,
        'Layout solo para administración.',
        'ubicacion = ruta del archivo +layout.svelte que envuelve solo /admin (carpeta admin).',
        ['Menciona admin y +layout'],
        ['String routes/admin o src/routes/admin con layout'],
        `const ubicacion = '';\nconsole.log(ubicacion);\n`
      ),
      ej(
        3,
        'La línea clave.',
        'Guarda en linea el texto exacto {@render children?.()} y muéstralo.',
        ['Muestra {@render children?.()}'],
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
        'Título del post.',
        'slug = "mi-post". Muestra mensaje Post: mi-post (template string o concatenación).',
        ['Salida incluye mi-post'],
        ['Usa slug en el mensaje', 'Texto Post: mi-post o equivalente'],
        `const slug = 'mi-post';\nconsole.log(\`Post: \${slug}\`);\n`
      ),
      ej(
        2,
        'Ruta del archivo plantilla.',
        'path = ruta del +page.svelte dinámico para blog con slug (incluye corchetes).',
        ['path con [slug] y +page.svelte'],
        ['String blog/[slug]/+page o src/routes/blog/[slug]/+page.svelte'],
        `const path = 'src/routes/blog/[slug]/+page.svelte';\nconsole.log(path);\n`
      ),
      ej(
        3,
        'Dos URLs, mismo patrón.',
        'Array urls con dos strings /blog/a y /blog/b. Muestra length 2.',
        ['Dos URLs bajo /blog/', 'length 2'],
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
        'Load simulado.',
        'Función load que devuelve { titulo: "Hola" }. Muestra load().titulo.',
        ['Muestra Hola'],
        ['load devuelve objeto con titulo', 'Salida Hola'],
        `function load() {\n  return { titulo: 'Hola' };\n}\nconsole.log(load().titulo);\n`
      ),
      ej(
        2,
        'Load async.',
        'async function load que hace await Promise.resolve([1, 2]) y devuelve { n: resultado }. Muestra length del array en n.',
        ['n es array de 2 elementos', 'length 2'],
        ['async/await', 'n con dos elementos'],
        `async function load() {\n  return { n: await Promise.resolve([1, 2]) };\n}\nload().then((d) => console.log(d.n.length));\n`
      ),
      ej(
        3,
        '¿Dónde van los secretos?',
        'respuesta en una frase: diferencia entre +page.ts y +page.server.ts (cuál para API keys).',
        ['Menciona servidor o secretos en server'],
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
        'Para qué sirve una action.',
        'Comentario de una línea: qué hace una action de formulario en SvelteKit.',
        ['Comentario menciona servidor o procesar form'],
        ['Comentario con idea de POST/servidor'],
        `// Una action en +page.server.ts...\n\n`
      ),
      ej(
        2,
        'Validar email.',
        'Función validar(email): si vacío devuelve "fail", si no "ok". Prueba con "" y muestra fail.',
        ['Con "" devuelve fail'],
        ['Condicional email vacío', 'Salida fail'],
        `function validar(email) {\n  return email ? 'ok' : 'fail';\n}\nconsole.log(validar(''));\n`
      ),
      ej(
        3,
        '¿Qué mejora enhance?',
        'respuesta: una frase sobre use:enhance (sin recarga brusca o similar).',
        ['Menciona recarga o experiencia'],
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
        'Qué hace .select().',
        'Comentario: qué devuelve supabase.from("tabla").select().',
        ['Comentario menciona filas o leer datos'],
        ['Idea de lectura de tabla'],
        `// supabase.from('progreso').select()\n// → ...\n\n`
      ),
      ej(
        2,
        'Magic link en una frase.',
        'respuesta explicando magic link (email con enlace para entrar).',
        ['Menciona email o enlace'],
        ['Texto coherente con OTP/magic link'],
        `const respuesta = \`...\`;\nconsole.log(respuesta);\n`
      ),
      ej(
        3,
        '¿Por qué RLS?',
        'respuesta: por qué hace falta Row Level Security con anon key en el cliente.',
        ['Menciona seguridad, permisos o solo tus filas'],
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
        'Plano rápido.',
        'Array rutas con /, /about y una tercera ruta que inventes. Muéstralo.',
        ['Al menos 3 strings', 'Empiezan con /'],
        ['Array 3 urls'],
        `const rutas = ['/', '/about'];\nconsole.log(rutas);\n`
      ),
      ej(
        2,
        'Hueco del layout.',
        'Muestra en consola la línea {@render children?.()}.',
        ['Salida con render children'],
        ['String o log con render children'],
        `console.log('{@render children?.()}');\n`
      ),
      ej(
        3,
        'Post dinámico.',
        'Variable s = "intro-kit". Mensaje Artículo: intro-kit (o similar con el slug).',
        ['Salida incluye intro-kit'],
        ['Template o texto con s'],
        `const s = 'intro-kit';\nconsole.log(\`Artículo: \${s}\`);\n`
      ),
      ej(
        4,
        'Data de load.',
        'Objeto { ok: true } y muéstralo (simula return de load).',
        ['Muestra ok: true'],
        ['Objeto con ok true'],
        `console.log({ ok: true });\n`
      ),
      ej(
        5,
        'Auth en una frase.',
        'Variable r: frase que diga magic link por email (o equivalente). Muéstrala.',
        ['Menciona email o enlace mágico'],
        ['Texto sobre magic link'],
        `const r = \`magic link por email\`;\nconsole.log(r);\n`
      )
    ]
  }
];
