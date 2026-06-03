<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';
	import LiveValue from '../LiveValue.svelte';

	let values = $state({ base: 5, urgente: 3 });
	const envio = $derived(values.base + values.urgente);
	const results = $derived({ envio });
</script>

<InteractiveLabLayout hint="function calcularEnvio — suma base + suplemento visible en el ticket.">
	{#snippet preview()}
		<div
			class="mx-auto max-w-sm rounded-2xl border border-outline-variant/50 bg-card p-6 shadow-md"
		>
			<p class="text-xs font-bold uppercase text-primary">Ticket de envío</p>
			<div class="mt-4 space-y-2 text-sm">
				<div class="flex justify-between">
					<span class="text-on-surface-variant">Base</span>
					<input
						type="number"
						min="0"
						max="20"
						bind:value={values.base}
						class="w-16 rounded border px-2 font-mono text-right"
					/>
				</div>
				<div class="flex justify-between">
					<span class="text-on-surface-variant">Urgente</span>
					<input
						type="number"
						min="0"
						max="15"
						bind:value={values.urgente}
						class="w-16 rounded border px-2 font-mono text-right"
					/>
				</div>
				<div class="border-t border-outline-variant/50 pt-3 flex justify-between font-bold">
					<span>calcularEnvio()</span>
					<span class="font-mono text-2xl text-primary"><LiveValue value={envio} /> €</span>
				</div>
			</div>
		</div>
	{/snippet}

	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			limits={{ base: { min: 0, max: 20 }, urgente: { min: 0, max: 15 } }}
			lines={[
				{ kind: 'comment', text: '// Spec: function calcularEnvio' },
				{ kind: 'let', key: 'base' },
				{ kind: 'let', key: 'urgente' },
				{ kind: 'derived', name: 'calcularEnvio', expr: 'base + urgente', resultKey: 'envio' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
