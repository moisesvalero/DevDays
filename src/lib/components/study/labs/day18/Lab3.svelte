<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';

  let values = $state({ qty: 1 });
  let log = $state<string[]>([]);

  $effect(() => {
    const entry = `qty cambió → ${values.qty} (${new Date().toLocaleTimeString()})`;
    log = [entry, ...log].slice(0, 5);
  });

  const results = $derived({ last: log[0] ?? '—' });
</script>

<InteractiveLabLayout hint="$effect reacciona a cambios de qty (como un console.log reactivo).">
  {#snippet preview()}
    <div class="grid gap-6 lg:grid-cols-2">
      <div class="rounded-xl border p-6">
        <p class="text-xs font-bold uppercase text-primary">$effect · log</p>
        <label class="mt-4 block">
          <span class="text-sm">Cantidad</span>
          <input type="range" min="0" max="10" bind:value={values.qty} class="mt-2 w-full accent-primary" />
        </label>
      </div>
      <ul class="space-y-2 rounded-xl bg-zinc-950 p-4 font-mono text-xs text-emerald-400">
        {#each log as line, i (line + i)}
          <li class="border-b border-zinc-800 pb-2 last:border-0">{line}</li>
        {:else}
          <li class="text-zinc-500">Mueve el slider…</li>
        {/each}
      </ul>
    </div>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} limits={{ qty: { min: 0, max: 10 } }} lines={[
      { kind: 'comment', text: '// $effect side effect' },
      { kind: 'let', key: 'qty' },
      { kind: 'derived', name: 'log', expr: '$effect', resultKey: 'last' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
