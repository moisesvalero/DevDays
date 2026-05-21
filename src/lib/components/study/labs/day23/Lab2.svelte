<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';

  let values = $state({ titulo: 'Dashboard' });
  const main = $derived(`Main: ${values.titulo}`);
  const results = $derived({ main });
</script>

<InteractiveLabLayout hint="El layout pasa contexto; la página hija solo rellena el slot principal.">
  {#snippet preview()}
    <div class="rounded-xl border-2 border-primary/30 p-1">
      <div class="rounded-t-lg bg-primary/10 px-4 py-2 text-xs font-bold text-primary">+layout.svelte</div>
      <div class="border-t border-dashed border-outline-variant/50 p-6">
        <input
          class="w-full rounded-lg border bg-card px-3 py-2 text-lg font-bold"
          bind:value={values.titulo}
          placeholder="Título de página"
        />
        <p class="mt-4 text-center text-sm text-on-surface-variant">{main}</p>
      </div>
    </div>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} lines={[
      { kind: 'comment', text: '// default slot' },
      { kind: 'let', key: 'titulo' },
      { kind: 'derived', name: 'main', expr: 'slot', resultKey: 'main' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
