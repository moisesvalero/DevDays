<script lang="ts">
	import FlowDiagram from '../FlowDiagram.svelte';
	import LabSection from '../LabSection.svelte';
	import PromisePaymentLab from './PromisePaymentLab.svelte';
	import TimeoutShipLab from './TimeoutShipLab.svelte';
	import PromiseChainLab from './PromiseChainLab.svelte';
	import { seccionAnchorId } from '$lib/data/lessons/_helpers';

	const dia = 11;
</script>

<div class="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-card p-8">
	<h2 class="text-2xl font-bold">Promesas en la UI</h2>
	<p class="mt-2 text-sm text-on-surface-variant">pending, resolved y rejected como en checkout.</p>
</div>
<div class="mt-8">
	<FlowDiagram
		nodos={[
			{ id: '01', label: 'Promise' },
			{ id: '02', label: 'then/catch', accent: true },
			{ id: '03', label: 'Spinner' }
		]}
	/>
</div>
<article class="mt-10 space-y-10">
	<LabSection numero={1} titulo="Simular carga" spec="Promise" anchorId={seccionAnchorId(dia, 0)}
		><PromisePaymentLab /></LabSection
	>
	<LabSection numero={2} titulo="Timeout" spec="setTimeout" anchorId={seccionAnchorId(dia, 1)}
		><TimeoutShipLab /></LabSection
	>
	<LabSection numero={3} titulo="Encadenar" spec="then" anchorId={seccionAnchorId(dia, 2)}
		><PromiseChainLab /></LabSection
	>
</article>
