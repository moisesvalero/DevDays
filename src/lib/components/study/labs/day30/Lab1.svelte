<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	let values = $state({ configured: true });
	const client = $derived(values.configured ? 'PUBLIC_SUPABASE_URL ✓' : 'Falta .env');
	const results = $derived({ client });
</script>

<InteractiveLabLayout hint="PUBLIC_* se expone al navegador; nunca secretos ahí.">
	{#snippet preview()}
		<div class="rounded-xl border border-primary/30 bg-primary/5 p-6 font-mono text-sm">
			<p class="text-on-surface-variant"># .env</p>
			<p class="mt-2">PUBLIC_SUPABASE_URL=https://...</p>
			<label class="mt-4 flex items-center gap-2">
				<input type="checkbox" bind:checked={values.configured} class="accent-primary" />
				Variables cargadas
			</label>
			<p class="mt-3 font-bold text-primary">{client}</p>
		</div>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			lines={[
				{ kind: 'comment', text: '// PUBLIC_ env' },
				{ kind: 'let', key: 'configured' },
				{ kind: 'derived', name: 'client', expr: 'PUBLIC_', resultKey: 'client' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
