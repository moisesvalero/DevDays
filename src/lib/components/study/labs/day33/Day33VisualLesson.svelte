<script lang="ts">
  import LabSection from '../LabSection.svelte';
  import Lab1 from './Lab1.svelte';
  import Lab2 from './Lab2.svelte';
  import Lab3 from './Lab3.svelte';
  import { seccionAnchorId } from '$lib/data/lessons/_helpers';
  const dia = 33;
</script>

<div class="rounded-2xl border border-secondary/20 bg-gradient-to-br from-secondary/10 to-card p-8">
  <h2 class="text-2xl font-bold">Entrevista STAR</h2>
  <p class="mt-2 text-sm text-on-surface-variant">Situación → Acción → Resultado.</p>
</div>
<article class="mt-10 space-y-10">
  <LabSection numero={1} titulo="Situación" spec="S" anchorId={seccionAnchorId(dia, 0)}><Lab1 /></LabSection>
  <LabSection numero={2} titulo="Acción" spec="A" anchorId={seccionAnchorId(dia, 1)}><Lab2 /></LabSection>
  <LabSection numero={3} titulo="Resultado" spec="R" anchorId={seccionAnchorId(dia, 2)}><Lab3 /></LabSection>
</article>
