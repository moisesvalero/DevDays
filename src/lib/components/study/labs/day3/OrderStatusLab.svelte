<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';
  import LiveValue from '../LiveValue.svelte';

  let values = $state({ stock: 3 });
  const estado = $derived((values.stock < 5 ? 'reponer' : 'ok') as string);
  const results = $derived({ estado });
</script>

<InteractiveLabLayout hint="Baja el stock por debajo de 5 — el badge pasa a «reponer» como en tu if/else.">
  {#snippet preview()}
    <div class="mx-auto max-w-md space-y-6">
      <div class="rounded-xl border border-outline-variant/40 bg-surface-container-low p-6">
        <p class="text-xs font-bold uppercase text-primary">Panel logística</p>
        <label class="mt-4 block space-y-2">
          <span class="text-sm text-on-surface-variant">Unidades en stock: <LiveValue value={values.stock} /></span>
          <input type="range" min="0" max="20" bind:value={values.stock} class="w-full accent-primary" />
        </label>
      </div>
      <div
        class="flex items-center justify-center gap-3 rounded-2xl border-2 p-6 transition-all duration-500
          {estado === 'reponer'
          ? 'border-destructive/50 bg-destructive/10'
          : 'border-primary/40 bg-primary/10'}"
      >
        <span class="material-symbols-outlined text-4xl {estado === 'reponer' ? 'text-destructive' : 'text-primary'}">
          {estado === 'reponer' ? 'inventory_2' : 'check_circle'}
        </span>
        <div>
          <p class="text-xs uppercase text-on-surface-variant">Estado del pedido</p>
          <p class="text-3xl font-black uppercase tracking-wide {estado === 'reponer' ? 'text-destructive' : 'text-primary'}">
            {estado}
          </p>
        </div>
      </div>
    </div>
  {/snippet}

  {#snippet spec()}
    <LiveSpecPanel
      bind:values
      {results}
      limits={{ stock: { min: 0, max: 20 } }}
      lines={[
        { kind: 'comment', text: '// Spec: if stock < 5' },
        { kind: 'let', key: 'stock' },
        { kind: 'derived', name: 'estado', expr: 'stock < 5 ? reponer : ok', resultKey: 'estado' }
      ]}
    />
  {/snippet}
</InteractiveLabLayout>
