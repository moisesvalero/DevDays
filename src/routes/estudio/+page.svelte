<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { browser } from '$app/environment';
	import { mode, toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import DayList from '$lib/components/study/DayList.svelte';
	import LessonContent from '$lib/components/study/LessonContent.svelte';
	import CodeEditor from '$lib/components/study/CodeEditor.svelte';
	import AiTutor from '$lib/components/study/AiTutor.svelte';
	import AskTutorDialog from '$lib/components/study/AskTutorDialog.svelte';
	import { enunciadoParaIA } from '$lib/data/lessons/_helpers';

	let { data } = $props();

	let currentDay = $state(1);
	let ejercicioActivo = $state<number>(1);
	let correctosPorDia = $state<Map<number, Set<number>>>(new Map());
	let codigosPorEjercicio = $state<Map<string, string>>(new Map());
	let feedback = $state<string | null>(null);
	let correctoUltimo = $state<boolean | null>(null);
	let pistas = $state<string[]>([]);
	let snippetGuia = $state<string | null>(null);
	let loading = $state(false);
	let editorRef = $state<{ getValue: () => string } | null>(null);
	let dialogOpen = $state(false);

	const isDark = $derived(browser && mode.current === 'dark');

	const completados = $derived(
		new Set(data.progreso.filter((p) => p.estado === 'completado').map((p) => p.dia))
	);

	const lesson = $derived(data.lessons.find((l) => l.dia === currentDay) ?? data.lessons[0]);
	const totalEjercicios = $derived(lesson.ejercicios.length);
	const correctosDia = $derived(correctosPorDia.get(currentDay) ?? new Set<number>());
	const ejercicio = $derived(
		lesson.ejercicios.find((e) => e.numero === ejercicioActivo) ?? lesson.ejercicios[0]
	);
	const claveActual = $derived(`${currentDay}-${ejercicioActivo}`);
	const codigoActual = $derived(codigosPorEjercicio.get(claveActual) ?? ejercicio.plantilla);

	const dailyProgressPct = $derived(Math.round((correctosDia.size / totalEjercicios) * 100));
	const yaCompletado = $derived(completados.has(currentDay));

	function resetFeedback() {
		feedback = null;
		correctoUltimo = null;
		pistas = [];
		snippetGuia = null;
	}

	function seleccionarDia(d: number) {
		currentDay = d;
		ejercicioActivo = 1;
		resetFeedback();
	}

	function seleccionarEjercicio(n: number) {
		ejercicioActivo = n;
		resetFeedback();
	}

	function onChangeCode(v: string) {
		const next = new Map(codigosPorEjercicio);
		next.set(claveActual, v);
		codigosPorEjercicio = next;
	}

	async function corregir(nivelAyuda: 'normal' | 'extra' = 'normal') {
		if (loading) return;
		loading = true;
		if (nivelAyuda === 'normal') {
			feedback = null;
			correctoUltimo = null;
			pistas = [];
			snippetGuia = null;
		}

		const codigo = editorRef?.getValue() ?? codigoActual;

		try {
			const res = await fetch('/api/corregir', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({
					dia: currentDay,
					ejercicio: ejercicioActivo,
					enunciado: enunciadoParaIA(ejercicio.enunciado),
					queDebePasar: ejercicio.queDebePasar,
					criteriosLogica: ejercicio.criteriosLogica,
					codigo,
					nivelAyuda
				})
			});
			const json = await res.json();
			feedback = json.feedback ?? 'Sin respuesta de la IA.';
			correctoUltimo = Boolean(json.correcto);
			pistas = Array.isArray(json.pistas) ? json.pistas : [];
			snippetGuia = json.snippetGuia ? String(json.snippetGuia) : null;

			if (json.correcto) {
				const nextMap = new Map(correctosPorDia);
				const set = new Set(correctosDia);
				set.add(ejercicioActivo);
				nextMap.set(currentDay, set);
				correctosPorDia = nextMap;
			}
		} catch {
			feedback = 'Error de red. Reintenta en unos segundos.';
			correctoUltimo = false;
			pistas = [];
			snippetGuia = null;
		} finally {
			loading = false;
		}
	}

	function pedirMasAyuda() {
		corregir('extra');
	}

	function abrirDialog() {
		dialogOpen = true;
	}

	async function marcarCompletado() {
		const fd = new FormData();
		fd.append('dia', String(currentDay));
		const res = await fetch('/estudio?/marcar', { method: 'POST', body: fd });
		if (res.ok) {
			await invalidateAll();
		}
	}
</script>

<header
	class="flex h-16 shrink-0 items-center justify-between border-b border-outline-variant bg-surface-container px-6"
>
	<div class="flex items-center gap-2">
		<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;"
			>code_blocks</span
		>
		<span class="text-xl font-bold text-primary">DevDays</span>
	</div>
	<div class="flex items-center gap-4">
		<button
			type="button"
			onclick={toggleMode}
			aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
			class="flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
		>
			<span class="material-symbols-outlined text-xl">
				{isDark ? 'light_mode' : 'dark_mode'}
			</span>
		</button>
		<span class="text-xs text-on-surface-variant">{data.user.email}</span>
	</div>
</header>

<main class="flex flex-1 overflow-hidden">
	<aside class="w-[280px] shrink-0 border-r border-outline-variant bg-surface-container-low">
		<DayList
			lessons={data.lessons}
			{currentDay}
			diasCompletados={completados}
			onSelect={seleccionarDia}
		/>
	</aside>

	<section class="flex flex-1 flex-col overflow-y-auto bg-background">
		<div class="mx-auto w-full max-w-[920px] space-y-8 p-10">
			<LessonContent
				{lesson}
				lessons={data.lessons}
				correctos={correctosDia}
				{ejercicioActivo}
				onSelectEjercicio={seleccionarEjercicio}
			/>

			<CodeEditor
				bind:this={editorRef}
				value={codigoActual}
				onChange={onChangeCode}
				filename={`dia${currentDay}_ej${ejercicioActivo}.js`}
			/>

			<div class="flex justify-end gap-3">
				<Button variant="outline" onclick={() => onChangeCode(ejercicio.plantilla)}>Reset</Button>
				<Button onclick={() => corregir('normal')} disabled={loading}>
					{loading ? 'Corrigiendo...' : 'Corregir'}
				</Button>
			</div>
		</div>
	</section>

	<aside class="w-[360px] shrink-0 border-l border-outline-variant bg-surface-container p-6">
		<AiTutor
			{feedback}
			{pistas}
			{snippetGuia}
			{loading}
			{correctoUltimo}
			{dailyProgressPct}
			{yaCompletado}
			onComplete={marcarCompletado}
			onMasAyuda={pedirMasAyuda}
			onPreguntar={abrirDialog}
		/>
	</aside>
</main>

<AskTutorDialog
	bind:open={dialogOpen}
	dia={currentDay}
	ejercicio={ejercicioActivo}
	enunciado={enunciadoParaIA(ejercicio.enunciado)}
	queDebePasar={ejercicio.queDebePasar}
	{codigoActual}
/>
