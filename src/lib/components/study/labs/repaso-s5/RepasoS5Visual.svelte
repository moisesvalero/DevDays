<script lang="ts">
	import LabSection from '../LabSection.svelte';
	import StackRepasoLab from './StackRepasoLab.svelte';
	import TypesRepasoLab from './TypesRepasoLab.svelte';
	import DeployRepasoLab from './DeployRepasoLab.svelte';
</script>

<div
	class="relative mb-8 overflow-hidden rounded-2xl border border-tertiary/30 bg-gradient-to-br from-tertiary/10 via-card p-8"
>
	<p class="text-[10px] font-bold tracking-[0.25em] text-tertiary uppercase">Examen · Semana 5</p>
	<h2 class="mt-2 text-2xl font-bold text-on-surface">Del concepto al deploy</h2>
</div>

<article class="space-y-10">
	<LabSection numero={1} titulo="Stack" spec="repaso · stack" anchorId="repaso-s5-0"
		><StackRepasoLab /></LabSection
	>
	<LabSection numero={2} titulo="Types + env" spec="repaso · ci" anchorId="repaso-s5-1"
		><TypesRepasoLab /></LabSection
	>
	<LabSection numero={3} titulo="Deploy" spec="repaso · vercel" anchorId="repaso-s5-2"
		><DeployRepasoLab /></LabSection
	>
</article>
