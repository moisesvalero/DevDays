<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	let values = $state({ email: 'a@b.com' });
	const ok = $derived(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()));
	const results = $derived({ ok });
</script>

<InteractiveLabLayout hint="Valida en el action del servidor y devuelve fail() con errores.">
	{#snippet preview()}
		<label class="block max-w-md space-y-2 rounded-xl border p-6">
			<span class="text-sm font-medium">Email</span>
			<input
				type="email"
				class="w-full rounded-lg border px-3 py-2 font-mono"
				bind:value={values.email}
			/>
			<span
				class="inline-flex rounded-full px-3 py-1 text-xs font-bold
          {ok ? 'bg-primary/15 text-primary' : 'bg-destructive/15 text-destructive'}"
			>
				{ok ? 'Válido para el action' : 'fail(400) — email inválido'}
			</span>
		</label>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			lines={[
				{ kind: 'comment', text: '// server validation' },
				{ kind: 'let', key: 'email' },
				{ kind: 'derived', name: 'ok', expr: 'valid', resultKey: 'ok' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
