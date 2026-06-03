import type { Leccion } from '$lib/types/lesson';
import { ej, contenidoLab } from './_helpers';

export const week5: Leccion[] = [
	{
		dia: 29,
		semana: 5,
		tipo: 'leccion',
		titulo: 'TypeScript: etiquetas en las cajas',
		objetivo:
			'Entender tipos como contrato de forma de datos; el editor avisa antes de desplegar, sin memorizar sintaxis.',
		contenido: contenidoLab('dia-29-typescript', 'Laboratorio: tipos en componentes de producto.', [
			'Interface Producto',
			'Props tipadas',
			'Union types'
		]),
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
					seccionRef: 'Interface Producto'
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
					seccionRef: 'Props tipadas'
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
					seccionRef: 'Union types'
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
		contenido: contenidoLab('dia-30-env', 'Laboratorio: env y hooks.server.', [
			'Variables públicas',
			'Secrets servidor',
			'hooks.server'
		]),
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
					seccionRef: 'Variables públicas'
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
					seccionRef: 'Secrets servidor'
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
					notas:
						'Solo el nombre de la variable; importe desde `$env/dynamic/private` en código real.',
					seccionRef: 'hooks.server'
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
		objetivo:
			'Publicar la app en internet y dejar documentado el proyecto para ti y para quien clone el repo.',
		contenido: contenidoLab('dia-31-deploy', 'Laboratorio: pipeline de deploy Vercel.', [
			'Pipeline',
			'Preview',
			'Env prod'
		]),
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
					seccionRef: 'Pipeline'
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
					seccionRef: 'Preview'
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
					seccionRef: 'Env prod'
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
		contenido: contenidoLab('dia-32-stack-story', 'Laboratorio: pitch de 2 minutos.', [
			'Problema de negocio',
			'Stack elegido',
			'Demo en vivo'
		]),
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
					seccionRef: 'Problema de negocio'
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
					seccionRef: 'Stack elegido'
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
					seccionRef: 'Demo en vivo'
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
		contenido: contenidoLab('dia-33-entrevista', 'Laboratorio: estructura STAR.', [
			'Situación',
			'Acción',
			'Resultado'
		]),
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
					seccionRef: 'Situación'
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
					seccionRef: 'Acción'
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
					seccionRef: 'Resultado'
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
		contenido: contenidoLab('dia-34-proyecto', 'Laboratorio: guiar demo del proyecto.', [
			'Hook (15s)',
			'Demo guiada',
			'Next steps'
		]),
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
					seccionRef: 'Hook (15s)'
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
					seccionRef: 'Demo guiada'
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
					seccionRef: 'Next steps'
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
		repasoVisual: 'repaso-s5',
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
					salidaEsperada: 'Cadena que incluye `routes/blog` (o `routes\\blog`) y `+page.svelte`.',
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
