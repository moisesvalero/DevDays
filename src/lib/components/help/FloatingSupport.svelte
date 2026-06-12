<script lang="ts">
	import { browser } from '$app/environment';
	import { tick } from 'svelte';

	type ChatMsg = { role: 'user' | 'model'; text: string };

	let open = $state(false);
	let mensaje = $state('');
	let historial = $state<ChatMsg[]>([]);
	let loading = $state(false);
	let errorMsg = $state('');
	let chatContainer = $state<HTMLDivElement>();

	const sugerencias = [
		'¿Cómo abro una terminal de comandos en Windows?',
		'¿Para qué sirve configurar las rutas de red en una VPN?',
		'¿Cómo creo una variable reactiva en Svelte 5?'
	];

	function getActiveTicketId(): string {
		if (!browser) return '';
		try {
			const saved = localStorage.getItem('devdays-helpdesk-simulator-v1');
			if (saved) {
				const parsed = JSON.parse(saved);
				return parsed.currentTicketId || '';
			}
		} catch {}
		return '';
	}

	async function scrollDown() {
		await tick();
		if (chatContainer) {
			chatContainer.scrollTop = chatContainer.scrollHeight;
		}
	}

	async function enviarMensaje(texto: string) {
		const msg = texto.trim();
		if (!msg || loading) return;

		errorMsg = '';
		historial = [...historial, { role: 'user', text: msg }];
		mensaje = '';
		loading = true;
		await scrollDown();

		const ticketId = getActiveTicketId();

		try {
			const response = await fetch('/api/preguntar', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					ticketId: ticketId || undefined,
					mensaje: msg,
					historial: historial.slice(0, -1)
				})
			});

			if (!response.ok) {
				throw new Error('No pude obtener respuesta de la IA.');
			}

			const data = (await response.json()) as { respuesta?: string };
			const respuesta =
				data.respuesta ?? 'El tutor no ha podido responder a tu duda en este momento.';

			historial = [...historial, { role: 'model', text: respuesta }];
		} catch (e: any) {
			errorMsg = e.message || 'La IA está temporalmente fuera de línea. Inténtalo de nuevo.';
		} finally {
			loading = false;
			await scrollDown();
		}
	}

	function seleccionarSugerencia(texto: string) {
		enviarMensaje(texto);
	}

	function limpiarChat() {
		historial = [];
		errorMsg = '';
	}

	$effect(() => {
		if (open) {
			scrollDown();
		}
	});
</script>

