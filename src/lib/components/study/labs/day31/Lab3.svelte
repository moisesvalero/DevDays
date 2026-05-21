<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';

  let values = $state({ live: true });
  const env = $derived(values.live ? 'Production env OK · dominio custom' : 'Solo preview');
  const results = $derived({ env });
</script>

<InteractiveLabLayout hint="Promote a production tras validar preview.">
  {#snippet preview()}
    <div class="flex gap-4">
      <div class="flex-1 rounded-xl border p-4 opacity-60">
        <p class="text-xs uppercase">Preview</p>
        <p class="font-mono text-sm">*.vercel.app</p>
      </div>
      <div
        class="flex-1 rounded-xl border-2 p-4 transition-all
          {values.live ? 'border-primary bg-primary/10' : 'opacity-40'}"
      >
        <p class="text-xs uppercase text-primary">Production</p>
        <p class="font-mono text-sm font-bold">devdays.com</p>
      </div>
    </div>
    <label class="mt-4 flex gap-2 text-sm">
      <input type="checkbox" bind:checked={values.live} />
      Promoted to production
    </label>
    <p class="mt-2 font-mono text-sm">{env}</p>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} lines={[
      { kind: 'comment', text: '// production env' },
      { kind: 'let', key: 'live' },
      { kind: 'derived', name: 'env', expr: 'production', resultKey: 'env' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
