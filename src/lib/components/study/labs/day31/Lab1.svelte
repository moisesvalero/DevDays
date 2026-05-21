<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';

  let values = $state({ build: true, lint: true, test: true });
  const step = $derived(
    [values.lint && 'lint ✓', values.test && 'test ✓', values.build && 'build ✓'].filter(Boolean).join(' → ') ||
      'build falló'
  );
  const results = $derived({ step });
</script>

<InteractiveLabLayout hint="Pipeline: check → test → build antes de deploy.">
  {#snippet preview()}
    <ol class="space-y-2">
      {#each [
        { key: 'lint', label: 'npm run check' },
        { key: 'test', label: 'npm test' },
        { key: 'build', label: 'npm run build' }
      ] as s (s.key)}
        <li class="flex items-center gap-2 rounded-lg border px-4 py-2">
          <input type="checkbox" bind:checked={values[s.key as 'lint' | 'test' | 'build']} class="accent-primary" />
          <span class={values[s.key as 'lint' | 'test' | 'build'] ? 'font-semibold' : 'opacity-40'}>{s.label}</span>
        </li>
      {/each}
    </ol>
    <p class="mt-4 font-mono text-sm text-primary">{step}</p>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} lines={[
      { kind: 'comment', text: '// CI pipeline' },
      { kind: 'let', key: 'build' },
      { kind: 'derived', name: 'step', expr: 'pipeline', resultKey: 'step' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
