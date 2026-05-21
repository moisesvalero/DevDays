/**
 * Scaffold artesanal mínimo para días 15-34. node scripts/scaffold-artisanal.mjs
 * Genera DayNVisualLesson + 3 labs con InteractiveLabLayout (mejorar UI después).
 */
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const labsRoot = join(root, 'src/lib/components/study/labs');

const DAYS = [
  { n: 15, id: 'dia-15-svelte-stack', hero: 'Svelte = UI por componentes', sub: 'Padre/hijo: datos bajan, eventos suben.', labs: ['Árbol de componentes', 'Props down', 'Events up'], specs: ['Svelte', 'props', 'on:click'] },
  { n: 16, id: 'dia-16-svelte-archivo', hero: 'Anatomía del .svelte', sub: 'script, markup y style.', labs: ['Bloque script', 'Markup', 'Style scoped'], specs: ['script', 'HTML', 'style'] },
  { n: 17, id: 'dia-17-state', hero: '$state — estado mutable', sub: 'Carrito y contador en $state.', labs: ['Contador', 'Toggle UI', 'Formulario'], specs: ['$state', '$state bool', '$state string'] },
  { n: 18, id: 'dia-18-derived', hero: '$derived y $effect', sub: 'IVA derivado y efectos.', labs: ['Precio + IVA', 'Stock bajo', 'Log simulado'], specs: ['$derived', '$derived bool', '$effect'] },
  { n: 19, id: 'dia-19-props', hero: '$props — API del componente', sub: 'Card reutilizable.', labs: ['Props obligatorias', 'Default props', 'Props tipadas'], specs: ['$props', 'default', 'types'] },
  { n: 20, id: 'dia-20-eventos', hero: 'Eventos y bind:', sub: 'onclick y two-way.', labs: ['onclick', 'bind:value', 'bind:checked'], specs: ['onclick', 'bind:value', 'bind:checked'] },
  { n: 22, id: 'dia-22-rutas', hero: 'Rutas SvelteKit', sub: 'Mapa de navegación.', labs: ['Navegación', 'Link activo', '404'], specs: ['nav', 'active', '404'] },
  { n: 23, id: 'dia-23-layouts', hero: 'Layouts y slots', sub: 'Shell de app.', labs: ['Shell', 'Slot principal', 'Layout anidado'], specs: ['layout', 'slot', 'nested'] },
  { n: 24, id: 'dia-24-dinamicas', hero: 'Rutas dinámicas', sub: 'Lista a detalle.', labs: ['Lista → detalle', 'params.slug', '404 producto'], specs: ['list', 'slug', '404'] },
  { n: 25, id: 'dia-25-load', hero: 'load()', sub: 'Datos antes de pintar.', labs: ['load function', 'Skeleton', '$props data'], specs: ['load', 'skeleton', 'data'] },
  { n: 26, id: 'dia-26-forms', hero: 'Form actions', sub: 'POST al servidor.', labs: ['POST action', 'Validación', 'Progressive'], specs: ['POST', 'valid', 'enhance'] },
  { n: 27, id: 'dia-27-supabase', hero: 'Supabase', sub: 'Auth y datos.', labs: ['Login', 'Query', 'RLS'], specs: ['auth', 'query', 'RLS'] },
  { n: 29, id: 'dia-29-typescript', hero: 'TypeScript', sub: 'Tipos en producto.', labs: ['Interface Producto', 'Props tipadas', 'Union types'], specs: ['interface', 'props', 'union'] },
  { n: 30, id: 'dia-30-env', hero: 'Variables de entorno', sub: 'Públicas y secretas.', labs: ['Variables públicas', 'Secrets servidor', 'hooks.server'], specs: ['PUBLIC', 'SECRET', 'hooks'] },
  { n: 31, id: 'dia-31-deploy', hero: 'Deploy Vercel', sub: 'Pipeline a producción.', labs: ['Pipeline', 'Preview', 'Env prod'], specs: ['CI', 'preview', 'prod'] },
  { n: 32, id: 'dia-32-stack-story', hero: 'Pitch del stack', sub: 'Historia de 2 min.', labs: ['Problema de negocio', 'Stack elegido', 'Demo en vivo'], specs: ['problem', 'stack', 'demo'] },
  { n: 33, id: 'dia-33-entrevista', hero: 'Entrevista STAR', sub: 'Situación, acción, resultado.', labs: ['Situación', 'Acción', 'Resultado'], specs: ['S', 'A', 'R'] },
  { n: 34, id: 'dia-34-proyecto', hero: 'Demo del proyecto', sub: 'Guiar la demo.', labs: ['Hook (15s)', 'Demo guiada', 'Next steps'], specs: ['hook', 'demo', 'next'] }
];

