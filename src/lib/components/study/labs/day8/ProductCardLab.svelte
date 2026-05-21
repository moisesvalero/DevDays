<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';

  let values = $state({ nombre: 'Zapatillas', precio: 59 });
  const label = $derived(`${values.nombre} — ${values.precio}€`);
  const results = $derived({ label });
</script>

<InteractiveLabLayout hint="Objeto producto — propiedades nombre y precio alimentan la card.">
  {#snippet preview()}
    <article class="lab-card-lift mx-auto max-w-sm overflow-hidden rounded-2xl border border-outline-variant/50 bg-card shadow-lg">
      <div class="aspect-video bg-gradient-to-br from-primary/20 to-tertiary/10"></div>
      <div class="p-5 space-y-3">
        <input type="text" bind:value={values.nombre} class="w-full text-xl font-bold bg-transparent border-b border-outline-variant/50" />
        <div class="flex items-center justify-between">
          <input type="range" min="1" max="300" bind:value={values.precio} class="flex-1 accent-primary mr-3" />
          <span class="font-mono text-2xl font-black text-primary">{values.precio}€</span>
        </div>
        <p class="rounded-lg bg-surface-container-high px-3 py-2 text-sm font-medium">{label}</p>
      </div>
    </article>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} limits={{ precio: { min: 1, max: 300 } }} lines={[
      { kind: 'comment', text: '// const producto = { nombre, precio }' },
      { kind: 'let', key: 'nombre' }, { kind: 'let', key: 'precio' },
      { kind: 'derived', name: 'etiqueta', expr: 'nombre + precio', resultKey: 'label' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
