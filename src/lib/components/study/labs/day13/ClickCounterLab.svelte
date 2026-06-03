<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';
	import LiveValue from '../LiveValue.svelte';

	let values = $state({ clics: 0 });
	const txt = $derived(`Clics: ${values.clics}`);
	const results = $derived({ txt });
</script>

<InteractiveLabLayout hint="addEventListener click — contador en DOM.">
	{#snippet preview()}
		<button
			type="button"
			class="rounded-xl bg-primary px-8 py-4 text-lg font-bold text-on-primary"
			onclick={() => (values.clics += 1)}
		>
			Clic me
		</button>
		<p class="mt-4 font-mono text-2xl"><LiveValue value={values.clics} /> clics</p>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			limits={{ clics: { min: 0, max: 20 } }}
			lines={[
				{ kind: 'let', key: 'clics' },
				{ kind: 'derived', name: 'label', expr: 'click count', resultKey: 'txt' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
