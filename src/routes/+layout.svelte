<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import FloatingSupport from '$lib/components/help/FloatingSupport.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<title>Service Desk Studio — Técnico nivel 1</title>
	<meta
		name="description"
		content="Simulador práctico de tickets helpdesk para entrenar diagnóstico de técnico informático nivel 1."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<ModeWatcher defaultMode="dark" disableHeadScriptInjection />

<main id="main-content" class="min-h-screen">
	{@render children()}
</main>

<FloatingSupport />
<Toaster />
