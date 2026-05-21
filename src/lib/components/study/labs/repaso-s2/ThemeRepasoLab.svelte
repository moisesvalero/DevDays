<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';

  let values = $state({ dark: false });
  const theme = $derived(values.dark ? 'dark' : 'light');
  const results = $derived({ theme });
</script>

<InteractiveLabLayout hint="localStorage: persistir preferencia de tema.">
  {#snippet preview()}
    <div
      class="rounded-2xl border p-8 transition-colors duration-500
        {values.dark ? 'border-on-surface/20 bg-zinc-900 text-zinc-100' : 'border-outline-variant bg-white text-zinc-900'}"
    >
      <p class="text-xs uppercase opacity-70">Vista previa tema</p>
      <button
        type="button"
        class="mt-4 rounded-full px-5 py-2 text-sm font-bold
          {values.dark ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-900 text-white'}"
        onclick={() => (values.dark = !values.dark)}
      >
        Cambiar a {values.dark ? 'claro' : 'oscuro'}
      </button>
      <p class="mt-4 font-mono text-sm">localStorage.theme = "{theme}"</p>
    </div>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} lines={[
      { kind: 'comment', text: '// storage.theme' },
      { kind: 'let', key: 'dark' },
      { kind: 'derived', name: 'theme', expr: 'dark ? dark : light', resultKey: 'theme' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
