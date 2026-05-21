<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';
  import LiveValue from '../LiveValue.svelte';

  let values = $state({
    precioUnitario: 10,
    cantidad: 2,
    envio: 5,
    unidadesEnAlmacen: 10,
    tamanoPack: 3
  });

  const subtotal = $derived(values.precioUnitario * values.cantidad);
  const totalCarrito = $derived(subtotal + values.envio);
  const sobrantePack = $derived(values.unidadesEnAlmacen % values.tamanoPack);

  const results = $derived({
    subtotal,
    totalCarrito,
    sobrantePack
  });
</script>

<InteractiveLabLayout>
  {#snippet preview()}
    <div class="grid gap-6 lg:grid-cols-2">
      <div
        class="space-y-5 rounded-xl border border-outline-variant/40 bg-surface-container-low p-5 transition-shadow duration-300 hover:shadow-md"
      >
        <p class="text-xs font-bold tracking-wider text-primary uppercase">UI · Carrito</p>

        <label class="block space-y-2">
          <span class="text-sm text-on-surface-variant">Precio unitario (€)</span>
          <input
            type="range"
            min="1"
            max="50"
            bind:value={values.precioUnitario}
            class="w-full accent-primary transition-opacity"
          />
          <span class="font-mono text-2xl font-bold text-on-surface">
            <LiveValue value={values.precioUnitario} /> €
          </span>
        </label>

        <label class="block space-y-2">
          <span class="text-sm text-on-surface-variant">Cantidad</span>
          <input
            type="range"
            min="1"
            max="10"
            bind:value={values.cantidad}
            class="w-full accent-primary"
          />
          <span class="font-mono text-lg text-on-surface">× <LiveValue value={values.cantidad} /></span>
        </label>

        <label class="block space-y-2">
          <span class="text-sm text-on-surface-variant">Envío fijo (€)</span>
          <input type="range" min="0" max="20" bind:value={values.envio} class="w-full accent-primary" />
        </label>

        <div
          class="rounded-lg border-2 border-primary/30 bg-primary/5 p-4 transition-all duration-500"
        >
          <p class="text-sm text-on-surface-variant">Subtotal</p>
          <p class="font-mono text-3xl font-bold text-primary"><LiveValue value={subtotal} /> €</p>
          <p class="mt-2 text-sm text-on-surface-variant">+ envío → Total</p>
          <p class="font-mono text-4xl font-black tracking-tight text-on-surface">
            <LiveValue value={totalCarrito} /> €
          </p>
        </div>
      </div>

      <div
        class="space-y-5 rounded-xl border border-outline-variant/40 bg-surface-container-low p-5 transition-shadow duration-300 hover:shadow-md"
      >
        <p class="text-xs font-bold tracking-wider text-tertiary uppercase">UI · Filas de tabla</p>
        <p class="text-sm text-on-surface-variant">
          El patrón de color depende del resto (<code class="text-tertiary">%</code>).
        </p>

        <label class="block space-y-2">
          <span class="text-sm text-on-surface-variant">Unidades en almacén</span>
          <input
            type="range"
            min="1"
            max="20"
            bind:value={values.unidadesEnAlmacen}
            class="w-full accent-tertiary"
          />
        </label>
        <label class="block space-y-2">
          <span class="text-sm text-on-surface-variant">Tamaño del pack</span>
          <input
            type="range"
            min="2"
            max="6"
            bind:value={values.tamanoPack}
            class="w-full accent-tertiary"
          />
        </label>

        <div class="space-y-1">
          {#each Array.from({ length: 5 }, (_, i) => i) as fila (fila)}
            <div
              class="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-all duration-500
                {(fila + sobrantePack) % 2 === 0
                ? 'bg-primary/15 text-on-surface scale-[1.01]'
                : 'bg-surface-container-high text-on-surface-variant'}"
            >
              <span>Fila SKU-{fila + 1}</span>
              <span class="font-mono text-xs opacity-70">resto <LiveValue value={sobrantePack} /></span>
            </div>
          {/each}
        </div>
        <p class="rounded-md bg-tertiary/10 px-3 py-2 text-sm">
          <span class="font-semibold text-tertiary">Sobrante:</span>
          <span class="font-mono">
            <LiveValue value={values.unidadesEnAlmacen} /> % <LiveValue value={values.tamanoPack} /> =
            <LiveValue value={sobrantePack} />
          </span>
        </p>
      </div>
    </div>
  {/snippet}

  {#snippet spec()}
    <LiveSpecPanel
      bind:values
      {results}
      limits={{
        precioUnitario: { min: 1, max: 50 },
        cantidad: { min: 1, max: 10 },
        envio: { min: 0, max: 20 },
        unidadesEnAlmacen: { min: 1, max: 20 },
        tamanoPack: { min: 2, max: 6 }
      }}
      lines={[
        { kind: 'comment', text: '// Spec: carrito y filas de inventario' },
        { kind: 'let', key: 'precioUnitario' },
        { kind: 'let', key: 'cantidad' },
        { kind: 'let', key: 'envio' },
        {
          kind: 'derived',
          name: 'subtotal',
          expr: 'precioUnitario * cantidad',
          resultKey: 'subtotal'
        },
        { kind: 'derived', name: 'total', expr: 'subtotal + envio', resultKey: 'totalCarrito' },
        { kind: 'comment', text: '// Filas zebra según resto del pack' },
        { kind: 'let', key: 'unidadesEnAlmacen' },
        { kind: 'let', key: 'tamanoPack' },
        {
          kind: 'derived',
          name: 'sobrante',
          expr: 'unidadesEnAlmacen % tamanoPack',
          resultKey: 'sobrantePack'
        }
      ]}
    />
  {/snippet}
</InteractiveLabLayout>