<div class="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
	{#if open}
		<section
			id="support-panel"
			class="w-[min(calc(100vw-2rem),24rem)] h-[460px] flex flex-col rounded-xl border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.18)] overflow-hidden"
			aria-label="Tutor IA del simulador"
		>
			<!-- Header -->
			<header
				class="flex items-center justify-between border-b border-slate-100 bg-[#f8fafc] px-4 py-3 shrink-0"
			>
				<div class="flex items-center gap-2">
					<span
						class="material-symbols-outlined rounded-lg bg-blue-50 p-1.5 text-[20px] text-[#0078d4]"
						>auto_awesome</span
					>
					<div>
						<h2 class="text-sm font-bold text-slate-900">Tutor de IA DevDays</h2>
						<p class="text-[10px] text-slate-500 font-semibold tracking-wide">
							IT, TERMINAL Y CÓDIGO
						</p>
					</div>
				</div>
				<div class="flex items-center gap-1">
					{#if historial.length > 0}
						<button
							type="button"
							onclick={limpiarChat}
							class="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer flex items-center justify-center"
							title="Limpiar conversación"
						>
							<span class="material-symbols-outlined text-[18px]">delete</span>
						</button>
					{/if}
					<button
						type="button"
						class="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer flex items-center justify-center"
						aria-label="Cerrar chat"
						onclick={() => (open = false)}
					>
						<span class="material-symbols-outlined text-[20px]">close</span>
					</button>
				</div>
			</header>

			<!-- Chat messages -->
			<div bind:this={chatContainer} class="flex-1 overflow-y-auto p-4 space-y-3 bg-[#fafbfe]">
				{#if historial.length === 0}
					<div class="flex flex-col items-center justify-center text-center py-6">
						<span class="material-symbols-outlined text-[42px] text-blue-100 animate-pulse"
							>forum</span
						>
						<h3 class="mt-2 text-sm font-bold text-slate-800">¿En qué tienes duda hoy?</h3>
						<p class="mt-1 text-xs text-slate-500 max-w-[280px]">
							Pregúntame sobre resolución de tickets, comandos Git/WSL o lógica en Svelte.
						</p>

						<div class="mt-6 w-full space-y-2 text-left">
							<p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
								Preguntas sugeridas
							</p>
							{#each sugerencias as sug}
								<button
									type="button"
									onclick={() => seleccionarSugerencia(sug)}
									class="w-full text-left rounded-lg border border-slate-150 bg-white p-2.5 text-xs text-slate-700 hover:border-[#0078d4]/40 hover:bg-blue-50/50 transition cursor-pointer"
								>
									{sug}
								</button>
							{/each}
						</div>
					</div>
				{:else}
					{#each historial as msg}
						<div class={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
							<div
								class={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-5 shadow-sm ${
									msg.role === 'user'
										? 'bg-[#0078d4] text-white rounded-br-none'
										: 'bg-white border border-slate-100 text-slate-800 rounded-bl-none'
								}`}
							>
								{msg.text}
							</div>
						</div>
					{/each}
				{/if}

				{#if loading}
					<div class="flex justify-start">
						<div
							class="max-w-[85%] rounded-2xl rounded-bl-none border border-slate-100 bg-white px-3.5 py-2.5 shadow-sm flex items-center gap-1.5"
						>
							<span class="flex h-1.5 w-1.5 rounded-full bg-[#0078d4] animate-bounce"></span>
							<span
								class="flex h-1.5 w-1.5 rounded-full bg-[#0078d4] animate-bounce [animation-delay:0.2s]"
							></span>
							<span
								class="flex h-1.5 w-1.5 rounded-full bg-[#0078d4] animate-bounce [animation-delay:0.4s]"
							></span>
						</div>
					</div>
				{/if}

				{#if errorMsg}
					<div
						class="rounded-lg border border-red-200 bg-red-50 p-2.5 text-center text-xs text-red-700"
					>
						{errorMsg}
					</div>
				{/if}
			</div>

			<!-- Input / Footer -->
			<form
				onsubmit={(e) => {
					e.preventDefault();
					enviarMensaje(mensaje);
				}}
				class="border-t border-slate-100 bg-white p-3 flex gap-2 shrink-0 items-center"
			>
				<input
					bind:value={mensaje}
					disabled={loading}
					placeholder="Escribe tu duda..."
					class="flex-1 rounded-md border border-slate-200 bg-slate-50 p-2 text-xs text-slate-900 focus:border-[#0078d4] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0078d4]"
				/>
				<button
					type="submit"
					disabled={loading || !mensaje.trim()}
					class="flex h-8 w-8 items-center justify-center rounded-md bg-[#0078d4] text-white hover:bg-[#006cbe] disabled:opacity-50 cursor-pointer shrink-0 transition-colors"
				>
					<span class="material-symbols-outlined text-[18px]">send</span>
				</button>
			</form>
		</section>
		{#if open && getActiveTicketId()}
			<!-- Badge flotante si hay un ticket activo para informar que la IA tiene contexto -->
			<div
				class="absolute right-0 bottom-14 bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1 animate-pulse select-none z-55"
			>
				<span class="material-symbols-outlined text-[10px]">playlist_add_check</span>
				<span>Contexto de ticket activo</span>
			</div>
		{/if}
	{/if}

	<button
		type="button"
		data-testid="floating-support-toggle"
		class="flex h-12 items-center gap-2 rounded-full bg-[#0078d4] px-4 font-bold text-white shadow-[0_10px_28px_rgba(0,120,212,0.32)] transition hover:bg-[#006cbe] cursor-pointer"
		aria-expanded={open}
		aria-controls="support-panel"
		onclick={() => (open = !open)}
	>
		<span class="material-symbols-outlined text-[22px]" aria-hidden="true">
			{open ? 'close' : 'chat'}
		</span>
		<span class="hidden sm:inline">{open ? 'Cerrar' : 'Soporte IA'}</span>
	</button>
</div>
