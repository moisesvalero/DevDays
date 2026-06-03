<script lang="ts">
	import FlowDiagram from '../FlowDiagram.svelte';
	import LabSection from '../LabSection.svelte';
	import ComponentTreeLab from './ComponentTreeLab.svelte';
	import PropsDownLab from './PropsDownLab.svelte';
	import EventsUpLab from './EventsUpLab.svelte';
	import { seccionAnchorId } from '$lib/data/lessons/_helpers';
	const dia = 15;
</script>

<div class="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-card p-8">
	<h2 class="text-2xl font-bold">Svelte = UI por componentes</h2>
	<p class="mt-2 text-sm text-on-surface-variant">Padre/hijo: datos bajan, eventos suben.</p>
</div>
<div class="mt-8">
	<FlowDiagram
		nodos={[
			{ id: '01', label: 'Component' },
			{ id: '02', label: 'Padre/Hijo', accent: true },
			{ id: '03', label: 'Página' }
		]}
	/>
</div>
<article class="mt-10 space-y-10">
	<LabSection
		numero={1}
		titulo="Árbol de componentes"
		spec="Svelte"
		anchorId={seccionAnchorId(dia, 0)}><ComponentTreeLab /></LabSection
	>
	<LabSection numero={2} titulo="Props down" spec="props" anchorId={seccionAnchorId(dia, 1)}
		><PropsDownLab /></LabSection
	>
	<LabSection numero={3} titulo="Events up" spec="events" anchorId={seccionAnchorId(dia, 2)}
		><EventsUpLab /></LabSection
	>
</article>
