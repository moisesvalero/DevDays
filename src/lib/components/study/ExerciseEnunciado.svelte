<script lang="ts">
  import type { EnunciadoEjercicio } from '$lib/types/lesson';
  import CodeBlock from './CodeBlock.svelte';

  let { enunciado }: { enunciado: EnunciadoEjercicio } = $props();

  const letras = 'abcdefghijklmnopqrstuvwxyz';

  const salidaEsCodigo = $derived(
    enunciado.salidaEsperada.includes('\n') ||
      /^[\d\[\{'"`truefals\-]/.test(enunciado.salidaEsperada.trim())
  );
</script>

<section class="space-y-4 text-sm leading-relaxed text-on-surface">
  <section>
    <p class="mb-1 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
      Planteamiento
    </p>
    <p>{enunciado.planteamiento}</p>
  </section>

  <section>
    <p class="mb-1 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
      Código de partida
    </p>
    <p class="text-on-surface-variant">
      Utilice la plantilla del editor como punto de partida; complete las partes indicadas en los
      requisitos.
    </p>
  </section>

  <section>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
      Tareas
    </p>
    <ol class="list-none space-y-2 pl-0">
      {#each enunciado.requisitos as req, i (i)}
        <li class="flex gap-2">
          <span class="shrink-0 font-medium text-primary">({letras[i] ?? i + 1})</span>
          <span>{req}</span>
        </li>
      {/each}
    </ol>
  </section>

  <section>
    <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
      Salida esperada
    </p>
    {#if salidaEsCodigo}
      <CodeBlock code={enunciado.salidaEsperada.trim()} language="javascript" />
    {:else}
      <pre
        class="overflow-x-auto rounded-lg border border-outline-variant bg-surface-container p-3 font-mono text-sm"
      >{enunciado.salidaEsperada.trim()}</pre>
    {/if}
  </section>

  {#if enunciado.notas?.trim()}
    <p class="text-xs text-on-surface-variant">
      <span class="font-medium text-on-surface">Nota.</span>
      {enunciado.notas}
    </p>
  {/if}
</section>
