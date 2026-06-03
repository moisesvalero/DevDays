<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { mode, setMode, toggleMode } from 'mode-watcher';
	import { SvelteSet } from 'svelte/reactivity';
	import { Button } from '$lib/components/ui/button';
	import CodeBlock from '$lib/components/study/CodeBlock.svelte';
	import { blockLabels, starterTasks } from '$lib/data/task-course';
	import type { CourseBlock, TaskCourseDay, TaskItem } from '$lib/types/task-course';

	type StudyState = {
		currentDay: number;
		completedDays: number[];
		checklistByDay: Record<number, number[]>;
		hintByDay: Record<number, number>;
		tasks: TaskItem[];
	};

	let { data }: { data: { days: TaskCourseDay[] } } = $props();

	const storageKey = 'devdays-task-course-state-v2';
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
	let tasks = $state<TaskItem[]>(starterTasks.map((task) => ({ ...task })));
	let draftTitle = $state('');
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
	const pendingTasks = $derived(tasks.filter((task) => !task.done));
	const doneTasks = $derived(tasks.filter((task) => task.done));
	const isCurrentComplete = $derived(completedDays.has(currentDay));
	const currentChecklistPercent = $derived(
		Math.round((currentChecklist.length / current.checklist.length) * 100)
	);
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
				if (Array.isArray(parsed.tasks) && parsed.tasks.length > 0) {
					tasks = parsed.tasks.filter(isTaskItem);
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
			tasks
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

	function isTaskItem(task: unknown): task is TaskItem {
		if (!task || typeof task !== 'object') return false;
		const candidate = task as Partial<TaskItem>;
		return (
			typeof candidate.id === 'number' &&
			typeof candidate.title === 'string' &&
			typeof candidate.done === 'boolean' &&
			typeof candidate.tag === 'string'
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
		currentDay = day;
		mentorAnswer = '';
		mentorError = '';
		mentorQuestion = '';
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

	function addTask() {
		const title = draftTitle.trim();
		if (!title) return;

		tasks = [
			...tasks,
			{
				id: Date.now(),
				title,
				done: false,
				tag: current.block === 'javascript' ? 'lógica' : blockNames[current.block]
			}
		];
		draftTitle = '';
		showToast('Tarea pegada al muro. El gestor ya responde a tu práctica.');
	}

	function toggleTask(id: number) {
		tasks = tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task));
	}

	function resetTasks() {
		tasks = starterTasks.map((task) => ({ ...task }));
		showToast('Muro limpio. Vuelta al beat inicial.');
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
	<section class="border-b-[3px] border-[var(--street-shadow)]">
		<div
			class="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_390px] lg:px-8"
		>
			<div class="street-panel relative max-w-3xl overflow-hidden p-5 sm:p-7">
				<div
					class="absolute -right-16 -bottom-20 h-52 w-72 rotate-[-8deg] bg-[url('/street-stickers.svg')] bg-contain bg-no-repeat opacity-25 sm:opacity-35"
				></div>
				<p class="street-tag px-3 py-1 text-xs">Street Lab · JS/Svelte</p>
				<h1
					class="street-display relative mt-4 max-w-2xl text-5xl leading-[0.9] text-[var(--street-lime)] [-webkit-text-stroke:2px_var(--street-shadow)] sm:text-7xl"
				>
					Construye tu gestor, misión a misión.
				</h1>
				<p class="relative mt-5 max-w-2xl text-base font-semibold text-[var(--street-ink)]">
					DevDays es un taller de 21 días con ritmo de libreta urbana: una idea, una práctica, un
					avance visible. Sin examen diario, sin pose de dashboard, sin correr antes de entender.
				</p>
				<div class="mt-5 flex flex-wrap gap-3">
					<Button onclick={() => selectDay(1)}>Soltar misión 1</Button>
					<Button variant="outline" href="#mision-actual">Ir al beat actual</Button>
				</div>
			</div>

			<div class="street-paper street-tape p-5 pt-7">
				<p class="street-display text-3xl text-[#101018]">Cómo va el rollo</p>
				<div class="mt-4 space-y-3">
					<div class="flex gap-3">
						<span
							class="material-symbols-outlined street-sticker h-8 w-8 text-base"
							aria-hidden="true">flag</span
						>
						<p class="text-sm font-bold text-[#101018]">
							Una misión, un objetivo y una práctica corta.
						</p>
					</div>
					<div class="flex gap-3">
						<span
							class="material-symbols-outlined street-sticker street-sticker-pink h-8 w-8 text-base"
							aria-hidden="true">checklist</span
						>
						<p class="text-sm font-bold text-[#101018]">Checklist guardado en tu navegador.</p>
					</div>
					<div class="flex gap-3">
						<span
							class="material-symbols-outlined street-sticker h-8 w-8 text-base"
							aria-hidden="true">psychology</span
						>
						<p class="text-sm font-bold text-[#101018]">Pistas locales y mentor IA opcional.</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section
		class="border-b-[3px] border-[var(--street-shadow)] bg-[color-mix(in_oklab,var(--street-pink)_14%,transparent)]"
	>
		<div class="mx-auto grid max-w-7xl gap-3 px-4 py-4 sm:px-6 md:grid-cols-3 lg:px-8">
			{#each blocks as block (block)}
				<button
					type="button"
					onclick={() => selectDay(data.days.find((day) => day.block === block)?.day ?? 1)}
					class="street-panel p-4 text-left transition-transform hover:-translate-y-1 focus-visible:outline-[3px] focus-visible:outline-[var(--street-lime)]"
				>
					<div class="flex items-center justify-between gap-3">
						<p class="street-display text-2xl leading-none text-[var(--street-ink)]">
							{blockLabels[block]}
						</p>
						<span class="street-sticker px-2 py-0.5 text-xs">{blockProgress(block)}%</span>
					</div>
					<div
						class="mt-3 h-3 overflow-hidden rounded-full border-2 border-[var(--street-shadow)] bg-[var(--street-paper)]"
					>
						<div
							class="h-full rounded-full bg-[var(--street-lime)]"
							style={`width: ${blockProgress(block)}%`}
						></div>
					</div>
				</button>
			{/each}
		</div>
	</section>

	<div
		class="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-8"
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
						<p class="mt-3 max-w-2xl text-base font-semibold text-[var(--street-ink)]">
							{current.introSummary}
						</p>
					</div>
					<Button variant={isCurrentComplete ? 'secondary' : 'default'} onclick={toggleCurrentDay}>
						{isCurrentComplete ? 'Misión practicada' : 'Marcar misión'}
					</Button>
				</div>

				<div class="mt-5 grid gap-4 md:grid-cols-2">
					<div class="street-paper p-4">
						<p class="street-display text-2xl text-[#101018]">Objetivo</p>
						<p class="mt-2 text-sm font-semibold text-[#101018]">{current.objective}</p>
					</div>
					<div class="street-paper p-4">
						<p class="street-display text-2xl text-[#101018]">Estado esperado</p>
						<p class="mt-2 text-sm font-semibold text-[#101018]">{current.expectedState}</p>
					</div>
				</div>
			</div>

			<div class="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
				<section
					aria-labelledby="task-preview-title"
					class="street-panel relative overflow-hidden p-5"
				>
					<div
						class="absolute top-3 right-4 h-20 w-28 rotate-6 bg-[url('/street-stickers.svg')] bg-contain bg-no-repeat opacity-25"
					></div>
					<div class="mb-5 flex flex-wrap items-center justify-between gap-3">
						<div>
							<p class="street-tag px-2 py-0.5 text-xs">Producto en construcción</p>
							<h2
								id="task-preview-title"
								class="street-display mt-3 text-4xl leading-none text-[var(--street-ink)]"
							>
								Gestor de tareas
							</h2>
							<p class="text-sm font-bold text-[var(--street-ink)]">
								{pendingTasks.length} pendientes · {doneTasks.length} completadas
							</p>
						</div>
						<Button variant="outline" onclick={resetTasks}>Reiniciar</Button>
					</div>

					<form
						class="flex flex-col gap-2 sm:flex-row"
						onsubmit={(event) => {
							event.preventDefault();
							addTask();
						}}
					>
						<label class="sr-only" for="task-title">Nueva tarea</label>
						<input
							id="task-title"
							bind:value={draftTitle}
							class="min-h-11 flex-1 rounded-md border-[3px] border-[var(--street-shadow)] bg-[var(--street-paper)] px-3 text-sm font-bold text-[#101018] shadow-[4px_4px_0_var(--street-shadow)] outline-none transition focus:translate-x-1 focus:translate-y-1 focus:shadow-none focus:ring-3 focus:ring-[var(--street-lime)]"
							placeholder="Escribe una tarea pequeña"
							autocomplete="off"
						/>
						<Button type="submit">Añadir tarea</Button>
					</form>

					<div class="mt-5 space-y-2">
						{#each tasks as task (task.id)}
							<div
								class="street-paper flex min-h-16 items-center gap-3 px-3 py-2 transition-transform hover:rotate-[-0.5deg]"
							>
								<button
									type="button"
									onclick={() => toggleTask(task.id)}
									class={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border-[3px] border-[var(--street-shadow)] transition-transform ${
										task.done
											? 'bg-[var(--street-lime)] text-[#101018]'
											: 'bg-white text-[#101018] hover:-translate-y-0.5'
									}`}
									aria-label={task.done
										? `Marcar ${task.title} como pendiente`
										: `Marcar ${task.title} como completada`}
								>
									<span class="material-symbols-outlined text-base" aria-hidden="true">
										{task.done ? 'check' : 'radio_button_unchecked'}
									</span>
								</button>
								<div class="min-w-0 flex-1">
									<p
										class={`truncate text-sm font-black ${task.done ? 'text-[#101018]/60 line-through' : 'text-[#101018]'}`}
									>
										{task.title}
									</p>
									<p class="text-xs font-bold uppercase tracking-wide text-[#101018]/70">
										{task.tag}
									</p>
								</div>
							</div>
						{/each}
					</div>
				</section>

				<section aria-labelledby="checklist-title" class="street-panel p-5">
					<div class="flex items-start justify-between gap-4">
						<div>
							<p class="street-tag px-2 py-0.5 text-xs">Checklist de misión</p>
							<h2
								id="checklist-title"
								class="street-display mt-3 text-4xl leading-none text-[var(--street-ink)]"
							>
								Practica sin perderte
							</h2>
						</div>
						<span class="street-sticker px-3 py-1 text-sm">{currentChecklistPercent}%</span>
					</div>
					<div
						class="mt-4 h-3 overflow-hidden rounded-full border-2 border-[var(--street-shadow)] bg-[var(--street-paper)]"
					>
						<div
							class="h-full rounded-full bg-[var(--street-lime)]"
							style={`width: ${currentChecklistPercent}%`}
						></div>
					</div>

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
				</section>
			</div>

			<section aria-labelledby="code-title" class="street-panel p-5">
				<div class="mb-4 flex flex-wrap items-end justify-between gap-3">
					<div>
						<p class="street-tag px-2 py-0.5 text-xs">Código guiado</p>
						<h2
							id="code-title"
							class="street-display mt-3 text-4xl leading-none text-[var(--street-ink)]"
						>
							{current.codeFocus}
						</h2>
					</div>
					<p class="max-w-md text-sm font-semibold text-[var(--street-ink)]">
						{current.productStory}
					</p>
				</div>
				<CodeBlock code={current.codeSample} language="javascript" />
			</section>
		</section>

		<aside class="space-y-5 lg:sticky lg:top-24">
			<section class="street-panel p-5">
				<div class="flex items-start gap-3">
					<span
						class="material-symbols-outlined street-sticker h-10 w-10 text-xl"
						style="font-variation-settings: 'FILL' 1;"
						aria-hidden="true">psychology</span
					>
					<div>
						<p class="street-display text-3xl leading-none text-[var(--street-ink)]">Mentor</p>
						<p class="mt-1 text-sm font-semibold text-[var(--street-ink)]">
							Primero prueba. Si te atascas, abre una pista más.
						</p>
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
						{isCurrentComplete ? 'Quitar marca' : 'Lo he practicado'}
					</Button>
				</div>
			</section>

			<section class="street-panel p-5">
				<p class="street-display text-3xl leading-none text-[var(--street-ink)]">Preguntar IA</p>
				<p class="mt-2 text-sm font-semibold text-[var(--street-ink)]">
					Opcional. Si no hay IA configurada, las pistas locales siguen siendo suficientes.
				</p>
				<textarea
					bind:value={mentorQuestion}
					class="mt-4 min-h-24 w-full resize-y rounded-md border-[3px] border-[var(--street-shadow)] bg-[var(--street-paper)] p-3 text-sm font-semibold text-[#101018] shadow-[4px_4px_0_var(--street-shadow)] outline-none transition focus:translate-x-1 focus:translate-y-1 focus:shadow-none focus:ring-3 focus:ring-[var(--street-lime)]"
					placeholder="Ejemplo: no entiendo por qué usamos arrays aquí"
				></textarea>
				<div class="mt-3 flex justify-end">
					<Button onclick={askMentor} disabled={mentorLoading || !mentorQuestion.trim()}>
						{mentorLoading ? 'Preguntando...' : 'Preguntar IA'}
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
			</section>
		</aside>
	</div>

	<section
		class="border-t-[3px] border-[var(--street-shadow)] bg-[color-mix(in_oklab,var(--street-lime)_12%,transparent)]"
	>
		<div class="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
			<div class="mb-3 flex flex-wrap items-center justify-between gap-3">
				<div>
					<p class="street-display text-4xl leading-none text-[var(--street-ink)]">Ruta compacta</p>
					<p class="text-sm font-bold text-[var(--street-ink)]">
						Cambia de misión sin perder el contexto.
					</p>
				</div>
				<p class="street-sticker px-3 py-1 text-sm">{completionPercent}% del curso practicado</p>
			</div>
			<div class="grid grid-cols-3 gap-2 sm:grid-cols-7 lg:grid-cols-[repeat(21,minmax(0,1fr))]">
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
