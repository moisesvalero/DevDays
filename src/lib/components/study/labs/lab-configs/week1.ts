import type { DayLabConfig } from '$lib/types/laboratorio';
import { block, fields } from './helpers';

export const day1: DayLabConfig = {
	heroTitle: 'Variables = estado de tu producto',
	heroSubtitle:
		'Toca la ficha, edita el código en vivo y observa cómo nombre, contador y precio alimentan la UI.',
	flowNodes: [
		{ id: '01', label: 'let / const', sub: 'estado' },
		{ id: '02', label: 'Template', sub: '${var}', accent: true },
		{ id: '03', label: 'UI', sub: 'ficha, etiqueta' }
	],
	labs: [
		block({
			variant: 'inventory',
			titulo: 'Contador de stock',
			spec: 'let · +=',
			uiTitle: 'Panel inventario',
			uiDescription: 'Un contador que parte de cero y suma unidades al stock.',
			fields: fields(
				{ key: 'cajas', label: 'Unidades en stock', kind: 'number', default: 0, min: 0, max: 50 },
				{ key: 'entrada', label: 'Unidades a sumar', kind: 'number', default: 5, min: 1, max: 20 }
			),
			derived: [
				{
					resultKey: 'total',
					name: 'stockFinal',
					expr: 'cajas + entrada',
					compute: (v) => (v.cajas as number) + (v.entrada as number)
				}
			]
		}),
		block({
			variant: 'profile',
			titulo: 'Saludo en ficha de usuario',
			spec: '`${}` · template',
			uiTitle: 'Perfil',
			uiDescription: 'Mensaje personalizado con nombre y edad.',
			fields: fields(
				{ key: 'nombre', label: 'Nombre', kind: 'string', default: 'Ana' },
				{ key: 'edad', label: 'Edad', kind: 'number', default: 30, min: 18, max: 99 }
			),
			derived: [
				{
					resultKey: 'saludo',
					name: 'saludo',
					expr: '`Hola, soy ${nombre}`',
					compute: (v) => `Hola, soy ${v.nombre} y tengo ${v.edad} años`
				}
			]
		}),
		block({
			variant: 'pricetag',
			titulo: 'Etiqueta de producto',
			spec: 'const · string',
			uiTitle: 'Etiqueta precio',
			uiDescription: 'Combina producto y precio en una sola línea de checkout.',
			fields: fields(
				{ key: 'producto', label: 'Producto', kind: 'string', default: 'camiseta' },
				{ key: 'precio', label: 'Precio (€)', kind: 'number', default: 19.99, min: 1, max: 200 }
			),
			derived: [
				{
					resultKey: 'etiqueta',
					name: 'etiqueta',
					expr: 'template producto + precio',
					compute: (v) => `La ${v.producto} cuesta ${v.precio} euros`
				}
			]
		})
	]
};

export const day3: DayLabConfig = {
	heroTitle: 'Condicionales = estados de pedido',
	heroSubtitle: 'if, ternario y switch como reglas de negocio visibles en la interfaz.',
	flowNodes: [
		{ id: '01', label: 'Condición', sub: '=== · >' },
		{ id: '02', label: 'Rama', sub: 'if · ? :', accent: true },
		{ id: '03', label: 'UI', sub: 'badge, CTA' }
	],
	labs: [
		block({
			variant: 'status',
			titulo: 'Estado del pedido',
			spec: 'if · else',
			uiTitle: 'Logística',
			uiDescription: 'Si stock bajo, muestra «reponer»; si no, «ok».',
			fields: fields({ key: 'stock', label: 'Stock', kind: 'number', default: 3, min: 0, max: 20 }),
			derived: [
				{
					resultKey: 'estado',
					name: 'estado',
					expr: 'stock < 5 ? reponer : ok',
					compute: (v) => ((v.stock as number) < 5 ? 'reponer' : 'ok')
				}
			]
		}),
		block({
			variant: 'cta',
			titulo: 'CTA con ternario',
			spec: '? :',
			uiTitle: 'Botón checkout',
			uiDescription: 'Texto del botón según si el usuario está logueado.',
			fields: fields({
				key: 'logueado',
				label: 'Usuario logueado',
				kind: 'boolean',
				default: false
			}),
			derived: [
				{
					resultKey: 'cta',
					name: 'cta',
					expr: 'logueado ? Comprar : Iniciar sesión',
					compute: (v) => (v.logueado ? 'Comprar ahora' : 'Iniciar sesión')
				}
			]
		}),
		block({
			variant: 'plans',
			titulo: 'Selector de plan',
			spec: 'switch',
			uiTitle: 'Pricing',
			uiDescription: 'El badge cambia según el plan elegido.',
			fields: fields({
				key: 'plan',
				label: 'Plan (1=free,2=pro,3=vip)',
				kind: 'number',
				default: 2,
				min: 1,
				max: 3
			}),
			derived: [
				{
					resultKey: 'badge',
					name: 'badge',
					expr: 'switch(plan)',
					compute: (v) => {
						const p = v.plan as number;
						if (p === 1) return 'Gratis';
						if (p === 2) return 'Pro';
						return 'VIP';
					}
				}
			]
		})
	]
};

