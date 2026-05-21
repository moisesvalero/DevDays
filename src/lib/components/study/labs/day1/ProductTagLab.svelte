<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';
  import LiveValue from '../LiveValue.svelte';

  let values = $state({ producto: 'camiseta', precio: 19.99 });
  const etiqueta = $derived(`La ${values.producto} cuesta ${values.precio} euros`);
  const results = $derived({ etiqueta });
</script>

<InteractiveLabLayout hint="Combina producto y precio — la etiqueta de checkout es tu template literal.">
  {#snippet preview()}
    <div class="flex flex-col items-center gap-8 py-4 lg:flex-row lg:justify-center">
      <div class="w-full max-w-xs space-y-4 rounded-xl border border-outline-variant/40 bg-surface-container-low p-5">
        <p class="text-xs font-bold uppercase text-primary">Editor SKU</p>
        <label class="block space-y-1">
          <span class="text-sm text-on-surface-variant">Producto</span>
          <input
            type="text"
            bind:value={values.producto}
            class="w-full rounded-lg border border-outline-variant px-3 py-2 capitalize"
          />
        </label>
        <label class="block space-y-1">
          <span class="text-sm text-on-surface-variant">Precio (€)</span>
          <input
            type="range"
            min="1"
            max="200"
            step="0.01"
            bind:value={values.precio}
            class="w-full accent-tertiary"
          />
          <span class="font-mono text-xl font-bold text-tertiary"><LiveValue value={values.precio} /> €</span>
        </label>
      </div>

      <div class="lab-card-lift relative rotate-[-3deg] rounded-xl border-2 border-tertiary bg-tertiary-container/30 px-8 py-6 shadow-lg">
        <span class="absolute -right-2 -top-2 rounded-full bg-tertiary px-2 py-0.5 text-[10px] font-bold text-on-tertiary">
          CHECKOUT
        </span>
        <p class="font-mono text-lg font-bold leading-snug text-on-surface">{etiqueta}</p>
      </div>
    </div>
  {/snippet}

  {#snippet spec()}
    <LiveSpecPanel
      bind:values
      {results}
      limits={{ precio: { min: 1, max: 200 } }}
      lines={[
        { kind: 'comment', text: '// Spec: const + template en etiqueta' },
        { kind: 'let', key: 'producto' },
        { kind: 'let', key: 'precio' },
        { kind: 'derived', name: 'etiqueta', expr: 'template producto + precio', resultKey: 'etiqueta' }
      ]}
    />
  {/snippet}
</InteractiveLabLayout>
