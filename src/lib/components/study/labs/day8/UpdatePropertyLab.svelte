<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';
	import LiveValue from '../LiveValue.svelte';

	let values = $state({ stock: 2 });
	const puedeVender = $derived(values.stock > 0);
	const results = $derived({ ok: puedeVender });
</script>

<InteractiveLabLayout hint="pedido.stock = valor — mutación visible en el objeto pedido.">
	{#snippet preview()}
		<div
			class="mx-auto max-w-md rounded-xl border border-outline-variant/40 bg-surface-container-low p-6"
		>
			<p class="text-xs font-bold uppercase text-primary">pedido = &#123; stock &#125;</p>
			<label class="mt-4 block space-y-2">
				<span class="text-sm">pedido.stock</span>
				<input
					type="range"
					min="0"
					max="99"
					bind:value={values.stock}
					class="w-full accent-primary"
				/>
				<span class="font-mono text-3xl font-bold"><LiveValue value={values.stock} /></span>
			</label>
			<button
				type="button"
				disabled={!puedeVender}
				class="mt-6 w-full rounded-xl py-3 font-bold {puedeVender
					? 'bg-primary text-on-primary'
					: 'bg-outline-variant/30 text-on-surface-variant'}"
			>
				{puedeVender ? 'Vender SKU' : 'Sin stock'}
			</button>
		</div>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			limits={{ stock: { min: 0, max: 99 } }}
			lines={[
				{ kind: 'comment', text: '// pedido.stock = …' },
				{ kind: 'let', key: 'stock' },
				{ kind: 'derived', name: 'puedeVender', expr: 'stock > 0', resultKey: 'ok' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
