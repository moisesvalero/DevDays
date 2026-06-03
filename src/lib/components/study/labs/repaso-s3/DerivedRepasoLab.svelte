<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';
	import LiveValue from '../LiveValue.svelte';

	let values = $state({ base: 100, iva: 21 });
	const impuesto = $derived(Math.round(values.base * (values.iva / 100)));
	const total = $derived(values.base + impuesto);
	const results = $derived({ total });
</script>

<InteractiveLabLayout hint="$derived: el total se recalcula solo al cambiar base o IVA.">
	{#snippet preview()}
		<div class="grid gap-4 sm:grid-cols-3">
			<div class="rounded-xl bg-surface-container-low p-4 text-center">
				<p class="text-xs uppercase">Base</p>
				<input
					type="range"
					min="0"
					max="500"
					bind:value={values.base}
					class="mt-2 w-full accent-primary"
				/>
				<p class="font-mono text-2xl font-bold"><LiveValue value={values.base} />€</p>
			</div>
			<div class="rounded-xl bg-surface-container-low p-4 text-center">
				<p class="text-xs uppercase">IVA</p>
				<input
					type="range"
					min="0"
					max="30"
					bind:value={values.iva}
					class="mt-2 w-full accent-primary"
				/>
				<p class="font-mono text-2xl font-bold"><LiveValue value={values.iva} />%</p>
				<p class="mt-1 text-xs text-on-surface-variant">+{impuesto}€</p>
			</div>
			<div class="rounded-xl border-2 border-primary bg-primary/10 p-4 text-center">
				<p class="text-xs uppercase text-primary">$derived total</p>
				<p class="font-mono text-3xl font-black text-primary"><LiveValue value={total} />€</p>
			</div>
		</div>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			limits={{ base: { min: 0, max: 500 }, iva: { min: 0, max: 30 } }}
			lines={[
				{ kind: 'comment', text: '// $derived IVA' },
				{ kind: 'let', key: 'base' },
				{ kind: 'let', key: 'iva' },
				{ kind: 'derived', name: 'total', expr: 'derived', resultKey: 'total' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
