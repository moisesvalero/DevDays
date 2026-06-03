<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';
	import LiveValue from '../LiveValue.svelte';

	let values = $state({ invalida: false });
	const code = $derived(values.invalida ? 404 : 200);
	const results = $derived({ code });
</script>

<InteractiveLabLayout hint="+error.svelte o throw error(404) cuando la ruta no existe.">
	{#snippet preview()}
		<div class="grid gap-6 lg:grid-cols-2">
			<label class="flex items-center gap-3 rounded-xl border p-6">
				<input type="checkbox" bind:checked={values.invalida} class="accent-primary" />
				<span class="text-sm">Simular URL inexistente</span>
			</label>
			<div
				class="flex flex-col items-center justify-center rounded-xl p-8 text-center
          {values.invalida
					? 'bg-destructive/10 ring-2 ring-destructive/40'
					: 'bg-primary/10 ring-2 ring-primary/30'}"
			>
				<p class="font-mono text-6xl font-black"><LiveValue value={code} /></p>
				<p class="mt-2 text-sm font-medium">
					{values.invalida ? 'Not Found — muestra +error.svelte' : 'OK — render normal'}
				</p>
			</div>
		</div>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			lines={[
				{ kind: 'comment', text: '// 404 handling' },
				{ kind: 'let', key: 'invalida' },
				{ kind: 'derived', name: 'code', expr: 'notFound', resultKey: 'code' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
