<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	let values = $state({ visible: true });
	const html = $derived(values.visible ? 'Banner visible' : 'Oculto');
	const results = $derived({ html });
</script>

<InteractiveLabLayout hint="El markup es HTML con expresiones condicionales if/else.">
	{#snippet preview()}
		<div class="space-y-4">
			<label class="flex items-center gap-2 text-sm">
				<input type="checkbox" bind:checked={values.visible} class="accent-primary" />
				Mostrar banner promocional
			</label>
			{#if values.visible}
				<div
					class="rounded-xl bg-gradient-to-r from-primary to-tertiary p-6 text-center font-bold text-on-primary"
				>
					🎉 Envío gratis este fin de semana
				</div>
			{:else}
				<p class="rounded-xl border border-dashed py-8 text-center text-sm text-on-surface-variant">
					(sin banner — rama else)
				</p>
			{/if}
		</div>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			lines={[
				{ kind: 'comment', text: '// markup + if' },
				{ kind: 'let', key: 'visible' },
				{ kind: 'derived', name: 'html', expr: 'if visible', resultKey: 'html' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
