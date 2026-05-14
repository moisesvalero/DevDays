<script lang="ts">
  import type { Leccion } from '$lib/types/lesson';
  import CodeBlock from './CodeBlock.svelte';
  import Callout from './Callout.svelte';

  let {
    lesson,
    correctos,
    ejercicioActivo,
    onSelectEjercicio
  }: {
    lesson: Leccion;
    correctos: Set<number>;
    ejercicioActivo: number;
    onSelectEjercicio: (n: number) => void;
  } = $props();

  const totalEjercicios = $derived(lesson.ejercicios.length);
</script>

{#if lesson.tipo === 'leccion'}
  <header class="space-y-3">
    <span class="text-xs font-semibold uppercase tracking-widest text-primary">
      Semana {lesson.semana} · Día {lesson.dia}
    </span>
    <h1 class="text-4xl font-bold tracking-tight text-on-surface">{lesson.titulo}</h1>
    <p class="text-base font-medium text-on-surface-variant">{lesson.objetivo}</p>
    <p class="text-base leading-relaxed text-on-surface-variant whitespace-pre-line">
      {lesson.contenido.intro}
    </p>
  </header>

  <article class="mt-8 space-y-8">
    {#each lesson.contenido.secciones as s, i (i)}
      <section class="space-y-3">
        <h3 class="text-lg font-semibold text-on-surface">{s.titulo}</h3>
        <p class="leading-relaxed text-on-surface-variant whitespace-pre-line">{s.texto}</p>
        {#if s.ejemplo}
          <CodeBlock code={s.ejemplo} />
        {/if}
        {#if s.nota}
          <Callout tipo={s.nota.tipo} texto={s.nota.texto} />
        {/if}
      </section>
    {/each}

    <section class="rounded-lg border border-outline-variant bg-surface-container p-5">
      <h3 class="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Resumen</h3>
      <ul class="list-disc space-y-1 pl-5 text-on-surface-variant">
        {#each lesson.contenido.resumen as r, i (i)}
          <li>{r}</li>
        {/each}
      </ul>
    </section>
  </article>
{:else}
  <header
    class="space-y-3 rounded-lg border-l-4 border-tertiary bg-tertiary-container/15 p-6"
  >
    <div class="flex items-center gap-2">
      <span class="material-symbols-outlined text-tertiary">quiz</span>
      <span class="text-xs font-bold uppercase tracking-widest text-tertiary">
        Examen Semana {lesson.semana} · Día {lesson.dia}
      </span>
    </div>
    <h1 class="text-4xl font-bold tracking-tight text-on-surface">{lesson.titulo}</h1>
    <p class="text-base font-medium text-on-surface">{lesson.objetivo}</p>
    <p class="text-sm leading-relaxed text-on-surface-variant whitespace-pre-line">
      {lesson.instrucciones}
    </p>
    <p class="text-xs font-semibold text-tertiary">
      Aprobado: 4 de 5 ejercicios correctos.
    </p>
  </header>
{/if}

<section class="mt-8 space-y-3">
  <h2 class="text-xs font-semibold uppercase tracking-widest text-primary">
    {lesson.tipo === 'examen' ? `Ejercicios del examen (${totalEjercicios})` : 'Ejercicios'}
  </h2>
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
