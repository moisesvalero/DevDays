<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { mode, setMode, toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import { helpdeskTickets, moduleLabels } from '$lib/data/helpdesk-tickets';
	import { createEmptySubmission } from '$lib/helpdesk/scoring';
	import type {
		EvaluationCheck,
		HelpdeskTicket,
		TicketDecision,
		TicketEvaluation,
		TicketProgress,
		TicketSubmission
	} from '$lib/types/helpdesk';

	type PageData = {
		tickets: HelpdeskTicket[];
		progress: Record<string, TicketProgress>;
		userEmail: string | null;
	};

	type ApiEvaluation = TicketEvaluation & {
		aiFeedback: string;
		aiHints: string[];
		provider: 'openai' | 'gemini' | 'none';
	};

	type ChatMsg = { role: 'user' | 'model'; text: string };

	type StoredState = {
		currentTicketId: string;
		submissions: Record<string, TicketSubmission>;
		progress: Record<string, TicketProgress>;
		evaluations: Record<string, ApiEvaluation>;
	};

	const { data }: { data: PageData } = $props();

	const tickets = initialTickets();
	const storageKey = 'devdays-helpdesk-simulator-v1';

	let currentTicketId = $state(tickets[0]?.ticketId ?? '');
	let hydrated = $state(false);
	let submissions = $state<Record<string, TicketSubmission>>(initialSubmissions());
	let progressByTicket = $state<Record<string, TicketProgress>>(initialProgress());
	let evaluations = $state<Record<string, ApiEvaluation>>({});
	let toastMessage = $state('');
	let correcting = $state(false);
	let saving = $state(false);
	let mentorQuestion = $state('');
	let mentorAnswer = $state('');
	let mentorError = $state('');
	let mentorLoading = $state(false);
	let toastTimer: ReturnType<typeof setTimeout> | null = null;

	const current = $derived(
		tickets.find((ticket) => ticket.ticketId === currentTicketId) ?? tickets[0]
	);
	const currentSubmission = $derived(
		submissions[current.ticketId] ?? createEmptySubmission(current.ticketId)
	);
	const currentProgress = $derived(progressByTicket[current.ticketId]);
	const currentEvaluation = $derived(evaluations[current.ticketId]);
	const selectedActions = $derived(
		current.actions.filter((action) => currentSubmission.selectedActionIds.includes(action.id))
	);
	const completedCount = $derived(
		Object.values(progressByTicket).filter((progress) => progress.status === 'resuelto').length
	);
	const inProgressCount = $derived(
		Object.values(progressByTicket).filter((progress) => progress.status === 'en_progreso').length
	);
	const completionPercent = $derived(Math.round((completedCount / tickets.length) * 100));
	const isDark = $derived(browser && mode.current === 'dark');

	function initialTickets(): HelpdeskTicket[] {
		return data.tickets.length > 0 ? data.tickets : helpdeskTickets;
	}

	function initialSubmissions(): Record<string, TicketSubmission> {
		return buildInitialSubmissions(tickets, data.progress);
	}

	function initialProgress(): Record<string, TicketProgress> {
		return { ...data.progress };
	}

	onMount(() => {
		if (!browser || hydrated) return;

		if (!localStorage.getItem('mode-watcher-mode')) {
			setMode('dark');
		}

		const saved = localStorage.getItem(storageKey);
		if (saved) {
			try {
				const parsed = JSON.parse(saved) as Partial<StoredState>;
				if (typeof parsed.currentTicketId === 'string' && hasTicket(parsed.currentTicketId)) {
					currentTicketId = parsed.currentTicketId;
				}
				if (parsed.submissions && typeof parsed.submissions === 'object') {
					submissions = {
						...buildInitialSubmissions(tickets, data.progress),
						...sanitizeSubmissions(parsed.submissions)
					};
				}
				if (parsed.progress && typeof parsed.progress === 'object') {
					progressByTicket = { ...parsed.progress, ...data.progress };
				}
				if (parsed.evaluations && typeof parsed.evaluations === 'object') {
					evaluations = parsed.evaluations as Record<string, ApiEvaluation>;
				}
			} catch {
				localStorage.removeItem(storageKey);
			}
		}

		hydrated = true;
	});

	$effect(() => {
		if (!browser || !hydrated) return;

		const state: StoredState = {
			currentTicketId,
			submissions,
			progress: progressByTicket,
			evaluations
		};
		localStorage.setItem(storageKey, JSON.stringify(state));
	});

	function buildInitialSubmissions(
		allTickets: HelpdeskTicket[],
		progress: Record<string, TicketProgress>
	): Record<string, TicketSubmission> {
		return Object.fromEntries(
			allTickets.map((ticket) => {
				const saved = progress[ticket.ticketId];
				return [
					ticket.ticketId,
					saved
						? {
								ticketId: saved.ticketId,
								selectedActionIds: saved.selectedActionIds,
								notes: saved.notes,
								diagnosis: saved.diagnosis,
								solution: saved.solution,
								userReply: saved.userReply,
								decision: saved.decision
							}
						: createEmptySubmission(ticket.ticketId)
				];
			})
		);
	}

	function sanitizeSubmissions(
		value: Record<string, TicketSubmission>
	): Record<string, TicketSubmission> {
		const next: Record<string, TicketSubmission> = {};
		for (const ticket of tickets) {
			const saved = value[ticket.ticketId];
			if (!saved || typeof saved !== 'object') continue;
			next[ticket.ticketId] = {
				ticketId: ticket.ticketId,
				selectedActionIds: Array.isArray(saved.selectedActionIds)
					? saved.selectedActionIds.filter((id) =>
							ticket.actions.some((action) => action.id === id)
						)
					: [],
				notes: typeof saved.notes === 'string' ? saved.notes : '',
				diagnosis: typeof saved.diagnosis === 'string' ? saved.diagnosis : '',
				solution: typeof saved.solution === 'string' ? saved.solution : '',
				userReply: typeof saved.userReply === 'string' ? saved.userReply : '',
				decision: saved.decision === 'escalar' ? 'escalar' : 'cerrar'
			};
		}
		return next;
	}

	function hasTicket(ticketId: string): boolean {
		return tickets.some((ticket) => ticket.ticketId === ticketId);
	}

	function selectTicket(ticketId: string) {
		currentTicketId = ticketId;
		mentorAnswer = '';
		mentorError = '';
		mentorQuestion = '';
	}

	function updateSubmission(patch: Partial<TicketSubmission>) {
		submissions = {
			...submissions,
			[current.ticketId]: {
				...currentSubmission,
				...patch,
				ticketId: current.ticketId
			}
		};
		markInProgress();
	}

	function markInProgress() {
		if (progressByTicket[current.ticketId]?.status === 'resuelto') return;
		progressByTicket = {
			...progressByTicket,
			[current.ticketId]: {
				...currentSubmission,
				status: 'en_progreso',
				score: progressByTicket[current.ticketId]?.score ?? 0,
				feedback: progressByTicket[current.ticketId]?.feedback ?? '',
				updatedAt: new Date().toISOString()
			}
		};
	}

	function toggleAction(actionId: string) {
		const selected = currentSubmission.selectedActionIds.includes(actionId)
			? currentSubmission.selectedActionIds.filter((id) => id !== actionId)
			: [...currentSubmission.selectedActionIds, actionId];
		updateSubmission({ selectedActionIds: selected });
	}

	function updateDecision(decision: TicketDecision) {
		updateSubmission({ decision });
	}

	function showToast(message: string) {
		toastMessage = message;
		if (toastTimer) clearTimeout(toastTimer);
		toastTimer = setTimeout(() => {
			toastMessage = '';
		}, 3200);
	}

	function ticketStatus(ticket: HelpdeskTicket): 'resuelto' | 'en progreso' | 'sin empezar' {
		const progress = progressByTicket[ticket.ticketId];
		if (progress?.status === 'resuelto') return 'resuelto';
		if (progress?.status === 'en_progreso') return 'en progreso';
		const submission = submissions[ticket.ticketId];
		if (submission?.selectedActionIds.length || submission?.notes) return 'en progreso';
		return 'sin empezar';
	}

	function statusClass(ticket: HelpdeskTicket): string {
		const status = ticketStatus(ticket);
		if (status === 'resuelto') return 'bg-emerald-100 text-emerald-950';
		if (status === 'en progreso') return 'bg-amber-100 text-amber-950';
		return 'bg-slate-100 text-slate-700';
	}

	function resetCurrentTicket() {
		submissions = { ...submissions, [current.ticketId]: createEmptySubmission(current.ticketId) };
		const nextProgress = { ...progressByTicket };
		delete nextProgress[current.ticketId];
		progressByTicket = nextProgress;
		const nextEvaluations = { ...evaluations };
		delete nextEvaluations[current.ticketId];
		evaluations = nextEvaluations;
		showToast('Ticket reiniciado.');
	}

	async function correctTicket() {
		if (correcting) return;
		correcting = true;

		try {
			const response = await fetch('/api/corregir', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(currentSubmission)
			});

			if (!response.ok) throw new Error('correction-failed');

			const result = (await response.json()) as ApiEvaluation;
			evaluations = { ...evaluations, [current.ticketId]: result };

			const progress: TicketProgress = {
				...currentSubmission,
				status: result.passed ? 'resuelto' : 'en_progreso',
				score: result.score,
				feedback: result.aiFeedback || result.feedback,
				updatedAt: new Date().toISOString()
			};

			progressByTicket = { ...progressByTicket, [current.ticketId]: progress };
			await persistProgress(progress);
			showToast(result.passed ? current.closureCue : 'Revisa las pistas y vuelve a cerrar.');
		} catch {
			showToast('No pude corregir el ticket ahora.');
		} finally {
			correcting = false;
		}
	}

	async function persistProgress(progress: TicketProgress) {
		if (!data.userEmail || saving) return;
		saving = true;
		try {
			await fetch('/api/progreso/tickets', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(progress)
			});
		} finally {
			saving = false;
		}
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
					ticketId: current.ticketId,
					selectedActionIds: currentSubmission.selectedActionIds,
					notes: currentSubmission.notes,
					mensaje: message,
					historial: [] satisfies ChatMsg[]
				})
			});

			if (!response.ok) throw new Error('mentor-unavailable');

			const json = (await response.json()) as { respuesta?: string };
			mentorAnswer =
				json.respuesta ?? 'El mentor no pudo responder con claridad. Prueba con otra pregunta.';
			mentorQuestion = '';
		} catch {
			mentorError =
				'El mentor IA no está disponible ahora. Usa los hallazgos y las pistas locales del ticket.';
		} finally {
			mentorLoading = false;
		}
	}

	function checkTone(check: EvaluationCheck): string {
		if (check.passed) {
			return 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/70 dark:bg-emerald-950/32 dark:text-emerald-200';
		}
		return 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/70 dark:bg-amber-950/32 dark:text-amber-200';
	}
