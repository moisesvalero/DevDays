<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	const links = ['Home', 'Estudio', 'Perfil'];
	let values = $state({ activo: 0 });
	const nav = $derived(links[values.activo]);
	const results = $derived({ nav });
</script>

<InteractiveLabLayout hint="aria-current o clase active cuando $page.url.pathname coincide.">
	{#snippet preview()}
		<ul class="flex gap-2 rounded-xl border border-outline-variant/40 p-4">
			{#each links as label, i (label)}
				<li>
					<button
						type="button"
						class="rounded-full px-4 py-2 text-sm font-medium transition-all
              {values.activo === i
							? 'bg-primary text-on-primary shadow-md'
							: 'text-on-surface-variant hover:bg-surface-container-high'}"
						onclick={() => (values.activo = i)}
					>
						{label}
					</button>
				</li>
			{/each}
		</ul>
		<p class="mt-4 text-sm text-on-surface-variant">
			Link activo: <span class="font-bold text-primary">{nav}</span>
		</p>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			limits={{ activo: { min: 0, max: 2 } }}
			lines={[
				{ kind: 'comment', text: '// nav active state' },
				{ kind: 'let', key: 'activo' },
				{ kind: 'derived', name: 'nav', expr: 'active', resultKey: 'nav' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
