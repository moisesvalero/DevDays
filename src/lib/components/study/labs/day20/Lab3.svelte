<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	let values = $state({ news: false });
	const msg = $derived(
		values.news ? '¡Gracias por suscribirte!' : 'Marca la casilla para newsletter'
	);
	const results = $derived({ msg });
</script>

<InteractiveLabLayout hint="bind:checked para checkboxes y radios.">
	{#snippet preview()}
		<label
			class="flex cursor-pointer items-start gap-4 rounded-xl border p-6 transition-colors hover:bg-surface-container-low"
		>
			<input type="checkbox" bind:checked={values.news} class="mt-1 size-5 accent-primary" />
			<div>
				<p class="font-semibold">Newsletter semanal</p>
				<p class="mt-2 text-sm text-on-surface-variant">{msg}</p>
			</div>
		</label>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			lines={[
				{ kind: 'comment', text: '// bind:checked' },
				{ kind: 'let', key: 'news' },
				{ kind: 'derived', name: 'msg', expr: 'newsletter', resultKey: 'msg' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
