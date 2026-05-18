<script lang="ts">
  let {
    label = 'Ver Spec',
    lines,
    language = 'ts'
  }: {
    label?: string;
    lines: string[];
    language?: 'ts' | 'svelte';
  } = $props();

  let abierto = $state(false);
</script>

<div class="mt-4">
  <button
    type="button"
    onclick={() => (abierto = !abierto)}
    class="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-4 py-2 text-xs font-semibold tracking-wide text-primary uppercase transition-all hover:bg-primary/10"
    aria-expanded={abierto}
  >
    <span
      class="material-symbols-outlined text-base transition-transform duration-200"
      class:rotate-90={abierto}
    >
      {abierto ? 'code_off' : 'code'}
    </span>
    {abierto ? 'Ocultar' : label}
  </button>

  {#if abierto}
    <div class="mt-3 overflow-hidden rounded-xl border border-primary/25 bg-[#0d0b14] shadow-lg">
      <div class="flex items-center gap-2 border-b border-white/10 px-4 py-2">
        <span class="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"></span>
        <span class="h-2.5 w-2.5 rounded-full bg-[#febc2e]"></span>
        <span class="h-2.5 w-2.5 rounded-full bg-[#28c840]"></span>
        <span class="ml-2 text-[10px] font-medium tracking-widest text-white/40 uppercase">
          {language === 'svelte' ? 'spec.svelte' : 'spec.ts'}
        </span>
      </div>
      <pre class="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-emerald-300/95"><code
          >{#each lines as line, i (i)}{line}{'\n'}{/each}</code
        ></pre>
    </div>
  {/if}
</div>
