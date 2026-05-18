<script lang="ts">
  import FlowDiagram from '../FlowDiagram.svelte';
  import LabSection from '../LabSection.svelte';
  import ArithmeticLab from './ArithmeticLab.svelte';
  import CompareLab from './CompareLab.svelte';
  import LogicCombinatorsLab from './LogicCombinatorsLab.svelte';
  import { seccionAnchorId } from '$lib/data/lessons/_helpers';

  const dia = 2;
</script>

<div
  class="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-tertiary/5 p-8"
>
  <div
    class="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl"
  ></div>
  <p class="text-[10px] font-bold tracking-[0.25em] text-primary uppercase">Laboratorio visual</p>
  <h2 class="mt-2 text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
    Operadores = reglas de tu interfaz
  </h2>
  <p class="mt-3 max-w-2xl text-sm leading-relaxed text-on-surface-variant">
    No memorices símbolos: cada operador es una decisión de producto. Toca los controles, observa la
    UI y abre el Spec cuando quieras ver la línea exacta.
  </p>
</div>

<div class="mt-8">
  <p class="mb-3 text-xs font-bold tracking-widest text-on-surface-variant uppercase">
    Mapa del flujo
  </p>
  <FlowDiagram
    nodos={[
      { id: '01', label: 'Variables', sub: 'precio, stock…' },
      { id: '02', label: 'Operadores', sub: '+ × % &&', accent: true },
      { id: '03', label: 'Condición', sub: '===  >  if' },
      { id: '04', label: 'UI', sub: 'botón, banner' }
    ]}
    flechas={[
      { de: 'onclick', a: 'actualiza estado' },
      { de: '$derived', a: 'recalcula vista' }
    ]}
  />
</div>

<article class="mt-10 space-y-10">
  <LabSection
    numero={1}
    titulo="Carrito y filas de tabla"
    spec="+ · × · + · %"
    anchorId={seccionAnchorId(dia, 0)}
  >
    <ArithmeticLab />
  </LabSection>

  <LabSection
    numero={2}
    titulo="Comparar planes en la UI"
    spec="=== · > · if"
    anchorId={seccionAnchorId(dia, 1)}
  >
    <CompareLab />
  </LabSection>

  <LabSection
    numero={3}
    titulo="Reglas de compra"
    spec="&& · ||"
    anchorId={seccionAnchorId(dia, 2)}
  >
    <LogicCombinatorsLab />
  </LabSection>

  <section class="rounded-2xl border border-outline-variant/50 bg-surface-container p-6">
    <h3 class="text-xs font-bold tracking-widest text-primary uppercase">Resumen visual</h3>
    <div class="mt-4 grid gap-3 sm:grid-cols-2">
      {#each [
        { op: '+ × − /', uso: 'Totales, subtotales, envíos' },
        { op: '%', uso: 'Patrones en tablas, unidades sueltas' },
        { op: '===  >  <', uso: 'Destacar plan, elegir rama' },
        { op: '&&  ||', uso: 'Botones, banners, validaciones' }
      ] as item (item.op)}
        <div
          class="flex items-center gap-3 rounded-lg border border-outline-variant/40 bg-card p-3"
        >
          <span class="font-mono text-lg font-bold text-primary">{item.op}</span>
          <span class="text-sm text-on-surface-variant">{item.uso}</span>
        </div>
      {/each}
    </div>
  </section>
</article>
