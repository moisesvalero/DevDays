<script lang="ts">
  import { Button } from '$lib/components/ui/button';

  let {
    feedback,
    pistas = [],
    snippetGuia = null,
    loading,
    correctoUltimo,
    dailyProgressPct,
    yaCompletado,
    onComplete,
    onMasAyuda,
    onPreguntar
  }: {
    feedback: string | null;
    pistas?: string[];
    snippetGuia?: string | null;
    loading: boolean;
    correctoUltimo: boolean | null;
    dailyProgressPct: number;
    yaCompletado: boolean;
    onComplete: () => void;
    onMasAyuda: () => void;
    onPreguntar: () => void;
  } = $props();
</script>

<aside class="flex h-full flex-col">
  <header class="mb-6 flex items-center gap-3">
    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary-container/20">
      <span class="material-symbols-outlined text-tertiary">smart_toy</span>
    </div>
    <div>
      <h3 class="text-lg font-semibold text-on-surface">Tutor</h3>
      <span class="text-xs font-semibold text-success">Online</span>
    </div>
  </header>

  <div class="flex-1 space-y-4 overflow-y-auto">
    {#if loading}
      <div
        class="flex items-center gap-3 rounded border border-outline-variant bg-surface-container-high p-4"
      >
        <span class="material-symbols-outlined animate-spin text-primary">progress_activity</span>
        <span class="text-sm text-on-surface-variant">Revisando tu idea...</span>
      </div>
    {:else if feedback}
      {#if correctoUltimo}
        <div class="rounded border-l-4 border-success bg-success/10 p-4">
          <div class="mb-2 flex items-center gap-2">
            <span class="material-symbols-outlined text-sm text-success">check_circle</span>
            <span class="text-xs font-bold uppercase tracking-wider text-success">¡Lo pillaste!</span>
          </div>
          <p class="text-sm leading-relaxed text-on-surface">{feedback}</p>
          {#if pistas.length > 0}
            <ul class="mt-3 list-disc space-y-1 pl-5 text-xs text-on-surface-variant">
              {#each pistas as p, i (i)}
                <li>{p}</li>
              {/each}
            </ul>
          {/if}
        </div>
      {:else}
        <div class="rounded border-l-4 border-tertiary bg-tertiary-container/10 p-4">
          <div class="mb-2 flex items-center gap-2">
            <span class="material-symbols-outlined text-sm text-tertiary">lightbulb</span>
            <span class="text-xs font-bold uppercase tracking-wider text-tertiary">Casi</span>
          </div>
          <p class="text-sm leading-relaxed text-on-surface">{feedback}</p>
          {#if pistas.length > 0}
            <ul class="mt-3 list-disc space-y-1 pl-5 text-sm text-on-surface">
              {#each pistas as p, i (i)}
                <li>{p}</li>
              {/each}
            </ul>
          {/if}
          {#if snippetGuia}
            <div class="mt-4">
              <div class="mb-1 text-[10px] font-bold uppercase tracking-widest text-tertiary">
                Pista (idea, no solución para copiar)
              </div>
              <pre
                class="overflow-x-auto rounded border border-outline-variant bg-surface-container-lowest p-3 font-mono text-xs leading-relaxed text-on-surface"
              ><code>{snippetGuia}</code></pre>
            </div>
          {:else}
            <div class="mt-4">
              <Button variant="outline" class="w-full" onclick={onMasAyuda}>
                <span class="material-symbols-outlined mr-2 text-base">help</span>
                Más ayuda
              </Button>
            </div>
          {/if}
        </div>
      {/if}
      <Button variant="ghost" class="w-full justify-start" onclick={onPreguntar}>
        <span class="material-symbols-outlined mr-2 text-base">forum</span>
        Preguntar al tutor
      </Button>
    {:else}
      <div class="space-y-3">
        <div class="rounded border border-outline-variant bg-surface-container-high p-4">
          <p class="text-sm text-on-surface-variant">
            Escribe tu código con la idea clara y pulsa <span class="font-semibold text-primary"
              >Corregir</span
            >. No hace falta sintaxis perfecta.
          </p>
        </div>
        <Button variant="ghost" class="w-full justify-start" onclick={onPreguntar}>
          <span class="material-symbols-outlined mr-2 text-base">forum</span>
          Preguntar al tutor
        </Button>
      </div>
    {/if}
  </div>

  <footer class="mt-6 border-t border-outline-variant pt-5">
    <p class="mb-3 text-xs text-on-surface-variant">
      Retos OK hoy: {dailyProgressPct}% (orientativo)
    </p>
    <Button class="w-full" variant="outline" onclick={onComplete} disabled={yaCompletado}>
      {yaCompletado ? 'Marcado (opcional)' : 'Marcar día (opcional)'}
    </Button>
  </footer>
</aside>
