<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';

  let values = $state({ sent: false });
  const msg = $derived(values.sent ? 'Guardado ✓' : 'Editar y enviar');
  const results = $derived({ msg });
</script>

<InteractiveLabLayout hint="Form action: POST al servidor y actualiza UI.">
  {#snippet preview()}
    <form
      class="max-w-sm space-y-4 rounded-xl border p-6"
      onsubmit={(e) => {
        e.preventDefault();
        values.sent = true;
      }}
    >
      <input class="w-full rounded-lg border px-3 py-2" placeholder="Nombre producto" disabled={values.sent} />
      <button
        type="submit"
        class="w-full rounded-lg bg-primary py-2 font-bold text-on-primary disabled:opacity-50"
        disabled={values.sent}
      >
        {values.sent ? 'Enviado' : 'Guardar'}
      </button>
      <p class="text-center font-mono text-sm">{msg}</p>
      {#if values.sent}
        <button type="button" class="text-xs text-primary underline" onclick={() => (values.sent = false)}>
          Reset demo
        </button>
      {/if}
    </form>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} lines={[
      { kind: 'comment', text: '// form action' },
      { kind: 'let', key: 'sent' },
      { kind: 'derived', name: 'form', expr: 'action', resultKey: 'msg' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
