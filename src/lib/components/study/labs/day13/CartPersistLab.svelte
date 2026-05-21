<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';
  import LiveValue from '../LiveValue.svelte';

  let values = $state({ items: 2 });
  const json = $derived(`{"items":${values.items}}`);
  const results = $derived({ json });
</script>

<InteractiveLabLayout hint="JSON.stringify carrito — persistencia simulada.">
  {#snippet preview()}
    <label class="block space-y-2 max-w-xs">
      <span class="text-sm">Ítems en carrito</span>
      <input type="range" min="0" max="5" bind:value={values.items} class="w-full accent-tertiary" />
    </label>
    <div class="mt-4 flex gap-2">
      {#each Array.from({ length: values.items }, (_, i) => i) as i (i)}
        <span class="size-12 rounded-lg bg-tertiary/20 flex items-center justify-center text-xs">📦</span>
      {/each}
    </div>
    <pre class="mt-6 rounded-lg bg-surface-container-high p-4 font-mono text-sm overflow-x-auto">{json}</pre>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} limits={{ items: { min: 0, max: 5 } }} lines={[
      { kind: 'let', key: 'items' },
      { kind: 'derived', name: 'guardado', expr: 'JSON cart', resultKey: 'json' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
