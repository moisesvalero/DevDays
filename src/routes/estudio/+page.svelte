<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import DayList from '$lib/components/study/DayList.svelte';
  import LessonContent from '$lib/components/study/LessonContent.svelte';
  import CodeEditor from '$lib/components/study/CodeEditor.svelte';
  import AiTutor from '$lib/components/study/AiTutor.svelte';
  import AskTutorDialog from '$lib/components/study/AskTutorDialog.svelte';

  let { data } = $props();

  let currentDay = $state(1);
  let ejercicioActivo = $state<1 | 2 | 3>(1);
  let correctosPorDia = $state<Map<number, Set<number>>>(new Map());
  let codigosPorEjercicio = $state<Map<string, string>>(new Map());
  let feedback = $state<string | null>(null);
  let correctoUltimo = $state<boolean | null>(null);
  let pistas = $state<string[]>([]);
  let snippetGuia = $state<string | null>(null);
  let loading = $state(false);
  let editorRef = $state<{ getValue: () => string } | null>(null);
  let dialogOpen = $state(false);

  const completados = $derived(
    new Set(data.progreso.filter((p) => p.estado === 'completado').map((p) => p.dia))
  );

  const lesson = $derived(data.lessons.find((l) => l.dia === currentDay) ?? data.lessons[0]);
  const correctosDia = $derived(correctosPorDia.get(currentDay) ?? new Set<number>());
  const ejercicio = $derived(
    lesson.ejercicios.find((e) => e.numero === ejercicioActivo) ?? lesson.ejercicios[0]
  );
  const claveActual = $derived(`${currentDay}-${ejercicioActivo}`);
  const codigoActual = $derived(codigosPorEjercicio.get(claveActual) ?? ejercicio.plantilla);
  const canComplete = $derived(correctosDia.size === 3);
  const dailyProgressPct = $derived(Math.round((correctosDia.size / 3) * 100));
  const yaCompletado = $derived(completados.has(currentDay));

  function resetFeedback() {
    feedback = null;
    correctoUltimo = null;
    pistas = [];
    snippetGuia = null;
  }

  function seleccionarDia(d: number) {
    currentDay = d;
    ejercicioActivo = 1;
    resetFeedback();
  }

  function seleccionarEjercicio(n: 1 | 2 | 3) {
    ejercicioActivo = n;
    resetFeedback();
  }

  function onChangeCode(v: string) {
    const next = new Map(codigosPorEjercicio);
    next.set(claveActual, v);
    codigosPorEjercicio = next;
  }

  async function corregir(nivelAyuda: 'normal' | 'extra' = 'normal') {
    if (loading) return;
    loading = true;
    // Conservamos pistas/snippet anteriores si es 'extra' para que el usuario no las pierda al pedir más ayuda; si es 'normal' las reseteamos.
    if (nivelAyuda === 'normal') {
      feedback = null;
      correctoUltimo = null;
      pistas = [];
      snippetGuia = null;
    }

    const codigo = editorRef?.getValue() ?? codigoActual;

    try {
      const res = await fetch('/api/corregir', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          dia: currentDay,
          ejercicio: ejercicioActivo,
          enunciado: ejercicio.enunciado,
          codigo,
          nivelAyuda
        })
      });
      const json = await res.json();
      feedback = json.feedback ?? 'Sin respuesta de la IA.';
      correctoUltimo = Boolean(json.correcto);
      pistas = Array.isArray(json.pistas) ? json.pistas : [];
      snippetGuia = json.snippetGuia ? String(json.snippetGuia) : null;

      // ÚNICA VÍA de marcar un ejercicio como hecho: que el tutor lo apruebe.
      if (json.correcto) {
        const nextMap = new Map(correctosPorDia);
        const set = new Set(correctosDia);
        set.add(ejercicioActivo);
        nextMap.set(currentDay, set);
        correctosPorDia = nextMap;
      }
    } catch {
      feedback = 'Error de red. Reintenta en unos segundos.';
      correctoUltimo = false;
      pistas = [];
      snippetGuia = null;
    } finally {
      loading = false;
    }
  }

  function pedirMasAyuda() {
    corregir('extra');
  }

  function abrirDialog() {
    dialogOpen = true;
  }

  async function marcarCompletado() {
    const fd = new FormData();
    fd.append('dia', String(currentDay));
    await fetch('/estudio?/marcar', { method: 'POST', body: fd });
    await invalidateAll();
  }
</script>

<header
  class="flex h-16 shrink-0 items-center justify-between border-b border-outline-variant bg-surface-container px-6"
>
  <div class="flex items-center gap-2">
    <span
      class="material-symbols-outlined text-primary"
      style="font-variation-settings: 'FILL' 1;">code_blocks</span
    >
    <span class="text-xl font-bold text-primary">DevDays</span>
  </div>
  <span class="text-xs text-on-surface-variant">{data.user.email}</span>
</header>

<main class="flex flex-1 overflow-hidden">
  <aside class="w-[280px] shrink-0 border-r border-outline-variant bg-surface-container-low">
    <DayList
      lessons={data.lessons}
      progreso={data.progreso}
      {currentDay}
      onSelect={seleccionarDia}
    />
  </aside>

  <section class="flex flex-1 flex-col overflow-y-auto bg-background">
    <div class="mx-auto w-full max-w-[920px] space-y-8 p-10">
      <LessonContent
        {lesson}
        correctos={correctosDia}
        {ejercicioActivo}
        onSelectEjercicio={seleccionarEjercicio}
      />

      <CodeEditor
        bind:this={editorRef}
        value={codigoActual}
        onChange={onChangeCode}
        filename={`dia${currentDay}_ej${ejercicioActivo}.js`}
      />

      <div class="flex justify-end gap-3">
        <Button variant="outline" onclick={() => onChangeCode(ejercicio.plantilla)}>
          Reset
        </Button>
        <Button onclick={() => corregir('normal')} disabled={loading}>
          {loading ? 'Corrigiendo...' : 'Corregir'}
        </Button>
      </div>
    </div>
  </section>

  <aside class="w-[360px] shrink-0 border-l border-outline-variant bg-surface-container p-6">
    <AiTutor
      {feedback}
      {pistas}
      {snippetGuia}
      {loading}
      {correctoUltimo}
      {dailyProgressPct}
      {canComplete}
      {yaCompletado}
      onComplete={marcarCompletado}
      onMasAyuda={pedirMasAyuda}
      onPreguntar={abrirDialog}
    />
  </aside>
</main>

<AskTutorDialog
  bind:open={dialogOpen}
  dia={currentDay}
  ejercicio={ejercicioActivo}
  enunciado={ejercicio.enunciado}
  {codigoActual}
/>
