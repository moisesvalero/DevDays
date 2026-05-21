<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';
  import LiveValue from '../LiveValue.svelte';

  let values = $state({ total: 120, iva: 21 });
  const base = $derived(Math.round(values.total / (1 + values.iva / 100)));
  const results = $derived({ base });
</script>

<InteractiveLabLayout hint="Destructuring de factura: total e iva → base imponible.">
  {#snippet preview()}
    <div class="grid gap-4 sm:grid-cols-2">
      <div class="rounded-xl border border-outline-variant/40 p-5">
        <p class="text-xs uppercase text-on-surface-variant">factura (objeto)</p>
        <label class="mt-3 block">total <input type="number" bind:value={values.total} class="ml-2 w-20 rounded border px-2 font-mono" /></label>
        <label class="mt-2 block">iva % <input type="number" bind:value={values.iva} class="ml-2 w-16 rounded border px-2 font-mono" /></label>
      </div>
      <div class="rounded-xl border-2 border-tertiary/40 bg-tertiary/5 p-5 text-center">
        <p class="text-xs text-on-surface-variant">Base (destructuring)</p>
        <p class="mt-2 font-mono text-4xl font-black text-tertiary"><LiveValue value={base} /> €</p>
      </div>
    </div>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} lines={[
      { kind: 'comment', text: '// const { total, iva } = factura' },
      { kind: 'let', key: 'total' }, { kind: 'let', key: 'iva' },
      { kind: 'derived', name: 'base', expr: 'total/(1+iva/100)', resultKey: 'base' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
