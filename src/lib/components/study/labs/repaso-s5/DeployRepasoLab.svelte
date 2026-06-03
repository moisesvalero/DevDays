<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	const steps = ['git push', 'Vercel build', 'Edge CDN', 'Production'];
	let values = $state({ live: true, step: 3 });
	const url = $derived(
		values.live ? `https://tu-app.vercel.app · ${steps[values.step]}` : 'Solo local'
	);
	const results = $derived({ url });
</script>

<InteractiveLabLayout hint="Del commit al deploy en producción.">
	{#snippet preview()}
		<div class="space-y-4">
			<input type="range" min="0" max="3" bind:value={values.step} class="w-full accent-primary" />
			<div class="flex justify-between gap-1">
				{#each steps as s, i (s)}
					<div class="flex flex-1 flex-col items-center gap-1">
						<div
							class="h-2 w-full rounded-full {i <= values.step
								? 'bg-primary'
								: 'bg-outline-variant/30'}"
						></div>
						<span class="text-[10px] text-center">{s}</span>
					</div>
				{/each}
			</div>
			<label class="flex items-center gap-2 text-sm">
				<input type="checkbox" bind:checked={values.live} />
				Preview en Vercel
			</label>
			<p class="font-mono text-sm font-semibold text-primary">{url}</p>
		</div>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			limits={{ step: { min: 0, max: 3 } }}
			lines={[
				{ kind: 'comment', text: '// vercel prod' },
				{ kind: 'let', key: 'live' },
				{ kind: 'derived', name: 'prod', expr: 'deploy', resultKey: 'url' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
