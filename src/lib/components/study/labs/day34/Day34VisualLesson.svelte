<script lang="ts">
	import LabSection from '../LabSection.svelte';
	import Lab1 from './Lab1.svelte';
	import Lab2 from './Lab2.svelte';
	import Lab3 from './Lab3.svelte';
	import { seccionAnchorId } from '$lib/data/lessons/_helpers';
	const dia = 34;
</script>

<div
	class="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-tertiary/5 to-card p-8"
>
	<p class="text-[10px] font-bold uppercase tracking-widest text-tertiary">Proyecto final</p>
	<h2 class="mt-2 text-2xl font-bold">Demo del proyecto</h2>
	<p class="mt-2 text-sm text-on-surface-variant">Hook, demo guiada y next steps.</p>
</div>
<article class="mt-10 space-y-10">
	<LabSection numero={1} titulo="Hook (15s)" spec="hook" anchorId={seccionAnchorId(dia, 0)}
		><Lab1 /></LabSection
	>
	<LabSection numero={2} titulo="Demo guiada" spec="demo" anchorId={seccionAnchorId(dia, 1)}
		><Lab2 /></LabSection
	>
	<LabSection numero={3} titulo="Next steps" spec="next" anchorId={seccionAnchorId(dia, 2)}
		><Lab3 /></LabSection
	>
</article>
