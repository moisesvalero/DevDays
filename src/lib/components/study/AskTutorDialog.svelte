<script lang="ts">
  import { tick } from 'svelte';
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
  } from '$lib/components/ui/dialog';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Button } from '$lib/components/ui/button';

  type ChatMsg = { role: 'user' | 'model'; text: string };

  let {
    open = $bindable(false),
    dia,
    ejercicio,
    enunciado,
    queDebePasar = [],
    codigoActual = ''
  }: {
    open: boolean;
    dia: number;
    ejercicio: number;
    enunciado: string;
    queDebePasar?: string[];
    codigoActual?: string;
  } = $props();

  let mensajes = $state<ChatMsg[]>([]);
  let input = $state('');
  let loading = $state(false);
  let scrollEl: HTMLDivElement | null = $state(null);

  // Reset del chat cuando cambia el ejercicio o el día (cada ejercicio empieza limpio).
  let lastKey = $state('');
  $effect(() => {
    const key = `${dia}-${ejercicio}`;
    if (key !== lastKey) {
      mensajes = [];
      input = '';
      lastKey = key;
    }
  });

  async function enviar() {
    const texto = input.trim();
    if (!texto || loading) return;
    mensajes = [...mensajes, { role: 'user', text: texto }];
    input = '';
    loading = true;
    await tick();
    scrollEl?.scrollTo({ top: scrollEl.scrollHeight });

    try {
      const res = await fetch('/api/preguntar', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          dia,
          ejercicio,
          enunciado,
          queDebePasar,
          codigoActual,
          mensaje: texto,
          historial: mensajes.slice(-12)
        })
      });
      const json = (await res.json()) as { respuesta?: string };
      mensajes = [
        ...mensajes,
        { role: 'model', text: json.respuesta || 'Sin respuesta.' }
      ];
    } catch {
      mensajes = [
        ...mensajes,
        { role: 'model', text: 'Error de red. Reintenta en unos segundos.' }
      ];
    } finally {
      loading = false;
      await tick();
      scrollEl?.scrollTo({ top: scrollEl.scrollHeight });
    }
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      enviar();
    }
  }
</script>

<Dialog bind:open>
  <DialogContent class="flex max-h-[80vh] flex-col gap-0 p-0 sm:max-w-2xl">
    <DialogHeader class="border-b border-outline-variant p-5">
      <DialogTitle class="flex items-center gap-2 text-on-surface">
        <span class="material-symbols-outlined text-tertiary">smart_toy</span>
        Pregunta al tutor
      </DialogTitle>
      <DialogDescription class="text-on-surface-variant">
        Día {dia} · Ejercicio {ejercicio}. Pregunta lo que necesites. El tutor no aprueba
        ejercicios desde aquí, solo aclara dudas.
      </DialogDescription>
    </DialogHeader>

    <div
      bind:this={scrollEl}
      class="min-h-[260px] flex-1 space-y-3 overflow-y-auto bg-surface-container-low p-5"
    >
      {#if mensajes.length === 0}
        <p class="text-sm text-on-surface-variant">
          Escribe tu duda sobre el enunciado, sobre el código o sobre el concepto.
        </p>
      {/if}

      {#each mensajes as m, i (i)}
        <div class="flex {m.role === 'user' ? 'justify-end' : 'justify-start'}">
          <div
            class="max-w-[85%] rounded border px-3 py-2 text-sm leading-relaxed
              {m.role === 'user'
              ? 'border-primary/40 bg-primary/10 text-on-surface'
              : 'border-outline-variant bg-surface-container text-on-surface'}"
          >
            <div
              class="mb-1 text-[10px] font-bold uppercase tracking-widest
                {m.role === 'user' ? 'text-primary' : 'text-tertiary'}"
            >
              {m.role === 'user' ? 'Tú' : 'Tutor'}
            </div>
            <div class="whitespace-pre-wrap">{m.text}</div>
          </div>
        </div>
      {/each}

      {#if loading}
        <div class="flex justify-start">
          <div class="rounded border border-outline-variant bg-surface-container px-3 py-2 text-sm">
            <span class="material-symbols-outlined animate-spin align-middle text-base text-primary"
              >progress_activity</span
            >
            <span class="ml-2 text-on-surface-variant">Pensando...</span>
          </div>
        </div>
      {/if}
    </div>

    <div class="border-t border-outline-variant bg-surface-container p-4">
      <Textarea
        bind:value={input}
        onkeydown={onKeydown}
        placeholder="¿Qué quieres preguntar? (Ctrl/Cmd + Enter para enviar)"
        rows={2}
        class="mb-3 resize-none bg-surface-container-lowest"
      />
      <div class="flex justify-end gap-2">
        <Button variant="outline" onclick={() => (open = false)}>Cerrar</Button>
        <Button onclick={enviar} disabled={loading || !input.trim()}>
          {loading ? 'Enviando...' : 'Enviar'}
        </Button>
      </div>
    </div>
  </DialogContent>
</Dialog>
