<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	let values = $state({ act: 'Migré el front a SvelteKit con load y forms' });
	const a = $derived(values.act);
	const results = $derived({ a });
</script>

<InteractiveLabLayout hint="A: qué hiciste tú (verbos de acción, técnico pero claro).">
	{#snippet preview()}
		<div class="rounded-xl border-l-4 border-primary bg-primary/5 p-6">
			<p class="text-xs font-bold uppercase text-primary">Acción</p>
			<textarea
				class="mt-2 w-full rounded-lg border bg-card p-3 text-sm"
				rows="3"
				bind:value={values.act}
			></textarea>
		</div>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			lines={[
				{ kind: 'comment', text: '// STAR - Action' },
				{ kind: 'let', key: 'act' },
				{ kind: 'derived', name: 'a', expr: 'action', resultKey: 'a' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
