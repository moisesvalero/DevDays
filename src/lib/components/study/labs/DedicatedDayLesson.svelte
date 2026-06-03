<script lang="ts">
	import type { IdLaboratorio } from '$lib/types/laboratorio';
	import { LAB_CONFIGS } from './lab-configs';
	import FlowDiagram from './FlowDiagram.svelte';
	import LabSection from './LabSection.svelte';
	import PremiumLabBlock from './premium/PremiumLabBlock.svelte';
	import { seccionAnchorId } from '$lib/data/lessons/_helpers';

	let { id }: { id: IdLaboratorio } = $props();

	const config = $derived(LAB_CONFIGS[id]);
	const dia = $derived(Number(id.match(/dia-(\d+)/)?.[1] ?? 0));
</script>

{#if config}
	<div
		class="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-tertiary/5 p-8"
	>
		<div
			class="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl"
		></div>
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
				<PremiumLabBlock config={lab} />
			</LabSection>
		{/each}

		<section class="rounded-2xl border border-outline-variant/50 bg-surface-container p-6">
			<h3 class="text-xs font-bold tracking-widest text-primary uppercase">Resumen visual</h3>
			<div class="mt-4 grid gap-3 sm:grid-cols-3">
				{#each config.labs as lab (lab.titulo)}
					<div
						class="lab-card-lift flex flex-col gap-1 rounded-lg border border-outline-variant/40 bg-card p-4"
					>
						<span class="font-semibold text-on-surface">{lab.titulo}</span>
						<span class="font-mono text-xs text-primary">{lab.spec}</span>
						<span class="text-xs text-on-surface-variant">{lab.uiDescription}</span>
					</div>
				{/each}
			</div>
		</section>
	</article>
{:else}
	<p class="text-sm text-on-surface-variant">Laboratorio no encontrado: {id}</p>
{/if}
