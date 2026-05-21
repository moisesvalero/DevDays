<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';

  let values = $state({ nombre: '', email: '' });
  const listo = $derived(values.nombre.trim().length > 0 && values.email.includes('@'));
  const results = $derived({ ok: listo });
</script>

<InteractiveLabLayout hint="Formulario controlado: cada campo es $state; validación en tiempo real.">
  {#snippet preview()}
    <form class="max-w-md space-y-4 rounded-xl border border-outline-variant/40 p-6">
      <label class="block space-y-1">
        <span class="text-sm font-medium">Nombre</span>
        <input class="w-full rounded-lg border px-3 py-2" bind:value={values.nombre} placeholder="Tu nombre" />
      </label>
      <label class="block space-y-1">
        <span class="text-sm font-medium">Email</span>
        <input type="email" class="w-full rounded-lg border px-3 py-2 font-mono" bind:value={values.email} placeholder="tu@email.com" />
      </label>
      <button
        type="button"
        disabled={!listo}
        class="w-full rounded-lg py-2 font-bold transition-opacity
          {listo ? 'bg-primary text-on-primary' : 'bg-outline-variant/30 text-on-surface-variant'}"
      >
        {listo ? 'Listo para enviar' : 'Completa nombre y @'}
      </button>
    </form>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} lines={[
      { kind: 'comment', text: '// $state form' },
      { kind: 'let', key: 'nombre' },
      { kind: 'let', key: 'email' },
      { kind: 'derived', name: 'ok', expr: 'valid', resultKey: 'ok' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
