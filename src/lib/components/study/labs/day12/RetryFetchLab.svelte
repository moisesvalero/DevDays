<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';
  import LiveValue from '../LiveValue.svelte';

  let values = $state({ intentos: 2 });
  const ok = $derived(values.intentos >= 2);
  const results = $derived({ ok });
</script>

<InteractiveLabLayout hint="try/catch + retry — éxito tras suficientes intentos.">
  {#snippet preview()}
    <label class="block space-y-2 max-w-xs">
      <span class="text-sm">Intentos</span>
      <input type="range" min="1" max="5" bind:value={values.intentos} class="w-full accent-primary" />
      <LiveValue value={values.intentos} />
    </label>
    <div class="mt-4 flex gap-2">
      {#each Array.from({ length: 5 }, (_, i) => i + 1) as n (n)}
        <div
          class="size-10 rounded-full flex items-center justify-center text-xs font-bold
            {n <= values.intentos ? (ok && n === values.intentos ? 'bg-primary text-on-primary' : 'bg-outline-variant/40') : 'opacity-20'}"
        >
          {n}
        </div>
      {/each}
    </div>
    <p class="mt-4 font-bold {ok ? 'text-primary' : 'text-destructive'}">{ok ? 'Fetch OK' : 'Reintentando…'}</p>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} limits={{ intentos: { min: 1, max: 5 } }} lines={[
      { kind: 'let', key: 'intentos' },
      { kind: 'derived', name: 'exito', expr: 'intentos >= 2', resultKey: 'ok' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
