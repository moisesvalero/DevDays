<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';
  import LiveValue from '../LiveValue.svelte';

  let values = $state({
    precioPlanA: 12,
    precioPlanB: 9
  });

  const planAGana = $derived(values.precioPlanA > values.precioPlanB);
  const planBGana = $derived(values.precioPlanB > values.precioPlanA);
  const empate = $derived(values.precioPlanA === values.precioPlanB);
  const precioDestacado = $derived(
    empate ? values.precioPlanA : planAGana ? values.precioPlanA : values.precioPlanB
  );

  const results = $derived({
    empate,
    planAGana,
    planBGana,
    precioDestacado
  });
</script>

<InteractiveLabLayout hint="Cambia precioPlanA o precioPlanB en el código — la tarjeta «Recomendado» se mueve sola.">
  {#snippet preview()}
    <p class="text-sm text-on-surface-variant">
      La UI refleja la misma rama que escribirías con <code class="text-primary">if</code> y
      <code class="text-primary">===</code>.
    </p>

    <div class="grid gap-4 sm:grid-cols-2">
      <article
        class="lab-card-lift relative rounded-2xl border-2 p-5
          {planAGana && !empate
          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-[1.03]'
          : 'border-outline-variant/50 bg-surface-container-low'}"
      >
        {#if planAGana && !empate}
          <span
            class="absolute -top-3 left-4 animate-[lab-spec-enter_0.4s_ease_both] rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-on-primary"
          >
            Recomendado
          </span>
        {/if}
        <p class="text-xs font-bold tracking-wider text-on-surface-variant uppercase">Plan Pro</p>
        <label class="mt-3 block">
          <span class="sr-only">Precio plan A</span>
          <input
            type="number"
            min="0"
            max="99"
            bind:value={values.precioPlanA}
            class="w-full rounded-lg border border-outline-variant bg-card px-3 py-2 font-mono text-3xl font-bold text-on-surface transition-shadow focus:ring-2 focus:ring-primary/30"
          />
        </label>
        <p class="mt-2 text-xs text-on-surface-variant">€ / mes</p>
      </article>

      <article
        class="lab-card-lift relative rounded-2xl border-2 p-5
          {planBGana && !empate
          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-[1.03]'
          : 'border-outline-variant/50 bg-surface-container-low'}"
      >
        {#if planBGana && !empate}
          <span
            class="absolute -top-3 left-4 animate-[lab-spec-enter_0.4s_ease_both] rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-on-primary"
          >
            Recomendado
          </span>
        {/if}
        <p class="text-xs font-bold tracking-wider text-on-surface-variant uppercase">Plan Starter</p>
        <label class="mt-3 block">
          <span class="sr-only">Precio plan B</span>
          <input
            type="number"
            min="0"
            max="99"
            bind:value={values.precioPlanB}
            class="w-full rounded-lg border border-outline-variant bg-card px-3 py-2 font-mono text-3xl font-bold text-on-surface transition-shadow focus:ring-2 focus:ring-primary/30"
          />
        </label>
        <p class="mt-2 text-xs text-on-surface-variant">€ / mes</p>
      </article>
    </div>

    <div
      class="flex flex-wrap items-center gap-3 rounded-xl border border-outline-variant/40 bg-muted/50 p-4 transition-colors duration-500"
    >
      <span class="material-symbols-outlined text-primary">insights</span>
      <p class="text-sm text-on-surface">
        {#if empate}
          Ambos planes: <strong class="font-mono"><LiveValue value={values.precioPlanA} /> €</strong> — empate (
          <code>===</code>).
        {:else}
          Checkout usa: <strong class="font-mono text-primary"><LiveValue value={precioDestacado} /> €</strong>
        {/if}
      </p>
    </div>
  {/snippet}

  {#snippet spec()}
    <LiveSpecPanel
      bind:values
      {results}
      limits={{ precioPlanA: { min: 0, max: 99 }, precioPlanB: { min: 0, max: 99 } }}
      lines={[
        { kind: 'comment', text: '// Spec: plan destacado en pricing' },
        { kind: 'let', key: 'precioPlanA' },
        { kind: 'let', key: 'precioPlanB' },
        {
          kind: 'derived',
          name: 'empate',
          expr: 'precioPlanA === precioPlanB',
          resultKey: 'empate'
        },
        {
          kind: 'derived',
          name: 'planAGana',
          expr: 'precioPlanA > precioPlanB',
          resultKey: 'planAGana'
        },
        {
          kind: 'derived',
          name: 'precioDestacado',
          expr: 'empate ? A : (planAGana ? A : B)',
          resultKey: 'precioDestacado'
        },
        { kind: 'raw', text: '// if (planAGana) → badge en Plan Pro' }
      ]}
    />
  {/snippet}
</InteractiveLabLayout>
