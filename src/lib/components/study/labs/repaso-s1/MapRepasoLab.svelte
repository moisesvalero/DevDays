<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';
  import LiveValue from '../LiveValue.svelte';

  const base = [1, 2, 3];
  let values = $state({ mult: 2 });
  const doblado = $derived(base.map((n) => n * values.mult));
  const linea = $derived(doblado.join(', '));
  const results = $derived({ arr: linea });
</script>

<InteractiveLabLayout hint="Repaso semana 1 · Reto 3: map sobre [1,2,3] y console.log del resultado.">
  {#snippet preview()}
    <div class="space-y-6">
      <div class="flex flex-wrap items-center gap-3">
        <span class="text-xs font-bold uppercase text-primary">Entrada</span>
        {#each base as n (n)}
          <span class="rounded-lg bg-surface-container-high px-3 py-2 font-mono font-bold">{n}</span>
        {/each}
        <span class="text-2xl text-on-surface-variant">×</span>
        <input type="range" min="1" max="5" bind:value={values.mult} class="w-32 accent-primary" />
        <span class="font-mono text-xl font-bold text-primary"><LiveValue value={values.mult} /></span>
      </div>
      <div class="rounded-xl border border-primary/30 bg-primary/5 p-6">
        <p class="text-xs uppercase text-on-surface-variant">Tras .map(n => n * mult)</p>
        <div class="mt-3 flex flex-wrap gap-2">
          {#each doblado as n (n)}
            <span class="rounded-lg bg-primary/20 px-4 py-2 font-mono text-lg font-bold text-primary">{n}</span>
          {/each}
        </div>
        <p class="mt-4 font-mono text-sm text-on-surface-variant">console → [{linea}]</p>
      </div>
    </div>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel
      bind:values
      {results}
      limits={{ mult: { min: 1, max: 5 } }}
      lines={[
        { kind: 'comment', text: '// Repaso: map' },
        { kind: 'let', key: 'mult' },
        { kind: 'derived', name: 'doblado', expr: '[1,2,3].map(n => n * mult)', resultKey: 'arr' }
      ]}
    />
  {/snippet}
</InteractiveLabLayout>
