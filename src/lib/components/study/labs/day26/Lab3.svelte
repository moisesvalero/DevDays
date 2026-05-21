<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';

  let values = $state({ enhance: true, pending: false });
  const mode = $derived(values.enhance ? 'use:enhance ON' : 'POST clásico (recarga)');
  const results = $derived({ mode });

  function simularSubmit() {
    if (!values.enhance) return;
    values.pending = true;
    setTimeout(() => {
      values.pending = false;
    }, 600);
  }
</script>

<InteractiveLabLayout hint="use:enhance evita recarga completa; actualiza solo lo necesario.">
  {#snippet preview()}
    <div class="space-y-4 rounded-xl border p-6">
      <label class="flex items-center gap-2 text-sm">
        <input type="checkbox" bind:checked={values.enhance} class="accent-primary" />
        Progressive enhancement
      </label>
      <button
        type="button"
        class="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-on-primary"
        onclick={simularSubmit}
        disabled={values.pending}
      >
        {values.pending ? 'Enviando…' : 'Enviar formulario'}
      </button>
      <p class="font-mono text-sm text-primary">{mode}</p>
      {#if values.pending}
        <p class="text-xs text-on-surface-variant">SPA-like: sin full page reload</p>
      {/if}
    </div>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} lines={[
      { kind: 'comment', text: '// use:enhance' },
      { kind: 'let', key: 'enhance' },
      { kind: 'derived', name: 'mode', expr: 'progressive', resultKey: 'mode' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
