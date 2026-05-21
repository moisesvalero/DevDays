<script lang="ts">
  import LabSection from '../LabSection.svelte';
  import RouteRepasoLab from './RouteRepasoLab.svelte';
  import LoadRepasoLab from './LoadRepasoLab.svelte';
  import FormRepasoLab from './FormRepasoLab.svelte';
</script>

<div class="relative mb-8 overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card p-8">
  <p class="text-[10px] font-bold tracking-[0.25em] text-primary uppercase">Examen · Semana 4</p>
  <h2 class="mt-2 text-2xl font-bold text-on-surface">SvelteKit: rutas, load y forms</h2>
</div>

<article class="space-y-10">
  <LabSection numero={1} titulo="Ruta activa" spec="repaso · route" anchorId="repaso-s4-0"><RouteRepasoLab /></LabSection>
  <LabSection numero={2} titulo="load data" spec="repaso · load" anchorId="repaso-s4-1"><LoadRepasoLab /></LabSection>
  <LabSection numero={3} titulo="Form action" spec="repaso · form" anchorId="repaso-s4-2"><FormRepasoLab /></LabSection>
</article>
