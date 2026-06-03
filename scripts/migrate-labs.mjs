/**
 * Migra lecciones a modo laboratorio. node scripts/migrate-labs.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const LESSONS = {
	4: {
		id: 'dia-4-funciones',
		intro: 'Laboratorio: funciones de envío, filtros y defaults. Código en vivo.',
		titulos: ['Calcular envío', 'Filtro con flecha', 'Parámetro por defecto']
	},
	5: {
		id: 'dia-5-arrays-transform',
		intro: 'Laboratorio: map, filter y find sobre catálogo de producto.',
		titulos: ['Duplicar precios (map)', 'Solo disponibles (filter)', 'Buscar SKU (find)']
	},
	6: {
		id: 'dia-6-arrays-aggregate',
		intro: 'Laboratorio: reduce, some y sort en métricas de carrito.',
		titulos: ['Total del carrito (reduce)', '¿Hay agotados? (some)', 'Ordenar por precio (sort)']
	},
	8: {
		id: 'dia-8-objetos',
		intro: 'Laboratorio: ficha de producto como objeto.',
		titulos: ['Card de producto', 'Actualizar propiedad', 'Destructuring']
	},
	9: {
		id: 'dia-9-bucles',
		intro: 'Laboratorio: tablas y chips desde arrays.',
		titulos: ['Generar filas', 'Chips de categorías', 'includes en carrito']
	},
	10: {
		id: 'dia-10-closures',
		intro: 'Laboratorio: closures y factory de descuento.',
		titulos: ['Contador privado', 'Factory descuento', 'Precio final']
	},
	11: {
		id: 'dia-11-promesas',
		intro: 'Laboratorio: estados de Promise en checkout.',
		titulos: ['Simular carga', 'Timeout', 'Encadenar']
	},
	12: {
		id: 'dia-12-async',
		intro: 'Laboratorio: async/await y estados de fetch.',
		titulos: ['Cargar catálogo', 'Skeleton', 'Retry']
	},
	13: {
		id: 'dia-13-dom',
		intro: 'Laboratorio: eventos y localStorage simulado.',
		titulos: ['Tema claro/oscuro', 'onclick', 'Carrito guardado']
	},
	15: {
		id: 'dia-15-svelte-stack',
		intro: 'Laboratorio: componentes padre/hijo en Svelte.',
		titulos: ['Árbol de componentes', 'Props down', 'Events up']
	},
	16: {
		id: 'dia-16-svelte-archivo',
		intro: 'Laboratorio: script, markup y style en .svelte.',
		titulos: ['Bloque script', 'Markup', 'Style scoped']
	},
	17: {
		id: 'dia-17-state',
		intro: 'Laboratorio: $state en UI de producto.',
		titulos: ['Contador', 'Toggle UI', 'Formulario']
	},
	18: {
		id: 'dia-18-derived',
		intro: 'Laboratorio: $derived y $effect.',
		titulos: ['Precio + IVA', 'Stock bajo', 'Log simulado']
	},
	19: {
		id: 'dia-19-props',
		intro: 'Laboratorio: $props en cards reutilizables.',
		titulos: ['Props obligatorias', 'Default props', 'Props tipadas']
	},
	20: {
		id: 'dia-20-eventos',
		intro: 'Laboratorio: onclick y bind: en formularios.',
		titulos: ['onclick', 'bind:value', 'bind:checked']
	},
	22: {
		id: 'dia-22-rutas',
		intro: 'Laboratorio: mapa de rutas de la app.',
		titulos: ['Navegación', 'Link activo', '404']
	},
	23: {
		id: 'dia-23-layouts',
		intro: 'Laboratorio: layouts y slots.',
		titulos: ['Shell', 'Slot principal', 'Layout anidado']
	},
	24: {
		id: 'dia-24-dinamicas',
		intro: 'Laboratorio: rutas dinámicas [slug].',
		titulos: ['Lista → detalle', 'params.slug', '404 producto']
	},
	25: {
		id: 'dia-25-load',
		intro: 'Laboratorio: load antes de pintar.',
		titulos: ['load function', 'Skeleton', '$props data']
	},
	26: {
		id: 'dia-26-forms',
		intro: 'Laboratorio: form actions.',
		titulos: ['POST action', 'Validación', 'Progressive']
	},
	27: {
		id: 'dia-27-supabase',
		intro: 'Laboratorio: auth y datos Supabase.',
		titulos: ['Login', 'Query', 'RLS']
	},
	29: {
		id: 'dia-29-typescript',
		intro: 'Laboratorio: tipos en componentes de producto.',
		titulos: ['Interface Producto', 'Props tipadas', 'Union types']
	},
	30: {
		id: 'dia-30-env',
		intro: 'Laboratorio: env y hooks.server.',
		titulos: ['Variables públicas', 'Secrets servidor', 'hooks.server']
	},
	31: {
		id: 'dia-31-deploy',
		intro: 'Laboratorio: pipeline de deploy Vercel.',
		titulos: ['Pipeline', 'Preview', 'Env prod']
	},
	32: {
		id: 'dia-32-stack-story',
		intro: 'Laboratorio: pitch de 2 minutos.',
		titulos: ['Problema de negocio', 'Stack elegido', 'Demo en vivo']
	},
	33: {
		id: 'dia-33-entrevista',
		intro: 'Laboratorio: estructura STAR.',
		titulos: ['Situación', 'Acción', 'Resultado']
	},
	34: {
		id: 'dia-34-proyecto',
		intro: 'Laboratorio: guiar demo del proyecto.',
		titulos: ['Hook (15s)', 'Demo guiada', 'Next steps']
	}
};

const REPASO = {
	7: 'repaso-s1',
	14: 'repaso-s2',
	21: 'repaso-s3',
	28: 'repaso-s4',
	35: 'repaso-s5'
};

const WEEK_DAYS = {
	1: [4, 5, 6, 7],
	2: [8, 9, 10, 11, 12, 13, 14],
	3: [15, 16, 17, 18, 19, 20, 21],
	4: [22, 23, 24, 25, 26, 27, 28],
	5: [29, 30, 31, 32, 33, 34, 35]
};

function esc(s) {
	return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function contenidoLabBlock(cfg) {
	const titulosStr = cfg.titulos.map((t) => `'${esc(t)}'`).join(', ');
	return `contenido: contenidoLab(
      '${cfg.id}',
      '${esc(cfg.intro)}',
      [${titulosStr}]
    )`;
}

function extractDayBlock(src, dia) {
	const start = src.indexOf(`dia: ${dia},`);
	if (start < 0) return null;
	const nextDia = src.indexOf('\n  {\n    dia:', start + 10);
	const end = nextDia < 0 ? src.lastIndexOf('\n];') : nextDia;
	return { start, end, block: src.slice(start, end) };
}

function replaceContenidoBlock(block, replacement) {
	const marker = 'contenido:';
	const start = block.indexOf(marker);
	if (start < 0) return block;
	const braceStart = block.indexOf('{', start);
	if (braceStart < 0) return block;

	let depth = 0;
	let i = braceStart;
	for (; i < block.length; i++) {
		const ch = block[i];
		if (ch === '{') depth++;
		else if (ch === '}') {
			depth--;
			if (depth === 0) {
				i++;
				break;
			}
		}
	}

	const tail = block.slice(i).replace(/^\s*,\s*/, '');
	if (!tail.startsWith('ejercicios:')) return block;

	return block.slice(0, start) + replacement + ',\n    ' + tail;
}

