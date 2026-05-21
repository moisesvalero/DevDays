<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';
  import LiveValue from '../LiveValue.svelte';

  let values = $state({ items: 3 });
  const data = $derived({ productos: Array.from({ length: values.items }, (_, i) => `Item ${i + 1}`) });
  const results = $derived({ data: `${values.items} items` });
</script>

<InteractiveLabLayout hint="export function load() en +page.ts devuelve datos serializables.">
  {#snippet preview()}
    <div class="rounded-xl border border-outline-variant/40 p-6">
      <p class="text-xs font-bold uppercase text-primary">+page.ts → load()</p>
      <label class="mt-4 block">
        <span class="text-sm">Productos en respuesta</span>
        <input type="range" min="0" max="10" bind:value={values.items} class="mt-2 w-full accent-primary" />
        <span class="font-mono font-bold"><LiveValue value={values.items} /></span>
      </label>
      <ul class="mt-4 space-y-1">
        {#each data.productos as item (item)}
          <li class="rounded bg-surface-container-high px-3 py-2 font-mono text-sm">{item}</li>
        {:else}
          <li class="text-sm text-on-surface-variant">Array vacío</li>
        {/each}
      </ul>
    </div>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} limits={{ items: { min: 0, max: 10 } }} lines={[
      { kind: 'comment', text: '// export function load' },
      { kind: 'let', key: 'items' },
      { kind: 'derived', name: 'data', expr: 'return { productos }', resultKey: 'data' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
