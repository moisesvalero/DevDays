<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';
	import LiveValue from '../LiveValue.svelte';

	let values = $state({ clics: 1 });
	const visitas = $derived(values.clics + 1);
	const results = $derived({ visitas });
</script>

<InteractiveLabLayout hint="Closure privado — cada clic incrementa el contador encapsulado.">
	{#snippet preview()}
		<div class="text-center">
			<p class="text-6xl font-black text-primary"><LiveValue value={visitas} /></p>
			<p class="mt-2 text-sm text-on-surface-variant">visitas (closure)</p>
			<button
				type="button"
				class="mt-6 rounded-xl bg-primary px-8 py-3 font-bold text-on-primary"
				onclick={() => (values.clics += 1)}
			>
				Simular clic
			</button>
			<input
				type="range"
				min="0"
				max="10"
				bind:value={values.clics}
				class="mt-4 w-full max-w-xs accent-primary"
			/>
		</div>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			limits={{ clics: { min: 0, max: 10 } }}
			lines={[
				{ kind: 'comment', text: '// closure: let count = () => ...' },
				{ kind: 'let', key: 'clics' },
				{ kind: 'derived', name: 'visitas', expr: 'closure count', resultKey: 'visitas' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
