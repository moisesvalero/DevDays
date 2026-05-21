<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';

  let values = $state({ ok: true });
  const estado = $derived(values.ok ? 'resolved: Pagado' : 'rejected: Error tarjeta');
  const results = $derived({ estado });
</script>

<InteractiveLabLayout hint="Promise resolve/reject — estado del pago en checkout.">
  {#snippet preview()}
    <label class="flex items-center gap-3 mb-6">
      <input type="checkbox" bind:checked={values.ok} class="accent-primary size-5" />
      <span>Pago exitoso</span>
    </label>
    <div class="flex gap-3 justify-center">
      {#each ['pending', 'resolved', 'rejected'] as step (step)}
        <div
          class="rounded-xl border-2 px-4 py-3 text-center text-xs font-bold uppercase transition-all
            {(step === 'resolved' && values.ok) || (step === 'rejected' && !values.ok)
            ? 'border-primary bg-primary/10 scale-105'
            : step === 'pending' && !values.ok && values.ok === false
              ? ''
              : step === 'pending'
                ? 'opacity-40'
                : 'opacity-30'}"
        >
          {step}
        </div>
      {/each}
    </div>
    <p class="mt-6 text-center font-mono font-bold text-primary">{estado}</p>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} lines={[
      { kind: 'let', key: 'ok' },
      { kind: 'derived', name: 'estadoPago', expr: 'resolve/reject', resultKey: 'estado' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
