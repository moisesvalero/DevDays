import type { CourseBlock, TaskCourseDay, TaskItem } from '$lib/types/task-course';

type RawTaskCourseDay = Omit<
	TaskCourseDay,
	| 'introSummary'
	| 'missionTitle'
	| 'checklist'
	| 'mentorHints'
	| 'completionCue'
	| 'difficulty'
	| 'estimatedMinutes'
>;

export const blockLabels: Record<CourseBlock, string> = {
	javascript: 'Días 1-7 · JavaScript aplicado',
	svelte: 'Días 8-14 · Interfaz con Svelte 5',
	sveltekit: 'Días 15-21 · App completa con SvelteKit'
};

export const starterTasks: TaskItem[] = [
	{ id: 1, title: 'Escribir la primera tarea', done: true, tag: 'inicio' },
	{ id: 2, title: 'Probar el botón de añadir', done: false, tag: 'práctica' },
	{ id: 3, title: 'Marcar una tarea como hecha', done: false, tag: 'producto' }
];

const rawTaskCourseDays: RawTaskCourseDay[] = [
	{
		day: 1,
		block: 'javascript',
		title: 'La primera tarea en memoria',
		objective: 'Entender cómo una variable guarda un dato que la app necesita recordar.',
		productStory:
			'El gestor empieza con una sola tarea escrita a mano para ver qué dato vive dentro de la app.',
		concept: 'Variables y cadenas de texto.',
		guidedSteps: [
			'Crea una variable con el texto de una tarea real.',
			'Muestra ese texto con console.log para comprobar que la app lo recuerda.',
			'Cambia el texto y observa que todo lo demás sigue igual.'
		],
		miniChallenge: 'Cambia la tarea por algo que harías hoy y vuelve a mostrarla.',
		expectedState: 'El gestor de tareas tiene una tarea fija guardada en una variable.',
		codeFocus: 'Una tarea como texto',
		codeSample: "let tarea = 'Preparar el tablero del gestor';\n\nconsole.log(tarea);",
		mentorPrompts: [
			'Una variable es una etiqueta pegada a un valor. Hoy solo necesitamos que recuerde una tarea.',
			'Si te pierdes, lee de derecha a izquierda: primero el texto, luego el nombre que le ponemos.'
		]
	},
	{
		day: 2,
		block: 'javascript',
		title: 'Varias tareas en una lista',
		objective: 'Usar un array para guardar más de una tarea sin crear muchas variables sueltas.',
		productStory:
			'El gestor ya no sirve de mucho con una sola tarea, así que pasamos a una lista pequeña.',
		concept: 'Arrays y posiciones.',
		guidedSteps: [
			'Crea un array con tres textos de tareas.',
			'Lee la primera tarea usando su posición.',
			'Añade una tarea nueva con push.'
		],
		miniChallenge: 'Añade una cuarta tarea y muestra cuántas tareas tiene la lista.',
		expectedState: 'El gestor de tareas mantiene varias tareas en un array.',
		codeFocus: 'Lista de tareas',
		codeSample:
			"let tareas = ['Crear lista', 'Añadir botón', 'Probar guardado'];\n\ntareas.push('Revisar tareas pendientes');\nconsole.log(tareas.length);",
		mentorPrompts: [
			'Un array es una fila ordenada. La primera posición es 0, no 1.',
			'Cuando uses push, imagina que colocas una tarjeta nueva al final del tablero.'
		]
	},
	{
		day: 3,
		block: 'javascript',
		title: 'Cada tarea como objeto',
		objective: 'Representar una tarea con varios datos: id, texto y si está completada.',
		productStory:
			'El gestor necesita saber más que el título: también debe distinguir tareas y recordar su estado.',
		concept: 'Objetos con propiedades.',
		guidedSteps: [
			'Crea una tarea con id, title y done.',
			'Lee cada propiedad con punto.',
			'Cambia done de false a true.'
		],
		miniChallenge: 'Añade una propiedad tag para clasificar la tarea.',
		expectedState: 'El gestor de tareas usa objetos para describir cada tarea completa.',
		codeFocus: 'Objeto tarea',
		codeSample:
			"let tarea = {\n\tid: 1,\n\ttitle: 'Crear estructura del gestor',\n\tdone: false\n};\n\ntarea.done = true;",
		mentorPrompts: [
			'Un objeto es una ficha con campos. Cada campo responde a una pregunta concreta.',
			'No memorices propiedades: pregúntate qué necesita saber el gestor sobre una tarea.'
		]
	},
	{
		day: 4,
		block: 'javascript',
		title: 'Crear tareas con una función',
		objective: 'Usar una función para crear tareas nuevas siempre con la misma forma.',
		productStory:
			'Cada vez que alguien escribe una tarea, el gestor debe convertir ese texto en una ficha útil.',
		concept: 'Funciones y parámetros.',
		guidedSteps: [
			'Escribe una función que reciba title.',
			'Devuelve un objeto tarea con done en false.',
			'Usa la función dos veces con textos distintos.'
		],
		miniChallenge: 'Haz que la función reciba también una etiqueta.',
		expectedState: 'El gestor de tareas puede crear tareas nuevas mediante una función reusable.',
		codeFocus: 'Fábrica de tareas',
		codeSample:
			"function crearTarea(id, title) {\n\treturn { id, title, done: false };\n}\n\nlet tarea = crearTarea(1, 'Añadir formulario');",
		mentorPrompts: [
			'Una función evita repetir pasos. Le das un texto y ella arma la tarea.',
			'Si algo se repite tres veces, suele querer convertirse en función.'
		]
	},
	{
		day: 5,
		block: 'javascript',
		title: 'Pendiente o completada',
		objective: 'Usar condicionales para mostrar un mensaje distinto según el estado de una tarea.',
		productStory:
			'El gestor debe hablar claro: no es lo mismo una tarea pendiente que una ya terminada.',
		concept: 'if, else y booleanos.',
		guidedSteps: [
			'Crea una tarea con done en false.',
			'Escribe un if que revise done.',
			'Muestra un texto para pendiente y otro para completada.'
		],
		miniChallenge: 'Cambia done a true y comprueba que aparece el otro mensaje.',
		expectedState: 'El gestor de tareas distingue tareas pendientes y completadas.',
		codeFocus: 'Estado de una tarea',
		codeSample:
			"let tarea = { title: 'Probar estados', done: false };\n\nif (tarea.done) {\n\tconsole.log('Completada');\n} else {\n\tconsole.log('Pendiente');\n}",
		mentorPrompts: [
			'Un booleano solo puede ser true o false. Perfecto para una tarea hecha o pendiente.',
			'El if no juzga tu código: solo mira una condición y elige camino.'
		]
	},
	{
		day: 6,
		block: 'javascript',
		title: 'Recorrer todas las tareas',
		objective: 'Usar map para transformar una lista de tareas en textos listos para pintar.',
		productStory:
			'La app tiene que recorrer todo el tablero y preparar una línea visible para cada tarea.',
		concept: 'map y transformación de listas.',
		guidedSteps: [
			'Crea un array de objetos tarea.',
			'Usa map para devolver solo los títulos.',
			'Añade un prefijo visual según done.'
		],
		miniChallenge: 'Devuelve textos con “OK” para hechas y “...” para pendientes.',
		expectedState: 'El gestor de tareas puede preparar una vista de todas sus tareas.',
		codeFocus: 'Pintar una lista',
		codeSample:
			"let tareas = [\n\t{ title: 'Diseñar lista', done: true },\n\t{ title: 'Crear filtro', done: false }\n];\n\nlet vista = tareas.map((tarea) => `${tarea.done ? 'OK' : '...'} ${tarea.title}`);",
		mentorPrompts: [
			'map no cambia el tamaño de la lista: transforma cada elemento en otra cosa.',
			'Piensa en map como preparar tarjetas visibles a partir de datos internos.'
		]
	},
	{
		day: 7,
		block: 'javascript',
		title: 'Filtrar lo importante',
		objective: 'Usar filter para separar tareas pendientes y completadas.',
		productStory: 'El gestor empieza a ser útil cuando puede enseñar solo lo que falta por hacer.',
		concept: 'filter y predicados.',
		guidedSteps: [
			'Crea una lista con tareas hechas y pendientes.',
			'Filtra las que tengan done en false.',
			'Cuenta cuántas quedan pendientes.'
		],
		miniChallenge: 'Crea también una lista de tareas completadas.',
		expectedState: 'El gestor de tareas muestra subconjuntos de tareas según su estado.',
		codeFocus: 'Filtro de pendientes',
		codeSample:
			'let pendientes = tareas.filter((tarea) => !tarea.done);\nlet completadas = tareas.filter((tarea) => tarea.done);\n\nconsole.log(pendientes.length);',
		mentorPrompts: [
			'filter conserva solo los elementos que responden true a una pregunta.',
			'La pregunta de hoy es sencilla: ¿esta tarea sigue pendiente?'
		]
	},
	{
		day: 8,
		block: 'svelte',
		title: 'La lista entra en Svelte',
		objective: 'Crear la primera interfaz Svelte para mostrar tareas estáticas.',
		productStory: 'La lógica deja la consola y aparece en pantalla como una lista real.',
		concept: 'Componentes Svelte y bloque each.',
		guidedSteps: [
			'Crea un array de tareas en el script.',
			'Usa {#each} para pintar cada título.',
			'Añade una marca visual si done es true.'
		],
		miniChallenge: 'Muestra también la etiqueta de cada tarea.',
		expectedState: 'El gestor de tareas enseña sus tareas en una interfaz Svelte.',
		codeFocus: 'Lista en Svelte',
		codeSample:
			'<script lang="ts">\n\tlet tareas = [{ title: \'Pintar lista\', done: false }];\n</script>\n\n{#each tareas as tarea}\n\t<p>{tarea.title}</p>\n{/each}',
		mentorPrompts: [
			'Svelte deja mezclar datos y HTML de forma bastante directa.',
			'El each no inventa tareas: solo recorre las que ya existen.'
		]
	},
	{
		day: 9,
		block: 'svelte',
		title: 'Estado con runes',
		objective: 'Usar $state para que la lista pueda cambiar y Svelte actualice la pantalla.',
		productStory: 'El gestor necesita reaccionar cuando añadimos o marcamos tareas.',
		concept: '$state en Svelte 5.',
		guidedSteps: [
			'Convierte la lista de tareas en $state.',
			'Reasigna la lista al añadir una tarea.',
			'Comprueba que la pantalla cambia sin recargar.'
		],
		miniChallenge: 'Añade una tarea inicial más y verifica que aparece.',
		expectedState: 'El gestor de tareas tiene una lista reactiva con $state.',
		codeFocus: 'Lista reactiva',
		codeSample:
			"<script lang=\"ts\">\n\tlet tareas = $state([{ id: 1, title: 'Probar $state', done: false }]);\n\n\tfunction agregar() {\n\t\ttareas = [...tareas, { id: 2, title: 'Nueva tarea', done: false }];\n\t}\n</script>",
		mentorPrompts: [
			'$state marca datos que pueden moverse. Svelte mira esos movimientos.',
			'Reasignar con una lista nueva hace que el cambio sea fácil de seguir.'
		]
	},
	{
		day: 10,
		block: 'svelte',
		title: 'Botones que cambian tareas',
		objective: 'Conectar eventos de botón para marcar una tarea como hecha.',
		productStory: 'Ahora la persona que usa la app puede interactuar con el tablero.',
		concept: 'Eventos onclick.',
		guidedSteps: [
			'Crea una función toggleTask que reciba un id.',
			'Usa map para invertir done solo en esa tarea.',
			'Conecta la función a un botón.'
		],
		miniChallenge: 'Cambia el texto del botón según el estado de la tarea.',
		expectedState: 'El gestor de tareas permite marcar y desmarcar tareas desde la interfaz.',
		codeFocus: 'Toggle de tarea',
		codeSample:
			'function toggleTask(id: number) {\n\ttareas = tareas.map((tarea) =>\n\t\ttarea.id === id ? { ...tarea, done: !tarea.done } : tarea\n\t);\n}',
		mentorPrompts: [
			'El botón no cambia todo: pide cambiar una tarea concreta por id.',
			'map ayuda porque devuelve una lista completa con solo una ficha modificada.'
		]
	},
	{
		day: 11,
		block: 'svelte',
		title: 'Formulario para añadir',
		objective: 'Crear un campo de texto que añada tareas nuevas a la lista.',
		productStory: 'El gestor ya acepta tareas escritas por la persona que aprende.',
		concept: 'Formularios, bind:value y submit.',
		guidedSteps: [
			'Crea una variable draftTitle con $state.',
			'Enlaza el input con bind:value.',
			'Al enviar, añade la tarea y limpia el campo.'
		],
		miniChallenge: 'Evita añadir tareas vacías usando trim.',
		expectedState: 'El gestor de tareas permite escribir y añadir tareas nuevas.',
		codeFocus: 'Input controlado',
		codeSample:
			"let draftTitle = $state('');\n\nfunction addTask() {\n\tif (!draftTitle.trim()) return;\n\ttareas = [...tareas, { id: Date.now(), title: draftTitle.trim(), done: false }];\n\tdraftTitle = '';\n}",
		mentorPrompts: [
			'El input y draftTitle son dos caras de lo mismo: lo que escribes se guarda ahí.',
			'trim es una pequeña limpieza antes de confiar en el texto.'
		]
	},
	{
		day: 12,
		block: 'svelte',
		title: 'Contadores automáticos',
		objective: 'Usar $derived para calcular cuántas tareas quedan pendientes.',
		productStory: 'El gestor resume el trabajo sin que tengamos que actualizar números a mano.',
		concept: '$derived para datos calculados.',
		guidedSteps: [
			'Crea pendientes con $derived.',
			'Crea completadas con $derived.',
			'Muestra ambos contadores encima de la lista.'
		],
		miniChallenge: 'Muestra un mensaje de celebración cuando no quede ninguna pendiente.',
		expectedState: 'El gestor de tareas calcula automáticamente pendientes y completadas.',
		codeFocus: 'Datos derivados',
		codeSample:
			'const pendientes = $derived(tareas.filter((tarea) => !tarea.done));\nconst totalPendientes = $derived(pendientes.length);',
		mentorPrompts: [
			'$derived sirve para respuestas que salen de otros datos.',
			'No guardes dos veces lo mismo si puedes calcularlo.'
		]
	},
	{
		day: 13,
		block: 'svelte',
		title: 'Separar componentes',
		objective: 'Extraer una tarea a un componente pequeño y fácil de leer.',
		productStory: 'El gestor empieza a ordenarse por piezas, no por una pantalla enorme.',
		concept: 'Componentes y responsabilidad pequeña.',
		guidedSteps: [
			'Crea un componente TaskRow.',
			'Pásale una tarea como prop.',
			'Déjale pintar solo una fila de la lista.'
		],
		miniChallenge: 'Mueve la etiqueta de la tarea dentro de TaskRow.',
		expectedState: 'El gestor de tareas usa un componente dedicado para cada tarea.',
		codeFocus: 'Componente de fila',
		codeSample:
			'<script lang="ts">\n\tlet { tarea }: { tarea: { title: string; done: boolean } } = $props();\n</script>\n\n<p class:line-through={tarea.done}>{tarea.title}</p>',
		mentorPrompts: [
			'Un componente pequeño se entiende antes y se rompe menos.',
			'No extraigas por extraer: hoy TaskRow tiene sentido porque la fila ya tiene trabajo propio.'
		]
	},
	{
		day: 14,
		block: 'svelte',
		title: 'Props y acciones hacia arriba',
		objective: 'Pasar datos y funciones entre componentes sin perder claridad.',
		productStory:
			'TaskRow puede mostrar una tarea y avisar a la pantalla cuando hay que cambiarla.',
		concept: 'Props con funciones callback.',
		guidedSteps: [
			'Pasa tarea y onToggle a TaskRow.',
			'Desde TaskRow llama a onToggle(tarea.id).',
			'Mantén la lista principal en el componente padre.'
		],
		miniChallenge: 'Pasa también una función onDelete, aunque todavía no la uses.',
		expectedState: 'El gestor de tareas coordina componentes con props y callbacks.',
		codeFocus: 'Comunicación simple',
		codeSample:
			'<script lang="ts">\n\tlet { tarea, onToggle }: { tarea: Task; onToggle: (id: number) => void } = $props();\n</script>\n\n<button onclick={() => onToggle(tarea.id)}>Cambiar</button>',
		mentorPrompts: [
			'El padre guarda la lista; la fila solo pide una acción.',
			'Esta separación ayuda a no buscar cambios por toda la app.'
		]
	},
	{
		day: 15,
		block: 'sveltekit',
		title: 'Una ruta para el tablero',
		objective: 'Entender cómo SvelteKit convierte archivos en pantallas navegables.',
		productStory: 'El gestor obtiene su propia página y deja de ser un experimento suelto.',
		concept: 'Rutas de SvelteKit.',
		guidedSteps: [
			'Crea una carpeta routes/tareas.',
			'Añade un +page.svelte con el gestor.',
			'Comprueba que /tareas abre el tablero.'
		],
		miniChallenge: 'Añade un enlace desde la portada del curso hacia esa ruta.',
		expectedState: 'El gestor de tareas vive en una ruta propia de SvelteKit.',
		codeFocus: 'Página de tareas',
		codeSample:
			'<!-- src/routes/tareas/+page.svelte -->\n<script lang="ts">\n\tlet title = \'Gestor de tareas\';\n</script>\n\n<h1>{title}</h1>',
		mentorPrompts: [
			'En SvelteKit, una carpeta dentro de routes puede convertirse en una URL.',
			'No necesitas router manual para este primer paso.'
		]
	},
	{
		day: 16,
		block: 'sveltekit',
		title: 'Datos iniciales con load',
		objective: 'Cargar tareas iniciales desde una función load sencilla.',
		productStory: 'La página puede recibir datos preparados antes de pintar la interfaz.',
		concept: '+page.ts y load.',
		guidedSteps: [
			'Crea un +page.ts junto a la página.',
			'Devuelve una lista de tareas iniciales.',
			'Lee data en +page.svelte.'
		],
		miniChallenge: 'Añade una tarea inicial distinta según el día del curso.',
		expectedState: 'El gestor de tareas recibe tareas iniciales desde load.',
		codeFocus: 'Carga de datos',
		codeSample:
			"export const load = () => {\n\treturn {\n\t\ttareas: [{ id: 1, title: 'Cargada desde load', done: false }]\n\t};\n};",
		mentorPrompts: [
			'load prepara datos para la pantalla. Hoy lo usamos de forma muy pequeña.',
			'La página no tiene que inventar todo si data se lo entrega.'
		]
	},
	{
		day: 17,
		block: 'sveltekit',
		title: 'Guardar en el navegador',
		objective: 'Usar localStorage para conservar tareas sin pedir login.',
		productStory: 'El gestor recuerda el tablero aunque cierres y vuelvas a abrir la página.',
		concept: 'localStorage y efecto de hidratación.',
		guidedSteps: [
			'Lee localStorage solo en el navegador.',
			'Guarda la lista cuando cambie.',
			'Usa un fallback con tareas iniciales si no hay nada guardado.'
		],
		miniChallenge: 'Añade un botón para borrar el guardado local y empezar de cero.',
		expectedState: 'El gestor de tareas conserva tareas en localStorage sin login.',
		codeFocus: 'Persistencia local',
		codeSample:
			"if (browser) {\n\tconst saved = localStorage.getItem('tasks');\n\tif (saved) tareas = JSON.parse(saved);\n}",
		mentorPrompts: [
			'localStorage vive en el navegador, por eso no se lee durante el servidor.',
			'Guardar localmente es suficiente para aprender sin meter cuentas al principio.'
		]
	},
	{
		day: 18,
		block: 'sveltekit',
		title: 'Filtros con URL simple',
		objective: 'Usar un parámetro de búsqueda para cambiar entre todas, pendientes y hechas.',
		productStory: 'El tablero puede compartir vistas: una URL para ver solo pendientes.',
		concept: 'searchParams y estado de filtro.',
		guidedSteps: [
			'Lee ?filtro=pendientes desde la URL.',
			'Calcula qué tareas se muestran.',
			'Crea enlaces para cambiar de filtro.'
		],
		miniChallenge: 'Añade un filtro para tareas completadas.',
		expectedState: 'El gestor de tareas filtra la lista usando una URL simple.',
		codeFocus: 'Filtro por URL',
		codeSample: "const filtro = url.searchParams.get('filtro') ?? 'todas';\n\nreturn { filtro };",
		mentorPrompts: [
			'La URL también puede ser estado de la app cuando interesa compartirlo.',
			'Empieza con tres filtros claros: todas, pendientes y hechas.'
		]
	},
	{
		day: 19,
		block: 'sveltekit',
		title: 'Mentor de errores suaves',
		objective: 'Diseñar mensajes de ayuda que expliquen intención antes que castigar fallos.',
		productStory: 'El gestor se convierte también en un espacio de práctica acompañada.',
		concept: 'Feedback contextual.',
		guidedSteps: [
			'Escribe mensajes de pista para añadir, marcar y filtrar.',
			'Muestra una pista según la acción actual.',
			'Evita tratar cada intento como una nota rígida.'
		],
		miniChallenge: 'Añade una segunda pista que aparezca solo si la persona pide más ayuda.',
		expectedState: 'El gestor de tareas incluye pistas suaves y contextuales para practicar.',
		codeFocus: 'Pistas graduales',
		codeSample:
			"const pistas = [\n\t'Primero revisa qué dato cambia.',\n\t'Después busca la función que modifica la lista.'\n];",
		mentorPrompts: [
			'Una buena pista reduce el tamaño del problema sin quitar todo el descubrimiento.',
			'La meta es acompañar, no convertir cada paso en una prueba rígida.'
		]
	},
	{
		day: 20,
		block: 'sveltekit',
		title: 'Pulido y accesibilidad',
		objective: 'Mejorar lectura, foco y estados vacíos para que el gestor sea cómodo de usar.',
		productStory:
			'La app empieza a sentirse como una herramienta real, no solo como código que funciona.',
		concept: 'Accesibilidad básica y estados de interfaz.',
		guidedSteps: [
			'Asegura labels en formularios.',
			'Muestra un estado vacío cuando no hay tareas visibles.',
			'Revisa contraste, foco y textos de botones.'
		],
		miniChallenge: 'Añade un mensaje amable cuando todas las tareas están completadas.',
		expectedState: 'El gestor de tareas tiene estados claros y controles accesibles.',
		codeFocus: 'Estado vacío',
		codeSample: '{#if tareas.length === 0}\n\t<p>No hay tareas en esta vista.</p>\n{/if}',
		mentorPrompts: [
			'Una app clara no solo funciona: también se deja usar sin pelearse con ella.',
			'Los estados vacíos son parte del producto, no un detalle menor.'
		]
	},
	{
		day: 21,
		block: 'sveltekit',
		title: 'Mini proyecto final',
		objective: 'Unir lo aprendido en una versión pequeña, usable y explicable del gestor.',
		productStory:
			'La última sesión cierra con una demo que puedes enseñar: añadir, marcar, filtrar y guardar.',
		concept: 'Integración y revisión final.',
		guidedSteps: [
			'Revisa que añadir tareas funcione.',
			'Revisa que marcar y filtrar no pierdan datos.',
			'Explica con tus palabras qué hace cada pieza principal.'
		],
		miniChallenge:
			'Añade una mejora personal pequeña: borrar tareas, editar texto o cambiar etiquetas.',
		expectedState: 'El gestor de tareas final permite añadir, marcar, filtrar y guardar tareas.',
		codeFocus: 'Cierre del producto',
		codeSample:
			"const listoParaDemo = tareas.length > 0 && tareas.some((tarea) => tarea.done);\n\nconsole.log(listoParaDemo ? 'Demo lista' : 'Falta practicar un poco');",
		mentorPrompts: [
			'Terminar no significa saberlo todo: significa poder explicar la versión pequeña.',
			'Si puedes contar qué dato cambia en cada acción, ya tienes una base muy sólida.'
		]
	}
];

