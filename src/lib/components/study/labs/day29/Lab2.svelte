<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';
  import LiveValue from '../LiveValue.svelte';

  let values = $state({ count: 0 });
  const type = $derived(`count: number = ${values.count}`);
  const results = $derived({ type });
</script>

<InteractiveLabLayout hint="Props tipadas: count debe ser number, no string.">
  {#snippet preview()}
    <div class="rounded-xl bg-zinc-950 p-4 font-mono text-emerald-400">
      <p>type Props = {'{'}</p>
      <p class="pl-4">count: number;</p>
      <p>{'}'}</p>
      <input type="range" min="0" max="99" bind:value={values.count} class="mt-4 w-full accent-emerald-500" />
      <p class="mt-2 text-white"><LiveValue value={type} /></p>
    </div>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} limits={{ count: { min: 0, max: 99 } }} lines={[
      { kind: 'comment', text: '// Props count: number' },
      { kind: 'let', key: 'count' },
      { kind: 'derived', name: 'type', expr: 'number', resultKey: 'type' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
