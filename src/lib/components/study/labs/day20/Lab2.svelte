<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';

  let values = $state({ email: 'user@mail.com' });
  const valid = $derived(String(values.email).includes('@'));
  const results = $derived({ valid });
</script>

<InteractiveLabLayout hint="bind:value sincroniza input y $state en ambos sentidos.">
  {#snippet preview()}
    <label class="block max-w-md space-y-2 rounded-xl border p-6">
      <span class="text-sm font-medium">Email (bind:value)</span>
      <input type="email" class="w-full rounded-lg border px-3 py-2 font-mono" bind:value={values.email} />
      <span class="text-xs {valid ? 'text-primary' : 'text-destructive'}">
        {valid ? 'Listo para submit' : 'Falta @ válido'}
      </span>
    </label>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} lines={[
      { kind: 'comment', text: '// bind:value' },
      { kind: 'let', key: 'email' },
      { kind: 'derived', name: 'valid', expr: 'includes @', resultKey: 'valid' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
