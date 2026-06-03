<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	const cats = ['Ropa', 'Calzado', 'Accesorios', 'Ofertas', 'Nuevo'];
	let values = $state({ activas: 2 });
	const chips = $derived(cats.slice(0, values.activas));
	const results = $derived({ chips: chips.join(' · ') });
</script>

<InteractiveLabLayout hint="forEach / slice — activa categorías en la barra de chips.">
	{#snippet preview()}
		<label class="mb-4 block max-w-xs space-y-2">
			<span class="text-sm text-on-surface-variant">Categorías activas</span>
			<input
				type="range"
				min="0"
				max="5"
				bind:value={values.activas}
				class="w-full accent-tertiary"
			/>
		</label>
		<div class="flex flex-wrap gap-2">
			{#each cats as cat, i (cat)}
				<span
					class="rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300
            {i < values.activas
						? 'bg-tertiary text-on-tertiary scale-105'
						: 'bg-outline-variant/20 text-on-surface-variant opacity-40'}"
				>
					{cat}
				</span>
			{/each}
		</div>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			limits={{ activas: { min: 0, max: 5 } }}
			lines={[
				{ kind: 'comment', text: '// categorias.slice(0, activas)' },
				{ kind: 'let', key: 'activas' },
				{ kind: 'derived', name: 'chips', expr: 'slice', resultKey: 'chips' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
