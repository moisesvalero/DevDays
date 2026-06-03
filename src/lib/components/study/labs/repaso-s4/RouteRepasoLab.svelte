<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	const rutas = ['/estudio', '/productos', '/productos/camiseta', '/404'];
	let values = $state({ path: '/estudio' });
	const vista = $derived(`Página: ${values.path}`);
	const results = $derived({ vista });
</script>

<InteractiveLabLayout hint="pathname activo → qué +page.svelte se renderiza.">
	{#snippet preview()}
		<div class="flex flex-col gap-4 sm:flex-row">
			<nav class="flex flex-col gap-1 rounded-xl bg-surface-container-low p-3">
				{#each rutas as r (r)}
					<button
						type="button"
						class="rounded-lg px-3 py-2 text-left font-mono text-sm transition-colors
              {values.path === r ? 'bg-primary text-on-primary font-bold' : 'hover:bg-card'}"
						onclick={() => (values.path = r)}
					>
						{r}
					</button>
				{/each}
			</nav>
			<div
				class="flex flex-1 items-center justify-center rounded-xl border-2 border-dashed border-primary/40 p-8"
			>
				<p class="font-mono text-xl font-semibold">{vista}</p>
			</div>
		</div>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			lines={[
				{ kind: 'comment', text: '// route → page' },
				{ kind: 'let', key: 'path' },
				{ kind: 'derived', name: 'page', expr: 'route', resultKey: 'vista' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
