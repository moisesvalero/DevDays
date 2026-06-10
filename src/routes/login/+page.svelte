<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';

	let { form } = $props();
	let loading = $state(false);
</script>

<svelte:head>
	<title>Acceso — Service Desk Studio</title>
</svelte:head>

<div class="dark ops-shell flex min-h-screen items-center justify-center px-4 text-foreground">
	<Card class="w-full max-w-md border-slate-800 bg-slate-950/88">
		<CardHeader>
			<div
				class="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white"
			>
				<span class="material-symbols-outlined text-[22px]" aria-hidden="true">desktop_windows</span
				>
			</div>
			<CardTitle class="text-2xl font-semibold tracking-tight text-white">
				Service Desk Studio
			</CardTitle>
			<CardDescription class="text-slate-400">
				Accede con enlace seguro para guardar tu progreso de entrenamiento.
			</CardDescription>
		</CardHeader>
		<CardContent>
			{#if form?.sent}
				<div class="rounded-xl border border-blue-900/70 bg-blue-950/35 p-4 text-sm text-blue-100">
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
					<div
						class="rounded-xl border border-slate-800 bg-slate-900/76 p-3 text-sm text-slate-300"
					>
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
						<p class="rounded-xl border border-red-900/70 bg-red-950/35 p-3 text-sm text-red-100">
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
