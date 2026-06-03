<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	let values = $state({ svelte: true, supabase: true, vercel: true });
	const stack = $derived(
		[values.svelte && 'SvelteKit', values.supabase && 'Supabase', values.vercel && 'Vercel']
			.filter(Boolean)
			.join(' + ') || '—'
	);
	const results = $derived({ stack });
</script>

<InteractiveLabLayout hint="Visión del stack del taller final.">
	{#snippet preview()}
		<div class="flex flex-wrap gap-3">
			{#each [['svelte', 'SvelteKit'], ['supabase', 'Supabase'], ['vercel', 'Vercel']] as [key, label] (key)}
				<label
					class="flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors
            {values[key as keyof typeof values]
						? 'border-primary bg-primary/10 text-primary'
						: 'opacity-60'}"
				>
					<input
						type="checkbox"
						bind:checked={values[key as 'svelte' | 'supabase' | 'vercel']}
						class="accent-primary"
					/>
					{label}
				</label>
			{/each}
		</div>
		<p class="mt-6 font-mono text-lg font-bold">{stack}</p>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			lines={[
				{ kind: 'comment', text: '// full stack' },
				{ kind: 'let', key: 'svelte' },
				{ kind: 'derived', name: 'tech', expr: 'stack', resultKey: 'stack' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
