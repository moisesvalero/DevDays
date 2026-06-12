<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { courseTracks } from '$lib/data/courses';
	import { enhance } from '$app/forms';

	type PageData = {
		userEmail: string | null;
	};

	let { data }: { data: PageData } = $props();

	let progress = $state<Record<string, { completed: number; total: number }>>({
		helpdesk: { completed: 0, total: 15 },
		terminal: { completed: 0, total: 12 },
		codigo: { completed: 0, total: 35 }
	});

	onMount(() => {
		if (!browser) return;

		// 1. Helpdesk progress
		try {
			const hdSaved = localStorage.getItem('devdays-helpdesk-simulator-v1');
			if (hdSaved) {
				const parsed = JSON.parse(hdSaved);
				if (parsed.progress && typeof parsed.progress === 'object') {
					const completed = Object.values(parsed.progress).filter(
						(p: any) => p && p.status === 'resuelto'
					).length;
					progress.helpdesk.completed = completed;
				}
			}
		} catch (e) {
			console.error('Error loading helpdesk progress:', e);
		}

		// 2. Terminal progress
		try {
			const termSaved = localStorage.getItem('devdays-terminal-course-v1');
			if (termSaved) {
				const parsed = JSON.parse(termSaved);
				if (parsed.progress && typeof parsed.progress === 'object') {
					const completed = Object.values(parsed.progress).filter(
						(p: any) => p && p.status === 'resuelto'
					).length;
					progress.terminal.completed = completed;
				}
			}
		} catch (e) {
			console.error('Error loading terminal progress:', e);
		}

		// 3. Código progress
		try {
			const codeSaved = localStorage.getItem('devdays-code-course-v1');
			if (codeSaved) {
				const parsed = JSON.parse(codeSaved);
				if (Array.isArray(parsed.completedDays)) {
					progress.codigo.completed = parsed.completedDays.length;
				}
			}
		} catch (e) {
			console.error('Error loading coding progress:', e);
		}
	});
</script>

<svelte:head>
	<title>DevDays — Estudio de aprendizaje IT</title>
	<meta
		name="description"
		content="Entrada a DevDays: simulador de incidencias IT, laboratorio de terminal y curso de JavaScript/SvelteKit."
	/>
</svelte:head>

