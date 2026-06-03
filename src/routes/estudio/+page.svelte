<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { mode, toggleMode } from 'mode-watcher';
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
		showToast('Tarea añadida. El gestor ya responde a tu práctica.');
	}

	function toggleTask(id: number) {
		tasks = tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task));
	}

	function resetTasks() {
		tasks = starterTasks.map((task) => ({ ...task }));
		showToast('Gestor reiniciado para practicar otra vez.');
	}

	function toggleCurrentDay() {
		if (completedDays.has(currentDay)) {
			completedDays.delete(currentDay);
			showToast('Marca retirada. Puedes volver a practicar este día.');
		} else {
			completedDays.add(currentDay);
			showToast(current.completionCue);
		}
	}

	function revealNextHint() {
		const nextLevel = Math.min(currentHintLevel + 1, current.mentorHints.length - 1);
		hintByDay = { ...hintByDay, [currentDay]: nextLevel };
		showToast(
			nextLevel === currentHintLevel
				? 'Ya tienes todas las pistas de esta misión.'
				: 'Nueva pista desbloqueada.'
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

<header
	class="sticky top-0 z-30 border-b border-outline-variant bg-surface-container/95 px-4 py-3 backdrop-blur sm:px-6"
>
	<div class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
		<div class="flex min-w-0 items-center gap-3">
			<span
				class="material-symbols-outlined flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground"
				style="font-variation-settings: 'FILL' 1;"
				aria-hidden="true">task_alt</span
			>
			<div class="min-w-0">
				<p class="text-lg font-bold leading-tight text-primary">DevDays</p>
				<p class="text-xs text-on-surface-variant">Taller guiado de 21 días</p>
			</div>
		</div>

		<div class="flex items-center gap-3">
			<div class="hidden min-w-36 sm:block">
				<div class="h-2 overflow-hidden rounded-full bg-surface-container-high">
					<div class="h-full rounded-full bg-success" style={`width: ${completionPercent}%`}></div>
				</div>
				<p class="mt-1 text-right text-xs text-on-surface-variant">
					{completedCount}/{data.days.length} misiones practicadas
				</p>
			</div>
			<button
				type="button"
				onclick={toggleMode}
				aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
				class="flex h-9 w-9 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface focus-visible:outline-2 focus-visible:outline-primary"
			>
				<span class="material-symbols-outlined text-xl" aria-hidden="true">
					{isDark ? 'light_mode' : 'dark_mode'}
				</span>
			</button>
		</div>
	</div>
</header>

<main class="bg-background text-on-surface">
	<section class="border-b border-outline-variant bg-surface-container-lowest">
		<div
			class="mx-auto grid max-w-7xl gap-6 px-4 py-7 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8"
		>
			<div class="max-w-3xl">
				<p class="text-sm font-semibold text-primary">Antes de empezar</p>
				<h1 class="mt-2 max-w-2xl text-3xl font-bold leading-tight text-on-surface sm:text-4xl">
					Construye un gestor de tareas, una misión pequeña cada día.
				</h1>
				<p class="mt-4 max-w-2xl text-base text-on-surface-variant">
					DevDays es un taller de 21 días. No empiezas con teoría suelta: cada concepto añade una
					pieza visible al mismo producto. Entras, practicas, pides pistas si hace falta y marcas lo
					aprendido cuando te sientas listo.
				</p>
				<div class="mt-5 flex flex-wrap gap-3">
					<Button onclick={() => selectDay(1)}>Empezar misión 1</Button>
					<Button variant="outline" href="#mision-actual">Ver misión actual</Button>
				</div>
			</div>

			<div class="rounded-lg border border-outline-variant bg-surface-container-low p-4">
				<p class="text-sm font-bold text-on-surface">Cómo se juega sin jugar demasiado</p>
				<div class="mt-4 space-y-3">
					<div class="flex gap-3">
						<span class="material-symbols-outlined text-primary" aria-hidden="true">flag</span>
						<p class="text-sm text-on-surface-variant">
							Una misión, un objetivo y una práctica corta.
						</p>
					</div>
					<div class="flex gap-3">
						<span class="material-symbols-outlined text-primary" aria-hidden="true">checklist</span>
						<p class="text-sm text-on-surface-variant">Checklist guardado en tu navegador.</p>
					</div>
					<div class="flex gap-3">
						<span class="material-symbols-outlined text-primary" aria-hidden="true">psychology</span
						>
						<p class="text-sm text-on-surface-variant">Pistas locales y mentor IA opcional.</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="border-b border-outline-variant bg-surface-container-low">
		<div class="mx-auto grid max-w-7xl gap-3 px-4 py-4 sm:px-6 md:grid-cols-3 lg:px-8">
			{#each blocks as block (block)}
				<button
					type="button"
					onclick={() => selectDay(data.days.find((day) => day.block === block)?.day ?? 1)}
					class="rounded-lg border border-outline-variant bg-surface-container-lowest p-4 text-left transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-primary"
				>
					<div class="flex items-center justify-between gap-3">
						<p class="text-sm font-bold text-on-surface">{blockLabels[block]}</p>
						<span class="text-sm font-semibold text-primary">{blockProgress(block)}%</span>
					</div>
					<div class="mt-3 h-2 overflow-hidden rounded-full bg-surface-container-high">
						<div
							class="h-full rounded-full bg-primary"
							style={`width: ${blockProgress(block)}%`}
						></div>
					</div>
				</button>
			{/each}
		</div>
	</section>

	<div
		class="mx-auto grid max-w-7xl gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8"
	>
		<section id="mision-actual" class="space-y-5">
			<div class="rounded-lg border border-outline-variant bg-surface-container-lowest p-5">
				<div class="flex flex-wrap items-start justify-between gap-4">
					<div class="max-w-3xl">
						<div class="flex flex-wrap items-center gap-2">
							<span
								class="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground"
							>
								Día {current.day}
							</span>
							<span
								class="rounded-full bg-surface-container-high px-3 py-1 text-xs font-semibold text-on-surface-variant"
							>
								{current.estimatedMinutes} min
							</span>
							<span
								class="rounded-full bg-surface-container-high px-3 py-1 text-xs font-semibold text-on-surface-variant"
							>
								{current.difficulty}
							</span>
							<span class="rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success">
								{dayStatusLabel(current)}
							</span>
						</div>
						<h2 class="mt-4 text-2xl font-bold leading-tight text-on-surface sm:text-3xl">
							{current.missionTitle}
						</h2>
						<p class="mt-3 text-base text-on-surface-variant">{current.introSummary}</p>
					</div>
					<Button variant={isCurrentComplete ? 'secondary' : 'default'} onclick={toggleCurrentDay}>
						{isCurrentComplete ? 'Misión practicada' : 'Marcar misión'}
					</Button>
				</div>

				<div class="mt-5 grid gap-4 md:grid-cols-2">
					<div class="rounded-lg border border-outline-variant bg-surface-container-low p-4">
						<p class="text-sm font-bold text-on-surface">Objetivo</p>
						<p class="mt-2 text-sm text-on-surface-variant">{current.objective}</p>
					</div>
					<div class="rounded-lg border border-outline-variant bg-surface-container-low p-4">
						<p class="text-sm font-bold text-on-surface">Estado esperado</p>
						<p class="mt-2 text-sm text-on-surface-variant">{current.expectedState}</p>
					</div>
				</div>
			</div>

			<div class="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
				<section
					aria-labelledby="task-preview-title"
					class="rounded-lg border border-outline-variant bg-surface-container-lowest p-5"
				>
					<div class="mb-5 flex flex-wrap items-center justify-between gap-3">
						<div>
							<p class="text-sm font-semibold text-primary">Producto en construcción</p>
							<h2 id="task-preview-title" class="mt-1 text-xl font-bold text-on-surface">
								Gestor de tareas
							</h2>
							<p class="text-sm text-on-surface-variant">
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
							class="min-h-11 flex-1 rounded-lg border border-outline-variant bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
							placeholder="Escribe una tarea pequeña"
							autocomplete="off"
						/>
						<Button type="submit">Añadir tarea</Button>
					</form>

					<div class="mt-5 space-y-2">
						{#each tasks as task (task.id)}
							<div
								class="flex min-h-16 items-center gap-3 rounded-lg border border-outline-variant bg-surface-container-low px-3"
							>
								<button
									type="button"
									onclick={() => toggleTask(task.id)}
									class={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${
										task.done
											? 'border-success bg-success text-white'
											: 'border-outline bg-surface-container-lowest text-on-surface-variant hover:border-primary'
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
										class={`truncate text-sm font-semibold ${task.done ? 'text-on-surface-variant line-through' : 'text-on-surface'}`}
									>
										{task.title}
									</p>
									<p class="text-xs text-on-surface-variant">{task.tag}</p>
								</div>
							</div>
						{/each}
					</div>
				</section>

				<section
					aria-labelledby="checklist-title"
					class="rounded-lg border border-outline-variant bg-surface-container-lowest p-5"
				>
					<div class="flex items-start justify-between gap-4">
						<div>
							<p class="text-sm font-semibold text-primary">Checklist de misión</p>
							<h2 id="checklist-title" class="mt-1 text-xl font-bold text-on-surface">
								Practica sin perderte
							</h2>
						</div>
						<span class="text-sm font-bold text-primary">{currentChecklistPercent}%</span>
					</div>
					<div class="mt-4 h-2 overflow-hidden rounded-full bg-surface-container-high">
						<div
							class="h-full rounded-full bg-success"
							style={`width: ${currentChecklistPercent}%`}
						></div>
					</div>

					<div class="mt-5 space-y-2">
						{#each current.checklist as item, index (item)}
							<label
								class="flex cursor-pointer gap-3 rounded-lg border border-outline-variant bg-surface-container-low p-3 text-sm transition-colors hover:border-primary"
							>
								<input
									type="checkbox"
									checked={currentChecklist.includes(index)}
									onchange={() => toggleStep(index)}
									class="mt-1 h-4 w-4 accent-primary"
								/>
								<span
									class={currentChecklist.includes(index)
										? 'text-on-surface-variant line-through'
										: 'text-on-surface'}
								>
									{item}
								</span>
							</label>
						{/each}
					</div>
				</section>
			</div>

			<section
				aria-labelledby="code-title"
				class="rounded-lg border border-outline-variant bg-surface-container-lowest p-5"
			>
				<div class="mb-4 flex flex-wrap items-end justify-between gap-3">
					<div>
						<p class="text-sm font-semibold text-primary">Código guiado</p>
						<h2 id="code-title" class="mt-1 text-xl font-bold text-on-surface">
							{current.codeFocus}
						</h2>
					</div>
					<p class="max-w-md text-sm text-on-surface-variant">{current.productStory}</p>
				</div>
				<CodeBlock code={current.codeSample} language="javascript" />
			</section>
		</section>

		<aside class="space-y-5 lg:sticky lg:top-24">
			<section class="rounded-lg border border-outline-variant bg-surface-container-lowest p-5">
				<div class="flex items-start gap-3">
					<span
						class="material-symbols-outlined mt-0.5 text-primary"
						style="font-variation-settings: 'FILL' 1;"
						aria-hidden="true">psychology</span
					>
					<div>
						<p class="text-sm font-bold text-on-surface">Mentor</p>
						<p class="mt-1 text-sm text-on-surface-variant">
							Primero prueba. Si te atascas, abre una pista más.
						</p>
					</div>
				</div>

				<div class="mt-4 space-y-3">
					{#each visibleHints as hint, index (hint)}
						<div class="rounded-lg border border-outline-variant bg-surface-container-low p-3">
							<p class="text-xs font-bold text-primary">Pista {index + 1}</p>
							<p class="mt-1 text-sm text-on-surface-variant">{hint}</p>
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

			<section class="rounded-lg border border-outline-variant bg-surface-container-lowest p-5">
				<p class="text-sm font-bold text-on-surface">Preguntar al mentor IA</p>
				<p class="mt-1 text-sm text-on-surface-variant">
					Opcional. Si no hay IA configurada, las pistas locales siguen siendo suficientes.
				</p>
				<textarea
					bind:value={mentorQuestion}
					class="mt-4 min-h-24 w-full resize-y rounded-lg border border-outline-variant bg-background p-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
					placeholder="Ejemplo: no entiendo por qué usamos arrays aquí"
				></textarea>
				<div class="mt-3 flex justify-end">
					<Button onclick={askMentor} disabled={mentorLoading || !mentorQuestion.trim()}>
						{mentorLoading ? 'Preguntando...' : 'Preguntar IA'}
					</Button>
				</div>
				{#if mentorAnswer}
					<div class="mt-4 rounded-lg border border-outline-variant bg-surface-container-low p-3">
						<p class="text-sm text-on-surface-variant">{mentorAnswer}</p>
					</div>
				{/if}
				{#if mentorError}
					<div class="mt-4 rounded-lg border border-outline-variant bg-surface-container-low p-3">
						<p class="text-sm text-on-surface-variant">{mentorError}</p>
					</div>
				{/if}
			</section>
		</aside>
	</div>

	<section class="border-t border-outline-variant bg-surface-container-low">
		<div class="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
			<div class="mb-3 flex flex-wrap items-center justify-between gap-3">
				<div>
					<p class="text-sm font-bold text-on-surface">Ruta compacta</p>
					<p class="text-sm text-on-surface-variant">Cambia de misión sin perder el contexto.</p>
				</div>
				<p class="text-sm text-on-surface-variant">{completionPercent}% del curso practicado</p>
			</div>
			<div class="grid grid-cols-3 gap-2 sm:grid-cols-7 lg:grid-cols-[repeat(21,minmax(0,1fr))]">
				{#each data.days as day (day.day)}
					<button
						type="button"
						onclick={() => selectDay(day.day)}
						class={`min-h-12 rounded-lg border px-2 text-sm font-bold transition-colors ${
							day.day === currentDay
								? 'border-primary bg-primary text-primary-foreground'
								: completedDays.has(day.day)
									? 'border-success bg-success/15 text-success'
									: 'border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:border-primary'
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
		class="fixed right-4 bottom-4 z-40 max-w-sm rounded-lg border border-outline-variant bg-inverse-surface px-4 py-3 text-sm text-inverse-on-surface shadow-lg"
		role="status"
	>
		{toastMessage}
	</div>
{/if}
