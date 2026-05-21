<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';

  const variants = ['sale', 'new', 'default'] as const;
  let values = $state({ variant: 'sale' });
  const cls = $derived(
    values.variant === 'sale'
      ? 'badge sale'
      : values.variant === 'new'
        ? 'badge new'
        : 'badge'
  );
  const results = $derived({ cls });
</script>

<InteractiveLabLayout hint="Props con valor por defecto si el padre no las envía.">
  {#snippet preview()}
    <div class="flex flex-wrap gap-2">
      {#each variants as v (v)}
        <button
          type="button"
          class="rounded-full px-4 py-2 text-sm capitalize
            {values.variant === v ? 'bg-primary text-on-primary' : 'border'}"
          onclick={() => (values.variant = v)}
        >
          {v}
        </button>
      {/each}
    </div>
    <span
      class="mt-6 inline-block rounded-full px-4 py-2 text-sm font-bold uppercase
        {values.variant === 'sale'
        ? 'bg-destructive/20 text-destructive'
        : values.variant === 'new'
          ? 'bg-primary/20 text-primary'
          : 'bg-surface-container-high'}"
    >
      {values.variant}
    </span>
    <p class="mt-2 font-mono text-xs">{cls}</p>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} lines={[
      { kind: 'comment', text: '// default props' },
      { kind: 'let', key: 'variant' },
      { kind: 'derived', name: 'cls', expr: 'badge', resultKey: 'cls' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
