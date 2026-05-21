<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';

  let values = $state({ typed: true, check: true, build: true });
  const pipeline = $derived(
    values.typed
      ? [
          values.check && 'svelte-check ✓',
          values.build && 'vite build ✓'
        ]
          .filter(Boolean)
          .join(' → ') || 'TS on'
      : 'Sin tipos'
  );
  const results = $derived({ build: pipeline });
</script>

<InteractiveLabLayout hint="TypeScript + npm run check antes de deploy.">
  {#snippet preview()}
    <ol class="space-y-2 border-l-2 border-primary pl-4">
      {#each [
        { key: 'typed', label: 'strict TypeScript' },
        { key: 'check', label: 'npm run check' },
        { key: 'build', label: 'npm run build' }
      ] as step (step.key)}
        <li class="flex items-center gap-2">
          <input type="checkbox" bind:checked={values[step.key as 'typed' | 'check' | 'build']} />
          <span class={values[step.key as 'typed' | 'check' | 'build'] ? 'font-semibold' : 'opacity-50'}>
            {step.label}
          </span>
        </li>
      {/each}
    </ol>
    <p class="mt-4 font-mono text-sm text-primary">{pipeline}</p>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} lines={[
      { kind: 'comment', text: '// check + build' },
      { kind: 'let', key: 'typed' },
      { kind: 'derived', name: 'ci', expr: 'check + build', resultKey: 'build' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
