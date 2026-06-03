<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	let values = $state({ pro: false });
	const results = $derived({ cls: values.pro ? 'card pro' : 'card' });
</script>

<InteractiveLabLayout hint="&lt;style&gt; scoped solo afecta a este componente (.card).">
	{#snippet preview()}
		<label class="mb-4 flex items-center gap-2 text-sm">
			<input type="checkbox" bind:checked={values.pro} class="accent-primary" />
			Plan Pro (estilo scoped)
		</label>
		<div
			class="card-demo rounded-2xl border-2 p-8 text-center transition-all
        {values.pro ? 'border-amber-400 bg-amber-50' : 'border-outline-variant bg-card'}"
		>
			<p class="text-xl font-bold {values.pro ? 'text-amber-800' : 'text-on-surface'}">
				{values.pro ? '⭐ Pro' : 'Plan básico'}
			</p>
			<p class="mt-2 text-sm opacity-80">class solo en este .svelte</p>
		</div>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			lines={[
				{ kind: 'comment', text: '// style scoped' },
				{ kind: 'let', key: 'pro' },
				{ kind: 'derived', name: 'cls', expr: '.card.pro', resultKey: 'cls' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>

<style>
	:global(.card-demo) {
		box-shadow: 0 4px 24px rgb(0 0 0 / 0.06);
	}
</style>
