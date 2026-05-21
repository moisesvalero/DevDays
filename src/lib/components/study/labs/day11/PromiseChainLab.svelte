<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';
  import LiveValue from '../LiveValue.svelte';

  let values = $state({ stock: 1 });
  const paso = $derived(values.stock > 0 ? 'Confirmado' : 'Cancelado');
  const results = $derived({ paso });
</script>

<InteractiveLabLayout hint="then encadenado — validar stock luego confirmar pedido.">
  {#snippet preview()}
    <div class="flex items-center justify-center gap-4">
      <div class="rounded-lg border px-4 py-3 text-sm {values.stock > 0 ? 'border-primary bg-primary/10' : 'opacity-50'}">
        1. Validar stock (<LiveValue value={values.stock} />)
      </div>
      <span>→</span>
      <div class="rounded-lg border px-4 py-3 font-bold {paso === 'Confirmado' ? 'border-primary text-primary' : 'text-destructive'}">
        2. {paso}
      </div>
    </div>
    <input type="range" min="0" max="10" bind:value={values.stock} class="mt-6 w-full max-w-xs accent-primary" />
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} limits={{ stock: { min: 0, max: 10 } }} lines={[
      { kind: 'let', key: 'stock' },
      { kind: 'derived', name: 'paso2', expr: 'then confirmar', resultKey: 'paso' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
