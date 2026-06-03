<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	let values = $state({ brand: true });
	const layout = $derived(values.brand ? 'Header + slot + Footer' : 'Solo contenido');
	const results = $derived({ layout });
</script>

<InteractiveLabLayout hint="+layout.svelte envuelve todas las páginas hijas del segmento.">
	{#snippet preview()}
		<div class="overflow-hidden rounded-xl border border-outline-variant/50 font-mono text-xs">
			{#if values.brand}
				<header class="bg-primary px-4 py-3 font-bold text-on-primary">DevDays · Header</header>
			{/if}
			<main class="min-h-[120px] bg-surface-container-low p-6 text-center text-sm">
				<p
					class="rounded border border-dashed border-primary/40 bg-card px-4 py-8 font-mono text-on-surface-variant"
				>
					&lt;slot /&gt; — aquí va +page.svelte
				</p>
			</main>
			{#if values.brand}
				<footer class="bg-surface-container-high px-4 py-2 text-center text-[10px]">© 2026</footer>
			{/if}
		</div>
		<label class="mt-4 flex items-center gap-2 text-sm">
			<input type="checkbox" bind:checked={values.brand} class="accent-primary" />
			Mostrar shell de marca
		</label>
		<p class="mt-2 font-mono text-sm text-primary">{layout}</p>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			lines={[
				{ kind: 'comment', text: '// +layout.svelte shell' },
				{ kind: 'let', key: 'brand' },
				{ kind: 'derived', name: 'layout', expr: 'shell', resultKey: 'layout' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
