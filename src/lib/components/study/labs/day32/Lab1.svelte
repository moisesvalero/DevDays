<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	let values = $state({ pain: 'Onboarding lento' });
	const hook = $derived(`Problema: ${values.pain}`);
	const results = $derived({ hook });
</script>

<InteractiveLabLayout hint="Empieza el pitch con el dolor del usuario, no con la tecnología.">
	{#snippet preview()}
		<textarea
			class="w-full rounded-xl border p-4 text-lg font-medium leading-relaxed"
			rows="3"
			bind:value={values.pain}
		></textarea>
		<p class="mt-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
			{hook}
		</p>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			lines={[
				{ kind: 'comment', text: '// problem hook' },
				{ kind: 'let', key: 'pain' },
				{ kind: 'derived', name: 'hook', expr: 'problem', resultKey: 'hook' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
