<script lang="ts">
  import type { LabBlockConfig, LabUiVariant, LabValues } from '$lib/types/laboratorio';
  import LiveValue from '../LiveValue.svelte';

  let {
    config,
    values = $bindable(),
    results
  }: {
    config: LabBlockConfig;
    values: LabValues;
    results: Record<string, string | number | boolean>;
  } = $props();

  const variant = $derived(config.variant);
  const primaryResult = $derived(
    config.derived[0]?.resultKey ? results[config.derived[0].resultKey] : ''
  );

  function num(key: string): number {
    return values[key] as number;
  }
  function str(key: string): string {
    return String(values[key] ?? '');
  }
  function bool(key: string): boolean {
    return Boolean(values[key]);
  }
</script>

{#if variant === 'inventory'}
  <div class="grid gap-6 lg:grid-cols-2">
    <div class="rounded-xl border border-outline-variant/40 bg-surface-container-low p-6">
      <p class="text-xs font-bold tracking-wider text-primary uppercase">{config.uiTitle}</p>
      <p class="mt-1 text-sm text-on-surface-variant">{config.uiDescription}</p>
      {#each config.fields as field (field.key)}
        {#if field.kind === 'number'}
          <label class="mt-4 block space-y-2">
            <span class="text-sm text-on-surface-variant">{field.label}</span>
            <input type="range" min={field.min} max={field.max} bind:value={values[field.key]} class="w-full accent-primary" />
            <span class="font-mono text-2xl font-bold text-on-surface"><LiveValue value={num(field.key)} /></span>
          </label>
        {/if}
      {/each}
    </div>
    <div class="flex flex-col items-center justify-center rounded-xl border-2 border-primary/30 bg-primary/5 p-8">
      <p class="text-sm text-on-surface-variant">Resultado en UI</p>
      <p class="mt-2 font-mono text-5xl font-black text-primary"><LiveValue value={primaryResult} /></p>
    </div>
  </div>

{:else if variant === 'profile'}
  <div class="mx-auto max-w-md rounded-2xl border border-outline-variant/50 bg-card p-6 shadow-lg">
    <div class="flex items-center gap-4">
      <div class="flex size-16 items-center justify-center rounded-full bg-primary/15 text-2xl font-bold text-primary">
        {str('nombre').charAt(0) || '?'}
      </div>
      <div class="flex-1 space-y-3">
        {#each config.fields as field (field.key)}
          {#if field.kind === 'string'}
            <label class="block">
              <span class="text-xs text-on-surface-variant">{field.label}</span>
              <input type="text" bind:value={values[field.key]} class="mt-1 w-full rounded-lg border border-outline-variant bg-surface-container-low px-3 py-2" />
            </label>
          {:else if field.kind === 'number'}
            <label class="block">
              <span class="text-xs text-on-surface-variant">{field.label}</span>
              <input type="range" min={field.min} max={field.max} bind:value={values[field.key]} class="mt-1 w-full accent-primary" />
            </label>
          {/if}
        {/each}
      </div>
    </div>
    <p class="mt-6 rounded-lg bg-primary/10 px-4 py-3 text-center text-sm font-medium text-on-surface">
      {primaryResult}
    </p>
  </div>

{:else if variant === 'pricetag'}
  <div class="flex flex-wrap items-end justify-center gap-8 p-4">
    {#each config.fields as field (field.key)}
      <label class="space-y-2">
        <span class="text-xs font-bold uppercase text-on-surface-variant">{field.label}</span>
        {#if field.kind === 'string'}
          <input type="text" bind:value={values[field.key]} class="rounded-lg border border-outline-variant px-3 py-2 font-medium" />
        {:else if field.kind === 'number'}
          <input type="number" min={field.min} max={field.max} bind:value={values[field.key]} class="w-28 rounded-lg border border-outline-variant px-3 py-2 font-mono text-xl" />
        {/if}
      </label>
    {/each}
    <div class="lab-card-lift rotate-[-2deg] rounded-lg border-2 border-dashed border-tertiary bg-tertiary-container/20 px-6 py-4">
      <p class="font-mono text-lg font-bold text-on-surface">{primaryResult}</p>
    </div>
  </div>

{:else if variant === 'status'}
  <div class="space-y-6">
    {#each config.fields as field (field.key)}
      {#if field.kind === 'number'}
        <label class="block max-w-sm space-y-2">
          <span class="text-sm text-on-surface-variant">{field.label}: <LiveValue value={num(field.key)} /></span>
          <input type="range" min={field.min} max={field.max} bind:value={values[field.key]} class="w-full accent-primary" />
        </label>
      {/if}
    {/each}
    <span
      class="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold uppercase tracking-wide transition-all duration-500
        {primaryResult === 'reponer' || primaryResult === 'agotado' || primaryResult === 'bajo'
        ? 'bg-destructive/15 text-destructive ring-2 ring-destructive/40'
        : 'bg-primary/15 text-primary ring-2 ring-primary/30'}"
    >
      <span class="material-symbols-outlined text-base">
        {primaryResult === 'reponer' || primaryResult === 'agotado' ? 'warning' : 'check_circle'}
      </span>
      {primaryResult}
    </span>
  </div>

{:else if variant === 'cta'}
  <div class="flex flex-col items-center gap-6 py-4">
    <label class="flex cursor-pointer items-center gap-3 rounded-xl border border-outline-variant/50 bg-surface-container-low px-5 py-4">
      <input type="checkbox" checked={bool(config.fields[0]?.key ?? 'logueado')} onchange={() => {
        const k = config.fields[0]?.key;
        if (k) values[k] = !bool(k);
      }} class="size-5 accent-primary" />
      <span class="text-sm font-medium text-on-surface">{config.fields[0]?.label}</span>
    </label>
    <button
      type="button"
      class="lab-card-lift min-w-[220px] rounded-xl bg-primary px-8 py-4 text-lg font-bold text-on-primary shadow-lg shadow-primary/25 transition-transform"
    >
      {primaryResult}
    </button>
  </div>

{:else if variant === 'plans'}
  <div class="grid gap-4 sm:grid-cols-3">
    {#each [
      { n: 1, name: 'Free' },
      { n: 2, name: 'Pro' },
      { n: 3, name: 'VIP' }
    ] as plan (plan.n)}
      <button
        type="button"
        class="lab-card-lift rounded-2xl border-2 p-5 text-left transition-all
          {num('plan') === plan.n
          ? 'border-primary bg-primary/10 scale-[1.03] shadow-lg shadow-primary/20'
          : 'border-outline-variant/50 bg-surface-container-low'}"
        onclick={() => (values.plan = plan.n)}
      >
        <p class="text-xs font-bold uppercase text-on-surface-variant">{plan.name}</p>
        {#if num('plan') === plan.n}
          <span class="mt-2 inline-block rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-on-primary">
            Activo
          </span>
        {/if}
      </button>
    {/each}
  </div>
  <p class="mt-4 text-center font-mono text-xl font-bold text-primary">{primaryResult}</p>

{:else if variant === 'compare'}
  <div class="grid gap-4 sm:grid-cols-2">
    {#each config.fields.filter((f) => f.kind === 'number').slice(0, 2) as field, i (field.key)}
      <article
        class="lab-card-lift rounded-2xl border-2 p-5
          {i === 0 && primaryResult === num(field.key)
          ? 'border-primary bg-primary/10 shadow-lg'
          : i === 1 && config.fields[1] && primaryResult === num(config.fields[1].key)
            ? 'border-primary bg-primary/10 shadow-lg'
            : 'border-outline-variant/50'}"
      >
        <p class="text-xs font-bold uppercase text-on-surface-variant">{field.label}</p>
        <input type="number" min={field.min} max={field.max} bind:value={values[field.key]} class="mt-2 w-full rounded-lg border border-outline-variant bg-card px-3 py-2 font-mono text-3xl font-bold" />
      </article>
    {/each}
  </div>
  <p class="mt-4 text-center text-sm text-on-surface-variant">Destacado: <span class="font-mono font-bold text-primary"><LiveValue value={primaryResult} /></span></p>

{:else if variant === 'rules'}
  <div class="space-y-4 rounded-xl border border-outline-variant/40 bg-surface-container-low p-6">
    <p class="text-xs font-bold uppercase text-primary">{config.uiTitle}</p>
    {#each config.fields as field (field.key)}
      {#if field.kind === 'boolean'}
        <label class="flex items-center gap-3">
          <input type="checkbox" checked={bool(field.key)} onchange={() => (values[field.key] = !bool(field.key))} class="size-5 accent-primary" />
          <span class="text-sm text-on-surface">{field.label}</span>
        </label>
      {:else if field.kind === 'number'}
        <label class="block space-y-1">
          <span class="text-sm text-on-surface-variant">{field.label}</span>
          <input type="range" min={field.min} max={field.max} bind:value={values[field.key]} class="w-full accent-primary" />
        </label>
      {/if}
    {/each}
    <button
      type="button"
      disabled={!primaryResult}
      class="w-full rounded-xl py-3 font-bold transition-all
        {primaryResult ? 'bg-primary text-on-primary' : 'cursor-not-allowed bg-outline-variant/30 text-on-surface-variant'}"
    >
      {primaryResult ? 'Pagar ahora' : 'Completa las condiciones'}
    </button>
  </div>

{:else if variant === 'formula'}
  <div class="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-card p-8 text-center">
    <p class="text-sm text-on-surface-variant">{config.uiDescription}</p>
    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      {#each config.fields as field (field.key)}
        <label class="rounded-lg border border-outline-variant/40 bg-surface-container-low p-4 text-left">
          <span class="text-xs text-on-surface-variant">{field.label}</span>
          {#if field.kind === 'number'}
            <input type="range" min={field.min} max={field.max} bind:value={values[field.key]} class="mt-2 w-full accent-primary" />
            <span class="font-mono text-xl font-bold"><LiveValue value={num(field.key)} /></span>
          {/if}
        </label>
      {/each}
    </div>
    <p class="mt-8 font-mono text-4xl font-black text-primary"><LiveValue value={primaryResult} /></p>
  </div>

{:else if variant === 'listops'}
  <div class="space-y-4">
    {#each config.fields as field (field.key)}
      {#if field.kind === 'number'}
        <label class="block max-w-xs space-y-2">
          <span class="text-sm text-on-surface-variant">{field.label}</span>
          <input type="range" min={field.min} max={field.max} bind:value={values[field.key]} class="w-full accent-tertiary" />
        </label>
      {/if}
    {/each}
    <div class="flex flex-wrap gap-2">
      {#each String(primaryResult).split(/,\s*/) as chip (chip)}
        <span class="rounded-full bg-tertiary/15 px-4 py-2 font-mono text-sm font-semibold text-tertiary">{chip}</span>
      {/each}
    </div>
    <p class="rounded-lg bg-surface-container-high px-4 py-3 font-mono text-sm text-on-surface">{primaryResult}</p>
  </div>

{:else if variant === 'timeline'}
  <div class="flex items-center justify-center gap-2 py-6">
    {#each ['idle', 'loading', 'ok', 'error'] as step (step)}
      <div
        class="flex flex-col items-center gap-2 rounded-xl border-2 px-4 py-3 transition-all
          {String(primaryResult).toLowerCase().includes(step) || (step === 'ok' && primaryResult === true)
          ? 'border-primary bg-primary/10 scale-105'
          : 'border-outline-variant/30 opacity-50'}"
      >
        <span class="material-symbols-outlined text-2xl">
          {step === 'loading' ? 'progress_activity' : step === 'ok' ? 'check_circle' : step === 'error' ? 'error' : 'schedule'}
        </span>
        <span class="text-[10px] font-bold uppercase">{step}</span>
      </div>
      {#if step !== 'error'}
        <span class="text-on-surface-variant">→</span>
      {/if}
    {/each}
  </div>
  {#each config.fields as field (field.key)}
    {#if field.kind === 'boolean'}
      <label class="mt-4 flex justify-center gap-2">
        <input type="checkbox" checked={bool(field.key)} onchange={() => (values[field.key] = !bool(field.key))} class="accent-primary" />
        <span class="text-sm">{field.label}</span>
      </label>
    {/if}
  {/each}

{:else if variant === 'route'}
  <div class="rounded-xl border border-outline-variant/40 bg-surface-container-low p-5 font-mono text-sm">
    <p class="text-xs font-bold uppercase text-primary">App shell</p>
    <div class="mt-3 space-y-1 text-on-surface-variant">
      <p class={str('ruta') === '/' || str('path') === '/' ? 'text-primary font-semibold' : ''}>/ inicio</p>
      <p class={str('ruta').includes('producto') || Boolean(str('slug')) ? 'text-primary font-semibold' : ''}>
        → /producto/[slug]
      </p>
      <p class={str('ruta') === '404' ? 'text-primary font-semibold' : ''}>→ 404</p>
    </div>
    {#each config.fields as field (field.key)}
      {#if field.kind === 'string'}
        <input type="text" bind:value={values[field.key]} class="mt-4 w-full rounded border border-outline-variant px-2 py-1" placeholder={field.label} />
      {/if}
    {/each}
    <p class="mt-3 font-bold text-on-surface">{primaryResult}</p>
  </div>

{:else if variant === 'form'}
  <form class="mx-auto max-w-sm space-y-4 rounded-xl border border-outline-variant/50 bg-card p-6" onsubmit={(e) => e.preventDefault()}>
    {#each config.fields as field (field.key)}
      <label class="block space-y-1">
        <span class="text-xs font-medium text-on-surface-variant">{field.label}</span>
        {#if field.kind === 'string'}
          <input type="text" bind:value={values[field.key]} class="w-full rounded-lg border border-outline-variant px-3 py-2" />
        {:else if field.kind === 'number'}
          <input type="number" bind:value={values[field.key]} class="w-full rounded-lg border border-outline-variant px-3 py-2" />
        {:else if field.kind === 'boolean'}
          <input type="checkbox" checked={bool(field.key)} onchange={() => (values[field.key] = !bool(field.key))} class="accent-primary" />
        {/if}
      </label>
    {/each}
    <p class="text-center text-sm font-semibold text-primary">{primaryResult}</p>
  </form>

{:else if variant === 'auth'}
  <div class="mx-auto max-w-xs rounded-2xl border border-outline-variant/50 bg-card p-6 shadow-md">
    <p class="text-center text-xs font-bold uppercase tracking-widest text-primary">Supabase Auth</p>
    {#each config.fields as field (field.key)}
      <label class="mt-4 block space-y-1">
        <span class="text-xs text-on-surface-variant">{field.label}</span>
        {#if field.kind === 'boolean'}
          <input type="checkbox" checked={bool(field.key)} onchange={() => (values[field.key] = !bool(field.key))} class="accent-primary" />
        {:else}
          <input type="text" bind:value={values[field.key]} class="w-full rounded-lg border border-outline-variant px-3 py-2 text-sm" />
        {/if}
      </label>
    {/each}
    <div class="mt-4 rounded-lg bg-primary/10 px-3 py-2 text-center text-sm font-medium">{primaryResult}</div>
  </div>

{:else if variant === 'story'}
  <div class="grid gap-4 md:grid-cols-3">
    {#each config.fields as field, i (field.key)}
      <div class="lab-card-lift rounded-xl border border-outline-variant/40 bg-surface-container-low p-4">
        <p class="text-[10px] font-bold uppercase text-tertiary">Paso {i + 1}</p>
        <p class="mt-2 text-sm font-semibold text-on-surface">{field.label}</p>
        {#if field.kind === 'string'}
          <input type="text" bind:value={values[field.key]} class="mt-2 w-full rounded border border-outline-variant px-2 py-1 text-sm" />
        {/if}
      </div>
    {/each}
  </div>
  <p class="mt-6 text-center text-lg font-medium text-on-surface">{primaryResult}</p>

{:else if variant === 'component'}
  <div class="rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-6">
    <p class="text-xs font-bold uppercase text-primary">Árbol de componentes</p>
    <div class="mt-4 space-y-2 font-mono text-sm">
      <p class="font-bold text-on-surface">App.svelte</p>
      <p class="pl-4 text-on-surface-variant">└─ {config.uiTitle}</p>
      <p class="pl-8 text-primary">└─ props / events</p>
    </div>
    {#each config.fields as field (field.key)}
      {#if field.kind === 'string'}
        <input type="text" bind:value={values[field.key]} class="mt-4 w-full rounded border border-outline-variant px-2 py-1 text-sm" />
      {/if}
    {/each}
    <p class="mt-4 font-semibold text-on-surface">{primaryResult}</p>
  </div>

{:else}
  <p class="text-sm text-on-surface-variant">Vista premium: {variant}</p>
{/if}
