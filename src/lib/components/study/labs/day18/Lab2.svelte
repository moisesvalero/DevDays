<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';
	import LiveValue from '../LiveValue.svelte';

	let values = $state({ stock: 8, umbral: 5 });
	const bajo = $derived(values.stock < values.umbral);
	const alerta = $derived(bajo ? 'Reponer ya' : 'Stock OK');
	const results = $derived({ tag: alerta });
</script>

<InteractiveLabLayout hint="$derived para alertas: la UI cambia de color según stock vs umbral.">
	{#snippet preview()}
		<div class="grid gap-6 lg:grid-cols-2">
			<label class="rounded-xl border p-6 space-y-3">
				<span class="text-sm">Unidades</span>
				<input
					type="range"
					min="0"
					max="20"
					bind:value={values.stock}
					class="w-full accent-primary"
				/>
				<span class="font-mono text-4xl font-black"><LiveValue value={values.stock} /></span>
				<span class="text-sm text-on-surface-variant">Umbral mínimo: {values.umbral}</span>
				<input
					type="range"
					min="1"
					max="15"
					bind:value={values.umbral}
					class="w-full accent-tertiary"
				/>
			</label>
			<div
				class="flex flex-col items-center justify-center rounded-xl p-8 ring-2
          {bajo ? 'bg-destructive/10 ring-destructive/50' : 'bg-primary/10 ring-primary/50'}"
			>
				<span class="text-4xl">{bajo ? '⚠' : '✓'}</span>
				<p class="mt-4 text-xl font-bold"><LiveValue value={alerta} /></p>
				<p class="mt-2 text-xs text-on-surface-variant">stock &lt; umbral → {bajo}</p>
			</div>
		</div>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			limits={{ stock: { min: 0, max: 20 }, umbral: { min: 1, max: 15 } }}
			lines={[
				{ kind: 'comment', text: '// $derived alerta' },
				{ kind: 'let', key: 'stock' },
				{ kind: 'let', key: 'umbral' },
				{ kind: 'derived', name: 'estado', expr: 'stock < umbral', resultKey: 'tag' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
