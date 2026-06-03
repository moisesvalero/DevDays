<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';
	import LiveValue from '../LiveValue.svelte';

	let values = $state({ base: 100, iva: 21 });
	const impuesto = $derived(Math.round(values.base * (values.iva / 100)));
	const total = $derived(values.base + impuesto);
	const results = $derived({ total });
</script>

<InteractiveLabLayout hint="$derived recalcula impuesto y total sin asignar variables manualmente.">
	{#snippet preview()}
		<div class="overflow-hidden rounded-xl border border-outline-variant/40">
			<table class="w-full text-left text-sm">
				<thead class="bg-surface-container-high">
					<tr>
						<th class="px-4 py-3">Concepto</th>
						<th class="px-4 py-3 text-right">€</th>
					</tr>
				</thead>
				<tbody>
					<tr class="border-t">
						<td class="px-4 py-3">
							Base
							<input
								type="range"
								min="0"
								max="500"
								bind:value={values.base}
								class="mt-1 block w-full accent-primary"
							/>
						</td>
						<td class="px-4 py-3 text-right font-mono font-bold"
							><LiveValue value={values.base} /></td
						>
					</tr>
					<tr class="border-t">
						<td class="px-4 py-3">
							IVA (<input
								type="range"
								min="0"
								max="30"
								bind:value={values.iva}
								class="inline w-20 align-middle accent-primary"
							/>%)
						</td>
						<td class="px-4 py-3 text-right font-mono text-on-surface-variant">+{impuesto}</td>
					</tr>
					<tr class="border-t bg-primary/10 font-bold">
						<td class="px-4 py-3 text-primary">$derived total</td>
						<td class="px-4 py-3 text-right font-mono text-2xl text-primary"
							><LiveValue value={total} /></td
						>
					</tr>
				</tbody>
			</table>
		</div>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			limits={{ base: { min: 0, max: 500 }, iva: { min: 0, max: 30 } }}
			lines={[
				{ kind: 'comment', text: '// $derived precio + IVA' },
				{ kind: 'let', key: 'base' },
				{ kind: 'let', key: 'iva' },
				{ kind: 'derived', name: 'total', expr: 'base * (1 + iva/100)', resultKey: 'total' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
