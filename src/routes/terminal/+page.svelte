<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount, tick } from 'svelte';
	import { setMode } from 'mode-watcher';
	import { terminalModuleLabels } from '$lib/data/terminal-lessons';
	import {
		applyTerminalResult,
		createTerminalSession,
		isLessonComplete,
		runTerminalCommand
	} from '$lib/terminal/simulator';
	import type {
		TerminalEntry,
		TerminalLesson,
		TerminalProgress,
		TerminalSession
	} from '$lib/types/terminal';

	type PageData = {
		lessons: TerminalLesson[];
		progress: Record<string, TerminalProgress>;
		userEmail: string | null;
	};

	type StoredTerminalState = {
		currentLessonId: string;
		sessions: Record<string, TerminalSession>;
		progress: Record<string, TerminalProgress>;
	};

	const { data }: { data: PageData } = $props();
	const storageKey = 'devdays-terminal-course-v1';
	const lessons = $derived(data.lessons);

	let currentLessonId = $state('');
	let sessions = $state<Record<string, TerminalSession>>({});
	let progressByLesson = $state<Record<string, TerminalProgress>>({});
	let hydrated = $state(false);
	let desktopTerminalHost = $state<HTMLDivElement>();
	let mobileTerminalHost = $state<HTMLDivElement>();
	let terminalReady = $state(false);
	let toastMessage = $state('');
	let toastTimer: ReturnType<typeof setTimeout> | null = null;

	let term: import('@xterm/xterm').Terminal | null = null;
	let fitAddon: import('@xterm/addon-fit').FitAddon | null = null;
	let commandBuffer = '';
	let commandHistory: string[] = [];
	let historyIndex = -1;

	const currentLesson = $derived(
		lessons.find((lesson) => lesson.lessonId === currentLessonId) ?? lessons[0]
	);
	const currentSession = $derived(
		sessions[currentLesson.lessonId] ?? createTerminalSession(currentLesson)
	);
	const completedLessons = $derived(
		lessons.filter((lesson) => progressByLesson[lesson.lessonId]?.status === 'resuelto').length
	);
	const completedPercent = $derived(Math.round((completedLessons / lessons.length) * 100));
	const activeExercise = $derived(
		currentLesson.exercises.find(
			(exercise) => !currentSession.completedExerciseIds.includes(exercise.id)
		) ?? currentLesson.exercises[0]
	);

	function initialSessions(): Record<string, TerminalSession> {
		return Object.fromEntries(
			lessons.map((lesson) => {
				const saved = data.progress[lesson.lessonId];
				return [
					lesson.lessonId,
					saved
						? {
								lessonId: saved.lessonId,
								cwd: saved.cwd,
								history: saved.history,
								completedExerciseIds: saved.completedExerciseIds,
								score: saved.score
							}
						: createTerminalSession(lesson)
				];
			})
		);
	}

	onMount(async () => {
		if (!browser || hydrated) return;
		setMode('light');
		currentLessonId = currentLessonId || lessons[0]?.lessonId || '';
		sessions = initialSessions();
		progressByLesson = { ...data.progress };

		const saved = localStorage.getItem(storageKey);
		if (saved) {
			try {
				const parsed = JSON.parse(saved) as Partial<StoredTerminalState>;
				if (typeof parsed.currentLessonId === 'string' && hasLesson(parsed.currentLessonId)) {
					currentLessonId = parsed.currentLessonId;
				}
				if (parsed.sessions && typeof parsed.sessions === 'object') {
					sessions = { ...sessions, ...sanitizeSessions(parsed.sessions) };
				}
				if (parsed.progress && typeof parsed.progress === 'object') {
					progressByLesson = { ...parsed.progress, ...data.progress };
				}
			} catch {
				localStorage.removeItem(storageKey);
			}
		}

		hydrated = true;
		await setupTerminal();
	});

	$effect(() => {
		if (!browser || !hydrated) return;
		const state: StoredTerminalState = {
			currentLessonId,
			sessions,
			progress: progressByLesson
		};
		localStorage.setItem(storageKey, JSON.stringify(state));
	});

	async function setupTerminal() {
		await tick();
		const host =
			[desktopTerminalHost, mobileTerminalHost].find((node) => {
				if (!node) return false;
				const rect = node.getBoundingClientRect();
				return rect.width > 0 && rect.height > 0;
			}) ??
			desktopTerminalHost ??
			mobileTerminalHost;
		if (!host) return;

		const [{ Terminal }, { FitAddon }] = await Promise.all([
			import('@xterm/xterm'),
			import('@xterm/addon-fit')
		]);
		fitAddon = new FitAddon();
		term = new Terminal({
			cursorBlink: true,
			fontFamily: '"Cascadia Code", "Fira Code", Consolas, monospace',
			fontSize: 13,
			lineHeight: 1.35,
			theme: {
				background: '#0d1117',
				foreground: '#dbe7ff',
				cursor: '#2fbcfe',
				selectionBackground: '#264f78',
				black: '#0d1117',
				blue: '#2fbcfe',
				green: '#7ee787',
				red: '#ff7b72',
				yellow: '#d29922'
			}
		});
		term.loadAddon(fitAddon);
		term.open(host);
		fitAddon.fit();
		term.onData(handleTerminalData);
		window.addEventListener('resize', fitTerminal);
		terminalReady = true;
		renderTerminalSession();
	}

	function fitTerminal() {
		fitAddon?.fit();
	}

	function handleTerminalData(data: string) {
		if (!term) return;
		if (data === '\r') {
			submitCommand(commandBuffer);
			return;
		}
		if (data === '\u007F') {
			if (commandBuffer.length > 0) {
				commandBuffer = commandBuffer.slice(0, -1);
				term.write('\b \b');
			}
			return;
		}
		if (data === '\u001b[A') {
			recallHistory(-1);
			return;
		}
		if (data === '\u001b[B') {
			recallHistory(1);
			return;
		}
		if (data >= ' ' && data <= '~') {
			commandBuffer += data;
			term.write(data);
		}
	}

	function recallHistory(direction: -1 | 1) {
		if (!term || commandHistory.length === 0) return;
		if (historyIndex === -1) historyIndex = commandHistory.length;
		historyIndex = Math.max(0, Math.min(commandHistory.length, historyIndex + direction));
		const next = commandHistory[historyIndex] ?? '';
		term.write('\r\x1b[2K');
		writePrompt(false);
		commandBuffer = next;
		term.write(next);
	}

	function submitCommand(command: string) {
		if (!term) return;
		const trimmed = command.trim();
		term.write('\r\n');
		commandBuffer = '';
		historyIndex = -1;
		if (!trimmed) {
			writePrompt();
			return;
		}

		commandHistory = [...commandHistory, trimmed].slice(-30);
		const beforeCompleted = new Set(currentSession.completedExerciseIds);
		const result = runTerminalCommand(currentLesson, currentSession, trimmed);
		const completedNow = result.completedExerciseIds.filter((id) => !beforeCompleted.has(id));
		const successLines = completedNow
			.map((id) => currentLesson.exercises.find((item) => item.id === id))
			.filter((exercise) => exercise !== undefined)
			.map((exercise) => `✓ ${exercise.successMessage}`);
		const resultForStorage = {
			...result,
			output: result.output.includes('__CLEAR__')
				? result.output
				: [...result.output, ...successLines]
		};
		const nextSession = applyTerminalResult(currentSession, trimmed, resultForStorage);

		sessions = { ...sessions, [currentLesson.lessonId]: nextSession };
		saveProgress(nextSession);
		setTimeout(renderTerminalSession, 0);
	}

	function colorLine(line: string, ok: boolean): string {
		if (line.startsWith('✓')) return `\x1b[32m${line}\x1b[0m`;
		if (line.startsWith('VITE')) return `\x1b[36m${line}\x1b[0m`;
		if (!ok) return `\x1b[33m${line}\x1b[0m`;
		return line;
	}

	function renderTerminalSession() {
		if (!term) return;
		term.reset();
		term.write('\x1b[H\x1b[2J\x1b[3J');
		term.writeln('\x1b[36mService Desk Studio Terminal\x1b[0m');
		term.writeln('Laboratorio seguro: los comandos son simulados, no tocan tu equipo real.');
		term.writeln('');
		for (const entry of currentSession.history.slice(-12)) {
			term.writeln(`${promptText()}${entry.command}`);
			for (const line of entry.output) term.writeln(colorLine(line, entry.ok));
		}
		writePrompt();
	}

	function writePrompt(newLine = true) {
		if (!term) return;
		if (newLine) term.write('\r\n');
		term.write(`\x1b[32m${promptText()}\x1b[0m`);
	}

	function promptText(): string {
		return `usuario@Ubuntu-Dev:${displayCwd(currentSession.cwd)}$ `;
	}

	function displayCwd(cwd: string): string {
		return cwd.replace(/^\/home\/[^/]+/, '~');
	}

	function selectLesson(lessonId: string) {
		if (!hasLesson(lessonId)) return;
		currentLessonId = lessonId;
		commandBuffer = '';
		historyIndex = -1;
		setTimeout(renderTerminalSession, 0);
	}

	function resetLesson() {
		const session = createTerminalSession(currentLesson);
		sessions = { ...sessions, [currentLesson.lessonId]: session };
		progressByLesson = {
			...progressByLesson,
			[currentLesson.lessonId]: {
				...session,
				status: 'sin_empezar',
				updatedAt: new Date().toISOString()
			}
		};
		showToast('Lección reiniciada.');
		setTimeout(renderTerminalSession, 0);
	}

	async function saveProgress(session: TerminalSession) {
		const progress: TerminalProgress = {
			...session,
			status: isLessonComplete(currentLesson, session) ? 'resuelto' : 'en_progreso',
			updatedAt: new Date().toISOString()
		};
		progressByLesson = { ...progressByLesson, [session.lessonId]: progress };

		if (!data.userEmail) return;
		try {
			const response = await fetch('/api/progreso/terminal', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(progress)
			});
			if (!response.ok) throw new Error('terminal-progress-failed');
		} catch {
			showToast('Progreso guardado localmente. Supabase no respondió.');
		}
	}

	function sanitizeSessions(
		value: Record<string, TerminalSession>
	): Record<string, TerminalSession> {
		const next: Record<string, TerminalSession> = {};
		for (const lesson of lessons) {
			const saved = value[lesson.lessonId];
			if (!saved || typeof saved !== 'object') continue;
			next[lesson.lessonId] = {
				lessonId: lesson.lessonId,
				cwd: typeof saved.cwd === 'string' ? saved.cwd : '/home/usuario',
				history: Array.isArray(saved.history) ? saved.history.filter(isTerminalEntry) : [],
				completedExerciseIds: Array.isArray(saved.completedExerciseIds)
					? saved.completedExerciseIds.filter((id) =>
							lesson.exercises.some((exercise) => exercise.id === id)
						)
					: [],
				score: typeof saved.score === 'number' ? saved.score : 0
			};
		}
		return next;
	}

	function isTerminalEntry(value: unknown): value is TerminalEntry {
		if (!value || typeof value !== 'object') return false;
		const entry = value as TerminalEntry;
		return typeof entry.command === 'string' && Array.isArray(entry.output);
	}

	function hasLesson(lessonId: string): boolean {
		return lessons.some((lesson) => lesson.lessonId === lessonId);
	}

	function showToast(message: string) {
		toastMessage = message;
		if (toastTimer) clearTimeout(toastTimer);
		toastTimer = setTimeout(() => {
			toastMessage = '';
		}, 2600);
	}

	function lessonStatus(lesson: TerminalLesson): string {
		const progress = progressByLesson[lesson.lessonId];
		if (progress?.status === 'resuelto') return 'resuelto';
		if (progress?.status === 'en_progreso') return 'en progreso';
		return 'sin empezar';
	}
