<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';

  const rutas = [
    { path: '/', label: 'Inicio' },
    { path: '/estudio', label: 'Estudio' },
    { path: '/productos', label: 'Catálogo' }
  ];
  let values = $state({ ruta: '/estudio' });
  const pagina = $derived(`+page.svelte → ${values.ruta}`);
  const results = $derived({ pagina });
</script>

<InteractiveLabLayout hint="Cada pathname monta un archivo +page.svelte distinto.">
  {#snippet preview()}
    <div class="flex flex-col gap-4 sm:flex-row">
      <nav class="flex flex-col gap-1 rounded-xl bg-surface-container-low p-3 min-w-[140px]">
        {#each rutas as r (r.path)}
          <button
            type="button"
            class="rounded-lg px-3 py-2 text-left font-mono text-sm transition-colors
              {values.ruta === r.path ? 'bg-primary font-bold text-on-primary' : 'hover:bg-card'}"
            onclick={() => (values.ruta = r.path)}
          >
            {r.label}
          </button>
        {/each}
      </nav>
      <div class="flex flex-1 flex-col justify-center rounded-xl border-2 border-dashed border-primary/40 p-8">
        <p class="text-xs uppercase text-on-surface-variant">Vista activa</p>
        <p class="mt-2 font-mono text-xl font-semibold">{pagina}</p>
      </div>
    </div>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} lines={[
      { kind: 'comment', text: '// file-based routing' },
      { kind: 'let', key: 'ruta' },
      { kind: 'derived', name: 'pagina', expr: 'pathname', resultKey: 'pagina' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
