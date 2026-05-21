<script lang="ts">
  import FlowDiagram from '../FlowDiagram.svelte';
  import LabSection from '../LabSection.svelte';
  import ThemeStorageLab from './ThemeStorageLab.svelte';
  import ClickCounterLab from './ClickCounterLab.svelte';
  import CartPersistLab from './CartPersistLab.svelte';
  import { seccionAnchorId } from '$lib/data/lessons/_helpers';

  const dia = 13;
</script>

<div class="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-card p-8">
  <h2 class="text-2xl font-bold">DOM y localStorage</h2>
  <p class="mt-2 text-sm text-on-surface-variant">Tema, eventos y carrito persistente.</p>
</div>
<div class="mt-8"><FlowDiagram nodos={[
  { id: '01', label: 'DOM event' },
  { id: '02', label: 'storage', accent: true },
  { id: '03', label: 'Preferencias' }
]} /></div>
<article class="mt-10 space-y-10">
  <LabSection numero={1} titulo="Tema claro/oscuro" spec="localStorage" anchorId={seccionAnchorId(dia, 0)}><ThemeStorageLab /></LabSection>
  <LabSection numero={2} titulo="onclick" spec="click" anchorId={seccionAnchorId(dia, 1)}><ClickCounterLab /></LabSection>
  <LabSection numero={3} titulo="Carrito guardado" spec="JSON" anchorId={seccionAnchorId(dia, 2)}><CartPersistLab /></LabSection>
</article>
