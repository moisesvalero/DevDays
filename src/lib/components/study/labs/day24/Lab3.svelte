<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	let values = $state({ found: true });
	const view = $derived(values.found ? 'Detalle producto' : '404 Not Found');
	const results = $derived({ view });
</script>

<InteractiveLabLayout hint="Si el slug no existe en BD, error(404) desde load o +page.server.">
	{#snippet preview()}
		<div class="grid gap-6 lg:grid-cols-2">
			<label class="flex items-center gap-3 rounded-xl border p-6">
				<input type="checkbox" bind:checked={values.found} class="accent-primary" />
				<span class="text-sm">Producto existe en catálogo</span>
			</label>
			<div
				class="flex items-center justify-center rounded-xl p-8 text-center font-bold
          {values.found ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}"
			>
				{view}
			</div>
		</div>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			lines={[
				{ kind: 'comment', text: '// 404 producto' },
				{ kind: 'let', key: 'found' },
				{ kind: 'derived', name: 'view', expr: 'found', resultKey: 'view' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
