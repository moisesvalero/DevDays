<script lang="ts">
  import LogicReveal from '../LogicReveal.svelte';

  // Spec: precio unitario × cantidad + envío; sobrante con módulo
  let precioUnitario = $state(10);
  let cantidad = $state(2);
  let envio = $state(5);
  let unidadesEnAlmacen = $state(10);
  let tamanoPack = $state(3);

  const subtotal = $derived(precioUnitario * cantidad);
  const totalCarrito = $derived(subtotal + envio);
  const sobrantePack = $derived(unidadesEnAlmacen % tamanoPack);
</script>

<div class="grid gap-6 lg:grid-cols-2">
  <div class="space-y-5 rounded-xl border border-outline-variant/40 bg-surface-container-low p-5">
    <p class="text-xs font-bold tracking-wider text-primary uppercase">UI · Carrito</p>

    <label class="block space-y-2">
      <span class="text-sm text-on-surface-variant">Precio unitario (€)</span>
      <input
        type="range"
        min="1"
        max="50"
        bind:value={precioUnitario}
        class="w-full accent-primary"
      />
      <span class="font-mono text-2xl font-bold text-on-surface">{precioUnitario} €</span>
    </label>

    <label class="block space-y-2">
      <span class="text-sm text-on-surface-variant">Cantidad</span>
      <input type="range" min="1" max="10" bind:value={cantidad} class="w-full accent-primary" />
      <span class="font-mono text-lg text-on-surface">× {cantidad}</span>
    </label>

    <label class="block space-y-2">
      <span class="text-sm text-on-surface-variant">Envío fijo (€)</span>
      <input type="range" min="0" max="20" bind:value={envio} class="w-full accent-primary" />
    </label>

    <div class="rounded-lg border-2 border-primary/30 bg-primary/5 p-4">
      <p class="text-sm text-on-surface-variant">Subtotal</p>
      <p class="font-mono text-3xl font-bold text-primary">{subtotal} €</p>
      <p class="mt-2 text-sm text-on-surface-variant">+ envío → Total</p>
      <p class="font-mono text-4xl font-black tracking-tight text-on-surface">{totalCarrito} €</p>
    </div>
  </div>

  <div class="space-y-5 rounded-xl border border-outline-variant/40 bg-surface-container-low p-5">
    <p class="text-xs font-bold tracking-wider text-tertiary uppercase">UI · Filas de tabla</p>
    <p class="text-sm text-on-surface-variant">
      Alternar color de filas según el resto de dividir unidades entre tamaño de pack.
    </p>

    <label class="block space-y-2">
      <span class="text-sm text-on-surface-variant">Unidades en almacén</span>
      <input
        type="range"
        min="1"
        max="20"
        bind:value={unidadesEnAlmacen}
        class="w-full accent-tertiary"
      />
    </label>
    <label class="block space-y-2">
      <span class="text-sm text-on-surface-variant">Tamaño del pack</span>
      <input type="range" min="2" max="6" bind:value={tamanoPack} class="w-full accent-tertiary" />
    </label>

    <div class="space-y-1">
      {#each Array.from({ length: 5 }, (_, i) => i) as fila (fila)}
        <div
          class="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors
            {(fila + sobrantePack) % 2 === 0
            ? 'bg-primary/15 text-on-surface'
            : 'bg-surface-container-high text-on-surface-variant'}"
        >
          <span>Fila SKU-{fila + 1}</span>
          <span class="font-mono text-xs opacity-70">patrón según {sobrantePack}</span>
        </div>
      {/each}
    </div>
    <p class="rounded-md bg-tertiary/10 px-3 py-2 text-sm">
      <span class="font-semibold text-tertiary">Sobrante:</span>
      <span class="font-mono">{unidadesEnAlmacen} % {tamanoPack} = {sobrantePack}</span>
      unidades sueltas
    </p>
  </div>
</div>

<LogicReveal
  label="Ver Spec · Aritmética"
  lines={[
    '// Subtotal del carrito: precio × cantidad',
    'const subtotal = precioUnitario * cantidad;',
    '// Total con envío',
    'const total = subtotal + envio;',
    '// Filas alternas: resto de la división',
    'const sobrante = unidadesEnAlmacen % tamanoPack;'
  ]}
/>
