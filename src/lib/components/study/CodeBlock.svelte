<script lang="ts">
	import hljs from 'highlight.js/lib/core';
	import javascript from 'highlight.js/lib/languages/javascript';
	import 'highlight.js/styles/atom-one-dark.css';

	hljs.registerLanguage('javascript', javascript);

	let {
		code,
		language = 'javascript'
	}: {
		code: string;
		language?: string;
	} = $props();

	const highlighted = $derived(hljs.highlight(code.replace(/\s+$/, ''), { language }).value);
</script>

<pre
	class="overflow-x-auto rounded-lg border border-outline-variant bg-[#282c34] p-4 font-mono text-sm leading-relaxed"><code
		class="hljs language-{language}">{@html highlighted}</code
	></pre>

<style>
	:global(.hljs) {
		background: transparent !important;
		padding: 0 !important;
	}
</style>
