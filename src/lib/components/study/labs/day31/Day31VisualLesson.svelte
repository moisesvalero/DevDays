<script lang="ts">
  import FlowDiagram from '../FlowDiagram.svelte';
  import LabSection from '../LabSection.svelte';
  import Lab1 from './Lab1.svelte';
  import Lab2 from './Lab2.svelte';
  import Lab3 from './Lab3.svelte';
  import { seccionAnchorId } from '$lib/data/lessons/_helpers';
  const dia = 31;
</script>

<div class="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-card p-8">
  <h2 class="text-2xl font-bold">Deploy en Vercel</h2>
  <p class="mt-2 text-sm text-on-surface-variant">CI, preview por rama y producción.</p>
</div>
<div class="mt-8"><FlowDiagram nodos={[
  { id: '01', label: 'CI' },
  { id: '02', label: 'preview', accent: true },
  { id: '03', label: 'prod' }
]} /></div>
<article class="mt-10 space-y-10">
  <LabSection numero={1} titulo="Pipeline" spec="CI" anchorId={seccionAnchorId(dia, 0)}><Lab1 /></LabSection>
  <LabSection numero={2} titulo="Preview" spec="preview" anchorId={seccionAnchorId(dia, 1)}><Lab2 /></LabSection>
  <LabSection numero={3} titulo="Env prod" spec="prod" anchorId={seccionAnchorId(dia, 2)}><Lab3 /></LabSection>
</article>
