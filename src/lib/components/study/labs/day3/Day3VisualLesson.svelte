<script lang="ts">
	import FlowDiagram from '../FlowDiagram.svelte';
	import LabSection from '../LabSection.svelte';
	import OrderStatusLab from './OrderStatusLab.svelte';
	import CtaTernaryLab from './CtaTernaryLab.svelte';
	import PlanSwitchLab from './PlanSwitchLab.svelte';
	import { seccionAnchorId } from '$lib/data/lessons/_helpers';

	const dia = 3;
</script>

<div
	class="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-tertiary/5 p-8"
>
	<p class="text-[10px] font-bold tracking-[0.25em] text-primary uppercase">Laboratorio visual</p>
	<h2 class="mt-2 text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
		Condicionales = estados de pedido
	</h2>
	<p class="mt-3 max-w-2xl text-sm leading-relaxed text-on-surface-variant">
		if, ternario y switch como reglas de negocio visibles en badges, botones y planes.
	</p>
</div>

<div class="mt-8">
	<p class="mb-3 text-xs font-bold tracking-widest text-on-surface-variant uppercase">
		Mapa del flujo
	</p>
	<FlowDiagram
		nodos={[
			{ id: '01', label: 'Condición', sub: '=== · >' },
			{ id: '02', label: 'Rama', sub: 'if · ? :', accent: true },
			{ id: '03', label: 'UI', sub: 'badge, CTA' }
		]}
	/>
</div>

<article class="mt-10 space-y-10">
	<LabSection
		numero={1}
		titulo="Estado del pedido"
		spec="if · else"
		anchorId={seccionAnchorId(dia, 0)}
	>
		<OrderStatusLab />
	</LabSection>
	<LabSection numero={2} titulo="CTA con ternario" spec="? :" anchorId={seccionAnchorId(dia, 1)}>
		<CtaTernaryLab />
	</LabSection>
	<LabSection numero={3} titulo="Selector de plan" spec="switch" anchorId={seccionAnchorId(dia, 2)}>
		<PlanSwitchLab />
	</LabSection>

	<section class="rounded-2xl border border-outline-variant/50 bg-surface-container p-6">
		<h3 class="text-xs font-bold tracking-widest text-primary uppercase">Resumen visual</h3>
		<div class="mt-4 grid gap-3 sm:grid-cols-3">
			{#each [{ op: 'if/else', uso: 'Estados logísticos' }, { op: '? :', uso: 'Texto del botón' }, { op: 'switch', uso: 'Badge de plan' }] as item (item.op)}
				<div class="rounded-lg border border-outline-variant/40 bg-card p-3">
					<span class="font-mono font-bold text-primary">{item.op}</span>
					<p class="mt-1 text-sm text-on-surface-variant">{item.uso}</p>
				</div>
			{/each}
		</div>
	</section>
</article>
