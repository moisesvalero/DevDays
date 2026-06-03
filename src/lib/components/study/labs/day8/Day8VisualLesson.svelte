<script lang="ts">
	import FlowDiagram from '../FlowDiagram.svelte';
	import LabSection from '../LabSection.svelte';
	import ProductCardLab from './ProductCardLab.svelte';
	import UpdatePropertyLab from './UpdatePropertyLab.svelte';
	import DestructuringLab from './DestructuringLab.svelte';
	import { seccionAnchorId } from '$lib/data/lessons/_helpers';

	const dia = 8;
</script>

<div
	class="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-tertiary/5 p-8"
>
	<p class="text-[10px] font-bold tracking-[0.25em] text-primary uppercase">Laboratorio visual</p>
	<h2 class="mt-2 text-2xl font-bold text-on-surface md:text-3xl">Objetos = ficha de producto</h2>
	<p class="mt-3 max-w-2xl text-sm text-on-surface-variant">
		Propiedades, mutación y destructuring en cards de producto.
	</p>
</div>

<div class="mt-8">
	<FlowDiagram
		nodos={[
			{ id: '01', label: 'Object', sub: '{ k: v }' },
			{ id: '02', label: 'Mutar', accent: true },
			{ id: '03', label: 'Card UI' }
		]}
	/>
</div>

<article class="mt-10 space-y-10">
	<LabSection
		numero={1}
		titulo="Card de producto"
		spec="object literal"
		anchorId={seccionAnchorId(dia, 0)}
	>
		<ProductCardLab />
	</LabSection>
	<LabSection
		numero={2}
		titulo="Actualizar propiedad"
		spec="obj.k = v"
		anchorId={seccionAnchorId(dia, 1)}
	>
		<UpdatePropertyLab />
	</LabSection>
	<LabSection
		numero={3}
		titulo="Destructuring"
		spec="destructuring"
		anchorId={seccionAnchorId(dia, 2)}
	>
		<DestructuringLab />
	</LabSection>
</article>
