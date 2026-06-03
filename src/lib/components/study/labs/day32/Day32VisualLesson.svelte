<script lang="ts">
	import LabSection from '../LabSection.svelte';
	import Lab1 from './Lab1.svelte';
	import Lab2 from './Lab2.svelte';
	import Lab3 from './Lab3.svelte';
	import { seccionAnchorId } from '$lib/data/lessons/_helpers';
	const dia = 32;
</script>

<div class="rounded-2xl border border-tertiary/20 bg-gradient-to-br from-tertiary/10 to-card p-8">
	<h2 class="text-2xl font-bold">Pitch del stack</h2>
	<p class="mt-2 text-sm text-on-surface-variant">Problema → stack → demo en vivo.</p>
</div>
<article class="mt-10 space-y-10">
	<LabSection
		numero={1}
		titulo="Problema de negocio"
		spec="problem"
		anchorId={seccionAnchorId(dia, 0)}><Lab1 /></LabSection
	>
	<LabSection numero={2} titulo="Stack elegido" spec="stack" anchorId={seccionAnchorId(dia, 1)}
		><Lab2 /></LabSection
	>
	<LabSection numero={3} titulo="Demo en vivo" spec="demo" anchorId={seccionAnchorId(dia, 2)}
		><Lab3 /></LabSection
	>
</article>
