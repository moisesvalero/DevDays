<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';

  let values = $state({ logueado: false });
  const cta = $derived(values.logueado ? 'Comprar ahora' : 'Iniciar sesión');
  const results = $derived({ cta });
</script>

<InteractiveLabLayout hint="Alterna logueado en el spec — el botón muestra la rama del operador ternario.">
  {#snippet preview()}
    <div class="flex flex-col items-center gap-8 py-8">
      <label
        class="flex cursor-pointer items-center gap-4 rounded-2xl border border-outline-variant/50 bg-card px-6 py-4 shadow-sm"
      >
        <input type="checkbox" bind:checked={values.logueado} class="size-6 accent-primary" />
        <div>
          <p class="font-medium text-on-surface">Sesión activa</p>
          <p class="text-xs text-on-surface-variant">Simula usuario logueado</p>
        </div>
      </label>

      <button
        type="button"
        class="lab-card-lift min-w-[260px] rounded-2xl px-10 py-5 text-xl font-bold transition-all duration-500
          {values.logueado
          ? 'bg-primary text-on-primary shadow-xl shadow-primary/30'
          : 'border-2 border-outline-variant bg-surface-container-high text-on-surface'}"
      >
        {cta}
      </button>

      <p class="max-w-xs text-center text-xs text-on-surface-variant">
        {values.logueado ? 'Rama verdadera del ternario' : 'Rama falsa → redirige a login'}
      </p>
    </div>
  {/snippet}

  {#snippet spec()}
    <LiveSpecPanel
      bind:values
      {results}
      lines={[
        { kind: 'comment', text: '// Spec: texto CTA con ? :' },
        { kind: 'let', key: 'logueado' },
        { kind: 'derived', name: 'cta', expr: 'logueado ? Comprar : Login', resultKey: 'cta' }
      ]}
    />
  {/snippet}
</InteractiveLabLayout>
