<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';
  import LiveValue from '../LiveValue.svelte';

  let values = $state({ dia: 19 });
  const type = $derived(`Lección ${values.dia} · Props tipadas`);
  const results = $derived({ type });
</script>

<InteractiveLabLayout hint="interface Props con dia: number en TypeScript.">
  {#snippet preview()}
    <div class="rounded-xl bg-zinc-950 p-4 font-mono text-sm text-emerald-400">
      <p>interface Props {'{'}</p>
      <p class="pl-4">dia: number;</p>
      <p>{'}'}</p>
      <label class="mt-4 block text-zinc-500">
        dia
        <input type="range" min="1" max="35" bind:value={values.dia} class="mt-2 w-full accent-emerald-500" />
      </label>
    </div>
    <p class="mt-4 text-lg font-bold text-primary"><LiveValue value={type} /></p>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} limits={{ dia: { min: 1, max: 35 } }} lines={[
      { kind: 'comment', text: '// Props interface' },
      { kind: 'let', key: 'dia' },
      { kind: 'derived', name: 'type', expr: 'Props', resultKey: 'type' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
