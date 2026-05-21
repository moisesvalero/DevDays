<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';

  const items = [
    { sku: 'A1', precio: 12, nombre: 'Gorra' },
    { sku: 'B2', precio: 25, nombre: 'Mochila' },
    { sku: 'C3', precio: 8, nombre: 'Pin' }
  ];

  let values = $state({ sku: 'B2' });
  const found = $derived(items.find((i) => i.sku === values.sku));
  const precio = $derived(found?.precio ?? '—');
  const results = $derived({ precio });
</script>

<InteractiveLabLayout hint="find por SKU — la ficha de detalle muestra el primer match.">
  {#snippet preview()}
    <div class="grid gap-6 lg:grid-cols-2">
      <ul class="space-y-2">
        {#each items as item (item.sku)}
          <li>
            <button
              type="button"
              class="w-full rounded-lg border px-4 py-3 text-left transition-all
                {values.sku === item.sku
                ? 'border-primary bg-primary/10'
                : 'border-outline-variant/40 hover:border-primary/30'}"
              onclick={() => (values.sku = item.sku)}
            >
              <span class="font-mono text-xs text-primary">{item.sku}</span>
              <span class="ml-2 text-sm">{item.nombre}</span>
            </button>
          </li>
        {/each}
      </ul>
      <div class="lab-card-lift rounded-2xl border border-primary/30 bg-card p-6">
        <p class="text-xs uppercase text-on-surface-variant">find() → detalle</p>
        {#if found}
          <h3 class="mt-2 text-2xl font-bold">{found.nombre}</h3>
          <p class="mt-4 font-mono text-4xl font-black text-primary">{found.precio} €</p>
        {:else}
          <p class="mt-4 text-destructive">SKU no encontrado</p>
        {/if}
      </div>
    </div>
  {/snippet}

  {#snippet spec()}
    <LiveSpecPanel
      bind:values
      {results}
      lines={[
        { kind: 'comment', text: '// Spec: items.find(sku)' },
        { kind: 'let', key: 'sku' },
        { kind: 'derived', name: 'precioEncontrado', expr: 'find sku', resultKey: 'precio' }
      ]}
    />
  {/snippet}
</InteractiveLabLayout>
