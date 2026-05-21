<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';

  let values = $state({ sidebar: true });
  const grid = $derived(values.sidebar ? 'sidebar | content' : 'content full');
  const results = $derived({ grid });
</script>

<InteractiveLabLayout hint="Layouts anidados: routes/estudio/+layout.svelte dentro del layout raíz.">
  {#snippet preview()}
    <div
      class="grid min-h-[140px] gap-2 rounded-xl border border-outline-variant/40 p-2 transition-all
        {values.sidebar ? 'grid-cols-[120px_1fr]' : 'grid-cols-1'}"
    >
      {#if values.sidebar}
        <aside class="rounded-lg bg-tertiary/15 p-3 text-xs font-bold text-tertiary">Sidebar</aside>
      {/if}
      <section class="rounded-lg bg-primary/10 p-4 text-sm">Contenido anidado</section>
    </div>
    <label class="mt-4 flex items-center gap-2 text-sm">
      <input type="checkbox" bind:checked={values.sidebar} class="accent-primary" />
      Layout con sidebar
    </label>
    <p class="mt-2 font-mono text-xs text-on-surface-variant">grid: {grid}</p>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} lines={[
      { kind: 'comment', text: '// nested layouts' },
      { kind: 'let', key: 'sidebar' },
      { kind: 'derived', name: 'grid', expr: 'cols', resultKey: 'grid' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
