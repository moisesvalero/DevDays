<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';
	import LiveValue from '../LiveValue.svelte';

	let values = $state({ cajas: 0, entrada: 5 });
	const stockFinal = $derived(values.cajas + values.entrada);
	const results = $derived({ total: stockFinal });
</script>

<InteractiveLabLayout
	hint="Cambia `cajas` o `entrada` en el spec — el almacén recalcula el total al instante."
>
	{#snippet preview()}
		<div class="grid gap-6 lg:grid-cols-2">
			<div class="rounded-xl border border-outline-variant/40 bg-surface-container-low p-6">
				<p class="text-xs font-bold tracking-wider text-primary uppercase">UI · Almacén</p>
				<p class="mt-1 text-sm text-on-surface-variant">
					Simula <code class="text-primary">let cajas</code> y un ingreso de mercancía.
				</p>

				<div class="mt-6 flex items-end gap-4">
					<div class="text-center">
						<p class="text-[10px] uppercase text-on-surface-variant">Stock actual</p>
						<p class="font-mono text-4xl font-black text-on-surface">
							<LiveValue value={values.cajas} />
						</p>
					</div>
					<span class="pb-2 text-2xl text-primary">+</span>
					<div class="text-center">
						<p class="text-[10px] uppercase text-on-surface-variant">Entrada</p>
						<p class="font-mono text-4xl font-black text-primary">
							<LiveValue value={values.entrada} />
						</p>
					</div>
				</div>

				<label class="mt-6 block space-y-2">
					<span class="text-sm text-on-surface-variant">Unidades en stock</span>
					<input
						type="range"
						min="0"
						max="50"
						bind:value={values.cajas}
						class="w-full accent-primary"
					/>
				</label>
				<label class="mt-4 block space-y-2">
					<span class="text-sm text-on-surface-variant">Unidades a sumar</span>
					<input
						type="range"
						min="1"
						max="20"
						bind:value={values.entrada}
						class="w-full accent-primary"
					/>
				</label>
			</div>

			<div
				class="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 p-8 transition-all duration-500"
			>
				<p class="text-sm font-medium text-on-surface-variant">
					Después de <code>cajas += entrada</code>
				</p>
				<p class="mt-4 font-mono text-6xl font-black text-primary">
					<LiveValue value={stockFinal} />
				</p>
				<p class="mt-2 text-xs text-on-surface-variant">unidades en inventario</p>
				<div class="mt-6 flex gap-1">
					{#each Array.from({ length: Math.min(stockFinal, 12) }, (_, i) => i) as _i (_i)}
						<span class="size-3 rounded-sm bg-primary/60"></span>
					{/each}
					{#if stockFinal > 12}
						<span class="text-xs text-on-surface-variant">+{stockFinal - 12}</span>
					{/if}
				</div>
			</div>
		</div>
	{/snippet}

	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			limits={{ cajas: { min: 0, max: 50 }, entrada: { min: 1, max: 20 } }}
			lines={[
				{ kind: 'comment', text: '// Spec: contador con let' },
				{ kind: 'let', key: 'cajas' },
				{ kind: 'let', key: 'entrada' },
				{ kind: 'derived', name: 'stockFinal', expr: 'cajas + entrada', resultKey: 'total' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
