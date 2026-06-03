<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	let values = $state({ loading: true });
	const vista = $derived(values.loading ? '⬜ skeleton' : 'Lista cargada');
	const results = $derived({ vista });

	function cargar() {
		values.loading = true;
		setTimeout(() => {
			values.loading = false;
		}, 900);
	}
</script>

<InteractiveLabLayout hint="Mientras load corre, SvelteKit puede mostrar skeleton en la página.">
	{#snippet preview()}
		<div class="space-y-4">
			<button
				type="button"
				class="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-on-primary"
				onclick={cargar}
			>
				Simular load()
			</button>
			{#if values.loading}
				<div class="space-y-2">
					<div class="h-8 animate-pulse rounded bg-outline-variant/30"></div>
					<div class="h-8 animate-pulse rounded bg-outline-variant/30 w-4/5"></div>
					<div class="h-8 animate-pulse rounded bg-outline-variant/30 w-3/5"></div>
				</div>
			{:else}
				<div class="rounded-xl border border-primary/30 bg-primary/5 p-6">
					<p class="font-semibold text-primary">✓ Datos listos</p>
					<p class="mt-2 text-sm">3 productos · 120ms</p>
				</div>
			{/if}
			<p class="font-mono text-sm">{vista}</p>
		</div>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			lines={[
				{ kind: 'comment', text: '// skeleton while loading' },
				{ kind: 'let', key: 'loading' },
				{ kind: 'derived', name: 'vista', expr: 'skeleton', resultKey: 'vista' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
