<script lang="ts">
	import type { IdLaboratorio } from '$lib/types/laboratorio';
	import { LAB_CONFIGS } from './lab-configs';
	import FlowDiagram from './FlowDiagram.svelte';
	import LabSection from './LabSection.svelte';
	import DynamicLabBlock from './DynamicLabBlock.svelte';
	import { seccionAnchorId } from '$lib/data/lessons/_helpers';

	let { id }: { id: IdLaboratorio } = $props();

	const config = $derived(LAB_CONFIGS[id]);
	const dia = $derived(Number(id.match(/dia-(\d+)/)?.[1] ?? 0));
</script>

{#if config}
	<div
		class="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-tertiary/5 p-8"
	>
		<p class="text-[10px] font-bold tracking-[0.25em] text-primary uppercase">Laboratorio visual</p>
		<h2 class="mt-2 text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
			{config.heroTitle}
		</h2>
		<p class="mt-3 max-w-2xl text-sm leading-relaxed text-on-surface-variant">
			{config.heroSubtitle}
		</p>
	</div>

	<div class="mt-8">
		<p class="mb-3 text-xs font-bold tracking-widest text-on-surface-variant uppercase">
			Mapa del flujo
		</p>
		<FlowDiagram nodos={config.flowNodes} />
	</div>

	<article class="mt-10 space-y-10">
		{#each config.labs as lab, i (lab.titulo)}
			<LabSection
				numero={i + 1}
				titulo={lab.titulo}
				spec={lab.spec}
				anchorId={seccionAnchorId(dia, i)}
			>
				<DynamicLabBlock config={lab} />
			</LabSection>
		{/each}

		<section class="rounded-2xl border border-outline-variant/50 bg-surface-container p-6">
			<h3 class="text-xs font-bold tracking-widest text-primary uppercase">Resumen visual</h3>
			<div class="mt-4 grid gap-3 sm:grid-cols-3">
				{#each config.labs as lab (lab.titulo)}
					<div class="rounded-lg border border-outline-variant/40 bg-card p-3 text-sm">
						<span class="font-semibold text-on-surface">{lab.titulo}</span>
						<p class="mt-1 text-xs text-on-surface-variant">{lab.spec}</p>
					</div>
				{/each}
			</div>
		</section>
	</article>
{:else}
	<p class="text-sm text-on-surface-variant">Configuración de laboratorio no encontrada.</p>
{/if}
