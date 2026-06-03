import type { DayLabConfig } from '$lib/types/laboratorio';
import { block, fields, specComment } from './helpers';

export const day15: DayLabConfig = {
	heroTitle: 'Svelte = UI por componentes',
	heroSubtitle: 'Padre/hijo: datos bajan, eventos suben.',
	flowNodes: [
		{ id: '01', label: 'Component' },
		{ id: '02', label: 'Padre/Hijo', accent: true },
		{ id: '03', label: 'Página' }
	],
	labs: [
		block({
			variant: 'component',
			titulo: 'Árbol de componentes',
			spec: 'Svelte',
			uiTitle: 'App shell',
			uiDescription: 'Layout con header + página hijo.',
			fields: fields({ key: 'pagina', label: 'Página activa', kind: 'string', default: 'Home' }),
			derived: [
				{
					resultKey: 'ruta',
					name: 'vista',
					expr: 'App > Page',
					compute: (v) => `App → ${v.pagina}`
				}
			]
		}),
		block({
			variant: 'component',
			titulo: 'Props down',
			spec: 'props',
			uiTitle: 'Card hijo',
			uiDescription: 'El padre pasa título al hijo.',
			fields: fields({ key: 'titulo', label: 'Título card', kind: 'string', default: 'Ofertas' }),
			derived: [
				{
					resultKey: 'render',
					name: 'hijo',
					expr: '<Card title={titulo} />',
					compute: (v) => `Card: ${v.titulo}`
				}
			]
		}),
		block({
			variant: 'component',
			titulo: 'Events up',
			spec: 'on:click',
			uiTitle: 'Botón hijo',
			uiDescription: 'El hijo notifica click al padre.',
			fields: fields({
				key: 'clicks',
				label: 'Clicks',
				kind: 'number',
				default: 0,
				min: 0,
				max: 10
			}),
			derived: [
				{
					resultKey: 'evento',
					name: 'onSelect',
					expr: 'dispatch click',
					compute: (v) => `Seleccionado ${v.clicks} veces`
				}
			]
		})
	]
};

export const day16: DayLabConfig = {
	heroTitle: 'Anatomía del .svelte',
	heroSubtitle: 'script, markup y style en un solo archivo de producto.',
	flowNodes: [
		{ id: '01', label: '<script>' },
		{ id: '02', label: 'markup', accent: true },
		{ id: '03', label: '<style>' }
	],
	labs: [
		block({
			variant: 'component',
			titulo: 'Bloque script',
			spec: '<script>',
			uiTitle: 'Lógica',
			uiDescription: 'Estado definido en script, usado en HTML.',
			fields: fields({ key: 'count', label: 'count', kind: 'number', default: 0, min: 0, max: 20 }),
			derived: [
				{
					resultKey: 'logica',
					name: 'script',
					expr: 'let count',
					compute: (v) => `count = ${v.count}`
				}
			]
		}),
		block({
			variant: 'component',
			titulo: 'Markup',
			spec: 'HTML',
			uiTitle: 'Vista',
			uiDescription: 'El HTML reacciona al estado.',
			fields: fields({ key: 'visible', label: 'Mostrar banner', kind: 'boolean', default: true }),
			derived: [
				{
					resultKey: 'html',
					name: 'markup',
					expr: '{#if visible}',
					compute: (v) => (v.visible ? '<div>Banner</div>' : '<!-- oculto -->')
				}
			]
		}),
		block({
			variant: 'component',
			titulo: 'Style scoped',
			spec: '<style>',
			uiTitle: 'Tema card',
			uiDescription: 'Clase CSS según variante.',
			fields: fields({ key: 'pro', label: 'Variante pro', kind: 'boolean', default: false }),
			derived: [
				{
					resultKey: 'cls',
					name: 'className',
					expr: '.card.pro',
					compute: (v) => (v.pro ? 'card pro' : 'card')
				}
			]
		})
	]
};