export const day4: DayLabConfig = {
	heroTitle: 'Funciones = lógica reutilizable',
	heroSubtitle: 'Declaración, flecha y parámetros aplicados a precios y filtros.',
	flowNodes: [
		{ id: '01', label: 'Input', sub: 'args' },
		{ id: '02', label: 'Función', sub: '=>', accent: true },
		{ id: '03', label: 'Output', sub: 'return' }
	],
	labs: [
		block({
			variant: 'formula',
			titulo: 'Calcular envío',
			spec: 'function',
			uiTitle: 'Checkout',
			uiDescription: 'Función que suma base + suplemento urgente.',
			fields: fields(
				{ key: 'base', label: 'Envío base (€)', kind: 'number', default: 5, min: 0, max: 20 },
				{ key: 'urgente', label: 'Suplemento urgente', kind: 'number', default: 3, min: 0, max: 15 }
			),
			derived: [
				{
					resultKey: 'envio',
					name: 'calcularEnvio',
					expr: 'base + urgente',
					compute: (v) => (v.base as number) + (v.urgente as number)
				}
			]
		}),
		block({
			variant: 'compare',
			titulo: 'Filtro con flecha',
			spec: '=>',
			uiTitle: 'Catálogo',
			uiDescription: '¿El producto está disponible? stock > 0',
			fields: fields({
				key: 'stock',
				label: 'Stock SKU',
				kind: 'number',
				default: 0,
				min: 0,
				max: 50
			}),
			derived: [
				{
					resultKey: 'disponible',
					name: 'estaDisponible',
					expr: 'stock => stock > 0',
					compute: (v) => (v.stock as number) > 0
				}
			]
		}),
		block({
			variant: 'formula',
			titulo: 'Parámetro por defecto',
			spec: 'default',
			uiTitle: 'Descuento',
			uiDescription: 'Precio final con descuento opcional (por defecto 0).',
			fields: fields(
				{ key: 'precio', label: 'Precio', kind: 'number', default: 100, min: 10, max: 500 },
				{ key: 'dto', label: 'Descuento %', kind: 'number', default: 10, min: 0, max: 50 }
			),
			derived: [
				{
					resultKey: 'final',
					name: 'precioFinal',
					expr: 'precio * (1 - dto/100)',
					compute: (v) => Math.round((v.precio as number) * (1 - (v.dto as number) / 100))
				}
			]
		})
	]
};

