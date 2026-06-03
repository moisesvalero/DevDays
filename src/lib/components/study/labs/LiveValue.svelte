<script lang="ts">
	let { value }: { value: string | number | boolean } = $props();

	let anterior = $state<string | number | boolean | undefined>(undefined);
	let pulso = $state(false);

	$effect(() => {
		const actual = value;
		if (anterior !== undefined && actual !== anterior) {
			pulso = true;
			const t = setTimeout(() => (pulso = false), 480);
			anterior = actual;
			return () => clearTimeout(t);
		}
		anterior = actual;
	});
</script>

<span
	class="inline-block tabular-nums transition-transform duration-300 {pulso ? 'lab-value-pop' : ''}"
>
	{value}
</span>