export const day17: DayLabConfig = {
	heroTitle: '$state — estado mutable',
	heroSubtitle: 'El carrito y el contador viven en $state.',
	flowNodes: [
		{ id: '01', label: '$state' },
		{ id: '02', label: 'mutar', accent: true },
		{ id: '03', label: 'UI' }
	],
	labs: [
		block({
			variant: 'inventory',
			titulo: 'Contador',
			spec: '$state',
			uiTitle: 'Qty',
			uiDescription: 'Cantidad en carrito con $state.',
			fields: fields({
				key: 'qty',
				label: 'Cantidad',
				kind: 'number',
				default: 1,
				min: 0,
				max: 10
			}),
			derived: [
				{
					resultKey: 'linea',
					name: 'subtotal',
					expr: 'qty * precio',
					compute: (v) => (v.qty as number) * 25
				}
			],
			extraSpec: [specComment('// let qty = $state(1);')]
		}),
		block({
			variant: 'cta',
			titulo: 'Toggle UI',
			spec: '$state bool',
			uiTitle: 'Menú',
			uiDescription: 'Menú abierto/cerrado.',
			fields: fields({ key: 'abierto', label: 'Menú abierto', kind: 'boolean', default: false }),
			derived: [
				{
					resultKey: 'ui',
					name: 'clase',
					expr: 'abierto ? open : closed',
					compute: (v) => (v.abierto ? 'nav-open' : 'nav-closed')
				}
			]
		}),
		block({
			variant: 'form',
			titulo: 'Formulario',
			spec: '$state string',
			uiTitle: 'Input nombre',
			uiDescription: 'Campo controlado con $state.',
			fields: fields({ key: 'nombre', label: 'Nombre', kind: 'string', default: 'Ana' }),
			derived: [
				{
					resultKey: 'preview',
					name: 'avatar',
					expr: 'nombre[0]',
					compute: (v) => String(v.nombre).charAt(0).toUpperCase()
				}
			]
		})
	]
};

export const day18: DayLabConfig = {
	heroTitle: '$derived y $effect',
	heroSubtitle: 'Precio con IVA calculado; efectos secundarios controlados.',
	flowNodes: [
		{ id: '01', label: '$state' },
		{ id: '02', label: '$derived', accent: true },
		{ id: '03', label: '$effect' }
	],
	labs: [
		block({
			variant: 'formula',
			titulo: 'Precio + IVA',
			spec: '$derived',
			uiTitle: 'Checkout',
			uiDescription: 'Total derivado de base e IVA.',
			fields: fields(
				{ key: 'base', label: 'Base (€)', kind: 'number', default: 100, min: 0, max: 500 },
				{ key: 'iva', label: 'IVA %', kind: 'number', default: 21, min: 0, max: 30 }
			),
			derived: [
				{
					resultKey: 'total',
					name: 'totalConIva',
					expr: 'base * (1+iva/100)',
					compute: (v) => Math.round((v.base as number) * (1 + (v.iva as number) / 100))
				}
			]
		}),
		block({
			variant: 'status',
			titulo: 'Stock bajo',
			spec: '$derived bool',
			uiTitle: 'Alerta',
			uiDescription: 'Badge si stock < umbral.',
			fields: fields(
				{ key: 'stock', label: 'Stock', kind: 'number', default: 4, min: 0, max: 20 },
				{ key: 'umbral', label: 'Umbral', kind: 'number', default: 5, min: 1, max: 10 }
			),
			derived: [
				{
					resultKey: 'alerta',
					name: 'stockBajo',
					expr: 'stock < umbral',
					compute: (v) => (v.stock as number) < (v.umbral as number)
				}
			]
		}),
		block({
			variant: 'timeline',
			titulo: 'Log simulado',
			spec: '$effect',
			uiTitle: 'Analytics',
			uiDescription: '$effect reacciona al cambio de página.',
			fields: fields({ key: 'page', label: 'Página', kind: 'string', default: '/checkout' }),
			derived: [
				{
					resultKey: 'log',
					name: 'analytics',
					expr: '$effect(() => track(page))',
					compute: (v) => `track: ${v.page}`
				}
			]
		})
	]
};

