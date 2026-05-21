<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';

  let values = $state({ titulo: 'Catálogo' });
  const props = $derived(`data.titulo = "${values.titulo}"`);
  const results = $derived({ props });
</script>

<InteractiveLabLayout hint="En Svelte 5: data llega por $props desde load del padre.">
  {#snippet preview()}
    <div class="grid gap-4 font-mono text-sm">
      <div class="rounded-lg bg-zinc-950 p-4 text-emerald-400">
        <p class="text-zinc-500">// +page.ts</p>
        <p>export function load() {'{'}</p>
        <p class="pl-4">return {'{'} titulo: '<span class="text-white">{values.titulo}</span>' {'}'};</p>
        <p>{'}'}</p>
      </div>
      <div class="rounded-lg border border-primary/30 bg-primary/5 p-4">
        <p class="text-xs text-on-surface-variant">// +page.svelte</p>
        <p class="mt-2 font-bold text-primary">{props}</p>
        <input class="mt-3 w-full rounded border px-2 py-1 bg-card" bind:value={values.titulo} />
      </div>
    </div>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} lines={[
      { kind: 'comment', text: '// $props().data' },
      { kind: 'let', key: 'titulo' },
      { kind: 'derived', name: 'props', expr: 'data prop', resultKey: 'props' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
