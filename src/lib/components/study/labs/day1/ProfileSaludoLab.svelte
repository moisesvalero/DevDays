<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	let values = $state({ nombre: 'Ana', edad: 30 });
	const saludo = $derived(`Hola, soy ${values.nombre} y tengo ${values.edad} años`);
	const results = $derived({ saludo });
</script>

<InteractiveLabLayout
	hint="Edita nombre o edad en el spec — la ficha y el saludo se actualizan con template literals."
>
	{#snippet preview()}
		<div class="mx-auto max-w-lg">
			<article
				class="lab-card-lift overflow-hidden rounded-2xl border border-outline-variant/50 bg-card shadow-lg"
			>
				<div class="bg-gradient-to-r from-primary/20 to-tertiary/10 px-6 py-8">
					<div class="flex items-center gap-4">
						<div
							class="flex size-20 items-center justify-center rounded-full bg-primary text-3xl font-bold text-on-primary"
						>
							{values.nombre.charAt(0).toUpperCase()}
						</div>
						<div class="flex-1 space-y-3">
							<label class="block">
								<span class="text-[10px] font-bold uppercase text-on-surface-variant"
									>Nombre (const)</span
								>
								<input
									type="text"
									bind:value={values.nombre}
									class="mt-1 w-full rounded-lg border border-outline-variant bg-surface-container-low px-3 py-2 font-medium"
								/>
							</label>
							<label class="block">
								<span class="text-[10px] font-bold uppercase text-on-surface-variant"
									>Edad (const)</span
								>
								<input
									type="range"
									min="18"
									max="99"
									bind:value={values.edad}
									class="mt-1 w-full accent-primary"
								/>
							</label>
						</div>
					</div>
				</div>
				<div class="border-t border-outline-variant/40 px-6 py-5">
					<p class="text-[10px] font-bold uppercase tracking-widest text-primary">
						Salida · console.log
					</p>
					<p class="mt-2 text-lg font-medium leading-relaxed text-on-surface">{saludo}</p>
				</div>
			</article>
			<p class="mt-4 text-center text-xs text-on-surface-variant">
				Misma cadena que construirías con template literals y interpolación en backticks.
			</p>
		</div>
	{/snippet}

	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			limits={{ edad: { min: 18, max: 99 } }}
			lines={[
				{ kind: 'comment', text: '// Spec: template string en ficha' },
				{ kind: 'let', key: 'nombre' },
				{ kind: 'let', key: 'edad' },
				{ kind: 'derived', name: 'saludo', expr: '`Hola, soy ${nombre}`', resultKey: 'saludo' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
