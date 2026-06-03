<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	let values = $state({ nombre: 'Bolso', precio: 45 });
	const ok = $derived(typeof values.precio === 'number' && values.nombre.length > 0);
	const results = $derived({ ok });
</script>

<InteractiveLabLayout hint="interface Producto con nombre string y precio number.">
	{#snippet preview()}
		<div class="rounded-xl border p-6 font-mono text-sm">
			<p class="text-xs text-primary font-bold">interface Producto</p>
			<input class="mt-3 w-full rounded border px-2 py-1" bind:value={values.nombre} />
			<input
				type="number"
				class="mt-2 w-full rounded border px-2 py-1"
				bind:value={values.precio}
			/>
			<p class="mt-4 text-xs {ok ? 'text-primary' : 'text-destructive'}">
				{ok ? '✓ Cumple Producto' : '✗ Tipos incorrectos'}
			</p>
		</div>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			limits={{ precio: { min: 0, max: 300 } }}
			lines={[
				{ kind: 'comment', text: '// interface Producto' },
				{ kind: 'let', key: 'nombre' },
				{ kind: 'let', key: 'precio' },
				{ kind: 'derived', name: 'ok', expr: 'Producto', resultKey: 'ok' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
