<script lang="ts">
  import type { Leccion } from '$lib/types/lesson';

  let {
    lesson,
    correctos,
    ejercicioActivo,
    onSelectEjercicio
  }: {
    lesson: Leccion;
    correctos: Set<number>;
    ejercicioActivo: 1 | 2 | 3;
    onSelectEjercicio: (n: 1 | 2 | 3) => void;
  } = $props();
</script>

<header class="space-y-3">
  <span class="text-xs font-semibold uppercase tracking-widest text-primary">
    Semana {lesson.semana} · Día {lesson.dia}
  </span>
  <h1 class="text-4xl font-bold tracking-tight text-on-surface">{lesson.titulo}</h1>
  <p class="text-base font-medium text-on-surface-variant">{lesson.objetivo}</p>
  <p class="whitespace-pre-line text-base leading-relaxed text-on-surface-variant">
    {lesson.explicacion}
  </p>
</header>

<section class="mt-8 space-y-3">
  <h2 class="text-xs font-semibold uppercase tracking-widest text-primary">Ejercicios</h2>
  <div class="grid gap-3">
    {#each lesson.ejercicios as ej (ej.numero)}
      {@const completo = correctos.has(ej.numero)}
      {@const activo = ej.numero === ejercicioActivo}
      <button
        type="button"
        onclick={() => onSelectEjercicio(ej.numero)}
        class="flex items-center justify-between border bg-surface-container p-5 text-left transition-all
          {activo
          ? 'border-primary'
          : 'border-outline-variant hover:border-on-surface-variant'}"
      >
        <div class="flex items-center gap-4">
          <span
            class="flex h-8 w-8 items-center justify-center rounded text-sm font-bold
              {completo
              ? 'bg-success/15 text-success'
              : activo
                ? 'bg-primary text-on-primary'
                : 'bg-outline-variant/40 text-on-surface'}"
          >
            {#if completo}
              <span class="material-symbols-outlined text-base">check</span>
            {:else}
              {ej.numero}
            {/if}
          </span>
          <span
            class="text-sm
              {activo ? 'font-semibold text-on-surface' : 'text-on-surface'}"
          >
            {ej.enunciado}
          </span>
        </div>
        {#if activo}
          <span class="material-symbols-outlined text-primary">keyboard_arrow_down</span>
        {:else}
          <span class="material-symbols-outlined text-outline">chevron_right</span>
        {/if}
      </button>
    {/each}
  </div>
</section>
