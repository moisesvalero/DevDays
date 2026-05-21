<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';

  let values = $state({ plan: 2 });

  const badge = $derived.by(() => {
    if (values.plan === 1) return 'Gratis';
    if (values.plan === 2) return 'Pro';
    return 'VIP';
  });

  const results = $derived({ badge });

  const planes = [
    { id: 1, name: 'Free', precio: '0€' },
    { id: 2, name: 'Pro', precio: '12€' },
    { id: 3, name: 'VIP', precio: '29€' }
  ];
</script>

<InteractiveLabLayout hint="Elige un plan — equivale a ramas de un switch en pricing.">
  {#snippet preview()}
    <div class="grid gap-4 sm:grid-cols-3">
      {#each planes as plan (plan.id)}
        <button
          type="button"
          class="lab-card-lift relative rounded-2xl border-2 p-5 text-left transition-all duration-300
            {values.plan === plan.id
            ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-[1.02]'
            : 'border-outline-variant/50 bg-surface-container-low hover:border-primary/30'}"
          onclick={() => (values.plan = plan.id)}
        >
          {#if values.plan === plan.id}
            <span
              class="absolute -top-2.5 left-4 rounded-full bg-primary px-3 py-0.5 text-[10px] font-bold text-on-primary"
            >
              {badge}
            </span>
          {/if}
          <p class="text-xs font-bold uppercase text-on-surface-variant">{plan.name}</p>
          <p class="mt-2 font-mono text-2xl font-bold text-on-surface">{plan.precio}</p>
          <p class="mt-2 text-xs text-on-surface-variant">/ mes</p>
        </button>
      {/each}
    </div>
    <p class="mt-6 text-center text-sm text-on-surface-variant">
      Badge activo: <span class="font-bold text-primary">{badge}</span>
    </p>
  {/snippet}

  {#snippet spec()}
    <LiveSpecPanel
      bind:values
      {results}
      limits={{ plan: { min: 1, max: 3 } }}
      lines={[
        { kind: 'comment', text: '// Spec: switch(plan)' },
        { kind: 'let', key: 'plan' },
        { kind: 'derived', name: 'badge', expr: 'switch(plan)', resultKey: 'badge' }
      ]}
    />
  {/snippet}
</InteractiveLabLayout>
