<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';
	import LiveValue from '../LiveValue.svelte';

	let values = $state({ nombre: 'Moisés', ciudad: 'Alcoy' });
	const mensaje = $derived(`Envío para ${values.nombre} hacia ${values.ciudad}`);
	const results = $derived({ envio: mensaje });
</script>

<InteractiveLabLayout
	hint="Repaso semana 1 · Reto 1: replica este mensaje en consola con template literals."
>
	{#snippet preview()}
		<div class="grid gap-6 lg:grid-cols-2">
			<div
				class="rounded-xl border border-outline-variant/40 bg-surface-container-low p-6 space-y-4"
			>
				<p class="text-xs font-bold uppercase tracking-wider text-primary">Ficha de envío</p>
				<label class="block space-y-1">
					<span class="text-sm text-on-surface-variant">Nombre</span>
					<input
						class="w-full rounded-lg border border-outline-variant bg-card px-3 py-2 font-mono"
						bind:value={values.nombre}
					/>
				</label>
				<label class="block space-y-1">
					<span class="text-sm text-on-surface-variant">Ciudad</span>
					<input
						class="w-full rounded-lg border border-outline-variant bg-card px-3 py-2 font-mono"
						bind:value={values.ciudad}
					/>
				</label>
			</div>
			<div
				class="flex flex-col justify-center rounded-xl border-2 border-dashed border-tertiary/50 bg-tertiary/5 p-8"
			>
				<p class="text-xs uppercase text-on-surface-variant">Salida del reto</p>
				<p class="mt-3 font-mono text-lg font-semibold leading-relaxed text-on-surface">
					<LiveValue value={mensaje} />
				</p>
			</div>
		</div>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			lines={[
				{ kind: 'comment', text: '// Repaso: variables + template' },
				{ kind: 'let', key: 'nombre' },
				{ kind: 'let', key: 'ciudad' },
				{
					kind: 'derived',
					name: 'mensaje',
					expr: '`Envío para ${nombre} hacia ${ciudad}`',
					resultKey: 'envio'
				}
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
