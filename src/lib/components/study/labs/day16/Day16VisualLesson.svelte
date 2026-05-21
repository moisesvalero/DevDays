<script lang="ts">
  import FlowDiagram from '../FlowDiagram.svelte';
  import LabSection from '../LabSection.svelte';
  import Lab1 from './Lab1.svelte';
  import Lab2 from './Lab2.svelte';
  import Lab3 from './Lab3.svelte';
  import { seccionAnchorId } from '$lib/data/lessons/_helpers';
  const dia = 16;
</script>

<div class="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-tertiary/5 p-8">
  <p class="text-[10px] font-bold tracking-[0.25em] text-primary uppercase">Laboratorio visual</p>
  <h2 class="mt-2 text-2xl font-bold text-on-surface">Anatomía del .svelte</h2>
  <p class="mt-3 text-sm text-on-surface-variant">script, markup y style en un solo archivo de producto.</p>
</div>

<div class="mt-8">
  <FlowDiagram
    nodos={[
      { id: '01', label: '<script>' },
      { id: '02', label: 'markup', accent: true },
      { id: '03', label: '<style>' }
    ]}
  />
</div>

<article class="mt-10 space-y-10">
  <LabSection numero={1} titulo="Bloque script" spec="script" anchorId={seccionAnchorId(dia, 0)}><Lab1 /></LabSection>
  <LabSection numero={2} titulo="Markup" spec="HTML" anchorId={seccionAnchorId(dia, 1)}><Lab2 /></LabSection>
  <LabSection numero={3} titulo="Style scoped" spec="style" anchorId={seccionAnchorId(dia, 2)}><Lab3 /></LabSection>
</article>

<section class="mt-12 rounded-xl border border-outline-variant/40 bg-surface-container-low p-6">
  <p class="text-xs font-bold uppercase text-primary">Resumen</p>
  <ul class="mt-3 list-inside list-disc space-y-1 text-sm text-on-surface-variant">
    <li>Un .svelte = componente con lógica, vista y estilos opcionales.</li>
    <li>El script exporta estado; el HTML lo consume.</li>
    <li>Los estilos scoped no fugan al resto de la app.</li>
  </ul>
</section>
