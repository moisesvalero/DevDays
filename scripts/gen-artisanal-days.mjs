/**
 * Genera días artesanales 16-34. node scripts/gen-artisanal-days.mjs
 */
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const base = join(root, 'src/lib/components/study/labs');

const DAYS = [
  { n: 16, id: 'dia-16-svelte-archivo', dia: 16, hero: 'Anatomía del .svelte', sub: 'script, markup y style en un solo archivo.', labs: [
    { t: 'Bloque script', s: 'script', fields: [{ k: 'count', l: 'count', t: 'n', d: 0, min: 0, max: 20 }], der: 'count', expr: 'let count' },
    { t: 'Markup', s: 'HTML', fields: [{ k: 'visible', l: 'Banner', t: 'b', d: true }], der: 'html', expr: 'if visible', str: true },
    { t: 'Style scoped', s: 'style', fields: [{ k: 'pro', l: 'Pro', t: 'b', d: false }], der: 'cls', expr: '.card.pro', str: true }
  ]},
  { n: 17, id: 'dia-17-state', dia: 17, hero: '$state — estado mutable', sub: 'Carrito y formulario con runes.', labs: [
    { t: 'Contador', s: '$state', fields: [{ k: 'qty', l: 'Qty', t: 'n', d: 1, min: 0, max: 10 }], der: 'linea', expr: 'qty * 25', num: true },
    { t: 'Toggle UI', s: '$state bool', fields: [{ k: 'abierto', l: 'Menú', t: 'b', d: false }], der: 'ui', expr: 'nav class', str: true },
    { t: 'Formulario', s: '$state str', fields: [{ k: 'nombre', l: 'Nombre', t: 's', d: 'Ana' }], der: 'preview', expr: 'avatar', str: true }
  ]},
  { n: 18, id: 'dia-18-derived', dia: 18, hero: '$derived y $effect', sub: 'IVA, alertas y analytics.', labs: [
    { t: 'Precio + IVA', s: '$derived', fields: [{ k: 'base', l: 'Base', t: 'n', d: 100, min: 0, max: 500 }, { k: 'iva', l: 'IVA%', t: 'n', d: 21, min: 0, max: 30 }], der: 'total', expr: 'base+iva', num: true },
    { t: 'Stock bajo', s: '$derived', fields: [{ k: 'stock', l: 'Stock', t: 'n', d: 4, min: 0, max: 20 }, { k: 'umbral', l: 'Umbral', t: 'n', d: 5, min: 1, max: 10 }], der: 'alerta', expr: 'stock<umbral', bool: true },
    { t: 'Log simulado', s: '$effect', fields: [{ k: 'page', l: 'Página', t: 's', d: '/checkout' }], der: 'log', expr: 'track(page)', str: true }
  ]},
  { n: 19, id: 'dia-19-props', dia: 19, hero: '$props — API del componente', sub: 'Card reutilizable.', labs: [
    { t: 'Props obligatorias', s: '$props', fields: [{ k: 'titulo', l: 'titulo', t: 's', d: 'Auriculares' }, { k: 'precio', l: 'precio', t: 'n', d: 49, min: 1, max: 500 }], der: 'card', expr: 'Card', str: true },
    { t: 'Default props', s: 'default', fields: [{ k: 'variant', l: 'variant', t: 's', d: 'sale' }], der: 'cls', expr: 'badge', str: true },
    { t: 'Props tipadas', s: 'types', fields: [{ k: 'dia', l: 'dia', t: 'n', d: 1, min: 1, max: 35 }], der: 'type', expr: 'Props', str: true }
  ]},
  { n: 20, id: 'dia-20-eventos', dia: 20, hero: 'Eventos y bind:', sub: 'onclick y two-way binding.', labs: [
    { t: 'onclick', s: 'onclick', fields: [{ k: 'n', l: 'Clics', t: 'n', d: 0, min: 0, max: 15 }], der: 'label', expr: 'increment', str: true },
    { t: 'bind:value', s: 'bind', fields: [{ k: 'email', l: 'Email', t: 's', d: 'user@mail.com' }], der: 'valid', expr: 'includes @', bool: true },
    { t: 'bind:checked', s: 'checked', fields: [{ k: 'news', l: 'News', t: 'b', d: false }], der: 'msg', expr: 'newsletter', str: true }
  ]},
  { n: 22, id: 'dia-22-rutas', dia: 22, hero: 'Rutas = mapa del producto', sub: 'Cada URL, una pantalla.', labs: [
    { t: 'Navegación', s: 'routes', fields: [{ k: 'ruta', l: 'Ruta', t: 's', d: '/estudio' }], der: 'pagina', expr: 'pathname', str: true },
    { t: 'Link activo', s: 'nav', fields: [{ k: 'activo', l: 'Nav idx', t: 'n', d: 0, min: 0, max: 2 }], der: 'nav', expr: 'active', str: true },
    { t: '404', s: '404', fields: [{ k: 'invalida', l: 'Inválida', t: 'b', d: false }], der: 'code', expr: 'notFound', num: true }
  ]},
  { n: 23, id: 'dia-23-layouts', dia: 23, hero: 'Layouts = shell de marca', sub: 'Header, slot y layouts anidados.', labs: [
    { t: 'Shell', s: 'layout', fields: [{ k: 'brand', l: 'Header', t: 'b', d: true }], der: 'layout', expr: 'shell', str: true },
    { t: 'Slot principal', s: 'slot', fields: [{ k: 'titulo', l: 'Título', t: 's', d: 'Dashboard' }], der: 'main', expr: 'slot', str: true },
    { t: 'Layout anidado', s: 'nested', fields: [{ k: 'sidebar', l: 'Sidebar', t: 'b', d: true }], der: 'grid', expr: 'cols', str: true }
  ]},
  { n: 24, id: 'dia-24-dinamicas', dia: 24, hero: 'Rutas dinámicas', sub: 'Lista a detalle con slug.', labs: [
    { t: 'Lista → detalle', s: 'list', fields: [{ k: 'slug', l: 'slug', t: 's', d: 'zapatillas' }], der: 'url', expr: '/producto/', str: true },
    { t: 'params.slug', s: 'slug', fields: [{ k: 'id', l: 'ID', t: 'n', d: 42, min: 1, max: 99 }], der: 'param', expr: 'params', str: true },
    { t: '404 producto', s: '404', fields: [{ k: 'found', l: 'Existe', t: 'b', d: true }], der: 'view', expr: 'found', str: true }
  ]},
  { n: 25, id: 'dia-25-load', dia: 25, hero: 'load() en SvelteKit', sub: 'Datos antes de render.', labs: [
    { t: 'load function', s: 'load', fields: [{ k: 'items', l: 'Items', t: 'n', d: 3, min: 0, max: 10 }], der: 'data', expr: 'return', str: true },
    { t: 'Skeleton', s: 'skeleton', fields: [{ k: 'loading', l: 'Loading', t: 'b', d: true }], der: 'vista', expr: 'skeleton', str: true },
    { t: '$props data', s: 'data', fields: [{ k: 'titulo', l: 'titulo', t: 's', d: 'Catálogo' }], der: 'props', expr: 'data prop', str: true }
  ]},
  { n: 26, id: 'dia-26-forms', dia: 26, hero: 'Form actions', sub: 'POST y validación servidor.', labs: [
    { t: 'POST action', s: 'POST', fields: [{ k: 'sent', l: 'Enviado', t: 'b', d: false }], der: 'msg', expr: 'action', str: true },
    { t: 'Validación', s: 'valid', fields: [{ k: 'email', l: 'Email', t: 's', d: 'a@b.com' }], der: 'ok', expr: 'valid', bool: true },
    { t: 'Progressive', s: 'enhance', fields: [{ k: 'enhance', l: 'Enhance', t: 'b', d: true }], der: 'mode', expr: 'progressive', str: true }
  ]},
  { n: 27, id: 'dia-27-supabase', dia: 27, hero: 'Supabase auth + datos', sub: 'Login, query y RLS.', labs: [
    { t: 'Login', s: 'auth', fields: [{ k: 'logged', l: 'Logueado', t: 'b', d: false }], der: 'user', expr: 'session', str: true },
    { t: 'Query', s: 'query', fields: [{ k: 'rows', l: 'Filas', t: 'n', d: 5, min: 0, max: 20 }], der: 'data', expr: 'select', str: true },
    { t: 'RLS', s: 'RLS', fields: [{ k: 'own', l: 'Solo míos', t: 'b', d: true }], der: 'policy', expr: 'rls', str: true }
  ]},
  { n: 29, id: 'dia-29-typescript', dia: 29, hero: 'TypeScript = contratos', sub: 'Interfaces y unions.', labs: [
    { t: 'Interface Producto', s: 'interface', fields: [{ k: 'nombre', l: 'nombre', t: 's', d: 'Bolso' }, { k: 'precio', l: 'precio', t: 'n', d: 45, min: 0, max: 300 }], der: 'ok', expr: 'Producto', bool: true },
    { t: 'Props tipadas', s: 'props', fields: [{ k: 'count', l: 'count', t: 'n', d: 0, min: 0, max: 99 }], der: 'type', expr: 'number', str: true },
    { t: 'Union types', s: 'union', fields: [{ k: 'estado', l: 'Estado 0-2', t: 'n', d: 1, min: 0, max: 2 }], der: 'badge', expr: 'OrderStatus', str: true }
  ]},
  { n: 30, id: 'dia-30-env', dia: 30, hero: 'Env y hooks.server', sub: 'Variables públicas y secretas.', labs: [
    { t: 'Variables públicas', s: 'PUBLIC', fields: [{ k: 'configured', l: 'OK', t: 'b', d: true }], der: 'client', expr: 'PUBLIC_', str: true },
    { t: 'Secrets servidor', s: 'SECRET', fields: [{ k: 'server', l: 'Servidor', t: 'b', d: true }], der: 'safe', expr: 'server only', str: true },
    { t: 'hooks.server', s: 'hooks', fields: [{ k: 'auth', l: 'Auth', t: 'b', d: true }], der: 'guard', expr: 'handle', str: true }
  ]},
  { n: 31, id: 'dia-31-deploy', dia: 31, hero: 'Deploy en Vercel', sub: 'CI, preview y prod.', labs: [
    { t: 'Pipeline', s: 'CI', fields: [{ k: 'build', l: 'Build OK', t: 'b', d: true }], der: 'step', expr: 'pipeline', str: true },
    { t: 'Preview', s: 'preview', fields: [{ k: 'branch', l: 'Branch', t: 's', d: 'feat/labs' }], der: 'url', expr: 'preview URL', str: true },
    { t: 'Env prod', s: 'prod', fields: [{ k: 'live', l: 'Live', t: 'b', d: true }], der: 'env', expr: 'production', str: true }
  ]},
  { n: 32, id: 'dia-32-stack-story', dia: 32, hero: 'Pitch del stack', sub: 'Problema, stack y demo.', labs: [
    { t: 'Problema de negocio', s: 'problem', fields: [{ k: 'pain', l: 'Dolor', t: 's', d: 'Onboarding lento' }], der: 'hook', expr: 'problem', str: true },
    { t: 'Stack elegido', s: 'stack', fields: [{ k: 'svelte', l: 'SvelteKit', t: 'b', d: true }], der: 'stack', expr: 'tech', str: true },
    { t: 'Demo en vivo', s: 'demo', fields: [{ k: 'mins', l: 'Minutos', t: 'n', d: 2, min: 1, max: 5 }], der: 'plan', expr: 'demo', str: true }
  ]},
  { n: 33, id: 'dia-33-entrevista', dia: 33, hero: 'Entrevista STAR', sub: 'Situación, acción, resultado.', labs: [
    { t: 'Situación', s: 'S', fields: [{ k: 'ctx', l: 'Contexto', t: 's', d: 'E-commerce MVP' }], der: 's', expr: 'situation', str: true },
    { t: 'Acción', s: 'A', fields: [{ k: 'act', l: 'Acción', t: 's', d: 'Migré a SvelteKit' }], der: 'a', expr: 'action', str: true },
    { t: 'Resultado', s: 'R', fields: [{ k: 'metric', l: 'Métrica', t: 's', d: '-40% tiempo carga' }], der: 'r', expr: 'result', str: true }
  ]},
  { n: 34, id: 'dia-34-proyecto', dia: 34, hero: 'Demo del proyecto', sub: 'Hook, demo y next steps.', labs: [
    { t: 'Hook (15s)', s: 'hook', fields: [{ k: 'sec', l: 'Segundos', t: 'n', d: 15, min: 5, max: 30 }], der: 'hook', expr: '15s', str: true },
    { t: 'Demo guiada', s: 'demo', fields: [{ k: 'step', l: 'Paso', t: 'n', d: 1, min: 1, max: 5 }], der: 'guide', expr: 'steps', str: true },
    { t: 'Next steps', s: 'next', fields: [{ k: 'ship', l: 'Ship', t: 'b', d: true }], der: 'next', expr: 'roadmap', str: true }
  ]}
];

