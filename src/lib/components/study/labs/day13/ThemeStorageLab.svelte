<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	let values = $state({ dark: false });
	const theme = $derived(values.dark ? 'dark' : 'light');
	const results = $derived({ theme });
</script>

<InteractiveLabLayout hint="localStorage.theme — preview claro/oscuro.">
	{#snippet preview()}
		<div
			class="rounded-2xl border p-8 transition-colors duration-500
        {values.dark
				? 'bg-zinc-900 text-zinc-100 border-zinc-700'
				: 'bg-white text-zinc-900 border-zinc-200'}"
		>
			<label class="flex items-center gap-3">
				<input type="checkbox" bind:checked={values.dark} class="accent-primary size-5" />
				<span>Modo oscuro (localStorage)</span>
			</label>
			<p class="mt-6 text-sm opacity-70">Tema guardado: <strong>{theme}</strong></p>
		</div>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			lines={[
				{ kind: 'let', key: 'dark' },
				{ kind: 'derived', name: 'theme', expr: 'localStorage.theme', resultKey: 'theme' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
