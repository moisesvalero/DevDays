<script lang="ts">
  import type { Leccion } from '$lib/types/lesson';
  import { Button } from '$lib/components/ui/button';
  import {
    copyNotebookMarkdown,
    downloadNotebookMarkdown,
    NOTEBOOKLM_URL
  } from '$lib/lesson-notebook-export';

  let {
    lesson,
    lessons
  }: {
    lesson: Leccion;
    lessons: Leccion[];
  } = $props();

  const esRepaso = $derived(lesson.tipo === 'examen');
  let copiado = $state(false);

  async function copiar() {
    const ok = await copyNotebookMarkdown(lesson, lessons);
    copiado = ok;
    if (ok) {
      setTimeout(() => {
        copiado = false;
      }, 2500);
    }
  }

  function descargar() {
    downloadNotebookMarkdown(lesson, lessons);
  }
</script>

<section class="rounded-lg border border-outline-variant bg-surface-container-low p-5">
  <div class="mb-3 flex items-center gap-2">
    <span class="material-symbols-outlined text-primary">podcasts</span>
    <h3 class="text-sm font-semibold text-on-surface">
      {esRepaso ? 'Podcast repaso semanal (NotebookLM)' : 'Podcast del día (NotebookLM)'}
    </h3>
  </div>
  <p class="mb-4 text-sm text-on-surface-variant">
    {#if esRepaso}
      Descarga el <strong>repaso de toda la semana {lesson.semana}</strong> para un audio un poco más largo.
      Luego haz los retos del examen aquí.
    {:else}
      Descarga solo esta lección para un audio corto en NotebookLM. Escucha y después practica los
      ejercicios de abajo.
    {/if}
  </p>
  <ol class="mb-4 list-decimal space-y-1 pl-5 text-xs text-on-surface-variant">
    <li>Descargar o copiar el archivo .md</li>
    <li>Abrir NotebookLM → nuevo cuaderno → añadir fuente (subir archivo o pegar)</li>
    <li>Audio Overview → {esRepaso ? 'Default o Deep Dive' : 'The Brief o Short'}</li>
  </ol>
  <div class="flex flex-wrap gap-2">
    <Button type="button" variant="default" onclick={descargar}>
      <span class="material-symbols-outlined mr-1 text-base">download</span>
      Descargar .md
    </Button>
    <Button type="button" variant="outline" onclick={copiar}>
      <span class="material-symbols-outlined mr-1 text-base">content_copy</span>
      {copiado ? 'Copiado' : 'Copiar texto'}
    </Button>
    <Button
      href={NOTEBOOKLM_URL}
      target="_blank"
      rel="noopener noreferrer"
      variant="outline"
    >
      <span class="material-symbols-outlined mr-1 text-base">open_in_new</span>
      Abrir NotebookLM
    </Button>
  </div>
</section>