function labComponent(day, idx, titulo, spec) {
  const name = `Lab${idx + 1}`;
  const keys = idx === 0 ? ['a'] : idx === 1 ? ['b'] : ['c'];
  const field = keys[0];
  return `<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';
  import LiveValue from '../LiveValue.svelte';

  let values = $state({ ${field}: ${idx === 2 ? "'valor'" : idx === 1 ? 'false' : '1'} });
  const out = $derived(String(values.${field}));
  const results = $derived({ out });
</script>

<InteractiveLabLayout hint="Laboratorio día ${day}: ${titulo}. Edita el spec.">
  {#snippet preview()}
    <div class="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
      <p class="text-xs font-bold uppercase text-primary">${titulo}</p>
      <p class="mt-4 text-sm text-on-surface-variant">UI interactiva — personaliza este lab como día 2.</p>
      {#if typeof values.${field} === 'boolean'}
        <label class="mt-4 flex justify-center gap-2"><input type="checkbox" bind:checked={values.${field}} class="accent-primary" /> toggle</label>
      {:else if typeof values.${field} === 'number'}
        <input type="range" min="0" max="10" bind:value={values.${field}} class="mt-4 w-full max-w-xs accent-primary" />
        <p class="mt-2 font-mono text-3xl font-bold"><LiveValue value={values.${field}} /></p>
      {:else}
        <input type="text" bind:value={values.${field}} class="mt-4 rounded border px-3 py-2" />
      {/if}
      <p class="mt-4 font-mono text-lg text-on-surface">{out}</p>
    </div>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} lines={[
      { kind: 'comment', text: '// ${titulo}' },
      { kind: 'let', key: '${field}' },
      { kind: 'derived', name: 'out', expr: '${spec}', resultKey: 'out' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
`;
}

function visualLesson(day, cfg) {
  const imports = cfg.labs.map((_, i) => `import Lab${i + 1} from './Lab${i + 1}.svelte';`).join('\n  ');
  const sections = cfg.labs.map((t, i) => `  <LabSection numero={${i + 1}} titulo="${t}" spec="${cfg.specs[i]}" anchorId={seccionAnchorId(dia, ${i})}><Lab${i + 1} /></LabSection>`).join('\n');
  return `<script lang="ts">
  import FlowDiagram from '../FlowDiagram.svelte';
  import LabSection from '../LabSection.svelte';
  ${imports}
  import { seccionAnchorId } from '$lib/data/lessons/_helpers';
  const dia = ${day};
</script>

<div class="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-tertiary/5 p-8">
  <p class="text-[10px] font-bold tracking-[0.25em] text-primary uppercase">Laboratorio visual</p>
  <h2 class="mt-2 text-2xl font-bold text-on-surface">${cfg.hero}</h2>
  <p class="mt-3 text-sm text-on-surface-variant">${cfg.sub}</p>
</div>
<article class="mt-10 space-y-10">
${sections}
</article>
`;
}

const registryLines = [];
for (const d of DAYS) {
  const dir = join(labsRoot, `day${d.n}`);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  d.labs.forEach((titulo, i) => {
    writeFileSync(join(dir, `Lab${i + 1}.svelte`), labComponent(d.n, i, titulo, d.specs[i]));
  });
  writeFileSync(join(dir, `Day${d.n}VisualLesson.svelte`), visualLesson(d.n, d));
  registryLines.push(`  '${d.id}': () => import('./day${d.n}/Day${d.n}VisualLesson.svelte'),`);
  console.log('scaffold day', d.n);
}

console.log('\nAdd to registry:\n' + registryLines.join('\n'));
