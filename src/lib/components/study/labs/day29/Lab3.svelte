<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	const estados = ['pending', 'shipped', 'delivered'] as const;
	let values = $state({ estado: 1 });
	const badge = $derived(estados[values.estado]);
	const results = $derived({ badge });
</script>

<InteractiveLabLayout hint="type OrderStatus = 'pending' | 'shipped' | 'delivered'">
	{#snippet preview()}
		<input type="range" min="0" max="2" bind:value={values.estado} class="w-full accent-primary" />
		<div class="mt-6 flex justify-center gap-2">
			{#each estados as e, i (e)}
				<span
					class="rounded-full px-3 py-1 text-xs font-bold uppercase
            {values.estado === i
						? 'bg-primary text-on-primary'
						: 'bg-surface-container-high opacity-50'}"
				>
					{e}
				</span>
			{/each}
		</div>
		<p class="mt-4 text-center font-mono text-lg font-bold text-primary">{badge}</p>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			limits={{ estado: { min: 0, max: 2 } }}
			lines={[
				{ kind: 'comment', text: '// union OrderStatus' },
				{ kind: 'let', key: 'estado' },
				{ kind: 'derived', name: 'badge', expr: 'OrderStatus', resultKey: 'badge' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
