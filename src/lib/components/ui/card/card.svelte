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
		'group/card flex flex-col gap-4 overflow-hidden rounded-xl border border-slate-200 bg-white py-4 text-sm text-slate-950 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100',
		className
	)}
	{...rest}
>
	{@render children?.()}
</div>
