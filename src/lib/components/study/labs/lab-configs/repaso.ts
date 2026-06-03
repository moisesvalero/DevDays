import type { LabUiVariant, RepasoLabConfig } from '$lib/types/laboratorio';
import { fields, specComment, specDerived, specLet } from './helpers';
import type { SpecLine } from '../LiveSpecPanel.svelte';

function card(
	variant: LabUiVariant,
	titulo: string,
	descripcion: string,
	fieldDefs: ReturnType<typeof fields>,
	derived: Array<{
		resultKey: string;
		name: string;
		expr: string;
		compute: (v: Record<string, number | boolean | string>) => string | number | boolean;
	}>
) {
	const specLines: SpecLine[] = [
		specComment(`// Repaso: ${titulo}`),
		...fieldDefs.map((f) => specLet(f.key)),
		...derived.map((d) => specDerived(d.name, d.expr, d.resultKey))
	];
	return { titulo, descripcion, variant, fields: fieldDefs, derived, specLines };
}

export const repasoS1: RepasoLabConfig = {
	titulo: 'Repaso visual — Semana 1',
	subtitulo: 'Variables, condiciones y arrays en un panel antes de los 5 retos.',
	cards: [
		card(
			'profile',
			'Variables + template',
			'Ficha con nombre y precio en etiqueta.',
			fields(
				{ key: 'nombre', label: 'Nombre', kind: 'string', default: 'Moisés' },
				{ key: 'ciudad', label: 'Ciudad', kind: 'string', default: 'Alcoy' }
			),
			[
				{
					resultKey: 'envio',
					name: 'mensaje',
					expr: 'template',
					compute: (v) => `Envío para ${v.nombre} hacia ${v.ciudad}`
				}
			]
		),
		card(
			'status',
			'Condición stock',
			'Misma regla que alerta de stock en retos.',
			fields({ key: 'stock', label: 'Stock', kind: 'number', default: 3, min: 0, max: 20 }),
			[
				{
					resultKey: 'tag',
					name: 'estado',
					expr: 'stock < 5',
					compute: (v) => ((v.stock as number) < 5 ? 'reponer' : 'ok')
				}
			]
		),
		card(
			'listops',
			'map en lista',
			'Duplicar valores del array.',
			fields({ key: 'mult', label: 'Multiplicador', kind: 'number', default: 2, min: 1, max: 5 }),
			[
				{
					resultKey: 'arr',
					name: 'doblado',
					expr: 'map * mult',
					compute: (v) => [1, 2, 3].map((n) => n * (v.mult as number)).join(', ')
				}
			]
		)
	]
};

export const repasoS2: RepasoLabConfig = {
	titulo: 'Repaso visual — Semana 2',
	subtitulo: 'Objetos, async y persistencia.',
	cards: [
		card(
			'profile',
			'Objeto producto',
			'Card con propiedades.',
			fields(
				{ key: 'nombre', label: 'Producto', kind: 'string', default: 'Pack' },
				{ key: 'precio', label: 'Precio', kind: 'number', default: 29, min: 1, max: 200 }
			),
			[
				{
					resultKey: 'line',
					name: 'card',
					expr: '{ nombre, precio }',
					compute: (v) => `${v.nombre} ${v.precio}€`
				}
			]
		),
		card(
			'timeline',
			'Async catálogo',
			'Estado de carga fetch.',
			fields({ key: 'ok', label: 'Fetch OK', kind: 'boolean', default: true }),
			[
				{
					resultKey: 'estado',
					name: 'fetch',
					expr: 'await catalog',
					compute: (v) => (v.ok ? 'Catálogo cargado' : 'Error red')
				}
			]
		),
		card(
			'cta',
			'localStorage tema',
			'Preferencia guardada.',
			fields({ key: 'dark', label: 'Oscuro', kind: 'boolean', default: false }),
			[
				{
					resultKey: 'theme',
					name: 'theme',
					expr: 'storage.theme',
					compute: (v) => (v.dark ? 'dark' : 'light')
				}
			]
		)
	]
};

