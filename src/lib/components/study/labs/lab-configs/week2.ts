import type { DayLabConfig } from '$lib/types/laboratorio';
import { block, fields } from './helpers';

export const day8: DayLabConfig = {
	heroTitle: 'Objetos = ficha de producto',
	heroSubtitle: 'Propiedades, actualización y destructuring en componentes reales.',
	flowNodes: [
		{ id: '01', label: 'Object', sub: '{ k: v }' },
		{ id: '02', label: 'Mutar', accent: true },
		{ id: '03', label: 'Card UI' }
	],
	labs: [
		block({
			variant: 'profile',
			titulo: 'Card de producto',
			spec: '{ }',
			uiTitle: 'SKU',
			uiDescription: 'Objeto producto con nombre y precio.',
			fields: fields(
				{ key: 'nombre', label: 'Nombre', kind: 'string', default: 'Zapatillas' },
				{ key: 'precio', label: 'Precio', kind: 'number', default: 59, min: 1, max: 300 }
			),
			derived: [
				{
					resultKey: 'label',
					name: 'etiqueta',
					expr: 'producto.nombre + precio',
					compute: (v) => `${v.nombre} — ${v.precio}€`
				}
			]
		}),
		block({
			variant: 'formula',
			titulo: 'Actualizar propiedad',
			spec: 'obj.k = v',
			uiTitle: 'Stock en objeto',
			uiDescription: 'Incrementa stock dentro del objeto pedido.',
			fields: fields({ key: 'stock', label: 'Stock', kind: 'number', default: 2, min: 0, max: 99 }),
			derived: [
				{
					resultKey: 'ok',
					name: 'puedeVender',
					expr: 'pedido.stock > 0',
					compute: (v) => (v.stock as number) > 0
				}
			]
		}),
		block({
			variant: 'profile',
			titulo: 'Destructuring',
			spec: '{ a, b }',
			uiTitle: 'Checkout rápido',
			uiDescription: 'Extrae total e iva del objeto factura.',
			fields: fields(
				{ key: 'total', label: 'Total', kind: 'number', default: 120, min: 0, max: 500 },
				{ key: 'iva', label: 'IVA %', kind: 'number', default: 21, min: 0, max: 30 }
			),
			derived: [
				{
					resultKey: 'base',
					name: 'base',
					expr: 'total / (1+iva/100)',
					compute: (v) => Math.round((v.total as number) / (1 + (v.iva as number) / 100))
				}
			]
		})
	]
};

export const day9: DayLabConfig = {
	heroTitle: 'Bucles y métodos de array',
	heroSubtitle: 'Recorrer listas como filas de tabla o chips de categoría.',
	flowNodes: [
		{ id: '01', label: 'Array' },
		{ id: '02', label: 'for / método', accent: true },
		{ id: '03', label: 'Lista UI' }
	],
	labs: [
		block({
			variant: 'listops',
			titulo: 'Generar filas',
			spec: 'for',
			uiTitle: 'Tabla',
			uiDescription: 'Número de filas visibles según count.',
			fields: fields({ key: 'count', label: 'Filas', kind: 'number', default: 4, min: 1, max: 8 }),
			derived: [
				{
					resultKey: 'filas',
					name: 'filas',
					expr: 'for 1..count',
					compute: (v) => `SKU-1 … SKU-${v.count}`
				}
			]
		}),
		block({
			variant: 'listops',
			titulo: 'Chips de categorías',
			spec: 'forEach',
			uiTitle: 'Tags',
			uiDescription: 'Cantidad de categorías activas.',
			fields: fields({
				key: 'activas',
				label: 'Categorías activas',
				kind: 'number',
				default: 2,
				min: 0,
				max: 5
			}),
			derived: [
				{
					resultKey: 'chips',
					name: 'chips',
					expr: 'slice categorias',
					compute: (v) =>
						['Ropa', 'Calzado', 'Accesorios', 'Ofertas', 'Nuevo']
							.slice(0, v.activas as number)
							.join(' · ')
				}
			]
		}),
		block({
			variant: 'rules',
			titulo: 'includes en carrito',
			spec: 'includes',
			uiTitle: 'Carrito',
			uiDescription: '¿El cupón ya está aplicado?',
			fields: fields({ key: 'cupon', label: 'Tiene cupón', kind: 'boolean', default: true }),
			derived: [
				{
					resultKey: 'msg',
					name: 'mensaje',
					expr: 'cupones.includes',
					compute: (v) => (v.cupon ? 'Cupón SUMMER aplicado' : 'Sin cupón')
				}
			]
		})
	]
};

