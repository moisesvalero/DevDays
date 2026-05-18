<script lang="ts">
  type Nodo = { id: string; label: string; sub?: string; accent?: boolean };

  let {
    nodos,
    flechas = []
  }: {
    nodos: Nodo[];
    flechas?: { de: string; a: string }[];
  } = $props();
</script>

<div
  class="relative overflow-x-auto rounded-2xl border border-outline-variant/50 bg-gradient-to-br from-surface-container-low via-background to-primary/5 p-6"
  role="img"
  aria-label="Flujo de datos del concepto"
>
  <div class="flex min-w-max flex-wrap items-center justify-center gap-2 md:gap-4">
    {#each nodos as nodo, i (nodo.id)}
      <div
        class="relative flex min-w-[7.5rem] flex-col items-center rounded-xl border px-4 py-3 text-center shadow-sm transition-transform hover:scale-[1.02]
          {nodo.accent
          ? 'border-primary bg-primary/10 text-primary'
          : 'border-outline-variant/60 bg-card text-on-surface'}"
      >
        <span class="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase"
          >{nodo.id}</span
        >
        <span class="mt-1 text-sm font-semibold">{nodo.label}</span>
        {#if nodo.sub}
          <span class="mt-0.5 text-xs text-on-surface-variant">{nodo.sub}</span>
        {/if}
      </div>
      {#if i < nodos.length - 1}
        <div class="flex shrink-0 items-center text-primary/70" aria-hidden="true">
          <span class="material-symbols-outlined text-2xl">arrow_forward</span>
        </div>
      {/if}
    {/each}
  </div>
  {#if flechas.length > 0}
    <p class="mt-4 text-center text-xs text-on-surface-variant">
      {#each flechas as f, j (j)}
        <span class="font-mono text-primary/80">{f.de}</span> → <span class="font-mono text-primary/80"
          >{f.a}</span
        >{#if j < flechas.length - 1}<span class="mx-2 text-outline">·</span>{/if}
      {/each}
    </p>
  {/if}
</div>