export const day5: DayLabConfig = {
	heroTitle: 'Arrays: transformar catálogo',
	heroSubtitle: 'map, filter y find como operaciones de producto sobre una lista.',
	flowNodes: [
		{ id: '01', label: 'Array', sub: 'SKUs' },
		{ id: '02', label: 'map/filter', accent: true },
		{ id: '03', label: 'Vista', sub: 'lista UI' }
	],
	labs: [
		block({
			variant: 'listops',
			titulo: 'Duplicar precios (map)',
			spec: 'map',
			uiTitle: 'Lista precios x2',
			uiDescription: 'Simula map sobre 3 ítems: cada precio se duplica.',
			fields: fields({
				key: 'factor',
				label: 'Factor',
				kind: 'number',
				default: 2,
				min: 1,
				max: 5
			}),
			derived: [
				{
					resultKey: 'resultado',
					name: 'preciosDoblados',
					expr: '[10,20,30].map(n => n * factor)',
					compute: (v) => [10, 20, 30].map((n) => n * (v.factor as number)).join(', ')
				}
			]
		}),
		block({
			variant: 'listops',
			titulo: 'Solo disponibles (filter)',
			spec: 'filter',
			uiTitle: 'Filtro stock',
			uiDescription: 'Cuenta cuántos productos pasan stock > 0.',
			fields: fields({
				key: 'umbral',
				label: 'Stock mínimo',
				kind: 'number',
				default: 1,
				min: 0,
				max: 10
			}),
			derived: [
				{
					resultKey: 'count',
					name: 'disponibles',
					expr: 'filter stock >= umbral',
					compute: (v) => {
						const u = v.umbral as number;
						return [0, 5, 2, 8].filter((s) => s >= u).length;
					}
				}
			]
		}),
		block({
			variant: 'listops',
			titulo: 'Buscar SKU (find)',
			spec: 'find',
			uiTitle: 'Búsqueda',
			uiDescription: 'Encuentra el precio del SKU buscado.',
			fields: fields({ key: 'sku', label: 'SKU buscado', kind: 'string', default: 'B2' }),
			derived: [
				{
					resultKey: 'precio',
					name: 'precioEncontrado',
					expr: 'find sku',
					compute: (v) => {
						const items = [
							{ sku: 'A1', precio: 12 },
							{ sku: 'B2', precio: 25 },
							{ sku: 'C3', precio: 8 }
						];
						return items.find((i) => i.sku === v.sku)?.precio ?? '—';
					}
				}
			]
		})
	]
};

export const day6: DayLabConfig = {
	heroTitle: 'Arrays: agregar y ordenar',
	heroSubtitle: 'reduce, some, every y sort en métricas de carrito.',
	flowNodes: [
		{ id: '01', label: 'Lista', sub: 'precios' },
		{ id: '02', label: 'reduce/sort', accent: true },
		{ id: '03', label: 'KPI', sub: 'total' }
	],
	labs: [
		block({
			variant: 'formula',
			titulo: 'Total del carrito (reduce)',
			spec: 'reduce',
			uiTitle: 'Checkout total',
			uiDescription: 'Suma de líneas del carrito.',
			fields: fields({
				key: 'extra',
				label: 'Línea extra (€)',
				kind: 'number',
				default: 0,
				min: 0,
				max: 50
			}),
			derived: [
				{
					resultKey: 'total',
					name: 'total',
					expr: 'reduce + extra',
					compute: (v) => [5, 10, 15].reduce((a, b) => a + b, 0) + (v.extra as number)
				}
			]
		}),
		block({
			variant: 'status',
			titulo: '¿Hay agotados? (some)',
			spec: 'some',
			uiTitle: 'Alertas',
			uiDescription: 'some: ¿algún SKU sin stock?',
			fields: fields({
				key: 'cero',
				label: 'SKUs a 0',
				kind: 'number',
				default: 1,
				min: 0,
				max: 3
			}),
			derived: [
				{
					resultKey: 'agotado',
					name: 'hayAgotado',
					expr: 'some stock === 0',
					compute: (v) => {
						const stocks = [5, 0, 3, 0, 2].slice(0, 3 + (v.cero as number));
						return stocks.some((s) => s === 0);
					}
				}
			]
		}),
		block({
			variant: 'listops',
			titulo: 'Ordenar por precio (sort)',
			spec: 'sort',
			uiTitle: 'Tabla ordenada',
			uiDescription: 'Orden ascendente o descendente.',
			fields: fields({ key: 'asc', label: 'Ascendente', kind: 'boolean', default: true }),
			derived: [
				{
					resultKey: 'orden',
					name: 'preciosOrdenados',
					expr: 'sort asc/desc',
					compute: (v) => {
						const p = [30, 10, 20];
						const s = [...p].sort((a, b) => (v.asc ? a - b : b - a));
						return s.join(' · ');
					}
				}
			]
		})
	]
};
