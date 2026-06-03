<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		size = 'default',
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & { size?: 'default' | 'sm' } = $props();

	const rest = $derived(restProps as Record<string, unknown>);
</script>

<div
	bind:this={ref}
	data-slot="card"
	data-size={size}
	class={cn(
		'bg-card text-card-foreground gap-4 overflow-hidden rounded-md border-2 border-[var(--street-shadow)] py-4 text-sm shadow-[5px_5px_0_var(--street-shadow)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-md *:[img:last-child]:rounded-b-md group/card flex flex-col',
		className
	)}
	{...rest}
>
	{@render children?.()}
</div>
