<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';

  let values = $state({ server: true });
  const safe = $derived(values.server ? 'Seguro en servidor' : '⚠️ Expuesto al cliente');
  const results = $derived({ safe });
</script>

<InteractiveLabLayout hint="SUPABASE_SERVICE_ROLE solo en +page.server.ts / hooks.">
  {#snippet preview()}
    <div class="grid gap-4 lg:grid-cols-2 text-sm">
      <div class="rounded-xl bg-emerald-950/30 border border-emerald-500/30 p-4">
        <p class="font-bold text-emerald-600">Servidor ✓</p>
        <p class="mt-2 font-mono text-xs">process.env.SUPABASE_SERVICE_ROLE</p>
      </div>
      <div class="rounded-xl p-4 {values.server ? 'bg-surface-container-low opacity-50' : 'bg-destructive/10 ring-2 ring-destructive/40'}">
        <p class="font-bold">Cliente</p>
        <p class="mt-2 font-mono text-xs">import.meta.env — solo PUBLIC_*</p>
      </div>
    </div>
    <label class="mt-4 flex gap-2">
      <input type="checkbox" bind:checked={values.server} />
      Secreto solo en servidor
    </label>
    <p class="mt-2 font-mono text-sm">{safe}</p>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} lines={[
      { kind: 'comment', text: '// server secrets' },
      { kind: 'let', key: 'server' },
      { kind: 'derived', name: 'safe', expr: 'server only', resultKey: 'safe' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