function previewControls(fields) {
  return fields.map((f) => {
    if (f.t === 'b') return `<label class="flex items-center gap-3"><input type="checkbox" bind:checked={values.${f.k}} class="size-5 accent-primary" /><span>${f.l}</span></label>`;
    if (f.t === 'n') return `<label class="block space-y-2"><span class="text-sm">${f.l}</span><input type="range" min="${f.min ?? 0}" max="${f.max ?? 10}" bind:value={values.${f.k}} class="w-full accent-primary" /><span class="font-mono text-2xl font-bold"><LiveValue value={values.${f.k}} /></span></label>`;
    return `<label class="block space-y-2"><span class="text-sm">${f.l}</span><input type="text" bind:value={values.${f.k}} class="w-full rounded-lg border px-3 py-2" /></label>`;
  }).join('\n        ');
}

function genLabSimple(day, idx, lab) {
  const init = lab.fields.map((f) => {
    if (f.t === 's') return `${f.k}: '${String(f.d).replace(/'/g, "\\'")}'`;
    return `${f.k}: ${f.d}`;
  }).join(', ');
  const derKey = lab.der;
  let derivedBody = `String(values.${lab.fields[0].k})`;
  if (derKey === 'total' && lab.fields.length === 2) derivedBody = `Math.round(values.${lab.fields[0].k} * (1 + values.${lab.fields[1].k} / 100))`;
  else if (derKey === 'alerta') derivedBody = `values.stock < values.umbral`;
  else if (derKey === 'linea') derivedBody = `values.qty * 25`;
  else if (derKey === 'code') derivedBody = `values.invalida ? 404 : 200`;
  else if (derKey === 'card') derivedBody = `\`\${values.titulo} — \${values.precio}€\``;
  else if (derKey === 'valid') derivedBody = `String(values.email).includes('@')`;
  else if (derKey === 'msg') derivedBody = `values.news ? '¡Gracias por suscribirte!' : 'Marca la casilla'`;
  else if (derKey === 'nav') derivedBody = `['Home','Estudio','Perfil'][values.activo]`;
  else if (derKey === 'badge') derivedBody = `['pending','shipped','delivered'][values.estado]`;
  else if (derKey === 'cls') derivedBody = `values.pro ? 'card pro' : 'card'`;
  else if (derKey === 'html') derivedBody = `values.visible ? 'Banner visible' : 'Oculto'`;
  else if (derKey === 'ui') derivedBody = `values.abierto ? 'nav-open' : 'nav-closed'`;
  else if (derKey === 'preview') derivedBody = `String(values.nombre).charAt(0).toUpperCase()`;
  else if (derKey === 'log') derivedBody = `\`track: \${values.page}\``;
  else if (derKey === 'type') derivedBody = `\`Lección \${values.dia}\``;
  else if (derKey === 'label') derivedBody = `\`Añadido \${values.n} veces\``;
  else if (derKey === 'pagina') derivedBody = `\`Vista: \${values.ruta}\``;
  else if (derKey === 'ok') derivedBody = `typeof values.precio === 'number'`;
  else if (derKey === 'layout') derivedBody = `values.brand ? 'Header + slot + Footer' : 'Solo contenido'`;
  else if (derKey === 'main') derivedBody = `\`Main: \${values.titulo}\``;
  else if (derKey === 'grid') derivedBody = `values.sidebar ? 'sidebar | content' : 'content full'`;
  else if (derKey === 'url') derivedBody = `\`/producto/\${values.slug}\``;
  else if (derKey === 'user') derivedBody = `values.logged ? 'Sesión activa' : 'Invitado'`;
  else if (derKey === 'safe') derivedBody = `values.server ? 'Seguro en servidor' : '⚠️ Expuesto'`;
  else if (derKey === 'client') derivedBody = `values.configured ? 'Cliente OK' : 'Falta .env'`;
  else if (derKey === 'guard') derivedBody = `values.auth ? 'Ruta protegida' : 'Abierta'`;
  else if (derKey === 'step') derivedBody = `values.build ? 'build ✓ → deploy' : 'build falló'`;
  else if (derKey === 'stack') derivedBody = `values.svelte ? 'SvelteKit + Supabase + Vercel' : '—'`;
  else if (derKey === 'data') derivedBody = `\`\${values.rows} productos\``;
  else if (derKey === 'policy') derivedBody = `values.own ? 'RLS: user_id = auth.uid()' : 'Sin filtro'`;
  else if (derKey === 'param') derivedBody = `\`id=\${values.id}\``;
  else if (derKey === 'view') derivedBody = `values.found ? 'Detalle producto' : '404 Not Found'`;
  else if (derKey === 'vista') derivedBody = `values.loading ? '⬜ skeleton' : 'Lista cargada'`;
  else if (derKey === 'props') derivedBody = `\`data.titulo = \${values.titulo}\``;
  else if (derKey === 'mode') derivedBody = `values.enhance ? 'use:enhance ON' : 'POST clásico'`;
  else if (derKey === 'url') derivedBody = `\`preview-\${values.branch}.vercel.app\``;
  else if (derKey === 'env') derivedBody = `values.live ? 'Production env OK' : 'Solo preview'`;
  else if (derKey === 'hook') derivedBody = `values.pain`;
  else if (derKey === 'plan') derivedBody = `\`Demo \${values.mins} min\``;
  else if (derKey === 's') derivedBody = `values.ctx`;
  else if (derKey === 'a') derivedBody = `values.act`;
  else if (derKey === 'r') derivedBody = `values.metric`;
  else if (derKey === 'guide') derivedBody = `\`Paso \${values.step} de 5\``;
  else if (derKey === 'next') derivedBody = `values.ship ? 'Deploy → métricas' : 'Más iteración'`;

  const limits = lab.fields.filter((f) => f.t === 'n').map((f) => `${f.k}: { min: ${f.min ?? 0}, max: ${f.max ?? 10} }`).join(', ');
  const limitsProp = limits ? `{${limits}}` : '{}';

  return `<script lang="ts">
  import InteractiveLabLayout from '../InteractiveLabLayout.svelte';
  import LiveSpecPanel from '../LiveSpecPanel.svelte';
  import LiveValue from '../LiveValue.svelte';

  let values = $state({ ${init} });
  const out = $derived(${derivedBody});
  const results = $derived({ ${derKey}: out });
</script>

<InteractiveLabLayout hint="Día ${day}: ${lab.t}">
  {#snippet preview()}
    <div class="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-card p-6 space-y-4">
      <p class="text-xs font-bold uppercase text-primary">${lab.t}</p>
      ${previewControls(lab.fields)}
      <p class="rounded-lg bg-primary/10 px-4 py-3 font-mono text-lg font-semibold text-on-surface">{out}</p>
    </div>
  {/snippet}
  {#snippet spec()}
    <LiveSpecPanel bind:values {results} limits={${limitsProp}} lines={[
      { kind: 'comment', text: '// ${lab.t}' },
      ${lab.fields.map((f) => `{ kind: 'let', key: '${f.k}' }`).join(',\n      ')},
      { kind: 'derived', name: '${derKey}', expr: '${lab.expr}', resultKey: '${derKey}' }
    ]} />
  {/snippet}
</InteractiveLabLayout>
`;
}

