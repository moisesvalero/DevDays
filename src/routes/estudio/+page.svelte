<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { mode, setMode, toggleMode } from 'mode-watcher';
	import { SvelteSet } from 'svelte/reactivity';
	import { Button } from '$lib/components/ui/button';
	import CodeEditor from '$lib/components/study/CodeEditor.svelte';
	import { blockLabels, starterPortfolio } from '$lib/data/task-course';
	import type {
		CourseBlock,
		PortfolioProfile,
		PortfolioProject,
		TaskCourseDay
	} from '$lib/types/task-course';

	type StudyState = {
		currentDay: number;
		completedDays: number[];
		checklistByDay: Record<number, number[]>;
		hintByDay: Record<number, number>;
		portfolio: PortfolioProfile;
		codeByDay: Record<number, string>;
	};

	type BeginnerStep = {
		label: string;
		text: string;
	};

	let { data }: { data: { days: TaskCourseDay[]; userEmail: string | null } } = $props();

	const storageKey = 'devdays-portfolio-course-state-v1';
	const blocks: CourseBlock[] = ['javascript', 'svelte', 'sveltekit'];
	const blockNames: Record<CourseBlock, string> = {
		javascript: 'JavaScript',
		svelte: 'Svelte',
		sveltekit: 'SvelteKit'
	};

	let currentDay = $state(1);
	const completedDays = new SvelteSet<number>();
	let checklistByDay = $state<Record<number, number[]>>({});
	let hintByDay = $state<Record<number, number>>({});
	let portfolio = $state<PortfolioProfile>(clonePortfolio(starterPortfolio));
	let codeByDay = $state<Record<number, string>>({});
	let hydrated = $state(false);
	let toastMessage = $state('');
	let mentorQuestion = $state('');
	let mentorAnswer = $state('');
	let mentorError = $state('');
	let mentorLoading = $state(false);
	let toastTimer: ReturnType<typeof setTimeout> | null = null;

	const current = $derived(data.days.find((day) => day.day === currentDay) ?? data.days[0]);
	const currentChecklist = $derived(checklistByDay[currentDay] ?? []);
	const currentHintLevel = $derived(hintByDay[currentDay] ?? 0);
	const visibleHints = $derived(current.mentorHints.slice(0, currentHintLevel + 1));
	const completedCount = $derived(completedDays.size);
	const completionPercent = $derived(Math.round((completedCount / data.days.length) * 100));
	const isCurrentComplete = $derived(completedDays.has(currentDay));
	const currentCode = $derived(codeByDay[currentDay] ?? current.codeSample);
	const previewPortfolio = $derived(applyCodeToPortfolio(portfolio, currentDay, currentCode));
	const featuredProjects = $derived(
		previewPortfolio.projects.filter((project) => project.featured)
	);
	const showSkills = $derived(currentDay >= 2);
	const showBio = $derived(currentDay >= 3);
	const showProjects = $derived(currentDay >= 4);
	const showContact = $derived(currentDay >= 19);
	const currentChecklistPercent = $derived(
		Math.round((currentChecklist.length / current.checklist.length) * 100)
	);
	const beginnerSteps = $derived(getBeginnerSteps(current));
	const nextStudentAction = $derived(getNextStudentAction());
	const isDark = $derived(browser && mode.current === 'dark');

	onMount(() => {
		if (!browser || hydrated) return;

		if (!localStorage.getItem('mode-watcher-mode')) {
			setMode('dark');
		}

		const saved = localStorage.getItem(storageKey);
		if (saved) {
			try {
				const parsed = JSON.parse(saved) as Partial<StudyState>;
				if (typeof parsed.currentDay === 'number') {
					currentDay = Math.min(Math.max(parsed.currentDay, 1), data.days.length);
				}
				if (Array.isArray(parsed.completedDays)) {
					completedDays.clear();
					for (const day of parsed.completedDays) {
						if (Number.isInteger(day) && day >= 1 && day <= data.days.length) {
							completedDays.add(day);
						}
					}
				}
				if (parsed.checklistByDay && typeof parsed.checklistByDay === 'object') {
					checklistByDay = sanitizeProgressMap(parsed.checklistByDay as Record<string, unknown>);
				}
				if (parsed.hintByDay && typeof parsed.hintByDay === 'object') {
					hintByDay = sanitizeHintMap(parsed.hintByDay as Record<string, unknown>);
				}
				if (isPortfolioProfile(parsed.portfolio)) {
					portfolio = parsed.portfolio;
				}
				if (parsed.codeByDay && typeof parsed.codeByDay === 'object') {
					codeByDay = sanitizeCodeMap(parsed.codeByDay as Record<string, unknown>);
				}
			} catch {
				localStorage.removeItem(storageKey);
			}
		}

		hydrated = true;
	});

	$effect(() => {
		if (!browser || !hydrated) return;

		const state: StudyState = {
			currentDay,
			completedDays: [...completedDays],
			checklistByDay,
			hintByDay,
			portfolio,
			codeByDay
		};

		localStorage.setItem(storageKey, JSON.stringify(state));
	});

	function sanitizeProgressMap(map: Record<string, unknown>): Record<number, number[]> {
		const next: Record<number, number[]> = {};
		for (const day of data.days) {
			const raw = map[day.day];
			if (!Array.isArray(raw)) continue;
			next[day.day] = raw.filter(
				(step) => Number.isInteger(step) && step >= 0 && step < day.checklist.length
			);
		}
		return next;
	}

	function sanitizeHintMap(map: Record<string, unknown>): Record<number, number> {
		const next: Record<number, number> = {};
		for (const day of data.days) {
			const raw = map[day.day];
			if (typeof raw === 'number') {
				next[day.day] = Math.min(Math.max(raw, 0), day.mentorHints.length - 1);
			}
		}
		return next;
	}

	function sanitizeCodeMap(map: Record<string, unknown>): Record<number, string> {
		const next: Record<number, string> = {};
		for (const day of data.days) {
			const raw = map[day.day];
			if (typeof raw === 'string') next[day.day] = raw;
		}
		return next;
	}

	function clonePortfolio(source: PortfolioProfile): PortfolioProfile {
		return {
			...source,
			skills: [...source.skills],
			projects: source.projects.map((project) => ({ ...project }))
		};
	}

	function isPortfolioProfile(value: unknown): value is PortfolioProfile {
		if (!value || typeof value !== 'object') return false;
		const candidate = value as Partial<PortfolioProfile>;
		return (
			typeof candidate.name === 'string' &&
			typeof candidate.role === 'string' &&
			typeof candidate.bio === 'string' &&
			typeof candidate.location === 'string' &&
			typeof candidate.email === 'string' &&
			Array.isArray(candidate.skills) &&
			candidate.skills.every((skill) => typeof skill === 'string') &&
			Array.isArray(candidate.projects) &&
			candidate.projects.every(isPortfolioProject)
		);
	}

	function isPortfolioProject(project: unknown): project is PortfolioProject {
		if (!project || typeof project !== 'object') return false;
		const candidate = project as Partial<PortfolioProject>;
		return (
			typeof candidate.id === 'number' &&
			typeof candidate.title === 'string' &&
			typeof candidate.description === 'string' &&
			typeof candidate.tag === 'string' &&
			typeof candidate.featured === 'boolean'
		);
	}

	function showToast(message: string) {
		toastMessage = message;
		if (toastTimer) clearTimeout(toastTimer);
		toastTimer = setTimeout(() => {
			toastMessage = '';
		}, 3200);
	}

	function selectDay(day: number) {
		currentDay = Math.min(Math.max(day, 1), data.days.length);
		mentorAnswer = '';
		mentorError = '';
		mentorQuestion = '';
	}

	function goToPreviousDay() {
		selectDay(currentDay - 1);
	}

	function goToNextDay() {
		selectDay(currentDay + 1);
	}

	function blockProgress(block: CourseBlock): number {
		const blockDays = data.days.filter((day) => day.block === block);
		const completed = blockDays.filter((day) => completedDays.has(day.day)).length;
		return Math.round((completed / blockDays.length) * 100);
	}

	function dayStatus(
		day: TaskCourseDay
	): 'practicado' | 'en curso' | 'necesito pista' | 'no empezado' {
		if (completedDays.has(day.day)) return 'practicado';
		if ((hintByDay[day.day] ?? 0) > 0) return 'necesito pista';
		if ((checklistByDay[day.day] ?? []).length > 0 || day.day === currentDay) return 'en curso';
		return 'no empezado';
	}

	function dayStatusLabel(day: TaskCourseDay): string {
		const status = dayStatus(day);
		if (status === 'practicado') return 'Practicado';
		if (status === 'necesito pista') return 'Con pistas';
		if (status === 'en curso') return 'En curso';
		return 'Sin empezar';
	}

	function getNextStudentAction(): string {
		if (isCurrentComplete) return 'Puedes pasar al siguiente día o repetir este sin presión.';
		if (currentDay === 1) return "Cambia 'Tu Nombre' por tu nombre.";
		if (currentDay === 2) return 'Añade una palabra dentro de la lista skills.';
		if (currentDay === 3) return 'Cambia un dato dentro de la ficha perfil.';
		if (currentChecklist.length === 0) {
			return 'Cambia el código del editor y mira el resultado.';
		}
		if (currentChecklist.length < current.checklist.length) {
			return 'Sigue el checklist de uno en uno. No tienes que entenderlo todo a la primera.';
		}
		return 'Ya hiciste los pasos. Marca el día como practicado cuando te suene lo que has hecho.';
	}

	function getBeginnerSteps(day: TaskCourseDay): BeginnerStep[] {
		if (day.day === 1) {
			return [
				{ label: 'Idea', text: 'Una variable guarda un dato.' },
				{ label: 'Toca', text: 'Cambia el texto entre comillas.' },
				{ label: 'Mira', text: 'El portfolio cambia a la derecha.' }
			];
		}

		if (day.day === 2) {
			return [
				{ label: 'Idea', text: 'Una lista guarda varios datos.' },
				{ label: 'Toca', text: 'Añade otra skill entre comillas.' },
				{ label: 'Mira', text: 'Aparece otro chip en el portfolio.' }
			];
		}

		if (day.day === 3) {
			return [
				{ label: 'Idea', text: 'Un objeto agrupa datos de una misma cosa.' },
				{ label: 'Toca', text: 'Cambia name, role o location.' },
				{ label: 'Mira', text: 'La ficha del portfolio se actualiza.' }
			];
		}

		if (day.day === 4) {
			return [
				{ label: 'Idea', text: 'Una función evita repetir código.' },
				{ label: 'Toca', text: 'Cambia el título del proyecto.' },
				{ label: 'Mira', text: 'Nace la sección proyectos.' }
			];
		}

		if (day.day === 8) {
			return [
				{ label: 'Idea', text: 'Svelte pinta datos en HTML.' },
				{ label: 'Toca', text: 'Mira las llaves { } del ejemplo.' },
				{ label: 'Mira', text: 'El perfil ya parece una web.' }
			];
		}

		if (day.day === 15) {
			return [
				{ label: 'Idea', text: 'Una ruta es una pantalla con URL.' },
				{ label: 'Toca', text: 'Lee el nombre del archivo.' },
				{ label: 'Mira', text: 'El portfolio se prepara para vivir solo.' }
			];
		}

		if (day.day === 19) {
			return [
				{ label: 'Idea', text: 'Un formulario recoge mensajes.' },
				{ label: 'Toca', text: 'Revisa nombre, email y mensaje.' },
				{ label: 'Mira', text: 'Aparece contacto en el portfolio.' }
			];
		}

		return [
			{ label: 'Idea', text: day.concept.replace(/\.$/, '') },
			{ label: 'Toca', text: day.guidedSteps[0] ?? 'Cambia una parte pequeña del código.' },
			{ label: 'Mira', text: day.expectedState }
		];
	}

	function toggleStep(index: number) {
		if (currentChecklist.includes(index)) {
			checklistByDay = {
				...checklistByDay,
				[currentDay]: currentChecklist.filter((step) => step !== index)
			};
		} else {
			checklistByDay = {
				...checklistByDay,
				[currentDay]: [...currentChecklist, index].sort((a, b) => a - b)
			};
		}
	}

	function updateCurrentCode(value: string) {
		codeByDay = { ...codeByDay, [currentDay]: value };
		if (!currentChecklist.includes(0)) {
			checklistByDay = { ...checklistByDay, [currentDay]: [0] };
		}
	}

	function resetCurrentCode() {
		codeByDay = { ...codeByDay, [currentDay]: current.codeSample };
		showToast('Código reiniciado.');
	}

	function resetPortfolio() {
		portfolio = clonePortfolio(starterPortfolio);
		codeByDay = {};
		showToast('Portfolio reiniciado. Vuelta a la primera versión.');
	}

	function toggleCurrentDay() {
		if (completedDays.has(currentDay)) {
			completedDays.delete(currentDay);
			showToast('Sello retirado. Puedes volver a practicar este día.');
		} else {
			completedDays.add(currentDay);
			showToast(`${current.completionCue} Sello desbloqueado.`);
		}
	}

	function completeAndGoNext() {
		completedDays.add(currentDay);
		if (currentDay < data.days.length) {
			selectDay(currentDay + 1);
			showToast(`Día ${currentDay - 1} guardado. Seguimos.`);
		} else {
			showToast('Curso completado.');
		}
	}

	function applyCodeToPortfolio(
		basePortfolio: PortfolioProfile,
		day: number,
		code: string
	): PortfolioProfile {
		const next = clonePortfolio(basePortfolio);

		if (day === 1) {
			next.name = extractAssignedString(code, ['nombre', 'name']) ?? next.name;
			next.role = extractAssignedString(code, ['titular', 'role']) ?? next.role;
		}

		if (day === 2 || day === 10 || day === 11) {
			next.skills = extractArray(code, 'skills') ?? next.skills;
		}

		if (day === 3 || day === 8 || day === 9 || day === 16 || day === 17) {
			next.name = extractObjectString(code, ['perfil', 'profile'], 'name') ?? next.name;
			next.role =
				extractObjectString(code, ['perfil', 'profile'], 'role') ??
				extractAssignedString(code, ['role']) ??
				next.role;
			next.location = extractObjectString(code, ['perfil', 'profile'], 'location') ?? next.location;
			next.bio = extractObjectString(code, ['perfil', 'profile'], 'bio') ?? next.bio;
			next.email = extractObjectString(code, ['perfil', 'profile'], 'email') ?? next.email;
		}

		if (day >= 4 && day <= 7) {
			const projectTitles = extractProjectTitles(code);
			if (projectTitles.length > 0) {
				next.projects = projectTitles.map((title, index) => ({
					id: index + 1,
					title,
					description:
						index === 0 ? 'Proyecto creado desde tu código.' : 'Otra pieza del portfolio.',
					tag: index === 0 ? blockNames.javascript : 'práctica',
					featured: code.includes('featured: true') || code.includes('★')
				}));
			}
		}

		return next;
	}

	function extractAssignedString(code: string, names: string[]): string | null {
		for (const name of names) {
			const match = code.match(
				new RegExp(`(?:let|const)\\s+${name}\\s*=\\s*['"\`]([^'"\`]+)['"\`]`)
			);
			if (match?.[1]) return match[1];
		}
		return null;
	}

	function extractObjectString(code: string, objectNames: string[], key: string): string | null {
		for (const objectName of objectNames) {
			const objectMatch = code.match(new RegExp(`${objectName}\\s*=\\s*\\{([\\s\\S]*?)\\}`));
			const body = objectMatch?.[1];
			if (!body) continue;
			const valueMatch = body.match(new RegExp(`${key}\\s*:\\s*['"\`]([^'"\`]+)['"\`]`));
			if (valueMatch?.[1]) return valueMatch[1];
		}
		return null;
	}

	function extractArray(code: string, name: string): string[] | null {
		const assigned = code.match(new RegExp(`${name}\\s*=\\s*\\[([\\s\\S]*?)\\]`));
		const items =
			assigned?.[1]
				.match(/['"`]([^'"`]+)['"`]/g)
				?.map((item) => item.slice(1, -1))
				.filter(Boolean) ?? [];
		const pushed =
			[...code.matchAll(new RegExp(`${name}\\.push\\(\\s*['"\`]([^'"\`]+)['"\`]\\s*\\)`, 'g'))]
				.map((match) => match[1])
				.filter(Boolean) ?? [];
		const result = [...items, ...pushed];
		return result.length > 0 ? result : null;
	}

	function extractProjectTitles(code: string): string[] {
		const titles = [
			...code.matchAll(/title\s*:\s*['"`]([^'"`]+)['"`]/g),
			...code.matchAll(/crearProyecto\(\s*['"`]([^'"`]+)['"`]/g)
		].map((match) => match[1]);
		const standalone = extractAssignedString(code, ['title']);
		return [...new Set(standalone ? [standalone, ...titles] : titles)];
	}

	function revealNextHint() {
		const nextLevel = Math.min(currentHintLevel + 1, current.mentorHints.length - 1);
		hintByDay = { ...hintByDay, [currentDay]: nextLevel };
		showToast(
			nextLevel === currentHintLevel
				? 'Ya tienes todas las pistas de esta misión.'
				: 'Nueva pista desbloqueada. Sube el volumen, pero paso a paso.'
		);
	}

	async function askMentor() {
		const message = mentorQuestion.trim();
		if (!message || mentorLoading) return;

		mentorLoading = true;
		mentorError = '';
		mentorAnswer = '';

		try {
			const response = await fetch('/api/preguntar', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({
					dia: currentDay,
					ejercicio: 1,
					enunciado: current.objective,
					codigoActual: current.codeSample,
					queDebePasar: [current.expectedState],
					mensaje: message,
					historial: []
				})
			});

			if (!response.ok) {
				throw new Error('mentor-unavailable');
			}

			const json = (await response.json()) as { respuesta?: string };
			mentorAnswer =
				json.respuesta ?? 'El mentor no pudo responder con claridad. Prueba con otra pregunta.';
			mentorQuestion = '';
		} catch {
			mentorError =
				'El mentor IA no está disponible ahora. Usa las pistas locales: el curso sigue funcionando.';
		} finally {
			mentorLoading = false;
		}
	}
</script>

<svelte:head>
	<title>DevDays Street Lab</title>
	<meta name="theme-color" content="#08080a" />
</svelte:head>

<header
	class="sticky top-0 z-30 border-b-[3px] border-[var(--street-shadow)] bg-[var(--street-bg)]/95 px-4 py-3 text-[var(--street-ink)] backdrop-blur sm:px-6"
>
	<div class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
		<div class="flex min-w-0 items-center gap-3">
			<span
				class="material-symbols-outlined street-sticker h-11 w-11 rotate-[-4deg] text-2xl"
				style="font-variation-settings: 'FILL' 1;"
				aria-hidden="true">task_alt</span
			>
			<div class="min-w-0">
				<p
					class="street-display text-2xl leading-none text-[var(--street-lime)] [-webkit-text-stroke:1px_var(--street-shadow)]"
				>
					DevDays
				</p>
				<p class="text-xs font-black uppercase tracking-wide text-[var(--street-ink)]">
					Street Lab · 21 misiones
				</p>
			</div>
		</div>

		<div class="flex items-center gap-3">
			<div class="hidden min-w-36 sm:block">
				<div
					class="h-3 overflow-hidden rounded-full border-2 border-[var(--street-shadow)] bg-[var(--street-paper)]"
				>
					<div
						class="h-full rounded-full bg-[var(--street-lime)]"
						style={`width: ${completionPercent}%`}
					></div>
				</div>
				<p class="mt-1 text-right text-xs font-bold text-[var(--street-ink)]">
					{completedCount}/{data.days.length} misiones practicadas
				</p>
			</div>
			<button
				type="button"
				onclick={toggleMode}
				aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
				class="street-hard-shadow flex h-9 w-9 items-center justify-center rounded-md border-2 border-[var(--street-shadow)] bg-[var(--street-paper)] text-[#101018] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-[var(--street-lime)]"
			>
				<span class="material-symbols-outlined text-xl" aria-hidden="true">
					{isDark ? 'light_mode' : 'dark_mode'}
				</span>
			</button>
		</div>
	</div>
</header>

<main class="street-shell min-h-dvh">
	<section
		class="flex min-h-[calc(100dvh-76px)] items-center border-b-[3px] border-[var(--street-shadow)]"
	>
		<div
			class="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8"
		>
			<div class="relative min-h-[58vh] overflow-hidden py-6">
				<div
					class="pointer-events-none absolute -right-16 bottom-0 h-64 w-80 rotate-[-8deg] bg-[url('/street-stickers.webp')] bg-contain bg-no-repeat opacity-25 sm:h-80 sm:w-[28rem] sm:opacity-35"
				></div>
				<p class="street-tag px-3 py-1 text-xs">Empieza aquí · sin saber código</p>
				<h1
					class="street-display relative mt-5 max-w-4xl text-5xl leading-[0.9] text-[var(--street-lime)] [-webkit-text-stroke:2px_var(--street-shadow)] sm:text-7xl lg:text-8xl"
				>
					Crea tu primer portfolio web.
				</h1>
				<p class="relative mt-5 max-w-xl text-lg font-black text-[var(--street-ink)] sm:text-xl">
					21 días. Tu CV online. Un paso cada vez.
				</p>
				<div class="relative mt-7 flex flex-wrap gap-3">
					<Button href={data.userEmail ? '#mision-actual' : '/login'}>
						{data.userEmail ? 'Seguir aprendiendo' : 'Entrar con Magic Link'}
					</Button>
					<Button variant="outline" href="#mision-actual">Probar sin agobio</Button>
				</div>
				<p class="relative mt-4 max-w-lg text-sm font-bold text-[var(--street-ink)]">
					{data.userEmail
						? `Sesión iniciada como ${data.userEmail}.`
						: 'El Magic Link te manda un enlace al email. Sin contraseña, sin líos.'}
				</p>
			</div>

			<div class="street-paper street-tape p-5 pt-7">
				<p class="street-display text-3xl text-[#101018]">Primer minuto</p>
				<ol class="mt-4 space-y-3 text-sm font-black text-[#101018]">
					<li class="flex gap-3">
						<span class="street-sticker h-7 w-7 shrink-0 text-xs">1</span>
						<span>Entra con tu email para guardar el acceso.</span>
					</li>
					<li class="flex gap-3">
						<span class="street-sticker street-sticker-pink h-7 w-7 shrink-0 text-xs">2</span>
						<span>Edita el código del día.</span>
					</li>
					<li class="flex gap-3">
						<span class="street-sticker h-7 w-7 shrink-0 text-xs">3</span>
						<span>Mira el resultado a la derecha.</span>
					</li>
				</ol>
				<details class="mt-5 rounded-md border-2 border-[#101018] bg-white p-3 text-[#101018]">
					<summary class="cursor-pointer text-sm font-black">Qué significa cada zona</summary>
					<div class="mt-3 grid gap-2 text-sm font-bold">
						<p><strong>Misión:</strong> lo que practicas hoy.</p>
						<p><strong>Código:</strong> lo que escribes.</p>
						<p><strong>Resultado:</strong> tu portfolio vivo.</p>
						<p><strong>Pista:</strong> ayuda sin examen.</p>
					</div>
				</details>
			</div>
		</div>
	</section>

	<section
		class="border-b-[3px] border-[var(--street-shadow)] bg-[color-mix(in_oklab,var(--street-pink)_14%,transparent)]"
	>
		<div class="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
			<p class="street-display mr-2 text-2xl leading-none text-[var(--street-ink)]">Tracks</p>
			{#each blocks as block (block)}
				<button
					type="button"
					onclick={() => selectDay(data.days.find((day) => day.block === block)?.day ?? 1)}
					class="flex min-w-0 flex-1 basis-56 items-center gap-3 rounded-md border-[3px] border-[var(--street-shadow)] bg-[var(--street-paper)] px-3 py-2 text-left text-[#101018] shadow-[4px_4px_0_var(--street-shadow)] transition-transform hover:-translate-y-0.5 focus-visible:outline-[3px] focus-visible:outline-[var(--street-lime)]"
				>
					<div
						class="h-3 flex-1 overflow-hidden rounded-full border-2 border-[var(--street-shadow)] bg-white"
					>
						<div
							class="h-full rounded-full bg-[var(--street-lime)]"
							style={`width: ${blockProgress(block)}%`}
						></div>
					</div>
					<span class="truncate text-xs font-black">{blockLabels[block]}</span>
					<span class="text-xs font-black">{blockProgress(block)}%</span>
				</button>
			{/each}
		</div>
	</section>

	<div
		class="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(380px,0.8fr)] lg:px-8"
	>
		<section id="mision-actual" class="space-y-5">
			<div class="street-panel p-5">
				<div class="flex flex-wrap items-start justify-between gap-4">
					<div class="max-w-3xl">
						<div class="flex flex-wrap items-center gap-2">
							<span class="street-sticker px-3 py-1 text-xs">
								Día {current.day}
							</span>
							<span
								class="rounded-md border-2 border-[var(--street-shadow)] bg-[var(--street-paper)] px-3 py-1 text-xs font-black text-[#101018]"
							>
								{current.estimatedMinutes} min
							</span>
							<span
								class="rounded-md border-2 border-[var(--street-shadow)] bg-white px-3 py-1 text-xs font-black text-[#101018]"
							>
								{current.difficulty}
							</span>
							<span class="street-sticker street-sticker-pink px-3 py-1 text-xs">
								{dayStatusLabel(current)}
							</span>
						</div>
						<h2
							class="street-display mt-4 text-4xl leading-none text-[var(--street-ink)] sm:text-5xl"
						>
							{current.missionTitle}
						</h2>
						<p class="mt-3 max-w-2xl text-sm font-bold text-[var(--street-ink)] sm:text-base">
							{current.introSummary}
						</p>
					</div>
					<div class="flex flex-wrap justify-end gap-2">
						<Button variant="outline" onclick={goToPreviousDay} disabled={currentDay === 1}>
							Día anterior
						</Button>
						<Button onclick={goToNextDay} disabled={currentDay === data.days.length}>
							Día siguiente
						</Button>
						<span class="street-sticker px-3 py-1 text-sm">
							{currentDay}/{data.days.length}
						</span>
					</div>
				</div>

				<section
					class="mt-5 rounded-md border-[3px] border-[#101018] bg-white p-4 text-[#101018] shadow-[5px_5px_0_var(--street-shadow)]"
					aria-labelledby="lesson-title"
				>
					<p class="street-display text-3xl leading-none" id="lesson-title">Lección</p>
					<div class="mt-3 grid gap-3 md:grid-cols-3">
						<div>
							<p class="text-xs font-black uppercase tracking-wide text-[#101018]/60">Qué es</p>
							<p class="mt-1 text-sm font-black">{current.concept}</p>
						</div>
						<div>
							<p class="text-xs font-black uppercase tracking-wide text-[#101018]/60">Para qué</p>
							<p class="mt-1 text-sm font-black">{current.productStory}</p>
						</div>
						<div>
							<p class="text-xs font-black uppercase tracking-wide text-[#101018]/60">Prueba</p>
							<p class="mt-1 text-sm font-black">{current.miniChallenge}</p>
						</div>
					</div>
				</section>

				<div class="street-paper mt-5 p-4">
					<div class="flex items-start gap-3">
						<span
							class="material-symbols-outlined street-sticker street-sticker-pink h-9 w-9 shrink-0 text-lg"
							aria-hidden="true">near_me</span
						>
						<div>
							<p class="street-display text-2xl text-[#101018]">Ahora mismo haz esto</p>
							<p class="mt-1 text-sm font-bold text-[#101018]">{nextStudentAction}</p>
						</div>
					</div>
				</div>

				<details
					class="mt-4 rounded-md border-[3px] border-[var(--street-shadow)] bg-[var(--street-paper)] p-4 text-[#101018] shadow-[5px_5px_0_var(--street-shadow)]"
				>
					<summary class="cursor-pointer text-sm font-black">
						Ver objetivo y resultado esperado
					</summary>
					<div class="mt-3 grid gap-3 md:grid-cols-2">
						<div>
							<p class="street-display text-xl text-[#101018]">Hoy vas a aprender</p>
							<p class="mt-1 text-sm font-semibold text-[#101018]">{current.objective}</p>
						</div>
						<div>
							<p class="street-display text-xl text-[#101018]">Al final verás</p>
							<p class="mt-1 text-sm font-semibold text-[#101018]">{current.expectedState}</p>
						</div>
					</div>
				</details>

				<div class="mt-5 grid gap-3 md:grid-cols-3">
					{#each beginnerSteps as step (step.label)}
						<div class="rounded-md border-[3px] border-[#101018] bg-white p-3 text-[#101018]">
							<p class="street-display text-2xl leading-none">{step.label}</p>
							<p class="mt-2 text-sm font-black">{step.text}</p>
						</div>
					{/each}
				</div>
			</div>

			<section class="street-panel p-5" aria-labelledby="portfolio-actions-title">
				<div class="flex flex-wrap items-center justify-between gap-3">
					<h2
						id="portfolio-actions-title"
						class="street-display text-5xl leading-none text-[var(--street-ink)]"
					>
						Código
					</h2>
					<Button variant="outline" onclick={resetCurrentCode}>Reiniciar código</Button>
				</div>
				<p class="mt-2 text-sm font-black text-[var(--street-ink)]">{current.codeFocus}</p>
				<div class="mt-4">
					<CodeEditor
						value={currentCode}
						onChange={updateCurrentCode}
						filename={`dia-${current.day}.js`}
					/>
				</div>
				<div class="mt-4 flex flex-wrap gap-3">
					<Button onclick={completeAndGoNext}>
						{currentDay < data.days.length ? 'Siguiente día' : 'Terminar curso'}
					</Button>
					<Button variant="ghost" onclick={revealNextHint}>Pista</Button>
				</div>
			</section>

			<details class="street-panel p-5">
				<summary class="cursor-pointer list-none">
					<div class="flex flex-wrap items-center justify-between gap-3">
						<div>
							<h2
								id="checklist-title"
								class="street-display text-4xl leading-none text-[var(--street-ink)]"
							>
								Pasos
							</h2>
						</div>
						<span class="street-sticker px-3 py-1 text-sm">{currentChecklistPercent}%</span>
					</div>
				</summary>
				<div class="mt-5 space-y-2">
					{#each current.checklist as item, index (item)}
						<label
							class="flex cursor-pointer gap-3 rounded-md border-2 border-[var(--street-shadow)] bg-[var(--street-paper)] p-3 text-sm font-bold text-[#101018] shadow-[4px_4px_0_var(--street-shadow)] transition-transform hover:-translate-y-0.5"
						>
							<input
								type="checkbox"
								checked={currentChecklist.includes(index)}
								onchange={() => toggleStep(index)}
								class="mt-1 h-4 w-4 accent-[var(--street-pink)]"
							/>
							<span
								class={currentChecklist.includes(index)
									? 'text-[#101018]/55 line-through'
									: 'text-[#101018]'}
							>
								{item}
							</span>
						</label>
					{/each}
				</div>
			</details>
		</section>

		<aside class="space-y-5 lg:sticky lg:top-24">
			<section aria-labelledby="portfolio-preview-title" class="space-y-3">
				<div class="flex flex-wrap items-center justify-between gap-3">
					<h2
						id="portfolio-preview-title"
						class="street-display text-5xl leading-none text-[var(--street-ink)]"
					>
						Resultado
					</h2>
					<Button variant="outline" onclick={resetPortfolio}>Reset</Button>
				</div>

				<div
					class="overflow-hidden rounded-lg border border-slate-300 bg-slate-100 text-slate-950 shadow-2xl shadow-black/30"
					aria-label="Vista previa neutral del portfolio que estás creando"
				>
					<div class="flex items-center gap-2 border-b border-slate-300 bg-slate-200 px-3 py-2">
						<span class="h-2.5 w-2.5 rounded-full bg-red-400"></span>
						<span class="h-2.5 w-2.5 rounded-full bg-yellow-400"></span>
						<span class="h-2.5 w-2.5 rounded-full bg-green-400"></span>
						<span
							class="ml-2 truncate rounded bg-white px-2 py-1 text-xs font-semibold text-slate-600"
						>
							tu-portfolio.dev
						</span>
					</div>

					<div class="bg-white p-5 font-sans">
						<header class="border-b border-slate-200 pb-5">
							<p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
								{previewPortfolio.location}
							</p>
							<h3 class="mt-2 text-4xl font-black leading-none tracking-tight text-slate-950">
								{previewPortfolio.name}
							</h3>
							<p class="mt-2 text-base font-semibold text-slate-700">{previewPortfolio.role}</p>
							{#if showBio}
								<p class="mt-4 max-w-md text-sm leading-6 text-slate-600">
									{previewPortfolio.bio}
								</p>
							{/if}
						</header>

						{#if showSkills}
							<section class="py-5">
								<p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Skills</p>
								<div class="mt-3 flex flex-wrap gap-2">
									{#each previewPortfolio.skills as skill (skill)}
										<span
											class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
										>
											{skill}
										</span>
									{/each}
								</div>
							</section>
						{/if}

						{#if showProjects}
							<section class="border-t border-slate-200 pt-5">
								<div class="flex items-center justify-between gap-3">
									<p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
										Proyectos
									</p>
									<p class="text-xs font-semibold text-slate-500">
										{featuredProjects.length} destacados
									</p>
								</div>
								<div class="mt-3 space-y-3">
									{#each previewPortfolio.projects as project (project.id)}
										<article class="rounded-md border border-slate-200 bg-slate-50 p-3">
											<div class="flex items-start justify-between gap-3">
												<div>
													<p class="text-sm font-bold text-slate-950">{project.title}</p>
													<p class="mt-1 text-xs leading-5 text-slate-600">
														{project.description}
													</p>
												</div>
												<span
													class={`rounded-full px-2 py-1 text-xs font-bold ${
														project.featured
															? 'bg-slate-950 text-white'
															: 'bg-white text-slate-500 ring-1 ring-slate-200'
													}`}
												>
													{project.featured ? 'Destacado' : 'Normal'}
												</span>
											</div>
											<p class="mt-3 text-xs font-bold uppercase tracking-wide text-slate-400">
												{project.tag}
											</p>
										</article>
									{/each}
								</div>
							</section>
						{/if}

						{#if showContact}
							<footer
								class="mt-5 border-t border-slate-200 pt-4 text-xs font-semibold text-slate-500"
							>
								{previewPortfolio.email}
							</footer>
						{/if}

						{#if !showContact}
							<div class="mt-5 border-t border-slate-200 pt-4">
								<p class="text-xs font-semibold text-slate-400">
									Día {current.day}: versión en construcción
								</p>
							</div>
						{/if}
					</div>
				</div>
			</section>

			<section class="street-panel p-5">
				<div class="flex items-start gap-3">
					<span
						class="material-symbols-outlined street-sticker h-10 w-10 text-xl"
						style="font-variation-settings: 'FILL' 1;"
						aria-hidden="true">psychology</span
					>
					<div>
						<p class="street-display text-3xl leading-none text-[var(--street-ink)]">Pistas</p>
					</div>
				</div>

				<div class="mt-4 space-y-3">
					{#each visibleHints as hint, index (hint)}
						<div class="street-paper p-3">
							<p class="street-display text-xl text-[#101018]">Pista {index + 1}</p>
							<p class="mt-1 text-sm font-semibold text-[#101018]">{hint}</p>
						</div>
					{/each}
				</div>

				<div class="mt-4 flex flex-wrap gap-2">
					<Button variant="outline" onclick={revealNextHint}>Dame otra pista</Button>
					<Button variant="ghost" onclick={toggleCurrentDay}>
						{isCurrentComplete ? 'Quitar marca' : 'Ya lo he practicado'}
					</Button>
				</div>
			</section>

			<details class="street-panel p-5">
				<summary class="cursor-pointer list-none">
					<p class="street-display text-3xl leading-none text-[var(--street-ink)]">
						Preguntar al mentor
					</p>
				</summary>
				<div class="mt-4">
					<textarea
						bind:value={mentorQuestion}
						class="min-h-24 w-full resize-y rounded-md border-[3px] border-[var(--street-shadow)] bg-[var(--street-paper)] p-3 text-sm font-semibold text-[#101018] shadow-[4px_4px_0_var(--street-shadow)] outline-none transition focus:translate-x-1 focus:translate-y-1 focus:shadow-none focus:ring-3 focus:ring-[var(--street-lime)]"
						placeholder="Ejemplo: no entiendo qué estoy viendo en este ejemplo"
					></textarea>
					<div class="mt-3 flex justify-end">
						<Button onclick={askMentor} disabled={mentorLoading || !mentorQuestion.trim()}>
							{mentorLoading ? 'Preguntando...' : 'Preguntar al mentor'}
						</Button>
					</div>
					{#if mentorAnswer}
						<div class="street-paper mt-4 p-3">
							<p class="text-sm font-semibold text-[#101018]">{mentorAnswer}</p>
						</div>
					{/if}
					{#if mentorError}
						<div class="street-paper mt-4 p-3">
							<p class="text-sm font-semibold text-[#101018]">{mentorError}</p>
						</div>
					{/if}
				</div>
			</details>
		</aside>
	</div>

	<section
		class="border-t-[3px] border-[var(--street-shadow)] bg-[color-mix(in_oklab,var(--street-lime)_12%,transparent)]"
	>
		<div class="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
			<details>
				<summary class="cursor-pointer list-none">
					<div class="flex flex-wrap items-center justify-between gap-3">
						<div>
							<p class="street-display text-4xl leading-none text-[var(--street-ink)]">
								Días del curso
							</p>
							<p class="text-sm font-bold text-[var(--street-ink)]">
								Día actual: {current.day}. Abre esto solo si quieres cambiar.
							</p>
						</div>
						<p class="street-sticker px-3 py-1 text-sm">{completionPercent}% practicado</p>
					</div>
				</summary>
				<div
					class="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-7 lg:grid-cols-[repeat(21,minmax(0,1fr))]"
				>
					{#each data.days as day (day.day)}
						<button
							type="button"
							onclick={() => selectDay(day.day)}
							class={`min-h-12 rounded-md border-[3px] border-[var(--street-shadow)] px-2 text-sm font-black shadow-[4px_4px_0_var(--street-shadow)] transition-transform hover:-translate-y-0.5 ${
								day.day === currentDay
									? 'bg-[var(--street-pink)] text-white'
									: completedDays.has(day.day)
										? 'bg-[var(--street-lime)] text-[#101018]'
										: 'bg-[var(--street-paper)] text-[#101018]'
							}`}
							aria-label={`Ir al día ${day.day}: ${day.title}`}
						>
							{day.day}
						</button>
					{/each}
				</div>
			</details>
		</div>
	</section>
</main>

{#if toastMessage}
	<div
		class="street-hit fixed right-4 bottom-4 z-40 max-w-sm rounded-md border-[3px] border-[var(--street-shadow)] bg-[var(--street-pink)] px-4 py-3 text-sm font-black text-white shadow-[6px_6px_0_var(--street-shadow)]"
		role="status"
	>
		{toastMessage}
	</div>
{/if}
