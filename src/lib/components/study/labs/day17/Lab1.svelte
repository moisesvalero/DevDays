<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';
  import LiveValue from '../LiveValue.svelte';

  let values = $state({ qty: 1, precio: 25 });
  const linea = $derived(values.qty * values.precio);
  const results = $derived({ linea });

  function menos() {
    if (values.qty > 0) values.qty -= 1;
  }
  function mas() {
    if (values.qty < 10) values.qty += 1;
  }
</script>

<InteractiveLabLayout hint="$state guarda cantidad y precio; la UI reacciona al instante.">
  {#snippet preview()}
    <div class="grid gap-6 lg:grid-cols-2">
      <div class="rounded-xl border border-outline-variant/40 bg-surface-container-low p-6">
        <p class="text-xs font-bold uppercase tracking-wider text-primary">Carrito · $state</p>
        <div class="mt-6 flex items-center justify-center gap-4">
          <button type="button" class="size-10 rounded-full bg-card text-xl font-bold shadow" onclick={menos}>−</button>
          <span class="font-mono text-5xl font-black"><LiveValue value={values.qty} /></span>
          <button type="button" class="size-10 rounded-full bg-primary text-xl font-bold text-on-primary" onclick={mas}>+</button>
        </div>
        <label class="mt-6 block space-y-2">
          <span class="text-sm text-on-surface-variant">Precio unitario (€)</span>
          <input type="range" min="5" max="80" bind:value={values.precio} class="w-full accent-primary" />
          <span class="font-mono text-lg"><LiveValue value={values.precio} /> €/ud</span>
        </label>
      </div>
      <div class="flex flex-col justify-center rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 p-8 text-center">
        <p class="text-sm text-on-surface-variant">Subtotal reactivo</p>
        <p class="mt-2 font-mono text-5xl font-black text-primary"><LiveValue value={linea} /> €</p>
      </div>
    </div>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} limits={{ qty: { min: 0, max: 10 }, precio: { min: 5, max: 80 } }} lines={[
      { kind: 'comment', text: '// $state — contador' },
      { kind: 'let', key: 'qty' },
      { kind: 'let', key: 'precio' },
      { kind: 'derived', name: 'linea', expr: 'qty * precio', resultKey: 'linea' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
