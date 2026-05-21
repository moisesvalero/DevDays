<script lang="ts">
  import type { IdLaboratorio } from '$lib/types/laboratorio';
  import { REPASO_CONFIGS } from './lab-configs';
  import RepasoCard from './RepasoCard.svelte';

  let { id }: { id: IdLaboratorio } = $props();

  const config = $derived(REPASO_CONFIGS[id]);
</script>

{#if config}
  <div
    class="relative mb-8 overflow-hidden rounded-2xl border border-tertiary/30 bg-gradient-to-br from-tertiary/10 via-card to-primary/5 p-8"
  >
    <div
      class="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full bg-tertiary/20 blur-3xl"
    ></div>
    <p class="text-[10px] font-bold tracking-[0.25em] text-tertiary uppercase">Repaso visual premium</p>
    <h2 class="mt-2 text-2xl font-bold tracking-tight text-on-surface">{config.titulo}</h2>
    <p class="mt-3 max-w-2xl text-sm leading-relaxed text-on-surface-variant">{config.subtitulo}</p>
    <p class="mt-2 text-xs text-on-surface-variant">
      Toca cada mini-lab y edita el código en vivo antes de los retos de consola.
    </p>
  </div>

  <div class="space-y-10">
    {#each config.cards as card, i (card.titulo)}
      <RepasoCard {card} index={i} />
    {/each}
  </div>
{/if}
