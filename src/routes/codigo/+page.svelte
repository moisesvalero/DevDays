<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { setMode } from 'mode-watcher';
	import type { Ejercicio, Leccion } from '$lib/types/lesson';

	type PageData = {
		lessons: Leccion[];
		userEmail: string | null;
		userMetadata: { full_name?: string; avatar_url?: string } | null;
	};

	type StoredCodeCourseState = {
		currentDay: number;
		completedDays: number[];
		notesByDay: Record<number, string>;
	};

	let { data }: { data: PageData } = $props();
	const storageKey = 'devdays-code-course-v1';
	const lessons = $derived(data.lessons);

	let currentDay = $state(1);
	let completedDays = $state<number[]>([]);
	let notesByDay = $state<Record<number, string>>({});
	let hydrated = $state(false);

	const current = $derived(lessons.find((lesson) => lesson.dia === currentDay) ?? lessons[0]);
	const completedPercent = $derived(Math.round((completedDays.length / lessons.length) * 100));
	const currentNotes = $derived(notesByDay[current.dia] ?? '');
	const weekGroups = $derived(
		[1, 2, 3, 4, 5].map((week) => ({
			week,
			lessons: lessons.filter((lesson) => lesson.semana === week)
		}))
	);
	let openProfileModal = $state(false);
	let editFullName = $state('');
	let editAvatarUrl = $state('');
	let profileSaving = $state(false);
	let profileError = $state('');

	function openProfile() {
		editFullName = data.userMetadata?.full_name ?? '';
		editAvatarUrl = data.userMetadata?.avatar_url ?? '/stitch/it-specialist.png';
		profileError = '';
		openProfileModal = true;
	}

	async function saveProfile() {
		if (!editFullName.trim()) {
			profileError = 'El nombre es obligatorio.';
			return;
		}
		profileSaving = true;
		profileError = '';
		try {
			const res = await fetch('/api/perfil', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					full_name: editFullName,
					avatar_url: editAvatarUrl
				})
			});
			if (!res.ok) {
				const errData = await res.json();
				throw new Error(errData.message || 'Error al guardar.');
			}
			data.userMetadata = {
				full_name: editFullName,
				avatar_url: editAvatarUrl
			};
			openProfileModal = false;
		} catch (err: any) {
			profileError = err.message || 'No se pudo guardar el perfil.';
		} finally {
			profileSaving = false;
		}
	}

	onMount(() => {
		if (!browser || hydrated) return;
		setMode('light');

		const saved = localStorage.getItem(storageKey);
		if (saved) {
			try {
				const parsed = JSON.parse(saved) as Partial<StoredCodeCourseState>;
				if (typeof parsed.currentDay === 'number' && hasDay(parsed.currentDay)) {
					currentDay = parsed.currentDay;
				}
				if (Array.isArray(parsed.completedDays)) {
					completedDays = parsed.completedDays.filter(hasDay);
				}
				if (parsed.notesByDay && typeof parsed.notesByDay === 'object') {
					notesByDay = sanitizeNotes(parsed.notesByDay as Record<string, unknown>);
				}
			} catch {
				localStorage.removeItem(storageKey);
			}
		}

		hydrated = true;
	});

	$effect(() => {
		if (!browser || !hydrated) return;
		const state: StoredCodeCourseState = { currentDay, completedDays, notesByDay };
		localStorage.setItem(storageKey, JSON.stringify(state));
	});

	function hasDay(day: number): boolean {
		return lessons.some((lesson) => lesson.dia === day);
	}

	function sanitizeNotes(value: Record<string, unknown>): Record<number, string> {
		const next: Record<number, string> = {};
		for (const lesson of lessons) {
			const raw = value[lesson.dia];
			if (typeof raw === 'string') next[lesson.dia] = raw;
		}
		return next;
	}

	function selectDay(day: number) {
		if (!hasDay(day)) return;
		currentDay = day;
	}

	function toggleComplete(day: number) {
		completedDays = completedDays.includes(day)
			? completedDays.filter((item) => item !== day)
			: [...completedDays, day].sort((a, b) => a - b);
	}

	function updateNotes(value: string) {
		notesByDay = { ...notesByDay, [current.dia]: value };
	}

	function nextDay() {
		selectDay(Math.min(currentDay + 1, lessons.length));
	}

	function previousDay() {
		selectDay(Math.max(currentDay - 1, 1));
	}

	function exerciseLabel(exercise: Ejercicio): string {
		return `Ej. ${exercise.numero} · ${exercise.titulo}`;
	}
