<script lang="ts">
	import FlowDiagram from '../FlowDiagram.svelte';
	import LabSection from '../LabSection.svelte';
	import ShippingFunctionLab from './ShippingFunctionLab.svelte';
	import ArrowFilterLab from './ArrowFilterLab.svelte';
	import DefaultDiscountLab from './DefaultDiscountLab.svelte';
	import { seccionAnchorId } from '$lib/data/lessons/_helpers';

	const dia = 4;
</script>

<div
	class="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-tertiary/5 p-8"
>
	<p class="text-[10px] font-bold tracking-[0.25em] text-primary uppercase">Laboratorio visual</p>
	<h2 class="mt-2 text-2xl font-bold text-on-surface md:text-3xl">
		Funciones = lógica reutilizable
	</h2>
	<p class="mt-3 max-w-2xl text-sm text-on-surface-variant">
		Declaración, flecha y parámetros por defecto en checkout y catálogo.
	</p>
</div>

<div class="mt-8">
	<FlowDiagram
		nodos={[
			{ id: '01', label: 'Input', sub: 'args' },
			{ id: '02', label: 'Función', sub: '=>', accent: true },
			{ id: '03', label: 'Output', sub: 'return' }
		]}
	/>
</div>

<article class="mt-10 space-y-10">
	<LabSection numero={1} titulo="Calcular envío" spec="function" anchorId={seccionAnchorId(dia, 0)}>
		<ShippingFunctionLab />
	</LabSection>
	<LabSection numero={2} titulo="Filtro con flecha" spec="=>" anchorId={seccionAnchorId(dia, 1)}>
		<ArrowFilterLab />
	</LabSection>
	<LabSection
		numero={3}
		titulo="Parámetro por defecto"
		spec="default"
		anchorId={seccionAnchorId(dia, 2)}
	>
		<DefaultDiscountLab />
	</LabSection>
</article>
