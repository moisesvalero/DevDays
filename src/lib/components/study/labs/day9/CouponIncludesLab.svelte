<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	let values = $state({ cupon: true });
	const msg = $derived(values.cupon ? 'Cupón SUMMER aplicado' : 'Sin cupón');
	const results = $derived({ msg });
</script>

<InteractiveLabLayout hint="includes / cupón en carrito — banner de descuento.">
	{#snippet preview()}
		<div class="mx-auto max-w-md rounded-2xl border border-outline-variant/50 bg-card p-6">
			<label class="flex items-center gap-3">
				<input type="checkbox" bind:checked={values.cupon} class="size-5 accent-primary" />
				<span class="font-medium">Aplicar cupón SUMMER</span>
			</label>
			<div
				class="mt-6 rounded-xl px-4 py-3 text-center font-semibold transition-all duration-500
          {values.cupon
					? 'bg-primary/15 text-primary'
					: 'bg-surface-container-high text-on-surface-variant'}"
			>
				{msg}
			</div>
		</div>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			lines={[
				{ kind: 'comment', text: '// cupones.includes(SUMMER)' },
				{ kind: 'let', key: 'cupon' },
				{ kind: 'derived', name: 'mensaje', expr: 'includes', resultKey: 'msg' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
