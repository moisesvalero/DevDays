<script lang="ts">
  import LogicReveal from '../LogicReveal.svelte';

  // Spec: botón de compra y banner según reglas de negocio
  let pagado = $state(true);
  let stock = $state(3);
  let esVip = $state(false);
  let tieneCupon = $state(false);

  const puedeEnviar = $derived(pagado && stock > 0);
  const muestraBannerPromo = $derived(esVip || tieneCupon);
  const bannerUrgente = $derived(stock === 0);
</script>

<div class="grid gap-6 lg:grid-cols-2">
  <div class="rounded-xl border border-outline-variant/40 bg-surface-container-low p-5">
    <p class="text-xs font-bold tracking-wider text-primary uppercase">Checkout</p>

    <label class="mt-4 flex cursor-pointer items-center gap-3">
      <input type="checkbox" bind:checked={pagado} class="size-5 accent-primary" />
      <span class="text-sm text-on-surface">Pago confirmado</span>
    </label>

    <label class="mt-4 block space-y-2">
      <span class="text-sm text-on-surface-variant">Stock disponible: {stock}</span>
      <input type="range" min="0" max="10" bind:value={stock} class="w-full accent-primary" />
    </label>

    <button
      type="button"
      disabled={!puedeEnviar}
      class="mt-6 w-full rounded-xl py-3 text-sm font-bold transition-all
        {puedeEnviar
        ? 'bg-primary text-on-primary shadow-md hover:opacity-90'
        : 'cursor-not-allowed bg-outline-variant/40 text-on-surface-variant'}"
    >
      {puedeEnviar ? 'Completar compra' : 'Sin stock o pago pendiente'}
    </button>
    <p class="mt-2 text-center text-xs text-on-surface-variant">
      Activo si: <span class="font-mono text-primary">pagado && stock &gt; 0</span> →
      <strong>{puedeEnviar}</strong>
    </p>
  </div>

  <div class="space-y-4">
    <p class="text-xs font-bold tracking-wider text-tertiary uppercase">Banner & promos</p>

    <label class="flex cursor-pointer items-center gap-3">
      <input type="checkbox" bind:checked={esVip} class="size-5 accent-tertiary" />
      <span class="text-sm">Usuario VIP</span>
    </label>
    <label class="flex cursor-pointer items-center gap-3">
      <input type="checkbox" bind:checked={tieneCupon} class="size-5 accent-tertiary" />
      <span class="text-sm">Tiene cupón</span>
    </label>

    <div
      class="rounded-xl border-2 px-4 py-6 text-center transition-all duration-300
        {bannerUrgente
        ? 'border-destructive bg-destructive/15 text-destructive'
        : muestraBannerPromo
          ? 'border-success bg-success/15 text-success'
          : 'border-outline-variant bg-surface-container text-on-surface-variant'}"
    >
      {#if bannerUrgente}
        <span class="material-symbols-outlined text-3xl">error</span>
        <p class="mt-2 font-bold">Agotado — stock === 0</p>
      {:else if muestraBannerPromo}
        <span class="material-symbols-outlined text-3xl">local_offer</span>
        <p class="mt-2 font-bold">Promo activa (VIP o cupón)</p>
      {:else}
        <span class="material-symbols-outlined text-3xl">inventory_2</span>
        <p class="mt-2 font-medium">Precio estándar</p>
      {/if}
    </div>
    <p class="text-xs text-on-surface-variant">
      Color promo: <span class="font-mono">esVip || tieneCupon</span> · Urgente si stock es 0
    </p>
  </div>
</div>

<LogicReveal
  label="Ver Spec · && y ||"
  language="svelte"
  lines={[
    '// Botón compra: desactivado si no hay stock o no hay pago',
    'const puedeEnviar = pagado && stock > 0;',
    '',
    '<button disabled={!puedeEnviar}>Completar compra</button>',
    '',
    '// Banner promo: basta una condición',
    'const muestraPromo = esVip || tieneCupon;'
  ]}
/>