export const day10: DayLabConfig = {
	heroTitle: 'Scope y closures',
	heroSubtitle: 'Factory de descuentos y contador privado.',
	flowNodes: [
		{ id: '01', label: 'Función outer' },
		{ id: '02', label: 'Closure', accent: true },
		{ id: '03', label: 'UI precio' }
	],
	labs: [
		block({
			variant: 'inventory',
			titulo: 'Contador privado',
			spec: 'closure',
			uiTitle: 'Visitas',
			uiDescription: 'Cada clic incrementa contador en closure.',
			fields: fields({ key: 'clics', label: 'Clics', kind: 'number', default: 1, min: 0, max: 10 }),
			derived: [
				{
					resultKey: 'visitas',
					name: 'visitas',
					expr: 'closure count',
					compute: (v) => (v.clics as number) + 1
				}
			]
		}),
		block({
			variant: 'formula',
			titulo: 'Factory descuento',
			spec: 'closure factory',
			uiTitle: 'Promo',
			uiDescription: 'Genera % descuento según tipo cliente.',
			fields: fields({ key: 'vip', label: 'Cliente VIP', kind: 'boolean', default: false }),
			derived: [
				{
					resultKey: 'dto',
					name: 'descuento',
					expr: 'makeDiscount(vip)',
					compute: (v) => (v.vip ? 20 : 5)
				}
			]
		}),
		block({
			variant: 'formula',
			titulo: 'Precio final',
			spec: 'return',
			uiTitle: 'Checkout',
			uiDescription: 'Aplica descuento closure al precio.',
			fields: fields(
				{ key: 'precio', label: 'Precio', kind: 'number', default: 80, min: 10, max: 200 },
				{ key: 'dto', label: 'Descuento %', kind: 'number', default: 15, min: 0, max: 50 }
			),
			derived: [
				{
					resultKey: 'final',
					name: 'precioFinal',
					expr: 'precio * (1-dto/100)',
					compute: (v) => Math.round((v.precio as number) * (1 - (v.dto as number) / 100))
				}
			]
		})
	]
};

export const day11: DayLabConfig = {
	heroTitle: 'Promesas en la UI',
	heroSubtitle: 'Estados pending, resolved y rejected como en un checkout real.',
	flowNodes: [
		{ id: '01', label: 'Promise' },
		{ id: '02', label: 'then/catch', accent: true },
		{ id: '03', label: 'Spinner' }
	],
	labs: [
		block({
			variant: 'timeline',
			titulo: 'Simular carga',
			spec: 'Promise',
			uiTitle: 'Pago',
			uiDescription: 'Toggle: pago OK o fallido.',
			fields: fields({ key: 'ok', label: 'Pago exitoso', kind: 'boolean', default: true }),
			derived: [
				{
					resultKey: 'estado',
					name: 'estadoPago',
					expr: 'resolve/reject',
					compute: (v) => (v.ok ? 'resolved: Pagado' : 'rejected: Error tarjeta')
				}
			]
		}),
		block({
			variant: 'timeline',
			titulo: 'Timeout',
			spec: 'setTimeout',
			uiTitle: 'Envío',
			uiDescription: 'Segundos hasta confirmar envío.',
			fields: fields({ key: 'seg', label: 'Segundos', kind: 'number', default: 2, min: 1, max: 5 }),
			derived: [
				{
					resultKey: 'msg',
					name: 'mensaje',
					expr: 'delay seg',
					compute: (v) => `Enviado en ${v.seg}s`
				}
			]
		}),
		block({
			variant: 'timeline',
			titulo: 'Encadenar',
			spec: 'then',
			uiTitle: 'Pedido',
			uiDescription: 'Validar stock luego confirmar.',
			fields: fields({ key: 'stock', label: 'Stock', kind: 'number', default: 1, min: 0, max: 10 }),
			derived: [
				{
					resultKey: 'paso',
					name: 'paso2',
					expr: 'then confirmar',
					compute: (v) => ((v.stock as number) > 0 ? 'Confirmado' : 'Cancelado')
				}
			]
		})
	]
};

