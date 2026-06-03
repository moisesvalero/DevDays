<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	let values = $state({ titulo: 'Auriculares', precio: 49 });
	const card = $derived(`${values.titulo} — ${values.precio}€`);
	const results = $derived({ card });
</script>

<InteractiveLabLayout hint="$props: titulo y precio obligatorios desde el padre.">
	{#snippet preview()}
		<div class="max-w-xs rounded-2xl border border-outline-variant/50 bg-card p-6 shadow-lg">
			<p class="text-[10px] font-bold uppercase text-on-surface-variant">Card.svelte · $props</p>
			<input class="mt-3 w-full rounded-lg border px-3 py-2 font-bold" bind:value={values.titulo} />
			<input
				type="range"
				min="1"
				max="200"
				bind:value={values.precio}
				class="mt-4 w-full accent-primary"
			/>
			<p class="mt-2 font-mono text-2xl font-black text-primary">{values.precio}€</p>
			<p class="mt-4 rounded-lg bg-surface-container-high px-3 py-2 text-center font-mono text-sm">
				{card}
			</p>
		</div>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			limits={{ precio: { min: 1, max: 200 } }}
			lines={[
				{ kind: 'comment', text: '// $props required' },
				{ kind: 'let', key: 'titulo' },
				{ kind: 'let', key: 'precio' },
				{ kind: 'derived', name: 'card', expr: 'Card props', resultKey: 'card' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
