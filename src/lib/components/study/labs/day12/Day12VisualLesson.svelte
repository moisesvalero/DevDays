<script lang="ts">
  import FlowDiagram from '../FlowDiagram.svelte';
  import LabSection from '../LabSection.svelte';
  import FetchCatalogLab from './FetchCatalogLab.svelte';
  import SkeletonLab from './SkeletonLab.svelte';
  import RetryFetchLab from './RetryFetchLab.svelte';
  import { seccionAnchorId } from '$lib/data/lessons/_helpers';

  const dia = 12;
</script>

<div class="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-card p-8">
  <h2 class="text-2xl font-bold">async/await y fetch</h2>
  <p class="mt-2 text-sm text-on-surface-variant">Catálogo que carga, falla o muestra skeleton.</p>
</div>
<div class="mt-8"><FlowDiagram nodos={[
  { id: '01', label: 'async' },
  { id: '02', label: 'await', accent: true },
  { id: '03', label: 'Datos UI' }
]} /></div>
<article class="mt-10 space-y-10">
  <LabSection numero={1} titulo="Cargar catálogo" spec="async" anchorId={seccionAnchorId(dia, 0)}><FetchCatalogLab /></LabSection>
  <LabSection numero={2} titulo="Skeleton" spec="loading" anchorId={seccionAnchorId(dia, 1)}><SkeletonLab /></LabSection>
  <LabSection numero={3} titulo="Retry" spec="try/catch" anchorId={seccionAnchorId(dia, 2)}><RetryFetchLab /></LabSection>
</article>
