<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';
	import LiveValue from '../LiveValue.svelte';

	let values = $state({ precio: 100, dto: 10 });
	const final = $derived(Math.round(values.precio * (1 - values.dto / 100)));
	const results = $derived({ final });
</script>

<InteractiveLabLayout
	hint="Parámetro por defecto en descuento — precioFinal recalcula al cambiar dto."
>
	{#snippet preview()}
		<div class="grid gap-6 sm:grid-cols-2">
			<label
				class="rounded-xl border border-outline-variant/40 bg-surface-container-low p-5 space-y-2"
			>
				<span class="text-sm text-on-surface-variant">Precio lista (€)</span>
				<input
					type="range"
					min="10"
					max="500"
					bind:value={values.precio}
					class="w-full accent-primary"
				/>
				<span class="font-mono text-2xl font-bold"><LiveValue value={values.precio} /></span>
			</label>
			<label
				class="rounded-xl border border-outline-variant/40 bg-surface-container-low p-5 space-y-2"
			>
				<span class="text-sm text-on-surface-variant">Descuento % (default 10)</span>
				<input
					type="range"
					min="0"
					max="50"
					bind:value={values.dto}
					class="w-full accent-tertiary"
				/>
				<span class="font-mono text-2xl font-bold text-tertiary"
					><LiveValue value={values.dto} />%</span
				>
			</label>
		</div>
		<div class="mt-6 rounded-2xl bg-primary/10 p-6 text-center">
			<p class="text-sm text-on-surface-variant">precioFinal(precio, dto)</p>
			<p class="mt-2 font-mono text-5xl font-black text-primary"><LiveValue value={final} /> €</p>
		</div>
	{/snippet}

	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			limits={{ precio: { min: 10, max: 500 }, dto: { min: 0, max: 50 } }}
			lines={[
				{ kind: 'comment', text: '// Spec: default dto = 10' },
				{ kind: 'let', key: 'precio' },
				{ kind: 'let', key: 'dto' },
				{ kind: 'derived', name: 'precioFinal', expr: 'precio * (1-dto/100)', resultKey: 'final' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
