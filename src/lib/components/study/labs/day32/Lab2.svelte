<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	let values = $state({ svelte: true, supabase: true, vercel: true });
	const stack = $derived(
		[values.svelte && 'SvelteKit', values.supabase && 'Supabase', values.vercel && 'Vercel']
			.filter(Boolean)
			.join(' + ')
	);
	const results = $derived({ stack });
</script>

<InteractiveLabLayout hint="Explica por qué elegiste cada pieza del stack.">
	{#snippet preview()}
		<div class="flex flex-wrap gap-2">
			{#each [['svelte', 'SvelteKit'], ['supabase', 'Supabase'], ['vercel', 'Vercel']] as [k, label] (k)}
				<label
					class="flex items-center gap-2 rounded-full border px-4 py-2 {values[
						k as keyof typeof values
					]
						? 'border-primary bg-primary/10'
						: ''}"
				>
					<input type="checkbox" bind:checked={values[k as 'svelte' | 'supabase' | 'vercel']} />
					{label}
				</label>
			{/each}
		</div>
		<p class="mt-6 text-xl font-bold text-primary">{stack || '—'}</p>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			lines={[
				{ kind: 'comment', text: '// stack choice' },
				{ kind: 'let', key: 'svelte' },
				{ kind: 'derived', name: 'stack', expr: 'tech', resultKey: 'stack' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
