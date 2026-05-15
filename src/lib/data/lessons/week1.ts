import type { Leccion } from '$lib/types/lesson';
import { sec, ej } from './_helpers';

export const week1: Leccion[] = [
  {
    dia: 1,
    semana: 1,
    tipo: 'leccion',
    titulo: 'Variables: guardar y mostrar datos',
    objetivo: 'Entender variables, const/let, tipos básicos y console.log.',
    contenido: {
      intro: `En JavaScript guardas datos en **variables** con nombres legibles. Hoy trabajas con \`const\`, \`let\`, tipos \`string\`, \`number\` y \`boolean\`, y compruebas resultados con \`console.log\` y template strings.`,
      secciones: [
        sec(
          'const y let',
          'Como una etiqueta fija y otra bandeja que rellenas cada día.',
          'Separar lo que no cambia de lo que sí cambia evita errores al actualizar estado.',
          'Una **variable** es un nombre que apunta a un valor. \`const\` declara un enlace que no reasignas; \`let\` permite cambiar el valor después. Lee y escribe siempre usando el nombre: \`cajas = 5\` actualiza el contenido de la variable \`cajas\`.',
          `const nombre = 'Ana';\nlet cajas = 0;\ncajas = 5;`
        ),
        sec(
          'Tipos primitivos',
          'Texto, número y sí/no son las tres formas básicas de anotar un dato.',
          'Elegir el tipo correcto ayuda a la IA, al tutor y a ti a saber qué operaciones tiene sentido hacer.',
          'JavaScript infiere el tipo al asignar. **string** = texto entre comillas; **number** = números (enteros o decimales); **boolean** = \`true\` o \`false\`. Mezclar tipos sin querer (sumar texto y número) da resultados raros: piensa qué guardas en cada variable.',
          `const cliente = 'Luis';\nconst piezas = 12;\nconst entregado = false;`
        ),
        sec(
          'console.log',
          'La ventanilla del desarrollador para ver qué hay dentro.',
          'Depurar y validar valores antes de pintarlos en la interfaz.',
          '\`console.log(valor)\` imprime en la consola del navegador o del entorno Node. Sirve para comprobar variables, resultados de operaciones y mensajes intermedios. En DevDays la corrección IA lee tu código; la consola sigue siendo la herramienta clásica de depuración.',
          `console.log('Hola');\nconsole.log(2 + 2);`
        ),
        sec(
          'Template strings',
          'Una frase con huecos que se rellenan solos.',
          'Construir mensajes dinámicos sin concatenar muchas veces con \`+\`.',
          'Los **template strings** usan backticks (\`) y \`\${expresion}\` para insertar variables o expresiones dentro del texto. Equivalente a concatenar, pero más legible: \`Hola \${nombre}\`.',
          'const n = "Ana";\nconst msg = `Hola ${n}`;'
        )
      ],
      resumen: [
        'Variable = nombre → valor en memoria.',
        'const = no reasignar; let = valor modificable.',
        'string, number, boolean = tipos básicos.',
        'console.log = ver salida al desarrollar.',
        'Template string = texto con ${...} interpolado.'
      ]
    },
    ejercicios: [
      ej(
        1,
        'El almacén recibe a un nuevo trabajador.',
        'Guarda tu nombre y tu edad. Muestra un saludo que incluya ambos.',
        ['Hay un mensaje con nombre y edad', 'Se muestra con console.log o equivalente'],
        ['Existe variable con nombre', 'Existe variable con edad', 'La salida menciona ambos datos'],
        `// Día 1 — Trabajador nuevo\n// Guarda nombre y edad, luego muestra saludo\n\n`
      ),
      ej(
        2,
        'Cuentas cajas en la estantería del día.',
        'Empieza en 0, suma 5, muestra el total.',
        ['El total mostrado es 5'],
        ['Hay contador que empieza en 0', 'Se suma 5', 'Se imprime 5'],
        `// Día 1 — Contador de cajas\nlet cajas = 0;\n\n`
      ),
      ej(
        3,
        'Etiqueta de producto en la tienda.',
        'Precio 19.99 y producto "camiseta". Muestra frase tipo "La camiseta cuesta 19.99 euros".',
        ['La frase incluye producto y precio', 'Se muestra el texto final'],
        ['Hay precio y nombre de producto', 'El mensaje final los menciona'],
        `// Día 1 — Etiqueta\nconst precio = 19.99;\nconst producto = 'camiseta';\n\n`
      )
    ]
  },
  {
    dia: 2,
    semana: 1,
    tipo: 'leccion',
    titulo: 'Operadores y comparaciones',
    objetivo: 'Usar operadores aritméticos, ===, &&, || y valores truthy/falsy.',
    contenido: {
      intro: `JavaScript evalúa **expresiones** que devuelven valores. Hoy operas con números (+, -, *, /, %), comparas con \`===\` y combinas condiciones con \`&&\` y \`||\`.`,
      secciones: [
        sec(
          'Operadores aritméticos',
          'Sumar y repartir unidades, como en una hoja de cálculo.',
          'Calcular totales, medias y restos en lógica de negocio.',
          'Los operadores **+**, **-**, **\***, **/** hacen aritmética habitual. El **módulo** \`%\` devuelve el resto de una división entera: \`10 % 3\` es \`1\`. Útil para pares/impares, ciclos y límites.',
          'console.log(10 + 5);\nconsole.log(10 % 3);'
        ),
        sec(
          'Comparación estricta ===',
          'Pregunta si dos valores son exactamente iguales, tipo incluido.',
          'Evitar comparaciones ambiguas en condiciones y filtros.',
          '\`===\` compara **valor y tipo** y devuelve \`true\` o \`false\`. \`5 === 5\` es true; \`5 === "5"\` es false. Prefiere \`===\` frente a \`==\`, que convierte tipos y sorprende.',
          'console.log(5 === 5);\nconsole.log(5 === "5"); // false'
        ),
        sec(
          'Lógicos y truthy/falsy',
          'Combinar varias preguntas sí/no en una sola decisión.',
          'Modelar reglas: “puede enviar si pagó Y hay stock”.',
          '\`&&\` exige que ambas partes sean verdaderas; \`||\` basta con una. En condiciones, valores **falsy** (\`0\`, \`""\`, \`null\`, \`undefined\`, \`false\`, \`NaN\`) se tratan como “no”; el resto es **truthy**.',
          'const hayStock = cantidad > 0;\nconst puedeEnviar = pagado && hayStock;'
        )
      ],
      resumen: [
        'Operadores = expresiones numéricas.',
        '=== = igualdad estricta (boolean).',
        '&& y || = combinar condiciones.',
        'Truthy/falsy = qué cuenta como “no” en un if.'
      ]
    },
    ejercicios: [
      ej(
        1,
        'Comparas dos precios de proveedor.',
        'Dos precios: quedarte con el mayor y mostrarlo.',
        ['Se muestra el precio mayor'],
        ['Hay dos precios', 'Se elige el mayor', 'Se imprime un número'],
        `const a = 12;\nconst b = 9;\n\n`
      ),
      ej(
        2,
        '¿Puedo enviar el pedido?',
        'Cliente pagó (true) y hay stock (número > 0). Muestra si puede enviarse.',
        ['Se muestra true o false según lógica'],
        ['Combina pago y stock', 'Resultado booleano visible'],
        `const pagado = true;\nconst stock = 3;\n\n`
      ),
      ej(
        3,
        'Caja vacía o llena.',
        'Variable texto vacía. Muestra si “hay contenido” (true si no está vacía).',
        ['true si hay texto, false si vacío'],
        ['Comprueba si hay contenido', 'Imprime booleano'],
        `const nota = '';\n\n`
      )
    ]
  },
  {
    dia: 3,
    semana: 1,
    tipo: 'leccion',
    titulo: 'Condicionales: if, else, ternario, switch',
    objetivo: 'Ramificar el flujo del programa según condiciones.',
    contenido: {
      intro: `El **control de flujo** decide qué bloque de código se ejecuta. Usarás \`if\` / \`else\`, el **operador ternario** y \`switch\` para ramas múltiples con el mismo valor.`,
      secciones: [
        sec(
          'if / else',
          'Una bifurcación: o entras por la rama A o por la B.',
          'Mostrar mensajes distintos, aplicar reglas de negocio, validar datos.',
          'La forma \`if (condicion) { ... } else { ... }\` ejecuta el primer bloque solo si la condición es truthy. **else if** encadena más preguntas. Las llaves delimitan el bloque; con una sola línea a veces se omiten, pero en aprendizaje conviene usarlas.',
          'if (edad >= 18) {\n  console.log("adulto");\n} else {\n  console.log("menor");\n}'
        ),
        sec(
          'Operador ternario',
          'Elegir entre dos expresiones en una línea.',
          'Asignar etiquetas cortas según estado.',
          'Sintaxis: \`condicion ? valorSiTrue : valorSiFalse\`. Devuelve un valor (no es un “mini-if” con varias líneas). Útil para textos o flags simples; para lógica larga usa \`if\`.',
          'const tipo = esVip ? "oro" : "normal";'
        ),
        sec(
          'switch',
          'Varias etiquetas con el mismo nombre de variable.',
          'Menús, estados de pedido, días de la semana.',
          '\`switch (expresion)\` compara con \`case\` y ejecuta el bloque que coincida; \`break\` evita “caer” al siguiente case. \`default\` es la rama si nada coincide. Ideal cuando comparas contra muchos valores concretos del mismo tipo.',
          'switch (dia) {\n  case "lunes": ...\n  default: ...\n}'
        )
      ],
      resumen: [
        'if/else = ramas según condición.',
        'Ternario = elección entre dos valores.',
        'switch = muchos casos sobre una variable.',
        'break/default en switch evitan errores.'
      ]
    },
    ejercicios: [
      ej(
        1,
        'Tarifa según edad.',
        'Si edad >= 18 muestra "adulto", si no "menor".',
        ['Muestra uno de los dos textos correcto'],
        ['Usa condición con edad', 'Salida coherente con 18+'],
        `const edad = 20;\n\n`
      ),
      ej(
        2,
        'Descuento VIP.',
        'Variable esVip. Mensaje "descuento" o "precio normal" (ternario o if).',
        ['Mensaje según VIP'],
        ['Depende de esVip', 'Dos resultados posibles'],
        `const esVip = true;\n\n`
      ),
      ej(
        3,
        'Día de la semana.',
        'Variable dia con "lunes" o "martes". switch o if que imprima rutina distinta.',
        ['Salida distinta según dia'],
        ['Ramifica por dia', 'Imprime texto'],
        `const dia = 'lunes';\n\n`
      )
    ]
  },
  {
    dia: 4,
    semana: 1,
    tipo: 'leccion',
    titulo: 'Funciones: declaración, flecha y parámetros',
    objetivo: 'Encapsular lógica reutilizable con parámetros y return.',
    contenido: {
      intro: `Una **función** agrupa pasos con nombre. Declararás funciones clásicas y **arrow functions**, pasarás **parámetros** y devolverás valores con \`return\`.`,
      secciones: [
        sec(
          'function declaración',
          'Un procedimiento con nombre al que llamas cuando lo necesitas.',
          'No repetir el mismo cálculo en muchos sitios del código.',
          '\`function nombre(param) { return valor; }\` crea una función **hoisted** (usable antes en el archivo en scripts clásicos). \`return\` termina la función y entrega el resultado; sin \`return\` obtienes \`undefined\`.',
          'function duplicar(x) { return x * 2; }'
        ),
        sec(
          'Arrow function',
          'La misma idea con sintaxis más compacta.',
          'Callbacks en arrays y código moderno (Svelte, APIs).',
          '\`const fn = (x) => x * 2\` es una **arrow function**. Si el cuerpo es una expresión, puedes omitir llaves y \`return\`. Con varias líneas usa llaves y \`return\` explícito.',
          'const duplicar = (x) => x * 2;\nconst sumar = (a, b) => a + b;'
        ),
        sec(
          'Parámetros por defecto',
          'Valor de respaldo si no pasan argumento.',
          'APIs flexibles y menos comprobaciones repetidas.',
          'En la firma: \`function saludar(nombre = "invitado")\`. Si llamas \`saludar()\`, \`nombre\` vale \`"invitado"\`. Los parámetros por defecto se evalúan en cada llamada.',
          'function saludar(nombre = "invitado") { ... }'
        )
      ],
      resumen: [
        'Función = bloque reutilizable con nombre.',
        'return = valor de salida.',
        'Arrow = sintaxis corta => .',
        'Parámetros por defecto = argumentos opcionales.'
      ]
    },
    ejercicios: [
      ej(
        1,
        'Máquina que duplica.',
        'Función que recibe número y devuelve el doble. Pruébala con 4 y muestra resultado.',
        ['Se muestra 8'],
        ['Hay función que duplica', 'Se usa y se imprime resultado'],
        `function duplicar(n) {\n  // return ...\n}\n\n`
      ),
      ej(
        2,
        'Sumar dos medidas.',
        'Función sumar(a,b) flecha o clásica. Muestra sumar(3,7).',
        ['Muestra 10'],
        ['Función suma dos valores', 'Salida 10'],
        `const sumar = (a, b) => {\n};\n\n`
      ),
      ej(
        3,
        'Saludo con nombre por defecto.',
        'Función saludar(nombre) si no pasan nombre usa "invitado".',
        ['Saludo con invitado si falta nombre'],
        ['Valor por defecto', 'Devuelve o imprime saludo'],
        `function saludar(nombre = 'invitado') {\n}\n\n`
      )
    ]
  },
  {
    dia: 5,
    semana: 1,
    tipo: 'leccion',
    titulo: 'Arrays: map, filter y find',
    objetivo: 'Transformar y consultar listas sin bucles manuales largos.',
    contenido: {
      intro: `Un **array** es una lista ordenada de valores. Aprenderás \`map\` (transformar todos), \`filter\` (quedarte con algunos) y \`find\` (primer elemento que cumple).`,
      secciones: [
        sec(
          'map',
          'Aplicas la misma operación a cada elemento y obtienes una lista nueva.',
          'Convertir formatos, calcular precios con IVA, derivar datos para la UI.',
          '\`array.map((elemento) => nuevoValor)\` recorre el array y devuelve **otro array de la misma longitud**. No muta el original. El callback recibe el elemento (y opcionalmente índice y array).',
          'const mm = cm.map((x) => x * 10);'
        ),
        sec(
          'filter',
          'Te quedas solo con los elementos que pasan una prueba.',
          'Listas de productos activos, tareas completadas, usuarios mayores de edad.',
          '\`array.filter((el) => condicion)\` devuelve un subarray con los elementos donde la condición es true. Longitud ≤ la original.',
          'const buenas = tablas.filter((t) => !t.rota);'
        ),
        sec(
          'find',
          'Buscas el primero que coincide y paras.',
          'Obtener un registro por id sin recorrer manualmente.',
          '\`array.find((el) => condicion)\` devuelve el **primer** match o \`undefined\` si no hay ninguno. A diferencia de \`filter\`, no devuelve array.',
          'const pedido = lista.find((p) => p.id === 4521);'
        )
      ],
      resumen: [
        'map = nuevo array, misma longitud.',
        'filter = subarray que cumple condición.',
        'find = un elemento o undefined.',
        'Callbacks = función por elemento.'
      ]
    },
    ejercicios: [
      ej(
        1,
        'Minutos a segundos.',
        'Lista de minutos por capítulo → lista en segundos (×60). Muestra resultado.',
        ['Array de segundos correcto'],
        ['Usa map', 'Multiplica por 60', 'Muestra array'],
        `const minutos = [25, 40, 15];\n\n`
      ),
      ej(
        2,
        'Nombres largos.',
        'Lista de nombres de mascotas: quedarte solo con más de 4 letras.',
        ['Solo nombres largos'],
        ['Usa filter', 'Condición longitud > 4'],
        `const mascotas = ['gato', 'perro', 'elefante', 'pez'];\n\n`
      ),
      ej(
        3,
        'Buscar usuario.',
        'Array de {id,nombre}: find id 2 y muestra solo el nombre.',
        ['Muestra nombre del id 2'],
        ['find por id', 'Imprime nombre'],
        `const usuarios = [{ id: 1, nombre: 'Ana' }, { id: 2, nombre: 'Luis' }];\n\n`
      )
    ]
  },
  {
    dia: 6,
    semana: 1,
    tipo: 'leccion',
    titulo: 'Arrays: reduce, some, every y sort',
    objetivo: 'Agregar valores, comprobar condiciones globales y ordenar listas.',
    contenido: {
      intro: `Sigues con métodos de array: **reduce** (un solo resultado), **some** / **every** (preguntas sobre toda la lista) y **sort** (ordenar, con cuidado en números).`,
      secciones: [
        sec(
          'reduce',
          'Recorres la lista y acumulas un único resultado.',
          'Sumar precios, contar votos, agrupar en un objeto.',
          '\`array.reduce((acumulador, elemento) => nuevoAcum, valorInicial)\` reduce la lista a un valor (número, string, objeto…). El acumulador guarda el estado entre pasos; el valor inicial evita sorpresas con arrays vacíos.',
          'const total = precios.reduce((acc, p) => acc + p, 0);'
        ),
        sec(
          'some y every',
          'Una pregunta sobre “¿alguno?” o “¿todos?”.',
          'Validar formularios, permisos, listas de edades.',
          '\`some\` devuelve true si **al menos un** elemento cumple la condición. \`every\` exige que **todos** la cumplan. Ambos devuelven boolean y dejan de iterar en cuanto pueden (some) o si falla uno (every).',
          'edades.some((e) => e < 18);\nedades.every((e) => e >= 18);'
        ),
        sec(
          'sort',
          'Reordenar elementos in-place.',
          'Tablas, rankings, prioridades.',
          '\`array.sort()\` sin argumentos ordena como **strings** (10 antes que 2). Para números usa comparador: \`(a, b) => a - b\` (ascendente). \`sort\` muta el array original; si necesitas preservarlo, copia antes con spread o \`toSorted\` donde exista.',
          'nums.sort((a, b) => a - b);'
        )
      ],
      resumen: [
        'reduce = un valor a partir de la lista.',
        'some = ∃ cumple; every = ∀ cumplen.',
        'sort muta; comparador numérico (a,b)=>a-b.',
        'Valor inicial en reduce = buena práctica.'
      ]
    },
    ejercicios: [
      ej(
        1,
        'Total del albarán.',
        'Precios [10,20,30] → suma total con reduce y muéstrala.',
        ['Muestra 60'],
        ['reduce suma', 'Resultado 60'],
        `const precios = [10, 20, 30];\n\n`
      ),
      ej(
        2,
        '¿Hay menores?',
        'Edades: ¿alguna menor de 18? Muestra true/false.',
        ['true si hay menor'],
        ['some con condición < 18'],
        `const edades = [22, 17, 31];\n\n`
      ),
      ej(
        3,
        'Ordenar números.',
        'Ordena [10,1,21,2] de menor a mayor y muéstralo.',
        ['[1,2,10,21] u orden equivalente'],
        ['sort numérico o lógica que ordene'],
        `const nums = [10, 1, 21, 2];\n\n`
      )
    ]
  },
  {
    dia: 7,
    semana: 1,
    tipo: 'examen',
    titulo: 'Repaso Semana 1: fundamentos JavaScript',
    objetivo: 'Demostrar variables, condicionales, funciones y métodos de array.',
    instrucciones: `Cinco retos sobre la semana 1. La IA evalúa el efecto del código, no la sintaxis perfecta. Puedes usar el podcast de repaso (NotebookLM) con los días 1–6.`,
    ejercicios: [
      ej(1, 'Etiqueta de envío.', 'Nombre y ciudad en mensaje de envío.', ['Mensaje con nombre y ciudad'], ['Dos datos', 'Texto final los incluye'], `const nombre = 'Moisés';\nconst ciudad = 'Alcoy';\n\n`),
      ej(2, 'Stock mínimo.', 'Si stock < 5 muestra "reponer", si no "ok".', ['Texto según stock'], ['Condición con stock', 'Dos salidas'], `const stock = 3;\n\n`),
      ej(3, 'Doble lista.', 'map para duplicar [1,2,3].', ['[2,4,6]'], ['map duplica'], `const nums = [1, 2, 3];\n\n`),
      ej(4, 'Suma total.', 'reduce para sumar [5,10,15].', ['30'], ['reduce suma'], `const v = [5, 10, 15];\n\n`),
      ej(5, 'Herramienta área.', 'Función areaRect(base,altura) devuelve base*altura; prueba 4 y 5.', ['20'], ['Función área', 'Resultado 20'], `function areaRect(b, h) {\n}\n\n`)
    ]
  }
];
