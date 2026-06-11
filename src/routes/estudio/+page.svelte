<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { setMode } from 'mode-watcher';
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
	const currentEvaluation = $derived(evaluations[current.ticketId]);
	const selectedActions = $derived(
		current.actions.filter((action) => currentSubmission.selectedActionIds.includes(action.id))
	);
	const openTickets = $derived(
		tickets.filter((ticket) => progressByTicket[ticket.ticketId]?.status !== 'resuelto')
	);

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

		setMode('light');

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

	function ticketDisplayId(ticket: HelpdeskTicket): string {
		const index = tickets.findIndex((item) => item.ticketId === ticket.ticketId);
		return `#${1024 + Math.max(index, 0)}`;
	}

	function priorityLabel(ticket: HelpdeskTicket): string {
		if (ticket.difficulty === 'reto') return 'ALTA';
		if (ticket.difficulty === 'media') return 'MEDIA';
		return 'BAJA';
	}

	function priorityClass(ticket: HelpdeskTicket): string {
		if (ticket.difficulty === 'reto') return 'bg-red-50 text-red-600';
		if (ticket.difficulty === 'media') return 'bg-blue-50 text-[#0078d4]';
		return 'bg-slate-100 text-slate-500';
	}

	function actionIcon(type: string): string {
		if (type === 'comando') return 'terminal';
		if (type === 'seguridad') return 'admin_panel_settings';
		if (type === 'fisico') return 'construction';
		if (type === 'pregunta') return 'chat';
		return 'settings';
	}

	function shortActionLabel(label: string): string {
		if (label.toLowerCase().includes('identidad')) return 'Interrogar';
		if (label.toLowerCase().includes('ping')) return 'Ping Red';
		if (label.toLowerCase().includes('dns') || label.toLowerCase().includes('directorio')) {
			return 'Configuración';
		}
		if (label.toLowerCase().includes('estado')) return 'Estado';
		if (label.toLowerCase().includes('logs')) return 'Logs App';
		return label.length > 18 ? label.slice(0, 16) + '...' : label;
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
		const submissionForCorrection: TicketSubmission = {
			...currentSubmission,
			diagnosis: currentSubmission.diagnosis || currentSubmission.notes,
			solution: currentSubmission.solution || currentSubmission.userReply
		};

		try {
			const response = await fetch('/api/corregir', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(submissionForCorrection)
			});

			if (!response.ok) throw new Error('correction-failed');

			const result = (await response.json()) as ApiEvaluation;
			evaluations = { ...evaluations, [current.ticketId]: result };

			const progress: TicketProgress = {
				...submissionForCorrection,
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
	<title>Service Desk Studio - Dashboard Operacional</title>
	<meta name="theme-color" content="#f8f9ff" />
</svelte:head>

<main class="min-h-dvh bg-[#f8f9ff] text-[#111827] min-[1281px]:h-dvh min-[1281px]:overflow-hidden">
	<div class="hidden h-full min-[1281px]:flex">
		<aside
			class="z-40 flex w-20 shrink-0 flex-col items-center gap-8 border-r border-[#e5e7eb] bg-white py-6"
		>
			<div
				class="flex h-10 w-10 items-center justify-center rounded-md bg-[#0078d4] text-white shadow-sm"
			>
				<span class="material-symbols-outlined text-[22px]" aria-hidden="true">support_agent</span>
			</div>
			<nav class="flex flex-1 flex-col items-center gap-2 text-[11px] font-bold text-slate-700">
				<a
					class="flex w-16 flex-col items-center gap-2 rounded-lg px-2 py-3 hover:bg-blue-50"
					href="/estudio"
				>
					<span class="material-symbols-outlined text-[26px]">dashboard</span>
					<span>INICIO</span>
				</a>
				<a
					class="flex w-16 flex-col items-center gap-2 rounded-lg bg-[#0078d4]/10 px-2 py-3 text-[#0078d4]"
					href="/estudio"
				>
					<span class="material-symbols-outlined text-[26px]">confirmation_number</span>
					<span>TICKETS</span>
				</a>
				<a
					class="flex w-16 flex-col items-center gap-2 rounded-lg px-2 py-3 hover:bg-blue-50"
					href="/estudio"
				>
					<span class="material-symbols-outlined text-[26px]">menu_book</span>
					<span>BASE</span>
				</a>
				<a
					class="flex w-16 flex-col items-center gap-2 rounded-lg px-2 py-3 hover:bg-blue-50"
					href="/terminal"
				>
					<span class="material-symbols-outlined text-[26px]">terminal</span>
					<span>TERM</span>
				</a>
			</nav>
			<button
				class="rounded-lg p-2 text-slate-700 hover:bg-blue-50"
				type="button"
				aria-label="Ajustes"
			>
				<span class="material-symbols-outlined text-[28px]">settings</span>
			</button>
		</aside>

		<div class="flex min-w-0 flex-1 flex-col">
			<header
				class="flex h-[70px] shrink-0 items-center justify-between border-b border-[#e5e7eb] bg-white px-6 2xl:px-8"
			>
				<div class="flex items-center gap-6">
					<h1 class="text-xl font-bold text-black">Service Desk Studio</h1>
					<span class="text-2xl text-slate-300">/</span>
					<p class="text-lg font-medium text-slate-700">Gestión de Incidentes</p>
				</div>
				<div class="flex items-center gap-8">
					<div
						class="flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-2 font-mono text-sm text-slate-700"
					>
						<span class="material-symbols-outlined text-[20px]">timer</span>
						<span>04:15:22</span>
					</div>
					<span class="material-symbols-outlined text-slate-700">notifications</span>
					<div class="h-8 w-px bg-[#e5e7eb]"></div>
					<div class="flex items-center gap-3">
						<div class="text-right">
							<p class="text-sm font-bold">Simulation Lead</p>
							<p class="text-xs font-bold tracking-widest text-slate-600">TIER 2 SPECIALIST</p>
						</div>
						<img
							src="/stitch/it-specialist.png"
							alt="Simulation Lead"
							class="h-9 w-9 rounded-full border border-[#e5e7eb] object-cover"
						/>
					</div>
				</div>
			</header>

			<div class="flex min-h-0 flex-1">
				<section
					class="flex w-[320px] shrink-0 flex-col border-r border-[#e5e7eb] bg-white 2xl:w-[400px]"
				>
					<header class="border-b border-[#e5e7eb] px-5 py-5 2xl:px-8">
						<label class="flex h-12 items-center gap-3 rounded-lg bg-[#f3f4f6] px-4 text-slate-500">
							<span class="material-symbols-outlined">search</span>
							<input
								class="w-full border-0 bg-transparent p-0 text-base text-slate-700 placeholder:text-slate-500 focus:ring-0"
								placeholder="Filtrar cola..."
							/>
						</label>
						<div class="mt-4 flex gap-2 text-sm font-semibold">
							<button class="rounded-md bg-[#0078d4] px-4 py-2 text-white" type="button"
								>Abiertos</button
							>
							<button class="rounded-md px-4 py-2 text-slate-700 hover:bg-blue-50" type="button"
								>Míos</button
							>
							<button class="rounded-md px-4 py-2 text-slate-700 hover:bg-blue-50" type="button"
								>SLA</button
							>
						</div>
					</header>
					<div class="min-h-0 flex-1 overflow-y-auto">
						{#each openTickets as ticket, index (ticket.ticketId)}
							<button
								type="button"
								onclick={() => selectTicket(ticket.ticketId)}
								class={`w-full border-b border-[#e5e7eb] px-5 py-5 text-left transition-colors 2xl:px-6 ${
									ticket.ticketId === current.ticketId
										? 'border-l-4 border-l-[#0078d4] bg-[#eef6ff]'
										: 'border-l-4 border-l-transparent bg-white hover:bg-[#f8f9ff]'
								}`}
							>
								<div class="flex items-start justify-between gap-3">
									<div>
										<p class="text-sm font-bold text-[#0078d4]">{ticketDisplayId(ticket)}</p>
										<p class="mt-3 text-base font-semibold text-[#111827]">{ticket.title}</p>
										<p class="mt-1 text-sm text-slate-600">
											{moduleLabels[ticket.module]} • {index === 0
												? 'Juan Pérez'
												: index === 1
													? 'Admin'
													: 'M. Gomez'}
										</p>
									</div>
									<span
										class={`rounded-md px-2 py-1 text-[11px] font-bold ${priorityClass(ticket)}`}
									>
										{priorityLabel(ticket)}
									</span>
								</div>
								<div class="mt-5 flex items-center justify-between text-xs font-semibold">
									<span
										class={ticketStatus(ticket) === 'en progreso'
											? 'text-[#0078d4]'
											: 'text-slate-600'}
									>
										{ticketStatus(ticket) === 'en progreso'
											? '● ACTIVO'
											: ticketStatus(ticket).toUpperCase()}
									</span>
									<span class="text-slate-600"
										>Hace {index === 0 ? '4m' : index === 1 ? '12m' : '1h'}</span
									>
								</div>
							</button>
						{/each}
					</div>
				</section>

				<section class="flex min-w-0 flex-1 flex-col bg-white">
					<div class="min-h-0 flex-1 overflow-y-auto px-6 py-8 2xl:px-10">
						<div class="mx-auto max-w-3xl">
							<div class="flex items-start justify-between gap-6">
								<div>
									<div class="flex items-center gap-3">
										<h2 class="text-2xl font-bold tracking-tight text-black">{current.title}</h2>
										<span class="text-lg text-slate-400">{ticketDisplayId(current)}</span>
									</div>
									<div class="mt-3 flex items-center gap-5 text-sm">
										<span class="material-symbols-outlined text-[20px] text-slate-700"
											>signal_cellular_alt</span
										>
										<span class="text-slate-600"
											>Dificultad: <strong class="text-black">{current.difficulty}</strong></span
										>
										<span class="material-symbols-outlined text-[20px] text-slate-700"
											>schedule</span
										>
										<span class="text-slate-600">Tiempo invertido:</span>
										<strong class="text-black">04:15</strong>
									</div>
								</div>
								<div class="flex gap-3">
									<button
										type="button"
										onclick={resetCurrentTicket}
										class="h-10 rounded-md border border-[#d1d5db] bg-white px-5 font-semibold text-slate-900 hover:bg-slate-50"
									>
										Pausar
									</button>
									<button
										type="button"
										onclick={() => updateDecision('escalar')}
										class="h-10 rounded-md bg-[#0078d4] px-6 font-semibold text-white hover:bg-[#006cbe]"
									>
										Escalar
									</button>
								</div>
							</div>

							<section class="mt-16">
								<div class="flex items-start gap-5">
									<img
										src="/stitch/office-worker.png"
										alt="Usuario"
										class="h-12 w-12 shrink-0 rounded-full border border-[#e5e7eb] object-cover shadow-sm"
									/>
									<div class="min-w-0 flex-1">
										<div class="flex flex-wrap items-center gap-2">
											<p class="font-bold">Juan Pérez</p>
											<p class="text-sm text-slate-600">Operaciones • Vía Portal Web • 09:30 AM</p>
										</div>
										<div
											class="mt-3 rounded-lg border border-[#e5e7eb] bg-white p-5 text-lg leading-8 text-slate-700"
										>
											"{current.userMessage}"
										</div>
									</div>
								</div>
							</section>

							<div class="mt-10 grid grid-cols-2 gap-5">
								<div
									class="flex items-center gap-4 rounded-lg border border-[#e5e7eb] bg-white p-4"
								>
									<span class="material-symbols-outlined rounded-md bg-blue-50 p-2 text-[#0078d4]"
										>desktop_windows</span
									>
									<div>
										<p class="text-xs font-bold uppercase tracking-wide text-slate-600">
											Sistema operativo
										</p>
										<p class="mt-1 font-bold">{current.environment[0] ?? 'Windows 11 Empresa'}</p>
									</div>
								</div>
								<div
									class="flex items-center gap-4 rounded-lg border border-[#e5e7eb] bg-white p-4"
								>
									<span class="material-symbols-outlined rounded-md bg-blue-50 p-2 text-[#0078d4]"
										>public</span
									>
									<div>
										<p class="text-xs font-bold uppercase tracking-wide text-slate-600">
											Conectividad
										</p>
										<p class="mt-1 font-bold">{moduleLabels[current.module]}</p>
									</div>
								</div>
							</div>

							<section class="mt-10">
								<p class="mb-4 text-sm font-bold uppercase tracking-widest text-slate-700">
									Evidencia técnica
								</p>
								<div class="overflow-hidden rounded-lg border border-[#d1d5db] bg-white">
									<div class="relative">
										<img
											src="/stitch/vpn-error.png"
											alt="Captura técnica de incidencia Windows"
											class="max-h-[300px] w-full object-cover"
										/>
										<span
											class="absolute top-3 right-3 rounded bg-black/70 px-3 py-1 text-xs font-bold text-white"
										>
											Captura de usuario
										</span>
									</div>
								</div>
							</section>

							<section class="mt-10">
								<div class="mb-4 flex items-center justify-between">
									<p class="text-sm font-bold uppercase tracking-widest text-slate-700">
										Acciones de diagnóstico
									</p>
									<p class="text-sm font-semibold text-slate-500">
										{selectedActions.length}/{current.actions.length}
									</p>
								</div>
								<div class="grid grid-cols-3 gap-3">
									{#each current.actions as action (action.id)}
										<button
											type="button"
											onclick={() => toggleAction(action.id)}
											class={`flex h-14 items-center justify-center gap-3 rounded-lg border px-4 font-semibold transition-colors ${
												currentSubmission.selectedActionIds.includes(action.id)
													? 'border-[#0078d4] bg-blue-50 text-[#0078d4]'
													: 'border-[#d1d5db] bg-white text-slate-900 hover:border-[#0078d4]'
											}`}
										>
											<span class="material-symbols-outlined">{actionIcon(action.type)}</span>
											<span>{shortActionLabel(action.label)}</span>
										</button>
									{/each}
								</div>
							</section>

							<section class="mt-10 overflow-hidden rounded-lg bg-[#111827] text-slate-200">
								<div class="border-l-4 border-[#0078d4] p-6 font-mono text-sm leading-7">
									<p class="mb-5 font-bold uppercase tracking-[0.18em] text-[#2fbcfe]">
										<span class="material-symbols-outlined mr-2 text-[18px] align-[-4px]"
											>terminal</span
										>
										Simulation Log
									</p>
									{#if selectedActions.length > 0}
										{#each selectedActions as action (action.id)}
											<p><span class="text-[#2fbcfe]">[SIM]</span> {action.result}</p>
										{/each}
									{:else}
										<p><span class="text-[#2fbcfe]">[SIM]</span> Checking gateway... OK</p>
										<p>
											<span class="text-red-400">[ERR]</span> IP 10.0.5.24 - Timeout on port 445 (SMB)
										</p>
										<p><span class="text-amber-300">[WARN]</span> Corporate route not validated</p>
									{/if}
								</div>
							</section>
						</div>
					</div>
				</section>

				<aside
					class="w-[360px] shrink-0 overflow-y-auto border-l border-[#e5e7eb] bg-[#f3f4f6] p-6 2xl:w-[480px] 2xl:p-8"
				>
					<label class="block">
						<span class="text-sm font-bold uppercase tracking-widest text-slate-700"
							>Notas técnicas internas</span
						>
						<textarea
							value={currentSubmission.notes}
							oninput={(event) => updateSubmission({ notes: event.currentTarget.value })}
							placeholder="Análisis del problema..."
							class="mt-3 h-[120px] w-full resize-none rounded-lg border border-[#d1d5db] bg-white p-4 text-slate-700 placeholder:text-slate-500 focus:border-[#0078d4] focus:ring-[#0078d4]"
						></textarea>
					</label>
					<label class="mt-8 block">
						<span class="text-sm font-bold uppercase tracking-widest text-slate-700"
							>Respuesta al usuario</span
						>
						<textarea
							value={currentSubmission.userReply}
							oninput={(event) => updateSubmission({ userReply: event.currentTarget.value })}
							placeholder="Instrucciones para el cliente..."
							class="mt-3 h-[120px] w-full resize-none rounded-lg border border-[#d1d5db] bg-white p-4 text-slate-700 placeholder:text-slate-500 focus:border-[#0078d4] focus:ring-[#0078d4]"
						></textarea>
					</label>
					<div class="mt-7 grid grid-cols-2 gap-2 rounded-lg bg-white p-1">
						<button
							type="button"
							onclick={() => updateDecision('cerrar')}
							class={`rounded-md px-3 py-2 text-sm font-bold ${
								currentSubmission.decision === 'cerrar'
									? 'bg-blue-50 text-[#0078d4]'
									: 'text-slate-600'
							}`}
						>
							Cerrar
						</button>
						<button
							type="button"
							onclick={() => updateDecision('escalar')}
							class={`rounded-md px-3 py-2 text-sm font-bold ${
								currentSubmission.decision === 'escalar'
									? 'bg-blue-50 text-[#0078d4]'
									: 'text-slate-600'
							}`}
						>
							Escalar
						</button>
					</div>
					<button
						type="button"
						onclick={correctTicket}
						disabled={correcting}
						class="mt-7 flex h-16 w-full items-center justify-center gap-3 rounded-lg bg-[#0078d4] text-lg font-bold text-white shadow-[0_4px_8px_rgba(0,120,212,0.25)] hover:bg-[#006cbe] disabled:opacity-60"
					>
						<span class="material-symbols-outlined">check_circle</span>
						{correcting ? 'Corrigiendo...' : 'Corregir Ticket'}
					</button>

					<section
						class="mt-8 rounded-lg border border-[#e5e7eb] bg-white p-6 shadow-[0_2px_6px_rgba(15,23,42,0.06)]"
					>
						<p class="text-sm font-bold uppercase tracking-widest text-slate-700">
							Métricas en tiempo real
						</p>
						<div class="mt-6 space-y-5 text-slate-700">
							<div class="flex items-center justify-between">
								<span>Precisión</span>
								<span class="text-xl tracking-wide text-[#0078d4]"
									>★★★★<span class="text-slate-300">★</span></span
								>
							</div>
							<div class="flex items-center justify-between">
								<span>Diagnóstico</span>
								<span class="text-xl tracking-wide text-[#0078d4]"
									>★★★<span class="text-slate-300">★★</span></span
								>
							</div>
						</div>
					</section>

					<section class="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
						<div class="flex gap-4">
							<span
								class="material-symbols-outlined h-10 w-10 rounded-full bg-[#0078d4] p-2 text-white"
							>
								auto_awesome
							</span>
							<div>
								<p class="font-bold text-[#0078d4]">Recomendación IA</p>
								<p class="mt-2 text-sm italic leading-6 text-slate-700">
									"{mentorAnswer ||
										current.mentorHints[0] ||
										'Revisa las evidencias antes de cerrar el ticket.'}"
								</p>
								<textarea
									value={mentorQuestion}
									oninput={(event) => (mentorQuestion = event.currentTarget.value)}
									placeholder="Pregunta al mentor..."
									class="mt-4 h-20 w-full resize-none rounded-md border border-blue-200 bg-white p-3 text-sm focus:border-[#0078d4] focus:ring-[#0078d4]"
								></textarea>
								<button
									type="button"
									onclick={askMentor}
									disabled={mentorLoading}
									class="mt-3 rounded-md border border-blue-200 bg-white px-4 py-2 text-sm font-bold text-[#0078d4] disabled:opacity-60"
								>
									{mentorLoading ? 'Pensando...' : 'Pedir pista'}
								</button>
								{#if mentorError}
									<p class="mt-3 text-sm font-semibold text-red-700">{mentorError}</p>
								{/if}
							</div>
						</div>
					</section>

					{#if currentEvaluation}
						<section class="mt-8 rounded-lg border border-[#e5e7eb] bg-white p-6">
							<p class="text-sm font-bold uppercase tracking-widest text-slate-700">Evaluación</p>
							<p class="mt-3 text-4xl font-bold">
								{currentEvaluation.score}<span class="text-base text-slate-500"
									>/{currentEvaluation.maxScore}</span
								>
							</p>
							<p class="mt-3 text-sm leading-6 text-slate-700">
								{currentEvaluation.aiFeedback || currentEvaluation.feedback}
							</p>
							<div class="mt-4 space-y-2">
								{#each currentEvaluation.checks as check (check.id)}
									<article class={`rounded-md border p-3 ${checkTone(check)}`}>
										<div class="flex items-center justify-between text-sm font-bold">
											<span>{check.label}</span>
											<span>{check.points}/{check.maxPoints}</span>
										</div>
									</article>
								{/each}
							</div>
						</section>
					{/if}
				</aside>
			</div>
		</div>
	</div>

	<div class="stitch-mobile-shell min-h-dvh pb-64 min-[1281px]:hidden">
		<header
			class="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#c0c7d4] bg-white px-6"
		>
			<div class="flex items-center gap-2">
				<div class="h-8 w-8 rounded bg-[#0078d4]"></div>
				<p class="text-lg font-bold text-[#005faa]">Service Desk Studio</p>
			</div>
			<div class="flex items-center gap-4 text-slate-800">
				<span class="material-symbols-outlined">timer</span>
				<span class="material-symbols-outlined">notifications</span>
				<img
					src="/stitch/it-specialist.png"
					alt="Usuario"
					class="h-10 w-10 rounded-full object-cover"
				/>
			</div>
		</header>

		<section class="px-6 py-4">
			<div class="flex gap-2 overflow-x-auto pb-1">
				{#each tickets.slice(0, 5) as ticket (ticket.ticketId)}
					<button
						type="button"
						onclick={() => selectTicket(ticket.ticketId)}
						class={`shrink-0 rounded-full border px-5 py-2 text-sm font-bold ${
							ticket.ticketId === current.ticketId
								? 'border-[#005faa] bg-[#005faa] text-white'
								: 'border-[#c0c7d4] bg-[#ebeef6] text-slate-600'
						}`}
					>
						{ticketDisplayId(ticket)}
					</button>
				{/each}
			</div>
			<div class="mt-4 flex items-center justify-between">
				<span class="rounded-md bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
					{priorityLabel(current)} PRIORIDAD
				</span>
				<span class="text-sm text-slate-500">Creado hace 12m</span>
			</div>
			<h1 class="mt-4 text-2xl font-extrabold leading-tight text-[#181c22]">{current.title}</h1>
			<div class="mt-4 flex items-center gap-3">
				<img
					src="/stitch/office-worker.png"
					alt="Contacto"
					class="h-10 w-10 rounded-full object-cover"
				/>
				<div>
					<p class="font-bold">InnovaCorp Latam</p>
					<p class="text-sm text-slate-600">Tier 2 • Contacto: Maria G.</p>
				</div>
			</div>
		</section>

		<section class="border-y border-[#c0c7d4] bg-[#f1f3fc] px-6 py-8">
			<article
				class="rounded-xl border border-[#c0c7d4] bg-[#f8f9ff] p-5 shadow-[0_2px_6px_rgba(15,23,42,0.06)]"
			>
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-3">
						<span class="material-symbols-outlined text-[#005faa]">chat_bubble</span>
						<p class="text-sm font-bold">Mensaje del Usuario</p>
					</div>
					<span class="material-symbols-outlined">expand_less</span>
				</div>
				<p class="mt-5 text-base leading-7 text-slate-700">"{current.userMessage}"</p>
				<div class="mt-5 overflow-hidden rounded-lg border border-[#c0c7d4] bg-white">
					<img src="/stitch/vpn-error.png" alt="Captura técnica" class="w-full object-cover" />
					<div class="flex items-center gap-2 bg-[#ebeef6] px-3 py-2 text-xs text-slate-600">
						<span class="material-symbols-outlined text-sm">image</span>
						captura_pantalla_error_800.png
					</div>
				</div>
			</article>

			<p class="mt-8 text-sm font-bold uppercase tracking-widest text-slate-700">
				Acciones de diagnóstico
			</p>
			<div class="mt-4 grid grid-cols-3 gap-4">
				{#each current.actions.slice(0, 3) as action (action.id)}
					<button
						type="button"
						onclick={() => toggleAction(action.id)}
						class={`stitch-tablet-action flex aspect-square flex-col items-center justify-center gap-4 rounded-xl border bg-[#f8f9ff] p-3 text-center text-xs font-bold ${
							currentSubmission.selectedActionIds.includes(action.id)
								? 'border-[#005faa] text-[#005faa]'
								: 'border-[#c0c7d4] text-[#181c22]'
						}`}
					>
						<span class="material-symbols-outlined text-2xl text-[#005faa]"
							>{actionIcon(action.type)}</span
						>
						<span>{shortActionLabel(action.label)}</span>
					</button>
				{/each}
			</div>

			<div class="mt-8 rounded-xl border border-blue-200 bg-blue-100 p-5 text-[#005faa]">
				<p class="font-bold">
					<span class="material-symbols-outlined mr-2 align-[-5px]">tips_and_updates</span>
					Sugerencia Pro:
					<span class="font-medium text-[#004c6b]">
						{current.mentorHints[0] ?? 'Valida las pruebas antes de proponer solución.'}
					</span>
				</p>
			</div>
		</section>

		<section
			class="stitch-resolution-panel fixed right-0 bottom-0 left-0 z-40 border-t border-[#c0c7d4] bg-[#f8f9ff] px-6 py-4"
		>
			<label class="block">
				<span class="text-xs font-bold uppercase tracking-wide text-slate-700"
					>Resolución propuesta</span
				>
				<textarea
					value={currentSubmission.solution}
					oninput={(event) => updateSubmission({ solution: event.currentTarget.value })}
					placeholder="Describe la solución aplicada..."
					class="mt-2 h-24 w-full resize-none rounded-xl border border-[#c0c7d4] bg-[#f1f3fc] p-3 text-sm focus:border-[#005faa] focus:ring-[#005faa]"
				></textarea>
			</label>
			<div class="mt-4 flex gap-3">
				<button
					type="button"
					onclick={correctTicket}
					disabled={correcting}
					class="h-14 flex-1 rounded-xl bg-[#005faa] text-lg font-bold text-white shadow-[0_4px_8px_rgba(0,95,170,0.24)]"
				>
					{correcting ? 'Corrigiendo...' : 'Corregir Ticket'}
				</button>
				<button
					class="h-14 w-14 rounded-xl border border-[#c0c7d4] bg-[#e0e2ea]"
					type="button"
					aria-label="Adjuntar"
				>
					<span class="material-symbols-outlined">attach_file</span>
				</button>
			</div>
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
