<script lang="ts">
	import type { LabBlockConfig, LabValues } from '$lib/types/laboratorio';
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';
	import PremiumLabPreview from './PremiumLabPreview.svelte';

	let { config }: { config: LabBlockConfig } = $props();

	let values = $state<LabValues>(
		Object.fromEntries(config.fields.map((f) => [f.key, f.default])) as LabValues
	);

	const results = $derived(
		Object.fromEntries(config.derived.map((d) => [d.resultKey, d.compute(values)]))
	);

	const limits = $derived(
		Object.fromEntries(
			config.fields
				.filter((f) => f.kind === 'number')
				.map((f) => [f.key, { min: f.min, max: f.max }])
		)
	);
</script>

<InteractiveLabLayout
	hint={config.hint ?? 'Edita el código en vivo — la vista reacciona al instante.'}
>
	{#snippet preview()}
		<PremiumLabPreview {config} bind:values {results} />
	{/snippet}

	{#snippet spec()}
		<LiveSpecPanel bind:values {results} {limits} lines={config.specLines} />
	{/snippet}
</InteractiveLabLayout>
