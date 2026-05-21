<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';
  import LiveValue from '../LiveValue.svelte';

  let values = $state({ count: 0 });
  const results = $derived({ count: values.count });

  function inc() {
    values.count += 1;
  }
</script>

<InteractiveLabLayout hint="&lt;script&gt; define lógica; el markup usa las variables.">
  {#snippet preview()}
    <div class="grid gap-6 lg:grid-cols-2 font-mono text-sm">
      <div class="rounded-xl bg-zinc-950 p-4 text-emerald-400">
        <p class="text-zinc-500">&lt;script lang="ts"&gt;</p>
        <p>let count = $state({values.count});</p>
        <p class="text-zinc-500">&lt;/script&gt;</p>
      </div>
      <div class="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/40 p-8">
        <p class="text-5xl font-black text-primary"><LiveValue value={values.count} /></p>
        <button type="button" class="mt-4 rounded-lg bg-primary px-6 py-2 font-bold text-on-primary" onclick={inc}>
          count++
        </button>
      </div>
    </div>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} limits={{ count: { min: 0, max: 20 } }} lines={[
      { kind: 'comment', text: '// script block' },
      { kind: 'let', key: 'count' },
      { kind: 'derived', name: 'count', expr: 'let count', resultKey: 'count' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
