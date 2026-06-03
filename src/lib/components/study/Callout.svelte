<script lang="ts">
	import type { Callout } from '$lib/types/lesson';

	let { tipo, texto }: Callout = $props();

	const config = $derived(
		tipo === 'tip'
			? {
					icon: 'lightbulb',
					label: 'Tip',
					borderClass: 'border-tertiary',
					bgClass: 'bg-tertiary-container/15',
					iconClass: 'text-tertiary'
				}
			: tipo === 'warning'
				? {
						icon: 'warning',
						label: 'Cuidado',
						borderClass: 'border-error',
						bgClass: 'bg-error-container/15',
						iconClass: 'text-error'
					}
				: {
						icon: 'info',
						label: 'Nota',
						borderClass: 'border-primary',
						bgClass: 'bg-primary-container/15',
						iconClass: 'text-primary'
					}
	);
</script>

<div class="rounded-lg border-l-4 p-4 {config.borderClass} {config.bgClass}">
	<div class="mb-1 flex items-center gap-2">
		<span class="material-symbols-outlined text-base {config.iconClass}">{config.icon}</span>
		<span class="text-[10px] font-bold uppercase tracking-widest {config.iconClass}"
			>{config.label}</span
		>
	</div>
	<p class="text-sm leading-relaxed text-on-surface">{texto}</p>
</div>
