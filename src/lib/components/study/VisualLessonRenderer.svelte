<script lang="ts">

  import type { IdLaboratorio } from '$lib/types/laboratorio';

  import DedicatedDayLesson from './labs/DedicatedDayLesson.svelte';

  import RepasoVisual from './labs/RepasoVisual.svelte';

  import {

    isRepasoId,

    isPremiumLessonId,

    isArtisanalLessonId,

    LAB_LOADERS

  } from './labs/registry';



  let { laboratorio }: { laboratorio: IdLaboratorio } = $props();



  const Dedicated = $derived.by(async () => {

    const loader = LAB_LOADERS[laboratorio];

    if (!loader) return null;

    const mod = await loader();

    return mod.default;

  });

</script>



{#if isArtisanalLessonId(laboratorio)}

  {#await Dedicated}

    <p class="text-sm text-on-surface-variant">Cargando laboratorio…</p>

  {:then Component}

    {#if Component}

      <Component />

    {/if}

  {:catch}

    <p class="text-sm text-destructive">No se pudo cargar el laboratorio.</p>

  {/await}

{:else if isRepasoId(laboratorio)}

  <RepasoVisual id={laboratorio} />

{:else if isPremiumLessonId(laboratorio)}

  <DedicatedDayLesson id={laboratorio} />

{:else}

  <p class="text-sm text-on-surface-variant">Laboratorio no disponible: {laboratorio}</p>

{/if}


