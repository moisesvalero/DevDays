<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';

  let values = $state({ abierto: true });
  const results = $derived({ on: values.abierto });
</script>

<InteractiveLabLayout hint="Boolean en $state: muestra u oculta el panel de ofertas.">
  {#snippet preview()}
    <div class="grid gap-6 lg:grid-cols-2">
      <div class="rounded-xl border p-6">
        <p class="text-xs font-bold uppercase text-primary">Toggle · $state bool</p>
        <button
          type="button"
          role="switch"
          aria-label="Mostrar u ocultar panel de ofertas"
          aria-checked={values.abierto}
          class="mt-4 flex h-10 w-20 items-center rounded-full p-1 transition-colors
            {values.abierto ? 'bg-primary' : 'bg-outline-variant'}"
          onclick={() => (values.abierto = !values.abierto)}
        >
          <span
            class="size-8 rounded-full bg-white shadow transition-transform
              {values.abierto ? 'translate-x-10' : 'translate-x-0'}"
          ></span>
        </button>
        <p class="mt-3 text-sm text-on-surface-variant">
          {values.abierto ? 'Panel visible' : 'Panel oculto'}
        </p>
      </div>
      <div
        class="rounded-xl border-2 border-dashed p-8 transition-all duration-300
          {values.abierto ? 'border-primary bg-primary/5 opacity-100' : 'border-transparent opacity-30'}"
      >
        {#if values.abierto}
          <p class="font-semibold text-on-surface">Ofertas flash</p>
          <p class="mt-2 text-sm text-on-surface-variant">Solo se renderiza cuando abierto === true.</p>
        {:else}
          <p class="text-sm text-on-surface-variant">Contenido colapsado</p>
        {/if}
      </div>
    </div>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} lines={[
      { kind: 'comment', text: '// $state boolean' },
      { kind: 'let', key: 'abierto' },
      { kind: 'derived', name: 'panel', expr: 'abierto', resultKey: 'on' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
