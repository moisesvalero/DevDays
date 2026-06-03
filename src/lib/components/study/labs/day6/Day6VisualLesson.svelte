<script lang="ts">
	import FlowDiagram from '../FlowDiagram.svelte';
	import LabSection from '../LabSection.svelte';
	import ReduceCartLab from './ReduceCartLab.svelte';
	import SomeStockLab from './SomeStockLab.svelte';
	import SortPriceLab from './SortPriceLab.svelte';
	import { seccionAnchorId } from '$lib/data/lessons/_helpers';

	const dia = 6;
</script>

<div
	class="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-tertiary/5 p-8"
>
	<p class="text-[10px] font-bold tracking-[0.25em] text-primary uppercase">Laboratorio visual</p>
	<h2 class="mt-2 text-2xl font-bold text-on-surface md:text-3xl">Arrays: agregar y ordenar</h2>
	<p class="mt-3 max-w-2xl text-sm text-on-surface-variant">
		reduce, some y sort en métricas de carrito visibles.
	</p>
</div>

<div class="mt-8">
	<FlowDiagram
		nodos={[
			{ id: '01', label: 'Lista', sub: 'precios' },
			{ id: '02', label: 'reduce/sort', accent: true },
			{ id: '03', label: 'KPI', sub: 'total' }
		]}
	/>
</div>

<article class="mt-10 space-y-10">
	<LabSection
		numero={1}
		titulo="Total del carrito (reduce)"
		spec="reduce"
		anchorId={seccionAnchorId(dia, 0)}
	>
		<ReduceCartLab />
	</LabSection>
	<LabSection
		numero={2}
		titulo="¿Hay agotados? (some)"
		spec="some"
		anchorId={seccionAnchorId(dia, 1)}
	>
		<SomeStockLab />
	</LabSection>
	<LabSection
		numero={3}
		titulo="Ordenar por precio (sort)"
		spec="sort"
		anchorId={seccionAnchorId(dia, 2)}
	>
		<SortPriceLab />
	</LabSection>
</article>
