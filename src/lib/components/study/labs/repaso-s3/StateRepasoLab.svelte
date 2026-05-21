<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';
  import LiveValue from '../LiveValue.svelte';

  let values = $state({ qty: 2 });
  const subtotal = $derived(values.qty * 10);
  const results = $derived({ total: subtotal });

  function menos() {
    if (values.qty > 0) values.qty -= 1;
  }
  function mas() {
    if (values.qty < 10) values.qty += 1;
  }
</script>

<InteractiveLabLayout hint="$state: cantidad mutable en el carrito.">
  {#snippet preview()}
    <div class="flex items-center gap-6 rounded-xl border border-primary/20 bg-primary/5 p-8">
      <button type="button" class="size-12 rounded-full bg-card text-2xl font-bold shadow" onclick={menos}>−</button>
      <div class="text-center">
        <p class="text-xs uppercase text-on-surface-variant">$state qty</p>
        <p class="font-mono text-5xl font-black"><LiveValue value={values.qty} /></p>
        <p class="mt-2 text-sm">Subtotal <span class="font-bold text-primary">{subtotal}€</span></p>
      </div>
      <button type="button" class="size-12 rounded-full bg-primary text-2xl font-bold text-on-primary shadow" onclick={mas}>+</button>
    </div>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} limits={{ qty: { min: 0, max: 10 } }} lines={[
      { kind: 'comment', text: '// $state contador' },
      { kind: 'let', key: 'qty' },
      { kind: 'derived', name: 'subtotal', expr: 'qty * 10', resultKey: 'total' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
