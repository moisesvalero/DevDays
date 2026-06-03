<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	let values = $state({ cero: 1 });
	const stocks = $derived([5, 0, 3, 0, 2].slice(0, 3 + values.cero));
	const hayAgotado = $derived(stocks.some((s) => s === 0));
	const results = $derived({ agotado: hayAgotado });
</script>

<InteractiveLabLayout hint="some detecta si algún SKU está a 0 — la alerta global se enciende.">
	{#snippet preview()}
		<label class="mb-4 block max-w-xs space-y-2">
			<span class="text-sm text-on-surface-variant">SKUs extra con stock 0</span>
			<input
				type="range"
				min="0"
				max="3"
				bind:value={values.cero}
				class="w-full accent-destructive"
			/>
		</label>
		<div class="flex flex-wrap gap-2">
			{#each stocks as s, i (i)}
				<span
					class="rounded-lg px-4 py-2 font-mono font-bold
            {s === 0 ? 'bg-destructive/15 text-destructive' : 'bg-primary/10 text-primary'}"
				>
					{s}
				</span>
			{/each}
		</div>
		{#if hayAgotado}
			<div
				class="mt-6 flex items-center gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4"
			>
				<span class="material-symbols-outlined text-destructive">warning</span>
				<p class="font-bold text-destructive">some → Hay SKU agotado</p>
			</div>
		{:else}
			<p class="mt-6 text-sm text-primary font-medium">✓ Todo con stock</p>
		{/if}
	{/snippet}

	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			limits={{ cero: { min: 0, max: 3 } }}
			lines={[
				{ kind: 'comment', text: '// Spec: some(stock === 0)' },
				{ kind: 'let', key: 'cero' },
				{ kind: 'derived', name: 'hayAgotado', expr: 'some === 0', resultKey: 'agotado' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
