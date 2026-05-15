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
          'Meter variables dentro de un texto',
          'Una frase con huecos: donde pone ${nombre} se rellena solo con el valor guardado.',
          'Para el ejercicio del saludo (y casi todos los mensajes en apps) necesitas esto: no escribir "Ana" otra vez a mano en la frase si ya está en una variable.',
          'Pasos: (1) Guardas los datos en variables, por ejemplo \`const nombre = "Ana"\` y \`const edad = 30\`. (2) Creas el mensaje con **backticks** (tecla al lado del 1, no uses comillas simples ni dobles): \`const saludo = `Hola, soy ${nombre} y tengo ${edad} años`\`. (3) Dentro de los backticks, cada variable va entre \`${ }\` — escribe el nombre de la variable tal cual: \`${nombre}\`, \`${edad}\`. JavaScript sustituye el hueco por el valor. También vale unir con \`+\` (\`"Hola " + nombre\`), pero en este curso usaremos sobre todo backticks.',
          `const nombre = 'Ana';\nconst edad = 30;\nconst saludo = \`Hola, soy \${nombre} y tengo \${edad} años\`;\nconsole.log(saludo);`
        ),
        sec(
          'console.log',
          'La ventanilla donde ves el resultado al probar el código.',
          'Comprobar que el saludo (u otro mensaje) sale bien antes de seguir.',
          'Cuando ya tienes el texto en una variable (por ejemplo \`saludo\`), lo muestras con \`console.log(saludo)\`. También puedes hacer \`console.log(`Hola ${nombre}`)\` en una sola línea. En DevDays la IA lee tu código; \`console.log\` es la forma clásica de ver qué está pasando.',
          `console.log('Hola');\nconsole.log(2 + 2);`
        )
      ],
      resumen: [
        'Variable = nombre → valor en memoria.',
        'const = no reasignar; let = valor modificable.',
        'string, number, boolean = tipos básicos.',
        'console.log = ver salida al desarrollar.',
        'Backticks + ${variable} = meter variables en un texto.',
        'console.log = mostrar el resultado.'
      ]
    },
    ejercicios: [
      ej(
        1,
        'Saludo con nombre y edad',
        {
          planteamiento:
            'Se desea elaborar un mensaje de presentación que incorpore el nombre y la edad del operador mediante variables, sin repetir esos datos de forma literal en la cadena final. El resultado debe comprobarse en consola antes de continuar.',
          requisitos: [
            'Declare las variables `nombre` y `edad` con `const`, asignando valores propios de texto y número.',
            'Construya el saludo con template literals (backticks), interpolando `${nombre}` y `${edad}`.',
            'Escriba en consola el mensaje resultante con `console.log`.'
          ],
          salidaEsperada: 'Hola, soy Tu nombre y tengo 25 años',
          notas: 'Consulte la sección «Meter variables dentro de un texto».'
        },
        [
          'Existe variable con nombre',
          'Existe variable con edad',
          'El saludo usa los valores de las variables (backticks con ${...} o concatenación con +), no el texto fijo escrito a mano',
          'La salida menciona ambos datos'
        ],
        `// Día 1 — Saludo\nconst nombre = 'Tu nombre';\nconst edad = 25;\n// saludo con backticks: \`Hola, soy \${nombre} y tengo \${edad} años\`\n\n`
      ),
      ej(
        2,
        'Contador desde cero',
        {
          planteamiento:
            'Se desea representar un contador que comienza en cero y recibe un incremento fijo de cinco unidades en el mismo proceso, mostrando después el resultado al operador.',
          requisitos: [
            'Declare la variable `cajas` con `let`, inicializada en 0.',
            'Incremente `cajas` en 5 unidades.',
            'Escriba en consola el valor final de `cajas` con `console.log`.'
          ],
          salidaEsperada: '5'
        },
        ['Hay contador que empieza en 0', 'Se suma 5', 'Se imprime 5'],
        `// Día 1 — Contador desde cero\nlet cajas = 0;\n\n`
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
          salidaEsperada: 'La camiseta cuesta 19.99 euros'
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
        'El precio más alto',
        {
          planteamiento:
            'Se comparan dos importes numéricos representando precios alternativos. El programa debe determinar cuál es el mayor y comunicar ese valor al operador por consola.',
          requisitos: [
            'Utilice las variables `a` y `b` ya definidas en la plantilla.',
            'Calcule o seleccione el precio mayor mediante operadores o condicionales.',
            'Escriba en consola el valor numérico resultante con `console.log`.'
          ],
          salidaEsperada: '12'
        },
        ['Hay dos precios', 'Se elige el mayor', 'Se imprime un número'],
        `// Día 2 — Precio más alto\nconst a = 12;\nconst b = 9;\n\n`
      ),
      ej(
        2,
        '¿Se puede enviar el pedido?',
        {
          planteamiento:
            'Un pedido solo puede enviarse si el cliente ha pagado y existe stock disponible (cantidad estrictamente mayor que cero). Se deben evaluar ambas condiciones y exponer el resultado booleano en consola.',
          requisitos: [
            'Utilice las variables `pagado` y `stock` de la plantilla.',
            'Combine ambas condiciones con operadores lógicos (`&&` u equivalente).',
            'Escriba en consola el valor booleano que indique si el envío es posible.'
          ],
          salidaEsperada: 'true'
        },
        ['Combina pago y stock', 'Resultado booleano visible'],
        `// Día 2 — Envío del pedido\nconst pagado = true;\nconst stock = 3;\n\n`
      ),
      ej(
        3,
        '¿Hay texto en la nota?',
        {
          planteamiento:
            'Se dispone de una cadena que representa una nota interna, posiblemente vacía. Se requiere comprobar si contiene texto útil y mostrar un booleano que indique si hay contenido.',
          requisitos: [
            'Utilice la variable `nota` de la plantilla.',
            'Evalúe si la cadena tiene contenido (no está vacía) y obtenga un booleano.',
            'Escriba en consola ese resultado con `console.log`.'
          ],
          salidaEsperada: 'false'
        },
        ['Comprueba si hay contenido', 'Imprime booleano'],
        `// Día 2 — Nota vacía\nconst nota = '';\n\n`
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
        'Adulto o menor',
        {
          planteamiento:
            'Se dispone de la edad de una persona en años. El programa debe clasificarla como «adulto» o «menor» según el umbral legal de dieciocho años e imprimir la etiqueta correspondiente.',
          requisitos: [
            'Utilice la variable `edad` de la plantilla (valor 20).',
            'Implemente una rama condicional: si `edad >= 18`, asigne el texto «adulto»; en caso contrario, «menor».',
            'Escriba en consola la etiqueta resultante con `console.log`.'
          ],
          salidaEsperada: 'adulto'
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
            'Asigne el texto «descuento» si es VIP, o «precio normal» en caso contrario (ternario o `if`).',
            'Escriba en consola el mensaje elegido con `console.log`.'
          ],
          salidaEsperada: 'descuento'
        },
        ['Depende de esVip', 'Dos resultados posibles'],
        `// Día 3 — Tarifa VIP\nconst esVip = true;\n\n`
      ),
      ej(
        3,
        'Rutina según el día',
        {
          planteamiento:
            'Se conoce el día de la semana en forma de cadena. El programa debe seleccionar e imprimir una rutina distinta según ese valor, empleando `switch` o una cadena de `if`.',
          requisitos: [
            'Utilice la variable `dia` de la plantilla (`\'lunes\'`).',
            'Defina al menos dos ramas con mensajes de rutina diferentes según el día.',
            'Escriba en consola la rutina correspondiente al valor de `dia`.'
          ],
          salidaEsperada: 'Rutina de lunes (texto distinto según el día elegido en código)'
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
        'Función duplicar',
        {
          planteamiento:
            'Se requiere encapsular el cálculo del doble de un número en una función reutilizable. Tras completar su implementación, debe invocarse con un argumento concreto y mostrarse el resultado en consola.',
          requisitos: [
            'Complete la función `duplicar(n)` para que devuelva el doble de `n` con `return`.',
            'Invoque `duplicar` pasando el argumento `4`.',
            'Escriba en consola el valor devuelto con `console.log`.'
          ],
          salidaEsperada: '8'
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
          salidaEsperada: '10'
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
            'Complete `saludar(nombre = \'invitado\')` para devolver o imprimir un saludo que incluya `nombre`.',
            'Invoque `saludar()` sin argumentos.',
            'Escriba en consola el saludo generado (debe mencionar «invitado»).'
          ],
          salidaEsperada: 'Hola, invitado'
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
        'Minutos a segundos',
        {
          planteamiento:
            'Se dispone de una lista de duraciones en minutos correspondientes a varios capítulos. Se solicita transformar cada elemento a segundos (multiplicación por 60) sin modificar el array original y mostrar el nuevo array.',
          requisitos: [
            'Utilice el array `minutos` de la plantilla.',
            'Aplique `map` para obtener un array de segundos (cada valor × 60).',
            'Escriba en consola el array resultante con `console.log`.'
          ],
          salidaEsperada: '[1500, 2400, 900]'
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
          salidaEsperada: "['perro', 'elefante']"
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
          salidaEsperada: 'Luis'
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
        'Suma de precios',
        {
          planteamiento:
            'Se dispone de una lista de precios unitarios. El programa debe agregar todos los importes en un único total mediante `reduce` y comunicar ese total al operador por consola.',
          requisitos: [
            'Utilice el array `precios` de la plantilla.',
            'Aplique `reduce` con valor inicial `0` para acumular la suma.',
            'Escriba en consola el total obtenido con `console.log`.'
          ],
          salidaEsperada: '60'
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
          salidaEsperada: 'true'
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
          salidaEsperada: '[1, 2, 10, 21]'
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
          salidaEsperada: 'Envío para Moisés hacia Alcoy'
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
          salidaEsperada: 'reponer'
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
          salidaEsperada: '[2, 4, 6]'
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
          salidaEsperada: '30'
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
          salidaEsperada: '20'
        },
        ['Función área', 'Resultado 20'],
        `// Día 7 — Área del rectángulo\nfunction areaRect(b, h) {\n}\n\n`
      )
    ]
  }
];
