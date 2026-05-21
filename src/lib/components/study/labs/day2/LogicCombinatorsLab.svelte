<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';
  import LiveValue from '../LiveValue.svelte';

  let values = $state({
    pagado: true,
    stock: 3,
    esVip: false,
    tieneCupon: false
  });

  const puedeEnviar = $derived(values.pagado && values.stock > 0);
  const muestraBannerPromo = $derived(values.esVip || values.tieneCupon);
  const bannerUrgente = $derived(values.stock === 0);

  const results = $derived({
    puedeEnviar,
    muestraBannerPromo,
    bannerUrgente
  });
</script>

<InteractiveLabLayout hint="Cambia pagado, stock, esVip o tieneCupon en el panel — el botón y el banner reaccionan al momento.">
  {#snippet preview()}
    <div class="grid gap-6 lg:grid-cols-2">
      <div
        class="rounded-xl border border-outline-variant/40 bg-surface-container-low p-5 transition-shadow duration-300"
      >
        <p class="text-xs font-bold tracking-wider text-primary uppercase">Checkout</p>

        <label class="mt-4 flex cursor-pointer items-center gap-3">
          <input type="checkbox" bind:checked={values.pagado} class="size-5 accent-primary" />
          <span class="text-sm text-on-surface">Pago confirmado</span>
        </label>

        <label class="mt-4 block space-y-2">
          <span class="text-sm text-on-surface-variant">
            Stock: <LiveValue value={values.stock} />
          </span>
          <input type="range" min="0" max="10" bind:value={values.stock} class="w-full accent-primary" />
        </label>

        <button
          type="button"
          disabled={!puedeEnviar}
          class="mt-6 w-full rounded-xl py-3 text-sm font-bold transition-all duration-500
            {puedeEnviar
            ? 'bg-primary text-on-primary shadow-md hover:opacity-90 scale-100'
            : 'cursor-not-allowed scale-[0.98] bg-outline-variant/40 text-on-surface-variant'}"
        >
          {puedeEnviar ? 'Completar compra' : 'Sin stock o pago pendiente'}
        </button>
        <p class="mt-2 text-center text-xs text-on-surface-variant">
          <code class="text-primary">pagado && stock &gt; 0</code> →
          <strong class="font-mono"><LiveValue value={puedeEnviar} /></strong>
        </p>
      </div>

      <div class="space-y-4">
        <p class="text-xs font-bold tracking-wider text-tertiary uppercase">Banner & promos</p>

        <label class="flex cursor-pointer items-center gap-3">
          <input type="checkbox" bind:checked={values.esVip} class="size-5 accent-tertiary" />
          <span class="text-sm">Usuario VIP</span>
        </label>
        <label class="flex cursor-pointer items-center gap-3">
          <input type="checkbox" bind:checked={values.tieneCupon} class="size-5 accent-tertiary" />
          <span class="text-sm">Tiene cupón</span>
        </label>

        <div
          class="rounded-xl border-2 px-4 py-6 text-center transition-all duration-500
            {bannerUrgente
            ? 'border-destructive bg-destructive/15 text-destructive scale-[1.02]'
            : muestraBannerPromo
              ? 'border-success bg-success/15 text-success scale-[1.02]'
              : 'border-outline-variant bg-surface-container text-on-surface-variant'}"
        >
          {#if bannerUrgente}
            <span class="material-symbols-outlined text-3xl transition-transform duration-300"
              >error</span
            >
            <p class="mt-2 font-bold">Agotado — stock === 0</p>
          {:else if muestraBannerPromo}
            <span class="material-symbols-outlined text-3xl">local_offer</span>
            <p class="mt-2 font-bold">Promo (VIP || cupón)</p>
          {:else}
            <span class="material-symbols-outlined text-3xl">inventory_2</span>
            <p class="mt-2 font-medium">Precio estándar</p>
          {/if}
        </div>
      </div>
    </div>
  {/snippet}

  {#snippet spec()}
    <LiveSpecPanel
      bind:values
      {results}
      limits={{ stock: { min: 0, max: 10 } }}
      title="spec.svelte"
      lines={[
        { kind: 'comment', text: '// Spec: reglas de checkout' },
        { kind: 'let', key: 'pagado' },
        { kind: 'let', key: 'stock' },
        {
          kind: 'derived',
          name: 'puedeEnviar',
          expr: 'pagado && stock > 0',
          resultKey: 'puedeEnviar'
        },
        { kind: 'raw', text: '<button disabled={!puedeEnviar}>' },
        { kind: 'comment', text: '// Banner promo' },
        { kind: 'let', key: 'esVip' },
        { kind: 'let', key: 'tieneCupon' },
        {
          kind: 'derived',
          name: 'muestraPromo',
          expr: 'esVip || tieneCupon',
          resultKey: 'muestraBannerPromo'
        },
        {
          kind: 'derived',
          name: 'agotado',
          expr: 'stock === 0',
          resultKey: 'bannerUrgente'
        }
      ]}
    />
  {/snippet}
</InteractiveLabLayout>
