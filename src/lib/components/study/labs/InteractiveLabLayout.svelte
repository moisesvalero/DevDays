<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		preview,
		spec,
		hint = 'Edita el código en vivo → la vista reacciona al instante.'
	}: {
		preview: Snippet;
		spec: Snippet;
		hint?: string;
	} = $props();
</script>

<div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(300px,380px)] xl:items-start">
	<div class="lab-preview-enter space-y-4">
		{@render preview()}
	</div>
	<aside class="xl:sticky xl:top-20">
		<p
			class="mb-2 flex items-center gap-2 text-[10px] font-bold tracking-widest text-primary uppercase"
		>
			<span class="material-symbols-outlined text-sm">code</span>
			Código en vivo
		</p>
		{@render spec()}
		<p class="mt-3 text-xs leading-relaxed text-on-surface-variant">{hint}</p>
	</aside>
</div>
