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
	<title>Login — DevDays</title>
</svelte:head>

<!-- .dark forzado: el login siempre en oscuro, independiente de la preferencia del usuario -->
<div class="dark street-shell flex min-h-screen items-center justify-center px-4 text-foreground">
	<Card class="street-panel w-full max-w-md">
		<CardHeader>
			<CardTitle
				class="street-display text-5xl leading-none text-[var(--street-lime)] [-webkit-text-stroke:1px_var(--street-shadow)]"
			>
				DevDays
			</CardTitle>
			<CardDescription>
				Entra con tu email. Te mandamos un enlace seguro y vuelves directo al curso.
			</CardDescription>
		</CardHeader>
		<CardContent>
			{#if form?.sent}
				<div class="street-paper rounded-md p-4 text-sm font-semibold text-[#101018]">
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
					<div class="street-paper p-3 text-sm font-black text-[#101018]">
						1. Escribe tu email. 2. Abre el enlace. 3. Sigue aprendiendo.
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
						<p class="street-paper p-3 text-sm font-semibold text-[#101018]">{form.error}</p>
					{/if}

					<Button type="submit" class="w-full" disabled={loading}>
						{loading ? 'Enviando...' : 'Enviar enlace de entrada'}
					</Button>
				</form>
			{/if}
		</CardContent>
	</Card>
</div>
