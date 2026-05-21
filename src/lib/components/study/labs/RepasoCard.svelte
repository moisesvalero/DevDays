<script lang="ts">
  import type { LabBlockConfig, RepasoCardConfig } from '$lib/types/laboratorio';
  import PremiumLabBlock from './premium/PremiumLabBlock.svelte';

  let { card, index }: { card: RepasoCardConfig; index: number } = $props();

  const labConfig = $derived({
    titulo: card.titulo,
    spec: `repaso · ${index + 1}`,
    variant: card.variant,
    uiTitle: card.titulo,
    uiDescription: card.descripcion,
    fields: card.fields,
    derived: card.derived,
    specLines: card.specLines
  } satisfies LabBlockConfig);
</script>

<div class="lab-card-lift rounded-2xl border border-outline-variant/50 bg-card p-1">
  <PremiumLabBlock config={labConfig} />
</div>
