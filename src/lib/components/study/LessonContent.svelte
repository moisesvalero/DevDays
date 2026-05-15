<script lang="ts">
  import type { Leccion, Ejercicio } from '$lib/types/lesson';
  import CodeBlock from './CodeBlock.svelte';
  import Callout from './Callout.svelte';
  import NotebookLmExport from './NotebookLmExport.svelte';

  let {
    lesson,
    lessons,
    correctos,
    ejercicioActivo,
    onSelectEjercicio
  }: {
    lesson: Leccion;
    lessons: Leccion[];
    correctos: Set<number>;
    ejercicioActivo: number;
    onSelectEjercicio: (n: number) => void;
  } = $props();

  const totalEjercicios = $derived(lesson.ejercicios.length);
  const ejercicioSel = $derived(
    lesson.ejercicios.find((e) => e.numero === ejercicioActivo) ?? lesson.ejercicios[0]
  );

  function tituloEjercicio(ej: Ejercicio): string {
    return ej.historia || ej.enunciado;
  }
</script>

{#if lesson.tipo === 'leccion'}
  <header class="space-y-3">
    <span class="text-xs font-semibold uppercase tracking-widest text-primary">
      Semana {lesson.semana} · Día {lesson.dia}
    </span>
    <h1 class="text-4xl font-bold tracking-tight text-on-surface">{lesson.titulo}</h1>
    <p class="text-base font-medium text-on-surface-variant">{lesson.objetivo}</p>
    <p class="text-base leading-relaxed whitespace-pre-line text-on-surface-variant">
      {lesson.contenido.intro}
    </p>
    <Callout
      tipo="info"
      texto="Aquí importa entender la lógica. La sintaxis la completas con Tab (autocompletado), el tutor o búsquedas. No memorices puntos y comas."
    />
    <NotebookLmExport {lesson} {lessons} />
  </header>

  <article class="mt-8 space-y-8">
    {#each lesson.contenido.secciones as s, i (i)}
      <section class="space-y-3 rounded-lg border border-outline-variant/60 p-5">
        <h3 class="text-lg font-semibold text-on-surface">{s.titulo}</h3>
        <div class="rounded-md border-l-4 border-primary bg-primary/5 p-4">
          <p class="text-xs font-bold uppercase tracking-wider text-primary">En código</p>
          <p class="mt-2 leading-relaxed whitespace-pre-line text-on-surface">{s.texto}</p>
        </div>
        <div class="rounded-md border-l-4 border-tertiary bg-tertiary-container/10 p-4">
          <p class="text-xs font-bold uppercase tracking-wider text-tertiary">Para qué sirve</p>
          <p class="mt-2 leading-relaxed whitespace-pre-line text-on-surface-variant">
            {s.paraQueSirve}
          </p>
        </div>
        <p class="text-sm leading-relaxed text-on-surface-variant">
          <span class="font-medium text-on-surface">Analogía breve:</span>
          {s.analogia}
        </p>
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
        Repaso Semana {lesson.semana} · Día {lesson.dia}
      </span>
    </div>
    <h1 class="text-4xl font-bold tracking-tight text-on-surface">{lesson.titulo}</h1>
    <p class="text-base font-medium text-on-surface">{lesson.objetivo}</p>
    <p class="text-sm leading-relaxed whitespace-pre-line text-on-surface-variant">
      {lesson.instrucciones}
    </p>
    <p class="text-xs text-on-surface-variant">
      No es un examen de sintaxis: demuestra que entiendes el flujo. Puedes ir a cualquier día cuando quieras.
    </p>
    <NotebookLmExport {lesson} {lessons} />
  </header>
{/if}

<section class="mt-8 space-y-3">
  <h2 class="text-xs font-semibold uppercase tracking-widest text-primary">
    {lesson.tipo === 'examen' ? `Retos (${totalEjercicios})` : 'Práctica'}
  </h2>
  <div class="grid gap-3">
    {#each lesson.ejercicios as ej (ej.numero)}
      {@const completo = correctos.has(ej.numero)}
      {@const activo = ej.numero === ejercicioActivo}
      <button
        type="button"
        onclick={() => onSelectEjercicio(ej.numero)}
        class="flex items-center justify-between border bg-surface-container p-5 text-left transition-all
          {activo ? 'border-primary' : 'border-outline-variant hover:border-on-surface-variant'}"
      >
        <div class="flex items-center gap-4">
          <span
            class="flex h-8 w-8 shrink-0 items-center justify-center rounded text-sm font-bold
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
          <span class="text-sm {activo ? 'font-semibold text-on-surface' : 'text-on-surface'}">
            {tituloEjercicio(ej)}
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

{#if ejercicioSel}
  <section class="mt-6 space-y-4 rounded-lg border border-primary/30 bg-surface-container-low p-5">
    <h3 class="text-sm font-semibold text-primary">Tu código debe lograr…</h3>
    <ul class="list-disc space-y-1 pl-5 text-sm text-on-surface-variant">
      {#each ejercicioSel.queDebePasar as q, i (i)}
        <li>{q}</li>
      {/each}
    </ul>
    <p class="text-sm text-on-surface-variant">{ejercicioSel.enunciado}</p>
  </section>
{/if}
