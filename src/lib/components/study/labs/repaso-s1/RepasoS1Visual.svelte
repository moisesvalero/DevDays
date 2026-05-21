<script lang="ts">
  import LabSection from '../LabSection.svelte';
  import EnvioRepasoLab from './EnvioRepasoLab.svelte';
  import StockAlertRepasoLab from './StockAlertRepasoLab.svelte';
  import MapRepasoLab from './MapRepasoLab.svelte';
</script>

<div
  class="relative mb-8 overflow-hidden rounded-2xl border border-tertiary/30 bg-gradient-to-br from-tertiary/10 via-card to-primary/5 p-8"
>
  <p class="text-[10px] font-bold tracking-[0.25em] text-tertiary uppercase">Examen · Semana 1</p>
  <h2 class="mt-2 text-2xl font-bold tracking-tight text-on-surface">Repaso visual antes de los 5 retos</h2>
  <p class="mt-3 max-w-2xl text-sm leading-relaxed text-on-surface-variant">
    Tres mini-labs alineados con los primeros retos del examen: variables, condicional y map. Luego baja a consola.
  </p>
</div>

<article class="space-y-10">
  <LabSection numero={1} titulo="Variables + template" spec="repaso · envío" anchorId="repaso-s1-0">
    <EnvioRepasoLab />
  </LabSection>
  <LabSection numero={2} titulo="Condición stock" spec="repaso · if" anchorId="repaso-s1-1">
    <StockAlertRepasoLab />
  </LabSection>
  <LabSection numero={3} titulo="map en lista" spec="repaso · map" anchorId="repaso-s1-2">
    <MapRepasoLab />
  </LabSection>
</article>
