import type { Leccion } from '$lib/types/lesson';
import { sec, ej } from './_helpers';

export const week1: Leccion[] = [
  {
    dia: 1,
    semana: 1,
    tipo: 'leccion',
    titulo: 'Cajas con nombre: guardar datos',
    objetivo: 'Entender qué es guardar un dato y mostrarlo, sin pelear con la sintaxis.',
    contenido: {
      intro: `Todo programa es una serie de cajas etiquetadas. Hoy solo necesitas la idea: guardo un nombre, guardo una edad, y quiero mostrar un mensaje con eso. La forma exacta de escribirlo la completas con Tab o el tutor.`,
      secciones: [
        sec(
          'Cajas fijas y cajas que cambian',
          'En un almacén, algunas estanterías llevan etiqueta permanente (PIEZA A). Otras son “bandeja del día” y hoy pones 0 cajas, mañana 5.',
          'En código guardas datos en variables. Unas no las vas a reasignar (const), otras sí porque el valor cambia (let).',
          'No importa si escribes const o let mal al principio: importa si entiendes qué dato guardas y si puede cambiar o no.',
          `const nombre = 'Ana';\nlet cajas = 0;\ncajas = 5;`
        ),
        sec(
          'Tipos de dato (texto, número, sí/no)',
          'En la carpintería anotas en un papel: texto (cliente), número (piezas), sí/no (¿entregado?).',
          'La web hace lo mismo: texto (string), número (number), verdadero/falso (boolean).',
          'JavaScript adivina el tipo. Tú piensa qué estás guardando en cada caja.',
          `const cliente = 'Luis';\nconst piezas = 12;\nconst entregado = false;`
        ),
        sec(
          'Ver el resultado (consola)',
          'Es la ventanilla donde el taller grita “listo” para que tú compruebes sin montar toda la web.',
          'console.log muestra un valor al desarrollador. En este portal la IA revisa tu código; la consola es la forma clásica de comprobar.',
          'Escribe la idea; si falta un paréntesis, el autocompletado o el tutor te ayudan.',
          `console.log('Hola');\nconsole.log(2 + 2);`
        ),
        sec(
          'Texto con variables dentro',
          'En vez de escribir a mano “Hola Ana” en diez sitios, tienes una plantilla con huecos.',
          'Los template strings (backticks) meten variables dentro del texto. Equivalente a rellenar una etiqueta de envío.',
          'Si usas comillas y concatenas con + y funciona, también vale.',
          'const n = "Ana";\nconst msg = `Hola ${n}`;'
        )
      ],
      resumen: [
        'Variables = cajas con nombre.',
        'const = no cambio el enlace; let = el valor puede cambiar.',
        'string, number, boolean son los básicos.',
        'console.log = comprobar en la ventanilla.',
        'Template string = texto con huecos rellenables.'
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
    titulo: 'Comparar y decidir: ¿es igual? ¿es mayor?',
    objetivo: 'Entender comparaciones como preguntas sí/no, no como álgebra.',
    contenido: {
      intro: `Programar es preguntar todo el rato: ¿hay stock? ¿es mayor el pedido? ¿coincide el DNI? Son preguntas con respuesta sí o no.`,
      secciones: [
        sec(
          'Sumar, restar, contar',
          'En el taller sumas tornillos, restas los usados, cuentas lo que queda.',
          'Los operadores + - * / son herramientas de conteo. El % (módulo) es “cuánto sobra” al repartir en cajas iguales.',
          'No necesitas fórmulas raras: piensa en unidades físicas.',
          'console.log(10 + 5);\nconsole.log(10 % 3);'
        ),
        sec(
          'Comparar (===)',
          '¿Esta caja es la misma que la etiqueta? Miras valor Y tipo.',
          '=== responde true o false. Evita == (convierte tipos y confunde).',
          'En la vida: “¿es exactamente este pedido?”',
          'console.log(5 === 5);\nconsole.log(5 === "5"); // false'
        ),
        sec(
          'Y / O / vacío',
          '¿Hay luz Y hay material? ¿Hay camión O hay furgoneta? ¿La caja está vacía?',
          'Truthy/falsy: caja vacía, 0, texto vacío cuentan como “no” en una decisión rápida.',
          'No memorices tablas: piensa “¿hay algo dentro de la caja?”.',
          'const hayStock = cantidad > 0;\nconst puedeEnviar = pagado && hayStock;'
        )
      ],
      resumen: [
        'Operadores = contar y repartir.',
        '=== pregunta si dos valores son iguales de verdad.',
        '&& y || combinan preguntas.',
        'Vacío o cero suele significar “no” en una condición.'
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
    titulo: 'Caminos: si pasa esto, haz aquello',
    objetivo: 'Entender condicionales como desvíos en un taller.',
    contenido: {
      intro: `Un programa es un taller con señales: si llueve, trabajo dentro; si no, fuera. Eso es if/else.`,
      secciones: [
        sec(
          'if / else',
          'El capataz mira la etiqueta y manda por un pasillo u otro.',
          'if evalúa una pregunta. else es el camino alternativo.',
          'Puedes encadenar else if como más señales seguidas.',
          'if (edad >= 18) {\n  console.log("adulto");\n} else {\n  console.log("menor");\n}'
        ),
        sec(
          'Atajo de dos caminos (ternario)',
          'Una señal pequeña: ¿sí o no? Elige A o B en una línea.',
          'Útil para etiquetas cortas, no para lógica enorme.',
          'const tipo = esVip ? "oro" : "normal";'
        ),
        sec(
          'switch: varias etiquetas iguales',
          'Como un buzón con compartimentos: día lunes → un procedimiento, martes → otro.',
          'Cuando hay muchos valores concretos iguales (días, estados).',
          'switch (dia) {\n  case "lunes": ...\n  default: ...\n}'
        )
      ],
      resumen: [
        'if = pregunta con caminos.',
        'else = si no se cumple.',
        'Ternario = elección corta.',
        'switch = muchas etiquetas fijas.'
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
    titulo: 'Herramientas: funciones que reciben y devuelven',
    objetivo: 'Ver una función como una máquina del taller.',
    contenido: {
      intro: `Una función es una herramienta: metes materia prima (parámetros), sale un resultado. Le pones nombre para reutilizarla.`,
      secciones: [
        sec(
          'Declarar una función',
          'Como montar un torno con instrucciones pegadas: “si me das X, devuelvo Y”.',
          'Evitas repetir el mismo trabajo en diez sitios del taller.',
          'function duplicar(x) { return x * 2; }'
        ),
        sec(
          'Función flecha',
          'La misma herramienta, etiqueta más corta. Muy común en JS moderno.',
          'const duplicar = (x) => x * 2;',
          'const sumar = (a, b) => a + b;'
        ),
        sec(
          'Valores por defecto',
          'Si el cliente no dice color, usas “natural”.',
          'function saludar(nombre = "invitado") { ... }',
          'Parámetro opcional con respaldo.'
        )
      ],
      resumen: [
        'Función = máquina reutilizable.',
        'return = lo que sale.',
        'Parámetros = lo que entra.',
        'Flecha = forma corta de escribirla.'
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
    titulo: 'Listas de pedidos: transformar y filtrar',
    objetivo: 'Entender arrays como listas de la carpintería.',
    contenido: {
      intro: `Un array es una lista ordenada: pedido 1, pedido 2… Hoy aprendes tres movimientos: transformar todos, quedarte con algunos, encontrar uno.`,
      secciones: [
        sec(
          'map: cambiar cada pieza',
          'Tienes lista de medidas en cm y quieres la misma lista en mm.',
          'map recorre y devuelve lista nueva con la misma longitud.',
          'const mm = cm.map((x) => x * 10);'
        ),
        sec(
          'filter: quedarte con los válidos',
          'De 10 tablas, solo las que no tienen grieta.',
          'filter devuelve lista más corta (o igual) con los que pasan la prueba.',
          'const buenas = tablas.filter((t) => !t.rota);'
        ),
        sec(
          'find: el primero que coincida',
          'Buscar el pedido con referencia 4521 en la pila.',
          'find devuelve un elemento o undefined.',
          'const pedido = lista.find((p) => p.id === 4521);'
        )
      ],
      resumen: [
        'map = misma lista, valores transformados.',
        'filter = sublista que cumple condición.',
        'find = primer match.'
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
    titulo: 'Inventario: totales y comprobaciones',
    objetivo: 'reduce, some, every y sort sin fórmulas abstractas.',
    contenido: {
      intro: `Sigues con listas: ahora sumar todo el almacén, preguntar “¿alguno falla?” o “¿todos listos?” y ordenar cajas por número.`,
      secciones: [
        sec(
          'reduce: un solo total',
          'Sumas todas las cajas del camión en un único número al final del recorrido.',
          'reduce junta la lista en un valor (suma, conteo…).',
          'const total = precios.reduce((acc, p) => acc + p, 0);'
        ),
        sec(
          'some y every',
          'some: ¿hay al menos una pieza rota? every: ¿todas pasan control?',
          'Respuesta sí/no sobre toda la lista.',
          'edades.some((e) => e < 18);\nedades.every((e) => e >= 18);'
        ),
        sec(
          'sort: ordenar la estantería',
          'Ordenar por número de estante, no por abecedario del código postal.',
          'sort con comparador para números: (a,b) => a - b',
          'Opcional si te lías: basta entender “ordenar lista”.'
        )
      ],
      resumen: [
        'reduce = un resultado de toda la lista.',
        'some = al menos uno.',
        'every = todos.',
        'sort = reordenar (cuidado con números).'
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
    titulo: 'Repaso Semana 1: el almacén en código',
    objetivo: 'Demostrar que entiendes flujo, listas y decisiones (no sintaxis perfecta).',
    instrucciones: `Cinco retos del taller. Explica con código la idea; la IA mira si el efecto es correcto. Puedes ir a cualquier día después; esto no bloquea nada.`,
    ejercicios: [
      ej(1, 'Etiqueta de envío.', 'Nombre y ciudad en mensaje de envío.', ['Mensaje con nombre y ciudad'], ['Dos datos', 'Texto final los incluye'], `const nombre = 'Moisés';\nconst ciudad = 'Alcoy';\n\n`),
      ej(2, 'Stock mínimo.', 'Si stock < 5 muestra "reponer", si no "ok".', ['Texto según stock'], ['Condición con stock', 'Dos salidas'], `const stock = 3;\n\n`),
      ej(3, 'Doble lista.', 'map para duplicar [1,2,3].', ['[2,4,6]'], ['map duplica'], `const nums = [1, 2, 3];\n\n`),
      ej(4, 'Suma total.', 'reduce para sumar [5,10,15].', ['30'], ['reduce suma'], `const v = [5, 10, 15];\n\n`),
      ej(5, 'Herramienta área.', 'Función areaRect(base,altura) devuelve base*altura; prueba 4 y 5.', ['20'], ['Función área', 'Resultado 20'], `function areaRect(b, h) {\n}\n\n`)
    ]
  }
];