export const day19: DayLabConfig = {
	heroTitle: '$props — API del componente',
	heroSubtitle: 'Card reutilizable con titulo y precio entrantes.',
	flowNodes: [
		{ id: '01', label: 'Padre' },
		{ id: '02', label: '$props', accent: true },
		{ id: '03', label: 'Card' }
	],
	labs: [
		block({
			variant: 'profile',
			titulo: 'Props obligatorias',
			spec: '$props()',
			uiTitle: 'ProductCard',
			uiDescription: 'titulo y precio desde el padre.',
			fields: fields(
				{ key: 'titulo', label: 'titulo', kind: 'string', default: 'Auriculares' },
				{ key: 'precio', label: 'precio', kind: 'number', default: 49, min: 1, max: 500 }
			),
			derived: [
				{
					resultKey: 'card',
					name: 'render',
					expr: '<Card {titulo} {precio} />',
					compute: (v) => `${v.titulo} — ${v.precio}€`
				}
			]
		}),
		block({
			variant: 'profile',
			titulo: 'Default props',
			spec: 'default',
			uiTitle: 'Badge',
			uiDescription: 'variant por defecto «sale».',
			fields: fields({ key: 'variant', label: 'variant', kind: 'string', default: 'sale' }),
			derived: [
				{
					resultKey: 'cls',
					name: 'badge',
					expr: 'badge-{variant}',
					compute: (v) => `badge-${v.variant}`
				}
			]
		}),
		block({
			variant: 'profile',
			titulo: 'Props tipadas',
			spec: 'interface Props',
			uiTitle: 'Types',
			uiDescription: 'Validación en tiempo de compilación.',
			fields: fields({ key: 'dia', label: 'dia', kind: 'number', default: 1, min: 1, max: 35 }),
			derived: [
				{
					resultKey: 'type',
					name: 'Props',
					expr: 'dia: number',
					compute: (v) => `Lección ${v.dia}`
				}
			]
		})
	]
};

export const day20: DayLabConfig = {
	heroTitle: 'Eventos y bind:',
	heroSubtitle: 'Inputs y botones enlazados al estado.',
	flowNodes: [
		{ id: '01', label: 'onclick' },
		{ id: '02', label: 'bind:', accent: true },
		{ id: '03', label: 'form' }
	],
	labs: [
		block({
			variant: 'cta',
			titulo: 'onclick',
			spec: 'onclick',
			uiTitle: 'CTA',
			uiDescription: 'Clic incrementa contador.',
			fields: fields({ key: 'n', label: 'Clics', kind: 'number', default: 0, min: 0, max: 15 }),
			derived: [
				{
					resultKey: 'label',
					name: 'cta',
					expr: 'onclick increment',
					compute: (v) => `Añadido ${v.n} veces`
				}
			]
		}),
		block({
			variant: 'form',
			titulo: 'bind:value',
			spec: 'bind:',
			uiTitle: 'Input email',
			uiDescription: 'Two-way bind en input.',
			fields: fields({ key: 'email', label: 'Email', kind: 'string', default: 'user@mail.com' }),
			derived: [
				{
					resultKey: 'valid',
					name: 'ok',
					expr: 'email includes @',
					compute: (v) => String(v.email).includes('@')
				}
			]
		}),
		block({
			variant: 'form',
			titulo: 'bind:checked',
			spec: 'bind:checked',
			uiTitle: 'Newsletter',
			uiDescription: 'Checkbox enlazado.',
			fields: fields({ key: 'news', label: 'Suscrito', kind: 'boolean', default: false }),
			derived: [
				{
					resultKey: 'msg',
					name: 'estado',
					expr: 'news ? Gracias : Vacío',
					compute: (v) => (v.news ? '¡Gracias por suscribirte!' : 'Marca la casilla')
				}
			]
		})
	]
};
