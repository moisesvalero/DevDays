<script lang="ts">
	import FlowDiagram from '../FlowDiagram.svelte';
	import LabSection from '../LabSection.svelte';
	import PrivateCounterLab from './PrivateCounterLab.svelte';
	import DiscountFactoryLab from './DiscountFactoryLab.svelte';
	import ClosurePriceLab from './ClosurePriceLab.svelte';
	import { seccionAnchorId } from '$lib/data/lessons/_helpers';

	const dia = 10;
</script>

<div
	class="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-tertiary/5 p-8"
>
	<h2 class="text-2xl font-bold text-on-surface">Scope y closures</h2>
	<p class="mt-2 text-sm text-on-surface-variant">Factory de descuentos y contador privado.</p>
</div>
<div class="mt-8">
	<FlowDiagram
		nodos={[
			{ id: '01', label: 'Función outer' },
			{ id: '02', label: 'Closure', accent: true },
			{ id: '03', label: 'UI precio' }
		]}
	/>
</div>
<article class="mt-10 space-y-10">
	<LabSection numero={1} titulo="Contador privado" spec="closure" anchorId={seccionAnchorId(dia, 0)}
		><PrivateCounterLab /></LabSection
	>
	<LabSection
		numero={2}
		titulo="Factory descuento"
		spec="factory"
		anchorId={seccionAnchorId(dia, 1)}><DiscountFactoryLab /></LabSection
	>
	<LabSection numero={3} titulo="Precio final" spec="return" anchorId={seccionAnchorId(dia, 2)}
		><ClosurePriceLab /></LabSection
	>
</article>
