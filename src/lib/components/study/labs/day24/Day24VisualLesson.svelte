<script lang="ts">
  import FlowDiagram from '../FlowDiagram.svelte';
  import LabSection from '../LabSection.svelte';
  import Lab1 from './Lab1.svelte';
  import Lab2 from './Lab2.svelte';
  import Lab3 from './Lab3.svelte';
  import { seccionAnchorId } from '$lib/data/lessons/_helpers';
  const dia = 24;
</script>

<div class="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-tertiary/5 p-8">
  <p class="text-[10px] font-bold tracking-[0.25em] text-primary uppercase">Laboratorio visual</p>
  <h2 class="mt-2 text-2xl font-bold text-on-surface">Rutas dinámicas</h2>
  <p class="mt-3 text-sm text-on-surface-variant">De la lista al detalle con [slug] o [id] en la carpeta routes.</p>
</div>

<div class="mt-8">
  <FlowDiagram
    nodos={[
      { id: '01', label: 'Lista', sub: 'href' },
      { id: '02', label: '[slug]', accent: true },
      { id: '03', label: 'Detalle', sub: 'params' }
    ]}
  />
</div>

<article class="mt-10 space-y-10">
  <LabSection numero={1} titulo="Lista → detalle" spec="list" anchorId={seccionAnchorId(dia, 0)}><Lab1 /></LabSection>
  <LabSection numero={2} titulo="params.slug" spec="slug" anchorId={seccionAnchorId(dia, 1)}><Lab2 /></LabSection>
  <LabSection numero={3} titulo="404 producto" spec="404" anchorId={seccionAnchorId(dia, 2)}><Lab3 /></LabSection>
</article>

<section class="mt-12 rounded-xl border border-outline-variant/40 bg-surface-container-low p-6">
  <p class="text-xs font-bold uppercase text-primary">Resumen</p>
  <ul class="mt-3 list-inside list-disc space-y-1 text-sm text-on-surface-variant">
    <li>Carpetas <code>[slug]</code> crean segmentos dinámicos en la URL.</li>
    <li><code>params</code> llega a la página desde el router.</li>
    <li>Valida si el recurso existe antes de renderizar ficha vacía.</li>
  </ul>
</section>
