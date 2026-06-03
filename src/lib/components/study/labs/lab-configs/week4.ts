import type { DayLabConfig } from '$lib/types/laboratorio';
import { block, fields } from './helpers';

export const day22: DayLabConfig = {
	heroTitle: 'Rutas = mapa del producto',
	heroSubtitle: 'Cada URL muestra una pantalla distinta.',
	flowNodes: [
		{ id: '01', label: 'URL' },
		{ id: '02', label: '+page', accent: true },
		{ id: '03', label: 'Vista' }
	],
	labs: [
		block({
			variant: 'route',
			titulo: 'Navegación',
			spec: 'routes',
			uiTitle: 'Router',
			uiDescription: 'Elige ruta y ve la página simulada.',
			fields: fields({ key: 'ruta', label: 'Ruta', kind: 'string', default: '/estudio' }),
			derived: [
				{
					resultKey: 'pagina',
					name: 'page',
					expr: 'pathname',
					compute: (v) => `Vista: ${v.ruta}`
				}
			]
		}),
		block({
			variant: 'route',
			titulo: 'Link activo',
			spec: '<a href>',
			uiTitle: 'Nav',
			uiDescription: 'Item activo según ruta.',
			fields: fields({
				key: 'activo',
				label: 'Índice nav',
				kind: 'number',
				default: 0,
				min: 0,
				max: 2
			}),
			derived: [
				{
					resultKey: 'nav',
					name: 'active',
					expr: 'activeIndex',
					compute: (v) => ['Home', 'Estudio', 'Perfil'][v.activo as number]
				}
			]
		}),
		block({
			variant: 'route',
			titulo: '404',
			spec: 'fallback',
			uiTitle: 'Error',
			uiDescription: 'Ruta desconocida → 404.',
			fields: fields({ key: 'invalida', label: 'Ruta inválida', kind: 'boolean', default: false }),
			derived: [
				{
					resultKey: 'code',
					name: 'http',
					expr: 'notFound',
					compute: (v) => (v.invalida ? 404 : 200)
				}
			]
		})
	]
};

export const day23: DayLabConfig = {
	heroTitle: 'Layouts = shell de marca',
	heroSubtitle: 'Header y footer compartidos; contenido en slot.',
	flowNodes: [
		{ id: '01', label: '+layout' },
		{ id: '02', label: '<slot>', accent: true },
		{ id: '03', label: 'Página' }
	],
	labs: [
		block({
			variant: 'component',
			titulo: 'Shell',
			spec: 'layout',
			uiTitle: 'App shell',
			uiDescription: 'Toggle header de marca.',
			fields: fields({ key: 'brand', label: 'Mostrar header', kind: 'boolean', default: true }),
			derived: [
				{
					resultKey: 'layout',
					name: 'shell',
					expr: 'layout + slot',
					compute: (v) => (v.brand ? 'Header + contenido + Footer' : 'Solo contenido')
				}
			]
		}),
		block({
			variant: 'component',
			titulo: 'Slot principal',
			spec: '<slot />',
			uiTitle: 'Main',
			uiDescription: 'Título de página en slot.',
			fields: fields({
				key: 'titulo',
				label: 'Título página',
				kind: 'string',
				default: 'Dashboard'
			}),
			derived: [
				{
					resultKey: 'main',
					name: 'slot',
					expr: 'children',
					compute: (v) => `Main: ${v.titulo}`
				}
			]
		}),
		block({
			variant: 'component',
			titulo: 'Layout anidado',
			spec: 'nested',
			uiTitle: 'Estudio',
			uiDescription: 'Layout específico /estudio.',
			fields: fields({ key: 'sidebar', label: 'Sidebar', kind: 'boolean', default: true }),
			derived: [
				{
					resultKey: 'grid',
					name: 'cols',
					expr: 'sidebar ? 3col : 1col',
					compute: (v) => (v.sidebar ? 'sidebar | content | tutor' : 'content full')
				}
			]
		})
	]
};

export const day24: DayLabConfig = {
	heroTitle: 'Rutas dinámicas [slug]',
	heroSubtitle: 'Lista de productos → ficha /producto/:slug.',
	flowNodes: [
		{ id: '01', label: '[slug]' },
		{ id: '02', label: 'params', accent: true },
		{ id: '03', label: 'Detalle' }
	],
	labs: [
		block({
			variant: 'route',
			titulo: 'Lista → detalle',
			spec: '[slug]',
			uiTitle: 'Catálogo',
			uiDescription: 'Elige slug y abre ficha.',
			fields: fields({ key: 'slug', label: 'slug', kind: 'string', default: 'camiseta-azul' }),
			derived: [
				{
					resultKey: 'url',
					name: 'path',
					expr: '/producto/[slug]',
					compute: (v) => `/producto/${v.slug}`
				}
			]
		}),
		block({
			variant: 'route',
			titulo: 'params.slug',
			spec: 'params',
			uiTitle: 'Ficha',
			uiDescription: 'Lee slug de la URL.',
			fields: fields({
				key: 'precio',
				label: 'Precio',
				kind: 'number',
				default: 29,
				min: 1,
				max: 200
			}),
			derived: [
				{
					resultKey: 'ficha',
					name: 'producto',
					expr: 'data[slug]',
					compute: (v) => `Producto — ${v.precio}€`
				}
			]
		}),
		block({
			variant: 'route',
			titulo: '404 producto',
			spec: 'not found',
			uiTitle: 'Error',
			uiDescription: 'Slug inexistente.',
			fields: fields({ key: 'existe', label: 'Existe', kind: 'boolean', default: true }),
			derived: [
				{
					resultKey: 'vista',
					name: 'estado',
					expr: 'existe ? ficha : 404',
					compute: (v) => (v.existe ? 'Ficha producto' : 'Producto no encontrado')
				}
			]
		})
	]
};

