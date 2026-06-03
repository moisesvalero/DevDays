import type { CourseBlock, PortfolioProfile, TaskCourseDay } from '$lib/types/task-course';

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
	javascript: 'Días 1-7 · Datos de tu CV',
	svelte: 'Días 8-14 · Portfolio visible',
	sveltekit: 'Días 15-21 · Web publicable'
};

export const starterPortfolio: PortfolioProfile = {
	name: 'Tu Nombre',
	role: 'Frontend junior en construcción',
	bio: 'Estoy aprendiendo a crear interfaces web claras, útiles y con personalidad.',
	location: 'Tu ciudad',
	email: 'hola@email.com',
	skills: ['HTML', 'CSS', 'JavaScript'],
	projects: [
		{
			id: 1,
			title: 'Portfolio Street Lab',
			description: 'Mi primera web personal creada paso a paso.',
			tag: 'portfolio',
			featured: true
		},
		{
			id: 2,
			title: 'Landing de práctica',
			description: 'Una página sencilla para practicar estructura y estilos.',
			tag: 'ui',
			featured: false
		}
	]
};

const rawTaskCourseDays: RawTaskCourseDay[] = [
	{
		day: 1,
		block: 'javascript',
		title: 'Tu nombre como primer dato',
		objective: 'Entender cómo una variable guarda un dato personal que la web va a mostrar.',
		productStory: 'El portfolio empieza con tu nombre y un titular sencillo.',
		concept: 'Variables y textos.',
		guidedSteps: [
			'Crea una variable para tu nombre.',
			'Crea otra variable para tu titular profesional.',
			'Muestra ambos valores para comprobar que la web ya tiene identidad.'
		],
		miniChallenge: 'Cambia el titular por una frase que te represente mejor.',
		expectedState: 'El portfolio web muestra un nombre y un titular personal.',
		codeFocus: 'Identidad básica',
		codeSample:
			"let nombre = 'Tu Nombre';\nlet titular = 'Frontend junior en construcción';\n\nconsole.log(nombre, titular);",
		mentorPrompts: [
			'Una variable es una etiqueta pegada a un valor. Hoy solo guarda quién eres.',
			'No busques sonar perfecto: empieza con una frase simple y editable.'
		]
	},
	{
		day: 2,
		block: 'javascript',
		title: 'Skills en una lista',
		objective: 'Usar un array para guardar varias habilidades sin crear variables sueltas.',
		productStory: 'El portfolio necesita enseñar qué estás aprendiendo o qué sabes usar.',
		concept: 'Arrays.',
		guidedSteps: [
			'Crea un array con tres skills.',
			'Lee la primera skill por su posición.',
			'Añade una skill nueva con push.'
		],
		miniChallenge: 'Añade una skill que quieras aprender, aunque todavía no la domines.',
		expectedState: 'El portfolio web mantiene una lista de skills.',
		codeFocus: 'Lista de skills',
		codeSample:
			"let skills = ['HTML', 'CSS', 'JavaScript'];\n\nskills.push('Svelte');\nconsole.log(skills.length);",
		mentorPrompts: [
			'Un array es una fila ordenada. Sirve muy bien para skills, proyectos o enlaces.',
			'La primera posición es 0. Es raro al principio, pero se vuelve normal con práctica.'
		]
	},
	{
		day: 3,
		block: 'javascript',
		title: 'Tu perfil como objeto',
		objective: 'Usar un objeto para juntar datos relacionados de tu perfil.',
		productStory: 'Nombre, titular, ciudad y bio pertenecen a la misma ficha personal.',
		concept: 'Objetos con propiedades.',
		guidedSteps: [
			'Crea un objeto perfil.',
			'Añade name, role, location y bio.',
			'Lee una propiedad con punto.'
		],
		miniChallenge: 'Añade una propiedad email con un correo de ejemplo.',
		expectedState: 'El portfolio web usa un objeto para representar tu perfil.',
		codeFocus: 'Ficha personal',
		codeSample:
			"let perfil = {\n\tname: 'Tu Nombre',\n\trole: 'Frontend junior',\n\tlocation: 'Tu ciudad'\n};\n\nconsole.log(perfil.role);",
		mentorPrompts: [
			'Un objeto es una ficha con campos. Cada campo responde a una pregunta concreta.',
			'Si varios datos describen lo mismo, probablemente quieren vivir juntos.'
		]
	},
	{
		day: 4,
		block: 'javascript',
		title: 'Crear proyectos con una función',
		objective: 'Usar una función para crear proyectos con la misma forma.',
		productStory: 'Cada proyecto del portfolio necesita título, descripción y etiqueta.',
		concept: 'Funciones y parámetros.',
		guidedSteps: [
			'Escribe una función que reciba title y tag.',
			'Devuelve un objeto proyecto.',
			'Usa la función dos veces con proyectos distintos.'
		],
		miniChallenge: 'Haz que la función reciba también una descripción corta.',
		expectedState: 'El portfolio web puede crear fichas de proyecto con una función reusable.',
		codeFocus: 'Fábrica de proyectos',
		codeSample:
			"function crearProyecto(title, tag) {\n\treturn { title, tag, featured: false };\n}\n\nlet proyecto = crearProyecto('Portfolio Street Lab', 'web');",
		mentorPrompts: [
			'Una función evita repetir la misma estructura una y otra vez.',
			'Piensa en ella como un molde para crear tarjetas de proyecto.'
		]
	},
	{
		day: 5,
		block: 'javascript',
		title: 'Proyecto destacado',
		objective: 'Usar condicionales para mostrar un proyecto como destacado o normal.',
		productStory: 'Tu portfolio debe poder señalar el trabajo más importante.',
		concept: 'if, else y booleanos.',
		guidedSteps: [
			'Crea un proyecto con featured en true.',
			'Escribe un if que revise featured.',
			'Muestra un texto para destacado y otro para normal.'
		],
		miniChallenge: 'Cambia featured a false y comprueba que aparece el otro mensaje.',
		expectedState: 'El portfolio web distingue proyectos destacados y normales.',
		codeFocus: 'Estado destacado',
		codeSample:
			"let proyecto = { title: 'Mi portfolio', featured: true };\n\nif (proyecto.featured) {\n\tconsole.log('Proyecto destacado');\n} else {\n\tconsole.log('Proyecto normal');\n}",
		mentorPrompts: [
			'Un booleano solo puede ser true o false. Perfecto para destacar algo o no.',
			'El if no juzga nada: mira una condición y elige un camino.'
		]
	},
	{
		day: 6,
		block: 'javascript',
		title: 'Preparar tarjetas visibles',
		objective: 'Usar map para transformar proyectos en textos listos para pintar.',
		productStory: 'Los datos internos empiezan a convertirse en tarjetas del portfolio.',
		concept: 'map y transformación de listas.',
		guidedSteps: [
			'Crea una lista de proyectos.',
			'Usa map para preparar textos de tarjeta.',
			'Añade una marca visual si featured es true.'
		],
		miniChallenge: 'Devuelve textos con estrella para los destacados.',
		expectedState: 'El portfolio web prepara una vista de sus proyectos.',
		codeFocus: 'Tarjetas desde datos',
		codeSample:
			"let tarjetas = proyectos.map((proyecto) =>\n\t`${proyecto.featured ? '★' : '•'} ${proyecto.title}`\n);",
		mentorPrompts: [
			'map no cambia cuántos elementos hay: transforma cada elemento en otra cosa.',
			'Los datos no son la tarjeta todavía. map ayuda a preparar esa vista.'
		]
	},
	{
		day: 7,
		block: 'javascript',
		title: 'Filtrar lo que quieres enseñar',
		objective: 'Usar filter para separar proyectos destacados del resto.',
		productStory: 'El portfolio puede enseñar primero lo más fuerte.',
		concept: 'filter y predicados.',
		guidedSteps: [
			'Crea una lista con proyectos destacados y normales.',
			'Filtra los que tengan featured en true.',
			'Cuenta cuántos proyectos destacados tienes.'
		],
		miniChallenge: 'Crea también una lista por etiqueta, por ejemplo web o ui.',
		expectedState: 'El portfolio web filtra proyectos por estado o etiqueta.',
		codeFocus: 'Filtro de proyectos',
		codeSample:
			'let destacados = proyectos.filter((proyecto) => proyecto.featured);\n\nconsole.log(destacados.length);',
		mentorPrompts: [
			'filter conserva solo lo que responde true a una pregunta.',
			'La pregunta de hoy es: ¿este proyecto merece aparecer arriba?'
		]
	},
	{
		day: 8,
		block: 'svelte',
		title: 'El perfil aparece en pantalla',
		objective: 'Crear la primera interfaz Svelte para mostrar tu perfil.',
		productStory: 'El portfolio deja la consola y empieza a verse como una web personal.',
		concept: 'Componentes Svelte y HTML dinámico.',
		guidedSteps: [
			'Crea un objeto perfil en el script.',
			'Muestra name y role dentro del HTML.',
			'Añade una bio corta debajo.'
		],
		miniChallenge: 'Muestra también la ciudad o el email.',
		expectedState: 'El portfolio web enseña tu perfil en una interfaz Svelte.',
		codeFocus: 'Perfil en Svelte',
		codeSample:
			"<script lang=\"ts\">\n\tlet perfil = { name: 'Tu Nombre', role: 'Frontend junior' };\n</script>\n\n<h1>{perfil.name}</h1>\n<p>{perfil.role}</p>",
		mentorPrompts: [
			'Svelte permite meter datos dentro del HTML con llaves.',
			'No estás haciendo magia: solo estás enseñando valores que ya existen.'
		]
	},
	{
		day: 9,
		block: 'svelte',
		title: 'Editar tu titular',
		objective: 'Usar $state para que el titular cambie y la pantalla se actualice.',
		productStory: 'El portfolio empieza a sentirse editable por la persona que aprende.',
		concept: '$state en Svelte 5.',
		guidedSteps: [
			'Convierte role en un dato con $state.',
			'Muestra role en pantalla.',
			'Cambia role desde un input.'
		],
		miniChallenge: 'Haz lo mismo con la ciudad.',
		expectedState: 'El portfolio web actualiza el titular con estado reactivo.',
		codeFocus: 'Titular reactivo',
		codeSample:
			'<script lang="ts">\n\tlet role = $state(\'Frontend junior\');\n</script>\n\n<input bind:value={role} />\n<p>{role}</p>',
		mentorPrompts: [
			'$state marca datos que pueden cambiar mientras usas la app.',
			'bind:value conecta lo que escribes con el dato que se muestra.'
		]
	},
	{
		day: 10,
		block: 'svelte',
		title: 'Pintar skills',
		objective: 'Usar each para mostrar una lista de skills como chips visuales.',
		productStory: 'Las habilidades dejan de ser texto suelto y se convierten en etiquetas.',
		concept: 'Bloque each.',
		guidedSteps: [
			'Crea un array de skills.',
			'Usa {#each} para pintar cada skill.',
			'Dale estilo de chip o pegatina.'
		],
		miniChallenge: 'Añade una skill nueva y comprueba que aparece sola.',
		expectedState: 'El portfolio web muestra skills como chips visibles.',
		codeFocus: 'Skills en pantalla',
		codeSample: '{#each skills as skill}\n\t<span class="chip">{skill}</span>\n{/each}',
		mentorPrompts: [
			'each recorre una lista y repite una pieza visual por cada elemento.',
			'Si hay tres skills, habrá tres chips. Si añades una, aparece otra.'
		]
	},
	{
		day: 11,
		block: 'svelte',
		title: 'Formulario para añadir skills',
		objective: 'Crear un campo de texto que añada skills nuevas al portfolio.',
		productStory: 'El alumno puede personalizar su CV web sin tocar el array a mano.',
		concept: 'Formularios, bind:value y submit.',
		guidedSteps: [
			'Crea una variable draftSkill.',
			'Enlaza un input con bind:value.',
			'Al enviar, añade la skill y limpia el campo.'
		],
		miniChallenge: 'Evita añadir skills vacías usando trim.',
		expectedState: 'El portfolio web permite escribir y añadir skills nuevas.',
		codeFocus: 'Input de skills',
		codeSample:
			"let draftSkill = $state('');\n\nfunction addSkill() {\n\tif (!draftSkill.trim()) return;\n\tskills = [...skills, draftSkill.trim()];\n\tdraftSkill = '';\n}",
		mentorPrompts: [
			'El input guarda lo que escribes en draftSkill.',
			'trim limpia espacios antes de confiar en el texto.'
		]
	},
	{
		day: 12,
		block: 'svelte',
		title: 'Proyectos destacados automáticos',
		objective: 'Usar $derived para calcular cuántos proyectos destacados hay.',
		productStory: 'El portfolio resume tus mejores piezas sin actualizar números a mano.',
		concept: '$derived para datos calculados.',
		guidedSteps: [
			'Crea destacados con $derived.',
			'Crea totalDestacados con $derived.',
			'Muestra el contador encima de los proyectos.'
		],
		miniChallenge: 'Muestra un mensaje si todavía no hay proyecto destacado.',
		expectedState: 'El portfolio web calcula automáticamente proyectos destacados.',
		codeFocus: 'Datos derivados',
		codeSample:
			'const destacados = $derived(projects.filter((project) => project.featured));\nconst totalDestacados = $derived(destacados.length);',
		mentorPrompts: [
			'$derived sirve para respuestas que salen de otros datos.',
			'No guardes dos veces lo mismo si puedes calcularlo.'
		]
	},
	{
		day: 13,
		block: 'svelte',
		title: 'Tarjeta de proyecto',
		objective: 'Extraer un proyecto a un componente pequeño y fácil de leer.',
		productStory: 'El portfolio empieza a ordenarse por piezas reutilizables.',
		concept: 'Componentes y responsabilidad pequeña.',
		guidedSteps: [
			'Crea un componente ProjectCard.',
			'Pásale un proyecto como prop.',
			'Déjale pintar solo una tarjeta.'
		],
		miniChallenge: 'Muestra la etiqueta dentro de ProjectCard.',
		expectedState: 'El portfolio web usa un componente dedicado para cada proyecto.',
		codeFocus: 'Componente ProjectCard',
		codeSample:
			'<script lang="ts">\n\tlet { project }: { project: { title: string; tag: string } } = $props();\n</script>\n\n<article>{project.title}</article>',
		mentorPrompts: [
			'Un componente pequeño se entiende antes y se rompe menos.',
			'ProjectCard tiene sentido porque la tarjeta ya tiene contenido propio.'
		]
	},
	{
		day: 14,
		block: 'svelte',
		title: 'Cambiar destacados desde la tarjeta',
		objective: 'Pasar datos y funciones entre componentes sin perder claridad.',
		productStory: 'La tarjeta puede pedir destacar un proyecto sin controlar toda la lista.',
		concept: 'Props con funciones callback.',
		guidedSteps: [
			'Pasa project y onToggleFeatured a ProjectCard.',
			'Desde ProjectCard llama a onToggleFeatured(project.id).',
			'Mantén la lista principal en el componente padre.'
		],
		miniChallenge: 'Cambia el texto del botón según featured.',
		expectedState: 'El portfolio web coordina tarjetas con props y callbacks.',
		codeFocus: 'Comunicación simple',
		codeSample:
			'<script lang="ts">\n\tlet { project, onToggleFeatured } = $props();\n</script>\n\n<button onclick={() => onToggleFeatured(project.id)}>Destacar</button>',
		mentorPrompts: [
			'El padre guarda la lista; la tarjeta solo pide una acción.',
			'Esta separación ayuda a no buscar cambios por toda la app.'
		]
	},
	{
		day: 15,
		block: 'sveltekit',
		title: 'Ruta para el portfolio',
		objective: 'Entender cómo SvelteKit convierte archivos en pantallas navegables.',
		productStory: 'Tu portfolio obtiene su propia URL dentro del proyecto.',
		concept: 'Rutas de SvelteKit.',
		guidedSteps: [
			'Crea una carpeta routes/portfolio.',
			'Añade un +page.svelte con el portfolio.',
			'Comprueba que /portfolio abre la web personal.'
		],
		miniChallenge: 'Añade un enlace desde la pantalla de estudio hacia esa ruta.',
		expectedState: 'El portfolio web vive en una ruta propia de SvelteKit.',
		codeFocus: 'Página portfolio',
		codeSample:
			'<!-- src/routes/portfolio/+page.svelte -->\n<script lang="ts">\n\tlet title = \'Mi portfolio\';\n</script>\n\n<h1>{title}</h1>',
		mentorPrompts: [
			'En SvelteKit, una carpeta dentro de routes puede convertirse en una URL.',
			'No necesitas router manual para este primer paso.'
		]
	},
	{
		day: 16,
		block: 'sveltekit',
		title: 'Datos iniciales con load',
		objective: 'Cargar datos iniciales del portfolio desde una función load sencilla.',
		productStory: 'La página puede recibir perfil y proyectos antes de pintar la interfaz.',
		concept: '+page.ts y load.',
		guidedSteps: [
			'Crea un +page.ts junto a la página.',
			'Devuelve un perfil inicial.',
			'Lee data en +page.svelte.'
		],
		miniChallenge: 'Devuelve también una lista inicial de proyectos.',
		expectedState: 'El portfolio web recibe datos iniciales desde load.',
		codeFocus: 'Carga de perfil',
		codeSample:
			"export const load = () => {\n\treturn {\n\t\tprofile: { name: 'Tu Nombre', role: 'Frontend junior' }\n\t};\n};",
		mentorPrompts: [
			'load prepara datos para la pantalla. Hoy lo usamos de forma pequeña.',
			'La página no tiene que inventar todo si data se lo entrega.'
		]
	},
	{
		day: 17,
		block: 'sveltekit',
		title: 'Guardar cambios en el navegador',
		objective: 'Usar localStorage para conservar el portfolio mientras aprendes.',
		productStory: 'Tu perfil no se borra aunque cierres y vuelvas a abrir la página.',
		concept: 'localStorage y efecto de hidratación.',
		guidedSteps: [
			'Lee localStorage solo en el navegador.',
			'Guarda el perfil cuando cambie.',
			'Usa datos iniciales si no hay nada guardado.'
		],
		miniChallenge: 'Añade un botón para volver al perfil inicial.',
		expectedState: 'El portfolio web conserva cambios en localStorage sin login.',
		codeFocus: 'Persistencia local',
		codeSample:
			"if (browser) {\n\tconst saved = localStorage.getItem('portfolio');\n\tif (saved) profile = JSON.parse(saved);\n}",
		mentorPrompts: [
			'localStorage vive en el navegador, por eso no se lee durante el servidor.',
			'Guardar localmente es suficiente para practicar sin montar una base de datos.'
		]
	},
	{
		day: 18,
		block: 'sveltekit',
		title: 'Filtrar proyectos con URL',
		objective: 'Usar un parámetro de búsqueda para cambiar entre todos y destacados.',
		productStory: 'El portfolio puede compartir una vista concreta de proyectos.',
		concept: 'searchParams y estado de filtro.',
		guidedSteps: [
			'Lee ?vista=destacados desde la URL.',
			'Calcula qué proyectos se muestran.',
			'Crea enlaces para cambiar de vista.'
		],
		miniChallenge: 'Añade una vista por etiqueta, por ejemplo ?tag=ui.',
		expectedState: 'El portfolio web filtra proyectos usando una URL simple.',
		codeFocus: 'Filtro por URL',
		codeSample: "const vista = url.searchParams.get('vista') ?? 'todos';\n\nreturn { vista };",
		mentorPrompts: [
			'La URL también puede ser estado de la app cuando interesa compartirlo.',
			'Empieza con dos vistas claras: todos y destacados.'
		]
	},
	{
		day: 19,
		block: 'sveltekit',
		title: 'Formulario de contacto visual',
		objective: 'Crear un formulario de contacto claro aunque todavía no envíe emails reales.',
		productStory: 'El portfolio empieza a parecer una web que podrías enseñar.',
		concept: 'Formularios y feedback contextual.',
		guidedSteps: [
			'Crea campos para nombre, email y mensaje.',
			'Añade labels visibles.',
			'Muestra una respuesta amable al enviar.'
		],
		miniChallenge: 'Valida que el mensaje no esté vacío.',
		expectedState: 'El portfolio web incluye un formulario de contacto visual.',
		codeFocus: 'Contacto simple',
		codeSample:
			"function sendMessage() {\n\tfeedback = 'Mensaje preparado. En una app real lo enviaríamos al servidor.';\n}",
		mentorPrompts: [
			'Un formulario puede ser útil aunque todavía no conecte con un backend.',
			'La persona necesita saber qué pasó después de pulsar enviar.'
		]
	},
	{
		day: 20,
		block: 'sveltekit',
		title: 'Pulido y accesibilidad',
		objective: 'Mejorar lectura, foco y estados vacíos para que el portfolio sea cómodo de usar.',
		productStory: 'La web personal empieza a sentirse presentable, no solo funcional.',
		concept: 'Accesibilidad básica y estados de interfaz.',
		guidedSteps: [
			'Asegura labels en formularios.',
			'Muestra un estado vacío si no hay proyectos.',
			'Revisa contraste, foco y textos de botones.'
		],
		miniChallenge: 'Añade un enlace de saltar al contenido principal.',
		expectedState: 'El portfolio web tiene estados claros y controles accesibles.',
		codeFocus: 'Estado vacío',
		codeSample: '{#if projects.length === 0}\n\t<p>Añade tu primer proyecto.</p>\n{/if}',
		mentorPrompts: [
			'Una web clara no solo funciona: también se deja usar sin pelearse con ella.',
			'Los estados vacíos son parte del producto, no un detalle menor.'
		]
	},
	{
		day: 21,
		block: 'sveltekit',
		title: 'Publicar tu primera versión',
		objective: 'Unir lo aprendido en una versión pequeña, usable y explicable del portfolio.',
		productStory: 'La última sesión cierra con una web personal que puedes enseñar.',
		concept: 'Integración, build y deploy.',
		guidedSteps: [
			'Revisa que perfil, skills y proyectos se vean bien.',
			'Revisa que el build pase sin errores.',
			'Explica con tus palabras qué hace cada pieza principal.'
		],
		miniChallenge: 'Añade una mejora personal pequeña: color, sección extra o proyecto nuevo.',
		expectedState: 'El portfolio web final muestra perfil, skills, proyectos y contacto.',
		codeFocus: 'Cierre publicable',
		codeSample:
			"const listoParaPublicar = profile.name && projects.length > 0;\n\nconsole.log(listoParaPublicar ? 'Portfolio listo' : 'Falta una pieza');",
		mentorPrompts: [
			'Terminar no significa saberlo todo: significa poder explicar la versión pequeña.',
			'Si puedes contar qué dato cambia en cada sección, ya tienes una base muy sólida.'
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
	introSummary: `${day.concept} aplicado a tu portfolio, con una pieza visible y útil.`,
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
	completionCue: `Has practicado el día ${day.day}. Tu portfolio ya tiene una pieza más.`,
	difficulty: difficultyFor(day.day),
	estimatedMinutes: estimatedMinutesFor(day.day)
}));

export function getTaskCourseDay(day: number): TaskCourseDay {
	return taskCourseDays.find((courseDay) => courseDay.day === day) ?? taskCourseDays[0];
}
