<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	let values = $state({ seg: 2 });
	const msg = $derived(`Enviado en ${values.seg}s`);
	const results = $derived({ msg });
</script>

<InteractiveLabLayout hint="setTimeout — barra de progreso hasta confirmar envío.">
	{#snippet preview()}
		<label class="block max-w-xs space-y-2">
			<span class="text-sm">Segundos (setTimeout)</span>
			<input type="range" min="1" max="5" bind:value={values.seg} class="w-full accent-tertiary" />
		</label>
		<div class="mt-4 h-3 overflow-hidden rounded-full bg-outline-variant/30">
			<div
				class="h-full bg-tertiary transition-all duration-500"
				style="width: {(values.seg / 5) * 100}%"
			></div>
		</div>
		<p class="mt-4 font-mono text-lg font-semibold text-tertiary">{msg}</p>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			limits={{ seg: { min: 1, max: 5 } }}
			lines={[
				{ kind: 'let', key: 'seg' },
				{ kind: 'derived', name: 'mensaje', expr: 'delay seg', resultKey: 'msg' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
