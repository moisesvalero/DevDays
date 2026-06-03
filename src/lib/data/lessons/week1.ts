import type { Leccion } from '$lib/types/lesson';
import { sec, ej, contenidoLab } from './_helpers';

export const week1: Leccion[] = [
	{
		dia: 1,
		semana: 1,
		tipo: 'leccion',
		titulo: 'Variables: guardar y mostrar datos',
		objetivo: 'Traducir estado de producto (const, let, templates) a UI y consola.',
		contenido: contenidoLab(
			'dia-1-variables',
			'Laboratorio: ficha de usuario, saludo y etiqueta de precio. Edita el código en vivo.',
			['Contador de stock', 'Saludo en ficha de usuario', 'Etiqueta de producto']
		),
		ejercicios: [
			ej(
				1,
				'Contador desde cero',
				{
					planteamiento:
						'Se desea modelar un contador numérico que arranca en cero, aumenta en cinco unidades y muestra el resultado en consola. Todo lo necesario está en la sección «Variables con let y console.log».',
					requisitos: [
						'Parta de `let cajas = 0` (ya en la plantilla).',
						'Aumente el valor en 5 con la forma vista en la lección: `cajas = cajas + 5` o `cajas += 5`.',
						'Muestre el resultado con `console.log(cajas)`.'
					],
					salidaEsperada: '5',
					seccionRef: 'Contador de stock',
					notas: 'Véase sección «Variables con let y console.log».'
				},
				['Hay contador que empieza en 0', 'Se suma 5', 'Se imprime 5'],
				`// Día 1 — Ej. 1 Contador\nlet cajas = 0;\n// cajas = cajas + 5;\n// console.log(cajas);\n\n`
			),
			ej(
				2,
				'Saludo con nombre y edad',
				{
					planteamiento:
						'Se desea elaborar un mensaje de presentación que incorpore el nombre y la edad mediante variables. Requiere template literals, explicados en la sección «Meter variables dentro de un texto».',
					requisitos: [
						'Declare `nombre` (texto) y `edad` (número) con `const`.',
						'Cree `saludo` con backticks e interpolación: `${nombre}` y `${edad}`.',
						'Muestre el mensaje con `console.log(saludo)`.'
					],
					salidaEsperada: 'Hola, soy Tu nombre y tengo 25 años',
					seccionRef: 'Saludo en ficha de usuario',
					notas: 'Véase sección «Template strings».'
				},
				[
					'Existe variable con nombre',
					'Existe variable con edad',
					'El saludo usa los valores de las variables (backticks con ${...} o concatenación con +), no el texto fijo escrito a mano',
					'La salida menciona ambos datos'
				],
				"// Día 1 — Ej. 2 Saludo\nconst nombre = 'Tu nombre';\nconst edad = 25;\n// Cree saludo con backticks y console.log\n\n"
			),
			ej(
				3,
				'Frase con producto y precio',
				{
					planteamiento:
						'Se dispone del nombre de un producto y de su precio unitario en variables separadas. Se solicita generar una frase descriptiva que combine ambos datos y mostrarla en consola.',
					requisitos: [
						'Utilice las variables `producto` y `precio` ya declaradas en la plantilla.',
						'Construya la frase con template literals o concatenación, incluyendo producto y precio.',
						'Escriba en consola el texto final con `console.log`.'
					],
					salidaEsperada: 'La camiseta cuesta 19.99 euros',
					seccionRef: 'Etiqueta de producto',
					notas: 'Véase sección «Mensaje con varias variables».'
				},
				['Hay precio y nombre de producto', 'El mensaje final los menciona'],
				`// Día 1 — Producto y precio\nconst precio = 19.99;\nconst producto = 'camiseta';\n\n`
			)
		]
	},
	{
		dia: 2,
		semana: 1,
		tipo: 'leccion',
		titulo: 'Operadores y comparaciones',
		objetivo: 'Traducir reglas de producto (+, %, ===, &&) a comportamiento de UI.',
		contenido: {
			intro:
				'Laboratorio visual: carrito, planes y checkout. Cada control es una spec; la consola de abajo valida la misma lógica.',
			modo: 'laboratorio',
			laboratorio: 'dia-2-operadores',
			secciones: [
				sec(
					'Carrito y filas de tabla',
					'Precio × cantidad y resto de packs.',
					'Subtotales, envíos y zebra en tablas.',
					'',
					undefined,
					['Subtotal con + y *', 'Sobrante con %']
				),
				sec(
					'Comparar planes en la UI',
					'Destacar el plan con precio mayor.',
					'Pricing y badges «Recomendado».',
					'',
					undefined,
					['Comparar con > y ===', 'Elegir rama con if']
				),
				sec(
					'Reglas de compra',
					'Botón activo solo si pago y stock.',
					'Checkout, banners y promos.',
					'',
					undefined,
					['Combinar con &&', 'Promo con ||']
				)
			],
			resumen: []
		},
		ejercicios: [
			ej(
				1,
				'Spec: subtotal y sobrante',
				{
					planteamiento:
						'En el checkout debes calcular el subtotal de línea (10 + 5 unidades de envío simulado) y el sobrante al empaquetar 10 unidades en packs de 3.',
					requisitos: [
						'Calcule `10 + 5` (línea de carrito) y muestre el resultado con `console.log`.',
						'Calcule `10 % 3` (unidades sueltas tras empaquetar) y muestre el resto con `console.log`.'
					],
					salidaEsperada: '15\n1',
					seccionRef: 'Carrito y filas de tabla',
					notas: 'Laboratorio 1 — mismos valores que el carrito interactivo.'
				},
				['Muestra subtotal 15', 'Muestra sobrante 1'],
				`// Spec: subtotal de línea + sobrante de pack\n// console.log(10 + 5);\n// console.log(10 % 3);\n\n`
			),
			ej(
				2,
				'Spec: plan destacado',
				{
					planteamiento:
						'Dos planes (Pro y Starter) tienen precios `a` y `b`. El producto debe exponer en consola el importe del plan más caro para el checkout.',
					requisitos: [
						'Utilice las variables `a` y `b` de la plantilla.',
						'Con `if (a > b)` (y `else` si hace falta) asigne el mayor a una variable.',
						'Escriba en consola el precio del plan destacado con `console.log`.'
					],
					salidaEsperada: '12',
					seccionRef: 'Comparar planes en la UI',
					notas: 'Laboratorio 2 — misma lógica que la etiqueta «Recomendado».'
				},
				['Dos precios de plan', 'Elige el mayor con if', 'Imprime el importe'],
				`// Spec: precio del plan destacado\nconst a = 12;\nconst b = 9;\n\n`
			),
			ej(
				3,
				'Spec: botón de compra',
				{
					planteamiento:
						'El botón «Completar compra» solo debe estar habilitado si `pagado` es true y `stock` es mayor que 0. Expón esa regla como booleano en consola.',
					requisitos: [
						'Utilice las variables `pagado` y `stock` de la plantilla.',
						'Combine ambas condiciones con `&&`.',
						'Escriba en consola si la compra puede completarse (true/false).'
					],
					salidaEsperada: 'true',
					seccionRef: 'Reglas de compra',
					notas: 'Laboratorio 3 — misma regla que el botón del checkout.'
				},
				['Regla pagado && stock', 'Booleano en consola'],
				`// Spec: habilitar botón de compra\nconst pagado = true;\nconst stock = 3;\n\n`
			)
		]
	},
	{
		dia: 3,
		semana: 1,
		tipo: 'leccion',
		titulo: 'Condicionales: if, else, ternario, switch',
		objetivo: 'Ramificar UI de producto con if, ternario y switch.',
		contenido: contenidoLab(
			'dia-3-condicionales',
			'Laboratorio: estados de pedido, CTA y planes. Edita condiciones en vivo.',
			['Estado del pedido', 'CTA con ternario', 'Selector de plan']
		),
		ejercicios: [
			ej(
				1,
				'Adulto o menor',
				{
					planteamiento:
						'Se dispone de la edad de una persona en años. El programa debe clasificarla como «adulto» o «menor» según el umbral legal de dieciocho años e imprimir la etiqueta correspondiente.',
					requisitos: [
						'Utilice la variable `edad` de la plantilla (valor 20).',
						'Implemente una rama condicional: si `edad >= 18`, asigne el texto «adulto»; en caso contrario, «menor».',
						'Escriba en consola la etiqueta resultante con `console.log`.'
					],
					salidaEsperada: 'adulto',
					seccionRef: 'Estado del pedido',
					notas: 'Véase sección «if / else».'
				},
				['Usa condición con edad', 'Salida coherente con 18+'],
				`// Día 3 — Adulto o menor\nconst edad = 20;\n\n`
			),
			ej(
				2,
				'Precio VIP o normal',
				{
					planteamiento:
						'Un cliente puede tener estatus VIP, lo que afecta el mensaje de tarifa mostrado. Se debe elegir entre dos mensajes exclusivos según el valor de `esVip` y mostrarlo en consola.',
					requisitos: [
						'Utilice la variable `esVip` de la plantilla.',
						'Asigne el texto «descuento» si es VIP, o «precio normal» en caso contrario con el operador ternario.',
						'Escriba en consola el mensaje elegido con `console.log`.'
					],
					salidaEsperada: 'descuento',
					seccionRef: 'CTA con ternario',
					notas: 'Véase sección «Operador ternario».'
				},
				['Depende de esVip', 'Dos resultados posibles'],
				`// Día 3 — Tarifa VIP\nconst esVip = true;\n\n`
			),
			ej(
				3,
				'Rutina según el día',
				{
					planteamiento:
						'Se conoce el día de la semana en forma de cadena. El programa debe seleccionar e imprimir una rutina distinta según ese valor, empleando `switch`.',
					requisitos: [
						"Utilice la variable `dia` de la plantilla (`'lunes'`).",
						'Defina al menos dos `case` con mensajes de rutina diferentes.',
						'Escriba en consola la rutina correspondiente con `break` en cada case.'
					],
					salidaEsperada: 'Rutina de lunes (texto distinto según el día elegido en código)',
					seccionRef: 'Selector de plan',
					notas: 'Véase sección «switch».'
				},
				['Ramifica por dia', 'Imprime texto'],
				`// Día 3 — Rutina semanal\nconst dia = 'lunes';\n\n`
			)
		]
	},
	{
		dia: 4,
		semana: 1,
		tipo: 'leccion',
		titulo: 'Funciones: declaración, flecha y parámetros',
		objetivo: 'Encapsular lógica reutilizable con parámetros y return.',
		contenido: contenidoLab(
			'dia-4-funciones',
			'Laboratorio: funciones de envío, filtros y defaults. Código en vivo.',
			['Calcular envío', 'Filtro con flecha', 'Parámetro por defecto']
		),
		ejercicios: [
			ej(
				1,
				'Función duplicar',
				{
					planteamiento:
						'Se requiere encapsular el cálculo del doble de un número en una función reutilizable. Tras completar su implementación, debe invocarse con un argumento concreto y mostrarse el resultado en consola.',
					requisitos: [
						'Complete la función `duplicar(n)` para que devuelva el doble de `n` con `return`.',
						'Invoque `duplicar` pasando el argumento `4`.',
						'Escriba en consola el valor devuelto con `console.log`.'
					],
					salidaEsperada: '8',
					seccionRef: 'Calcular envío',
					notas: 'Véase la sección «function declaración»: `return` e invocación con `console.log`.'
				},
				['Hay función que duplica', 'Se usa y se imprime resultado'],
				`// Día 4 — Función duplicar\nfunction duplicar(n) {\n  // return ...\n}\n\n`
			),
			ej(
				2,
				'Función sumar',
				{
					planteamiento:
						'Se desea una función flecha que sume dos operandos numéricos. Una vez definida, debe evaluarse con parámetros concretos y mostrarse la suma en consola.',
					requisitos: [
						'Complete la arrow function `sumar(a, b)` para que devuelva `a + b`.',
						'Invoque `sumar(3, 7)` y capture o use directamente su resultado.',
						'Escriba en consola el valor obtenido con `console.log`.'
					],
					salidaEsperada: '10',
					seccionRef: 'Filtro con flecha',
					notas: 'Véase la sección «Arrow function»: arrow con `=>` y `console.log`.'
				},
				['Función suma dos valores', 'Salida 10'],
				`// Día 4 — Función sumar\nconst sumar = (a, b) => {\n};\n\n`
			),
			ej(
				3,
				'Saludo con valor por defecto',
				{
					planteamiento:
						'Se define una función de saludo que acepta un nombre opcional. Si el llamador omite el argumento, debe emplearse el valor por defecto «invitado» y mostrarse el saludo resultante.',
					requisitos: [
						"Complete `saludar(nombre = 'invitado')` para devolver o imprimir un saludo que incluya `nombre`.",
						'Invoque `saludar()` sin argumentos.',
						'Escriba en consola el saludo generado (debe mencionar «invitado»).'
					],
					salidaEsperada: 'Hola, invitado',
					seccionRef: 'Parámetro por defecto',
					notas: "Véase la sección «Parámetros por defecto»: `nombre = 'invitado'`."
				},
				['Valor por defecto', 'Devuelve o imprime saludo'],
				`// Día 4 — Saludo por defecto\nfunction saludar(nombre = 'invitado') {\n}\n\n`
			)
		]
	},
	{
		dia: 5,
		semana: 1,
		tipo: 'leccion',
		titulo: 'Arrays: map, filter y find',
		objetivo: 'Transformar y consultar listas sin bucles manuales largos.',
		contenido: contenidoLab(
			'dia-5-arrays-transform',
			'Laboratorio: map, filter y find sobre catálogo de producto.',
			['Duplicar precios (map)', 'Solo disponibles (filter)', 'Buscar por id (find)']
		),
		ejercicios: [
			ej(
				1,
				'Minutos a segundos',
				{
					planteamiento:
						'Se dispone de una lista de duraciones en minutos correspondientes a varios capítulos. Se solicita transformar cada elemento a segundos (multiplicación por 60) sin modificar el array original y mostrar el nuevo array.',
					requisitos: [
						'Utilice el array `minutos` de la plantilla.',
						'Aplique `map` para obtener un array de segundos (cada valor × 60).',
						'Escriba en consola el array resultante con `console.log`.'
					],
					salidaEsperada: '[1500, 2400, 900]',
					seccionRef: 'Duplicar precios (map)',
					notas: 'Véase la sección «map»: transformar con callback y `console.log`.'
				},
				['Usa map', 'Multiplica por 60', 'Muestra array'],
				`// Día 5 — Minutos a segundos\nconst minutos = [25, 40, 15];\n\n`
			),
			ej(
				2,
				'Nombres de más de 4 letras',
				{
					planteamiento:
						'Se dispone de un array de nombres de mascotas con longitudes variadas. El programa debe conservar únicamente aquellos cuyo nombre supera cuatro caracteres y mostrar el subarray filtrado.',
					requisitos: [
						'Utilice el array `mascotas` de la plantilla.',
						'Aplique `filter` con la condición `nombre.length > 4`.',
						'Escriba en consola el array filtrado con `console.log`.'
					],
					salidaEsperada: "['perro', 'elefante']",
					seccionRef: 'Solo disponibles (filter)',
					notas: 'Véase la sección «filter»: condición en el callback y `console.log`.'
				},
				['Usa filter', 'Condición longitud > 4'],
				`// Día 5 — Filtrar nombres largos\nconst mascotas = ['gato', 'perro', 'elefante', 'pez'];\n\n`
			),
			ej(
				3,
				'Buscar usuario por id',
				{
					planteamiento:
						'Se dispone de una colección de objetos usuario con identificador y nombre. Se debe localizar el registro cuyo `id` es 2 y mostrar únicamente el nombre asociado en consola.',
					requisitos: [
						'Utilice el array `usuarios` de la plantilla.',
						'Aplique `find` para obtener el objeto con `id === 2`.',
						'Escriba en consola solo la propiedad `nombre` del resultado.'
					],
					salidaEsperada: 'Luis',
					seccionRef: 'Buscar por id (find)',
					notas: 'Véase la sección «find»: primer match y acceso a `nombre`.'
				},
				['find por id', 'Imprime nombre'],
				`// Día 5 — Buscar por id\nconst usuarios = [{ id: 1, nombre: 'Ana' }, { id: 2, nombre: 'Luis' }];\n\n`
			)
		]
	},
	{
		dia: 6,
		semana: 1,
		tipo: 'leccion',
		titulo: 'Arrays: reduce, some, every y sort',
		objetivo: 'Agregar valores, comprobar condiciones globales y ordenar listas.',
		contenido: contenidoLab(
			'dia-6-arrays-aggregate',
			'Laboratorio: reduce, some y sort en métricas de carrito.',
			['Total del carrito (reduce)', '¿Hay agotados? (some)', 'Ordenar por precio (sort)']
		),
		ejercicios: [
			ej(
				1,
				'Suma de precios',
				{
					planteamiento:
						'Se dispone de una lista de precios unitarios. El programa debe agregar todos los importes en un único total mediante `reduce` y comunicar ese total al operador por consola.',
					requisitos: [
						'Utilice el array `precios` de la plantilla.',
						'Aplique `reduce` con valor inicial `0` para acumular la suma.',
						'Escriba en consola el total obtenido con `console.log`.'
					],
					salidaEsperada: '60',
					seccionRef: 'Total del carrito (reduce)',
					notas: 'Véase la sección «reduce»: acumulador y valor inicial `0`.'
				},
				['reduce suma', 'Resultado 60'],
				`// Día 6 — Suma de precios\nconst precios = [10, 20, 30];\n\n`
			),
			ej(
				2,
				'¿Hay algún menor de edad?',
				{
					planteamiento:
						'Se dispone de un array de edades. Se debe determinar si al menos una persona es menor de dieciocho años y mostrar un booleano que resuma esa comprobación.',
					requisitos: [
						'Utilice el array `edades` de la plantilla.',
						'Aplique `some` con la condición `edad < 18`.',
						'Escriba en consola el booleano resultante con `console.log`.'
					],
					salidaEsperada: 'true',
					seccionRef: '¿Hay agotados? (some)',
					notas: 'Véase la sección «some y every»: `some` con condición y `console.log`.'
				},
				['some con condición < 18'],
				`// Día 6 — Menor de edad\nconst edades = [22, 17, 31];\n\n`
			),
			ej(
				3,
				'Ordenar de menor a mayor',
				{
					planteamiento:
						'Se dispone de un array de enteros desordenados. El programa debe reordenarlos de menor a mayor empleando un comparador numérico en `sort` y mostrar la lista resultante.',
					requisitos: [
						'Utilice el array `nums` de la plantilla.',
						'Ordene con `sort((a, b) => a - b)` o lógica equivalente.',
						'Escriba en consola el array ordenado con `console.log`.'
					],
					salidaEsperada: '[1, 2, 10, 21]',
					seccionRef: 'Ordenar por precio (sort)',
					notas: 'Véase la sección «sort»: comparador `(a, b) => a - b`.'
				},
				['sort numérico o lógica que ordene'],
				`// Día 6 — Orden ascendente\nconst nums = [10, 1, 21, 2];\n\n`
			)
		]
	},
	{
		dia: 7,
		semana: 1,
		tipo: 'examen',
		repasoVisual: 'repaso-s1',
		titulo: 'Repaso Semana 1: fundamentos JavaScript',
		objetivo: 'Demostrar variables, condicionales, funciones y métodos de array.',
		instrucciones: `Cinco retos sobre la semana 1. La IA evalúa el efecto del código, no la sintaxis perfecta. Puedes usar el podcast de repaso (NotebookLM) con los días 1–6.`,
		ejercicios: [
			ej(
				1,
				'Mensaje de envío',
				{
					planteamiento:
						'Se dispone del nombre del destinatario y de su ciudad de destino. Se solicita construir un mensaje de envío que incorpore ambos datos mediante variables y mostrarlo en consola.',
					requisitos: [
						'Utilice las variables `nombre` y `ciudad` de la plantilla (Moisés, Alcoy).',
						'Construya el mensaje con template literals o concatenación, incluyendo nombre y ciudad.',
						'Escriba en consola el texto final con `console.log`.'
					],
					salidaEsperada: 'Envío para Moisés hacia Alcoy',
					seccionRef: 'Repaso semana 1',
					notas: 'Repaso de los días 1–6 (variables, operadores, condicionales, funciones, arrays).'
				},
				['Dos datos', 'Texto final los incluye'],
				`// Día 7 — Mensaje de envío\nconst nombre = 'Moisés';\nconst ciudad = 'Alcoy';\n\n`
			),
			ej(
				2,
				'Alerta de stock',
				{
					planteamiento:
						'El nivel de stock de un producto determina la acción logística a comunicar. Si las unidades disponibles son inferiores a cinco, debe indicarse reposición; en caso contrario, estado correcto.',
					requisitos: [
						'Utilice la variable `stock` de la plantilla (valor 3).',
						'Implemente una rama: si `stock < 5`, imprima «reponer»; si no, «ok».',
						'Escriba en consola la etiqueta resultante con `console.log`.'
					],
					salidaEsperada: 'reponer',
					seccionRef: 'Repaso semana 1',
					notas: 'Repaso de los días 1–6 (variables, operadores, condicionales, funciones, arrays).'
				},
				['Condición con stock', 'Dos salidas'],
				`// Día 7 — Alerta de stock\nconst stock = 3;\n\n`
			),
			ej(
				3,
				'Duplicar con map',
				{
					planteamiento:
						'Se dispone de un array de enteros. Cada elemento debe transformarse al doble de su valor mediante `map`, generando un nuevo array que se mostrará en consola.',
					requisitos: [
						'Utilice el array `nums` de la plantilla `[1, 2, 3]`.',
						'Aplique `map` para devolver cada elemento multiplicado por 2.',
						'Escriba en consola el array resultante con `console.log`.'
					],
					salidaEsperada: '[2, 4, 6]',
					seccionRef: 'Repaso semana 1',
					notas: 'Repaso de los días 1–6 (variables, operadores, condicionales, funciones, arrays).'
				},
				['map duplica'],
				`// Día 7 — Duplicar con map\nconst nums = [1, 2, 3];\n\n`
			),
			ej(
				4,
				'Suma con reduce',
				{
					planteamiento:
						'Se dispone de una lista de valores numéricos. El programa debe calcular su suma total empleando `reduce` y exponer el resultado en consola.',
					requisitos: [
						'Utilice el array `v` de la plantilla `[5, 10, 15]`.',
						'Aplique `reduce` con valor inicial `0` para acumular la suma.',
						'Escriba en consola el total con `console.log`.'
					],
					salidaEsperada: '30',
					seccionRef: 'Repaso semana 1',
					notas: 'Repaso de los días 1–6 (variables, operadores, condicionales, funciones, arrays).'
				},
				['reduce suma'],
				`// Día 7 — Suma con reduce\nconst v = [5, 10, 15];\n\n`
			),
			ej(
				5,
				'Área del rectángulo',
				{
					planteamiento:
						'Se requiere una función que calcule el área de un rectángulo a partir de base y altura. Tras implementarla, debe invocarse con dimensiones concretas y mostrarse el área en consola.',
					requisitos: [
						'Complete `areaRect(b, h)` para que devuelva `b * h` con `return`.',
						'Invoque `areaRect(4, 5)` y utilice su valor de retorno.',
						'Escriba en consola el área obtenida con `console.log`.'
					],
					salidaEsperada: '20',
					seccionRef: 'Repaso semana 1',
					notas: 'Repaso de los días 1–6 (variables, operadores, condicionales, funciones, arrays).'
				},
				['Función área', 'Resultado 20'],
				`// Día 7 — Área del rectángulo\nfunction areaRect(b, h) {\n}\n\n`
			)
		]
	}
];
