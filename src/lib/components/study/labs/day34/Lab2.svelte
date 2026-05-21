<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';
  import LiveValue from '../LiveValue.svelte';

  const pasos = ['Auth', 'Catálogo', 'Detalle', 'Checkout', 'Deploy'];
  let values = $state({ step: 1 });
  const guide = $derived(`Paso ${values.step} de 5: ${pasos[values.step - 1]}`);
  const results = $derived({ guide });
</script>

<InteractiveLabLayout hint="Demo guiada: un paso cada 30–60s, sin perderse en código.">
  {#snippet preview()}
    <input type="range" min="1" max="5" bind:value={values.step} class="w-full accent-primary" />
    <div class="mt-4 flex justify-between gap-1">
      {#each pasos as p, i (p)}
        <div class="flex flex-1 flex-col items-center">
          <div class="h-2 w-full rounded-full {i < values.step ? 'bg-primary' : 'bg-outline-variant/30'}"></div>
          <span class="mt-1 text-[10px]">{p}</span>
        </div>
      {/each}
    </div>
    <p class="mt-6 text-center font-bold text-primary"><LiveValue value={guide} /></p>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} limits={{ step: { min: 1, max: 5 } }} lines={[
      { kind: 'comment', text: '// guided demo' },
      { kind: 'let', key: 'step' },
      { kind: 'derived', name: 'guide', expr: 'steps', resultKey: 'guide' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
