<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	let values = $state({ ok: true, loading: false });
	const estado = $derived(
		values.loading ? 'Cargando…' : values.ok ? 'Catálogo cargado' : 'Error red'
	);
	const results = $derived({ estado });
</script>

<InteractiveLabLayout hint="Simula fetch: async/await hasta tener datos o error.">
	{#snippet preview()}
		<div class="space-y-4 rounded-xl border border-outline-variant/40 p-6">
			<div class="flex gap-2">
				{#each ['idle', 'loading', 'done', 'error'] as step, i (step)}
					<div
						class="h-2 flex-1 rounded-full transition-colors
              {(values.loading && i === 1) ||
						(!values.loading && values.ok && i <= 2) ||
						(!values.ok && !values.loading && i === 3)
							? 'bg-primary'
							: 'bg-outline-variant/30'}"
					></div>
				{/each}
			</div>
			<label class="flex items-center gap-3">
				<input type="checkbox" bind:checked={values.ok} class="accent-primary" />
				<span class="text-sm">Respuesta HTTP OK</span>
			</label>
			<button
				type="button"
				class="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-on-primary"
				onclick={() => {
					values.loading = true;
					setTimeout(() => {
						values.loading = false;
					}, 800);
				}}
			>
				Simular fetch
			</button>
			<p class="font-mono text-lg font-semibold">{estado}</p>
		</div>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			lines={[
				{ kind: 'comment', text: '// async fetch catalog' },
				{ kind: 'let', key: 'ok' },
				{ kind: 'derived', name: 'fetch', expr: 'await catalog', resultKey: 'estado' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
