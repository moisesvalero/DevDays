<script lang="ts">
  import type { Snippet } from 'svelte';
  let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div
  class="fixed inset-0 flex flex-col overflow-hidden bg-background text-on-surface antialiased"
>
  {@render children()}
</div>
