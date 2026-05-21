<script lang="ts">
  import FlowDiagram from '../FlowDiagram.svelte';
  import LabSection from '../LabSection.svelte';
  import TableRowsLab from './TableRowsLab.svelte';
  import CategoryChipsLab from './CategoryChipsLab.svelte';
  import CouponIncludesLab from './CouponIncludesLab.svelte';
  import { seccionAnchorId } from '$lib/data/lessons/_helpers';

  const dia = 9;
</script>

<div class="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-tertiary/5 p-8">
  <p class="text-[10px] font-bold tracking-[0.25em] text-primary uppercase">Laboratorio visual</p>
  <h2 class="mt-2 text-2xl font-bold text-on-surface md:text-3xl">Bucles y métodos de array</h2>
  <p class="mt-3 max-w-2xl text-sm text-on-surface-variant">Recorrer listas como filas de tabla o chips de categoría.</p>
</div>

<div class="mt-8">
  <FlowDiagram nodos={[
    { id: '01', label: 'Array' },
    { id: '02', label: 'for / método', accent: true },
    { id: '03', label: 'Lista UI' }
  ]} />
</div>

<article class="mt-10 space-y-10">
  <LabSection numero={1} titulo="Generar filas" spec="for" anchorId={seccionAnchorId(dia, 0)}><TableRowsLab /></LabSection>
  <LabSection numero={2} titulo="Chips de categorías" spec="forEach" anchorId={seccionAnchorId(dia, 1)}><CategoryChipsLab /></LabSection>
  <LabSection numero={3} titulo="includes en carrito" spec="includes" anchorId={seccionAnchorId(dia, 2)}><CouponIncludesLab /></LabSection>
</article>
