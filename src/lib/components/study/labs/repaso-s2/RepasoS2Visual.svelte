<script lang="ts">
	import LabSection from '../LabSection.svelte';
	import ProductoRepasoLab from './ProductoRepasoLab.svelte';
	import AsyncRepasoLab from './AsyncRepasoLab.svelte';
	import ThemeRepasoLab from './ThemeRepasoLab.svelte';
</script>

<div
	class="relative mb-8 overflow-hidden rounded-2xl border border-tertiary/30 bg-gradient-to-br from-tertiary/10 via-card to-primary/5 p-8"
>
	<p class="text-[10px] font-bold tracking-[0.25em] text-tertiary uppercase">Examen · Semana 2</p>
	<h2 class="mt-2 text-2xl font-bold text-on-surface">Objetos, async y navegador</h2>
	<p class="mt-3 text-sm text-on-surface-variant">
		Repasa en UI antes de los cinco retos de consola.
	</p>
</div>

<article class="space-y-10">
	<LabSection numero={1} titulo="Objeto producto" spec="repaso · object" anchorId="repaso-s2-0"
		><ProductoRepasoLab /></LabSection
	>
	<LabSection numero={2} titulo="Async catálogo" spec="repaso · fetch" anchorId="repaso-s2-1"
		><AsyncRepasoLab /></LabSection
	>
	<LabSection numero={3} titulo="localStorage tema" spec="repaso · storage" anchorId="repaso-s2-2"
		><ThemeRepasoLab /></LabSection
	>
</article>
