<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<title>DevDays — Portal de estudio</title>
	<meta
		name="description"
		content="Portal interactivo de 35 días para aprender JavaScript y SvelteKit."
	/>
</svelte:head>

<ModeWatcher defaultMode="dark" disableHeadScriptInjection />

<main id="main-content" class="min-h-screen">
	{@render children()}
</main>

<Toaster />
<ToastContainer />
