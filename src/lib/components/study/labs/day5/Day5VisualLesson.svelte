<script lang="ts">
  import FlowDiagram from '../FlowDiagram.svelte';
  import LabSection from '../LabSection.svelte';
  import MapPricesLab from './MapPricesLab.svelte';
  import FilterStockLab from './FilterStockLab.svelte';
  import FindSkuLab from './FindSkuLab.svelte';
  import { seccionAnchorId } from '$lib/data/lessons/_helpers';

  const dia = 5;
</script>

<div class="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-tertiary/5 p-8">
  <p class="text-[10px] font-bold tracking-[0.25em] text-primary uppercase">Laboratorio visual</p>
  <h2 class="mt-2 text-2xl font-bold text-on-surface md:text-3xl">Arrays: transformar catálogo</h2>
  <p class="mt-3 max-w-2xl text-sm text-on-surface-variant">map, filter y find como operaciones visibles sobre el catálogo.</p>
</div>

<div class="mt-8">
  <FlowDiagram nodos={[
    { id: '01', label: 'Array', sub: 'SKUs' },
    { id: '02', label: 'map/filter', accent: true },
    { id: '03', label: 'Vista', sub: 'lista UI' }
  ]} />
</div>

<article class="mt-10 space-y-10">
  <LabSection numero={1} titulo="Duplicar precios (map)" spec="map" anchorId={seccionAnchorId(dia, 0)}>
    <MapPricesLab />
  </LabSection>
  <LabSection numero={2} titulo="Solo disponibles (filter)" spec="filter" anchorId={seccionAnchorId(dia, 1)}>
    <FilterStockLab />
  </LabSection>
  <LabSection numero={3} titulo="Buscar SKU (find)" spec="find" anchorId={seccionAnchorId(dia, 2)}>
    <FindSkuLab />
  </LabSection>
</article>
