<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';
	import LiveValue from '../LiveValue.svelte';

	const base = [10, 20, 30];
	let values = $state({ factor: 2 });
	const precios = $derived(base.map((n) => n * values.factor));
	const resultado = $derived(precios.join(', '));
	const results = $derived({ resultado });
</script>

<InteractiveLabLayout hint="map sobre [10,20,30] — cada chip es un precio transformado.">
	{#snippet preview()}
		<div class="space-y-6">
			<label class="block max-w-xs space-y-2">
				<span class="text-sm text-on-surface-variant">Factor map</span>
				<input
					type="range"
					min="1"
					max="5"
					bind:value={values.factor}
					class="w-full accent-primary"
				/>
				<span class="font-mono font-bold">× <LiveValue value={values.factor} /></span>
			</label>
			<div class="flex flex-wrap gap-3">
				{#each base as precio, i (i)}
					<div
						class="rounded-xl border border-outline-variant/40 bg-surface-container-low px-4 py-3 text-center"
					>
						<p class="text-[10px] text-on-surface-variant line-through">{precio}€</p>
						<p class="font-mono text-xl font-bold text-primary">{precios[i]}€</p>
					</div>
				{/each}
			</div>
		</div>
	{/snippet}

	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			limits={{ factor: { min: 1, max: 5 } }}
			lines={[
				{ kind: 'comment', text: '// Spec: [10,20,30].map(n => n * factor)' },
				{ kind: 'let', key: 'factor' },
				{ kind: 'derived', name: 'preciosDoblados', expr: 'map * factor', resultKey: 'resultado' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
