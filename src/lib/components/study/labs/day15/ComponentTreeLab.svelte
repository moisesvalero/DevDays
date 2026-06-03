<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	let values = $state({ pagina: 'Home' });
	const vista = $derived(`App → ${values.pagina}`);
	const results = $derived({ ruta: vista });
</script>

<InteractiveLabLayout hint="Árbol App > Page — cambia la página activa.">
	{#snippet preview()}
		<div class="rounded-xl border border-outline-variant/40 p-4 font-mono text-sm">
			<p class="font-bold text-primary">App.svelte</p>
			<p class="pl-4 mt-1">└─ Layout</p>
			<p class="pl-8 text-tertiary">
				└─ <input type="text" bind:value={values.pagina} class="rounded border px-2 bg-card" />
			</p>
		</div>
		<p class="mt-4 text-center font-semibold">{vista}</p>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			lines={[
				{ kind: 'let', key: 'pagina' },
				{ kind: 'derived', name: 'vista', expr: 'App > Page', resultKey: 'ruta' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
