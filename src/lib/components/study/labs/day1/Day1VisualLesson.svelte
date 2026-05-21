<script lang="ts">
  import FlowDiagram from '../FlowDiagram.svelte';
  import LabSection from '../LabSection.svelte';
  import StockCounterLab from './StockCounterLab.svelte';
  import ProfileSaludoLab from './ProfileSaludoLab.svelte';
  import ProductTagLab from './ProductTagLab.svelte';
  import { seccionAnchorId } from '$lib/data/lessons/_helpers';

  const dia = 1;
</script>

<div
  class="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-tertiary/5 p-8"
>
  <div
    class="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl"
  ></div>
  <p class="text-[10px] font-bold tracking-[0.25em] text-primary uppercase">Laboratorio visual</p>
  <h2 class="mt-2 text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
    Variables = estado de tu producto
  </h2>
  <p class="mt-3 max-w-2xl text-sm leading-relaxed text-on-surface-variant">
    Toca la ficha, edita el código en vivo y observa cómo nombre, contador y precio alimentan la UI — igual que en el día 2.
  </p>
</div>

<div class="mt-8">
  <p class="mb-3 text-xs font-bold tracking-widest text-on-surface-variant uppercase">Mapa del flujo</p>
  <FlowDiagram
    nodos={[
      { id: '01', label: 'let / const', sub: 'estado' },
      { id: '02', label: 'Template', sub: '${var}', accent: true },
      { id: '03', label: 'UI', sub: 'ficha, etiqueta' }
    ]}
  />
</div>

<article class="mt-10 space-y-10">
  <LabSection numero={1} titulo="Contador de stock" spec="let · +=" anchorId={seccionAnchorId(dia, 0)}>
    <StockCounterLab />
  </LabSection>

  <LabSection numero={2} titulo="Saludo en ficha de usuario" spec="template · backticks" anchorId={seccionAnchorId(dia, 1)}>
    <ProfileSaludoLab />
  </LabSection>

  <LabSection numero={3} titulo="Etiqueta de producto" spec="const · string" anchorId={seccionAnchorId(dia, 2)}>
    <ProductTagLab />
  </LabSection>

  <section class="rounded-2xl border border-outline-variant/50 bg-surface-container p-6">
    <h3 class="text-xs font-bold tracking-widest text-primary uppercase">Resumen visual</h3>
    <div class="mt-4 grid gap-3 sm:grid-cols-3">
      {#each [
        { op: 'let', uso: 'Contador que cambia (stock)' },
        { op: 'const', uso: 'Datos que no reasignas' },
        { op: '`${}`', uso: 'Texto dinámico en UI' }
      ] as item (item.op)}
        <div class="lab-card-lift rounded-lg border border-outline-variant/40 bg-card p-3">
          <span class="font-mono text-lg font-bold text-primary">{item.op}</span>
          <p class="mt-1 text-sm text-on-surface-variant">{item.uso}</p>
        </div>
      {/each}
    </div>
  </section>
</article>
