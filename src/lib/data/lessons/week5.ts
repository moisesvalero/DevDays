import type { Leccion } from '$lib/types/lesson';
import { sec, ej } from './_helpers';

export const week5: Leccion[] = [
  {
    dia: 29,
    semana: 5,
    tipo: 'leccion',
    titulo: 'TypeScript: etiquetas en las cajas',
    objetivo:
      'Entender tipos como contrato de forma de datos; el editor avisa antes de desplegar, sin memorizar sintaxis.',
    contenido: {
      intro: `TypeScript no cambia cómo corre tu app: en el navegador sigue siendo JavaScript. Añade comprobaciones en tiempo de compilación para que no metas un tornillo donde va una tuerca. En DevDays ya usas archivos .ts y props tipadas en Svelte.`,
      secciones: [
        sec(
          'Tipos básicos en variables',
          'En el almacén, cada hueco tiene etiqueta: TEXTURA, CANTIDAD o SÍ/NO. TypeScript hace lo mismo con string, number y boolean.',
          'Evitas sumar texto con números por error y el editor te sugiere métodos correctos.',
          'Anotas el tipo después de dos puntos: let piezas: number = 12. También puedes dejar que TS infiera el tipo si asignas valor al declarar.',
          'let nombre: string = "Ana";\nlet edad: number = 30;\nlet activo: boolean = true;',
          [
            'Declare `let edad: number = 30`.',
            'Opcional: declare `nombre` como `string`.',
            'Muestre `edad` con `console.log(edad)`.'
          ]
        ),
        sec(
          'Interfaces: forma de un objeto',
          'Una ficha de cliente fija qué campos existen: nombre obligatorio, email opcional. interface User es esa ficha en código.',
          'Contratos claros entre funciones y componentes: todos saben qué propiedades tiene un usuario o una lección.',
          'interface User { nombre: string; email?: string } — el ? marca opcional. Luego const u: User = { nombre: "Ana" }.',
          'interface Leccion {\n  dia: number;\n  titulo: string;\n}\nconst usuario: Leccion = { dia: 1, titulo: "Intro" };',
          [
            'Defina `interface Usuario { nombre: string }` (o use JSDoc equivalente).',
            'Cree `const usuario` que cumpla el contrato.',
            'Muestre `usuario.nombre` con `console.log`.'
          ]
        ),
        sec(
          'Tipos en Svelte 5',
          'Las runes también pueden llevar etiqueta: $state<number>(0) o props con tipo en $props().',
          'Menos bugs al pasar datos entre DayList, LessonContent y el tutor IA.',
          'let { titulo, dia }: { titulo: string; dia: number } = $props();\nlet contador = $state<number>(0);',
          'import type { Snippet } from "svelte";\n// Tipar props y estado reactivo',
          [
            'Asigne a `respuesta` una o dos frases sobre para qué usar TypeScript en DevDays.',
            'Mencione compile-time, editor o menos bugs antes de desplegar.',
            'Muestre `respuesta` con `console.log(respuesta)`.'
          ]
        )
      ],
      resumen: [
        'TS = comprobación al compilar; runtime = JS.',
        'string, number, boolean son los primeros tipos.',
        'interface = forma fija de un objeto.',
        'En Svelte: tipar $props y $state ayuda al editor.',
        'Validar datos externos sigue siendo tu responsabilidad.'
      ]
    },
    ejercicios: [
      ej(
        1,
        'Etiquetas en el inventario del taller',
        {
          planteamiento:
            'En un almacén tipado, cada hueco lleva etiqueta de contenido. Se solicita modelar una edad numérica con anotación explícita de tipo.',
          requisitos: [
            'Declare la variable `edad` con tipo `number` y valor `30`.',
            'Escriba en consola el valor de `edad` mediante `console.log`.'
          ],
          salidaEsperada: 'En consola aparece el número 30.',
          notas: 'Use el patrón de la sección «Tipos básicos en variables».',
          seccionRef: 'Tipos básicos en variables'
        },
        ['Existe variable edad', 'El valor mostrado es 30', 'Se usa number o equivalente lógico'],
        `// Día 29 — Inventario\n// edad: number = 30 y console.log\n\n`
      ),
      ej(
        2,
        'Ficha de usuario en el archivador',
        {
          planteamiento:
            'Una ficha de usuario fija la forma mínima de un registro. Se solicita crear un objeto que cumpla un contrato con la propiedad `nombre`.',
          requisitos: [
            'Cree un objeto `usuario` con la propiedad `nombre` de tipo cadena (puede usar `interface`, `type` o JSDoc).',
            'Escriba en consola el valor de `usuario.nombre`.'
          ],
          salidaEsperada: 'En consola aparece el nombre asignado (por ejemplo, Ana).',
          notas: 'Véase «Interfaces: forma de un objeto».',
          seccionRef: 'Interfaces: forma de un objeto'
        },
        ['Hay objeto usuario', 'Tiene propiedad nombre', 'Se accede y muestra nombre'],
        `// Día 29 — Ficha usuario\n/** @type {{ nombre: string }} */\nconst usuario = { nombre: 'Ana' };\n\n`
      ),
      ej(
        3,
        'El capataz pregunta para qué sirve TypeScript',
        {
          planteamiento:
            'Antes de adoptar TypeScript en un proyecto, conviene articular su propósito en una frase clara. Se solicita redactar una respuesta breve aplicada a DevDays.',
          requisitos: [
            'Asigne a la variable `respuesta` una o dos frases en las que explique para qué usaría TypeScript en un portal como DevDays.',
            'Escriba en consola el contenido de `respuesta`.'
          ],
          salidaEsperada:
            'Texto que mencione detección de errores al compilar, ayuda del editor o menos bugs antes de desplegar.',
          notas: 'Priorice el «para qué sirve»; la sección enlaza tipos con Svelte 5.',
          seccionRef: 'Tipos en Svelte 5'
        },
        ['Hay texto explicativo', 'Menciona compile-time, editor o menos bugs'],
        `// Día 29 — Para qué TS\nconst respuesta = \`...\`;\nconsole.log(respuesta);`
      )
    ]
  },
  {
    dia: 30,
    semana: 5,
    tipo: 'leccion',
    titulo: 'Variables de entorno y hooks.server',
    objetivo:
      'Separar secretos del código cliente y entender el portero que revisa cada petición en SvelteKit.',
    contenido: {
      intro: `Las API keys de OpenAI o Gemini no pueden ir en el navegador: cualquiera las vería en el bundle. SvelteKit lee .env en el servidor y hooks.server.ts intercepta cada request antes de llegar a tus rutas — igual que DevDays protege /estudio y aplica cabeceras de seguridad.`,
      secciones: [
        sec(
          'Archivo .env y prefijo PUBLIC_',
          'El .env es un cajón cerrado en la oficina: solo el servidor tiene llave. PUBLIC_ es la vitrina: lo que puede ver el visitante.',
          'Claves de IA, service role y secrets van sin PUBLIC_. URLs y anon key de Supabase suelen ser PUBLIC_ porque el cliente las necesita con RLS.',
          'PUBLIC_SUPABASE_URL=https://...\nOPENAI_API_KEY=sk-...  // solo servidor\nGEMINI_API_KEY=...',
          '# .env.example documenta qué copiar',
          [
            'Asigne a `respuesta` una frase que contraste `PUBLIC_` con una variable privada.',
            'Indique visibilidad en cliente frente a solo servidor.',
            'Muestre `respuesta` con `console.log(respuesta)`.'
          ]
        ),
        sec(
          'hooks.server.ts — el portero',
          'En cada visita, el portero mira el DNI (sesión), anota datos en locals y deja pasar o redirige a login.',
          'handle({ event, resolve }) recibe la petición, puedes leer cookies, llamar a Supabase, setear event.locals.user y luego return resolve(event).',
          'En DevDays: auth, allowlist de emails, locale y cabeceras CSP viven aquí.',
          'export async function handle({ event, resolve }) {\n  // auth, allowlist, locale\n  return resolve(event);\n}',
          [
            'Asigne a `respuesta` una frase sobre qué hace `hooks.server.ts` en cada petición.',
            'Mencione interceptar requests o middleware antes de la ruta.',
            'Muestre `respuesta` con `console.log(respuesta)`.'
          ]
        ),
        sec(
          'Leer env en el servidor',
          'No importes secretos en +page.svelte del cliente. En +server.ts o lib/server usas módulos de entorno dinámicos.',
          'import { OPENAI_API_KEY } from "$env/dynamic/private" — solo existe en servidor. Si falta la key, /api/corregir puede hacer fallback a Gemini.',
          '$env/dynamic/private — variables sin PUBLIC_\n$env/dynamic/public — variables PUBLIC_',
          'import { GEMINI_API_KEY } from "$env/dynamic/private";',
          [
            'Escriba un comentario de línea con el nombre de `OPENAI_API_KEY` o `GEMINI_API_KEY`.',
            'No incluya valores reales de la clave.',
            'El comentario debe ser reconocible en revisión manual.'
          ]
        )
      ],
      resumen: [
        '.env = configuración fuera del código.',
        'PUBLIC_ = visible en cliente; sin prefijo = solo servidor.',
        'hooks.server = middleware en cada request.',
        '$env/dynamic/private para secretos en APIs.',
        'Nunca subas .env al repositorio.'
      ]
    },
    ejercicios: [
      ej(
        1,
        'Vitrina vs cajón cerrado',
        {
          planteamiento:
            'En SvelteKit, no todas las variables de entorno pueden exponerse al navegador. Se solicita explicar la diferencia entre variables con prefijo `PUBLIC_` y las privadas.',
          requisitos: [
            'Asigne a `respuesta` una o dos frases que contrasten una variable `PUBLIC_` con una sin ese prefijo.',
            'Escriba en consola el contenido de `respuesta`.'
          ],
          salidaEsperada:
            'Texto que indique visibilidad en cliente frente a uso solo en servidor (o equivalente).',
          notas: 'Véase «Archivo .env y prefijo PUBLIC_».',
          seccionRef: 'Archivo .env y prefijo PUBLIC_'
        },
        ['Hay texto claro', 'Diferencia PUBLIC vs privado'],
        `// Día 30 — Public vs private\nconst respuesta = \`...\`;\nconsole.log(respuesta);`
      ),
      ej(
        2,
        'El portero del edificio',
        {
          planteamiento:
            'Antes de que una petición llegue a una ruta, SvelteKit puede ejecutar lógica global. Se solicita describir el papel de `hooks.server.ts`.',
          requisitos: [
            'Asigne a `respuesta` una frase que defina qué hace `hooks.server.ts` en el ciclo de una petición.',
            'Escriba en consola el contenido de `respuesta`.'
          ],
          salidaEsperada:
            'Menciona interceptar cada request, middleware o ejecutar lógica antes de resolver la ruta.',
          notas: 'Véase «hooks.server.ts — el portero».',
          seccionRef: 'hooks.server.ts — el portero'
        },
        ['Respuesta sobre interceptar peticiones'],
        `// Día 30 — Portero\nconst respuesta = \`...\`;\nconsole.log(respuesta);`
      ),
      ej(
        3,
        'Etiqueta en el cajón de IA',
        {
          planteamiento:
            'Las claves de los proveedores de IA deben vivir solo en el servidor. Se solicita documentar en código el nombre de la variable de entorno correspondiente.',
          requisitos: [
            'Escriba un comentario de línea con el nombre exacto de la variable para OpenAI o Gemini (como en `.env.example`).'
          ],
          salidaEsperada:
            'Comentario que contenga `OPENAI_API_KEY` o `GEMINI_API_KEY` (u otro nombre reconocible del proyecto).',
          notas: 'Solo el nombre de la variable; importe desde `$env/dynamic/private` en código real.',
          seccionRef: 'Leer env en el servidor'
        },
        ['Hay comentario', 'Nombre de variable de IA reconocible'],
        `// Día 30 — Variable IA\n// API key en .env:\n\n`
      )
    ]
  },
  {
    dia: 31,
    semana: 5,
    tipo: 'leccion',
    titulo: 'Deploy en Vercel y README del repo',
    objetivo: 'Publicar la app en internet y dejar documentado el proyecto para ti y para quien clone el repo.',
    contenido: {
      intro: `Cuando haces push a GitHub, Vercel puede construir y publicar automáticamente. Antes conviene que npm run build pase en local. El README es el cartel en la puerta del taller: qué es el proyecto, cómo arrancarlo y qué stack usa.`,
      secciones: [
        sec(
          'Vercel: de repo a URL pública',
          'Conectas el repositorio como si alquilaras un escaparate: cada push a main (o PR) genera una versión nueva.',
          'Import project → Framework SvelteKit → añades las mismas variables que en .env → Deploy. Obtienes URL tipo tu-app.vercel.app.',
          'Configura PUBLIC_SITE_URL y claves Supabase/IA en el panel Environment Variables.',
          'vercel.com → Import → env vars → Deploy',
          [
            'Asigne a `respuesta` un texto breve sobre qué copiar de `.env` al panel de Vercel.',
            'Mencione variables de entorno, Supabase o claves de IA.',
            'Muestre `respuesta` con `console.log(respuesta)`.'
          ]
        ),
        sec(
          'README mínimo viable',
          'Quien llega nuevo no debería adivinar: título, qué hace, cómo instalar, cómo arrancar, stack y variables necesarias.',
          'GitHub muestra el README en la portada. Clientes o entrevistadores lo leen antes de la demo.',
          'Incluya secciones Instalar, Desarrollo y Variables (ver `.env.example`).',
          '# DevDays\n\nBootcamp 35 días...\n\n## Instalar\nnpm install\n\n## Desarrollo\nnpm run dev',
          [
            'Cree el arreglo `secciones` con al menos tres cadenas (Instalación, Desarrollo, Variables).',
            'Cada elemento debe ser un string descriptivo.',
            'Escriba en consola `secciones.length`.'
          ]
        ),
        sec(
          'npm run build y npm run check',
          'build simula producción: si falla aquí, fallará en Vercel. check ejecuta svelte-check y TypeScript.',
          'Antes de cerrar una feature o abrir PR, corre check. CI en el repo puede hacer lo mismo.',
          'adapter-vercel en svelte.config si aplica.',
          'npm run build\nnpm run check',
          [
            'Asigne a `cmd` la cadena `npm run dev`.',
            'Escriba en consola el valor de `cmd`.',
            'Compruebe que coincide con el comando de desarrollo del README.'
          ]
        )
      ],
      resumen: [
        'Vercel despliega desde Git con env vars.',
        'README = cartel: qué, cómo instalar, stack.',
        'npm run build comprueba producción.',
        'npm run check antes de merge.',
        'Supabase redirect URLs deben incluir la URL de prod.'
      ]
    },
    ejercicios: [
      ej(
        1,
        'Copiar llaves al escaparate',
        {
          planteamiento:
            'Vercel no lee el archivo `.env` de su máquina: hay que replicar la configuración en el panel. Se solicita enumerar qué debe copiarse antes del primer deploy.',
          requisitos: [
            'Asigne a `respuesta` un texto breve que indique qué debe copiar de su `.env` (o de `.env.example`) al panel de Vercel.',
            'Escriba en consola el contenido de `respuesta`.'
          ],
          salidaEsperada:
            'Menciona variables de entorno, claves de Supabase, IA o las listadas en `.env.example`.',
          notas: 'Véase «Vercel: de repo a URL pública».',
          seccionRef: 'Vercel: de repo a URL pública'
        },
        ['Texto sobre env vars en producción'],
        `// Día 31 — Env prod\nconst respuesta = \`...\`;\nconsole.log(respuesta);`
      ),
      ej(
        2,
        'Índice del cartel del taller',
        {
          planteamiento:
            'Un README mínimo se organiza en secciones reconocibles. Se solicita modelar ese índice como un arreglo de cadenas.',
          requisitos: [
            'Cree el arreglo `secciones` con al menos tres cadenas (por ejemplo: Instalación, Desarrollo, Variables).',
            'Escriba en consola `secciones.length`.'
          ],
          salidaEsperada: 'En consola aparece un entero mayor o igual que 3.',
          notas: 'Véase «README mínimo viable».',
          seccionRef: 'README mínimo viable'
        },
        ['Array con length >= 3', 'Cada elemento es string de sección'],
        `// Día 31 — README\nconst secciones = [];\nconsole.log(secciones.length);`
      ),
      ej(
        3,
        'Arrancar el motor en local',
        {
          planteamiento:
            'Antes de desplegar, el proyecto debe arrancar en local. Se solicita registrar el comando de desarrollo estándar de npm.',
          requisitos: [
            'Asigne a la variable `cmd` la cadena del comando para modo desarrollo (`npm run dev`).',
            'Escriba en consola el valor de `cmd`.'
          ],
          salidaEsperada: 'En consola aparece exactamente `npm run dev`.',
          notas: 'Véase «npm run build y npm run check».',
          seccionRef: 'npm run build y npm run check'
        },
        ['Variable cmd con comando dev', 'console.log del comando'],
        `// Día 31 — Comando dev\nconst cmd = '';\nconsole.log(cmd);`
      )
    ]
  },
  {
    dia: 32,
    semana: 5,
    tipo: 'leccion',
    titulo: 'Explica tu stack en dos minutos',
    objetivo:
      'Comunicar problema, solución y tecnologías con propósito — sin recitar librerías como lista de la compra.',
    contenido: {
      intro: `En una entrevista o con un cliente no vendes sintaxis: vendes qué problema resuelves y con qué piezas. Dos minutos bastan si sigues un guion: dolor → solución → stack con razón → demo o siguiente paso.`,
      secciones: [
        sec(
          'Estructura del pitch (2 minutos)',
          'Primero el dolor del cliente; luego tu puente; al final las herramientas como medios, no como protagonistas.',
          'Problema → Solución → Stack (por qué cada pieza) → Demo o invitación a probar.',
          'DevDays: "Los juniors pierden horas sin feedback" → "Bootcamp con tutor IA que corrige por lógica" → SvelteKit + Supabase + OpenAI/Gemini.',
          '1) Problema  2) Solución  3) Stack  4) Demo',
          [
            'Asigne a `respuesta` dos frases: qué es DevDays y para quién está pensado.',
            'Mencione bootcamp, tutor IA o feedback automático.',
            'Muestre `respuesta` con `console.log(respuesta)`.'
          ]
        ),
        sec(
          'Tu stack real (este repo)',
          'SvelteKit: rutas por carpetas, SSR, endpoints /api. Supabase: auth magic link y progreso opcional. IA: corrección y chat en servidor.',
          'Cada pieza responde a un requisito: UI rápida, login sin contraseña propia, feedback automático.',
          'CodeMirror en el cliente; las API keys de IA solo en el servidor.',
          'SvelteKit — portal y APIs\nSupabase — sesión y tabla progreso\nIA — /api/corregir y /api/preguntar',
          [
            'Asigne a `respuesta` una frase con una razón para elegir SvelteKit en DevDays.',
            'Mencione rutas, SSR, compilación o bundle ligero.',
            'Muestre `respuesta` con `console.log(respuesta)`.'
          ]
        ),
        sec(
          'Frases que funcionan (y las que no)',
          'Di "construyo con SvelteKit" en lugar de "soy experto senior en todo". La honestidad genera confianza.',
          'Si llevas poco tiempo, enfatiza lo que ya desplegaste y lo que aprendiste haciendo DevDays.',
          'Muestra repo o URL desplegada si puedes.',
          'Bien: "Elegí Svelte porque compila y el bundle es ligero."\nEvitar: "Sé más que React" sin demostrar nada.',
          [
            'Asigne a `respuesta` una frase sobre auth y base de datos de DevDays.',
            'Mencione magic link o Postgres/Supabase.',
            'Muestre `respuesta` con `console.log(respuesta)`.'
          ]
        )
      ],
      resumen: [
        'Problema primero, tecnología después.',
        'Cada herramienta con un "para qué".',
        'Honestidad > títulos inflados.',
        'DevDays es un ejemplo concreto de pitch.',
        'Practica en voz alta con temporizador.'
      ]
    },
    ejercicios: [
      ej(
        1,
        'Elevator pitch de DevDays',
        {
          planteamiento:
            'Un pitch de dos minutos empieza por el problema y el público. Se solicita redactar un elevator pitch breve de DevDays.',
          requisitos: [
            'Asigne a `respuesta` exactamente dos frases: qué es DevDays y para quién está pensado.',
            'Escriba en consola el contenido de `respuesta`.'
          ],
          salidaEsperada:
            'Texto que mencione bootcamp o aprendizaje, y tutor IA, corrección automática o feedback.',
          notas: 'Véase «Estructura del pitch (2 minutos)».',
          seccionRef: 'Estructura del pitch (2 minutos)'
        },
        ['Texto de 2 frases aprox', 'Problema o público claro'],
        `// Día 32 — Pitch DevDays\nconst respuesta = \`...\`;\nconsole.log(respuesta);`
      ),
      ej(
        2,
        'Por qué SvelteKit',
        {
          planteamiento:
            'En una demo técnica, cada herramienta debe justificarse con un «para qué». Se solicita argumentar la elección de SvelteKit para este portal.',
          requisitos: [
            'Asigne a `respuesta` una sola frase con una razón para elegir SvelteKit en un proyecto como DevDays.',
            'Escriba en consola el contenido de `respuesta`.'
          ],
          salidaEsperada:
            'Menciona rutas por carpetas, SSR, compilación, bundle ligero o menos JavaScript en cliente.',
          notas: 'Véase «Tu stack real (este repo)».',
          seccionRef: 'Tu stack real (este repo)'
        },
        ['Una frase con razón técnica o de producto'],
        `// Día 32 — SvelteKit\nconst respuesta = \`...\`;\nconsole.log(respuesta);`
      ),
      ej(
        3,
        'Supabase en una frase',
        {
          planteamiento:
            'Supabase concentra autenticación y persistencia en DevDays. Se solicita resumir ese papel en una sola frase.',
          requisitos: [
            'Asigne a `respuesta` una frase que explique auth y base de datos de DevDays en conjunto.',
            'Escriba en consola el contenido de `respuesta`.'
          ],
          salidaEsperada:
            'Menciona login o autenticación (magic link) y almacenamiento de datos o Postgres.',
          notas: 'Véase «Frases que funcionan (y las que no)».',
          seccionRef: 'Frases que funcionan (y las que no)'
        },
        ['Una frase con auth y almacenamiento'],
        `// Día 32 — Supabase\nconst respuesta = \`...\`;\nconsole.log(respuesta);`
      )
    ]
  },
  {
    dia: 33,
    semana: 5,
    tipo: 'leccion',
    titulo: 'Preguntas técnicas con tus palabras',
    objetivo:
      'Responder conceptos de entrevista (JS, SvelteKit, Git) con analogías del taller, no con definiciones memorizadas.',
    contenido: {
      intro: `Te pueden preguntar por closures, runes o pull requests. No hace falta citar MDN: hace falta una frase clara y, si puedes, un ejemplo de este proyecto. La IA del portal corrige por lógica — tú también puedes explicar por intención.`,
      secciones: [
        sec(
          'JavaScript: closure, ===, map/filter',
          'Closure: la función guarda el despacho donde nació aunque la llamen desde otro pasillo. === compara valor y tipo; == hace conversiones raras.',
          'map devuelve array nuevo transformado; filter deja solo los que pasan el filtro. En DevDays: listar días, filtrar completados.',
          'const activos = dias.filter(d => d.estado === "completado");\n[1,2,3].map(n => n * 2);',
          'const activos = dias.filter(x => x > 0);',
          [
            'Asigne a `respuesta` una o dos frases que definan closure en JavaScript.',
            'Indique que la función recuerda variables del scope exterior.',
            'Muestre `respuesta` con `console.log(respuesta)`.'
          ]
        ),
        sec(
          'Svelte 5 y SvelteKit',
          '$state: dato vivo; $derived: calculado; $props: entrada al componente. +page.server.ts: solo servidor (secretos, cookies). +page.ts: load universal.',
          'Relaciona con LessonContent, CodeEditor y load de /estudio.',
          'let abierto = $state(false);\n// +page.server.ts en servidor',
          'runes en .svelte\n+page.server.ts → actions, cookies, DB',
          [
            'Asigne a `respuesta` una frase que diferencie `+page.svelte` de `+page.server.ts`.',
            'Mencione servidor, secretos o que no se envía al cliente.',
            'Muestre `respuesta` con `console.log(respuesta)`.'
          ]
        ),
        sec(
          'Git: commit, branch, pull request',
          'commit = foto del taller en un momento. branch = copia para probar sin romper main. PR = pedir que fusionen tu rama tras revisión.',
          'Flujo colaborativo: branch → commits → push → PR → review → merge.',
          'main protegida; trabajas en ramas.',
          'git checkout -b feature/login\ngit commit -m "feat: magic link"',
          [
            'Cree el arreglo `pasos` con exactamente tres cadenas del flujo colaborativo.',
            'Incluya ideas de branch, commit y PR o push.',
            'Escriba en consola `pasos.length`.'
          ]
        )
      ],
      resumen: [
        'Closure = función + entorno recordado.',
        '=== estricto; map/filter para listas.',
        'Runes = reactividad Svelte 5.',
        '+page.server = solo servidor.',
        'PR = proponer fusionar tu rama.'
      ]
    },
    ejercicios: [
      ej(
        1,
        'Closure en el taller',
        {
          planteamiento:
            'En entrevistas técnicas suele pedirse explicar un closure sin citar MDN. Se solicita una definición breve con analogía del taller.',
          requisitos: [
            'Asigne a `respuesta` una o dos frases que definan qué es un closure en JavaScript.',
            'Escriba en consola el contenido de `respuesta`.'
          ],
          salidaEsperada:
            'Texto que indique que la función recuerda variables del entorno donde se creó (scope exterior).',
          notas: 'Véase «JavaScript: closure, ===, map/filter».',
          seccionRef: 'JavaScript: closure, ===, map/filter'
        },
        ['Texto explicativo', 'Idea de scope/entorno'],
        `// Día 33 — Closure\nconst respuesta = \`...\`;\nconsole.log(respuesta);`
      ),
      ej(
        2,
        'Página solo en el almacén',
        {
          planteamiento:
            'SvelteKit separa código que corre en el navegador del que solo corre en el servidor. Se solicita contrastar dos archivos de ruta.',
          requisitos: [
            'Asigne a `respuesta` una frase que diferencie `+page.svelte` de `+page.server.ts`.',
            'Escriba en consola el contenido de `respuesta`.'
          ],
          salidaEsperada:
            'Menciona que `+page.server.ts` ejecuta en servidor, puede usar secretos o no se envía al cliente.',
          notas: 'Véase «Svelte 5 y SvelteKit».',
          seccionRef: 'Svelte 5 y SvelteKit'
        },
        ['Diferencia cliente vs servidor'],
        `// Día 33 — page.server\nconst respuesta = \`...\`;\nconsole.log(respuesta);`
      ),
      ej(
        3,
        'Tres pasos para colaborar',
        {
          planteamiento:
            'El flujo colaborativo en Git se resume en pocos pasos ordenados. Se solicita representarlo como un arreglo de tres cadenas.',
          requisitos: [
            'Cree el arreglo `pasos` con exactamente tres cadenas del flujo colaborativo (por ejemplo: crear branch, commit, abrir PR).',
            'Escriba en consola `pasos.length`.'
          ],
          salidaEsperada: 'En consola aparece el número 3.',
          notas: 'Véase «Git: commit, branch, pull request».',
          seccionRef: 'Git: commit, branch, pull request'
        },
        ['pasos.length === 3', 'Strings con ideas de branch/commit/PR/push'],
        `// Día 33 — Git colaborar\nconst pasos = [];\nconsole.log(pasos.length);`
      )
    ]
  },
  {
    dia: 34,
    semana: 5,
    tipo: 'leccion',
    titulo: 'Presenta tu proyecto sin memorizar sintaxis',
    objetivo:
      'Recorrer el repo en voz alta: flujo real, rutas clave y cómo debugueas con el tutor IA.',
    contenido: {
      intro: `No te piden escribir un framework de memoria. Te piden abrir DevDays, seguir el flujo login → lección → corregir código → siguiente día, y explicar qué hace cada pieza. Leer código en pantalla y narrarlo es una habilidad válida.`,
      secciones: [
        sec(
          'Guion de demo (4 bloques)',
          'Como un tour guiado: por qué existe, qué ves en pantalla, qué hay bajo el capó, qué mejorarías.',
          '1) Problema y usuario  2) Demo en vivo  3) Archivos clave (rutas, API)  4) Roadmap honesto.',
          'problema → /login → /estudio → /api/corregir',
          '1) Problema  2) Demo  3) Archivos clave  4) Roadmap',
          [
            'Cree el arreglo `guion` con cuatro cadenas: problema, demo, archivos clave y roadmap.',
            'Cada elemento describe un bloque del tour.',
            'Escriba en consola `guion.length`.'
          ]
        ),
        sec(
          'Rutas que debes poder señalar',
          '/login, /auth/callback, /estudio, /api/corregir, /api/preguntar. Saber qué archivo corresponde a cada URL.',
          'src/routes/login/+page.svelte, hooks.server.ts, src/routes/estudio/+page.svelte, src/routes/api/corregir/+server.ts.',
          'Carpeta = URL en SvelteKit. +server.ts = endpoint HTTP (POST fetch desde el cliente).',
          "const ruta = '/estudio';\nconsole.log(ruta);",
          [
            'Asigne a `ruta` la cadena `/estudio`.',
            'Escriba en consola el valor de `ruta`.',
            'Compruebe que coincide con la URL del portal.'
          ]
        ),
        sec(
          'Debug narrado con IA',
          'Bug → hipótesis → prueba (log, network, check) → fix. El tutor no sustituye entender; acelera el ciclo.',
          'Ejemplo: "La corrección falla" → revisar env keys → mirar respuesta de /api/corregir → ajustar criterios.',
          'npm run check + consola del navegador + logs Vercel.',
          "fetch('/api/corregir', { method: 'POST' })",
          [
            'Asigne a `respuesta` un texto breve sobre qué hace `/api/corregir`.',
            'Mencione revisar código del alumno, IA o criterios de lógica.',
            'Muestre `respuesta` con `console.log(respuesta)`.'
          ]
        )
      ],
      resumen: [
        'Demo > live coding de memoria.',
        'Guion: problema, demo, código alto nivel, futuro.',
        'Señala /estudio y APIs de IA.',
        'Debug = hipótesis + prueba + fix.',
        'Leer código en voz alta cuenta como skill.'
      ]
    },
    ejercicios: [
      ej(
        1,
        'Guion de la presentación',
        {
          planteamiento:
            'Una demo guiada sigue un guion de cuatro bloques. Se solicita materializar ese guion como un arreglo de cuatro cadenas.',
          requisitos: [
            'Cree el arreglo `guion` con cuatro cadenas que correspondan a: problema, demo en vivo, archivos clave y mejoras o roadmap.',
            'Escriba en consola `guion.length`.'
          ],
          salidaEsperada: 'En consola aparece el número 4.',
          notas: 'Véase «Guion de demo (4 bloques)».',
          seccionRef: 'Guion de demo (4 bloques)'
        },
        ['guion.length === 4', 'Cuatro strings descriptivos'],
        `// Día 34 — Guion\nconst guion = [];\nconsole.log(guion.length);`
      ),
      ej(
        2,
        'Puerta del portal de estudio',
        {
          planteamiento:
            'En SvelteKit, la carpeta bajo `src/routes` define la URL. Se solicita registrar la ruta pública del portal de estudio.',
          requisitos: [
            'Asigne a la variable `ruta` la cadena `/estudio`.',
            'Escriba en consola el valor de `ruta`.'
          ],
          salidaEsperada: 'En consola aparece exactamente `/estudio`.',
          notas: 'Véase «Rutas que debes poder señalar».',
          seccionRef: 'Rutas que debes poder señalar'
        },
        ['ruta es /estudio', 'console.log de ruta'],
        `// Día 34 — Ruta estudio\nconst ruta = '';\nconsole.log(ruta);`
      ),
      ej(
        3,
        'Qué hace el corrector',
        {
          planteamiento:
            'El tutor IA de DevDays corrige ejercicios mediante un endpoint del servidor. Se solicita describir su función.',
          requisitos: [
            'Asigne a `respuesta` un texto breve que explique qué hace el endpoint `/api/corregir`.',
            'Escriba en consola el contenido de `respuesta`.'
          ],
          salidaEsperada:
            'Menciona revisar el código del alumno, usar IA o evaluar criterios de lógica (no solo sintaxis).',
          notas: 'Véase «Debug narrado con IA».',
          seccionRef: 'Debug narrado con IA'
        },
        ['Texto sobre corrección de ejercicios'],
        `// Día 34 — API corregir\nconst respuesta = \`...\`;\nconsole.log(respuesta);`
      )
    ]
  },
  {
    dia: 35,
    semana: 5,
    tipo: 'examen',
    titulo: 'Repaso final: el taller completo',
    objetivo:
      'Demostrar visión del viaje completo: JS base, async, Svelte, rutas SvelteKit y stack del proyecto.',
    instrucciones: `Cinco retos finales que repasan semanas anteriores. Sin bloqueo: es repaso y celebración del recorrido. La IA corrige por lógica, no por sintaxis perfecta.`,
    ejercicios: [
      ej(
        1,
        'Última etiqueta en el almacén',
        {
          planteamiento:
            'Repaso de la semana 1: variables y salida por consola. Se solicita declarar dos cadenas y mostrarlas.',
          requisitos: [
            'Declare `nombre` y `rol` como cadenas con los valores que desee (la plantilla sugiere Moi y dev).',
            'Escriba en consola ambos valores (pueden ir en la misma línea o en dos `console.log`).'
          ],
          salidaEsperada: 'En consola aparecen el nombre y el rol asignados.',
          notas: 'Repaso del día 1 — variables y template literals opcionales.',
          seccionRef: 'Repaso semana 5'
        },
        ['Dos variables string', 'Salida con ambos valores'],
        `// Examen — Variables\nconst nombre = 'Moi';\nconst rol = 'dev';\n\n`
      ),
      ej(
        2,
        'El mozo async vuelve del archivador',
        {
          planteamiento:
            'Repaso de async/await: una función que devuelve una promesa resuelta. Se solicita consumir su resultado.',
          requisitos: [
            'Complete la función `obtener` para que devuelva `{ ok: true }`.',
            'Invoque `obtener()` y escriba en consola el resultado (con `await` en una función async o con `.then`).'
          ],
          salidaEsperada: 'En consola aparece un objeto que incluye `ok: true`.',
          notas: 'Repaso de la semana 2 — promesas y async.',
          seccionRef: 'Repaso semana 5'
        },
        ['Función async', 'Retorno { ok: true }', 'Se consume la promesa'],
        `// Examen — Async\nasync function obtener() {\n  return { ok: true };\n}\n\n`
      ),
      ej(
        3,
        'Runa en una frase',
        {
          planteamiento:
            'Repaso de Svelte 5: las runes modelan estado reactivo. Se solicita explicar `$state` en una frase.',
          requisitos: [
            'Asigne a `r` una frase que explique qué hace `$state` en Svelte 5.',
            'Escriba en consola el contenido de `r`.'
          ],
          salidaEsperada:
            'Texto que mencione estado reactivo o que la interfaz se actualiza al cambiar el valor.',
          notas: 'Repaso de la semana 3 — runes.',
          seccionRef: 'Repaso semana 5'
        },
        ['Texto sobre $state/reactivo'],
        `// Examen — Svelte\nconst r = \`...\`;\nconsole.log(r);`
      ),
      ej(
        4,
        'Habitación del blog',
        {
          planteamiento:
            'Repaso de rutas SvelteKit: la URL `/blog` corresponde a un archivo concreto. Se solicita indicar su ruta en el sistema de archivos.',
          requisitos: [
            'Asigne a la variable `p` la ruta del archivo `+page.svelte` que sirve la URL `/blog` (desde `src/routes`).',
            'Escriba en consola el valor de `p`.'
          ],
          salidaEsperada:
            'Cadena que incluye `routes/blog` (o `routes\\blog`) y `+page.svelte`.',
          notas: 'Repaso de la semana 4 — convención de carpetas.',
          seccionRef: 'Repaso semana 5'
        },
        ['String con ruta de archivo SvelteKit'],
        `// Examen — Ruta blog\nconst p = '';\nconsole.log(p);`
      ),
      ej(
        5,
        'Las tres piezas del portal',
        {
          planteamiento:
            'Repaso del stack DevDays: tres tecnologías centrales del portal. Se solicita listarlas y contarlas.',
          requisitos: [
            'Cree el arreglo `stack` con exactamente tres cadenas: tecnologías del proyecto (por ejemplo SvelteKit, Supabase, IA).',
            'Escriba en consola `stack.length`.'
          ],
          salidaEsperada: 'En consola aparece el número 3.',
          notas: 'Repaso de la semana 5 — visión del proyecto completo.',
          seccionRef: 'Repaso semana 5'
        },
        ['Array de 3 strings', 'stack.length === 3'],
        `// Examen — Stack\nconst stack = [];\nconsole.log(stack.length);`
      )
    ]
  }
];
