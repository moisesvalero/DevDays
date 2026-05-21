<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';

  let values = $state({ branch: 'feat/labs' });
  const url = $derived(`https://devdays-git-${values.branch.replace(/\//g, '-')}.vercel.app`);
  const results = $derived({ url });
</script>

<InteractiveLabLayout hint="Cada PR genera preview URL en Vercel.">
  {#snippet preview()}
    <label class="block space-y-2 rounded-xl border p-6">
      <span class="text-sm font-medium">Rama Git</span>
      <input class="w-full rounded-lg border px-3 py-2 font-mono" bind:value={values.branch} />
    </label>
    <p class="mt-4 break-all rounded-lg bg-tertiary/10 px-4 py-3 font-mono text-sm text-primary">{url}</p>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} lines={[
      { kind: 'comment', text: '// preview deploy' },
      { kind: 'let', key: 'branch' },
      { kind: 'derived', name: 'url', expr: 'preview URL', resultKey: 'url' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
