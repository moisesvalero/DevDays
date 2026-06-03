<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	const base = [30, 10, 20];
	let values = $state({ asc: true });
	const ordenados = $derived([...base].sort((a, b) => (values.asc ? a - b : b - a)));
	const orden = $derived(ordenados.join(' · '));
	const results = $derived({ orden });
</script>

<InteractiveLabLayout hint="sort con comparador — la tabla se reordena ascendente o descendente.">
	{#snippet preview()}
		<label class="mb-4 flex items-center gap-3">
			<input type="checkbox" bind:checked={values.asc} class="size-5 accent-primary" />
			<span class="text-sm font-medium">Orden ascendente (a - b)</span>
		</label>
		<div class="space-y-2">
			{#each ordenados as precio, rank (rank)}
				<div
					class="flex items-center gap-4 rounded-lg border border-outline-variant/40 bg-surface-container-low px-4 py-3 transition-all duration-500"
					style="transition-delay: {rank * 80}ms"
				>
					<span
						class="flex size-8 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary"
					>
						{rank + 1}
					</span>
					<span class="font-mono text-xl font-bold">{precio} €</span>
					<div class="ml-auto h-2 flex-1 max-w-[120px] rounded-full bg-primary/20">
						<div class="h-full rounded-full bg-primary" style="width: {(precio / 30) * 100}%"></div>
					</div>
				</div>
			{/each}
		</div>
	{/snippet}

	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			lines={[
				{ kind: 'comment', text: '// Spec: sort((a,b) => a-b)' },
				{ kind: 'let', key: 'asc' },
				{ kind: 'derived', name: 'preciosOrdenados', expr: 'sort asc/desc', resultKey: 'orden' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
