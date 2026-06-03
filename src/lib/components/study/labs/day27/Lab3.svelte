<script lang="ts">
	import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
	import LiveSpecPanel from '../LiveSpecPanel.svelte';

	let values = $state({ own: true });
	const policy = $derived(
		values.own ? 'RLS: user_id = auth.uid()' : '⚠️ Sin filtro — todos ven todo'
	);
	const results = $derived({ policy });
</script>

<InteractiveLabLayout hint="Row Level Security en Postgres: cada usuario solo sus filas.">
	{#snippet preview()}
		<div class="space-y-4">
			<label class="flex items-center gap-3 rounded-xl border p-4">
				<input type="checkbox" bind:checked={values.own} class="accent-primary" />
				<span class="text-sm">Política «solo mis pedidos»</span>
			</label>
			<pre
				class="overflow-x-auto rounded-xl bg-zinc-950 p-4 text-xs text-emerald-400
          {values.own ? '' : 'ring-2 ring-destructive/50'}">{values.own
					? `CREATE POLICY "own_rows"
  ON pedidos FOR SELECT
  USING (user_id = auth.uid());`
					: `-- RLS desactivado
SELECT * FROM pedidos;`}</pre>
			<p class="font-mono text-sm">{policy}</p>
		</div>
	{/snippet}
	{#snippet spec()}
		<LiveSpecPanel
			bind:values
			{results}
			lines={[
				{ kind: 'comment', text: '// RLS policy' },
				{ kind: 'let', key: 'own' },
				{ kind: 'derived', name: 'policy', expr: 'rls', resultKey: 'policy' }
			]}
		/>
	{/snippet}
</InteractiveLabLayout>
