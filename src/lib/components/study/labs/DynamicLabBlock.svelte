<script lang="ts">
  import type { LabBlockConfig, LabValues } from '$lib/types/laboratorio';
  import InteractiveLabLayout from './InteractiveLabLayout.svelte';
  import LiveSpecPanel from './LiveSpecPanel.svelte';
  import LiveValue from './LiveValue.svelte';

  let { config }: { config: LabBlockConfig } = $props();

  let values = $state<LabValues>(
    Object.fromEntries(config.fields.map((f) => [f.key, f.default])) as LabValues
  );

  const results = $derived(
    Object.fromEntries(config.derived.map((d) => [d.resultKey, d.compute(values)]))
  );

  const limits = $derived(
    Object.fromEntries(
      config.fields
        .filter((f) => f.kind === 'number')
        .map((f) => [f.key, { min: f.min, max: f.max }])
    )
  );
</script>

<InteractiveLabLayout hint={config.hint}>
  {#snippet preview()}
    <div class="rounded-xl border border-outline-variant/40 bg-surface-container-low p-5">
      <p class="text-xs font-bold tracking-wider text-primary uppercase">{config.uiTitle}</p>
      <p class="mt-1 text-sm text-on-surface-variant">{config.uiDescription}</p>

      <div class="mt-4 space-y-4">
        {#each config.fields as field (field.key)}
          {#if field.kind === 'boolean'}
            <label class="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={Boolean(values[field.key])}
                onchange={() => (values[field.key] = !values[field.key])}
                class="size-5 accent-primary"
              />
              <span class="text-sm text-on-surface">{field.label}</span>
            </label>
          {:else if field.kind === 'number'}
            <label class="block space-y-2">
              <span class="text-sm text-on-surface-variant"
                >{field.label}: <LiveValue value={values[field.key] as number} /></span
              >
              <input
                type="range"
                min={field.min ?? 0}
                max={field.max ?? 100}
                bind:value={values[field.key] as number}
                class="w-full accent-primary"
              />
            </label>
          {:else}
            <label class="block space-y-1">
              <span class="text-sm text-on-surface-variant">{field.label}</span>
              <input
                type="text"
                bind:value={values[field.key] as string}
                class="w-full rounded-lg border border-outline-variant bg-card px-3 py-2 text-sm"
              />
            </label>
          {/if}
        {/each}

        <div class="space-y-2 rounded-lg border-2 border-primary/25 bg-primary/5 p-4">
          {#each config.derived as d (d.resultKey)}
            <div class="flex justify-between text-sm">
              <span class="text-on-surface-variant">{d.name}</span>
              <span class="font-mono font-bold text-primary"
                ><LiveValue value={results[d.resultKey]} /></span
              >
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/snippet}

  {#snippet spec()}
    <LiveSpecPanel bind:values {results} {limits} lines={config.specLines} />
  {/snippet}
</InteractiveLabLayout>
