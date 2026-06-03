<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';
	import LiveValue from '../LiveValue.svelte';

	let values = $state({ clicks: 0 });
	const evento = $derived(`Seleccionado ${values.clicks} veces`);
	const results = $derived({ evento });
</script>

<InteractiveLabLayout hint="Events up — el hijo notifica clicks al padre.">
	{#snippet preview()}
		<div class="flex flex-col items-center gap-4">
			<button
				type="button"
				class="rounded-xl bg-primary px-6 py-3 font-bold text-on-primary"
				onclick={() => values.clicks++}
			>
				Hijo: dispatch click
			</button>
			<p class="text-sm text-on-surface-variant">
				Padre recibe: <LiveValue value={values.clicks} />
			</p>
		</div>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			limits={{ clicks: { min: 0, max: 10 } }}
			lines={[
				{ kind: 'let', key: 'clicks' },
				{ kind: 'derived', name: 'onSelect', expr: 'dispatch', resultKey: 'evento' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
