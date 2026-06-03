<script lang="ts">
	import { browser } from '$app/environment';
	import { mode, toggleMode } from 'mode-watcher';
	import { SvelteSet } from 'svelte/reactivity';
	import { Button } from '$lib/components/ui/button';
	import CodeBlock from '$lib/components/study/CodeBlock.svelte';
	import { blockLabels, starterTasks } from '$lib/data/task-course';
	import type { CourseBlock, TaskCourseDay, TaskItem } from '$lib/types/task-course';

	type StudyState = {
		currentDay: number;
		completedDays: number[];
		tasks: TaskItem[];
	};

	let { data }: { data: { days: TaskCourseDay[] } } = $props();

	const storageKey = 'devdays-task-course-state';
	const blocks: CourseBlock[] = ['javascript', 'svelte', 'sveltekit'];

	let currentDay = $state(1);
	const completedDays = new SvelteSet<number>();
	let tasks = $state<TaskItem[]>(starterTasks.map((task) => ({ ...task })));
	let draftTitle = $state('');
	let mentorStep = $state(0);
	let hydrated = $state(false);

	const current = $derived(data.days.find((day) => day.day === currentDay) ?? data.days[0]);
	const completedCount = $derived(completedDays.size);
	const completionPercent = $derived(Math.round((completedCount / data.days.length) * 100));
	const pendingTasks = $derived(tasks.filter((task) => !task.done));
	const doneTasks = $derived(tasks.filter((task) => task.done));
	const mentorText = $derived(current.mentorPrompts[mentorStep % current.mentorPrompts.length]);
	const isCurrentComplete = $derived(completedDays.has(currentDay));
	const isDark = $derived(browser && mode.current === 'dark');

	$effect(() => {
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
			tasks
		};

		localStorage.setItem(storageKey, JSON.stringify(state));
	});

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

	function selectDay(day: number) {
		currentDay = day;
		mentorStep = 0;
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
				tag: current.block === 'javascript' ? 'lógica' : current.block
			}
		];
		draftTitle = '';
	}

	function toggleTask(id: number) {
		tasks = tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task));
	}

	function resetTasks() {
		tasks = starterTasks.map((task) => ({ ...task }));
	}

	function toggleCurrentDay() {
		if (completedDays.has(currentDay)) {
			completedDays.delete(currentDay);
		} else {
			completedDays.add(currentDay);
		}
	}

	function nextMentorHint() {
		mentorStep += 1;
	}
</script>

<header
	class="flex min-h-16 flex-wrap items-center justify-between gap-4 border-b border-outline-variant bg-surface-container px-4 py-3 sm:px-6"
>
	<div class="flex min-w-0 items-center gap-3">
		<span
			class="material-symbols-outlined text-primary"
			style="font-variation-settings: 'FILL' 1;"
			aria-hidden="true">task_alt</span
		>
		<div class="min-w-0">
			<p class="text-lg font-bold leading-tight text-primary">DevDays</p>
			<p class="text-xs text-on-surface-variant">21 días construyendo un gestor de tareas</p>
		</div>
	</div>

	<div class="flex items-center gap-3">
		<div class="hidden min-w-32 sm:block">
			<div class="h-2 overflow-hidden rounded-full bg-surface-container-high">
				<div class="h-full bg-primary" style={`width: ${completionPercent}%`}></div>
			</div>
			<p class="mt-1 text-right text-xs text-on-surface-variant">
				{completedCount}/{data.days.length} días practicados
			</p>
		</div>
		<button
			type="button"
			onclick={toggleMode}
			aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
			class="flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
		>
			<span class="material-symbols-outlined text-xl" aria-hidden="true">
				{isDark ? 'light_mode' : 'dark_mode'}
			</span>
		</button>
	</div>
</header>

