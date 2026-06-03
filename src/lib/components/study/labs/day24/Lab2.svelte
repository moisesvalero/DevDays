<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';
	import LiveValue from '../LiveValue.svelte';

	let values = $state({ id: 42 });
	const param = $derived(`params.id = ${values.id}`);
	const results = $derived({ param });
</script>

<InteractiveLabLayout hint="En +page.svelte accedes a params desde $props() o load.">
	{#snippet preview()}
		<div class="rounded-xl bg-zinc-950 p-6 font-mono text-sm text-emerald-400">
			<p>// routes/producto/[id]/+page.svelte</p>
			<p class="mt-4 text-zinc-400">const {'{'} id } = $props().params;</p>
			<p class="mt-2">
				console.log(<span class="text-white">"<LiveValue value={values.id} />"</span>);
			</p>
			<label class="mt-6 block text-zinc-500">
				Cambia ID
				<input
					type="range"
					min="1"
					max="99"
					bind:value={values.id}
					class="mt-2 w-full accent-emerald-500"
				/>
			</label>
		</div>
		<p class="mt-3 text-sm font-medium text-primary">{param}</p>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			limits={{ id: { min: 1, max: 99 } }}
			lines={[
				{ kind: 'comment', text: '// params.slug / id' },
				{ kind: 'let', key: 'id' },
				{ kind: 'derived', name: 'param', expr: 'params', resultKey: 'param' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
