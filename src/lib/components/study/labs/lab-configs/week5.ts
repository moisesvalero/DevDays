import type { DayLabConfig } from '$lib/types/laboratorio';
import { block, fields } from './helpers';

export const day29: DayLabConfig = {
	heroTitle: 'TypeScript = contratos de producto',
	heroSubtitle: 'Tipos que evitan bugs antes de desplegar.',
	flowNodes: [
		{ id: '01', label: 'interface' },
		{ id: '02', label: 'types', accent: true },
		{ id: '03', label: 'build' }
	],
	labs: [
		block({
			variant: 'profile',
			titulo: 'Interface Producto',
			spec: 'interface',
			uiTitle: 'Card tipada',
			uiDescription: 'nombre y precio obligatorios.',
			fields: fields(
				{ key: 'nombre', label: 'nombre', kind: 'string', default: 'Bolso' },
				{ key: 'precio', label: 'precio', kind: 'number', default: 45, min: 0, max: 300 }
			),
			derived: [
				{
					resultKey: 'ok',
					name: 'valid',
					expr: 'Producto type',
					compute: (v) => typeof v.precio === 'number'
				}
			]
		}),
		block({
			variant: 'profile',
			titulo: 'Props tipadas',
			spec: '$props<Props>',
			uiTitle: 'Svelte 5',
			uiDescription: 'Props con tipo en componente.',
			fields: fields({ key: 'count', label: 'count', kind: 'number', default: 0, min: 0, max: 99 }),
			derived: [
				{
					resultKey: 'type',
					name: 'Props',
					expr: 'count: number',
					compute: (v) => `number ← ${v.count}`
				}
			]
		}),
		block({
			variant: 'pricetag',
			titulo: 'Union types',
			spec: 'A | B',
			uiTitle: 'Estado pedido',
			uiDescription: 'pending | shipped | delivered.',
			fields: fields({
				key: 'estado',
				label: 'Estado (0-2)',
				kind: 'number',
				default: 1,
				min: 0,
				max: 2
			}),
			derived: [
				{
					resultKey: 'badge',
					name: 'status',
					expr: 'OrderStatus',
					compute: (v) => ['pending', 'shipped', 'delivered'][v.estado as number]
				}
			]
		})
	]
};

export const day30: DayLabConfig = {
	heroTitle: 'Env y hooks.server',
	heroSubtitle: 'Request → hooks → variables → página.',
	flowNodes: [
		{ id: '01', label: 'Request' },
		{ id: '02', label: 'hooks', accent: true },
		{ id: '03', label: 'env' }
	],
	labs: [
		block({
			variant: 'story',
			titulo: 'Variables públicas',
			spec: 'PUBLIC_*',
			uiTitle: 'Cliente',
			uiDescription: 'URL Supabase en cliente.',
			fields: fields({ key: 'configured', label: 'Configurado', kind: 'boolean', default: true }),
			derived: [
				{
					resultKey: 'client',
					name: 'supabase',
					expr: 'PUBLIC_SUPABASE_URL',
					compute: (v) => (v.configured ? 'Cliente OK' : 'Falta .env')
				}
			]
		}),
		block({
			variant: 'auth',
			titulo: 'Secrets servidor',
			spec: 'OPENAI_API_KEY',
			uiTitle: 'API tutor',
			uiDescription: 'Solo en servidor, nunca en bundle.',
			fields: fields({ key: 'server', label: 'Solo servidor', kind: 'boolean', default: true }),
			derived: [
				{
					resultKey: 'safe',
					name: 'seguro',
					expr: '!import in client',
					compute: (v) => (v.server ? 'Seguro' : '⚠️ Expuesto')
				}
			]
		}),
		block({
			variant: 'component',
			titulo: 'hooks.server',
			spec: 'handle',
			uiTitle: 'Auth guard',
			uiDescription: 'locals.user antes de /estudio.',
			fields: fields({ key: 'auth', label: 'Auth activo', kind: 'boolean', default: true }),
			derived: [
				{
					resultKey: 'guard',
					name: 'redirect',
					expr: '!user → /login',
					compute: (v) => (v.auth ? 'Protegido' : 'Abierto')
				}
			]
		})
	]
};