function genLesson(d) {
  const imports = d.labs.map((_, i) => `import Lab${i + 1} from './Lab${i + 1}.svelte';`).join('\n  ');
  const sections = d.labs.map((lab, i) =>
    `  <LabSection numero={${i + 1}} titulo="${lab.t}" spec="${lab.s}" anchorId={seccionAnchorId(dia, ${i})}><Lab${i + 1} /></LabSection>`
  ).join('\n');
  return `<script lang="ts">
  import FlowDiagram from '../FlowDiagram.svelte';
  import LabSection from '../LabSection.svelte';
  ${imports}
  import { seccionAnchorId } from '$lib/data/lessons/_helpers';
  const dia = ${d.dia};
</script>

<div class="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-tertiary/5 p-8">
  <p class="text-[10px] font-bold tracking-[0.25em] text-primary uppercase">Laboratorio visual</p>
  <h2 class="mt-2 text-2xl font-bold text-on-surface">${d.hero}</h2>
  <p class="mt-3 text-sm text-on-surface-variant">${d.sub}</p>
</div>

<article class="mt-10 space-y-10">
${sections}
</article>
`;
}

const registry = [];
for (const d of DAYS) {
  const dir = join(base, `day${d.n}`);
  mkdirSync(dir, { recursive: true });
  d.labs.forEach((lab, i) => {
    writeFileSync(join(dir, `Lab${i + 1}.svelte`), genLabSimple(d.n, i, lab));
  });
  writeFileSync(join(dir, `Day${d.n}VisualLesson.svelte`), genLesson(d));
  registry.push(`  '${d.id}': () => import('./day${d.n}/Day${d.n}VisualLesson.svelte'),`);
  console.log('OK day', d.n);
}

writeFileSync(join(root, 'scripts', '_registry-snippet.txt'), registry.join('\n'));
console.log('Registry lines in scripts/_registry-snippet.txt');
