<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';

  let values = $state({ metric: '-40% tiempo de carga' });
  const r = $derived(values.metric);
  const results = $derived({ r });
</script>

<InteractiveLabLayout hint="R: métrica o resultado medible, no vaguedades.">
  {#snippet preview()}
    <div class="rounded-xl border-l-4 border-emerald-600 bg-emerald-500/10 p-6">
      <p class="text-xs font-bold uppercase text-emerald-700">Resultado</p>
      <input class="mt-2 w-full rounded-lg border bg-card px-3 py-2 text-lg font-bold" bind:value={values.metric} />
      <p class="mt-4 text-sm text-on-surface-variant">Cierra el relato con impacto cuantificable.</p>
    </div>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} lines={[
      { kind: 'comment', text: '// STAR - Result' },
      { kind: 'let', key: 'metric' },
      { kind: 'derived', name: 'r', expr: 'result', resultKey: 'r' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
