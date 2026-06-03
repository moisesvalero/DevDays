<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';
	import LiveValue from '../LiveValue.svelte';

	const usuarios = [
		{ id: 1, nombre: 'Ana' },
		{ id: 2, nombre: 'Luis' },
		{ id: 3, nombre: 'Eva' }
	];

	let values = $state({ id: 2 });
	const found = $derived(usuarios.find((u) => u.id === values.id));
	const nombre = $derived(found?.nombre ?? '—');
	const results = $derived({ nombre });
</script>

<InteractiveLabLayout
	hint="find devuelve el primer objeto que cumple id === valor; luego accedes a .nombre."
>
	{#snippet preview()}
		<div class="grid gap-6 lg:grid-cols-2">
			<ul class="space-y-2">
				{#each usuarios as u (u.id)}
					<li>
						<button
							type="button"
							class="w-full rounded-lg border px-4 py-3 text-left transition-all
                {values.id === u.id
								? 'border-primary bg-primary/10'
								: 'border-outline-variant/40 hover:border-primary/30'}"
							onclick={() => (values.id = u.id)}
						>
							<span class="font-mono text-xs text-primary">id {u.id}</span>
							<span class="ml-2 text-sm">{u.nombre}</span>
						</button>
					</li>
				{/each}
			</ul>
			<div class="lab-card-lift rounded-2xl border border-primary/30 bg-card p-6">
				<p class="text-xs uppercase text-on-surface-variant">find() → .nombre</p>
				{#if found}
					<p class="mt-2 text-sm text-on-surface-variant">
						console.log → <span class="font-mono font-bold text-primary"
							><LiveValue value={nombre} /></span
						>
					</p>
					<h3 class="mt-4 text-4xl font-black text-on-surface">{found.nombre}</h3>
				{:else}
					<p class="mt-4 text-destructive">Usuario no encontrado</p>
				{/if}
			</div>
		</div>
	{/snippet}

	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			limits={{ id: { min: 1, max: 3 } }}
			lines={[
				{ kind: 'comment', text: '// usuarios.find(u => u.id === id)' },
				{ kind: 'let', key: 'id' },
				{ kind: 'derived', name: 'nombre', expr: 'find id → .nombre', resultKey: 'nombre' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
