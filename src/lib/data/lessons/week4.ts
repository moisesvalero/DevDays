import type { Leccion } from '$lib/types/lesson';
import { sec, ej } from './_helpers';

export const week4: Leccion[] = [
  {
    dia: 22,
    semana: 4,
    tipo: 'leccion',
    titulo: 'Rutas: habitaciones de la app',
    objetivo: 'Carpetas en src/routes = URLs.',
    contenido: {
      intro: `Quieres /contacto → carpeta contacto con +page.svelte. Sin router aparte: el plano es el disco.`,
      secciones: [
        sec('Archivos especiales', '+page.svelte pantalla; +layout envoltorio; +server API.', 'Mapa de la nave.', 'src/routes/about/+page.svelte → /about'),
        sec('+page.svelte', 'Componente normal; puede recibir data de load.', 'Cada pantalla.', ''),
        sec('Links', '<a href="/ruta"> navega sin recargar todo.', 'Menús.', '<a href="/about">About</a>')
      ],
      resumen: ['Carpeta = URL.', '+page = pantalla.', '<a href> = ir.']
    },
    ejercicios: [
      ej(1, 'URLs.', 'rutas array para +page, contacto/+page, proyectos/+page.', ['/, /contacto, /proyectos'], ['3 urls'], `const rutas = [];\nconsole.log(rutas);`),
      ej(2, 'Path precios.', 'path archivo para /precios.', ['routes/precios'], ['+page path'], `const path = '';\nconsole.log(path);`),
      ej(3, 'Enlaces.', 'array {href,label} y markup con <a>.', ['3 enlaces'], ['array y html'], `const enlaces = [{ href: '/', label: 'Inicio' }];\n\n`)
    ]
  },
  {
    dia: 23,
    semana: 4,
    tipo: 'leccion',
    titulo: 'Layouts: marco común',
    objetivo: 'Header y footer una vez; contenido hijo en medio.',
    contenido: {
      intro: `+layout.svelte es el marco de la puerta; {@render children?.()} es el hueco donde entra cada página.`,
      secciones: [
        sec('Layout raíz', 'src/routes/+layout.svelte envuelve todo.', 'Nav global.', '{@render children?.()}'),
        sec('Anidados', '/blog puede tener layout solo blog.', 'Secciones distintas.', 'blog/+layout.svelte'),
        sec('Datos layout', '+layout.server.ts sesión usuario para todas las hijas.', 'Menú con login.', '')
      ],
      resumen: ['Layout = marco.', 'children = contenido.', 'Anidable.']
    },
    ejercicios: [
      ej(1, 'Código layout.', 'string codigo con header nav y children render.', ['header y render'], ['layout string'], `const codigo = \`...\`;\nconsole.log(codigo.includes('children'));`),
      ej(2, 'Admin layout path.', 'ruta layout /admin.', ['admin +layout'], ['path'], `const ubicacion = '';\nconsole.log(ubicacion);`),
      ej(3, 'Línea render.', 'linea exacta {@render children?.()}', ['render children'], ['linea'], `const linea = '{@render children?.()}';\nconsole.log(linea);`)
    ]
  },
  {
    dia: 24,
    semana: 4,
    tipo: 'leccion',
    titulo: 'Rutas dinámicas [slug]',
    objetivo: 'Una plantilla para mil posts.',
    contenido: {
      intro: `[slug] captura el trozo de URL: /blog/hola → slug = "hola".`,
      secciones: [
        sec('[param]', 'Carpeta [slug] = comodín.', 'Posts, productos.', 'blog/[slug]/+page.svelte'),
        sec('Leer param', 'load recibe params; página usa data.', 'Título dinámico.', 'params.slug'),
        sec('Opcional y rest', '[[lang]] opcional; [...rest] catch-all.', 'Docs multisección.', '')
      ],
      resumen: ['[param] = dinámico.', 'params en load.', 'Un archivo, muchas URLs.']
    },
    ejercicios: [
      ej(1, 'Slug.', 'params slug "mi-post" en string mensaje.', ['mi-post'], ['slug'], `const slug = 'mi-post';\nconsole.log(\`Post: \${slug}\`);`),
      ej(2, 'Path dinámico.', 'path blog/[slug]/+page.svelte', ['brackets slug'], ['path'], `const path = 'src/routes/blog/[slug]/+page.svelte';\nconsole.log(path);`),
      ej(3, 'URL lista.', 'array 2 urls mismo patrón distinto slug.', ['2 urls'], ['2 strings'], `const urls = ['/blog/a', '/blog/b'];\nconsole.log(urls.length);`)
    ]
  },
  {
    dia: 25,
    semana: 4,
    tipo: 'leccion',
    titulo: 'load: traer datos antes de pintar',
    objetivo: '+page.ts prepara datos para la pantalla.',
    contenido: {
      intro: `load es el mozo que va al archivador antes de abrir la tienda: trae productos y se los pasa a la página.`,
      secciones: [
        sec('export const load', 'Función async que return data.', 'Fetch, Supabase, archivos.', 'export const load = async () => ({ posts: [] });'),
        sec('Tipos', 'PageLoad, data en $props().', 'Autocompletado.', ''),
        sec('Server vs universal', '+page.server.ts solo servidor (secretos).', 'Claves API.', '')
      ],
      resumen: ['load = datos previos.', 'return → data.', 'server = secretos.']
    },
    ejercicios: [
      ej(1, 'Load fake.', 'objeto data { titulo: "Hola" } desde función load simulada.', ['Hola'], ['data titulo'], `function load() { return { titulo: 'Hola' }; }\nconsole.log(load().titulo);`),
      ej(2, 'Async load.', 'async load await Promise.resolve([1,2])', ['array 2'], ['async return'], `async function load() { return { n: await Promise.resolve([1,2]) }; }\n`),
      ej(3, 'Diferencia.', 'respuesta +page.ts vs +page.server.ts.', ['servidor/secretos'], ['texto'], `const respuesta = \`...\`;\nconsole.log(respuesta);`)
    ]
  },
  {
    dia: 26,
    semana: 4,
    tipo: 'leccion',
    titulo: 'Form actions: enviar al servidor',
    objetivo: 'POST procesado en +page.server.ts.',
    contenido: {
      intro: `El formulario va al servidor como nota al almacén; actions procesan y pueden devolver éxito o error.`,
      secciones: [
        sec('export const actions', 'default async ({ request }) => { ... }', 'Login, contacto, guardar.', ''),
        sec('use:enhance', 'Mejor UX sin recargar brusco.', 'Progresivo.', ''),
        sec('fail / success', 'return fail(400) o datos.', 'Validación.', '')
      ],
      resumen: ['actions = POST servidor.', 'Form → action.', 'fail = error.']
    },
    ejercicios: [
      ej(1, 'Action idea.', 'comentario qué hace una action.', ['procesa form'], ['comentario'], `// Una action...\n\n`),
      ej(2, 'Validar.', 'si email vacío return fail sino ok.', ['fail o ok'], ['validación'], `function validar(email) { return email ? 'ok' : 'fail'; }\nconsole.log(validar(''));`),
      ej(3, 'Enhance.', 'respuesta qué mejora use:enhance.', ['sin recarga/full'], ['texto'], `const respuesta = \`...\`;\nconsole.log(respuesta);`)
    ]
  },
  {
    dia: 27,
    semana: 4,
    tipo: 'leccion',
    titulo: 'Supabase: archivador y llave mágica',
    objetivo: 'Base de datos + login como en DevDays.',
    contenido: {
      intro: `Supabase = Postgres + auth. Magic link = llave por email sin recordar otra contraseña (como este portal).`,
      secciones: [
        sec('Cliente', 'createClient url + anon key.', 'Leer/escribir con reglas RLS.', ''),
        sec('Tablas', 'from("progreso").select()', 'Datos del alumno.', ''),
        sec('Auth OTP', 'signInWithOtp email; callback exchangeCodeForSession.', 'Igual que /login aquí.', 'signInWithOtp({ email })')
      ],
      resumen: ['Supabase = DB + auth.', 'RLS = permisos.', 'Magic link = email.']
    },
    ejercicios: [
      ej(1, 'Select idea.', 'comentario qué hace .select()', ['lee filas'], ['comentario'], `// supabase.from('x').select()\n\n`),
      ej(2, 'OTP idea.', 'respuesta qué es magic link.', ['email enlace'], ['texto'], `const respuesta = \`...\`;\nconsole.log(respuesta);`),
      ej(3, 'RLS.', 'respuesta por qué RLS.', ['seguridad/filas'], ['texto'], `const respuesta = \`...\`;\nconsole.log(respuesta);`)
    ]
  },
  {
    dia: 28,
    semana: 4,
    tipo: 'examen',
    titulo: 'Repaso Semana 4: SvelteKit + datos',
    objetivo: 'Rutas, load, Supabase en concepto.',
    instrucciones: `Cinco retos.`,
    ejercicios: [
      ej(1, 'Rutas.', '3 urls de estructura dada.', ['3 urls'], ['array'], `const rutas = ['/', '/about'];\nconsole.log(rutas);`),
      ej(2, 'Layout.', 'línea render children.', ['render'], ['linea'], `console.log('{@render children?.()}');`),
      ej(3, 'Slug.', 'mensaje con slug.', ['slug'], ['template'], `const s = 'x';\nconsole.log(s);`),
      ej(4, 'load.', 'data { ok: true }.', ['ok'], ['objeto'], `console.log({ ok: true });`),
      ej(5, 'Auth.', 'magic link en una frase.', ['email'], ['texto'], `const r = \`magic link por email\`;\nconsole.log(r);`)
    ]
  }
];