export const day12: DayLabConfig = {
	heroTitle: 'async/await y fetch',
	heroSubtitle: 'Catálogo que carga, falla o queda vacío.',
	flowNodes: [
		{ id: '01', label: 'async' },
		{ id: '02', label: 'await', accent: true },
		{ id: '03', label: 'Datos UI' }
	],
	labs: [
		block({
			variant: 'timeline',
			titulo: 'Cargar catálogo',
			spec: 'async/await',
			uiTitle: 'API productos',
			uiDescription: 'Simula fetch exitoso o error.',
			fields: fields({ key: 'exito', label: 'Fetch OK', kind: 'boolean', default: true }),
			derived: [
				{
					resultKey: 'items',
					name: 'productos',
					expr: 'await fetch',
					compute: (v) => (v.exito ? '3 productos' : 'Error 500')
				}
			]
		}),
		block({
			variant: 'timeline',
			titulo: 'Skeleton',
			spec: 'loading',
			uiTitle: 'Estado UI',
			uiDescription: 'Mientras carga, muestra skeleton.',
			fields: fields({ key: 'loading', label: 'Cargando', kind: 'boolean', default: true }),
			derived: [
				{
					resultKey: 'vista',
					name: 'vista',
					expr: 'loading ? skeleton : data',
					compute: (v) => (v.loading ? '⬜⬜⬜ skeleton' : 'Lista cargada')
				}
			]
		}),
		block({
			variant: 'timeline',
			titulo: 'Retry',
			spec: 'try/catch',
			uiTitle: 'Reintentar',
			uiDescription: 'Número de reintentos al fallar.',
			fields: fields({
				key: 'intentos',
				label: 'Intentos',
				kind: 'number',
				default: 2,
				min: 1,
				max: 5
			}),
			derived: [
				{
					resultKey: 'ok',
					name: 'exito',
					expr: 'intentos >= 2',
					compute: (v) => (v.intentos as number) >= 2
				}
			]
		})
	]
};

export const day13: DayLabConfig = {
	heroTitle: 'DOM y localStorage',
	heroSubtitle: 'Preferencias de tema y datos que persisten.',
	flowNodes: [
		{ id: '01', label: 'DOM event' },
		{ id: '02', label: 'storage', accent: true },
		{ id: '03', label: 'Preferencias' }
	],
	labs: [
		block({
			variant: 'cta',
			titulo: 'Tema claro/oscuro',
			spec: 'localStorage',
			uiTitle: 'Tema',
			uiDescription: 'Preferencia guardada en storage (simulado).',
			fields: fields({ key: 'dark', label: 'Modo oscuro', kind: 'boolean', default: false }),
			derived: [
				{
					resultKey: 'theme',
					name: 'theme',
					expr: 'localStorage.theme',
					compute: (v) => (v.dark ? 'dark' : 'light')
				}
			]
		}),
		block({
			variant: 'rules',
			titulo: 'onclick',
			spec: 'addEventListener',
			uiTitle: 'Contador clics',
			uiDescription: 'Evento click incrementa valor.',
			fields: fields({ key: 'clics', label: 'Clics', kind: 'number', default: 0, min: 0, max: 20 }),
			derived: [
				{
					resultKey: 'txt',
					name: 'label',
					expr: 'click count',
					compute: (v) => `Clics: ${v.clics}`
				}
			]
		}),
		block({
			variant: 'form',
			titulo: 'Carrito guardado',
			spec: 'JSON.stringify',
			uiTitle: 'Persistencia',
			uiDescription: 'Ítems en carrito serializados.',
			fields: fields({ key: 'items', label: 'Ítems', kind: 'number', default: 2, min: 0, max: 5 }),
			derived: [
				{
					resultKey: 'json',
					name: 'guardado',
					expr: 'JSON cart',
					compute: (v) => `{"items":${v.items}}`
				}
			]
		})
	]
};
