<script lang="ts">
	let open = $state(false);

	const shortcuts = [
		{
			label: 'Incidencias IT',
			description: 'Practica lectura de ticket, diagnóstico, respuesta y escalado.',
			href: '/estudio',
			icon: 'confirmation_number'
		},
		{
			label: 'Terminal diaria',
			description: 'Entrena WSL, Git, pnpm y comandos que usarás en proyectos reales.',
			href: '/terminal',
			icon: 'terminal'
		},
		{
			label: 'Acceso',
			description: 'Entra con Magic Link para guardar progreso entre sesiones.',
			href: '/login',
			icon: 'login'
		}
	];
</script>

<div class="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
	{#if open}
		<section
			id="support-panel"
			class="w-[min(calc(100vw-2rem),24rem)] rounded-xl border border-slate-200 bg-white p-4 text-slate-900 shadow-[0_18px_60px_rgba(15,23,42,0.18)]"
			aria-label="Ayuda y documentación"
		>
			<div class="flex items-start justify-between gap-4">
				<div>
					<p class="text-xs font-bold uppercase tracking-[0.18em] text-[#0078d4]">Ayuda</p>
					<h2 class="mt-1 text-lg font-bold">Guía rápida del simulador</h2>
				</div>
				<button
					type="button"
					class="rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
					aria-label="Cerrar ayuda"
					onclick={() => (open = false)}
				>
					<span class="material-symbols-outlined text-[20px]">close</span>
				</button>
			</div>

			<div class="mt-4 space-y-2">
				{#each shortcuts as item (item.href)}
					<a
						class="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 transition hover:border-[#0078d4]/40 hover:bg-blue-50"
						href={item.href}
					>
						<span
							class="material-symbols-outlined mt-0.5 rounded-md bg-white p-2 text-[20px] text-[#0078d4]"
							aria-hidden="true">{item.icon}</span
						>
						<span>
							<span class="block text-sm font-bold">{item.label}</span>
							<span class="mt-0.5 block text-xs leading-5 text-slate-600">{item.description}</span>
						</span>
					</a>
				{/each}
			</div>
		</section>
	{/if}

	<button
		type="button"
		data-testid="floating-support-toggle"
		class="flex h-12 items-center gap-2 rounded-full bg-[#0078d4] px-4 font-bold text-white shadow-[0_10px_28px_rgba(0,120,212,0.32)] transition hover:bg-[#006cbe]"
		aria-expanded={open}
		aria-controls="support-panel"
		onclick={() => (open = !open)}
	>
		<span class="material-symbols-outlined text-[22px]" aria-hidden="true">help</span>
		<span class="hidden sm:inline">Ayuda</span>
	</button>
</div>
