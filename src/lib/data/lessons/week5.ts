import type { Leccion } from '$lib/types/lesson';
import { sec, ej } from './_helpers';

export const week5: Leccion[] = [
  {
    dia: 29,
    semana: 5,
    tipo: 'leccion',
    titulo: 'TypeScript: etiquetas en las cajas',
    objetivo: 'Tipos = etiqueta de qué va dentro; no te obliga a memorizar.',
    contenido: {
      intro: `TypeScript avisa si metes tornillo en hueco de tuerca. En runtime sigue siendo JavaScript.`,
      secciones: [
        sec('Tipos básicos', 'string, number, boolean en variables.', 'Editor te ayuda.', 'let n: number = 5;'),
        sec('Interfaces', 'Forma de ficha Usuario { nombre: string }.', 'Contratos claros.', 'interface User { nombre: string }'),
        sec('En Svelte', '$props con tipo; $state<number>.', 'Menos errores tontos.', '')
      ],
      resumen: ['TS = etiquetas compile-time.', 'Interfaces = forma objeto.', 'Ayuda al editor.']
    },
    ejercicios: [
      ej(1, 'Tipo.', 'variable edad number 30.', ['30'], ['number'], `const edad: number = 30;\nconsole.log(edad);`),
      ej(2, 'Interface.', 'tipo Usuario con nombre string.', ['nombre'], ['interface'], `/** @type {{ nombre: string }} */\nconst u = { nombre: 'Ana' };\nconsole.log(u.nombre);`),
      ej(3, 'Para qué.', 'respuesta para qué TS en proyecto.', ['errores antes'], ['texto'], `const respuesta = \`...\`;\nconsole.log(respuesta);`)
    ]
  },
  {
    dia: 30,
    semana: 5,
    tipo: 'leccion',
    titulo: 'Env y hooks.server',
    objetivo: 'Secretos fuera del código; middleware en cada visita.',
    contenido: {
      intro: `.env = cajón cerrado de claves. hooks.server.ts = portero que revisa cada entrada.`,
      secciones: [
        sec('Variables entorno', 'PUBLIC_ visible; sin PUBLIC solo servidor.', 'API keys IA.', 'OPENAI_API_KEY'),
        sec('hooks.server', 'handle({ event, resolve }) auth, locals.', 'Como DevDays login guard.', ''),
        sec('$env/dynamic/private', 'Leer env en servidor SvelteKit.', '', '')
      ],
      resumen: ['.env = secretos.', 'hooks = portero.', 'PUBLIC = cliente.']
    },
    ejercicios: [
      ej(1, 'Public vs private.', 'respuesta diferencia PUBLIC_.', ['cliente/servidor'], ['texto'], `const respuesta = \`...\`;\nconsole.log(respuesta);`),
      ej(2, 'hooks.', 'respuesta qué hace hooks en una frase.', ['cada request'], ['texto'], `const respuesta = \`...\`;\nconsole.log(respuesta);`),
      ej(3, 'Ejemplo env.', 'comentario nombre variable IA.', ['OPENAI o GEMINI'], ['comentario'], `// API key en .env\n\n`)
    ]
  },
  {
    dia: 31,
    semana: 5,
    tipo: 'leccion',
    titulo: 'Deploy y README',
    objetivo: 'Poner la app en internet y explicar el repo.',
    contenido: {
      intro: `Vercel conecta GitHub y publica cada push. README es el cartel del taller para quien llega nuevo.`,
      secciones: [
        sec('Vercel', 'Import repo, env vars, deploy.', 'URL pública.', ''),
        sec('README', 'Qué es, cómo arrancar, stack.', 'GitHub y clientes.', '# DevDays\nnpm run dev'),
        sec('Build', 'npm run build verifica producción.', '', '')
      ],
      resumen: ['Vercel = hosting.', 'README = cartel.', 'build = comprobar.']
    },
    ejercicios: [
      ej(1, 'README sección.', 'array secciones README mínimas.', ['3+ strings'], ['array'], `const secciones = ['Qué es', 'Instalar', 'Stack'];\nconsole.log(secciones.length);`),
      ej(2, 'Comando dev.', 'string npm run dev.', ['npm run dev'], ['comando'], `const cmd = 'npm run dev';\nconsole.log(cmd);`),
      ej(3, 'Env prod.', 'respuesta qué copiar a Vercel.', ['variables'], ['texto'], `const respuesta = \`...\`;\nconsole.log(respuesta);`)
    ]
  },
  {
    dia: 32,
    semana: 5,
    tipo: 'leccion',
    titulo: 'Explica tu stack en 2 minutos',
    objetivo: 'Vender la idea, no recitar sintaxis.',
    contenido: {
      intro: `Cliente o entrevista: qué problema resuelves, con qué piezas, sin enumerar librerías como lista de la compra sin contexto.`,
      secciones: [
        sec('Estructura pitch', 'Problema → solución → stack → demo.', 'DevDays = bootcamp con tutor IA.', ''),
        sec('Tu stack', 'SvelteKit, Supabase, IA corrección.', 'Coincide con este repo.', ''),
        sec('Evita', 'No digas “soy experto” si estás aprendiendo; di “construyo con”.', '', '')
      ],
      resumen: ['Problema primero.', 'Stack con propósito.', 'Honestidad.']
    },
    ejercicios: [
      ej(1, 'Pitch.', 'respuesta 2 frases qué es DevDays.', ['bootcamp/IA'], ['texto'], `const respuesta = \`...\`;\nconsole.log(respuesta);`),
      ej(2, 'SvelteKit por qué.', 'respuesta una frase.', ['rutas/veloz'], ['texto'], `const respuesta = \`...\`;\nconsole.log(respuesta);`),
      ej(3, 'Supabase.', 'auth + datos en una frase.', ['auth/db'], ['texto'], `const respuesta = \`...\`;\nconsole.log(respuesta);`)
    ]
  },
  {
    dia: 33,
    semana: 5,
    tipo: 'leccion',
    titulo: 'Preguntas técnicas (con tus palabras)',
    objetivo: 'Conceptos de entrevista sin memorizar respuestas literales.',
    contenido: {
      intro: `Te preguntarán closures, runes, Git… Responde con tu analogía del taller.`,
      secciones: [
        sec('JS', 'closure, ===, map/filter.', 'Una frase cada una.', ''),
        sec('Svelte', 'runes, +page.server, hooks.', 'Relaciona con DevDays.', ''),
        sec('Git', 'commit, branch, PR.', 'Flujo colaborar.', '')
      ],
      resumen: ['Concepto > literal.', '1 frase clara.', 'Relaciona con proyecto.']
    },
    ejercicios: [
      ej(1, 'Closure.', 'respuesta 2 frases.', ['recuerda entorno'], ['texto'], `const respuesta = \`...\`;\nconsole.log(respuesta);`),
      ej(2, 'page.server.', 'respuesta diferencia server page.', ['solo servidor'], ['texto'], `const respuesta = \`...\`;\nconsole.log(respuesta);`),
      ej(3, 'Git PR.', 'array 3 pasos colaborar.', ['3 pasos'], ['array'], `const pasos = ['branch', 'commit', 'PR'];\nconsole.log(pasos.length);`)
    ]
  },
  {
    dia: 34,
    semana: 5,
    tipo: 'leccion',
    titulo: 'Presenta tu proyecto (sin presión de sintaxis)',
    objetivo: 'Recorrer repo en voz alta; debug con IA.',
    contenido: {
      intro: `No es live coding de memoria. Es: abro DevDays, explico flujo login → lección → corregir → siguiente día.`,
      secciones: [
        sec('Guion', '1) Problema 2) Demo 3) Código alto nivel 4) Qué mejorarías.', '', ''),
        sec('Debug narrado', 'Bug → hipótesis → prueba → fix con tutor.', 'Como trabajas con IA.', ''),
        sec('Sin pánico', 'Puedes leer código y explicar qué hace cada parte.', '', '')
      ],
      resumen: ['Explicar > teclear rápido.', 'Demo real.', 'IA como copiloto.']
    },
    ejercicios: [
      ej(1, 'Guion.', 'array 4 strings pasos presentación.', ['4 pasos'], ['array 4'], `const guion = ['problema','demo','codigo','futuro'];\nconsole.log(guion.length);`),
      ej(2, 'Ruta estudio.', 'path /estudio en palabras.', ['estudio'], ['texto'], `const ruta = '/estudio';\nconsole.log(ruta);`),
      ej(3, 'IA corrección.', 'respuesta qué hace /api/corregir.', ['revisa código'], ['texto'], `const respuesta = \`...\`;\nconsole.log(respuesta);`)
    ]
  },
  {
    dia: 35,
    semana: 5,
    tipo: 'examen',
    titulo: 'Repaso final: el taller completo',
    objetivo: 'Demostrar visión de todo el viaje.',
    instrucciones: `Cinco retos finales. Sin bloqueo: es repaso.`,
    ejercicios: [
      ej(1, 'Variables.', 'saludo con nombre y rol.', ['nombre y rol'], ['variables'], `const nombre = 'Moi';\nconst rol = 'dev';\nconsole.log(nombre, rol);`),
      ej(2, 'Async.', 'async muestra datos { ok: true }.', ['ok true'], ['async'], `async function f() { return { ok: true }; }\nf().then(console.log);`),
      ej(3, 'Svelte.', '$state idea en frase.', ['reactivo'], ['texto'], `const r = \`$state reactivo\`;\nconsole.log(r);`),
      ej(4, 'Ruta.', 'path +page para /blog.', ['blog page'], ['path'], `const p = 'src/routes/blog/+page.svelte';\nconsole.log(p);`),
      ej(5, 'Stack.', 'array 3 piezas DevDays stack.', ['3 tech'], ['array'], `const stack = ['SvelteKit','Supabase','IA'];\nconsole.log(stack.length);`)
    ]
  }
];
