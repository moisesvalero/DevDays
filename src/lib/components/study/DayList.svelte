<script lang="ts">
	import type { Leccion } from '$lib/types/lesson';

	let {
		lessons,
		currentDay,
		diasCompletados,
		onSelect
	}: {
		lessons: Leccion[];
		currentDay: number;
		/** Días marcados como completados en Supabase */
		diasCompletados: ReadonlySet<number>;
		onSelect: (dia: number) => void;
	} = $props();

	const porSemana = $derived(
		lessons.reduce<Record<number, Leccion[]>>((acc, l) => {
			(acc[l.semana] ||= []).push(l);
			return acc;
		}, {})
	);
</script>

<div class="flex h-full flex-col">
	<div class="border-b border-outline-variant p-6">
		<div class="mb-1 flex items-center gap-2">
			<span
				class="material-symbols-outlined text-primary"
				style="font-variation-settings: 'FILL' 1;">school</span
			>
			<span class="text-xl font-semibold text-on-surface">DevDays</span>
		</div>
		<p class="mt-2 text-xs text-on-surface-variant">
			Todos los días abiertos. Avanza a tu ritmo; lo importante es entender, no el porcentaje.
		</p>
	</div>

	<nav class="flex-1 overflow-y-auto py-2">
		{#each Object.entries(porSemana) as [semanaStr, items] (semanaStr)}
			{@const semana = Number(semanaStr)}
			<div
				class="px-6 pb-1 pt-3 text-[10px] font-bold uppercase tracking-widest text-outline-variant"
			>
				Semana {semana}
			</div>
			{#each items as lesson (lesson.dia)}
				{@const activo = lesson.dia === currentDay}
				{@const esExamen = lesson.tipo === 'examen'}
				{@const completado = diasCompletados.has(lesson.dia)}
				<button
					type="button"
					class="group flex w-full items-center gap-3 border-l-4 px-5 py-2 text-left transition-colors hover:bg-surface-container-high
            {activo
						? 'border-primary bg-surface-container-high'
						: completado
							? 'border-success/50'
							: 'border-transparent'}"
					onclick={() => onSelect(lesson.dia)}
				>
					{#if completado}
						<span
							class="material-symbols-outlined text-lg text-success"
							style="font-variation-settings: 'FILL' 1;"
							aria-hidden="true">check_circle</span
						>
					{:else if esExamen}
						<span class="material-symbols-outlined text-lg text-tertiary" aria-hidden="true"
							>quiz</span
						>
					{:else if activo}
						<span class="material-symbols-outlined text-lg text-primary" aria-hidden="true"
							>play_circle</span
						>
					{:else}
						<span class="material-symbols-outlined text-lg text-outline" aria-hidden="true"
							>circle</span
						>
					{/if}
					<span
						class="text-xs font-semibold tracking-wide
              {activo
							? 'text-primary'
							: completado
								? 'text-success group-hover:text-success'
								: esExamen
									? 'text-tertiary group-hover:text-on-surface'
									: 'text-on-surface-variant group-hover:text-on-surface'}"
					>
						Día {lesson.dia}: {lesson.titulo}
					</span>
				</button>
			{/each}
		{/each}
	</nav>
</div>
