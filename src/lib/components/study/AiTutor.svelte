<script lang="ts">
  import { Button } from '$lib/components/ui/button';

  let {
    feedback,
    loading,
    correctoUltimo,
    dailyProgressPct,
    canComplete,
    yaCompletado,
    onComplete
  }: {
    feedback: string | null;
    loading: boolean;
    correctoUltimo: boolean | null;
    dailyProgressPct: number;
    canComplete: boolean;
    yaCompletado: boolean;
    onComplete: () => void;
  } = $props();
</script>

<aside class="flex h-full flex-col">
  <header class="mb-6 flex items-center gap-3">
    <div
      class="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary-container/20"
    >
      <span class="material-symbols-outlined text-tertiary">smart_toy</span>
    </div>
    <div>
      <h3 class="text-lg font-semibold text-on-surface">AI Tutor</h3>
      <span class="text-xs font-semibold text-success">Online · Gemini</span>
    </div>
  </header>

  <div class="flex-1 space-y-4 overflow-y-auto">
    {#if loading}
      <div class="flex items-center gap-3 rounded border border-outline-variant bg-surface-container-high p-4">
        <span class="material-symbols-outlined animate-spin text-primary">progress_activity</span>
        <span class="text-sm text-on-surface-variant">Corrigiendo tu código...</span>
      </div>
    {:else if feedback}
      {#if correctoUltimo}
        <div class="rounded border-l-4 border-success bg-success/10 p-4">
          <div class="mb-2 flex items-center gap-2">
            <span class="material-symbols-outlined text-sm text-success">check_circle</span>
            <span class="text-xs font-bold uppercase tracking-wider text-success">Correcto</span>
          </div>
          <p class="text-sm leading-relaxed text-on-surface">{feedback}</p>
        </div>
      {:else}
        <div class="rounded border-l-4 border-tertiary bg-tertiary-container/10 p-4">
          <div class="mb-2 flex items-center gap-2">
            <span class="material-symbols-outlined text-sm text-tertiary">lightbulb</span>
            <span class="text-xs font-bold uppercase tracking-wider text-tertiary"
              >Revisa esto</span
            >
          </div>
          <p class="text-sm leading-relaxed text-on-surface">{feedback}</p>
        </div>
      {/if}
    {:else}
      <div class="rounded border border-outline-variant bg-surface-container-high p-4">
        <p class="text-sm text-on-surface-variant">
          Escribe tu código y pulsa <span class="font-semibold text-primary">Corregir</span> para
          que la IA lo revise.
        </p>
      </div>
    {/if}
  </div>

  <footer class="mt-6 border-t border-outline-variant pt-5">
    <div class="mb-4">
      <div class="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
        <div class="h-full bg-success transition-all" style="width: {dailyProgressPct}%"></div>
      </div>
      <div class="mt-2 flex justify-between text-xs font-semibold">
        <span class="text-on-surface-variant">Progreso del día</span>
        <span class="text-on-surface">{dailyProgressPct}%</span>
      </div>
    </div>

    {#if yaCompletado}
      <Button class="w-full" variant="secondary" disabled>
        <span class="material-symbols-outlined mr-2 text-base">check_circle</span>
        Día completado
      </Button>
    {:else}
      <Button class="w-full" onclick={onComplete} disabled={!canComplete}>
        Marcar día completado
      </Button>
    {/if}
  </footer>
</aside>
