<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';

  const productos = [
    { slug: 'zapatillas', nombre: 'Zapatillas' },
    { slug: 'mochila', nombre: 'Mochila' },
    { slug: 'auriculares', nombre: 'Auriculares' }
  ];
  let values = $state({ slug: 'zapatillas' });
  const url = $derived(`/producto/${values.slug}`);
  const nombre = $derived(productos.find((p) => p.slug === values.slug)?.nombre ?? '—');
  const results = $derived({ url });
</script>

<InteractiveLabLayout hint="Lista con enlaces → /producto/[slug] monta +page.svelte dinámico.">
  {#snippet preview()}
    <div class="grid gap-6 lg:grid-cols-2">
      <ul class="space-y-2">
        {#each productos as p (p.slug)}
          <li>
            <button
              type="button"
              class="w-full rounded-lg border px-4 py-3 text-left transition-colors
                {values.slug === p.slug ? 'border-primary bg-primary/10 font-bold' : 'hover:bg-surface-container-low'}"
              onclick={() => (values.slug = p.slug)}
            >
              {p.nombre}
            </button>
          </li>
        {/each}
      </ul>
      <div class="rounded-xl border-2 border-dashed border-primary/40 p-6">
        <p class="text-xs uppercase text-on-surface-variant">Detalle</p>
        <p class="mt-2 font-mono text-primary">{url}</p>
        <h3 class="mt-4 text-2xl font-bold">{nombre}</h3>
      </div>
    </div>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} lines={[
      { kind: 'comment', text: '// list → detail' },
      { kind: 'let', key: 'slug' },
      { kind: 'derived', name: 'url', expr: '/producto/[slug]', resultKey: 'url' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
