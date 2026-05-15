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
          'Variables con let y console.log',
          'Como una bandeja que rellenas cada día y una ventanilla para ver el resultado.',
          'Actualizar contadores y comprobar valores antes de seguir.',
          'Use `const nombre = "Ana"` para datos que no cambian y `let cajas = 0` para contadores que actualiza. Con `cajas = cajas + 5` o `cajas += 5` suma al valor actual. **console.log(valor)** muestra el resultado en consola.',
          `const nombre = 'Ana';\nlet cajas = 0;\ncajas = cajas + 5;\nconsole.log(cajas); // 5`,
          [
            'Declare `let cajas = 0`.',
            'Sume 5 con `cajas = cajas + 5` o `cajas += 5`.',
            'Muestre el resultado con `console.log(cajas)`.'
          ]
        ),
        sec(
          'Template strings',
          'Una frase con huecos que se rellenan con el valor de cada variable.',
          'Mensajes personalizados sin repetir datos a mano.',
          'Use **backticks** y \`${variable}\` dentro del texto: \`const saludo = \\`Hola, soy ${nombre}\\`;\`. Luego \`console.log(saludo)\`.',
          `const nombre = 'Ana';\nconst edad = 30;\nconst saludo = \`Hola, soy \${nombre} y tengo \${edad} años\`;\nconsole.log(saludo);`,
          [
            'Declare `nombre` (string) y `edad` (number) con `const`.',
            'Cree `saludo` con backticks e interpolación `${nombre}` y `${edad}`.',
            'Muestre `saludo` con `console.log`.'
          ]
        ),
        sec(
          'Mensaje con varias variables',
          'Combinar dos datos distintos en una sola frase legible.',
          'Etiquetas de producto, tickets, resúmenes de pedido.',
          'Guarde producto y precio por separado; construya la frase con backticks: \`La ${producto} cuesta ${precio} euros\` y muéstrela con \`console.log\`.',
          `const producto = 'camiseta';\nconst precio = 19.99;\nconst frase = \`La \${producto} cuesta \${precio} euros\`;\nconsole.log(frase);`,
          [
            'Use las variables `producto` y `precio` de la plantilla.',
            'Arme la frase con template literals.',
            'Escriba el texto final con `console.log`.'
          ]
        )
      ],
      resumen: [
        'Variable = nombre → valor en memoria.',
        'const = no reasignar; let = valor modificable.',
        'Sumar al valor actual: cajas = cajas + 5 o cajas += 5.',
        'console.log(valor) = ver resultado en consola.',
        'string, number, boolean = tipos básicos.',
        'Backticks + ${variable} = meter variables en un texto.'
      ]
    },
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
          seccionRef: 'Variables con let y console.log',
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
          seccionRef: 'Template strings',
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
          seccionRef: 'Mensaje con varias variables',
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
    objetivo: 'Usar operadores aritméticos, ===, &&, || y valores truthy/falsy.',
    contenido: {
      intro: `JavaScript evalúa **expresiones** que devuelven valores. Hoy operas con números (+, -, *, /, %), comparas con \`===\` y combinas condiciones con \`&&\` y \`||\`.`,
      secciones: [
        sec(
          'Operadores aritméticos',
          'Sumar y repartir unidades, como en una hoja de cálculo.',
          'Calcular totales, medias y restos en lógica de negocio.',
          'Los operadores **+**, **-**, **\***, **/** hacen aritmética habitual. El **módulo** \`%\` devuelve el resto: \`10 % 3\` es \`1\`. Use \`console.log\` para ver el resultado.',
          'console.log(10 + 5);\nconsole.log(10 % 3);',
          [
            'Calcule `10 + 5` y muestre el resultado.',
            'Calcule `10 % 3` y muestre el resto.',
            'Use `console.log` en cada paso.'
          ]
        ),
        sec(
          'Comparar dos valores con if',
          'Elegir el mayor de dos números con una rama condicional.',
          'Precios, puntuaciones, límites de stock.',
          'Con \`if (a > b)\` ejecuta un bloque solo si la condición es verdadera; con \`else\` cubres el caso contrario. Guarde el mayor en una variable y muéstrelo con \`console.log\`.',
          'const a = 12;\nconst b = 9;\nlet mayor;\nif (a > b) {\n  mayor = a;\n} else {\n  mayor = b;\n}\nconsole.log(mayor);',
          [
            'Compare `a` y `b` con `if (a > b)`.',
            'Asigne el valor mayor a una variable.',
            'Muestre esa variable con `console.log`.'
          ]
        ),
        sec(
          'Lógicos && y truthy/falsy',
          'Combinar condiciones y detectar cadenas vacías.',
          'Reglas de envío, formularios, validaciones simples.',
          '\`&&\` exige que ambas partes sean verdaderas. Valores **falsy** (\`""\`, \`0\`, \`false\`, etc.) cuentan como «no». \`pagado && stock > 0\` modela «puede enviar»; \`nota.length > 0\` o \`Boolean(nota)\` comprueba si hay texto.',
          'const pagado = true;\nconst stock = 3;\nconsole.log(pagado && stock > 0);\nconst nota = "";\nconsole.log(nota.length > 0);',
          [
            'Combine `pagado` y stock con `&&`.',
            'Escriba el booleano en consola.',
            'Para una cadena vacía, compruebe si hay contenido y muestre un booleano.'
          ]
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
        'Suma y resto',
        {
          planteamiento:
            'Se solicita evaluar dos expresiones aritméticas sobre enteros y mostrar cada resultado en consola.',
          requisitos: [
            'Calcule `10 + 5` y muestre el resultado con `console.log`.',
            'Calcule `10 % 3` (resto de la división) y muestre el resultado con `console.log`.'
          ],
          salidaEsperada: '15\n1',
          seccionRef: 'Operadores aritméticos',
          notas: 'Véase sección «Operadores aritméticos».'
        },
        ['Muestra suma 15', 'Muestra resto 1'],
        `// Día 2 — Suma y resto\n// console.log(10 + 5);\n// console.log(10 % 3);\n\n`
      ),
      ej(
        2,
        'El precio más alto',
        {
          planteamiento:
            'Se comparan dos importes numéricos. El programa debe determinar cuál es el mayor con `if` y mostrarlo en consola.',
          requisitos: [
            'Utilice las variables `a` y `b` de la plantilla.',
            'Con `if (a > b)` (y `else` si hace falta) asigne el mayor a una variable.',
            'Escriba en consola el valor numérico mayor con `console.log`.'
          ],
          salidaEsperada: '12',
          seccionRef: 'Comparar dos valores con if',
          notas: 'Véase sección «Comparar dos valores con if».'
        },
        ['Hay dos precios', 'Se elige el mayor con if', 'Se imprime un número'],
        `// Día 2 — Precio más alto\nconst a = 12;\nconst b = 9;\n\n`
      ),
      ej(
        3,
        '¿Se puede enviar el pedido?',
        {
          planteamiento:
            'Un pedido solo puede enviarse si el cliente ha pagado y existe stock disponible (cantidad estrictamente mayor que cero). Se deben evaluar ambas condiciones y exponer el resultado booleano en consola.',
          requisitos: [
            'Utilice las variables `pagado` y `stock` de la plantilla.',
            'Combine ambas condiciones con operadores lógicos (`&&` u equivalente).',
            'Escriba en consola el valor booleano que indique si el envío es posible.'
          ],
          salidaEsperada: 'true',
          seccionRef: 'Lógicos && y truthy/falsy',
          notas: 'Véase sección «Lógicos && y truthy/falsy».'
        },
        ['Combina pago y stock', 'Resultado booleano visible'],
        `// Día 2 — Envío del pedido\nconst pagado = true;\nconst stock = 3;\n\n`
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
          'if (edad >= 18) {\n  console.log("adulto");\n} else {\n  console.log("menor");\n}',
          [
            'Lea `edad` de la plantilla.',
            'Con `if (edad >= 18)` asigne «adulto» o «menor».',
            'Muestre la etiqueta con `console.log`.'
          ]
        ),
        sec(
          'Operador ternario',
          'Elegir entre dos expresiones en una línea.',
          'Asignar etiquetas cortas según estado.',
          'Sintaxis: \`condicion ? valorSiTrue : valorSiFalse\`. Devuelve un valor (no es un “mini-if” con varias líneas). Útil para textos o flags simples; para lógica larga usa \`if\`.',
          'const tipo = esVip ? "oro" : "normal";',
          [
            'Use la variable `esVip`.',
            'Asigne el mensaje con ternario: VIP → «descuento», si no → «precio normal».',
            'Muestre el texto con `console.log`.'
          ]
        ),
        sec(
          'switch',
          'Varias etiquetas con el mismo nombre de variable.',
          'Menús, estados de pedido, días de la semana.',
          '\`switch (expresion)\` compara con \`case\` y ejecuta el bloque que coincida; \`break\` evita “caer” al siguiente case. \`default\` es la rama si nada coincide. Ideal cuando comparas contra muchos valores concretos del mismo tipo.',
          'switch (dia) {\n  case "lunes": console.log("Rutina de lunes"); break;\n  default: console.log("Otro día");\n}',
          [
            'Use la variable `dia` de la plantilla.',
            'Defina al menos dos `case` con mensajes distintos.',
            'Imprima la rutina con `console.log` y `break`.'
          ]
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
          salidaEsperada: 'adulto',
          seccionRef: 'if / else',
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
          seccionRef: 'Operador ternario',
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
            'Utilice la variable `dia` de la plantilla (`\'lunes\'`).',
            'Defina al menos dos `case` con mensajes de rutina diferentes.',
            'Escriba en consola la rutina correspondiente con `break` en cada case.'
          ],
          salidaEsperada: 'Rutina de lunes (texto distinto según el día elegido en código)',
          seccionRef: 'switch',
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
    contenido: {
      intro: `Una **función** agrupa pasos con nombre. Declararás funciones clásicas y **arrow functions**, pasarás **parámetros** y devolverás valores con \`return\`.`,
      secciones: [
        sec(
          'function declaración',
          'Un procedimiento con nombre al que llamas cuando lo necesitas.',
          'No repetir el mismo cálculo en muchos sitios del código.',
          '`function duplicar(n) { return n * 2; }` crea una función con `return`. Invóquela y muestre el resultado: `console.log(duplicar(4))`.',
          'function duplicar(n) {\n  return n * 2;\n}\nconsole.log(duplicar(4));',
          [
            'Complete `duplicar(n)` con `return n * 2`.',
            'Invoque `duplicar(4)`.',
            'Muestre el resultado con `console.log`.'
          ]
        ),
        sec(
          'Arrow function',
          'La misma idea con sintaxis más compacta.',
          'Callbacks en arrays y código moderno (Svelte, APIs).',
          '`const sumar = (a, b) => a + b` es una arrow function. `console.log(sumar(3, 7))` muestra la suma.',
          'const sumar = (a, b) => a + b;\nconsole.log(sumar(3, 7));',
          [
            'Complete `sumar(a, b)` para devolver `a + b`.',
            'Invoque `sumar(3, 7)`.',
            'Escriba el resultado con `console.log`.'
          ]
        ),
        sec(
          'Parámetros por defecto',
          'Valor de respaldo si no pasan argumento.',
          'APIs flexibles y menos comprobaciones repetidas.',
          '`function saludar(nombre = "invitado")` usa valor por defecto si omites el argumento. `console.log(saludar())` debe mostrar un saludo con «invitado».',
          `function saludar(nombre = 'invitado') {\n  return \`Hola, \${nombre}\`;\n}\nconsole.log(saludar());`,
          [
            'Complete `saludar` con parámetro por defecto `invitado`.',
            'Invoque `saludar()` sin argumentos.',
            'Muestre el saludo con `console.log`.'
          ]
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
          salidaEsperada: '8',
          seccionRef: 'function declaración',
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
          seccionRef: 'Arrow function',
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
            'Complete `saludar(nombre = \'invitado\')` para devolver o imprimir un saludo que incluya `nombre`.',
            'Invoque `saludar()` sin argumentos.',
            'Escriba en consola el saludo generado (debe mencionar «invitado»).'
          ],
          salidaEsperada: 'Hola, invitado',
          seccionRef: 'Parámetros por defecto',
          notas: 'Véase la sección «Parámetros por defecto»: `nombre = \'invitado\'`.'
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
          '`minutos.map((m) => m * 60)` devuelve un array nuevo con cada valor transformado. `console.log(segundos)` muestra el resultado.',
          'const minutos = [25, 40, 15];\nconst segundos = minutos.map((m) => m * 60);\nconsole.log(segundos);',
          [
            'Use el array `minutos` de la plantilla.',
            'Aplique `map` multiplicando cada elemento por 60.',
            'Muestre el array resultante con `console.log`.'
          ]
        ),
        sec(
          'filter',
          'Te quedas solo con los elementos que pasan una prueba.',
          'Listas de productos activos, tareas completadas, usuarios mayores de edad.',
          '`mascotas.filter((nombre) => nombre.length > 4)` devuelve un subarray. `console.log(largos)` muestra solo los nombres que pasan la prueba.',
          `const mascotas = ['gato', 'perro', 'elefante', 'pez'];\nconst largos = mascotas.filter((n) => n.length > 4);\nconsole.log(largos);`,
          [
            'Use el array `mascotas` de la plantilla.',
            'Filtre con `nombre.length > 4`.',
            'Muestre el subarray con `console.log`.'
          ]
        ),
        sec(
          'find',
          'Buscas el primero que coincide y paras.',
          'Obtener un registro por id sin recorrer manualmente.',
          '`usuarios.find((u) => u.id === 2)` devuelve el primer objeto que cumple. `console.log(usuario.nombre)` muestra solo el nombre.',
          `const usuarios = [{ id: 1, nombre: 'Ana' }, { id: 2, nombre: 'Luis' }];\nconst usuario = usuarios.find((u) => u.id === 2);\nconsole.log(usuario.nombre);`,
          [
            'Use el array `usuarios` de la plantilla.',
            'Busque con `find` donde `id === 2`.',
            'Muestre la propiedad `nombre` con `console.log`.'
          ]
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
          salidaEsperada: '[1500, 2400, 900]',
          seccionRef: 'map',
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
          seccionRef: 'filter',
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
          seccionRef: 'find',
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
    contenido: {
      intro: `Sigues con métodos de array: **reduce** (un solo resultado), **some** / **every** (preguntas sobre toda la lista) y **sort** (ordenar, con cuidado en números).`,
      secciones: [
        sec(
          'reduce',
          'Recorres la lista y acumulas un único resultado.',
          'Sumar precios, contar votos, agrupar en un objeto.',
          '`precios.reduce((acc, p) => acc + p, 0)` suma todos los valores. `console.log(total)` muestra el acumulado.',
          'const precios = [10, 20, 30];\nconst total = precios.reduce((acc, p) => acc + p, 0);\nconsole.log(total);',
          [
            'Use el array `precios` de la plantilla.',
            'Aplique `reduce` con valor inicial `0`.',
            'Muestre el total con `console.log`.'
          ]
        ),
        sec(
          'some y every',
          'Una pregunta sobre “¿alguno?” o “¿todos?”.',
          'Validar formularios, permisos, listas de edades.',
          '`edades.some((e) => e < 18)` devuelve true si al menos uno cumple. `console.log(hayMenor)` expone el booleano.',
          'const edades = [22, 17, 31];\nconst hayMenor = edades.some((e) => e < 18);\nconsole.log(hayMenor);',
          [
            'Use el array `edades` de la plantilla.',
            'Aplique `some` con condición `edad < 18`.',
            'Muestre el booleano con `console.log`.'
          ]
        ),
        sec(
          'sort',
          'Reordenar elementos in-place.',
          'Tablas, rankings, prioridades.',
          'Para números use `nums.sort((a, b) => a - b)`. `console.log(nums)` muestra el array ordenado de menor a mayor.',
          'const nums = [10, 1, 21, 2];\nnums.sort((a, b) => a - b);\nconsole.log(nums);',
          [
            'Use el array `nums` de la plantilla.',
            'Ordene con `sort((a, b) => a - b)`.',
            'Muestre el array ordenado con `console.log`.'
          ]
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
          salidaEsperada: '60',
          seccionRef: 'reduce',
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
          seccionRef: 'some y every',
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
          seccionRef: 'sort',
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
