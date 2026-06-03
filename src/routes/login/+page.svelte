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
<div class="dark flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
	<Card class="w-full max-w-md">
		<CardHeader>
			<CardTitle class="text-2xl">DevDays</CardTitle>
			<CardDescription>
				Inicia sesión con tu email. Te enviaremos un Magic Link para entrar sin contraseña.
			</CardDescription>
		</CardHeader>
		<CardContent>
			{#if form?.sent}
				<div
					class="rounded-md border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-200"
				>
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
						<p class="text-sm text-destructive">{form.error}</p>
					{/if}

					<Button type="submit" class="w-full" disabled={loading}>
						{loading ? 'Enviando...' : 'Enviar Magic Link'}
					</Button>
				</form>
			{/if}
		</CardContent>
	</Card>
</div>
