<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';
	import LiveValue from '../LiveValue.svelte';

	const lineas = [5, 10, 15];
	let values = $state({ extra: 0 });
	const subtotal = $derived(lineas.reduce((a, b) => a + b, 0));
	const total = $derived(subtotal + values.extra);
	const results = $derived({ total });
</script>

<InteractiveLabLayout hint="reduce acumula las líneas — extra es otra línea opcional del carrito.">
	{#snippet preview()}
		<div class="mx-auto max-w-sm rounded-2xl border border-outline-variant/50 bg-card p-6">
			<p class="text-xs font-bold uppercase text-primary">Líneas del carrito</p>
			<ul class="mt-3 space-y-2">
				{#each lineas as linea, i (i)}
					<li class="flex justify-between text-sm">
						<span>Producto {i + 1}</span><span class="font-mono">{linea}€</span>
					</li>
				{/each}
				<li class="flex justify-between border-t pt-2 text-sm">
					<span>Extra</span>
					<input
						type="number"
						min="0"
						max="50"
						bind:value={values.extra}
						class="w-14 rounded border px-1 font-mono text-right"
					/>
				</li>
			</ul>
			<p class="mt-6 text-center text-sm text-on-surface-variant">reduce → total</p>
			<p class="text-center font-mono text-5xl font-black text-primary">
				<LiveValue value={total} />€
			</p>
		</div>
	{/snippet}

	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			limits={{ extra: { min: 0, max: 50 } }}
			lines={[
				{ kind: 'comment', text: '// Spec: reduce + extra' },
				{ kind: 'let', key: 'extra' },
				{ kind: 'derived', name: 'total', expr: 'reduce + extra', resultKey: 'total' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
