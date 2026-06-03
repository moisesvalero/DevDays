<script lang="ts">
	import type { LabValues } from '$lib/types/laboratorio';

	export type SpecLine =
		| { kind: 'comment'; text: string }
		| { kind: 'let'; key: string }
		| { kind: 'derived'; name: string; expr: string; resultKey: string }
		| { kind: 'raw'; text: string };

	let {
		title = 'spec.ts',
		lines,
		values = $bindable(),
		results = {},
		limits = {}
	}: {
		title?: string;
		lines: SpecLine[];
		values: LabValues;
		results?: Record<string, string | number | boolean>;
		limits?: Record<string, { min?: number; max?: number }>;
	} = $props();

	let flashResults = $state<Set<string>>(new Set());
	let prevResults = $state<Record<string, string | number | boolean>>({});

	$effect(() => {
		const next = new Set<string>();
		for (const key of Object.keys(results)) {
			if (prevResults[key] !== undefined && prevResults[key] !== results[key]) {
				next.add(key);
			}
		}
		if (next.size > 0) {
			flashResults = new Set([...flashResults, ...next]);
			const t = setTimeout(() => {
				flashResults = new Set([...flashResults].filter((k) => !next.has(k)));
			}, 700);
			prevResults = { ...results };
			return () => clearTimeout(t);
		}
		prevResults = { ...results };
	});

	function setNumber(key: string, raw: string) {
		const lim = limits[key];
		let n = Number(raw);
		if (Number.isNaN(n)) return;
		if (lim?.min != null) n = Math.max(lim.min, n);
		if (lim?.max != null) n = Math.min(lim.max, n);
		values[key] = n;
	}

	function setString(key: string, raw: string) {
		values[key] = raw;
	}

	function toggleBool(key: string) {
		values[key] = !values[key];
	}
</script>

<div
	class="overflow-hidden rounded-xl border border-primary/30 bg-[#0a0812] shadow-lg shadow-primary/10 lab-spec-enter"
>
	<div class="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
		<span class="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"></span>
		<span class="h-2.5 w-2.5 rounded-full bg-[#febc2e]"></span>
		<span class="h-2.5 w-2.5 rounded-full bg-[#28c840]"></span>
		<span class="ml-2 font-mono text-[10px] tracking-widest text-white/45 uppercase">{title}</span>
		<span
			class="ml-auto flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold text-emerald-400"
		>
			<span class="relative flex h-1.5 w-1.5">
				<span
					class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"
				></span>
				<span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
			</span>
			LIVE
		</span>
	</div>

	<div class="space-y-1.5 p-4 font-mono text-[12px] leading-relaxed">
		{#each lines as line, i (i)}
			{#if line.kind === 'comment'}
				<p class="text-white/35">{line.text}</p>
			{:else if line.kind === 'let'}
				{@const val = values[line.key]}
				{@const lim = limits[line.key]}
				<p class="flex flex-wrap items-center gap-1 text-slate-300">
					<span class="text-violet-300">let</span>
					<span class="text-sky-200">{line.key}</span>
					<span class="text-white/50">=</span>
					{#if typeof val === 'boolean'}
						<button
							type="button"
							onclick={() => toggleBool(line.key)}
							class="lab-editable-token rounded px-2 py-0.5 font-bold transition-all hover:brightness-110
                {val ? 'bg-emerald-500/25 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}"
						>
							{val}
						</button>
					{:else if typeof val === 'string'}
						<input
							type="text"
							value={val}
							oninput={(e) => setString(line.key, e.currentTarget.value)}
							class="lab-editable-token min-w-[4rem] rounded border border-amber-400/40 bg-amber-400/10 px-1.5 py-0.5 font-bold text-amber-200 outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-400/50"
						/>
					{:else}
						<input
							type="number"
							value={val}
							min={lim?.min}
							max={lim?.max}
							oninput={(e) => setNumber(line.key, e.currentTarget.value)}
							class="lab-editable-token w-14 rounded border border-amber-400/40 bg-amber-400/10 px-1.5 py-0.5 text-center font-bold text-amber-200 outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-400/50"
						/>
					{/if}
					<span class="text-white/50">;</span>
				</p>
			{:else if line.kind === 'derived'}
				<p class="flex flex-wrap items-center gap-x-1 gap-y-0.5">
					<span class="text-violet-300">const</span>
					<span class="text-sky-200">{line.name}</span>
					<span class="text-white/50">=</span>
					<span class="text-emerald-200/90">{line.expr};</span>
					{#if results[line.resultKey] !== undefined}
						<span
							class="ml-1 rounded px-1.5 py-0.5 text-[11px] font-bold transition-all duration-300
                {flashResults.has(line.resultKey)
								? 'bg-primary/40 text-white lab-result-flash'
								: 'bg-white/10 text-amber-200'}"
						>
							→ {results[line.resultKey]}
						</span>
					{/if}
				</p>
			{:else if line.kind === 'raw'}
				<p class="text-emerald-200/80">{line.text}</p>
			{/if}
		{/each}
	</div>
</div>
