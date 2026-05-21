<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';
  import LiveValue from '../LiveValue.svelte';

  let values = $state({ rows: 5 });
  const data = $derived(`${values.rows} productos`);
  const filas = $derived(Array.from({ length: values.rows }, (_, i) => ({ id: i + 1, nombre: `Producto ${i + 1}` })));
  const results = $derived({ data });
</script>

<InteractiveLabLayout hint="await supabase.from('productos').select('*') devuelve filas.">
  {#snippet preview()}
    <div class="rounded-xl bg-zinc-950 p-4 font-mono text-xs text-emerald-400">
      <p>.from('productos').select('*')</p>
      <label class="mt-4 block text-zinc-500">
        Filas devueltas
        <input type="range" min="0" max="20" bind:value={values.rows} class="mt-1 w-full accent-emerald-500" />
      </label>
    </div>
    <table class="mt-4 w-full text-left text-sm">
      <thead>
        <tr class="border-b text-xs uppercase text-on-surface-variant">
          <th class="py-2">id</th>
          <th>nombre</th>
        </tr>
      </thead>
      <tbody>
        {#each filas as f (f.id)}
          <tr class="border-b border-outline-variant/20">
            <td class="py-2 font-mono">{f.id}</td>
            <td>{f.nombre}</td>
          </tr>
        {:else}
          <tr><td colspan="2" class="py-4 text-center text-on-surface-variant">Sin filas</td></tr>
        {/each}
      </tbody>
    </table>
    <p class="mt-2 font-bold text-primary"><LiveValue value={data} /></p>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} limits={{ rows: { min: 0, max: 20 } }} lines={[
      { kind: 'comment', text: '// select query' },
      { kind: 'let', key: 'rows' },
      { kind: 'derived', name: 'data', expr: 'select', resultKey: 'data' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
