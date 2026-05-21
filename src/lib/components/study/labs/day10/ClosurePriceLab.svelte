<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';
  import LiveValue from '../LiveValue.svelte';

  let values = $state({ precio: 80, dto: 15 });
  const final = $derived(Math.round(values.precio * (1 - values.dto / 100)));
  const results = $derived({ final });
</script>

<InteractiveLabLayout hint="Precio final con descuento del closure aplicado.">
  {#snippet preview()}
    <div class="grid gap-4 sm:grid-cols-2">
      <label class="rounded-xl border p-4 space-y-2">
        <span class="text-sm">Precio</span>
        <input type="range" min="10" max="200" bind:value={values.precio} class="w-full accent-primary" />
        <span class="font-mono text-xl"><LiveValue value={values.precio} />€</span>
      </label>
      <label class="rounded-xl border p-4 space-y-2">
        <span class="text-sm">Descuento %</span>
        <input type="range" min="0" max="50" bind:value={values.dto} class="w-full accent-tertiary" />
        <span class="font-mono text-xl text-tertiary"><LiveValue value={values.dto} />%</span>
      </label>
    </div>
    <p class="mt-6 text-center font-mono text-4xl font-black text-primary"><LiveValue value={final} /> €</p>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} limits={{ precio: { min: 10, max: 200 }, dto: { min: 0, max: 50 } }} lines={[
      { kind: 'let', key: 'precio' }, { kind: 'let', key: 'dto' },
      { kind: 'derived', name: 'precioFinal', expr: 'precio*(1-dto/100)', resultKey: 'final' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
