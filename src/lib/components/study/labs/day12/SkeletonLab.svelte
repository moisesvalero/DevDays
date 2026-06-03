<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	let values = $state({ loading: true });
	const vista = $derived(values.loading ? 'skeleton' : 'Lista cargada');
	const results = $derived({ vista });
</script>

<InteractiveLabLayout hint="loading ? skeleton : data — patrón de carga en UI.">
	{#snippet preview()}
		<label class="flex gap-3 mb-6"
			><input type="checkbox" bind:checked={values.loading} class="accent-primary" /> Cargando</label
		>
		{#if values.loading}
			<div class="space-y-3 animate-pulse">
				<div class="h-12 rounded-lg bg-outline-variant/40"></div>
				<div class="h-12 rounded-lg bg-outline-variant/30"></div>
				<div class="h-12 rounded-lg bg-outline-variant/20"></div>
			</div>
		{:else}
			<ul class="space-y-2 text-sm font-medium">
				<li class="rounded-lg border p-3">Producto A</li>
				<li class="rounded-lg border p-3">Producto B</li>
			</ul>
		{/if}
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			lines={[
				{ kind: 'let', key: 'loading' },
				{ kind: 'derived', name: 'vista', expr: 'loading ? skeleton : data', resultKey: 'vista' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