export const day25: DayLabConfig = {
	heroTitle: 'load — datos antes de pintar',
	heroSubtitle: 'Skeleton → contenido cuando load resuelve.',
	flowNodes: [
		{ id: '01', label: 'load()' },
		{ id: '02', label: 'data', accent: true },
		{ id: '03', label: 'UI' }
	],
	labs: [
		block({
			variant: 'timeline',
			titulo: 'load function',
			spec: 'export const load',
			uiTitle: 'Página',
			uiDescription: 'Simula load que devuelve titulo.',
			fields: fields({ key: 'titulo', label: 'titulo', kind: 'string', default: 'Hola' }),
			derived: [
				{
					resultKey: 'data',
					name: 'data',
					expr: 'return { titulo }',
					compute: (v) => `data.titulo = "${v.titulo}"`
				}
			]
		}),
		block({
			variant: 'timeline',
			titulo: 'Skeleton',
			spec: 'loading',
			uiTitle: 'SSR',
			uiDescription: 'Mientras load corre, skeleton.',
			fields: fields({ key: 'ready', label: 'Datos listos', kind: 'boolean', default: false }),
			derived: [
				{
					resultKey: 'ui',
					name: 'vista',
					expr: 'ready ? content : skeleton',
					compute: (v) => (v.ready ? v.titulo : '▢▢▢ cargando…')
				}
			]
		}),
		block({
			variant: 'component',
			titulo: '$props data',
			spec: 'data en page',
			uiTitle: '+page.svelte',
			uiDescription: 'El componente recibe data del load.',
			fields: fields({ key: 'items', label: 'Items', kind: 'number', default: 3, min: 0, max: 10 }),
			derived: [
				{
					resultKey: 'lista',
					name: 'items',
					expr: 'data.items',
					compute: (v) => `${v.items} productos cargados`
				}
			]
		})
	]
};

export const day26: DayLabConfig = {
	heroTitle: 'Form actions',
	heroSubtitle: 'Enviar formulario al servidor sin fetch manual.',
	flowNodes: [
		{ id: '01', label: '<form>' },
		{ id: '02', label: 'action', accent: true },
		{ id: '03', label: 'result' }
	],
	labs: [
		block({
			variant: 'form',
			titulo: 'POST action',
			spec: 'form action',
			uiTitle: 'Contacto',
			uiDescription: 'Envío simulado al servidor.',
			fields: fields({ key: 'enviado', label: 'Enviado', kind: 'boolean', default: false }),
			derived: [
				{
					resultKey: 'estado',
					name: 'form',
					expr: 'action=submit',
					compute: (v) => (v.enviado ? 'Gracias — guardado' : 'Pendiente de enviar')
				}
			]
		}),
		block({
			variant: 'form',
			titulo: 'Validación',
			spec: 'fail()',
			uiTitle: 'Errores',
			uiDescription: 'Email inválido bloquea submit.',
			fields: fields({ key: 'emailOk', label: 'Email válido', kind: 'boolean', default: true }),
			derived: [
				{
					resultKey: 'valid',
					name: 'ok',
					expr: 'email valid',
					compute: (v) => v.emailOk
				}
			]
		}),
		block({
			variant: 'form',
			titulo: 'Progressive',
			spec: 'enhance',
			uiTitle: 'UX',
			uiDescription: 'use:enhance mantiene UX SPA.',
			fields: fields({ key: 'spa', label: 'SPA enhance', kind: 'boolean', default: true }),
			derived: [
				{
					resultKey: 'mode',
					name: 'enhance',
					expr: 'use:enhance',
					compute: (v) => (v.spa ? 'Sin recarga completa' : 'Recarga clásica')
				}
			]
		})
	]
};

export const day27: DayLabConfig = {
	heroTitle: 'Supabase — auth y datos',
	heroSubtitle: 'Flujo login → sesión → tabla progreso.',
	flowNodes: [
		{ id: '01', label: 'Auth' },
		{ id: '02', label: 'DB', accent: true },
		{ id: '03', label: 'RLS' }
	],
	labs: [
		block({
			variant: 'auth',
			titulo: 'Login',
			spec: 'auth',
			uiTitle: 'Sesión',
			uiDescription: 'Usuario logueado o invitado.',
			fields: fields({ key: 'logged', label: 'Logueado', kind: 'boolean', default: true }),
			derived: [
				{
					resultKey: 'ruta',
					name: 'guard',
					expr: 'logged ? /estudio : /login',
					compute: (v) => (v.logged ? '/estudio' : '/login')
				}
			]
		}),
		block({
			variant: 'auth',
			titulo: 'Query',
			spec: '.from().select()',
			uiTitle: 'Progreso',
			uiDescription: 'Días completados del usuario.',
			fields: fields({ key: 'dias', label: 'Días OK', kind: 'number', default: 2, min: 0, max: 7 }),
			derived: [
				{
					resultKey: 'rows',
					name: 'progreso',
					expr: 'select progreso',
					compute: (v) => `${v.dias} filas en progreso`
				}
			]
		}),
		block({
			variant: 'auth',
			titulo: 'RLS',
			spec: 'policies',
			uiTitle: 'Seguridad',
			uiDescription: 'Solo mis datos visibles.',
			fields: fields({ key: 'own', label: 'Solo propio user_id', kind: 'boolean', default: true }),
			derived: [
				{
					resultKey: 'policy',
					name: 'rls',
					expr: 'user_id = auth.uid()',
					compute: (v) => (v.own ? 'RLS activa' : '⚠️ Sin RLS')
				}
			]
		})
	]
};
