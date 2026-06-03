<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';
	import LiveValue from '../LiveValue.svelte';

	let values = $state({ vip: false });
	const dto = $derived(values.vip ? 20 : 5);
	const results = $derived({ dto });
</script>

<InteractiveLabLayout hint="Factory closure — VIP recibe otro % de descuento.">
	{#snippet preview()}
		<label class="flex items-center gap-4 rounded-xl border border-outline-variant/50 p-5">
			<input type="checkbox" bind:checked={values.vip} class="size-6 accent-primary" />
			<span class="font-medium">Cliente VIP</span>
		</label>
		<div class="mt-6 rounded-2xl bg-tertiary/10 p-8 text-center">
			<p class="text-sm text-on-surface-variant">makeDiscount() →</p>
			<p class="font-mono text-5xl font-black text-tertiary"><LiveValue value={dto} />%</p>
		</div>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			lines={[
				{ kind: 'comment', text: '// factory: makeDiscount(vip)' },
				{ kind: 'let', key: 'vip' },
				{ kind: 'derived', name: 'descuento', expr: 'makeDiscount(vip)', resultKey: 'dto' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
