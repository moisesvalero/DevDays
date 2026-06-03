<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';
	import LiveValue from '../LiveValue.svelte';

	let values = $state({ count: 4 });
	const filas = $derived(Array.from({ length: values.count }, (_, i) => `SKU-${i + 1}`));
	const results = $derived({ filas: filas.join(' · ') });
</script>

<InteractiveLabLayout hint="for genera filas — la tabla crece según count.">
	{#snippet preview()}
		<label class="mb-4 block max-w-xs space-y-2">
			<span class="text-sm text-on-surface-variant">Filas (for)</span>
			<input type="range" min="1" max="8" bind:value={values.count} class="w-full accent-primary" />
			<span class="font-mono font-bold"><LiveValue value={values.count} /></span>
		</label>
		<div class="overflow-hidden rounded-xl border border-outline-variant/40">
			<table class="w-full text-sm">
				<thead class="bg-surface-container-high text-left text-xs uppercase"
					><tr><th class="px-4 py-2">#</th><th class="px-4 py-2">SKU</th></tr></thead
				>
				<tbody>
					{#each filas as sku, i (sku)}
						<tr
							class="border-t border-outline-variant/30 transition-all duration-300"
							style="animation-delay: {i * 50}ms"
						>
							<td class="px-4 py-2 text-on-surface-variant">{i + 1}</td>
							<td class="px-4 py-2 font-mono font-medium">{sku}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			limits={{ count: { min: 1, max: 8 } }}
			lines={[
				{ kind: 'comment', text: '// for (let i = 0; i < count; i++)' },
				{ kind: 'let', key: 'count' },
				{ kind: 'derived', name: 'filas', expr: 'for 1..count', resultKey: 'filas' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
