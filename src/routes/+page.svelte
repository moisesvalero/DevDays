<script lang="ts">
	const learningTracks = [
		{
			label: 'Incidencias',
			title: 'Simulador IT nivel 1',
			description:
				'Tickets de empresa Windows para practicar diagnóstico, notas técnicas, respuesta al usuario y escalado.',
			href: '/login',
			icon: 'confirmation_number',
			stats: ['15 casos', 'Windows empresa', 'Corrección guiada']
		},
		{
			label: 'Terminal',
			title: 'WSL, Git y pnpm',
			description:
				'Una terminal segura para entrenar comandos diarios sin tocar el sistema real ni romper proyectos.',
			href: '/login',
			icon: 'terminal',
			stats: ['10 prácticas', 'Xterm.js', 'Flujo real']
		}
	];

	const queueItems = [
		['HD-026', 'VPN conecta pero no abre recursos', 'Red', 'Media'],
		['HD-031', 'Outlook no envía correos', 'Correo', 'Media'],
		['HD-044', 'Correo sospechoso de phishing', 'Seguridad', 'Alta']
	];
</script>

<svelte:head>
	<title>DevDays — Entrenamiento IT práctico</title>
	<meta
		name="description"
		content="Simulador práctico de incidencias IT nivel 1 y laboratorio de terminal para WSL, Git y pnpm."
	/>
</svelte:head>