export const repasoS3: RepasoLabConfig = {
	titulo: 'Repaso visual — Semana 3',
	subtitulo: 'Runes Svelte 5 en un componente.',
	cards: [
		card(
			'inventory',
			'$state contador',
			'Cantidad mutable.',
			fields({ key: 'qty', label: 'Qty', kind: 'number', default: 2, min: 0, max: 10 }),
			[
				{
					resultKey: 'total',
					name: 'subtotal',
					expr: 'qty * 10',
					compute: (v) => (v.qty as number) * 10
				}
			]
		),
		card(
			'formula',
			'$derived IVA',
			'Total con impuesto.',
			fields(
				{ key: 'base', label: 'Base', kind: 'number', default: 100, min: 0, max: 500 },
				{ key: 'iva', label: 'IVA%', kind: 'number', default: 21, min: 0, max: 30 }
			),
			[
				{
					resultKey: 'total',
					name: 'total',
					expr: 'derived',
					compute: (v) => Math.round((v.base as number) * (1 + (v.iva as number) / 100))
				}
			]
		),
		card(
			'form',
			'bind input',
			'Two-way en email.',
			fields({ key: 'email', label: 'Email', kind: 'string', default: 'test@dev.com' }),
			[
				{
					resultKey: 'valid',
					name: 'ok',
					expr: 'includes @',
					compute: (v) => String(v.email).includes('@')
				}
			]
		)
	]
};

export const repasoS4: RepasoLabConfig = {
	titulo: 'Repaso visual — Semana 4',
	subtitulo: 'Rutas, load y formulario.',
	cards: [
		card(
			'route',
			'Ruta activa',
			'pathname → vista.',
			fields({ key: 'path', label: 'Ruta', kind: 'string', default: '/estudio' }),
			[
				{
					resultKey: 'vista',
					name: 'page',
					expr: 'route',
					compute: (v) => `Página: ${v.path}`
				}
			]
		),
		card(
			'timeline',
			'load data',
			'Datos antes de render.',
			fields({ key: 'titulo', label: 'titulo', kind: 'string', default: 'Hola' }),
			[
				{
					resultKey: 'data',
					name: 'load',
					expr: 'return { titulo }',
					compute: (v) => `data: ${v.titulo}`
				}
			]
		),
		card(
			'form',
			'Form action',
			'Submit al servidor.',
			fields({ key: 'sent', label: 'Enviado', kind: 'boolean', default: false }),
			[
				{
					resultKey: 'msg',
					name: 'form',
					expr: 'action',
					compute: (v) => (v.sent ? 'Guardado' : 'Editar y enviar')
				}
			]
		)
	]
};

export const repasoS5: RepasoLabConfig = {
	titulo: 'Repaso visual — Taller completo',
	subtitulo: 'Del concepto al deploy: visión integrada.',
	cards: [
		card(
			'component',
			'Stack',
			'Piezas del proyecto.',
			fields({ key: 'svelte', label: 'SvelteKit', kind: 'boolean', default: true }),
			[
				{
					resultKey: 'stack',
					name: 'tech',
					expr: 'full stack',
					compute: (v) => (v.svelte ? 'SvelteKit + Supabase + Vercel' : '—')
				}
			]
		),
		card(
			'formula',
			'Types + env',
			'Seguridad en build.',
			fields({ key: 'typed', label: 'TypeScript', kind: 'boolean', default: true }),
			[
				{
					resultKey: 'build',
					name: 'ci',
					expr: 'check + build',
					compute: (v) => (v.typed ? 'npm run check ✓' : 'Sin tipos')
				}
			]
		),
		card(
			'timeline',
			'Deploy',
			'Producción.',
			fields({ key: 'live', label: 'En Vercel', kind: 'boolean', default: true }),
			[
				{
					resultKey: 'url',
					name: 'prod',
					expr: 'vercel prod',
					compute: (v) => (v.live ? 'Production live' : 'Solo local')
				}
			]
		)
	]
};
