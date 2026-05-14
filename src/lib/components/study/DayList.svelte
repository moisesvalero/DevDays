<script lang="ts">
  import type { Leccion, FilaProgreso } from '$lib/types/lesson';

  let {
    lessons,
    progreso,
    currentDay,
    onSelect
  }: {
    lessons: Leccion[];
    progreso: FilaProgreso[];
    currentDay: number;
    onSelect: (dia: number) => void;
  } = $props();

  const completados = $derived(
    new Set(progreso.filter((p) => p.estado === 'completado').map((p) => p.dia))
  );

  const porcentaje = $derived(Math.round((completados.size / lessons.length) * 100));

  const porSemana = $derived(
    lessons.reduce<Record<number, Leccion[]>>((acc, l) => {
      (acc[l.semana] ||= []).push(l);
      return acc;
    }, {})
  );

  /** Para cada semana N>1, el examen de la semana N-1 (último día de esa semana) */
  function examenSemanaAnterior(semana: number): Leccion | null {
    if (semana <= 1) return null;
    const items = porSemana[semana - 1];
    if (!items) return null;
    return items.find((l) => l.tipo === 'examen') ?? null;
  }

  function semanaBloqueada(semana: number): { bloqueada: boolean; diaExamen: number | null } {
    const ex = examenSemanaAnterior(semana);
    if (!ex) return { bloqueada: false, diaExamen: null };
    return { bloqueada: !completados.has(ex.dia), diaExamen: ex.dia };
  }
</script>

<div class="flex h-full flex-col">
  <div class="border-b border-outline-variant p-6">
    <div class="mb-1 flex items-center gap-2">
      <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;"
        >school</span
      >
      <span class="text-xl font-semibold text-on-surface">DevDays 35</span>
    </div>
    <div class="mt-2 flex items-center justify-between">
      <span class="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
        Día actual: {currentDay}
      </span>
      <span class="text-xs font-semibold text-primary">{porcentaje}%</span>
    </div>
    <div class="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-container-highest">
      <div class="h-full bg-success transition-all" style="width: {porcentaje}%"></div>
    </div>
  </div>

  <nav class="flex-1 overflow-y-auto py-2">
    {#each Object.entries(porSemana) as [semanaStr, items] (semanaStr)}
      {@const semana = Number(semanaStr)}
      {@const lock = semanaBloqueada(semana)}
      <div
        class="px-6 pb-1 pt-3 text-[10px] font-bold uppercase tracking-widest text-outline-variant"
      >
        Semana {semana}
      </div>
      {#if lock.bloqueada && lock.diaExamen}
        <div class="mx-5 mb-1 mt-1 flex items-start gap-2 rounded border border-tertiary/30 bg-tertiary-container/10 px-3 py-2">
          <span class="material-symbols-outlined text-sm text-tertiary">lock</span>
          <span class="text-[11px] leading-snug text-tertiary">
            Aún no has aprobado el examen del Día {lock.diaExamen}. Puedes entrar, pero conviene volver.
          </span>
        </div>
      {/if}
      {#each items as lesson (lesson.dia)}
        {@const completado = completados.has(lesson.dia)}
        {@const activo = lesson.dia === currentDay}
        {@const esExamen = lesson.tipo === 'examen'}
        <button
          type="button"
          class="group flex w-full items-center gap-3 border-l-4 px-5 py-2 text-left transition-colors hover:bg-surface-container-high
            {activo
            ? 'border-primary bg-surface-container-high'
            : 'border-transparent'}"
          onclick={() => onSelect(lesson.dia)}
        >
          {#if completado}
            <span
              class="material-symbols-outlined text-lg text-success"
              style="font-variation-settings: 'FILL' 1;">check_circle</span
            >
          {:else if esExamen}
            <span class="material-symbols-outlined text-lg text-tertiary">quiz</span>
          {:else if activo}
            <span class="material-symbols-outlined text-lg text-primary">play_circle</span>
          {:else}
            <span class="material-symbols-outlined text-lg text-outline">circle</span>
          {/if}
          <span
            class="text-xs font-semibold tracking-wide
              {activo
              ? 'text-primary'
              : esExamen
                ? 'text-tertiary group-hover:text-on-surface'
                : 'text-on-surface-variant group-hover:text-on-surface'}"
          >
            Día {lesson.dia}: {lesson.titulo}
          </span>
        </button>
      {/each}
    {/each}
  </nav>
</div>