</script>

<svelte:head>
	<title>Terminal Studio - WSL, Git y pnpm</title>
	<meta
		name="description"
		content="Curso práctico de terminal con Xterm.js para aprender WSL, Git y pnpm en el día a día."
	/>
</svelte:head>

<main class="min-h-dvh bg-[#f8f9ff] text-[#111827] lg:h-dvh lg:overflow-hidden">
	<div class="hidden h-full lg:flex">
		<aside
			class="z-40 flex w-16 shrink-0 flex-col items-center gap-6 border-r border-[#e5e7eb] bg-white py-5"
		>
			<a
				class="flex h-10 w-10 items-center justify-center rounded-md bg-[#0078d4] text-white shadow-sm"
				href="/terminal"
				aria-label="Terminal Studio"
			>
				<span class="material-symbols-outlined text-[22px]" aria-hidden="true">terminal</span>
			</a>
			<nav class="flex flex-1 flex-col items-center gap-2 text-[10px] font-bold text-slate-700">
				<a
					class="flex w-14 flex-col items-center gap-2 rounded-lg px-2 py-3 hover:bg-blue-50"
					href="/estudio"
				>
					<span class="material-symbols-outlined text-[26px]">confirmation_number</span>
					<span>TICKETS</span>
				</a>
				<a
					class="flex w-14 flex-col items-center gap-2 rounded-lg bg-[#0078d4]/10 px-2 py-3 text-[#0078d4]"
					href="/terminal"
				>
					<span class="material-symbols-outlined text-[26px]">terminal</span>
					<span>TERM</span>
				</a>
			</nav>
		</aside>

		<div class="flex min-w-0 flex-1 flex-col">
			<header
				class="flex h-14 shrink-0 items-center justify-between border-b border-[#e5e7eb] bg-white px-4 2xl:px-5"
			>
				<div class="flex items-center gap-4">
					<h1 class="text-base font-bold text-black">Terminal Studio</h1>
					<span class="text-lg text-slate-300">/</span>
					<p class="text-sm font-medium text-slate-700">WSL, Git y pnpm</p>
				</div>
				<div class="flex items-center gap-4">
					<div class="w-44">
						<div class="h-1.5 rounded-full bg-slate-100">
							<div
								class="h-1.5 rounded-full bg-[#0078d4]"
								style={`width: ${completedPercent}%`}
							></div>
						</div>
						<p class="mt-1 text-right text-xs font-bold text-slate-500">
							{completedLessons}/{lessons.length} lecciones
						</p>
					</div>
					<a
						class="rounded-md border border-[#d1d5db] bg-white px-3 py-1.5 text-xs font-bold text-slate-900 hover:bg-slate-50"
						href="/estudio"
					>
						Volver a tickets
					</a>
				</div>
			</header>

			<div class="flex min-h-0 flex-1">
				<section
					class="flex w-[clamp(14.5rem,20vw,18rem)] shrink-0 flex-col border-r border-[#e5e7eb] bg-white"
				>
					<header class="border-b border-[#e5e7eb] px-4 py-4">
						<p class="text-[11px] font-bold uppercase tracking-widest text-slate-500">
							Ruta práctica
						</p>
						<h2 class="mt-1.5 text-base font-bold">Comandos diarios</h2>
					</header>
					<div class="min-h-0 flex-1 overflow-y-auto">
						{#each lessons as lesson, index (lesson.lessonId)}
							<button
								type="button"
								onclick={() => selectLesson(lesson.lessonId)}
								class={`w-full border-b border-[#e5e7eb] px-4 py-3 text-left transition-colors ${
									lesson.lessonId === currentLesson.lessonId
										? 'border-l-2 border-l-[#0078d4] bg-[#eef6ff]'
										: 'border-l-2 border-l-transparent bg-white hover:bg-[#f8f9ff]'
								}`}
							>
								<div class="flex items-start justify-between gap-3">
									<div class="min-w-0">
										<p class="text-xs font-bold text-[#0078d4]">
											#{String(index + 1).padStart(2, '0')}
										</p>
										<p class="mt-1 text-sm leading-5 font-semibold text-[#111827]">
											{lesson.title}
										</p>
										<p class="mt-0.5 text-xs text-slate-600">
											{terminalModuleLabels[lesson.module]} • {lesson.estimatedMinutes} min
										</p>
									</div>
									<span
										class="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600"
									>
										{lesson.difficulty.toUpperCase()}
									</span>
								</div>
								<p class="mt-2 text-[11px] font-bold uppercase text-slate-500">
									{lessonStatus(lesson)}
								</p>
							</button>
						{/each}
					</div>
				</section>

				<section class="flex min-w-0 flex-1 flex-col bg-white">
					<div class="min-h-0 flex-1 overflow-y-auto px-6 py-5 2xl:px-8">
						<div class="mx-auto max-w-4xl">
							<div class="flex items-start justify-between gap-4">
								<div>
									<p class="text-xs font-bold uppercase tracking-widest text-[#0078d4]">
										{terminalModuleLabels[currentLesson.module]}
									</p>
									<h2 class="mt-1.5 text-2xl font-bold tracking-tight text-black">
										{currentLesson.title}
									</h2>
									<p class="mt-2 max-w-3xl text-sm leading-6 text-slate-700">
										{currentLesson.objective}
									</p>
								</div>
								<button
									type="button"
									onclick={resetLesson}
									class="rounded-md border border-[#d1d5db] bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 hover:bg-slate-50"
								>
									Reiniciar
								</button>
							</div>

							<div class="mt-5 grid gap-3 lg:grid-cols-[1.12fr_0.88fr]">
								<article class="rounded-lg border border-[#e5e7eb] bg-[#f8f9ff] p-4">
									<p class="text-xs font-bold uppercase tracking-widest text-slate-600">
										Explicación
									</p>
									<p class="mt-2 text-sm leading-6 text-slate-700">{currentLesson.explanation}</p>
								</article>
								<article class="rounded-lg border border-blue-200 bg-blue-50 p-4">
									<p class="text-xs font-bold uppercase tracking-widest text-[#005faa]">
										Para tu día a día
									</p>
									<p class="mt-2 text-sm leading-6 text-[#004c6b]">{currentLesson.dailyUse}</p>
								</article>
							</div>

							<section class="mt-5">
								<div class="mb-3 flex items-center justify-between">
									<div>
										<p class="text-xs font-bold uppercase tracking-widest text-slate-700">
											Terminal Ubuntu-Dev
										</p>
										<p class="mt-0.5 text-xs text-slate-500">
											Escribe comandos. La salida es simulada y segura.
										</p>
									</div>
									<span class="rounded-md bg-[#111827] px-3 py-1 font-mono text-xs text-[#2fbcfe]">
										xterm.js
									</span>
								</div>
								<div
									class="overflow-hidden rounded-lg border border-[#1f2937] bg-[#0d1117] shadow-[0_10px_24px_rgba(15,23,42,0.22)]"
								>
									<div
										class="flex h-10 items-center gap-2 border-b border-white/10 bg-[#111827] px-4"
									>
										<span class="h-3 w-3 rounded-full bg-[#ff5f56]"></span>
										<span class="h-3 w-3 rounded-full bg-[#ffbd2e]"></span>
										<span class="h-3 w-3 rounded-full bg-[#27c93f]"></span>
										<p class="ml-3 font-mono text-xs text-slate-400">Ubuntu-Dev · ~/webs</p>
									</div>
									<div bind:this={desktopTerminalHost} class="h-[360px] p-2.5"></div>
								</div>
							</section>
						</div>
					</div>
				</section>

				<aside
					class="w-[300px] shrink-0 overflow-y-auto border-l border-[#e5e7eb] bg-[#f3f4f6] p-4"
				>
					<section class="rounded-lg border border-[#e5e7eb] bg-white p-4">
						<p class="text-xs font-bold uppercase tracking-widest text-slate-700">
							Práctica activa
						</p>
						<h3 class="mt-2 text-base font-bold">{activeExercise.title}</h3>
						<p class="mt-2 text-xs leading-5 text-slate-700">{activeExercise.prompt}</p>
						<div class="mt-3 space-y-1.5">
							{#each activeExercise.expectedCommands as command (command)}
								<div class="rounded bg-[#111827] px-2.5 py-1.5 font-mono text-xs text-[#dbe7ff]">
									{command}
								</div>
							{/each}
						</div>
					</section>

					<section class="mt-4 rounded-lg border border-[#e5e7eb] bg-white p-4">
						<div class="flex items-center justify-between">
							<p class="text-xs font-bold uppercase tracking-widest text-slate-700">Progreso</p>
							<p class="text-lg font-bold text-[#0078d4]">{currentSession.score}%</p>
						</div>
						<div class="mt-3 h-1.5 rounded-full bg-slate-100">
							<div
								class="h-1.5 rounded-full bg-[#0078d4]"
								style={`width: ${currentSession.score}%`}
							></div>
						</div>
						<p class="mt-2 text-xs text-slate-600">
							{currentSession.completedExerciseIds.length}/{currentLesson.exercises.length}
							prácticas completadas
						</p>
					</section>

					<section class="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
						<p class="text-sm font-bold text-[#0078d4]">
							<span class="material-symbols-outlined mr-1 align-[-4px] text-[18px]"
								>tips_and_updates</span
							>
							Pistas rápidas
						</p>
						<ul class="mt-3 space-y-2 text-xs leading-5 text-[#004c6b]">
							{#each currentLesson.hints as hint (hint)}
								<li>• {hint}</li>
							{/each}
						</ul>
					</section>

					<section class="mt-4 rounded-lg border border-[#e5e7eb] bg-white p-4">
						<p class="text-xs font-bold uppercase tracking-widest text-slate-700">Chuleta</p>
						<div class="mt-3 flex flex-wrap gap-1.5">
							{#each currentLesson.keyCommands as command (command)}
								<code class="rounded bg-slate-100 px-1.5 py-1 text-[11px] font-bold text-slate-700">
									{command}
								</code>
							{/each}
						</div>
					</section>

					<section class="mt-4 rounded-lg border border-[#e5e7eb] bg-white p-4">
						<p class="text-xs font-bold uppercase tracking-widest text-slate-700">Qué significa</p>
						<div class="mt-3 space-y-2">
							{#each currentLesson.commandNotes as note (note.command)}
								<div class="rounded border border-slate-200 bg-slate-50 p-2.5">
									<code class="text-[11px] font-bold text-[#005faa]">{note.command}</code>
									<p class="mt-1.5 text-xs leading-5 text-slate-600">{note.description}</p>
								</div>
							{/each}
						</div>
					</section>
				</aside>
			</div>
		</div>
	</div>

	<div class="min-h-dvh lg:hidden">
		<header
			class="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[#c0c7d4] bg-white px-4"
		>
			<div class="flex items-center gap-2">
				<div class="flex h-8 w-8 items-center justify-center rounded bg-[#0078d4] text-white">
					<span class="material-symbols-outlined text-lg">terminal</span>
				</div>
				<p class="text-base font-bold text-[#005faa]">Terminal Studio</p>
			</div>
			<a class="text-sm font-bold text-[#005faa]" href="/estudio">Tickets</a>
		</header>

		<section class="px-4 py-3">
			<div class="flex gap-2 overflow-x-auto pb-1">
				{#each lessons as lesson, index (lesson.lessonId)}
					<button
						type="button"
						onclick={() => selectLesson(lesson.lessonId)}
						class={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold ${
							lesson.lessonId === currentLesson.lessonId
								? 'border-[#005faa] bg-[#005faa] text-white'
								: 'border-[#c0c7d4] bg-[#ebeef6] text-slate-600'
						}`}
					>
						#{String(index + 1).padStart(2, '0')}
					</button>
				{/each}
			</div>
			<p class="mt-5 text-sm font-bold uppercase tracking-widest text-[#005faa]">
				{terminalModuleLabels[currentLesson.module]}
			</p>
			<h1 class="mt-2 text-2xl font-extrabold leading-tight text-[#181c22]">
				{currentLesson.title}
			</h1>
			<p class="mt-2 text-sm leading-6 text-slate-700">{currentLesson.objective}</p>
		</section>

		<section class="border-y border-[#c0c7d4] bg-[#f1f3fc] px-4 py-5">
			<article class="rounded-lg border border-[#c0c7d4] bg-[#f8f9ff] p-4">
				<p class="text-xs font-bold uppercase tracking-widest text-slate-700">Explicación</p>
				<p class="mt-2 text-sm leading-6 text-slate-700">{currentLesson.explanation}</p>
			</article>

			<div class="mt-4 overflow-hidden rounded-lg border border-[#111827] bg-[#0d1117]">
				<div class="flex h-9 items-center gap-2 border-b border-white/10 bg-[#111827] px-4">
					<span class="h-3 w-3 rounded-full bg-[#ff5f56]"></span>
					<span class="h-3 w-3 rounded-full bg-[#ffbd2e]"></span>
					<span class="h-3 w-3 rounded-full bg-[#27c93f]"></span>
				</div>
				<div bind:this={mobileTerminalHost} class="h-[320px] p-2.5"></div>
			</div>

			<article class="mt-4 rounded-lg border border-blue-200 bg-blue-100 p-4 text-[#005faa]">
				<p class="text-sm font-bold">Práctica: {activeExercise.title}</p>
				<p class="mt-2 text-xs leading-5 text-[#004c6b]">{activeExercise.prompt}</p>
			</article>

			<article class="mt-4 rounded-lg border border-[#c0c7d4] bg-white p-4">
				<p class="text-xs font-bold uppercase tracking-widest text-slate-700">Qué significa</p>
				<div class="mt-3 space-y-2">
					{#each currentLesson.commandNotes as note (note.command)}
						<div>
							<code class="rounded bg-slate-100 px-2 py-1 text-xs font-bold text-[#005faa]">
								{note.command}
							</code>
							<p class="mt-1.5 text-xs leading-5 text-slate-600">{note.description}</p>
						</div>
					{/each}
				</div>
			</article>
		</section>
	</div>
</main>

{#if toastMessage}
	<div
		class="fixed bottom-4 left-1/2 z-50 w-[min(92vw,460px)] -translate-x-1/2 rounded-lg border border-blue-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-900 shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
	>
		{toastMessage}
	</div>
{/if}
