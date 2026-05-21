<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';
  import LiveValue from '../LiveValue.svelte';

  const stocks = [0, 5, 2, 8];
  let values = $state({ umbral: 1 });
  const filtrados = $derived(stocks.filter((s) => s >= values.umbral));
  const count = $derived(filtrados.length);
  const results = $derived({ count });
</script>

<InteractiveLabLayout hint="filter con umbral — solo las filas que pasan quedan activas en la tabla.">
  {#snippet preview()}
    <label class="mb-4 block max-w-xs space-y-2">
      <span class="text-sm text-on-surface-variant">Stock mínimo (umbral)</span>
      <input type="range" min="0" max="10" bind:value={values.umbral} class="w-full accent-tertiary" />
    </label>
    <div class="grid grid-cols-4 gap-2">
      {#each stocks as stock, i (i)}
        <div
          class="rounded-lg border-2 p-4 text-center transition-all duration-300
            {stock >= values.umbral
            ? 'border-tertiary bg-tertiary/10 scale-105'
            : 'border-outline-variant/30 opacity-40 grayscale'}"
        >
          <p class="text-xs text-on-surface-variant">SKU {i + 1}</p>
          <p class="font-mono text-2xl font-bold">{stock}</p>
        </div>
      {/each}
    </div>
    <p class="mt-4 text-sm">Disponibles: <span class="font-bold text-tertiary"><LiveValue value={count} /></span></p>
  {/snippet}

  {#snippet spec()}
    <LiveSpecPanel
      bind:values
      {results}
      limits={{ umbral: { min: 0, max: 10 } }}
      lines={[
        { kind: 'comment', text: '// Spec: filter stock >= umbral' },
        { kind: 'let', key: 'umbral' },
        { kind: 'derived', name: 'disponibles', expr: 'filter', resultKey: 'count' }
      ]}
    />
  {/snippet}
</InteractiveLabLayout>
