<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';

  let values = $state({ ctx: 'E-commerce MVP con plazos ajustados' });
  const s = $derived(values.ctx);
  const results = $derived({ s });
</script>

<InteractiveLabLayout hint="STAR — S: contexto concreto (cuándo, quién, restricción).">
  {#snippet preview()}
    <div class="rounded-xl border-l-4 border-tertiary bg-tertiary/5 p-6">
      <p class="text-xs font-bold uppercase text-tertiary">Situación</p>
      <textarea class="mt-2 w-full rounded-lg border bg-card p-3 text-sm" rows="3" bind:value={values.ctx}></textarea>
    </div>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} lines={[
      { kind: 'comment', text: '// STAR - Situation' },
      { kind: 'let', key: 'ctx' },
      { kind: 'derived', name: 's', expr: 'situation', resultKey: 's' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
