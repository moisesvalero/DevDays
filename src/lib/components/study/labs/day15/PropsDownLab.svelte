<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	let values = $state({ titulo: 'Ofertas' });
	const render = $derived(`Card: ${values.titulo}`);
	const results = $derived({ render });
</script>

<InteractiveLabLayout hint="Props down — el padre pasa titulo al hijo Card.">
	{#snippet preview()}
		<div class="grid gap-4 sm:grid-cols-2">
			<div class="rounded-lg border border-dashed p-4 text-xs text-on-surface-variant">Padre</div>
			<div class="lab-card-lift rounded-xl border-2 border-primary/30 bg-card p-5">
				<p class="text-[10px] uppercase text-primary">Card hijo</p>
				<input
					type="text"
					bind:value={values.titulo}
					class="mt-2 w-full font-bold text-lg border-b"
				/>
			</div>
		</div>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			lines={[
				{ kind: 'let', key: 'titulo' },
				{ kind: 'derived', name: 'hijo', expr: 'Card title', resultKey: 'render' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
