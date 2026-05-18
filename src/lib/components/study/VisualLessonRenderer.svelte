<script lang="ts">
  import type { IdLaboratorio } from '$lib/types/lesson';
  import Day2VisualLesson from './labs/day2/Day2VisualLesson.svelte';

  let { laboratorio }: { laboratorio: IdLaboratorio } = $props();
</script>

{#if laboratorio === 'dia-2-operadores'}
  <Day2VisualLesson />
{:else}
  <p class="text-sm text-on-surface-variant">Laboratorio no disponible.</p>
{/if}
