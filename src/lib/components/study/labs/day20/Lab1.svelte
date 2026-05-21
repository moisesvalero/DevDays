<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';
  import LiveValue from '../LiveValue.svelte';

  let values = $state({ n: 0 });
  const label = $derived(`Añadido ${values.n} veces`);
  const results = $derived({ label });

  function add() {
    values.n += 1;
  }
</script>

<InteractiveLabLayout hint="onclick en Svelte 5: sustituye la sintaxis on:click anterior.">
  {#snippet preview()}
    <div class="flex flex-col items-center gap-4 rounded-xl border p-8">
      <button
        type="button"
        class="rounded-xl bg-primary px-8 py-4 text-lg font-bold text-on-primary shadow-lg transition-transform hover:scale-105 active:scale-95"
        onclick={add}
      >
        Añadir al carrito
      </button>
      <p class="font-mono text-4xl font-black text-primary"><LiveValue value={values.n} /></p>
      <p class="text-sm text-on-surface-variant">{label}</p>
    </div>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} limits={{ n: { min: 0, max: 15 } }} lines={[
      { kind: 'comment', text: '// onclick handler' },
      { kind: 'let', key: 'n' },
      { kind: 'derived', name: 'label', expr: 'increment', resultKey: 'label' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
