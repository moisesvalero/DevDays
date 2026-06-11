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
		title: 'Entrar en tu zona de trabajo',
		objective: 'Moverte desde Ubuntu-Dev hasta la carpeta donde viven tus proyectos.',
		explanation:
			'En tu día a día no piensas en D: ni en C:. Abres Ubuntu-Dev, entras en ~/webs y desde ahí trabajas. Esa ruta apunta a tus proyectos de Windows vistos desde WSL.',
		dailyUse: 'Lo harás cada vez que abras terminal para tocar un proyecto.',
		keyCommands: ['pwd', 'cd ~/webs', 'ls'],
		exercises: [
			{
				id: 'nav-webs',
				title: 'Ubícate',
				prompt: 'Comprueba dónde estás, entra en ~/webs y lista los proyectos.',
				expectedCommands: ['pwd', 'cd ~/webs', 'ls'],
				successMessage: 'Ya estás en la carpeta correcta para trabajar desde WSL.'
			}
		],
		hints: ['Empieza con pwd para saber dónde estás.', 'Usa cd ~/webs, no D:\\webs.']
	},
	{
		lessonId: 'TERM-002',
		module: 'proyectos',
		difficulty: 'suave',
		estimatedMinutes: 10,
		title: 'Arrancar un proyecto existente',
		objective: 'Entrar en un proyecto, instalar dependencias y levantar el servidor.',
		explanation:
			'Cuando clonas o vuelves a un proyecto, pnpm install sincroniza dependencias y pnpm dev arranca Vite/SvelteKit para ver la app en localhost.',
		dailyUse: 'Es el flujo normal al empezar una sesión de trabajo.',
		keyCommands: ['cd ~/webs/DevDays', 'pnpm install', 'pnpm dev'],
		exercises: [
			{
				id: 'start-project',
				title: 'Arranque local',
				prompt: 'Entra en DevDays, instala dependencias y arranca el servidor.',
				expectedCommands: ['cd ~/webs/DevDays', 'pnpm install', 'pnpm dev'],
				successMessage: 'Proyecto listo en modo desarrollo.'
			}
		],
		hints: ['pnpm install antes de pnpm dev evita dependencias rotas.', 'No uses npm ni yarn aquí.']
	},
	{
		lessonId: 'TERM-003',
		module: 'proyectos',
		difficulty: 'media',
		estimatedMinutes: 12,
		title: 'Clonar desde GitHub',
		objective: 'Traer un repositorio a ~/webs con GitHub CLI.',
		explanation:
			'gh repo clone descarga un repo y configura origin. Si quieres otro nombre local, lo añades al final.',
		dailyUse: 'Lo usarás al empezar proyectos, plantillas o pruebas.',
		keyCommands: [
			'cd ~/webs',
			'gh repo clone usuario/repositorio',
			'gh repo clone usuario/plantilla-web mi-nueva-web'
		],
		exercises: [
			{
				id: 'clone-repo',
				title: 'Clonado base',
				prompt: 'Ve a ~/webs y clona usuario/repositorio.',
				expectedCommands: ['cd ~/webs', 'gh repo clone usuario/repositorio'],
				successMessage: 'Repositorio clonado y listo para instalar dependencias.'
			}
		],
		hints: [
			'El destino correcto es ~/webs.',
			'gh auth status te dice si GitHub CLI está conectado.'
		]
	},
	{
		lessonId: 'TERM-004',
		module: 'proyectos',
		difficulty: 'media',
		estimatedMinutes: 12,
		title: 'Crear proyectos nuevos',
		objective: 'Crear una app SvelteKit o Next.js usando pnpm.',
		explanation:
			'pnpm create invoca scaffolds sin cambiar de gestor. La regla es crear, entrar en carpeta, instalar si hace falta y levantar dev.',
		dailyUse: 'Lo usarás para prototipos, pruebas y nuevos proyectos.',
		keyCommands: [
			'pnpm create svelte@latest mi-app',
			'pnpm create next-app@latest mi-next',
			'cd mi-app',
			'pnpm install',
			'pnpm dev'
		],
		exercises: [
			{
				id: 'create-svelte',
				title: 'Nuevo SvelteKit',
				prompt: 'Desde ~/webs crea mi-app, entra, instala y arranca.',
				expectedCommands: [
					'cd ~/webs',
					'pnpm create svelte@latest mi-app',
					'cd mi-app',
					'pnpm install',
					'pnpm dev'
				],
				successMessage: 'Has practicado el ciclo completo de creación.'
			}
		],
		hints: ['El nombre del proyecto va al final.', 'Mantén pnpm en todo el flujo.']
	},
	{
		lessonId: 'TERM-005',
		module: 'git',
		difficulty: 'suave',
		estimatedMinutes: 10,
		title: 'Mirar estado y cambios',
		objective: 'Saber qué ha cambiado antes de tocar Git.',
		explanation:
			'git status te da el mapa. git diff enseña el contenido cambiado. git log --oneline -5 te recuerda los últimos commits.',
		dailyUse: 'Antes de guardar, subir o pedir ayuda, mira siempre estado y diff.',
		keyCommands: ['git status', 'git diff', 'git log --oneline -5'],
		exercises: [
			{
				id: 'inspect-git',
				title: 'Inspección segura',
				prompt: 'En DevDays revisa estado, diff e historial corto.',
				expectedCommands: ['cd ~/webs/DevDays', 'git status', 'git diff', 'git log --oneline -5'],
				successMessage: 'Ya sabes leer el estado antes de decidir.'
			}
		],
		hints: ['status primero.', 'diff antes de commit para no subir sorpresa.']
	},
	{
		lessonId: 'TERM-006',
		module: 'git',
		difficulty: 'media',
		estimatedMinutes: 14,
		title: 'Commit y push',
		objective: 'Guardar cambios con un mensaje claro y subirlos a GitHub.',
		explanation:
			'git add prepara cambios, git commit crea el punto de guardado y git push lo publica. En este repo, push a main dispara Vercel.',
		dailyUse: 'Lo harás cada vez que cierres una unidad de trabajo.',
		keyCommands: [
			'git status',
			'git add .',
			'git commit -m "feat: add terminal lesson"',
			'git push'
		],
		exercises: [
			{
				id: 'commit-push',
				title: 'Publicar trabajo',
				prompt: 'Revisa estado, prepara cambios, crea commit y sube.',
				expectedCommands: [
					'git status',
					'git add .',
					'git commit -m "feat: add terminal lesson"',
					'git push'
				],
				successMessage: 'Flujo de publicación completado.'
			}
		],
		hints: ['El mensaje debe explicar la unidad de cambio.', 'No hagas push sin mirar status.']
	},
	{
		lessonId: 'TERM-007',
		module: 'git',
		difficulty: 'media',
		estimatedMinutes: 12,
		title: 'Trabajar con ramas',
		objective: 'Crear una rama, volver a main y actualizarla.',
		explanation:
			'Las ramas separan trabajo. git switch -c crea y cambia. git switch main vuelve. git pull trae lo último.',
		dailyUse: 'Útil para features grandes o pruebas sin ensuciar main.',
		keyCommands: [
			'git branch',
			'git switch -c feature/nueva-seccion',
			'git switch main',
			'git pull'
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
		lessonId: 'TERM-008',
		module: 'validacion',
		difficulty: 'media',
		estimatedMinutes: 12,
		title: 'Validar antes de terminar',
		objective: 'Ejecutar los checks que evitan subir errores.',
		explanation:
			'lint revisa estilo/errores, knip detecta basura, check valida Svelte/TS, test cubre lógica y build prueba producción.',
		dailyUse: 'Antes de cerrar una feature o hacer push serio.',
		keyCommands: ['pnpm lint', 'pnpm knip', 'pnpm check', 'pnpm test', 'pnpm build'],
		exercises: [
			{
				id: 'validate-flow',
				title: 'Cadena verde',
				prompt: 'Ejecuta la cadena de validación principal.',
				expectedCommands: ['pnpm lint', 'pnpm knip', 'pnpm check', 'pnpm test', 'pnpm build'],
				successMessage: 'Validación completa: listo para cerrar con confianza.'
			}
		],
		hints: [
			'Si falla un paso, se corrige y se repite desde ahí.',
			'build prueba el resultado de producción.'
		]
	},
	{
		lessonId: 'TERM-009',
		module: 'diagnostico',
		difficulty: 'suave',
		estimatedMinutes: 8,
		title: 'Cuando algo falla',
		objective: 'Recoger señales básicas antes de pedir ayuda o tocar a ciegas.',
		explanation:
			'pwd, node -v, pnpm -v y gh auth status aclaran si estás en la ruta correcta, con runtime correcto y GitHub conectado.',
		dailyUse: 'Primeros comandos cuando algo raro pasa.',
		keyCommands: ['pwd', 'node -v', 'pnpm -v', 'gh auth status'],
		exercises: [
			{
				id: 'debug-basics',
				title: 'Diagnóstico rápido',
				prompt: 'Comprueba ruta, Node, pnpm y autenticación de GitHub.',
				expectedCommands: ['pwd', 'node -v', 'pnpm -v', 'gh auth status'],
				successMessage: 'Ya tienes el diagnóstico mínimo para entender el entorno.'
			}
		],
		hints: [
			'Muchas veces el fallo es estar en otra carpeta.',
			'gh auth status explica problemas de push o clone.'
		]
	},
	{
		lessonId: 'TERM-010',
		module: 'diagnostico',
		difficulty: 'reto',
		estimatedMinutes: 15,
		title: 'Caja de herramientas diaria',
		objective: 'Usar comandos extra frecuentes sin salir del flujo WSL.',
		explanation:
			'mkdir, touch, cat y rg te ayudan a crear carpetas, archivos, leer contenido y buscar rápido. git stash guarda trabajo temporal.',
		dailyUse: 'Para moverte rápido sin abrir mil ventanas.',
		keyCommands: [
			'mkdir notas',
			'touch notas/apuntes.md',
			'cat package.json',
			'rg terminal src',
			'git remote -v',
			'git stash push -m "wip terminal"',
			'git stash pop',
			'pnpm exec svelte-check'
		],
		exercises: [
			{
				id: 'toolbox',
				title: 'Utilidades frecuentes',
				prompt:
					'Crea carpeta/archivo, lee package.json, busca terminal, mira remotes y practica stash.',
				expectedCommands: [
					'mkdir notas',
					'touch notas/apuntes.md',
					'cat package.json',
					'rg terminal src',
					'git remote -v',
					'git stash push -m "wip terminal"',
					'git stash pop',
					'pnpm exec svelte-check'
				],
				successMessage: 'Ya tienes una caja básica para trabajar más rápido.'
			}
		],
		hints: [
			'rg es tu buscador rápido.',
			'stash sirve para aparcar cambios, no para sustituir commits.'
		]
	}
];
