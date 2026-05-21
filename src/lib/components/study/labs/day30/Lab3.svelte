<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';

  let values = $state({ auth: true });
  const guard = $derived(values.auth ? 'Ruta /estudio protegida' : 'Ruta abierta');
  const results = $derived({ guard });
</script>

<InteractiveLabLayout hint="hooks.server.ts — handle valida sesión antes de render.">
  {#snippet preview()}
    <div class="rounded-xl bg-zinc-950 p-4 font-mono text-xs text-emerald-400">
      <p>export const handle = async {'({'} event, resolve {'}'}) =&gt; {'{'}</p>
      <p class="pl-4">if (!session) throw redirect(303, '/login');</p>
      <p>{'}'}</p>
    </div>
    <label class="mt-4 flex items-center gap-2 text-sm">
      <input type="checkbox" bind:checked={values.auth} class="accent-primary" />
      Middleware auth activo
    </label>
    <p class="mt-3 font-semibold text-primary">{guard}</p>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} lines={[
      { kind: 'comment', text: '// hooks.server handle' },
      { kind: 'let', key: 'auth' },
      { kind: 'derived', name: 'guard', expr: 'handle', resultKey: 'guard' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