function migrateLessonBlock(block, dia) {
	const cfg = LESSONS[dia];
	if (!cfg || block.includes(`'${cfg.id}'`)) return block;

	let out = replaceContenidoBlock(block, contenidoLabBlock(cfg));

	let refIdx = 0;
	out = out.replace(/seccionRef: '[^']*'/g, (m) => {
		if (refIdx >= cfg.titulos.length) return m;
		const next = `seccionRef: '${esc(cfg.titulos[refIdx])}'`;
		refIdx++;
		return next;
	});

	return out;
}

function migrateWeek(weekNum) {
	const file = join(root, `src/lib/data/lessons/week${weekNum}.ts`);
	let src = readFileSync(file, 'utf8');

	if (!src.includes('contenidoLab')) {
		src = src.replace(
			/import \{ sec, ej \} from '\.\/_helpers';/,
			"import { sec, ej, contenidoLab } from './_helpers';"
		);
	}

	for (const dia of WEEK_DAYS[weekNum]) {
		if (REPASO[dia]) {
			const examSlice = extractDayBlock(src, dia);
			if (!examSlice || examSlice.block.includes('repasoVisual')) continue;
			const updated = examSlice.block.replace(
				/tipo: 'examen',\n/,
				`tipo: 'examen',\n    repasoVisual: '${REPASO[dia]}',\n`
			);
			src = src.slice(0, examSlice.start) + updated + src.slice(examSlice.end);
			continue;
		}

		const slice = extractDayBlock(src, dia);
		if (!slice) continue;
		const newBlock = migrateLessonBlock(slice.block, dia);
		if (newBlock !== slice.block) {
			src = src.slice(0, slice.start) + newBlock + src.slice(slice.end);
		}
	}

	writeFileSync(file, src);
	console.log('OK week' + weekNum);
}

for (let w = 1; w <= 5; w++) migrateWeek(w);