</script>

<svelte:head>
	<title>DevDays Código - JavaScript, Svelte y SvelteKit</title>
	<meta
		name="description"
		content="Curso recuperado de DevDays para construir un portfolio aprendiendo JavaScript, Svelte y SvelteKit."
	/>
</svelte:head>

<main class="min-h-dvh bg-[#f6f8fb] text-[#111827] lg:h-dvh lg:overflow-hidden">
	<div class="hidden h-full lg:flex">
		<aside
			class="z-40 flex w-16 shrink-0 flex-col items-center gap-6 border-r border-[#e5e7eb] bg-white py-5"
		>
			<a
				class="flex h-10 w-10 items-center justify-center rounded-md bg-[#0078d4] text-white shadow-sm hover:bg-[#006cbe] transition-colors cursor-pointer"
				href="/"
				aria-label="Volver al Catálogo"
			>
				<span class="material-symbols-outlined text-[22px]" aria-hidden="true">code_blocks</span>
			</a>
			<nav
				class="flex flex-1 flex-col items-center gap-2 text-[10px] font-bold text-slate-700 w-full px-1"
			>
				<a
					class="flex w-14 flex-col items-center gap-2 rounded-lg px-2 py-3 hover:bg-blue-50"
					href="/estudio"
				>
					<span class="material-symbols-outlined text-[26px]">confirmation_number</span>
					<span>TICKETS</span>
				</a>
				<a
					class="flex w-14 flex-col items-center gap-2 rounded-lg px-2 py-3 hover:bg-blue-50"
					href="/terminal"
				>
					<span class="material-symbols-outlined text-[26px]">terminal</span>
					<span>TERM</span>
				</a>
				<a
					class="flex w-14 flex-col items-center gap-2 rounded-lg bg-[#0078d4]/10 px-2 py-3 text-[#0078d4]"
					href="/codigo"
				>
					<span class="material-symbols-outlined text-[26px]">code_blocks</span>
					<span>CODE</span>
				</a>
				<div class="my-2 h-px w-10 bg-slate-200"></div>
				<a
					class="flex w-14 flex-col items-center gap-2 rounded-lg px-2 py-3 hover:bg-slate-100 text-slate-500 hover:text-slate-900"
					href="/"
				>
					<span class="material-symbols-outlined text-[26px]">home</span>
					<span>INICIO</span>
				</a>
			</nav>
		</aside>

		<div class="flex min-w-0 flex-1 flex-col">
			<header
				class="flex h-14 shrink-0 items-center justify-between border-b border-[#e5e7eb] bg-white px-4 2xl:px-5"
			>
				<div class="flex items-center gap-4">
					<h1 class="text-base font-bold text-black">DevDays Código</h1>
					<span class="text-lg text-slate-300">/</span>
					<p class="text-sm font-medium text-slate-700">Construye tu portfolio</p>
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
							{completedDays.length}/{lessons.length} días
						</p>
					</div>
					<a
						class="rounded-md border border-[#d1d5db] bg-white px-3 py-1.5 text-xs font-bold text-slate-900 hover:bg-slate-50 shadow-sm"
						href="/"
					>
						Catálogo
					</a>
					<div class="h-8 w-px bg-[#e5e7eb]"></div>
					<button
						type="button"
						onclick={openProfile}
						class="flex items-center gap-2 hover:opacity-80 transition-opacity text-left cursor-pointer border-0 bg-transparent p-0"
					>
						<div class="text-right">
							<p class="text-xs font-bold text-black">
								{data.userMetadata?.full_name || 'Simulation Apprentice'}
							</p>
							<p class="text-[10px] font-bold tracking-widest text-[#0078d4]">
								{data.userMetadata?.full_name ? 'TIER 2' : 'CONF. PERFIL'}
							</p>
						</div>
						<img
							src={data.userMetadata?.avatar_url || '/stitch/it-specialist.png'}
							alt={data.userMetadata?.full_name || 'Simulation Apprentice'}
							class="h-8 w-8 rounded-full border border-[#e5e7eb] object-cover bg-slate-50"
						/>
					</button>
				</div>
			</header>

			<div class="flex min-h-0 flex-1">
				<section
					class="flex w-[clamp(15rem,21vw,19rem)] shrink-0 flex-col border-r border-[#e5e7eb] bg-white"
				>
					<header class="border-b border-[#e5e7eb] px-4 py-4">
						<p class="text-[11px] font-bold uppercase tracking-widest text-slate-500">
							Ruta de código
						</p>
						<h2 class="mt-1.5 text-base font-bold">35 días de práctica</h2>
					</header>
					<div class="min-h-0 flex-1 overflow-y-auto">
						{#each weekGroups as group (group.week)}
							<section class="border-b border-[#e5e7eb]">
								<p
									class="bg-slate-50 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-slate-500"
								>
									Semana {group.week}
								</p>
								{#each group.lessons as lesson (lesson.dia)}
									<button
										type="button"
										onclick={() => selectDay(lesson.dia)}
										class={`w-full border-t border-[#eef0f3] px-4 py-3 text-left ${
											lesson.dia === current.dia
												? 'border-l-2 border-l-[#0078d4] bg-[#eef6ff]'
												: 'border-l-2 border-l-transparent bg-white hover:bg-[#f8f9ff]'
										}`}
									>
										<div class="flex items-start justify-between gap-3">
											<div class="min-w-0">
												<p class="text-xs font-bold text-[#0078d4]">Día {lesson.dia}</p>
												<p class="mt-1 text-sm leading-5 font-semibold text-slate-950">
													{lesson.titulo}
												</p>
											</div>
											<span
												class={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
													completedDays.includes(lesson.dia)
														? 'bg-emerald-50 text-emerald-700'
														: 'bg-slate-100 text-slate-600'
												}`}
											>
												{completedDays.includes(lesson.dia) ? 'OK' : lesson.tipo.toUpperCase()}
											</span>
										</div>
									</button>
								{/each}
							</section>
						{/each}
					</div>
				</section>

				<section class="min-w-0 flex-1 overflow-y-auto bg-white px-6 py-5 2xl:px-8">
					<div class="mx-auto max-w-4xl">
						<div class="flex items-start justify-between gap-4">
							<div>
								<p class="text-xs font-bold uppercase tracking-widest text-[#0078d4]">
									Semana {current.semana} · {current.tipo === 'examen' ? 'Repaso' : 'Lección'}
								</p>
								<h2 class="mt-1.5 text-2xl font-bold tracking-tight text-black">
									{current.titulo}
								</h2>
								<p class="mt-2 text-sm leading-6 text-slate-700">{current.objetivo}</p>
							</div>
							<button
								type="button"
								onclick={() => toggleComplete(current.dia)}
								class={`rounded-md px-3 py-1.5 text-xs font-bold ${
									completedDays.includes(current.dia)
										? 'bg-emerald-50 text-emerald-700'
										: 'bg-[#0078d4] text-white'
								}`}
							>
								{completedDays.includes(current.dia) ? 'Completado' : 'Marcar completado'}
							</button>
						</div>

						{#if current.tipo === 'leccion'}
							<section class="mt-5 rounded-lg border border-[#e5e7eb] bg-[#f8f9ff] p-4">
								<p class="text-xs font-bold uppercase tracking-widest text-slate-600">
									Idea del día
								</p>
								<p class="mt-2 text-sm leading-6 text-slate-700">{current.contenido.intro}</p>
							</section>

							<div class="mt-4 grid gap-3 lg:grid-cols-2">
								{#each current.contenido.secciones.slice(0, 4) as section (section.titulo)}
									<article class="rounded-lg border border-[#e5e7eb] bg-white p-4">
										<p class="text-sm font-bold text-slate-950">{section.titulo}</p>
										<p class="mt-2 text-xs leading-5 text-slate-600">{section.paraQueSirve}</p>
										<p class="mt-2 text-sm leading-6 text-slate-700">{section.texto}</p>
									</article>
								{/each}
							</div>
						{:else}
							<section class="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4">
								<p class="text-xs font-bold uppercase tracking-widest text-amber-700">
									Examen de repaso
								</p>
								<p class="mt-2 text-sm leading-6 text-amber-900">{current.instrucciones}</p>
							</section>
						{/if}

						<section class="mt-5">
							<div class="mb-3 flex items-center justify-between">
								<p class="text-xs font-bold uppercase tracking-widest text-slate-700">Ejercicios</p>
								<p class="text-xs font-semibold text-slate-500">
									{current.ejercicios.length} prácticas
								</p>
							</div>
							<div class="grid gap-3">
								{#each current.ejercicios as exercise (exercise.numero)}
									<article class="rounded-lg border border-[#e5e7eb] bg-white p-4">
										<p class="text-sm font-bold text-slate-950">{exerciseLabel(exercise)}</p>
										<p class="mt-2 text-sm leading-6 text-slate-700">
											{exercise.enunciado.planteamiento}
										</p>
										<ul class="mt-3 space-y-1.5 text-xs leading-5 text-slate-600">
											{#each exercise.enunciado.requisitos as requirement (requirement)}
												<li>• {requirement}</li>
											{/each}
										</ul>
										<pre
											class="mt-3 overflow-x-auto rounded-md bg-[#111827] p-3 text-xs leading-5 text-[#dbe7ff]"><code
												>{exercise.plantilla.trim()}</code
											></pre>
									</article>
								{/each}
							</div>
						</section>
					</div>
				</section>

				<aside
					class="w-[300px] shrink-0 overflow-y-auto border-l border-[#e5e7eb] bg-[#f3f4f6] p-4"
				>
					<section class="rounded-lg border border-[#e5e7eb] bg-white p-4">
						<p class="text-xs font-bold uppercase tracking-widest text-slate-700">Resumen</p>
						{#if current.tipo === 'leccion'}
							<ul class="mt-3 space-y-2 text-xs leading-5 text-slate-600">
								{#each current.contenido.resumen as item (item)}
									<li>• {item}</li>
								{/each}
							</ul>
						{:else}
							<p class="mt-3 text-xs leading-5 text-slate-600">
								Repasa sin copiar: lee requisitos, escribe solución y compara intención.
							</p>
						{/if}
					</section>

					<section class="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
						<p class="text-sm font-bold text-[#0078d4]">
							<span class="material-symbols-outlined mr-1 align-[-4px] text-[18px]">school</span>
							Objetivo
						</p>
						<p class="mt-2 text-xs leading-5 text-[#004c6b]">
							Construir criterio de frontend: datos, componentes, rutas, formularios, fetch, estado,
							TypeScript y despliegue.
						</p>
					</section>

					<label class="mt-4 block rounded-lg border border-[#e5e7eb] bg-white p-4">
						<span class="text-xs font-bold uppercase tracking-widest text-slate-700">
							Notas del día
						</span>
						<textarea
							value={currentNotes}
							oninput={(event) => updateNotes(event.currentTarget.value)}
							placeholder="Qué he entendido, qué me falta practicar..."
							class="mt-3 h-36 w-full resize-none rounded-md border border-[#d1d5db] bg-white p-3 text-sm text-slate-700 placeholder:text-slate-500 focus:border-[#0078d4] focus:ring-[#0078d4]"
						></textarea>
					</label>

					<div class="mt-4 grid grid-cols-2 gap-2">
						<button
							type="button"
							onclick={previousDay}
							class="h-9 rounded-md border border-[#d1d5db] bg-white text-xs font-bold text-slate-900 hover:bg-slate-50"
						>
							Anterior
						</button>
						<button
							type="button"
							onclick={nextDay}
							class="h-9 rounded-md bg-slate-950 text-xs font-bold text-white hover:bg-slate-800"
						>
							Siguiente
						</button>
					</div>
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
					<span class="material-symbols-outlined text-lg">code_blocks</span>
				</div>
				<p class="text-base font-bold text-[#005faa]">DevDays Código</p>
			</div>
			<a class="text-sm font-bold text-[#005faa]" href="/">Catálogo</a>
		</header>

		<section class="px-4 py-3">
			<div class="flex gap-2 overflow-x-auto pb-1">
				{#each lessons as lesson (lesson.dia)}
					<button
						type="button"
						onclick={() => selectDay(lesson.dia)}
						class={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold ${
							lesson.dia === current.dia
								? 'border-[#005faa] bg-[#005faa] text-white'
								: 'border-[#c0c7d4] bg-[#ebeef6] text-slate-600'
						}`}
					>
						D{lesson.dia}
					</button>
				{/each}
			</div>
			<p class="mt-4 text-xs font-bold uppercase tracking-widest text-[#005faa]">
				Semana {current.semana}
			</p>
			<h1 class="mt-2 text-2xl font-extrabold leading-tight text-[#181c22]">{current.titulo}</h1>
			<p class="mt-2 text-sm leading-6 text-slate-700">{current.objetivo}</p>
		</section>

		<section class="border-y border-[#c0c7d4] bg-[#f1f3fc] px-4 py-5">
			<article class="rounded-lg border border-[#c0c7d4] bg-white p-4">
				<p class="text-xs font-bold uppercase tracking-widest text-slate-700">Contenido</p>
				<p class="mt-2 text-sm leading-6 text-slate-700">
					{current.tipo === 'leccion' ? current.contenido.intro : current.instrucciones}
				</p>
			</article>

			<div class="mt-4 space-y-3">
				{#each current.ejercicios as exercise (exercise.numero)}
					<article class="rounded-lg border border-[#c0c7d4] bg-white p-4">
						<p class="text-sm font-bold">{exerciseLabel(exercise)}</p>
						<p class="mt-2 text-xs leading-5 text-slate-600">
							{exercise.enunciado.planteamiento}
						</p>
					</article>
				{/each}
			</div>
		</section>
	</div>
</main>

{#if openProfileModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
		<div
			class="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150 text-slate-950"
		>
			<div class="flex items-start justify-between">
				<div>
					<h2 class="text-lg font-bold text-slate-900">Configurar tu Perfil</h2>
					<p class="text-xs text-slate-500 mt-1">Personaliza tu nombre e imagen de estudiante</p>
				</div>
				<button
					type="button"
					onclick={() => (openProfileModal = false)}
					class="rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
				>
					<span class="material-symbols-outlined text-[20px]">close</span>
				</button>
			</div>

			<div class="mt-5 space-y-4">
				<div>
					<label
						for="profile-name"
						class="block text-xs font-bold uppercase tracking-wider text-slate-700"
						>Nombre Real</label
					>
					<input
						id="profile-name"
						type="text"
						bind:value={editFullName}
						placeholder="Escribe tu nombre y apellido..."
						class="mt-2 w-full rounded-md border border-slate-300 bg-white p-2.5 text-sm text-slate-950 focus:border-[#0078d4] focus:ring-[#0078d4]"
					/>
				</div>

				<div>
					<p class="block text-xs font-bold uppercase tracking-wider text-slate-700">
						Seleccionar Personaje/Avatar
					</p>
					<div class="mt-3 grid grid-cols-2 gap-3">
						<button
							type="button"
							onclick={() => (editAvatarUrl = '/stitch/it-specialist.png')}
							class={`relative overflow-hidden rounded-lg border-2 p-2 transition-all cursor-pointer ${
								editAvatarUrl === '/stitch/it-specialist.png'
									? 'border-[#0078d4] bg-blue-50/50'
									: 'border-slate-200 bg-white hover:border-slate-300'
							}`}
						>
							<div class="flex flex-col items-center gap-2">
								<img
									src="/stitch/it-specialist.png"
									alt="Especialista IT"
									class="h-16 w-16 rounded-full object-cover border border-slate-100"
								/>
								<span class="text-xs font-bold text-slate-900">Especialista IT</span>
							</div>
							{#if editAvatarUrl === '/stitch/it-specialist.png'}
								<span
									class="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0078d4] text-white"
								>
									<span class="material-symbols-outlined text-[10px]">check</span>
								</span>
							{/if}
						</button>

						<button
							type="button"
							onclick={() => (editAvatarUrl = '/stitch/office-worker.png')}
							class={`relative overflow-hidden rounded-lg border-2 p-2 transition-all cursor-pointer ${
								editAvatarUrl === '/stitch/office-worker.png'
									? 'border-[#0078d4] bg-blue-50/50'
									: 'border-slate-200 bg-white hover:border-slate-300'
							}`}
						>
							<div class="flex flex-col items-center gap-2">
								<img
									src="/stitch/office-worker.png"
									alt="Oficinista"
									class="h-16 w-16 rounded-full object-cover border border-slate-100"
								/>
								<span class="text-xs font-bold text-slate-900">Oficinista</span>
							</div>
							{#if editAvatarUrl === '/stitch/office-worker.png'}
								<span
									class="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0078d4] text-white"
								>
									<span class="material-symbols-outlined text-[10px]">check</span>
								</span>
							{/if}
						</button>
					</div>
				</div>

				{#if profileError}
					<p class="text-xs font-semibold text-red-600">{profileError}</p>
				{/if}

				<div class="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4">
					<button
						type="button"
						onclick={() => (openProfileModal = false)}
						class="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
					>
						Cancelar
					</button>
					<button
						type="button"
						onclick={saveProfile}
						disabled={profileSaving}
						class="rounded-md bg-[#0078d4] px-4 py-2 text-sm font-semibold text-white hover:bg-[#006cbe] disabled:opacity-60 cursor-pointer flex items-center gap-1.5"
					>
						{profileSaving ? 'Guardando...' : 'Guardar Perfil'}
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
