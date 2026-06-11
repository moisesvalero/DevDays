<script lang="ts">
	const learningTracks = [
		{
			label: 'Service Desk',
			title: 'Simulador de incidencias IT',
			description:
				'Resuelve tickets de entorno Windows empresa: contraseña, VPN, red, correo, impresoras, permisos y seguridad.',
			href: '/estudio',
			icon: 'support_agent',
			image: '/tickets/hd-005-vpn-routes.jpg',
			stats: ['15 tickets', 'Diagnóstico guiado', 'Cierre o escalado']
		},
		{
			label: 'Terminal',
			title: 'Laboratorio de comandos diarios',
			description:
				'Practica WSL, Git, GitHub CLI y pnpm en una terminal simulada para coger soltura sin romper nada real.',
			href: '/terminal',
			icon: 'terminal',
			image: '/tickets/hd-004-dns-failure.jpg',
			stats: ['10 lecciones', 'Xterm.js', 'Práctica segura']
		}
	];
</script>

<svelte:head>
	<title>DevDays — Simulador IT y Terminal</title>
	<meta
		name="description"
		content="Entrada a DevDays: simulador de incidencias IT nivel 1 y laboratorio de terminal para WSL, Git y pnpm."
	/>
</svelte:head>

<main class="min-h-dvh bg-[#f6f8fb] text-[#111827]">
	<header class="border-b border-slate-200 bg-white/88 backdrop-blur">
		<div
			class="mx-auto flex w-[min(calc(100vw-2rem),76rem)] items-center justify-between gap-4 py-4 sm:w-[min(calc(100vw-3rem),76rem)]"
		>
			<a class="flex items-center gap-3" href="/" aria-label="DevDays inicio">
				<span
					class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0078d4] text-white shadow-sm"
				>
					<span class="material-symbols-outlined text-[22px]" aria-hidden="true">hub</span>
				</span>
				<span>
					<span class="block text-sm font-black tracking-tight">DevDays</span>
					<span class="block text-xs font-semibold text-slate-500">IT Training Studio</span>
				</span>
			</a>
			<nav class="flex items-center gap-2 text-sm font-bold">
				<a
					class="hidden rounded-md px-3 py-2 text-slate-600 hover:bg-slate-100 sm:inline-flex"
					href="#rutas"
				>
					Rutas
				</a>
				<a
					class="hidden rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 sm:inline-flex"
					href="/login"
				>
					Iniciar sesión
				</a>
				<a class="rounded-md bg-[#0078d4] px-4 py-2 text-white hover:bg-[#006cbe]" href="/login">
					Registrarse
				</a>
			</nav>
		</div>
	</header>

	<section
		class="mx-auto grid w-[min(calc(100vw-2rem),76rem)] gap-8 py-10 sm:w-[min(calc(100vw-3rem),76rem)] lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-14"
	>
		<div>
			<p class="text-sm font-black uppercase tracking-[0.2em] text-[#0078d4]">
				Entrenamiento técnico nivel 1
			</p>
			<h1
				class="mt-4 max-w-3xl text-[clamp(2.25rem,4.8vw,4.35rem)] leading-[1.02] font-black tracking-tight text-slate-950"
			>
				Practica soporte IT como si ya estuvieras en mesa de ayuda.
			</h1>
			<p class="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
				DevDays ahora es un estudio de práctica: tickets reales de empresa Windows y una ruta de
				terminal para dominar los comandos que más vas a usar en el día a día.
			</p>
			<div class="mt-8 flex flex-col gap-3 sm:flex-row">
				<a
					class="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#0078d4] px-6 font-bold text-white shadow-[0_8px_22px_rgba(0,120,212,0.24)] hover:bg-[#006cbe]"
					href="/login"
				>
					<span class="material-symbols-outlined text-[20px]" aria-hidden="true">login</span>
					Iniciar sesión
				</a>
				<a
					class="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 font-bold text-slate-900 hover:bg-slate-50"
					href="#rutas"
				>
					<span class="material-symbols-outlined text-[20px]" aria-hidden="true">map</span>
					Ver rutas
				</a>
			</div>
		</div>

		<div
			class="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)]"
		>
			<img
				src="/tickets/hd-013-phishing-email.jpg"
				alt="Mesa de trabajo de ciberseguridad y soporte IT"
				class="h-[min(44vh,24rem)] w-full object-cover"
			/>
			<div
				class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/82 to-transparent p-5 text-white"
			>
				<p class="text-xs font-bold uppercase tracking-[0.18em] text-blue-100">Modo práctica</p>
				<p class="mt-2 max-w-md text-xl font-black">Lee, diagnostica, documenta y decide.</p>
			</div>
		</div>
	</section>

	<section id="rutas" class="border-y border-slate-200 bg-white py-10">
		<div class="mx-auto w-[min(calc(100vw-2rem),76rem)] sm:w-[min(calc(100vw-3rem),76rem)]">
			<div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
				<div>
					<p class="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Rutas activas</p>
					<h2 class="mt-2 text-3xl font-black tracking-tight text-slate-950">
						Dos áreas para entrenar sin ruido.
					</h2>
				</div>
				<p class="max-w-xl text-sm leading-6 text-slate-600">
					El acceso al dashboard y a los cursos requiere Magic Link. La landing es pública para
					entender qué hace la app antes de entrar.
				</p>
			</div>

			<div class="mt-7 grid gap-5 lg:grid-cols-2">
				{#each learningTracks as track (track.href)}
					<article class="overflow-hidden rounded-xl border border-slate-200 bg-[#f8fafc]">
						<div class="grid min-h-full sm:grid-cols-[0.92fr_1.08fr]">
							<img src={track.image} alt="" class="h-56 w-full object-cover sm:h-full" />
							<div class="flex flex-col p-6">
								<div class="flex items-center gap-3">
									<span
										class="material-symbols-outlined rounded-lg bg-blue-50 p-2 text-[#0078d4]"
										aria-hidden="true">{track.icon}</span
									>
									<p class="text-xs font-black uppercase tracking-[0.18em] text-[#0078d4]">
										{track.label}
									</p>
								</div>
								<h3 class="mt-5 text-2xl font-black tracking-tight">{track.title}</h3>
								<p class="mt-3 flex-1 text-sm leading-6 text-slate-600">{track.description}</p>
								<div class="mt-5 flex flex-wrap gap-2">
									{#each track.stats as stat (stat)}
										<span
											class="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-600"
										>
											{stat}
										</span>
									{/each}
								</div>
								<a
									class="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-slate-950 px-5 text-sm font-bold text-white hover:bg-slate-800"
									href="/login"
								>
									Entrar a esta ruta
								</a>
							</div>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>
</main>