function difficultyFor(day: number): TaskCourseDay['difficulty'] {
	if (day <= 8) return 'suave';
	if (day <= 17) return 'media';
	return 'reto';
}

function estimatedMinutesFor(day: number): number {
	if (day <= 7) return 18;
	if (day <= 14) return 24;
	return 30;
}

export const taskCourseDays: TaskCourseDay[] = rawTaskCourseDays.map((day) => ({
	...day,
	introSummary: `${day.concept} aplicado al gestor, sin saltos grandes y con una práctica visible.`,
	missionTitle: `Misión ${day.day}: ${day.title}`,
	checklist: [
		`Entiende la idea: ${day.concept.replace(/\.$/, '')}.`,
		...day.guidedSteps,
		`Comprueba el resultado: ${day.expectedState}`
	],
	mentorHints: [
		day.mentorPrompts[0],
		day.mentorPrompts[1] ?? 'Vuelve al objetivo y busca qué dato cambia en esta misión.',
		`Ejemplo parcial para orientarte: ${day.codeFocus}.`
	],
	completionCue: `Has practicado el día ${day.day}. El gestor de tareas ya tiene una pieza más.`,
	difficulty: difficultyFor(day.day),
	estimatedMinutes: estimatedMinutesFor(day.day)
}));

export function getTaskCourseDay(day: number): TaskCourseDay {
	return taskCourseDays.find((courseDay) => courseDay.day === day) ?? taskCourseDays[0];
}