</script>

<svelte:head>
	<title>Service Desk Studio</title>
	<meta name="theme-color" content="#0b1220" />
</svelte:head>

<main class="ops-shell">
	<header
		class="sticky top-0 z-30 border-b border-slate-200/80 bg-white/78 px-4 py-3 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/72 sm:px-6"
	>
		<div class="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-4">
			<div class="flex min-w-0 items-center gap-3">
				<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
					<span class="material-symbols-outlined text-[21px]" aria-hidden="true"
						>desktop_windows</span
					>
				</div>
				<div class="min-w-0">
					<p class="text-base font-semibold tracking-tight text-slate-950 dark:text-white">
						Service Desk Studio
					</p>
					<p class="text-xs font-medium text-slate-500 dark:text-slate-400">
						Simulación profesional de soporte nivel 1
					</p>
				</div>
			</div>

			<div class="flex items-center gap-3">
				<div class="hidden min-w-48 sm:block">
					<div class="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
						<div
							class="h-full rounded-full bg-blue-600"
							style={`width: ${completionPercent}%`}
						></div>
					</div>
					<p class="mt-1 text-right text-xs font-medium text-slate-500 dark:text-slate-400">
						{completedCount}/{tickets.length} tickets resueltos
					</p>
				</div>
				<Button href={data.userEmail ? undefined : '/login'} variant="outline">
					{data.userEmail ? data.userEmail : 'Entrar'}
				</Button>
				<button
					type="button"
					onclick={toggleMode}
					aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
					class="ops-focus-ring flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
				>
					<span class="material-symbols-outlined text-xl" aria-hidden="true">
						{isDark ? 'light_mode' : 'dark_mode'}
					</span>
				</button>
			</div>
		</div>
	</header>

	<div
		class="mx-auto grid max-w-[1500px] gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[320px_minmax(0,1fr)_380px] lg:px-8"
	>
		<aside class="space-y-4">
			<section class="ops-panel overflow-hidden">
				<div class="border-b border-slate-200 px-4 py-4 dark:border-slate-800">
					<div class="flex items-center justify-between gap-3">
						<div>
							<p class="text-xs font-semibold text-slate-500 dark:text-slate-400">Incidencias</p>
							<h1 class="mt-1 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
								Cola
							</h1>
						</div>
						<span
							class="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:border-blue-900/70 dark:bg-blue-950/50 dark:text-blue-300"
						>
							{inProgressCount} abiertos
						</span>
					</div>
				</div>
				<div class="max-h-[calc(100dvh-170px)] space-y-1 overflow-y-auto p-2">
					{#each tickets as ticket (ticket.ticketId)}
						<button
							type="button"
							onclick={() => selectTicket(ticket.ticketId)}
							class={`ops-focus-ring w-full rounded-xl border px-3 py-3 text-left transition-colors ${
								ticket.ticketId === current.ticketId
									? 'border-blue-300 bg-blue-50 text-blue-950 dark:border-blue-800 dark:bg-blue-950/42 dark:text-white'
									: 'border-transparent text-slate-700 hover:border-slate-200 hover:bg-white/80 dark:text-slate-300 dark:hover:border-slate-800 dark:hover:bg-slate-900/70'
							}`}
						>
							<div class="flex items-start justify-between gap-2">
								<span
									class="font-mono text-[11px] font-semibold text-slate-500 dark:text-slate-400"
								>
									{ticket.ticketId}
								</span>
								<span
									class={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusClass(ticket)}`}
								>
									{ticketStatus(ticket)}
								</span>
							</div>
							<p class="mt-2 text-sm font-semibold leading-tight">{ticket.title}</p>
							<p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
								{moduleLabels[ticket.module]}
							</p>
						</button>
					{/each}
				</div>
			</section>
		</aside>

		<section class="space-y-5">
			<section class="ops-panel p-5 sm:p-6">
				<div class="flex flex-wrap items-start justify-between gap-4">
					<div class="max-w-3xl">
						<div class="flex flex-wrap items-center gap-2">
							<span
								class="rounded-full border border-slate-200 bg-white px-2.5 py-1 font-mono text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
							>
								{current.ticketId}
							</span>
							<span
								class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300"
							>
								{current.estimatedMinutes} min
							</span>
							<span
								class="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
							>
								{current.difficulty}
							</span>
							<span
								class="rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300"
							>
								{moduleLabels[current.module]}
							</span>
						</div>
						<h2
							class="mt-4 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl"
						>
							{current.title}
						</h2>
					</div>
					<Button variant="outline" onclick={resetCurrentTicket}>Reiniciar</Button>
				</div>

				<div class="ops-subpanel mt-5 p-4">
					<p class="text-sm font-semibold text-slate-950 dark:text-white">Mensaje del usuario</p>
					<p class="mt-2 text-base leading-7 text-slate-800 dark:text-slate-100">
						{current.userMessage}
					</p>
				</div>

				<div class="mt-4 grid gap-3 md:grid-cols-2">
					<div class="ops-subpanel p-4">
						<p class="text-sm font-semibold text-slate-950 dark:text-white">Entorno</p>
						<ul class="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
							{#each current.environment as item (item)}
								<li class="flex gap-2">
									<span class="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
									<span>{item}</span>
								</li>
							{/each}
						</ul>
					</div>
					<div class="ops-subpanel p-4">
						<p class="text-sm font-semibold text-slate-950 dark:text-white">Síntomas</p>
						<ul class="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
							{#each current.symptoms as item (item)}
								<li class="flex gap-2">
									<span class="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-500"></span>
									<span>{item}</span>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</section>

			<section class="ops-panel p-5 sm:p-6">
				<div class="flex flex-wrap items-center justify-between gap-3">
					<div>
						<p class="text-sm font-semibold text-slate-500 dark:text-slate-400">
							Protocolo de trabajo
						</p>
						<h2 class="mt-1 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
							Diagnóstico
						</h2>
					</div>
					<span
						class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300"
					>
						{selectedActions.length}/{current.actions.length} acciones
					</span>
				</div>

				<div class="mt-4 grid gap-3 md:grid-cols-2">
					{#each current.actions as action (action.id)}
						<button
							type="button"
							onclick={() => toggleAction(action.id)}
							class={`ops-focus-ring rounded-2xl border p-4 text-left transition-colors ${
								currentSubmission.selectedActionIds.includes(action.id)
									? 'border-blue-300 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/38'
									: 'border-slate-200 bg-white/72 hover:border-blue-200 hover:bg-blue-50/60 dark:border-slate-800 dark:bg-slate-900/54 dark:hover:border-blue-900 dark:hover:bg-blue-950/22'
							}`}
						>
							<div class="flex items-center justify-between gap-2">
								<span class="text-xs font-semibold text-slate-500 dark:text-slate-400">
									{action.type}
								</span>
								<span
									class={`material-symbols-outlined text-lg ${
										currentSubmission.selectedActionIds.includes(action.id)
											? 'text-blue-600 dark:text-blue-300'
											: 'text-slate-400'
									}`}
									aria-hidden="true"
								>
									{currentSubmission.selectedActionIds.includes(action.id)
										? 'check_circle'
										: 'radio_button_unchecked'}
								</span>
							</div>
							<p class="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
								{action.label}
							</p>
						</button>
					{/each}
				</div>

				<div class="ops-subpanel mt-5 p-4">
					<div class="flex items-center justify-between gap-3">
						<p class="text-sm font-semibold text-slate-950 dark:text-white">Hallazgos</p>
						<p class="text-xs text-slate-500 dark:text-slate-400">Resultados simulados</p>
					</div>
					{#if selectedActions.length > 0}
						<div class="mt-3 space-y-2">
							{#each selectedActions as action (action.id)}
								<article
									class="rounded-xl border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-950/36"
								>
									<p class="text-xs font-semibold text-slate-500 dark:text-slate-400">
										{action.label}
									</p>
									<p class="mt-1 text-sm text-slate-700 dark:text-slate-200">{action.result}</p>
								</article>
							{/each}
						</div>
					{:else}
						<p class="mt-3 text-sm text-slate-500 dark:text-slate-400">
							Selecciona pruebas para ver resultados simulados.
						</p>
					{/if}
				</div>
			</section>
		</section>

		<aside class="space-y-5 lg:sticky lg:top-24 lg:self-start">
			<section class="ops-panel p-5">
				<div>
					<p class="text-sm font-semibold text-slate-500 dark:text-slate-400">Resolución</p>
					<h2 class="mt-1 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
						Cierre
					</h2>
				</div>
				<label class="mt-4 block">
					<span class="text-xs font-semibold text-slate-500 dark:text-slate-400"
						>Notas técnicas</span
					>
					<textarea
						value={currentSubmission.notes}
						oninput={(event) => updateSubmission({ notes: event.currentTarget.value })}
						class="ops-input mt-1 min-h-20 w-full p-3 text-sm"
					></textarea>
				</label>
				<label class="mt-3 block">
					<span class="text-xs font-semibold text-slate-500 dark:text-slate-400">Diagnóstico</span>
					<textarea
						value={currentSubmission.diagnosis}
						oninput={(event) => updateSubmission({ diagnosis: event.currentTarget.value })}
						class="ops-input mt-1 min-h-20 w-full p-3 text-sm"
					></textarea>
				</label>
				<label class="mt-3 block">
					<span class="text-xs font-semibold text-slate-500 dark:text-slate-400">Solución</span>
					<textarea
						value={currentSubmission.solution}
						oninput={(event) => updateSubmission({ solution: event.currentTarget.value })}
						class="ops-input mt-1 min-h-20 w-full p-3 text-sm"
					></textarea>
				</label>

				<div class="mt-3">
					<p class="text-xs font-semibold text-slate-500 dark:text-slate-400">Decisión</p>
					<div class="mt-2 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1 dark:bg-slate-900">
						<button
							type="button"
							onclick={() => updateDecision('cerrar')}
							class={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
								currentSubmission.decision === 'cerrar'
									? 'bg-white text-blue-700 shadow-sm dark:bg-slate-800 dark:text-blue-300'
									: 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
							}`}
						>
							Cerrar
						</button>
						<button
							type="button"
							onclick={() => updateDecision('escalar')}
							class={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
								currentSubmission.decision === 'escalar'
									? 'bg-white text-teal-700 shadow-sm dark:bg-slate-800 dark:text-teal-300'
									: 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
							}`}
						>
							Escalar
						</button>
					</div>
				</div>

				<label class="mt-3 block">
					<span class="text-xs font-semibold text-slate-500 dark:text-slate-400">
						Respuesta al usuario
					</span>
					<textarea
						value={currentSubmission.userReply}
						oninput={(event) => updateSubmission({ userReply: event.currentTarget.value })}
						class="ops-input mt-1 min-h-24 w-full p-3 text-sm"
					></textarea>
				</label>

				<Button class="mt-4 w-full" onclick={correctTicket} disabled={correcting}>
					{correcting ? 'Corrigiendo...' : 'Corregir ticket'}
				</Button>
				{#if saving}
					<p class="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
						Guardando progreso...
					</p>
				{/if}
			</section>

			<section class="ops-panel p-5">
				<div>
					<p class="text-sm font-semibold text-slate-500 dark:text-slate-400">Calidad</p>
					<h2 class="mt-1 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
						Evaluación
					</h2>
				</div>
				{#if currentEvaluation}
					<div class="ops-subpanel mt-3 p-4">
						<div class="flex items-end justify-between gap-3">
							<p class="text-5xl font-semibold tracking-tight text-slate-950 dark:text-white">
								{currentEvaluation.score}
							</p>
							<p class="text-sm font-semibold text-slate-500 dark:text-slate-400">
								/ {currentEvaluation.maxScore}
							</p>
						</div>
						<p class="mt-2 text-sm text-slate-700 dark:text-slate-200">
							{currentEvaluation.aiFeedback || currentEvaluation.feedback}
						</p>
						{#if currentEvaluation.provider !== 'none'}
							<p class="mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
								Feedback IA: {currentEvaluation.provider}
							</p>
						{/if}
					</div>
					<div class="mt-3 space-y-2">
						{#each currentEvaluation.checks as check (check.id)}
							<article class={`rounded-xl border p-3 ${checkTone(check)}`}>
								<div class="flex items-center justify-between gap-3">
									<p class="text-sm font-semibold">{check.label}</p>
									<p class="text-xs font-semibold">{check.points}/{check.maxPoints}</p>
								</div>
								<p class="mt-1 text-xs font-medium">{check.feedback}</p>
							</article>
						{/each}
					</div>
				{:else if currentProgress}
					<div class="ops-subpanel mt-3 p-4">
						<p class="text-5xl font-semibold tracking-tight text-slate-950 dark:text-white">
							{currentProgress.score}
						</p>
						<p class="mt-2 text-sm text-slate-700 dark:text-slate-200">
							{currentProgress.feedback || 'Progreso guardado.'}
						</p>
					</div>
				{:else}
					<p class="ops-subpanel mt-3 p-4 text-sm text-slate-500 dark:text-slate-400">
						Cuando cierres el ticket verás puntuación, errores y pistas.
					</p>
				{/if}
			</section>

			<section class="ops-panel p-5">
				<div>
					<p class="text-sm font-semibold text-slate-500 dark:text-slate-400">
						Apoyo durante el caso
					</p>
					<h2 class="mt-1 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
						Mentor
					</h2>
				</div>
				<textarea
					value={mentorQuestion}
					oninput={(event) => (mentorQuestion = event.currentTarget.value)}
					placeholder="Pregunta una duda del diagnóstico..."
					class="ops-input mt-3 min-h-20 w-full p-3 text-sm"
				></textarea>
				<Button class="mt-3 w-full" variant="outline" onclick={askMentor} disabled={mentorLoading}>
					{mentorLoading ? 'Pensando...' : 'Pedir pista'}
				</Button>
				{#if mentorAnswer}
					<p class="ops-subpanel mt-3 p-3 text-sm text-slate-700 dark:text-slate-200">
						{mentorAnswer}
					</p>
				{/if}
				{#if mentorError}
					<p
						class="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm font-medium text-amber-900 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-200"
					>
						{mentorError}
					</p>
				{/if}
			</section>
		</aside>
	</div>
</main>

{#if toastMessage}
	<div
		class="fixed bottom-4 left-1/2 z-50 w-[min(92vw,460px)] -translate-x-1/2 rounded-xl border border-blue-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-900 shadow-sm dark:border-blue-900 dark:bg-slate-900 dark:text-slate-100"
	>
		{toastMessage}
	</div>
{/if}
