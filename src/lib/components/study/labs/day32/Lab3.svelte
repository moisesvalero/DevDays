<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';
	import LiveValue from '../LiveValue.svelte';

	let values = $state({ mins: 2 });
	const plan = $derived(`Demo ${values.mins} min: login → catálogo → checkout`);
	const results = $derived({ plan });
</script>

<InteractiveLabLayout hint="Guion corto: 3 pantallas que demuestren valor.">
	{#snippet preview()}
		<label class="block rounded-xl border p-6">
			<span class="text-sm">Duración demo</span>
			<input
				type="range"
				min="1"
				max="5"
				bind:value={values.mins}
				class="mt-2 w-full accent-primary"
			/>
			<span class="font-mono text-3xl font-bold"><LiveValue value={values.mins} /> min</span>
		</label>
		<ol class="mt-4 list-decimal space-y-2 pl-6 text-sm">
			<li>Login / auth</li>
			<li>Listado productos (load)</li>
			<li>Form action checkout</li>
		</ol>
		<p class="mt-4 font-medium text-primary">{plan}</p>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			limits={{ mins: { min: 1, max: 5 } }}
			lines={[
				{ kind: 'comment', text: '// demo script' },
				{ kind: 'let', key: 'mins' },
				{ kind: 'derived', name: 'plan', expr: 'demo', resultKey: 'plan' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
