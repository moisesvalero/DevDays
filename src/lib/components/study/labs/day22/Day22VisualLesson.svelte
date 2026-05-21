<script lang="ts">
  import FlowDiagram from '../FlowDiagram.svelte';
  import LabSection from '../LabSection.svelte';
  import Lab1 from './Lab1.svelte';
  import Lab2 from './Lab2.svelte';
  import Lab3 from './Lab3.svelte';
  import { seccionAnchorId } from '$lib/data/lessons/_helpers';
  const dia = 22;
</script>

<div class="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-tertiary/5 p-8">
  <p class="text-[10px] font-bold tracking-[0.25em] text-primary uppercase">Laboratorio visual</p>
  <h2 class="mt-2 text-2xl font-bold text-on-surface">Rutas = mapa del producto</h2>
  <p class="mt-3 text-sm text-on-surface-variant">Cada URL monta un +page.svelte; la navegación es el mapa de tu app.</p>
</div>

<div class="mt-8">
  <FlowDiagram
    nodos={[
      { id: '01', label: 'URL', sub: '/estudio' },
      { id: '02', label: '+page.svelte', accent: true },
      { id: '03', label: 'UI', sub: 'nav · 404' }
    ]}
  />
</div>

<article class="mt-10 space-y-10">
  <LabSection numero={1} titulo="Navegación" spec="routes" anchorId={seccionAnchorId(dia, 0)}><Lab1 /></LabSection>
  <LabSection numero={2} titulo="Link activo" spec="nav" anchorId={seccionAnchorId(dia, 1)}><Lab2 /></LabSection>
  <LabSection numero={3} titulo="404" spec="404" anchorId={seccionAnchorId(dia, 2)}><Lab3 /></LabSection>
</article>

<section class="mt-12 rounded-xl border border-outline-variant/40 bg-surface-container-low p-6">
  <p class="text-xs font-bold uppercase text-primary">Resumen</p>
  <ul class="mt-3 list-inside list-disc space-y-1 text-sm text-on-surface-variant">
    <li>SvelteKit usa rutas basadas en carpetas bajo <code>src/routes</code>.</li>
    <li><code>&lt;a href&gt;</code> o <code>goto()</code> cambian la vista sin recargar toda la página.</li>
    <li>Un 404 comunica que no hay página para esa URL.</li>
  </ul>
</section>
