<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';
	import LiveValue from '../LiveValue.svelte';

	let values = $state({ stock: 0 });
	const disponible = $derived(values.stock > 0);
	const results = $derived({ disponible });
</script>

<InteractiveLabLayout
	hint="Arrow function: stock => stock > 0 — la fila del catálogo se habilita o no."
>
	{#snippet preview()}
		<div class="overflow-hidden rounded-xl border border-outline-variant/40">
			<table class="w-full text-sm">
				<thead
					class="bg-surface-container-high text-left text-xs uppercase text-on-surface-variant"
				>
					<tr
						><th class="px-4 py-2">SKU</th><th class="px-4 py-2">Stock</th><th class="px-4 py-2"
							>Estado</th
						></tr
					>
				</thead>
				<tbody>
					<tr
						class="border-t border-outline-variant/30 {disponible ? 'bg-primary/5' : 'opacity-50'}"
					>
						<td class="px-4 py-3 font-medium">ZAP-001</td>
						<td class="px-4 py-3">
							<input
								type="range"
								min="0"
								max="50"
								bind:value={values.stock}
								class="w-32 accent-primary"
							/>
							<LiveValue value={values.stock} />
						</td>
						<td class="px-4 py-3">
							<span
								class="rounded-full px-3 py-1 text-xs font-bold
                  {disponible
									? 'bg-primary/15 text-primary'
									: 'bg-destructive/15 text-destructive'}"
							>
								{disponible ? 'Disponible' : 'Agotado'}
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	{/snippet}

	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			limits={{ stock: { min: 0, max: 50 } }}
			lines={[
				{ kind: 'comment', text: '// Spec: => stock > 0' },
				{ kind: 'let', key: 'stock' },
				{
					kind: 'derived',
					name: 'estaDisponible',
					expr: 'stock => stock > 0',
					resultKey: 'disponible'
				}
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
