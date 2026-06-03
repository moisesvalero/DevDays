<script lang="ts">
	import FlowDiagram from '../FlowDiagram.svelte';
	import LabSection from '../LabSection.svelte';
	import Lab1 from './Lab1.svelte';
	import Lab2 from './Lab2.svelte';
	import Lab3 from './Lab3.svelte';
	import { seccionAnchorId } from '$lib/data/lessons/_helpers';
	const dia = 18;
</script>

<div
	class="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-tertiary/5 p-8"
>
	<p class="text-[10px] font-bold tracking-[0.25em] text-primary uppercase">Laboratorio visual</p>
	<h2 class="mt-2 text-2xl font-bold text-on-surface">$derived y $effect</h2>
	<p class="mt-3 text-sm text-on-surface-variant">IVA, alertas y analytics.</p>
</div>

<div class="mt-8">
	<FlowDiagram
		nodos={[
			{ id: '01', label: 'state' },
			{ id: '02', label: '$derived', accent: true },
			{ id: '03', label: '$effect' }
		]}
	/>
</div>

<article class="mt-10 space-y-10">
	<LabSection numero={1} titulo="Precio + IVA" spec="$derived" anchorId={seccionAnchorId(dia, 0)}
		><Lab1 /></LabSection
	>
	<LabSection numero={2} titulo="Stock bajo" spec="$derived" anchorId={seccionAnchorId(dia, 1)}
		><Lab2 /></LabSection
	>
	<LabSection numero={3} titulo="Log simulado" spec="$effect" anchorId={seccionAnchorId(dia, 2)}
		><Lab3 /></LabSection
	>
</article>

<section class="mt-12 rounded-xl border border-outline-variant/40 bg-surface-container-low p-6">
	<p class="text-xs font-bold uppercase text-primary">Resumen del día</p>
	<ul class="mt-3 list-inside list-disc space-y-1 text-sm text-on-surface-variant">
		<li>
			<code>$derived</code> calcula valores a partir de otros estados (como getters reactivos).
		</li>
		<li><code>$effect</code> ejecuta efectos secundarios cuando cambian dependencias.</li>
		<li>No confundas derived con effect: cálculo vs. side-effect.</li>
	</ul>
</section>
