<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    numero,
    titulo,
    spec,
    anchorId,
    children
  }: {
    numero: number;
    titulo: string;
    spec: string;
    anchorId: string;
    children: Snippet;
  } = $props();
</script>

<section
  id={anchorId}
  class="scroll-mt-24 overflow-hidden rounded-2xl border border-outline-variant/40 bg-card shadow-[var(--shadow-soft-md)]"
>
  <header
    class="flex flex-wrap items-start justify-between gap-3 border-b border-outline-variant/30 bg-gradient-to-r from-primary/8 to-transparent px-6 py-5"
  >
    <div class="flex items-start gap-4">
      <span
        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary font-bold text-on-primary shadow-md"
      >
        {numero}
      </span>
      <div>
        <p class="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Laboratorio</p>
        <h3 class="text-xl font-bold tracking-tight text-on-surface">{titulo}</h3>
      </div>
    </div>
    <span
      class="rounded-full border border-tertiary/40 bg-tertiary-container/30 px-3 py-1 text-xs font-medium text-tertiary"
    >
      {spec}
    </span>
  </header>
  <div class="p-6">
    {@render children()}
  </div>
</section>
