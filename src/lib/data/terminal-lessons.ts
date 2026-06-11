import type { TerminalLesson, TerminalModule } from '$lib/types/terminal';

export const terminalModuleLabels: Record<TerminalModule, string> = {
	wsl: 'WSL y rutas',
	proyectos: 'Proyectos',
	git: 'Git diario',
	validacion: 'Validación',
	diagnostico: 'Diagnóstico'
};

export const terminalLessons: TerminalLesson[] = [
	{
		lessonId: 'TERM-001',
		module: 'wsl',
		difficulty: 'suave',
		estimatedMinutes: 8,
		title: 'Tu zona de trabajo en WSL',
		objective: 'Entender dónde viven los proyectos activos y cómo entrar sin usar rutas Windows.',
		explanation:
			'En WSL, tu carpeta personal se representa como /home/usuario. Para trabajar rápido, los proyectos activos deben vivir dentro de ~/webs. El símbolo ~ significa "mi carpeta personal", así que ~/webs equivale a /home/usuario/webs.',
		dailyUse:
			'Este es el punto de partida de casi todo: abrir terminal, entrar en ~/webs y elegir proyecto.',
		keyCommands: ['cd ~/webs', 'pwd', 'ls'],
		commandNotes: [
			{ command: 'cd ~/webs', description: 'Entra en la carpeta donde guardas proyectos activos.' },
			{ command: 'pwd', description: 'Muestra la ruta exacta en la que estás.' },
			{ command: 'ls', description: 'Lista las carpetas y archivos de la ruta actual.' }
		],
		exercises: [
			{
				id: 'wsl-workspace',
				title: 'Ubícate',
				prompt: 'Entra en ~/webs, mira la ruta actual y lista los proyectos.',
				expectedCommands: ['cd ~/webs', 'pwd', 'ls'],
				successMessage: 'Ya estás en la zona correcta para trabajar desde WSL.'
			}
		],
		hints: [
			'No necesitas escribir /home/usuario todo el rato: usa ~.',
			'Evita D:\\webs para proyectos activos si trabajas con WSL.'
		]
	},
	{
		lessonId: 'TERM-002',
		module: 'wsl',
		difficulty: 'suave',
		estimatedMinutes: 9,
		title: 'Abrir proyecto y editor',
		objective: 'Entrar en un proyecto y abrir VS Code desde la terminal WSL.',
		explanation:
			'Primero entras en la carpeta del proyecto. Después code . abre esa carpeta exacta en VS Code. El punto significa "la carpeta actual".',
		dailyUse: 'Lo usarás cada vez que empieces a editar un proyecto.',
		keyCommands: ['cd ~/webs/mi-proyecto', 'pwd', 'code .'],
		commandNotes: [
			{ command: 'cd ~/webs/mi-proyecto', description: 'Entra directamente en un proyecto.' },
			{ command: 'pwd', description: 'Confirma que estás en el proyecto correcto.' },
			{ command: 'code .', description: 'Abre VS Code en la carpeta actual desde WSL.' }
		],
		exercises: [
			{
				id: 'open-editor',
				title: 'Abrir VS Code',
				prompt: 'Entra en mi-proyecto, confirma la ruta y abre el editor.',
				expectedCommands: ['cd ~/webs/mi-proyecto', 'pwd', 'code .'],
				successMessage: 'Has abierto el proyecto correcto desde WSL.'
			}
		],
		hints: ['El punto de code . importa.', 'Si dudas, pwd antes de code .']
	},
	{
		lessonId: 'TERM-003',
		module: 'proyectos',
		difficulty: 'media',
		estimatedMinutes: 11,
		title: 'Clonar un repo de GitHub',
		objective: 'Traer un repositorio a ~/webs y dejarlo preparado.',
		explanation:
			'Clonar significa descargar una copia del proyecto desde GitHub. gh repo clone crea la carpeta y deja configurado origin para poder hacer pull y push.',
		dailyUse: 'Lo usarás al empezar proyectos existentes, plantillas o pruebas.',
		keyCommands: [
			'cd ~/webs',
			'gh repo clone usuario/repositorio',
			'cd repositorio',
			'pnpm install'
		],
		commandNotes: [
			{ command: 'gh repo clone usuario/repositorio', description: 'Descarga un repo de GitHub.' },
			{ command: 'cd repositorio', description: 'Entra en la carpeta recién clonada.' },
			{ command: 'pnpm install', description: 'Instala las dependencias del proyecto.' }
		],
		exercises: [
			{
				id: 'clone-repo',
				title: 'Clonado base',
				prompt: 'Ve a ~/webs, clona usuario/repositorio, entra e instala dependencias.',
				expectedCommands: [
					'cd ~/webs',
					'gh repo clone usuario/repositorio',
					'cd repositorio',
					'pnpm install'
				],
				successMessage: 'Repositorio clonado y listo para trabajar.'
			}
		],
		hints: ['gh auth status comprueba si GitHub CLI está conectado.', 'Clona dentro de ~/webs.']
	},
	{
		lessonId: 'TERM-004',
		module: 'proyectos',
		difficulty: 'media',
		estimatedMinutes: 10,
		title: 'Clonar plantilla con otro nombre',
		objective: 'Usar una plantilla de GitHub sin conservar su nombre original.',
		explanation:
			'Si añades un nombre al final del comando, GitHub descarga el repo pero la carpeta local usa ese nombre nuevo.',
		dailyUse: 'Muy útil para empezar proyectos nuevos desde una base que ya funciona.',
		keyCommands: [
			'cd ~/webs',
			'gh repo clone usuario/plantilla-web mi-nueva-web',
			'cd mi-nueva-web',
			'pnpm install'
		],
		commandNotes: [
			{
				command: 'gh repo clone usuario/plantilla-web mi-nueva-web',
				description: 'Clona plantilla-web creando la carpeta mi-nueva-web.'
			},
			{ command: 'cd mi-nueva-web', description: 'Entra en el proyecto clonado.' },
			{ command: 'pnpm install', description: 'Prepara dependencias antes de arrancar.' }
		],
		exercises: [
			{
				id: 'clone-template',
				title: 'Plantilla renombrada',
				prompt: 'Clona usuario/plantilla-web como mi-nueva-web, entra e instala.',
				expectedCommands: [
					'cd ~/webs',
					'gh repo clone usuario/plantilla-web mi-nueva-web',
					'cd mi-nueva-web',
					'pnpm install'
				],
				successMessage: 'Plantilla clonada con nombre propio.'
			}
		],
		hints: ['El nombre nuevo va al final.', 'Mantén pnpm en todo el flujo.']
	},
	{
		lessonId: 'TERM-005',
		module: 'proyectos',
		difficulty: 'media',
		estimatedMinutes: 12,
		title: 'Crear SvelteKit nuevo',
		objective: 'Crear una app SvelteKit desde cero con pnpm.',
		explanation:
			'pnpm create ejecuta un asistente de creación. Después entras en la carpeta, instalas dependencias y arrancas el servidor local.',
		dailyUse: 'Sirve para prototipos, prácticas y proyectos SvelteKit nuevos.',
		keyCommands: [
			'cd ~/webs',
			'pnpm create svelte@latest mi-app',
			'cd mi-app',
			'pnpm install',
			'pnpm dev'
		],
		commandNotes: [
			{ command: 'pnpm create svelte@latest mi-app', description: 'Crea una app SvelteKit.' },
			{ command: 'pnpm install', description: 'Descarga dependencias.' },
			{ command: 'pnpm dev', description: 'Arranca la app en localhost.' }
		],
		exercises: [
			{
				id: 'create-svelte',
				title: 'Nuevo SvelteKit',
				prompt: 'Crea mi-app, entra, instala y arranca.',
				expectedCommands: [
					'cd ~/webs',
					'pnpm create svelte@latest mi-app',
					'cd mi-app',
					'pnpm install',
					'pnpm dev'
				],
				successMessage: 'Has completado el flujo básico de creación SvelteKit.'
			}
		],
		hints: ['El asistente puede hacer preguntas.', 'No uses npm, npx, yarn ni bun aquí.']
	},
	{
		lessonId: 'TERM-006',
		module: 'proyectos',
		difficulty: 'media',
		estimatedMinutes: 10,
		title: 'Crear Next.js nuevo',
		objective: 'Crear una app Next.js básica con pnpm.',
		explanation:
			'Next.js tiene su propio generador. El flujo mental es igual: crear proyecto, entrar en carpeta y arrancar servidor.',
		dailyUse: 'Útil si alternas entre SvelteKit y proyectos React/Next.',
		keyCommands: ['cd ~/webs', 'pnpm create next-app@latest mi-next', 'cd mi-next', 'pnpm dev'],
		commandNotes: [
			{ command: 'pnpm create next-app@latest mi-next', description: 'Crea una app Next.js.' },
			{ command: 'cd mi-next', description: 'Entra en el proyecto creado.' },
			{ command: 'pnpm dev', description: 'Levanta el servidor local.' }
		],
		exercises: [
			{
				id: 'create-next',
				title: 'Nuevo Next.js',
				prompt: 'Crea mi-next, entra y arranca dev.',
				expectedCommands: [
					'cd ~/webs',
					'pnpm create next-app@latest mi-next',
					'cd mi-next',
					'pnpm dev'
				],
				successMessage: 'Has practicado el flujo básico de Next.js.'
			}
		],
		hints: ['El generador puede preguntar opciones.', 'pnpm dev suele abrir localhost.']
	},
	{
		lessonId: 'TERM-007',
		module: 'proyectos',
		difficulty: 'suave',
		estimatedMinutes: 10,
		title: 'Flujo diario normal',
		objective: 'Arrancar una sesión de trabajo sin saltarte pasos.',
		explanation:
			'Cuando vuelves a un proyecto, actualizas código, sincronizas dependencias y arrancas la app. Este ritual evita trabajar sobre código viejo o dependencias desfasadas.',
		dailyUse: 'Es tu secuencia de inicio casi todos los días.',
		keyCommands: ['cd ~/webs/mi-proyecto', 'git pull', 'pnpm install', 'pnpm dev'],
		commandNotes: [
			{ command: 'git pull', description: 'Trae los últimos cambios desde GitHub.' },
			{ command: 'pnpm install', description: 'Sincroniza dependencias.' },
			{ command: 'pnpm dev', description: 'Arranca el proyecto para probarlo.' }
		],
		exercises: [
			{
				id: 'daily-flow',
				title: 'Arranque diario',
				prompt: 'Entra en mi-proyecto, actualiza, instala y arranca.',
				expectedCommands: ['cd ~/webs/mi-proyecto', 'git pull', 'pnpm install', 'pnpm dev'],
				successMessage: 'Flujo diario listo.'
			}
		],
		hints: ['git pull antes de empezar evita sorpresas.', 'Si pnpm dev falla, lee la salida.']
	},
	{
		lessonId: 'TERM-008',
		module: 'git',
		difficulty: 'suave',
		estimatedMinutes: 10,
		title: 'Ver estado y cambios',
		objective: 'Saber qué ha cambiado antes de guardar nada.',
		explanation:
			'git status te da el mapa. git diff enseña las líneas cambiadas. git log --oneline -5 te recuerda los últimos puntos guardados.',
		dailyUse: 'Antes de guardar, subir o pedir ayuda, mira siempre estado y diff.',
		keyCommands: ['git status', 'git diff', 'git log --oneline -5'],
		commandNotes: [
			{ command: 'git status', description: 'Muestra rama, archivos cambiados y stage.' },
			{ command: 'git diff', description: 'Muestra cambios línea por línea.' },
			{ command: 'git log --oneline -5', description: 'Lista los 5 commits más recientes.' }
		],
		exercises: [
			{
				id: 'inspect-git',
				title: 'Inspección segura',
				prompt: 'En mi-proyecto revisa estado, diff e historial corto.',
				expectedCommands: [
					'cd ~/webs/mi-proyecto',
					'git status',
					'git diff',
					'git log --oneline -5'
				],
				successMessage: 'Ya sabes leer el estado antes de decidir.'
			}
		],
		hints: ['status primero.', 'diff antes de commit para no subir sorpresas.']
	},
	{
		lessonId: 'TERM-009',
		module: 'git',
		difficulty: 'media',
		estimatedMinutes: 12,
		title: 'Guardar cambios en Git',
		objective: 'Crear un commit y subirlo a GitHub.',
		explanation:
			'git add prepara cambios, git commit crea el punto de guardado y git push lo publica. En proyectos conectados a Vercel, push puede lanzar despliegue.',
		dailyUse: 'Lo harás cada vez que cierres una unidad de trabajo.',
		keyCommands: ['git status', 'git add .', 'git commit -m "feat: add landing page"', 'git push'],
		commandNotes: [
			{ command: 'git add .', description: 'Mete todos los cambios actuales en el stage.' },
			{ command: 'git commit -m "..."', description: 'Guarda un punto con mensaje descriptivo.' },
			{ command: 'git push', description: 'Sube tus commits a GitHub.' }
		],
		exercises: [
			{
				id: 'commit-push',
				title: 'Publicar trabajo',
				prompt: 'Revisa estado, prepara cambios, crea commit y sube.',
				expectedCommands: [
					'git status',
					'git add .',
					'git commit -m "feat: add landing page"',
					'git push'
				],
				successMessage: 'Flujo de publicación completado.'
			}
		],
		hints: ['Haz commit por unidad lógica.', 'No hagas push sin mirar status.']
	},
	{
		lessonId: 'TERM-010',
		module: 'git',
		difficulty: 'media',
		estimatedMinutes: 12,
		title: 'Trabajar con ramas',
		objective: 'Crear una rama, volver a main y actualizarla.',
		explanation:
			'Las ramas separan trabajo. git switch -c crea una rama nueva y cambia a ella. git switch main vuelve a la rama principal.',
		dailyUse: 'Útil para features grandes o pruebas sin ensuciar main.',
		keyCommands: [
			'git branch',
			'git switch -c feature/nueva-seccion',
			'git switch main',
			'git pull'
		],
		commandNotes: [
			{ command: 'git branch', description: 'Lista ramas locales y marca la activa con *.' },
			{ command: 'git switch -c feature/nueva-seccion', description: 'Crea una rama y entra.' },
			{ command: 'git switch main', description: 'Vuelve a la rama principal.' }
		],
		exercises: [
			{
				id: 'branch-flow',
				title: 'Rama de trabajo',
				prompt: 'Lista ramas, crea feature/nueva-seccion, vuelve a main y actualiza.',
				expectedCommands: [
					'git branch',
					'git switch -c feature/nueva-seccion',
					'git switch main',
					'git pull'
				],
				successMessage: 'Controlas el flujo básico de ramas.'
			}
		],
		hints: ['switch -c crea la rama.', 'pull se hace normalmente en main antes de empezar.']
	},
	{
		lessonId: 'TERM-011',
		module: 'validacion',
		difficulty: 'media',
		estimatedMinutes: 13,
		title: 'Validar antes de terminar',
		objective: 'Ejecutar checks para no subir cosas rotas.',
		explanation:
			'lint revisa problemas estáticos, knip detecta código o dependencias sin uso, check valida Svelte/TypeScript, test ejecuta pruebas y build comprueba producción. format arregla estilo cuando Prettier se queja.',
		dailyUse: 'Antes de cerrar una feature, hacer push serio o entregar una versión.',
		keyCommands: ['pnpm lint', 'pnpm knip', 'pnpm check', 'pnpm test', 'pnpm build', 'pnpm format'],
		commandNotes: [
			{ command: 'pnpm lint', description: 'Busca errores rápidos con oxlint.' },
			{ command: 'pnpm check', description: 'Ejecuta svelte-check y TypeScript.' },
			{ command: 'pnpm build', description: 'Prueba si la app compila para producción.' },
			{ command: 'pnpm format', description: 'Reescribe formato con Prettier.' }
		],
		exercises: [
			{
				id: 'validate-flow',
				title: 'Cadena verde',
				prompt: 'Ejecuta la cadena de validación principal.',
				expectedCommands: ['pnpm lint', 'pnpm knip', 'pnpm check', 'pnpm test', 'pnpm build'],
				successMessage: 'Validación completa: listo para cerrar con confianza.'
			}
		],
		hints: ['Si falla un paso, corrige y repite desde ahí.', 'pnpm format modifica archivos.']
	},
	{
		lessonId: 'TERM-012',
		module: 'diagnostico',
		difficulty: 'reto',
		estimatedMinutes: 15,
		title: 'Si algo falla',
		objective: 'Recoger señales básicas antes de tocar a ciegas.',
		explanation:
			'Cuando algo falla, primero confirma ruta, versiones y sesión de GitHub. Después reinstala dependencias si tiene sentido. Usa rg para buscar rápido y git remote -v para verificar a qué repo estás conectado.',
		dailyUse: 'Primeros comandos cuando pnpm, GitHub o el proyecto se comportan raro.',
		keyCommands: [
			'pwd',
			'node -v',
			'pnpm -v',
			'gh auth status',
			'pnpm install',
			'git remote -v',
			'cat package.json',
			'rg terminal src',
			'clear'
		],
		commandNotes: [
			{ command: 'node -v', description: 'Muestra la versión de Node activa.' },
			{ command: 'pnpm -v', description: 'Muestra la versión de pnpm activa.' },
			{ command: 'gh auth status', description: 'Comprueba si GitHub CLI está conectado.' },
			{ command: 'rg terminal src', description: 'Busca texto dentro del código muy rápido.' },
			{ command: 'clear', description: 'Limpia la pantalla de la terminal.' }
		],
		exercises: [
			{
				id: 'debug-basics',
				title: 'Diagnóstico rápido',
				prompt: 'Comprueba ruta, versiones, GitHub, dependencias, remote y búsqueda básica.',
				expectedCommands: [
					'pwd',
					'node -v',
					'pnpm -v',
					'gh auth status',
					'pnpm install',
					'git remote -v',
					'cat package.json',
					'rg terminal src'
				],
				successMessage: 'Ya tienes el diagnóstico mínimo para entender el entorno.'
			}
		],
		hints: [
			'Muchas veces el fallo es estar en otra carpeta.',
			'No pienses en C: ni D: mientras programas; usa ~/webs.'
		]
	}
];