<main class="min-h-dvh bg-[#f6f8fb] text-[#111827]">
	<header class="border-b border-slate-200 bg-white/88 backdrop-blur">
		<div
			class="mx-auto flex w-[min(calc(100vw-2rem),76rem)] items-center justify-between gap-4 py-4 sm:w-[min(calc(100vw-3rem),76rem)]"
		>
			<a class="flex items-center gap-3" href="/" aria-label="DevDays inicio">
				<span
					class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0078d4] text-white shadow-sm"
				>
					<span class="material-symbols-outlined text-[22px]" aria-hidden="true">hub</span>
				</span>
				<span>
					<span class="block text-sm font-black tracking-tight">DevDays</span>
					<span class="block text-xs font-semibold text-slate-500">IT Training Studio</span>
				</span>
			</a>
			<nav class="flex items-center gap-3 text-sm font-bold">
				<a
					class="hidden rounded-md px-3 py-2 text-slate-600 hover:bg-slate-100 sm:inline-flex"
					href="#rutas"
				>
					Rutas
				</a>
				{#if data.userEmail}
					<span class="hidden text-xs text-slate-500 font-semibold sm:inline-block">
						Sesión: {data.userEmail}
					</span>
					<form method="POST" action="?/logout" use:enhance class="inline-flex">
						<button
							type="submit"
							class="rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
						>
							Cerrar sesión
						</button>
					</form>
				{:else}
					<a
						class="hidden rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 sm:inline-flex"
						href="/login"
					>
						Iniciar sesión
					</a>
					<a class="rounded-md bg-[#0078d4] px-4 py-2 text-white hover:bg-[#006cbe]" href="/login">
						Registrarse
					</a>
				{/if}
			</nav>
		</div>
	</header>

	<section
		class="mx-auto grid w-[min(calc(100vw-2rem),76rem)] gap-8 py-10 sm:w-[min(calc(100vw-3rem),76rem)] lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-14"
	>
		<div>
			<p class="text-sm font-black uppercase tracking-[0.2em] text-[#0078d4]">
				Entrenamiento técnico nivel 1
			</p>
			<h1
				class="mt-4 max-w-3xl text-[clamp(2.25rem,4.8vw,4.35rem)] leading-[1.02] font-black tracking-tight text-slate-950"
			>
				Practica soporte IT, terminal y código en un mismo estudio.
			</h1>
			<p class="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
				DevDays ahora es un catálogo modular: tickets reales de empresa Windows, terminal para tu
				día a día y el curso original para construir tu portfolio con JavaScript y SvelteKit.
			</p>
			<div class="mt-8 flex flex-col gap-3 sm:flex-row">
				{#if data.userEmail}
					<a
						class="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#0078d4] px-6 font-bold text-white shadow-[0_8px_22px_rgba(0,120,212,0.24)] hover:bg-[#006cbe]"
						href="#rutas"
					>
						<span class="material-symbols-outlined text-[20px]" aria-hidden="true">school</span>
						Continuar mis rutas
					</a>
				{:else}
					<a
						class="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#0078d4] px-6 font-bold text-white shadow-[0_8px_22px_rgba(0,120,212,0.24)] hover:bg-[#006cbe]"
						href="/login"
					>
						<span class="material-symbols-outlined text-[20px]" aria-hidden="true">login</span>
						Iniciar sesión
					</a>
				{/if}
				<a
					class="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 font-bold text-slate-900 hover:bg-slate-50"
					href="#rutas"
				>
					<span class="material-symbols-outlined text-[20px]" aria-hidden="true">map</span>
					Ver rutas
				</a>
			</div>
		</div>

		<div
			class="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)]"
		>
			<img
				src="/tickets/hd-013-phishing-email.jpg"
				alt="Mesa de trabajo de ciberseguridad y soporte IT"
				class="h-[min(44vh,24rem)] w-full object-cover"
			/>
			<div
				class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/82 to-transparent p-5 text-white"
			>
				<p class="text-xs font-bold uppercase tracking-[0.18em] text-blue-100">Modo práctica</p>
				<p class="mt-2 max-w-md text-xl font-black">Lee, diagnostica, documenta y decide.</p>
			</div>
		</div>
	</section>

	<section id="rutas" class="border-y border-slate-200 bg-white py-10">
		<div class="mx-auto w-[min(calc(100vw-2rem),76rem)] sm:w-[min(calc(100vw-3rem),76rem)]">
			<div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
				<div>
					<p class="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Rutas activas</p>
					<h2 class="mt-2 text-3xl font-black tracking-tight text-slate-950">
						Tres áreas para entrenar sin ruido.
					</h2>
				</div>
				<p class="max-w-xl text-sm leading-6 text-slate-600">
					El acceso al dashboard y a los cursos requiere Magic Link. La landing es pública para
					entender qué hace la app antes de entrar.
				</p>
			</div>

			<div class="mt-7 grid gap-4 lg:grid-cols-3">
				{#each courseTracks as track (track.href)}
					{@const trackProgress = progress[track.id]}
					<article
						class="overflow-hidden rounded-xl border border-slate-200 bg-[#f8fafc] flex flex-col"
					>
						<img src={track.image} alt="" class="h-40 w-full object-cover shrink-0" />
						<div class="flex flex-1 flex-col p-5">
							<div class="flex items-center gap-3">
								<span
									class="material-symbols-outlined rounded-lg bg-blue-50 p-2 text-[#0078d4]"
									aria-hidden="true">{track.icon}</span
								>
								<p class="text-xs font-black uppercase tracking-[0.18em] text-[#0078d4]">
									{track.label}
								</p>
							</div>
							<h3 class="mt-4 text-xl font-black tracking-tight">{track.title}</h3>
							<p class="mt-3 flex-1 text-sm leading-6 text-slate-600">{track.description}</p>

							{#if trackProgress && trackProgress.completed > 0}
								<div class="mt-5 bg-white border border-slate-100 rounded-lg p-3">
									<div class="flex items-center justify-between text-xs font-bold text-slate-700">
										<span class="flex items-center gap-1">
											<span class="material-symbols-outlined text-[14px] text-[#0078d4]"
												>donut_large</span
											>
											Progreso
										</span>
										<span>{trackProgress.completed} / {trackProgress.total} completados</span>
									</div>
									<div class="mt-2 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
										<div
											class="h-1.5 rounded-full bg-[#0078d4] transition-all duration-500"
											style="width: {Math.round(
												(trackProgress.completed / trackProgress.total) * 100
											)}%"
										></div>
									</div>
								</div>
							{/if}

							<div class="mt-5 flex flex-wrap gap-2">
								{#each track.stats as stat (stat)}
									<span
										class="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-600"
									>
										{stat}
									</span>
								{/each}
							</div>
							<a
								class="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-slate-950 px-5 text-sm font-bold text-white hover:bg-slate-800 transition-colors cursor-pointer"
								href={track.href}
							>
								{trackProgress && trackProgress.completed > 0
									? 'Continuar ruta'
									: 'Entrar a esta ruta'}
							</a>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>
</main>
