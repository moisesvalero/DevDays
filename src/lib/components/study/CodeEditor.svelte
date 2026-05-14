<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { EditorState } from '@codemirror/state';
  import { EditorView, keymap, lineNumbers, highlightActiveLine } from '@codemirror/view';
  import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
  import { javascript } from '@codemirror/lang-javascript';
  import {
    indentOnInput,
    bracketMatching,
    syntaxHighlighting,
    defaultHighlightStyle
  } from '@codemirror/language';
  import { oneDark } from '@codemirror/theme-one-dark';

  let {
    value = '',
    onChange,
    filename = 'exercise.js'
  }: {
    value: string;
    onChange?: (v: string) => void;
    filename?: string;
  } = $props();

  let host: HTMLDivElement;
  let view: EditorView | undefined;

  /**
   * Expone el contenido actual del editor.
   * Lo llamamos desde el padre con `bind:this` antes de mandar el código a la API.
   */
  export function getValue(): string {
    return view ? view.state.doc.toString() : value;
  }

  onMount(() => {
    view = new EditorView({
      parent: host,
      state: EditorState.create({
        doc: value,
        extensions: [
          lineNumbers(),
          highlightActiveLine(),
          history(),
          indentOnInput(),
          bracketMatching(),
          syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
          keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
          javascript(),
          oneDark,
          EditorView.lineWrapping,
          EditorView.updateListener.of((u) => {
            if (u.docChanged) {
              const v = u.state.doc.toString();
              onChange?.(v);
            }
          })
        ]
      })
    });
  });

  onDestroy(() => view?.destroy());

  /**
   * Si el padre cambia `value` (por ejemplo al cambiar de día/ejercicio),
   * sincronizamos el documento del editor con el nuevo valor.
   */
  $effect(() => {
    const v = value;
    if (view && v !== view.state.doc.toString()) {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: v }
      });
    }
  });
</script>

<div class="overflow-hidden rounded border border-outline-variant bg-surface-container-lowest">
  <div
    class="flex items-center justify-between border-b border-outline-variant bg-surface-container px-4 py-3"
  >
    <div class="flex items-center gap-2">
      <span class="material-symbols-outlined text-sm text-on-surface-variant">terminal</span>
      <span class="font-mono text-xs text-on-surface-variant">{filename}</span>
    </div>
    <span class="font-mono text-xs text-on-surface-variant">JavaScript</span>
  </div>
  <div bind:this={host} class="cm-host min-h-[320px] text-sm"></div>
</div>

<style>
  .cm-host :global(.cm-editor) {
    background: transparent;
  }
  .cm-host :global(.cm-scroller) {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
  }
  .cm-host :global(.cm-gutters) {
    background: transparent;
    border-right: 1px solid var(--color-outline-variant);
  }
</style>
