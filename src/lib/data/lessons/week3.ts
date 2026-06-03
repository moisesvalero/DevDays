import type { Leccion } from '$lib/types/lesson';
import { ej, contenidoLab } from './_helpers';

export const week3: Leccion[] = [
	{
		dia: 15,
		semana: 3,
		tipo: 'leccion',
		titulo: 'Svelte y SvelteKit: el stack UI',
		objetivo: 'Diferenciar compilador Svelte, framework SvelteKit y cómo encajan en DevDays.',
		contenido: contenidoLab(
			'dia-15-svelte-stack',
			'Laboratorio: componentes padre/hijo en Svelte.',
			['Árbol de componentes', 'Props down', 'Events up']
		),
		ejercicios: [
			ej(
				1,
				'Ficha de arquitectura',
				{
					planteamiento:
						'Se solicita documentar en consola qué es un componente Svelte dentro del stack UI del bootcamp.',
					requisitos: [
						'Defina la variable `respuesta` con una frase técnica que describa qué es un componente Svelte.',
						'Escriba en consola el valor de `respuesta`.'
					],
					salidaEsperada: 'Menciona pieza reutilizable o .svelte',
					seccionRef: 'Árbol de componentes',
					notas: 'Consulte la sección «Svelte (compilador UI)».'
				},
				['Texto define componente'],
				`const respuesta = \`...\`;\nconsole.log(respuesta);`
			),
			ej(
				2,
				'Ruta raíz',
				{
					planteamiento:
						'Se solicita identificar el archivo de ruta que SvelteKit asocia a la URL raíz del sitio.',
					requisitos: [
						'Asigne a `path` la ruta de archivo que sirve la URL `/` en SvelteKit.',
						'Escriba en consola `path`.'
					],
					salidaEsperada: 'src/routes/+page.svelte',
					seccionRef: 'Props down',
					notas: 'Consulte la sección «SvelteKit (app framework)».'
				},
				['Convención +page.svelte en routes'],
				`const path = '';\nconsole.log(path);`
			),
			ej(
				3,
				'Menos JS en cliente',
				{
					planteamiento:
						'Se solicita explicar por qué Svelte suele enviar menos JavaScript al navegador que frameworks con runtime grande.',
					requisitos: [
						'Defina la variable `respuesta` con una frase que justifique el menor peso del bundle en cliente.',
						'Escriba en consola `respuesta`.'
					],
					salidaEsperada: 'Menciona compilar / build / ligero',
					seccionRef: 'Events up',
					notas: 'Consulte la sección «Stack DevDays».'
				},
				['Texto sobre compilación o bundle'],
				`const respuesta = \`...\`;\nconsole.log(respuesta);`
			)
		]
	},
	{
		dia: 16,
		semana: 3,
		tipo: 'leccion',
		titulo: 'Archivo .svelte: script, markup, style',
		objetivo: 'Leer y escribir la estructura estándar de un componente Svelte 5.',
		contenido: contenidoLab(
			'dia-16-svelte-archivo',
			'Laboratorio: script, markup y style en .svelte.',
			['Bloque script', 'Markup', 'Style scoped']
		),
		ejercicios: [
			ej(
				1,
				'Template en string',
				{
					planteamiento:
						'Se solicita simular en un string el markup de un componente Svelte con interpolación de variable.',
					requisitos: [
						'Defina `markup` como string con un `h1` que incluya `{titulo}` al estilo Svelte (placeholder dentro del string).',
						'Escriba en consola `markup`.'
					],
					salidaEsperada: 'h1 con placeholder de titulo',
					seccionRef: 'Bloque script',
					notas: 'Consulte la sección «Tres bloques del archivo».'
				},
				['String contiene h1 y titulo'],
				`const titulo = 'DevDays';\nconst markup = \`...\`;\nconsole.log(markup);`
			),
			ej(
				2,
				'Partes del archivo',
				{
					planteamiento:
						'Se solicita representar las tres secciones canónicas de un archivo `.svelte`.',
					requisitos: [
						'Construya el array `partes` con tres strings: `script`, `html` y `style` (nombres de sección).',
						'Escriba en consola `partes.length`.'
					],
					salidaEsperada: '3',
					seccionRef: 'Markup',
					notas: 'Consulte la sección «Import y composición».'
				},
				['Array de tres elementos'],
				`const partes = [];\nconsole.log(partes.length);`
			),
			ej(
				3,
				'Ruta de import',
				{
					planteamiento:
						'Se solicita indicar una ruta de importación válida para un componente en `$lib`.',
					requisitos: [
						'Asigne a `importPath` un string válido para importar `Button.svelte` desde `$lib`.',
						'Escriba en consola `importPath`.'
					],
					salidaEsperada: 'Ruta con $lib o relativa a components',
					seccionRef: 'Style scoped',
					notas: 'Consulte la sección «Interpolación `{expresión}`».'
				},
				['String de import ES'],
				`const importPath = '';\nconsole.log(importPath);`
			)
		]
	},
	{
		dia: 17,
		semana: 3,
		tipo: 'leccion',
		titulo: '$state: estado reactivo mutable',
		objetivo: 'Declarar datos que, al cambiar, actualizan el markup automáticamente.',
		contenido: contenidoLab('dia-17-state', 'Laboratorio: $state en UI de producto.', [
			'Contador',
			'Toggle UI',
			'Formulario'
		]),
		ejercicios: [
			ej(
				1,
				'Simular contador',
				{
					planteamiento:
						'Se solicita simular en JavaScript la mutación de estado que `$state` gestiona en un componente.',
					requisitos: [
						'Utilice el objeto `ui` con `count: 0`, incremente `count` en una unidad y escriba en consola su valor.'
					],
					salidaEsperada: '1',
					seccionRef: 'Contador',
					notas: 'Consulte la sección «$state(primitivo)».'
				},
				['Incremento y log 1'],
				`const ui = { count: 0 };\nui.count++;\nconsole.log(ui.count);`
			),
			ej(
				2,
				'Array mutable',
				{
					planteamiento:
						'Se solicita practicar la mutación reactiva típica de arrays bajo `$state`.',
					requisitos: [
						'Parta de un array vacío, añada el elemento `"a"` con `push` y escriba en consola `length`.'
					],
					salidaEsperada: '1',
					seccionRef: 'Toggle UI',
					notas: 'Consulte la sección «$state(objeto | array)».'
				},
				['push y length'],
				`const lista = [];\nlista.push('a');\nconsole.log(lista.length);`
			),
			ej(
				3,
				'Definición en texto',
				{
					planteamiento:
						'Se solicita definir con sus palabras el comportamiento de la rune `$state` en Svelte 5.',
					requisitos: [
						'Defina la variable `respuesta` con una frase que explique qué hace `$state`.',
						'Escriba en consola `respuesta`.'
					],
					salidaEsperada: 'Menciona reactivo o actualiza UI',
					seccionRef: 'Formulario',
					notas: 'Consulte la sección «TypeScript con runes».'
				},
				['Texto explica $state'],
				`const respuesta = \`...\`;\nconsole.log(respuesta);`
			)
		]
	},
	{
		dia: 18,
		semana: 3,
		tipo: 'leccion',
		titulo: '$derived y $effect',
		objetivo: 'Valores calculados automáticos y efectos secundarios controlados.',
		contenido: contenidoLab('dia-18-derived', 'Laboratorio: $derived y $effect.', [
			'Precio + IVA',
			'Stock bajo',
			'Log simulado'
		]),
		ejercicios: [
			ej(
				1,
				'Total con IVA',
				{
					planteamiento:
						'Se solicita calcular un total con IVA a partir de precio base y tipo impositivo (equivalente manual a `$derived`).',
					requisitos: [
						'Con `precio` 10 e `iva` 0.21, calcule el total con IVA incluido y escriba el resultado en consola.'
					],
					salidaEsperada: '12.1',
					seccionRef: 'Precio + IVA',
					notas: 'Consulte la sección «$derived».'
				},
				['Multiplica precio por 1+iva o suma iva'],
				`const precio = 10;\nconst iva = 0.21;\n\n`
			),
			ej(
				2,
				'Cuándo $effect',
				{
					planteamiento:
						'Se solicita reflexionar sobre el uso adecuado de `$effect` frente a lógica en el template.',
					requisitos: [
						'Escriba un comentario indicando en qué caso usaría `$effect` en un componente real.'
					],
					salidaEsperada: 'Menciona cambio, sync o side effect',
					seccionRef: 'Stock bajo',
					notas: 'Consulte la sección «$effect».'
				},
				['Comentario con idea de efecto'],
				`// Usaría $effect cuando...\n\n`
			),
			ej(
				3,
				'Doble numérico',
				{
					planteamiento:
						'Se solicita obtener un valor derivado por multiplicación (análogo a `$derived` con una expresión simple).',
					requisitos: ['Con `n` igual a 5, escriba en consola el doble (`n * 2`).'],
					salidaEsperada: '10',
					seccionRef: 'Log simulado',
					notas: 'Consulte la sección «Cleanup en $effect».'
				},
				['Multiplicación por 2'],
				`const n = 5;\nconsole.log(n * 2);`
			)
		]
	},
	{
		dia: 19,
		semana: 3,
		tipo: 'leccion',
		titulo: '$props: API del componente',
		objetivo: 'Recibir datos del padre, defaults y slots con snippets.',
		contenido: contenidoLab('dia-19-props', 'Laboratorio: $props en cards reutilizables.', [
			'Props obligatorias',
			'Default props',
			'Props tipadas'
		]),
		ejercicios: [
			ej(
				1,
				'Objeto props',
				{
					planteamiento:
						'Se solicita simular la lectura de props que un componente hijo recibe del padre.',
					requisitos: ['Simule `props = { label: "OK" }` y escriba en consola `props.label`.'],
					salidaEsperada: 'OK',
					seccionRef: 'Props obligatorias',
					notas: 'Consulte la sección «$props() y destructuring».'
				},
				['Acceso a label'],
				`const props = { label: 'OK' };\nconsole.log(props.label);`
			),
			ej(
				2,
				'Default con ??',
				{
					planteamiento:
						'Se solicita aplicar un valor por defecto cuando una prop opcional no está definida.',
					requisitos: [
						'Parta de un objeto `props` vacío y resuelva `color` con el operador `??` para que valga `"gris"`.',
						'Escriba en consola `color`.'
					],
					salidaEsperada: 'gris',
					seccionRef: 'Default props',
					notas: 'Consulte la sección «Valores por defecto».'
				},
				['Nullish coalescing o default'],
				`const props = {};\nconst color = props.color ?? 'gris';\nconsole.log(color);`
			),
			ej(
				3,
				'Sintaxis snippet',
				{
					planteamiento:
						'Se solicita identificar la sintaxis Svelte 5 para renderizar contenido hijo con snippets.',
					requisitos: [
						'Asigne a `linea` el texto exacto `{@render children?.()}`.',
						'Escriba en consola `linea`.'
					],
					salidaEsperada: 'Contiene render children',
					seccionRef: 'Props tipadas',
					notas: 'Consulte la sección «Snippets y children».'
				},
				['String con sintaxis Svelte 5'],
				`const linea = '{@render children?.()}';\nconsole.log(linea);`
			)
		]
	},
	{
		dia: 20,
		semana: 3,
		tipo: 'leccion',
		titulo: 'Eventos DOM y bind: two-way',
		objetivo: 'Manejar interacción con `onclick` y enlazar inputs al estado.',
		contenido: contenidoLab('dia-20-eventos', 'Laboratorio: onclick y bind: en formularios.', [
			'onclick',
			'bind:value',
			'bind:checked'
		]),
		ejercicios: [
			ej(
				1,
				'Handler incremento',
				{
					planteamiento:
						'Se solicita simular un manejador de evento `onclick` que muta estado local.',
					requisitos: [
						'Con `c` inicializado en 0, defina la función `click` que incrementa `c`, invóquela y escriba `c` en consola.'
					],
					salidaEsperada: '1',
					seccionRef: 'onclick',
					notas: 'Consulte la sección «Eventos (onclick, onsubmit)».'
				},
				['Función muta contador'],
				`let c = 0;\nfunction click() { c++; }\nclick();\nconsole.log(c);`
			),
			ej(
				2,
				'Mensaje con nombre',
				{
					planteamiento:
						'Se solicita construir un mensaje enlazado a una variable de nombre (análogo a `bind:value`).',
					requisitos: [
						'Con `nombre` igual a `"Ana"`, defina `msg` como template de saludo e imprímalo en consola.'
					],
					salidaEsperada: 'Hola Ana o equivalente',
					seccionRef: 'bind:value',
					notas: 'Consulte la sección «bind:value».'
				},
				['Template incluye nombre'],
				`let nombre = 'Ana';\nconst msg = \`Hola \${nombre}\`;\nconsole.log(msg);`
			),
			ej(
				3,
				'Condicional checked',
				{
					planteamiento:
						'Se solicita ramificar la salida según un booleano (análogo a `bind:checked`).',
					requisitos: [
						'Con `ok` en `true`, escriba en consola `"aceptado"`; en caso contrario, `"pendiente"`.'
					],
					salidaEsperada: 'aceptado',
					seccionRef: 'bind:checked',
					notas: 'Consulte la sección «bind:checked y booleanos».'
				},
				['Ternario o if con ok'],
				`const ok = true;\nconsole.log(ok ? 'aceptado' : 'pendiente');`
			)
		]
	},
	{
		dia: 21,
		semana: 3,
		tipo: 'examen',
		repasoVisual: 'repaso-s3',
		titulo: 'Repaso Semana 3: Svelte 5',
		objetivo:
			'Runes, componentes y eventos en código corto — la IA valora el efecto, no la sintaxis perfecta.',
		instrucciones: `Cinco retos conceptuales con código corto. Importa el resultado final, no el estilo exacto.`,
		ejercicios: [
			ej(
				1,
				'$state en texto',
				{
					planteamiento:
						'Repaso de semana: defina en prosa el rol de la rune `$state` en Svelte 5.',
					requisitos: [
						'Defina la variable `respuesta` explicando `$state` en una o dos frases.',
						'Escriba en consola `respuesta`.'
					],
					salidaEsperada: 'Menciona reactivo o actualización UI',
					seccionRef: 'Repaso semana 3',
					notas: 'Repaso de los días 15–20 (semana 3): rune $state.'
				},
				['Texto con idea de $state'],
				`const respuesta = \`...\`;\nconsole.log(respuesta);`
			),
			ej(
				2,
				'$derived manual',
				{
					planteamiento:
						'Repaso de semana: calcule un total derivado de precio y cantidad sin usar runes en el entorno de práctica.',
					requisitos: ['Con `precio` 5 y `cant` 3, escriba en consola el producto (total).'],
					salidaEsperada: '15',
					seccionRef: 'Repaso semana 3',
					notas: 'Repaso de los días 15–20 (semana 3): $derived y cálculos derivados.'
				},
				['Multiplica precio por cantidad'],
				`const precio = 5, cant = 3;\nconsole.log(precio * cant);`
			),
			ej(
				3,
				'$props simulado',
				{
					planteamiento: 'Repaso de semana: lea una prop simulada desde un objeto.',
					requisitos: ['Utilice `props` con `titulo: "Hola"` y escriba en consola `props.titulo`.'],
					salidaEsperada: 'Hola',
					seccionRef: 'Repaso semana 3',
					notas: 'Repaso de los días 15–20 (semana 3): $props y lectura de props.'
				},
				['Lee props.titulo'],
				`const props = { titulo: 'Hola' };\nconsole.log(props.titulo);`
			),
			ej(
				4,
				'Toggle evento',
				{
					planteamiento:
						'Repaso de semana: invierta un booleano con una función tipo manejador de evento.',
					requisitos: [
						'Con `on` en `false`, defina `toggle` que invierte el booleano, invóquela y escriba `on` en consola.'
					],
					salidaEsperada: 'true',
					seccionRef: 'Repaso semana 3',
					notas: 'Repaso de los días 15–20 (semana 3): eventos onclick y handlers.'
				},
				['toggle cambia on'],
				`let on = false;\nfunction toggle() { on = !on; }\ntoggle();\nconsole.log(on);`
			),
			ej(
				5,
				'Anatomía .svelte',
				{
					planteamiento:
						'Repaso de semana: enumere las tres secciones de un archivo `.svelte` y compruebe su cantidad.',
					requisitos: [
						'Utilice un array con `script`, `html` y `style` y escriba en consola su longitud.'
					],
					salidaEsperada: '3',
					seccionRef: 'Repaso semana 3',
					notas: 'Repaso de los días 15–20 (semana 3): anatomía del archivo .svelte.'
				},
				['Array tres elementos'],
				`console.log(['script', 'html', 'style'].length);`
			)
		]
	}
];
