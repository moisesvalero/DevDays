<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';
  import LiveValue from '../LiveValue.svelte';

  let values = $state({ stock: 3 });
  const estado = $derived((values.stock < 5 ? 'reponer' : 'ok') as string);
  const results = $derived({ tag: estado });
</script>

<InteractiveLabLayout hint="Repaso semana 1 · Reto 2: if (stock < 5) → reponer, si no → ok.">
  {#snippet preview()}
    <div class="grid gap-6 lg:grid-cols-2">
      <div class="rounded-xl border border-outline-variant/40 bg-surface-container-low p-6">
        <p class="text-xs font-bold uppercase tracking-wider text-primary">Almacén</p>
        <label class="mt-4 block space-y-2">
          <span class="text-sm text-on-surface-variant">Unidades en stock</span>
          <input type="range" min="0" max="20" bind:value={values.stock} class="w-full accent-primary" />
          <span class="font-mono text-4xl font-black text-on-surface"><LiveValue value={values.stock} /></span>
        </label>
      </div>
      <div class="flex flex-col items-center justify-center rounded-xl p-8">
        <span
          class="rounded-full px-6 py-3 text-sm font-bold uppercase tracking-widest
            {estado === 'reponer'
            ? 'bg-destructive/15 text-destructive ring-2 ring-destructive/40'
            : 'bg-primary/15 text-primary ring-2 ring-primary/40'}"
        >
          <LiveValue value={estado} />
        </span>
        <p class="mt-4 text-center text-sm text-on-surface-variant">
          {estado === 'reponer' ? 'Stock &lt; 5 → pedir reposición' : 'Stock suficiente'}
        </p>
      </div>
    </div>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel
      bind:values
      {results}
      limits={{ stock: { min: 0, max: 20 } }}
      lines={[
        { kind: 'comment', text: '// Repaso: condicional' },
        { kind: 'let', key: 'stock' },
        { kind: 'derived', name: 'estado', expr: 'stock < 5 ? reponer : ok', resultKey: 'tag' }
      ]}
    />
  {/snippet}
</InteractiveLabLayout>
