<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';

  let values = $state({ logged: false, email: 'alumno@devdays.com' });
  const user = $derived(values.logged ? `Sesión: ${values.email}` : 'Invitado — inicia sesión');
  const results = $derived({ user });
</script>

<InteractiveLabLayout hint="supabase.auth.signInWithPassword o OAuth; cookie de sesión en SSR.">
  {#snippet preview()}
    <div class="max-w-sm rounded-xl border border-outline-variant/40 p-6">
      {#if values.logged}
        <div class="flex items-center gap-3">
          <span class="flex size-10 items-center justify-center rounded-full bg-primary font-bold text-on-primary">
            {values.email.charAt(0).toUpperCase()}
          </span>
          <div>
            <p class="font-semibold">{values.email}</p>
            <p class="text-xs text-primary">auth.uid() activo</p>
          </div>
        </div>
        <button
          type="button"
          class="mt-4 text-sm text-destructive underline"
          onclick={() => (values.logged = false)}
        >
          Cerrar sesión
        </button>
      {:else}
        <input class="w-full rounded-lg border px-3 py-2 text-sm" bind:value={values.email} />
        <button
          type="button"
          class="mt-3 w-full rounded-lg bg-primary py-2 font-bold text-on-primary"
          onclick={() => (values.logged = true)}
        >
          Login demo
        </button>
      {/if}
      <p class="mt-4 font-mono text-xs text-on-surface-variant">{user}</p>
    </div>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} lines={[
      { kind: 'comment', text: '// supabase auth' },
      { kind: 'let', key: 'logged' },
      { kind: 'derived', name: 'user', expr: 'session', resultKey: 'user' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
