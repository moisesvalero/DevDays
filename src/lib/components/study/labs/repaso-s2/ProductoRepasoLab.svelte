<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';
  import LiveValue from '../LiveValue.svelte';

  let values = $state({ nombre: 'Pack Pro', precio: 29 });
  const linea = $derived(`${values.nombre} · ${values.precio}€`);
  const results = $derived({ line: linea });
</script>

<InteractiveLabLayout hint="Objeto producto: propiedades nombre y precio en una card.">
  {#snippet preview()}
    <div class="max-w-sm rounded-2xl border border-outline-variant/50 bg-card p-6 shadow-sm">
      <p class="text-[10px] font-bold uppercase text-primary">ProductCard</p>
      <input class="mt-3 w-full rounded-lg border px-3 py-2 font-bold" bind:value={values.nombre} />
      <label class="mt-4 block">
        <span class="text-sm text-on-surface-variant">Precio (€)</span>
        <input type="range" min="1" max="200" bind:value={values.precio} class="mt-1 w-full accent-primary" />
        <span class="font-mono text-3xl font-black text-primary"><LiveValue value={values.precio} />€</span>
      </label>
      <p class="mt-4 rounded-lg bg-surface-container-high px-3 py-2 font-mono text-sm"><LiveValue value={linea} /></p>
    </div>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} limits={{ precio: { min: 1, max: 200 } }} lines={[
      { kind: 'comment', text: '// { nombre, precio }' },
      { kind: 'let', key: 'nombre' },
      { kind: 'let', key: 'precio' },
      { kind: 'derived', name: 'card', expr: 'template', resultKey: 'line' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
