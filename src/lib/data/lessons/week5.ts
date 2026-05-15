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
          'let nombre: string = "Ana";\nlet edad: number = 30;\nlet activo: boolean = true;'
        ),
        sec(
          'Interfaces: forma de un objeto',
          'Una ficha de cliente fija qué campos existen: nombre obligatorio, email opcional. interface User es esa ficha en código.',
          'Contratos claros entre funciones y componentes: todos saben qué propiedades tiene un usuario o una lección.',
          'interface User { nombre: string; email?: string } — el ? marca opcional. Luego const u: User = { nombre: "Ana" }.',
          'interface Leccion {\n  dia: number;\n  titulo: string;\n}'
        ),
        sec(
          'Tipos en Svelte 5',
          'Las runes también pueden llevar etiqueta: $state<number>(0) o props con tipo en $props().',
          'Menos bugs al pasar datos entre DayList, LessonContent y el tutor IA.',
          'let { titulo, dia }: { titulo: string; dia: number } = $props();\nlet contador = $state<number>(0);',
          'import type { Snippet } from "svelte";'
        ),
        sec(
          'Qué NO hace TypeScript',
          'La etiqueta no impide que alguien meta algo malo en runtime si los datos vienen de fuera sin validar.',
          'Sigue necesitando validación en formularios, APIs y respuestas de IA. TS es red de seguridad en desarrollo, no policía en producción.',
          'En build, tsc/svelte-check convierte o rechaza; en el navegador solo queda JS plano.',
          '// npm run check — comprueba tipos antes de deploy'
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
        'Etiquetas en el inventario del taller.',
        'Declara una variable edad con tipo number y valor 30. Muéstrala por consola.',
        ['Se imprime 30', 'La variable representa una edad numérica'],
        ['Existe variable edad', 'El valor mostrado es 30', 'Se usa number o equivalente lógico'],
        `// Día 29 — Inventario\n// edad: number = 30 y console.log\n\n`
      ),
      ej(
        2,
        'Ficha de usuario en el archivador.',
        'Crea un objeto usuario con nombre (string). Muéstralo. Puedes usar interface, type o JSDoc.',
        ['Se muestra el nombre del usuario', 'El objeto tiene al menos la propiedad nombre'],
        ['Hay objeto usuario', 'Tiene propiedad nombre', 'Se accede y muestra nombre'],
        `// Día 29 — Ficha usuario\n/** @type {{ nombre: string }} */\nconst usuario = { nombre: 'Ana' };\n\n`
      ),
      ej(
        3,
        'El capataz pregunta para qué sirve TypeScript.',
        'En una variable respuesta, escribe 1–2 frases: para qué usarías TS en un proyecto como DevDays.',
        ['La respuesta menciona errores antes de ejecutar o ayuda del editor'],
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
          '# .env.example documenta qué copiar'
        ),
        sec(
          'hooks.server.ts — el portero',
          'En cada visita, el portero mira el DNI (sesión), anota datos en locals y deja pasar o redirige a login.',
          'handle({ event, resolve }) recibe la petición, puedes leer cookies, llamar a Supabase, setear event.locals.user y luego return resolve(event).',
          'En DevDays: auth, allowlist de emails, locale y cabeceras CSP viven aquí.',
          'export async function handle({ event, resolve }) {\n  // ...\n  return resolve(event);\n}'
        ),
        sec(
          'Leer env en el servidor',
          'No importes secretos en +page.svelte del cliente. En +server.ts o lib/server usas módulos de entorno dinámicos.',
          'import { OPENAI_API_KEY } from "$env/dynamic/private" — solo existe en build/runtime servidor. Si falta la key, /api/corregir puede hacer fallback a Gemini.',
          '$env/dynamic/private — variables sin PUBLIC_\n$env/dynamic/public — variables PUBLIC_',
          'import { GEMINI_API_KEY } from "$env/dynamic/private";'
        ),
        sec(
          'Flujo DevDays (resumen)',
          'Login magic link → callback intercambia code → hooks rellenan sesión → /estudio carga lecciones → /api/corregir usa keys en servidor.',
          'Repasar este flujo te ayuda a explicar el repo y a no commitear .env por accidente.',
          'ALLOWED_EMAILS opcional filtra quién entra. PUBLIC_SITE_URL define redirect del magic link en producción.',
          'src/routes/auth/callback/+server.ts\nsrc/hooks.server.ts'
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
        'Vitrina vs cajón cerrado.',
        'En respuesta, explica en 1–2 frases la diferencia entre una variable PUBLIC_ y una sin PUBLIC_.',
        ['Menciona cliente/servidor o visible/oculto'],
        ['Hay texto claro', 'Diferencia PUBLIC vs privado'],
        `// Día 30 — Public vs private\nconst respuesta = \`...\`;\nconsole.log(respuesta);`
      ),
      ej(
        2,
        'El portero del edificio.',
        'En una frase: qué hace hooks.server.ts en SvelteKit.',
        ['Menciona cada request, middleware o antes de la ruta'],
        ['Respuesta sobre interceptar peticiones'],
        `// Día 30 — Portero\nconst respuesta = \`...\`;\nconsole.log(respuesta);`
      ),
      ej(
        3,
        'Etiqueta en el cajón de IA.',
        'Escribe un comentario con el nombre de una variable de entorno para la API de OpenAI o Gemini (como en .env.example).',
        ['El comentario nombra OPENAI_API_KEY o GEMINI_API_KEY'],
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
          'Configura PUBLIC_SITE_URL y claves Supabase/IA en el panel Environment Variables. Preview deployments prueban ramas sin tocar producción.',
          'vercel.com → Import → env vars → Deploy'
        ),
        sec(
          'README mínimo viable',
          'Quien llega nuevo no debería adivinar: título, qué hace, cómo instalar, cómo arrancar, stack y variables necesarias.',
          'GitHub muestra el README en la portada. Clientes o entrevistadores lo leen antes de la demo.',
          '# DevDays\n\nBootcamp 35 días...\n\n## Instalar\nnpm install\n\n## Desarrollo\nnpm run dev',
          '## Variables\nVer .env.example'
        ),
        sec(
          'npm run build y npm run check',
          'build simula producción: si falla aquí, fallará en Vercel. check ejecuta svelte-check y TypeScript.',
          'Antes de cerrar una feature o abrir PR, corre check. CI en el repo puede hacer lo mismo.',
          'npm run build\nnpm run check',
          'adapter-vercel en svelte.config si aplica'
        ),
        sec(
          'Checklist antes del primer deploy',
          'Variables copiadas, build local OK, dominio o PUBLIC_SITE_URL correcto para magic link de Supabase.',
          'Evitas “funciona en mi máquina” y login roto en producción.',
          '1) .env.example actualizado 2) build 3) env en Vercel 4) redirect URLs en Supabase',
          'Site URL + Redirect URLs en dashboard Supabase'
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
        'Índice del cartel del taller.',
        'Crea un array secciones con al menos 3 strings: nombres de secciones que tendría un README mínimo (ej. Qué es, Instalar, Stack).',
        ['El array tiene 3 o más elementos', 'Se muestra la cantidad'],
        ['Array con length >= 3', 'Cada elemento es string de sección'],
        `// Día 31 — README\nconst secciones = [];\nconsole.log(secciones.length);`
      ),
      ej(
        2,
        'Arrancar el motor en local.',
        'Guarda en cmd el comando para modo desarrollo (npm run dev) y muéstralo.',
        ['Se imprime npm run dev'],
        ['Variable cmd con comando dev', 'console.log del comando'],
        `// Día 31 — Comando dev\nconst cmd = '';\nconsole.log(cmd);`
      ),
      ej(
        3,
        'Copiar llaves al escaparate.',
        'En respuesta: qué debes copiar de tu .env al panel de Vercel antes del deploy.',
        ['Menciona variables de entorno o las del .env.example'],
        ['Texto sobre env vars en producción'],
        `// Día 31 — Env prod\nconst respuesta = \`...\`;\nconsole.log(respuesta);`
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
          '1) Problema  2) Solución  3) Stack  4) Demo'
        ),
        sec(
          'Tu stack real (este repo)',
          'SvelteKit: rutas por carpetas, SSR, endpoints /api. Supabase: auth magic link y progreso opcional. IA: corrección y chat en servidor.',
          'Cada pieza responde a un requisito: UI rápida, login sin contraseña propia, feedback automático.',
          'SvelteKit — portal y APIs\nSupabase — sesión y tabla progreso\nIA — /api/corregir y /api/preguntar',
          'CodeMirror en el cliente; keys solo en servidor'
        ),
        sec(
          'Frases que funcionan (y las que no)',
          'Di "construyo con SvelteKit" en lugar de "soy experto senior en todo". La honestidad genera confianza.',
          'Si llevas poco tiempo, enfatiza lo que ya desplegaste y lo que aprendiste haciendo DevDays.',
          'Bien: "Elegí Svelte porque compila y el bundle es ligero."\nEvitar: "Sé más que React" sin demostrar nada.',
          'Muestra repo o URL desplegada si puedes'
        ),
        sec(
          'Practicar en voz alta',
          'Graba 90 segundos en el móvil. Si te atas, simplifica: una frase por bloque del guion.',
          'Repetición baja la ansiedad más que memorizar definiciones de MDN.',
          'Timer 2 min → problema → solución → stack → "¿quieres que abra la demo?"',
          ''
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
        'Elevator pitch de DevDays.',
        'En respuesta, 2 frases: qué es DevDays y para quién.',
        ['Menciona bootcamp o aprendizaje y tutor/IA o corrección'],
        ['Texto de 2 frases aprox', 'Problema o público claro'],
        `// Día 32 — Pitch DevDays\nconst respuesta = \`...\`;\nconsole.log(respuesta);`
      ),
      ej(
        2,
        'Por qué SvelteKit.',
        'Una frase: por qué elegirías SvelteKit para un portal como este.',
        ['Menciona rutas, velocidad, compilación o menos JS'],
        ['Una frase con razón técnica o de producto'],
        `// Día 32 — SvelteKit\nconst respuesta = \`...\`;\nconsole.log(respuesta);`
      ),
      ej(
        3,
        'Supabase en una frase.',
        'Explica auth + base de datos de DevDays en una sola frase.',
        ['Menciona login/auth y datos o Postgres'],
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
          'Closure: función que "recuerda" variables del scope exterior.\n[1,2,3].map(n => n * 2) → [2,4,6]\narr.filter(x => x > 0)',
          'const activos = dias.filter(d => d.estado === "completado");'
        ),
        sec(
          'Svelte 5 y SvelteKit',
          '$state: dato vivo; $derived: calculado; $props: entrada al componente. +page.server.ts: solo servidor (secretos, cookies). +page.ts: load universal.',
          'Relaciona con LessonContent, CodeEditor y load de /estudio.',
          'runes en .svelte\n+page.server.ts → actions, cookies, DB\nhooks.server → cada request',
          'let abierto = $state(false);'
        ),
        sec(
          'Git: commit, branch, pull request',
          'commit = foto del taller en un momento. branch = copia para probar sin romper main. PR = pedir que fusionen tu rama tras revisión.',
          'Flujo colaborativo: branch → commits → push → PR → review → merge.',
          'git checkout -b feature/login\ngit commit -m "feat: magic link"\ngh pr create',
          'main protegida; trabajas en ramas'
        ),
        sec(
          'Cómo responder bajo presión',
          'Respira, repite la pregunta, da analogía de 1 frase y luego el detalle técnico. Si no sabes, di qué buscarías en el repo.',
          'Mejor "en DevDays lo vi en hooks.server" que inventar.',
          'Estructura: analogía → qué hace → ejemplo del proyecto',
          ''
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
        'Closure en el taller.',
        'En respuesta, 1–2 frases: qué es un closure con tus palabras.',
        ['Menciona que la función recuerda variables o el entorno exterior'],
        ['Texto explicativo', 'Idea de scope/entorno'],
        `// Día 33 — Closure\nconst respuesta = \`...\`;\nconsole.log(respuesta);`
      ),
      ej(
        2,
        'Página solo en el almacén.',
        'Una frase: diferencia entre +page.svelte y +page.server.ts.',
        ['Menciona servidor, secretos o que server no va al cliente'],
        ['Diferencia cliente vs servidor'],
        `// Día 33 — page.server\nconst respuesta = \`...\`;\nconsole.log(respuesta);`
      ),
      ej(
        3,
        'Tres pasos para colaborar.',
        'Array pasos con 3 strings del flujo Git colaborativo (ej. branch, commit, PR).',
        ['Array de longitud 3', 'Pasos reconocibles de Git'],
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
          'problema → /login magic link → /estudio → ejercicio → /api/corregir → feedback',
          "No hace falta teclear todo; puedes scrollar el editor"
        ),
        sec(
          'Rutas que debes poder señalar',
          '/login, /auth/callback, /estudio, /api/corregir, /api/preguntar. Saber qué archivo corresponde a cada URL.',
          'src/routes/login/+page.svelte, hooks.server.ts, src/routes/estudio/+page.svelte, src/routes/api/corregir/+server.ts.',
          'Carpeta = URL en SvelteKit. +server.ts = endpoint HTTP (POST fetch desde el cliente).',
          "fetch('/api/corregir', { method: 'POST', body: ... })"
        ),
        sec(
          'Debug narrado con IA',
          'Bug → hipótesis → prueba (log, network, check) → fix. El tutor no sustituye entender; acelera el ciclo.',
          'Ejemplo: "La corrección falla" → revisar env keys → mirar respuesta de /api/corregir → ajustar prompt o criterios.',
          'Pregunta concreta al tutor: "¿Por qué load no recibe sesión?" mejor que "arregla todo".',
          'npm run check + consola del navegador + logs Vercel'
        ),
        sec(
          'Qué decir si te bloqueas',
          'Pausa, muestra el archivo correcto, explica en castellano qué hace cada bloque. Pedir 30 segundos para buscar en el repo es profesional.',
          'Mejor honestidad que inventar. "Lo implementaría en hooks" muestra criterio aunque no recuerdes la línea exacta.',
          '"Aquí el servidor valida la sesión antes de devolver las lecciones."',
          ''
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
        'Guion de la presentación.',
        'Array guion con 4 strings: los 4 pasos de tu demo (ej. problema, demo, código, mejoras).',
        ['Array length 4', 'Cuatro pasos del guion'],
        ['guion.length === 4', 'Cuatro strings descriptivos'],
        `// Día 34 — Guion\nconst guion = [];\nconsole.log(guion.length);`
      ),
      ej(
        2,
        'Puerta del portal de estudio.',
        'Variable ruta con el path /estudio y muéstrala.',
        ['Se imprime /estudio'],
        ['ruta es /estudio', 'console.log de ruta'],
        `// Día 34 — Ruta estudio\nconst ruta = '';\nconsole.log(ruta);`
      ),
      ej(
        3,
        'Qué hace el corrector.',
        'En respuesta: qué hace el endpoint /api/corregir en DevDays.',
        ['Menciona revisar código, IA o criterios de lógica'],
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
        'Última etiqueta en el almacén.',
        'Variables nombre y rol (strings). Muéstralas juntas por consola.',
        ['Se imprimen nombre y rol'],
        ['Dos variables string', 'Salida con ambos valores'],
        `// Examen — Variables\nconst nombre = 'Moi';\nconst rol = 'dev';\n\n`
      ),
      ej(
        2,
        'El mozo async vuelve del archivador.',
        'Función async que devuelve { ok: true }. Llámala y muestra el resultado (then o await).',
        ['Se muestra objeto con ok: true'],
        ['Función async', 'Retorno { ok: true }', 'Se consume la promesa'],
        `// Examen — Async\nasync function obtener() {\n  return { ok: true };\n}\n\n`
      ),
      ej(
        3,
        'Runa en una frase.',
        'En r, una frase que explique qué hace $state en Svelte 5.',
        ['Menciona reactivo o que la UI se actualiza'],
        ['Texto sobre $state/reactivo'],
        `// Examen — Svelte\nconst r = \`...\`;\nconsole.log(r);`
      ),
      ej(
        4,
        'Habitación del blog.',
        'Variable p con el path del archivo +page para la ruta /blog.',
        ['Path incluye routes/blog y +page.svelte'],
        ['String con ruta de archivo SvelteKit'],
        `// Examen — Ruta blog\nconst p = '';\nconsole.log(p);`
      ),
      ej(
        5,
        'Las tres piezas del portal.',
        'Array stack con 3 tecnologías del stack DevDays (ej. SvelteKit, Supabase, IA). Muestra cuántas hay.',
        ['length es 3', 'Tecnologías del proyecto'],
        ['Array de 3 strings', 'stack.length === 3'],
        `// Examen — Stack\nconst stack = [];\nconsole.log(stack.length);`
      )
    ]
  }
];