<main class="min-h-dvh bg-[#f4f7fb] text-[#101828]">
	<header class="border-b border-[#d9e2ec] bg-white">
		<div
			class="mx-auto flex w-[min(calc(100vw-2rem),78rem)] items-center justify-between gap-4 py-4 sm:w-[min(calc(100vw-3rem),78rem)]"
		>
			<a class="flex items-center gap-3" href="/" aria-label="DevDays inicio">
				<span class="flex h-10 w-10 items-center justify-center rounded-md bg-[#005faa] text-white">
					<span class="material-symbols-outlined text-[22px]" aria-hidden="true">lan</span>
				</span>
				<span>
					<span class="block text-sm font-black tracking-tight">DevDays</span>
					<span class="block text-xs font-semibold text-slate-500">Service Desk Lab</span>
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
				<a class="rounded-md bg-[#005faa] px-4 py-2 text-white hover:bg-[#004f8d]" href="/login">
					Registrarse
				</a>
			</nav>
		</div>
	</header>

	<section
		class="mx-auto grid w-[min(calc(100vw-2rem),78rem)] gap-8 py-10 sm:w-[min(calc(100vw-3rem),78rem)] lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:py-14"
	>
		<div>
			<p class="text-sm font-black uppercase tracking-[0.22em] text-[#005faa]">
				Entrenamiento IT práctico
			</p>
			<h1
				class="mt-4 max-w-3xl text-[clamp(2.45rem,4.6vw,4.65rem)] leading-[0.98] font-black tracking-tight text-[#07111f]"
			>
				Resuelve incidencias. Practica comandos. Mejora criterio.
			</h1>
			<p class="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
				Un entorno de práctica para técnico nivel 1: cola de tickets, diagnóstico guiado y una
				terminal simulada para entrenar WSL, Git y pnpm.
			</p>
			<div class="mt-8 flex flex-col gap-3 sm:flex-row">
				<a
					class="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#005faa] px-6 font-bold text-white shadow-[0_12px_28px_rgba(0,95,170,0.22)] hover:bg-[#004f8d]"
					href="/login"
				>
					<span class="material-symbols-outlined text-[20px]" aria-hidden="true">login</span>
					Iniciar sesión
				</a>
				<a
					class="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-[#c8d3df] bg-white px-6 font-bold text-slate-900 hover:bg-slate-50"
					href="#rutas"
				>
					<span class="material-symbols-outlined text-[20px]" aria-hidden="true">view_week</span>
					Ver módulos
				</a>
			</div>
		</div>

		<div
			class="grid gap-4 rounded-2xl border border-[#d9e2ec] bg-white p-4 shadow-[0_24px_70px_rgba(15,23,42,0.10)] lg:grid-cols-[0.95fr_1.05fr]"
		>
			<section class="rounded-xl border border-[#d9e2ec] bg-[#f8fafc] p-4">
				<div class="flex items-center justify-between">
					<p class="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Cola activa</p>
					<span class="rounded bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700"
						>Online</span
					>
				</div>
				<div class="mt-4 space-y-3">
					{#each queueItems as item (item[0])}
						<article class="rounded-lg border border-[#d9e2ec] bg-white p-3">
							<div class="flex items-start justify-between gap-3">
								<div>
									<p class="font-mono text-xs font-bold text-[#005faa]">{item[0]}</p>
									<p class="mt-1 text-sm font-black leading-5">{item[1]}</p>
								</div>
								<span class="rounded bg-slate-100 px-2 py-1 text-[11px] font-bold text-slate-600">
									{item[3]}
								</span>
							</div>
							<p class="mt-2 text-xs font-semibold text-slate-500">{item[2]} · Windows empresa</p>
						</article>
					{/each}
				</div>
			</section>

			<section class="flex flex-col rounded-xl bg-[#101828] p-4 text-slate-100">
				<div class="flex items-center justify-between border-b border-white/10 pb-3">
					<p class="text-xs font-black uppercase tracking-[0.18em] text-blue-200">Terminal Lab</p>
					<span class="material-symbols-outlined text-[20px] text-blue-200">terminal</span>
				</div>
				<div class="mt-4 flex-1 font-mono text-sm leading-7">
					<p><span class="text-blue-300">moi6@Ubuntu-Dev</span>:~/webs$ pwd</p>
					<p class="text-slate-300">/home/moi6/webs</p>
					<p><span class="text-blue-300">moi6@Ubuntu-Dev</span>:~/webs$ git status</p>
					<p class="text-emerald-300">working tree clean</p>
					<p><span class="text-blue-300">moi6@Ubuntu-Dev</span>:~/webs$ pnpm check</p>
					<p class="text-emerald-300">0 errors · 0 warnings</p>
				</div>
			</section>
		</div>
	</section>

	<section id="rutas" class="border-y border-[#d9e2ec] bg-white py-10">
		<div class="mx-auto w-[min(calc(100vw-2rem),78rem)] sm:w-[min(calc(100vw-3rem),78rem)]">
			<div class="grid gap-4 md:grid-cols-[0.78fr_1.22fr] md:items-end">
				<div>
					<p class="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Módulos</p>
					<h2 class="mt-2 text-3xl font-black tracking-tight text-[#07111f]">
						Dos formas de entrenar el trabajo real.
					</h2>
				</div>
				<p class="text-sm leading-6 text-slate-600">
					La landing es pública. Para entrar en el dashboard, guardar progreso y practicar necesitas
					acceder con Magic Link.
				</p>
			</div>

			<div class="mt-7 grid gap-4 lg:grid-cols-2">
				{#each learningTracks as track (track.title)}
					<article class="rounded-xl border border-[#d9e2ec] bg-[#f8fafc] p-5">
						<div class="flex items-start justify-between gap-4">
							<div class="flex gap-3">
								<span
									class="material-symbols-outlined h-10 w-10 rounded-md bg-white p-2 text-[#005faa]"
									aria-hidden="true">{track.icon}</span
								>
								<div>
									<p class="text-xs font-black uppercase tracking-[0.18em] text-[#005faa]">
										{track.label}
									</p>
									<h3 class="mt-2 text-2xl font-black tracking-tight">{track.title}</h3>
								</div>
							</div>
						</div>
						<p class="mt-4 text-sm leading-6 text-slate-600">{track.description}</p>
						<div class="mt-5 flex flex-wrap gap-2">
							{#each track.stats as stat (stat)}
								<span
									class="rounded-md border border-[#d9e2ec] bg-white px-3 py-1 text-xs font-bold text-slate-600"
								>
									{stat}
								</span>
							{/each}
						</div>
						<a
							class="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-[#07111f] px-5 text-sm font-bold text-white hover:bg-slate-800"
							href={track.href}
						>
							Entrar
						</a>
					</article>
				{/each}
			</div>
		</div>
	</section>
</main>