<main class="min-h-[calc(100vh-4rem)] bg-background text-on-surface">
	<div class="grid min-h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)_340px]">
		<aside
			class="border-b border-outline-variant bg-surface-container-low lg:border-r lg:border-b-0"
		>
			<div class="sticky top-0 max-h-[calc(100vh-4rem)] overflow-y-auto p-4">
				<p class="mb-3 text-xs font-semibold tracking-wide text-on-surface-variant uppercase">
					Ruta del curso
				</p>
				<div class="space-y-5">
					{#each blocks as block (block)}
						<section aria-labelledby={`block-${block}`}>
							<h2 id={`block-${block}`} class="mb-2 text-sm font-semibold text-on-surface">
								{blockLabels[block]}
							</h2>
							<div class="grid grid-cols-1 gap-2">
								{#each data.days.filter((day) => day.block === block) as day (day.day)}
									<button
										type="button"
										onclick={() => selectDay(day.day)}
										class={`flex min-h-12 items-center gap-3 rounded-lg border px-3 text-left text-sm transition-colors ${
											day.day === currentDay
												? 'border-primary bg-primary text-primary-foreground'
												: 'border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-container-high'
										}`}
										aria-current={day.day === currentDay ? 'step' : undefined}
									>
										<span
											class={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
												completedDays.has(day.day)
													? 'bg-success text-white'
													: day.day === currentDay
														? 'bg-primary-foreground text-primary'
														: 'bg-surface-container-high text-on-surface-variant'
											}`}
										>
											{day.day}
										</span>
										<span class="min-w-0">
											<span class="block truncate font-medium">{day.title}</span>
											<span class="block truncate text-xs opacity-80">{day.concept}</span>
										</span>
									</button>
								{/each}
							</div>
						</section>
					{/each}
				</div>
			</div>
		</aside>

		<section class="overflow-y-auto">
			<div class="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
				<div
					class="rounded-lg border border-outline-variant bg-surface-container-lowest p-5 shadow-sm"
				>
					<div class="mb-4 flex flex-wrap items-start justify-between gap-4">
						<div class="max-w-3xl">
							<p class="text-sm font-semibold text-primary">Día {current.day}</p>
							<h1 class="mt-1 text-2xl font-bold leading-tight text-on-surface sm:text-3xl">
								{current.title}
							</h1>
							<p class="mt-3 text-base text-on-surface-variant">{current.objective}</p>
						</div>
						<Button
							variant={isCurrentComplete ? 'secondary' : 'default'}
							onclick={toggleCurrentDay}
						>
							{isCurrentComplete ? 'Practicado' : 'Marcar día'}
						</Button>
					</div>
					<div class="grid gap-4 md:grid-cols-2">
						<div class="rounded-lg border border-outline-variant bg-surface-container-low p-4">
							<p class="text-xs font-semibold tracking-wide text-on-surface-variant uppercase">
								Historia de producto
							</p>
							<p class="mt-2 text-sm text-on-surface">{current.productStory}</p>
						</div>
						<div class="rounded-lg border border-outline-variant bg-surface-container-low p-4">
							<p class="text-xs font-semibold tracking-wide text-on-surface-variant uppercase">
								Estado esperado
							</p>
							<p class="mt-2 text-sm text-on-surface">{current.expectedState}</p>
						</div>
					</div>
				</div>

				<div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
					<section
						aria-labelledby="task-preview-title"
						class="rounded-lg border border-outline-variant bg-surface-container-lowest p-5 shadow-sm"
					>
						<div class="mb-4 flex flex-wrap items-center justify-between gap-3">
							<div>
								<h2 id="task-preview-title" class="text-lg font-bold text-on-surface">
									Gestor de tareas
								</h2>
								<p class="text-sm text-on-surface-variant">
									{pendingTasks.length} pendientes · {doneTasks.length} completadas
								</p>
							</div>
							<Button variant="outline" onclick={resetTasks}>Reiniciar tareas</Button>
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
								class="min-h-10 flex-1 rounded-lg border border-outline-variant bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
								placeholder="Escribe una tarea pequeña"
								autocomplete="off"
							/>
							<Button type="submit">Añadir</Button>
						</form>

						<div class="mt-5 space-y-2">
							{#each tasks as task (task.id)}
								<div
									class="flex min-h-14 items-center gap-3 rounded-lg border border-outline-variant bg-surface-container-low px-3"
								>
									<button
										type="button"
										onclick={() => toggleTask(task.id)}
										class={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
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
											class={`truncate text-sm font-medium ${task.done ? 'text-on-surface-variant line-through' : 'text-on-surface'}`}
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
						aria-labelledby="learning-title"
						class="rounded-lg border border-outline-variant bg-surface-container-lowest p-5 shadow-sm"
					>
						<p class="text-xs font-semibold tracking-wide text-on-surface-variant uppercase">
							Qué estamos aprendiendo
						</p>
						<h2 id="learning-title" class="mt-1 text-lg font-bold text-on-surface">
							{current.concept}
						</h2>
						<ol class="mt-4 space-y-3">
							{#each current.guidedSteps as step, index (step)}
								<li class="flex gap-3 text-sm text-on-surface">
									<span
										class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
									>
										{index + 1}
									</span>
									<span>{step}</span>
								</li>
							{/each}
						</ol>
						<div class="mt-5 rounded-lg border border-outline-variant bg-surface-container-low p-4">
							<p class="text-sm font-semibold text-on-surface">Mini reto</p>
							<p class="mt-1 text-sm text-on-surface-variant">{current.miniChallenge}</p>
						</div>
					</section>
				</div>

				<section
					aria-labelledby="code-title"
					class="rounded-lg border border-outline-variant bg-surface-container-lowest p-5 shadow-sm"
				>
					<div class="mb-4">
						<p class="text-xs font-semibold tracking-wide text-on-surface-variant uppercase">
							Código guiado
						</p>
						<h2 id="code-title" class="mt-1 text-lg font-bold text-on-surface">
							{current.codeFocus}
						</h2>
					</div>
					<CodeBlock code={current.codeSample} language="javascript" />
				</section>
			</div>
		</section>

		<aside
			class="border-t border-outline-variant bg-surface-container p-4 lg:border-t-0 lg:border-l"
		>
			<div class="sticky top-4 space-y-4">
				<section class="rounded-lg border border-outline-variant bg-surface-container-lowest p-5">
					<div class="flex items-start gap-3">
						<span
							class="material-symbols-outlined mt-0.5 text-primary"
							style="font-variation-settings: 'FILL' 1;"
							aria-hidden="true">psychology</span
						>
						<div>
							<p class="text-sm font-bold text-on-surface">Mentor IA</p>
							<p class="mt-1 text-sm text-on-surface-variant">{mentorText}</p>
						</div>
					</div>
					<div class="mt-4 flex flex-wrap gap-2">
						<Button variant="outline" onclick={nextMentorHint}>Dame otra pista</Button>
						<Button variant="ghost" onclick={toggleCurrentDay}>
							{isCurrentComplete ? 'Quitar marca' : 'Lo he practicado'}
						</Button>
					</div>
				</section>

				<section class="rounded-lg border border-outline-variant bg-surface-container-lowest p-5">
					<p class="text-sm font-bold text-on-surface">Progreso local</p>
					<p class="mt-1 text-sm text-on-surface-variant">
						Se guarda en este navegador, sin cuenta y sin bloquear el inicio del curso.
					</p>
					<div class="mt-4 h-2 overflow-hidden rounded-full bg-surface-container-high">
						<div class="h-full bg-success" style={`width: ${completionPercent}%`}></div>
					</div>
					<p class="mt-2 text-xs text-on-surface-variant">
						{completionPercent}% del recorrido practicado
					</p>
				</section>
			</div>
		</aside>
	</div>
</main>
