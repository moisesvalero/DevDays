<script lang="ts">
	import FlowDiagram from '../FlowDiagram.svelte';
	import LabSection from '../LabSection.svelte';
	import Lab1 from './Lab1.svelte';
	import Lab2 from './Lab2.svelte';
	import Lab3 from './Lab3.svelte';
	import { seccionAnchorId } from '$lib/data/lessons/_helpers';
	const dia = 29;
</script>

<div
	class="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-tertiary/5 p-8"
>
	<h2 class="text-2xl font-bold">TypeScript = contratos</h2>
	<p class="mt-2 text-sm text-on-surface-variant">Interfaces, props tipadas y unions.</p>
</div>
<div class="mt-8">
	<FlowDiagram
		nodos={[
			{ id: '01', label: 'interface' },
			{ id: '02', label: 'types', accent: true },
			{ id: '03', label: 'build' }
		]}
	/>
</div>
<article class="mt-10 space-y-10">
	<LabSection
		numero={1}
		titulo="Interface Producto"
		spec="interface"
		anchorId={seccionAnchorId(dia, 0)}><Lab1 /></LabSection
	>
	<LabSection numero={2} titulo="Props tipadas" spec="props" anchorId={seccionAnchorId(dia, 1)}
		><Lab2 /></LabSection
	>
	<LabSection numero={3} titulo="Union types" spec="union" anchorId={seccionAnchorId(dia, 2)}
		><Lab3 /></LabSection
	>
</article>
