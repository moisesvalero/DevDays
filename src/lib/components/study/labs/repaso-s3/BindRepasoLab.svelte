<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	let values = $state({ email: 'test@dev.com' });
	const valid = $derived(String(values.email).includes('@'));
	const results = $derived({ valid });
</script>

<InteractiveLabLayout hint="bind:value — two-way entre input y estado.">
	{#snippet preview()}
		<label class="block max-w-md space-y-2 rounded-xl border border-outline-variant/40 p-6">
			<span class="text-sm font-medium">Email (bind)</span>
			<input
				type="email"
				class="w-full rounded-lg border px-3 py-2 font-mono"
				bind:value={values.email}
			/>
			<span
				class="inline-flex rounded-full px-3 py-1 text-xs font-bold
          {valid ? 'bg-primary/15 text-primary' : 'bg-destructive/15 text-destructive'}"
			>
				{valid ? 'Válido (@ presente)' : 'Falta @'}
			</span>
		</label>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			lines={[
				{ kind: 'comment', text: '// bind input' },
				{ kind: 'let', key: 'email' },
				{ kind: 'derived', name: 'ok', expr: 'includes @', resultKey: 'valid' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