export const day31: DayLabConfig = {
	heroTitle: 'Deploy en Vercel',
	heroSubtitle: 'git push → build → URL producción.',
	flowNodes: [
		{ id: '01', label: 'git push' },
		{ id: '02', label: 'build', accent: true },
		{ id: '03', label: 'URL' }
	],
	labs: [
		block({
			variant: 'timeline',
			titulo: 'Pipeline',
			spec: 'CI/CD',
			uiTitle: 'Deploy',
			uiDescription: 'Paso actual del pipeline.',
			fields: fields({
				key: 'paso',
				label: 'Paso (0-3)',
				kind: 'number',
				default: 2,
				min: 0,
				max: 3
			}),
			derived: [
				{
					resultKey: 'stage',
					name: 'pipeline',
					expr: 'git→build→deploy',
					compute: (v) => ['Push', 'Build', 'Deploy', 'Live'][v.paso as number]
				}
			]
		}),
		block({
			variant: 'timeline',
			titulo: 'Preview',
			spec: 'preview URL',
			uiTitle: 'PR',
			uiDescription: 'Cada PR tiene preview.',
			fields: fields({ key: 'pr', label: 'PR #', kind: 'number', default: 42, min: 1, max: 999 }),
			derived: [
				{
					resultKey: 'url',
					name: 'preview',
					expr: 'vercel.app',
					compute: (v) => `devdays-pr-${v.pr}.vercel.app`
				}
			]
		}),
		block({
			variant: 'timeline',
			titulo: 'Env prod',
			spec: 'Vercel env',
			uiTitle: 'Producción',
			uiDescription: 'Vars en dashboard Vercel.',
			fields: fields({ key: 'prod', label: 'Prod configurado', kind: 'boolean', default: true }),
			derived: [
				{
					resultKey: 'status',
					name: 'deploy',
					expr: 'env OK',
					compute: (v) => (v.prod ? 'Production ready' : 'Faltan env vars')
				}
			]
		})
	]
};

export const day32: DayLabConfig = {
	heroTitle: 'Explica tu stack en 2 minutos',
	heroSubtitle: 'Mapa visual: problema → stack → demo.',
	flowNodes: [
		{ id: '01', label: 'Problema' },
		{ id: '02', label: 'Stack', accent: true },
		{ id: '03', label: 'Demo' }
	],
	labs: [
		block({
			variant: 'story',
			titulo: 'Problema de negocio',
			spec: 'pitch',
			uiTitle: 'Contexto',
			uiDescription: '¿Qué dolor resuelve DevDays?',
			fields: fields({
				key: 'users',
				label: 'Usuarios meta',
				kind: 'number',
				default: 100,
				min: 10,
				max: 1000
			}),
			derived: [
				{
					resultKey: 'pitch',
					name: 'valor',
					expr: 'aprender haciendo',
					compute: (v) => `Formar ${v.users} builders con labs`
				}
			]
		}),
		block({
			variant: 'story',
			titulo: 'Stack elegido',
			spec: 'SvelteKit',
			uiTitle: 'Tech',
			uiDescription: 'Por qué SvelteKit + Supabase.',
			fields: fields({ key: 'ssr', label: 'SSR', kind: 'boolean', default: true }),
			derived: [
				{
					resultKey: 'stack',
					name: 'stack',
					expr: 'SvelteKit + Vercel',
					compute: (v) => (v.ssr ? 'SvelteKit SSR + Supabase' : 'SPA only')
				}
			]
		}),
		block({
			variant: 'story',
			titulo: 'Demo en vivo',
			spec: 'demo',
			uiTitle: 'Flujo',
			uiDescription: 'Login → estudio → progreso.',
			fields: fields({
				key: 'dia',
				label: 'Día demo',
				kind: 'number',
				default: 2,
				min: 1,
				max: 35
			}),
			derived: [
				{
					resultKey: 'flow',
					name: 'demo',
					expr: '/estudio dia',
					compute: (v) => `Abrir /estudio día ${v.dia}`
				}
			]
		})
	]
};

