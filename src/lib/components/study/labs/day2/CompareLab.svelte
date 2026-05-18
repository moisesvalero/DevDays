<script lang="ts">
  import LogicReveal from '../LogicReveal.svelte';

  // Spec: destacar el plan con precio mayor
  let precioPlanA = $state(12);
  let precioPlanB = $state(9);

  const planAGana = $derived(precioPlanA > precioPlanB);
  const planBGana = $derived(precioPlanB > precioPlanA);
  const empate = $derived(precioPlanA === precioPlanB);
  const precioDestacado = $derived(
    empate ? precioPlanA : planAGana ? precioPlanA : precioPlanB
  );
</script>

<p class="mb-4 text-sm text-on-surface-variant">
  Toca los precios. La UI elige qué tarjeta muestra la etiqueta «Recomendado» — igual que un `if` en
  producto.
</p>

<div class="grid gap-4 sm:grid-cols-2">
  <article
    class="relative rounded-2xl border-2 p-5 transition-all duration-300
      {planAGana && !empate
      ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-[1.02]'
      : 'border-outline-variant/50 bg-surface-container-low'}"
  >
    {#if planAGana && !empate}
      <span
        class="absolute -top-3 left-4 rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-on-primary"
      >
        Recomendado
      </span>
    {/if}
    <p class="text-xs font-bold tracking-wider text-on-surface-variant uppercase">Plan Pro</p>
    <label class="mt-3 block">
      <span class="sr-only">Precio plan A</span>
      <input
        type="number"
        min="0"
        max="99"
        bind:value={precioPlanA}
        class="w-full rounded-lg border border-outline-variant bg-card px-3 py-2 font-mono text-3xl font-bold text-on-surface"
      />
    </label>
    <p class="mt-2 text-xs text-on-surface-variant">€ / mes</p>
  </article>

  <article
    class="relative rounded-2xl border-2 p-5 transition-all duration-300
      {planBGana && !empate
      ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-[1.02]'
      : 'border-outline-variant/50 bg-surface-container-low'}"
  >
    {#if planBGana && !empate}
      <span
        class="absolute -top-3 left-4 rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-on-primary"
      >
        Recomendado
      </span>
    {/if}
    <p class="text-xs font-bold tracking-wider text-on-surface-variant uppercase">Plan Starter</p>
    <label class="mt-3 block">
      <span class="sr-only">Precio plan B</span>
      <input
        type="number"
        min="0"
        max="99"
        bind:value={precioPlanB}
        class="w-full rounded-lg border border-outline-variant bg-card px-3 py-2 font-mono text-3xl font-bold text-on-surface"
      />
    </label>
    <p class="mt-2 text-xs text-on-surface-variant">€ / mes</p>
  </article>
</div>

<div
  class="mt-5 flex flex-wrap items-center gap-3 rounded-xl border border-outline-variant/40 bg-muted/50 p-4"
>
  <span class="material-symbols-outlined text-primary">insights</span>
  <p class="text-sm text-on-surface">
    {#if empate}
      Ambos planes cuestan <strong class="font-mono">{precioPlanA} €</strong> — ninguno destaca.
    {:else}
      Precio de referencia en checkout: <strong class="font-mono text-primary">{precioDestacado} €</strong>
    {/if}
  </p>
</div>

<LogicReveal
  label="Ver Spec · Comparación"
  lines={[
    '// Igualdad estricta entre valores de producto',
    'const mismoPrecio = precioPlanA === precioPlanB;',
    '// Rama: qué plan gana',
    'if (precioPlanA > precioPlanB) { destacado = "A"; }',
    'else if (precioPlanB > precioPlanA) { destacado = "B"; }'
  ]}
/>
