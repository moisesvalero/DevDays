<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	let values = $state({ titulo: 'Hola desde load' });
	const data = $derived(`data: { titulo: "${values.titulo}" }`);
	const results = $derived({ data });
</script>

<InteractiveLabLayout hint="+page.ts load devuelve datos antes del primer render.">
	{#snippet preview()}
		<div class="space-y-4">
			{#if !values.titulo}
				<div class="h-24 animate-pulse rounded-xl bg-outline-variant/20"></div>
			{/if}
			<div class="rounded-xl border border-primary/30 bg-card p-6">
				<p class="text-xs uppercase text-on-surface-variant">+page.svelte recibe</p>
				<input
					class="mt-2 w-full rounded-lg border px-3 py-2 font-mono"
					bind:value={values.titulo}
				/>
				<p class="mt-4 font-mono text-sm text-primary">{data}</p>
			</div>
		</div>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			lines={[
				{ kind: 'comment', text: '// export function load' },
				{ kind: 'let', key: 'titulo' },
				{ kind: 'derived', name: 'load', expr: 'return { titulo }', resultKey: 'data' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