export const day33: DayLabConfig = {
	heroTitle: 'Preguntas técnicas',
	heroSubtitle: 'Estructura STAR para entrevistas.',
	flowNodes: [
		{ id: '01', label: 'Situación' },
		{ id: '02', label: 'Acción', accent: true },
		{ id: '03', label: 'Resultado' }
	],
	labs: [
		block({
			variant: 'story',
			titulo: 'Situación',
			spec: 'STAR-S',
			uiTitle: 'Contexto',
			uiDescription: 'Define el escenario en 1 frase.',
			fields: fields({ key: 'rol', label: 'Rol', kind: 'string', default: 'Product Builder' }),
			derived: [
				{
					resultKey: 's',
					name: 'situacion',
					expr: 'Contexto',
					compute: (v) => `Como ${v.rol}, en DevDays…`
				}
			]
		}),
		block({
			variant: 'story',
			titulo: 'Acción',
			spec: 'STAR-A',
			uiTitle: 'Qué hiciste',
			uiDescription: 'Tecnología y decisión.',
			fields: fields({ key: 'labs', label: 'Labs visuales', kind: 'boolean', default: true }),
			derived: [
				{
					resultKey: 'a',
					name: 'accion',
					expr: 'diseño + código',
					compute: (v) => (v.labs ? 'Diseñé labs interactivos con Svelte 5' : 'Solo teoría')
				}
			]
		}),
		block({
			variant: 'story',
			titulo: 'Resultado',
			spec: 'STAR-R',
			uiTitle: 'Impacto',
			uiDescription: 'Métrica o aprendizaje.',
			fields: fields({
				key: 'pct',
				label: 'Retención %',
				kind: 'number',
				default: 80,
				min: 0,
				max: 100
			}),
			derived: [
				{
					resultKey: 'r',
					name: 'resultado',
					expr: 'métrica',
					compute: (v) => `${v.pct}% completan más ejercicios`
				}
			]
		})
	]
};

export const day34: DayLabConfig = {
	heroTitle: 'Presenta tu proyecto',
	heroSubtitle: 'Guión: hook → problema → solución → demo → next.',
	flowNodes: [
		{ id: '01', label: 'Hook' },
		{ id: '02', label: 'Demo', accent: true },
		{ id: '03', label: 'Cierre' }
	],
	labs: [
		block({
			variant: 'story',
			titulo: 'Hook (15s)',
			spec: 'pitch',
			uiTitle: 'Apertura',
			uiDescription: 'Primera frase que engancha.',
			fields: fields({
				key: 'seg',
				label: 'Segundos',
				kind: 'number',
				default: 15,
				min: 5,
				max: 30
			}),
			derived: [
				{
					resultKey: 'hook',
					name: 'apertura',
					expr: '1 frase',
					compute: (v) => `En ${v.seg}s: «Aprende JS tocando UI real»`
				}
			]
		}),
		block({
			variant: 'story',
			titulo: 'Demo guiada',
			spec: 'live demo',
			uiTitle: 'Pantalla',
			uiDescription: 'Qué pantallas mostrar.',
			fields: fields(
				{ key: 'login', label: 'Mostrar login', kind: 'boolean', default: true },
				{ key: 'lab', label: 'Mostrar lab', kind: 'boolean', default: true }
			),
			derived: [
				{
					resultKey: 'steps',
					name: 'pasos',
					expr: 'flujo demo',
					compute: (v) =>
						[v.login && '1.Login', v.lab && '2.Lab día 2', '3.Corrector']
							.filter(Boolean)
							.join(' → ')
				}
			]
		}),
		block({
			variant: 'story',
			titulo: 'Next steps',
			spec: 'cierre',
			uiTitle: 'Cierre',
			uiDescription: 'Qué viene después.',
			fields: fields({ key: 'deploy', label: 'En producción', kind: 'boolean', default: true }),
			derived: [
				{
					resultKey: 'cierre',
					name: 'next',
					expr: 'CTA',
					compute: (v) => (v.deploy ? 'Pruébalo en devdays.vercel.app' : 'WIP en local')
				}
			]
		})
	]
};
