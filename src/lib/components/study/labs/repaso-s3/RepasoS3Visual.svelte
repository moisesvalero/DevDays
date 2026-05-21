<script lang="ts">
  import LabSection from '../LabSection.svelte';
  import StateRepasoLab from './StateRepasoLab.svelte';
  import DerivedRepasoLab from './DerivedRepasoLab.svelte';
  import BindRepasoLab from './BindRepasoLab.svelte';
</script>

<div class="relative mb-8 overflow-hidden rounded-2xl border border-secondary/30 bg-gradient-to-br from-secondary/10 via-card to-primary/5 p-8">
  <p class="text-[10px] font-bold tracking-[0.25em] text-secondary uppercase">Examen · Semana 3</p>
  <h2 class="mt-2 text-2xl font-bold text-on-surface">Runes Svelte 5</h2>
  <p class="mt-3 text-sm text-on-surface-variant">$state, $derived y bind antes del examen de componentes.</p>
</div>

<article class="space-y-10">
  <LabSection numero={1} titulo="$state contador" spec="repaso · state" anchorId="repaso-s3-0"><StateRepasoLab /></LabSection>
  <LabSection numero={2} titulo="$derived IVA" spec="repaso · derived" anchorId="repaso-s3-1"><DerivedRepasoLab /></LabSection>
  <LabSection numero={3} titulo="bind input" spec="repaso · bind" anchorId="repaso-s3-2"><BindRepasoLab /></LabSection>
</article>
