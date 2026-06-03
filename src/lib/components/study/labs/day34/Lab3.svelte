<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	let values = $state({ ship: true });
	const next = $derived(values.ship ? 'Deploy → métricas → iterar' : 'Más iteración local');
	const results = $derived({ next });
</script>

<InteractiveLabLayout hint="Cierra con próximos pasos concretos (ship, feedback, v2).">
	{#snippet preview()}
		<div class="space-y-3">
			{#each ['Métricas en Vercel', 'Feedback usuarios', 'Roadmap v2'] as item, i (item)}
				<div
					class="flex items-center gap-3 rounded-lg border px-4 py-3
            {values.ship || i === 0 ? 'border-primary/30' : 'opacity-50'}"
				>
					<span class="text-primary">{values.ship ? '→' : '○'}</span>
					<span class="text-sm">{item}</span>
				</div>
			{/each}
		</div>
		<label class="mt-4 flex items-center gap-2 font-bold">
			<input type="checkbox" bind:checked={values.ship} class="accent-primary" />
			Listo para ship
		</label>
		<p class="mt-2 text-sm text-primary">{next}</p>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			lines={[
				{ kind: 'comment', text: '// next steps' },
				{ kind: 'let', key: 'ship' },
				{ kind: 'derived', name: 'next', expr: 'roadmap', resultKey: 'next' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
