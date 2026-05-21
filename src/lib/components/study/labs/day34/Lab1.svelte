<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';
  import LiveValue from '../LiveValue.svelte';

  let values = $state({ sec: 15 });
  const hook = $derived(`En ${values.sec}s: problema + promesa de valor`);
  const results = $derived({ hook });
</script>

<InteractiveLabLayout hint="Hook de 15s: quién eres, qué construiste, por qué importa.">
  {#snippet preview()}
    <div class="text-center">
      <p class="text-6xl font-black text-primary"><LiveValue value={values.sec} />s</p>
      <input type="range" min="5" max="30" bind:value={values.sec} class="mt-4 w-full max-w-xs accent-primary" />
      <p class="mt-6 text-lg font-medium">{hook}</p>
    </div>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} limits={{ sec: { min: 5, max: 30 } }} lines={[
      { kind: 'comment', text: '// 15s hook' },
      { kind: 'let', key: 'sec' },
      { kind: 'derived', name: 'hook', expr: '15s', resultKey: 'hook' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
