<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	let values = $state({ exito: true });
	const items = $derived(values.exito ? '3 productos' : 'Error 500');
	const results = $derived({ items });
</script>

<InteractiveLabLayout hint="async fetch — catálogo cargado o error de API.">
	{#snippet preview()}
		<label class="flex gap-3 mb-4"
			><input type="checkbox" bind:checked={values.exito} class="accent-primary" /> Fetch OK</label
		>
		<div class="grid grid-cols-3 gap-3">
			{#if values.exito}
				{#each ['Gorra', 'Mochila', 'Pin'] as p (p)}
					<div class="rounded-lg border bg-card p-4 text-center text-sm font-medium">{p}</div>
				{/each}
			{:else}
				<div
					class="col-span-3 rounded-lg bg-destructive/10 p-6 text-center text-destructive font-bold"
				>
					Error 500
				</div>
			{/if}
		</div>
		<p class="mt-4 font-mono text-sm text-primary">{items}</p>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			lines={[
				{ kind: 'let', key: 'exito' },
				{ kind: 'derived', name: 'productos', expr: 'await fetch', resultKey: 'items' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
