<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Card, CardContent, CardDescription, CardHeader } from '$lib/components/ui/card';

	let { form } = $props();
	let loading = $state(false);
</script>

<svelte:head>
	<title>Acceso — Service Desk Studio</title>
</svelte:head>

<div class="ops-shell flex min-h-screen items-center justify-center px-4 text-[#111827]">
	<Card class="w-full max-w-md border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
		<CardHeader>
			<div
				class="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#0078d4] text-white"
			>
				<span class="material-symbols-outlined text-[22px]" aria-hidden="true">desktop_windows</span
				>
			</div>
			<h1 class="text-2xl font-semibold tracking-tight text-slate-950">Service Desk Studio</h1>
			<CardDescription class="text-slate-600">
				Accede con enlace seguro para guardar tu progreso de entrenamiento.
			</CardDescription>
		</CardHeader>
		<CardContent>
			{#if form?.sent}
				<div class="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
					Te hemos enviado un enlace a <strong>{form.email}</strong>. Revisa tu bandeja de entrada y
					haz click para entrar.
				</div>
			{:else}
				<form
					method="POST"
					action="?/magic"
					use:enhance={() => {
						loading = true;
						return async ({ update }) => {
							await update();
							loading = false;
						};
					}}
					class="space-y-4"
				>
					<div class="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
						Escribe tu email corporativo y abre el enlace de acceso.
					</div>
					<div class="space-y-2">
						<Label for="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							required
							autocomplete="email"
							placeholder="tu@email.com"
						/>
					</div>

					{#if form?.error}
						<p
							class="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-800"
						>
							{form.error}
						</p>
					{/if}

					<Button type="submit" class="w-full" disabled={loading}>
						{loading ? 'Enviando...' : 'Enviar enlace de entrada'}
					</Button>
				</form>
			{/if}
		</CardContent>
	</Card>
</div>
