import type { Leccion } from '$lib/types/lesson';

export const lessons: Leccion[] = [
  // ═══════════════════════════════════════════════════════════════════
  // SEMANA 1 — JAVASCRIPT MODERNO
  // ═══════════════════════════════════════════════════════════════════
  {
    dia: 1,
    semana: 1,
    tipo: 'leccion',
    titulo: 'Variables, tipos y template strings',
    objetivo: 'Aprender a guardar y formatear datos en JavaScript.',
    contenido: {
      intro: `Todo programa empieza guardando datos: un nombre, una edad, un precio. En JavaScript usas variables para eso. Saber cuándo usar const vs let y cómo formatear textos es el primer ladrillo de absolutamente todo lo que sigue.`,
      secciones: [
        {
          titulo: 'const y let',
          texto: `Hay dos formas modernas de declarar variables. const fija el valor (no se puede reasignar). let permite cambiarlo. La regla práctica es: usa const por defecto y pasa a let solo cuando vayas a reasignar.`,
          ejemplo: `const PI = 3.14;
let contador = 0;
contador = contador + 1; // OK con let

// PI = 3.15; // Error: Assignment to constant variable.`
        },
        {
          titulo: 'Tipos básicos',
          texto: `Los tres tipos que usarás el 90% del tiempo son string (texto), number (números) y boolean (true/false). JavaScript los detecta solos, no tienes que declarar el tipo.`,
          ejemplo: `const nombre = 'Marta';        // string
const edad = 28;                // number
const esAdmin = false;          // boolean
const lista = [1, 2, 3];        // array
const usuario = { nombre, edad }; // object`
        },
        {
          titulo: 'Template strings',
          texto: `Para meter variables dentro de un texto, usa backticks (\`) y \${variable}. Es mucho más legible que concatenar con +.`,
          ejemplo: `const nombre = 'Ana';
const edad = 30;

// Antigua forma (evítala)
const a = 'Hola ' + nombre + ', tienes ' + edad + ' años.';

// Moderna
const b = \`Hola \${nombre}, tienes \${edad} años.\`;`,
          nota: {
            tipo: 'tip',
            texto: 'Si dudas entre const y let, empieza siempre con const. Cuando JavaScript te grite porque quieres reasignar, conviértela a let. Así evitas bugs.'
          }
        }
      ],
      resumen: [
        'const fija el valor; let permite reasignarlo.',
        'Los tipos básicos: string, number, boolean, array, object.',
        'JavaScript detecta el tipo automáticamente.',
        'Para meter variables en un texto, usa template strings con backticks y ${...}.'
      ]
    },
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Declara una constante `nombre` con tu nombre. Crea otra `edad` con tu edad. Muestra el texto "Hola, [nombre], tienes [edad] años." usando un template string.',
        plantilla: `// Día 1 - Ejercicio 1\n// Usa const para nombre y edad, y un template string para mostrarlo.\n\n`
      },
      {
        numero: 2,
        enunciado:
          'Declara una variable `contador` con let y valor 0. Súmale 5. Muestra el valor final con console.log.',
        plantilla: `// Día 1 - Ejercicio 2\n\n`
      },
      {
        numero: 3,
        enunciado:
          'Crea una constante `precio = 19.99` y otra `producto = "camiseta"`. Muestra: "La camiseta cuesta 19.99 euros." usando template string.',
        plantilla: `// Día 1 - Ejercicio 3\n\n`
      }
    ]
  },

  {
    dia: 2,
    semana: 1,
    tipo: 'leccion',
    titulo: 'Operadores, comparaciones y truthy/falsy',
    objetivo: 'Comparar valores y combinar condiciones lógicas.',
    contenido: {
      intro: `Programar es decidir constantemente: ¿este valor es mayor que aquel? ¿está vacío? ¿es válido? Aquí aprendes los operadores que usarás todos los días.`,
      secciones: [
        {
          titulo: 'Aritméticos básicos',
          texto: `Suma (+), resta (-), multiplicación (*), división (/), módulo (%) que da el resto, y potencia (**).`,
          ejemplo: `console.log(7 + 3);  // 10
console.log(7 - 3);  // 4
console.log(7 * 3);  // 21
console.log(7 / 2);  // 3.5
console.log(7 % 2);  // 1  (resto de la división)
console.log(2 ** 3); // 8  (2 elevado a 3)`
        },
        {
          titulo: 'Comparación (siempre con ===)',
          texto: `=== compara valor y tipo. !== es lo contrario. >, <, >=, <= comparan tamaño. NUNCA uses == (con dos iguales), porque hace conversiones raras.`,
          ejemplo: `console.log(5 === 5);     // true
console.log(5 === '5');   // false (distinto tipo)
console.log(5 == '5');    // true  (peligroso, NO lo uses)
console.log(10 > 3);      // true
console.log(10 !== 'no'); // true`,
          nota: {
            tipo: 'warning',
            texto: 'Olvida que existe el == (doble igual). Usa siempre === (triple igual). Te ahorrará bugs imposibles de encontrar.'
          }
        },
        {
          titulo: 'Lógicos y truthy/falsy',
          texto: `&& es "y" (todas verdaderas), || es "o" (al menos una verdadera), ! invierte. Además, JS considera "falsy" estos valores: false, 0, '', null, undefined, NaN. Todo lo demás es "truthy".`,
          ejemplo: `const tieneNombre = 'Ana';   // truthy
const cuenta = 0;             // falsy

if (tieneNombre && cuenta > -1) {
  console.log('Datos válidos');
}

// "Si no tiene nombre, pon Anónimo"
const nombre = tieneNombre || 'Anónimo';`
        }
      ],
      resumen: [
        'Usa siempre === y !== para comparar.',
        '% (módulo) devuelve el resto: clave para par/impar.',
        '&& exige ambas verdaderas; || basta con una; ! invierte.',
        'Valores falsy: false, 0, "", null, undefined, NaN.'
      ]
    },
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Crea dos variables `a = 10` y `b = 3`. Muestra el resultado de a + b, a - b, a * b, a / b y a % b en cinco console.log.',
        plantilla: `// Día 2 - Ejercicio 1\n\n`
      },
      {
        numero: 2,
        enunciado:
          'Crea `edad = 17`. Muestra true o false según si es mayor o igual de 18, usando una comparación.',
        plantilla: `// Día 2 - Ejercicio 2\n\n`
      },
      {
        numero: 3,
        enunciado:
          'Crea `nombre = ""` (string vacío). Usa el operador || para guardar en `final` el valor de nombre o "Invitado" si está vacío. Muéstralo.',
        plantilla: `// Día 2 - Ejercicio 3\n\n`
      }
    ]
  },

  {
    dia: 3,
    semana: 1,
    tipo: 'leccion',
    titulo: 'Condicionales: if, else, switch, ternario',
    objetivo: 'Tomar decisiones en función del valor de las variables.',
    contenido: {
      intro: `Las condicionales son cómo un programa elige qué hacer. Sin ellas tu código sería una receta fija sin opciones. Vas a verlas mil veces, así que vale la pena dominarlas.`,
      secciones: [
        {
          titulo: 'if / else if / else',
          texto: `La forma básica. Se evalúa cada condición de arriba abajo y se ejecuta el primer bloque cuya condición sea verdadera. else captura "todo lo demás".`,
          ejemplo: `const nota = 7;

if (nota < 5) {
  console.log('Suspenso');
} else if (nota < 7) {
  console.log('Aprobado');
} else if (nota < 9) {
  console.log('Notable');
} else {
  console.log('Sobresaliente');
}`
        },
        {
          titulo: 'Operador ternario',
          texto: `Forma corta para if/else simples. Útil cuando solo quieres asignar un valor según una condición.`,
          ejemplo: `const edad = 20;
const tipo = edad >= 18 ? 'adulto' : 'menor';
console.log(tipo); // 'adulto'

// Equivale a:
let tipo2;
if (edad >= 18) tipo2 = 'adulto';
else tipo2 = 'menor';`,
          nota: {
            tipo: 'tip',
            texto: 'El ternario es ideal para if cortos. Si tu condición es larga o tiene varios else if, vuelve al if/else clásico.'
          }
        },
        {
          titulo: 'switch',
          texto: `Cuando comparas la misma variable contra muchos valores concretos, switch queda más limpio que un if encadenado. No olvides el break.`,
          ejemplo: `const dia = 'lunes';

switch (dia) {
  case 'lunes':
  case 'martes':
  case 'miércoles':
  case 'jueves':
  case 'viernes':
    console.log('Laboral');
    break;
  case 'sábado':
  case 'domingo':
    console.log('Fin de semana');
    break;
  default:
    console.log('Día desconocido');
}`
        }
      ],
      resumen: [
        'if/else if/else: la forma principal de decidir.',
        'Ternario: para asignar un valor según una condición simple.',
        'switch: cuando comparas una variable contra varios valores fijos.',
        'No olvides break en cada case del switch.'
      ]
    },
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe una función `parOImpar(n)` que reciba un número y devuelva "par" o "impar" usando el operador %.',
        plantilla: `// Día 3 - Ejercicio 1\nfunction parOImpar(n) {\n  // ...\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe una función `precioConIVA(precio)` que devuelva el precio multiplicado por 1.21 si precio > 0, o el string "Precio inválido" si no.',
        plantilla: `// Día 3 - Ejercicio 2\n\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe una función `traducirDia(dia)` que reciba "monday", "tuesday" o "wednesday" y devuelva "lunes", "martes" o "miércoles". Usa switch. Si no coincide, devuelve "desconocido".',
        plantilla: `// Día 3 - Ejercicio 3\n\n`
      }
    ]
  },

  {
    dia: 4,
    semana: 1,
    tipo: 'leccion',
    titulo: 'Funciones: declaración, arrow y parámetros',
    objetivo: 'Reutilizar lógica encapsulándola en funciones.',
    contenido: {
      intro: `Una función es un trozo de código con nombre que puedes invocar cuantas veces quieras. En JS moderno hay dos sintaxis principales: la clásica y la flecha (arrow). Las dos sirven; cambia el estilo.`,
      secciones: [
        {
          titulo: 'Declaración clásica',
          texto: `Con la palabra function. Es la forma tradicional, perfectamente válida hoy.`,
          ejemplo: `function sumar(a, b) {
  return a + b;
}

console.log(sumar(2, 3)); // 5`
        },
        {
          titulo: 'Funciones flecha (arrow)',
          texto: `Más cortas. Si el cuerpo es una sola expresión que se devuelve, puedes quitar las llaves y el return.`,
          ejemplo: `const sumar = (a, b) => a + b;
const saludar = (nombre) => \`Hola \${nombre}\`;

// Cuerpo largo: usa llaves y return
const procesar = (x) => {
  const y = x * 2;
  return y + 1;
};`,
          nota: {
            tipo: 'info',
            texto: 'En proyectos modernos (Svelte, React) verás muchísimas arrow functions, sobre todo en callbacks y métodos de array. Familiarízate con ellas.'
          }
        },
        {
          titulo: 'Parámetros por defecto',
          texto: `Puedes dar un valor por defecto a un parámetro: se usa si quien llama no pasa nada en esa posición.`,
          ejemplo: `function saludar(nombre = 'amig@') {
  return \`Hola, \${nombre}!\`;
}

console.log(saludar());        // 'Hola, amig@!'
console.log(saludar('Lucas')); // 'Hola, Lucas!'`
        }
      ],
      resumen: [
        'Declaración clásica: function nombre(params) { ... return ... }.',
        'Arrow: const nombre = (params) => expresión.',
        'Si una función no hace return, devuelve undefined.',
        'Los parámetros pueden tener valor por defecto: (n = 0) => ...'
      ]
    },
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe una función clásica `multiplicar(a, b)` que devuelva el producto de a y b. Llámala con (4, 5) y muestra el resultado.',
        plantilla: `// Día 4 - Ejercicio 1\n\n`
      },
      {
        numero: 2,
        enunciado:
          'Convierte la función anterior en una arrow function `multiplicar`. Debe seguir devolviendo a * b en una sola línea.',
        plantilla: `// Día 4 - Ejercicio 2\n\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe una función `descuento(precio, porcentaje = 10)` que devuelva el precio con el descuento aplicado. Llama descuento(100) y descuento(100, 25) y muestra ambos.',
        plantilla: `// Día 4 - Ejercicio 3\n\n`
      }
    ]
  },

  {
    dia: 5,
    semana: 1,
    tipo: 'leccion',
    titulo: 'Arrays: map, filter y find',
    objetivo: 'Trabajar con listas usando los métodos más importantes.',
    contenido: {
      intro: `En cualquier app real tienes listas: usuarios, productos, mensajes. map, filter y find son los tres métodos que aparecen en TODAS las entrevistas y en TODO el código moderno. Si los dominas hoy, mañana entiendes el 80% del código que leas.`,
      secciones: [
        {
          titulo: 'map: transformar cada elemento',
          texto: `Devuelve un array nuevo con cada elemento transformado por la función que le pases. El array original NO se modifica.`,
          ejemplo: `const numeros = [1, 2, 3, 4];
const dobles = numeros.map((n) => n * 2);

console.log(dobles);  // [2, 4, 6, 8]
console.log(numeros); // [1, 2, 3, 4] (intacto)`
        },
        {
          titulo: 'filter: quedarte con algunos',
          texto: `Devuelve un array nuevo solo con los elementos que cumplan la condición.`,
          ejemplo: `const numeros = [1, 2, 3, 4, 5, 6];
const pares = numeros.filter((n) => n % 2 === 0);

console.log(pares); // [2, 4, 6]

const usuarios = [
  { nombre: 'Ana', activo: true },
  { nombre: 'Luis', activo: false }
];
const activos = usuarios.filter((u) => u.activo);`
        },
        {
          titulo: 'find: encontrar el primero',
          texto: `Devuelve el primer elemento que cumpla la condición, o undefined si no hay ninguno. Útil para buscar un objeto por id, por ejemplo.`,
          ejemplo: `const productos = [
  { id: 1, nombre: 'Lápiz' },
  { id: 2, nombre: 'Goma' },
  { id: 3, nombre: 'Cuaderno' }
];

const goma = productos.find((p) => p.id === 2);
console.log(goma); // { id: 2, nombre: 'Goma' }`,
          nota: {
            tipo: 'tip',
            texto: 'Regla mental: map para transformar, filter para reducir, find para uno solo. Nunca uses for clásico si alguno de estos sirve, queda más limpio.'
          }
        }
      ],
      resumen: [
        'map devuelve un array nuevo con cada elemento transformado.',
        'filter devuelve un array nuevo con los que cumplen una condición.',
        'find devuelve el primer elemento que cumple la condición (o undefined).',
        'Ninguno modifica el array original.'
      ]
    },
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Dado `const nums = [1, 2, 3, 4, 5]`, usa map para crear un array `cuadrados` con cada número al cuadrado y muéstralo.',
        plantilla: `// Día 5 - Ejercicio 1\nconst nums = [1, 2, 3, 4, 5];\n\n`
      },
      {
        numero: 2,
        enunciado:
          'Dado `const edades = [10, 17, 22, 4, 30]`, usa filter para obtener solo los mayores de edad (>= 18) y muéstralos.',
        plantilla: `// Día 5 - Ejercicio 2\nconst edades = [10, 17, 22, 4, 30];\n\n`
      },
      {
        numero: 3,
        enunciado:
          'Dado un array de usuarios `[{id:1,nombre:"Ana"},{id:2,nombre:"Luis"}]`, usa find para obtener el usuario con id 2 y muestra su nombre.',
        plantilla: `// Día 5 - Ejercicio 3\nconst usuarios = [\n  { id: 1, nombre: 'Ana' },\n  { id: 2, nombre: 'Luis' }\n];\n\n`
      }
    ]
  },

  {
    dia: 6,
    semana: 1,
    tipo: 'leccion',
    titulo: 'Arrays avanzados: reduce, some, every, sort',
    objetivo: 'Resumir, comprobar y ordenar listas con elegancia.',
    contenido: {
      intro: `Con map/filter/find ya haces el 80%. El 20% restante (sumar totales, comprobar condiciones globales, ordenar) lo cubren reduce, some, every y sort. Después de hoy, manejas arrays como un junior+.`,
      secciones: [
        {
          titulo: 'reduce: acumular un resultado',
          texto: `Reduce un array a un único valor recorriéndolo y acumulando. Recibe (acumulador, elemento) y un valor inicial. El típico caso: sumar totales.`,
          ejemplo: `const precios = [10, 20, 30];

const total = precios.reduce((acc, p) => acc + p, 0);
console.log(total); // 60

// Más complejo: contar por categoría
const items = [
  { tipo: 'fruta' },
  { tipo: 'libro' },
  { tipo: 'fruta' }
];
const conteo = items.reduce((acc, i) => {
  acc[i.tipo] = (acc[i.tipo] || 0) + 1;
  return acc;
}, {});
console.log(conteo); // { fruta: 2, libro: 1 }`
        },
        {
          titulo: 'some y every',
          texto: `some devuelve true si AL MENOS UNO cumple la condición. every devuelve true si TODOS la cumplen. Devuelven boolean.`,
          ejemplo: `const edades = [22, 17, 31, 25];

const algunoMenor = edades.some((e) => e < 18);
console.log(algunoMenor); // true

const todosMayores = edades.every((e) => e >= 18);
console.log(todosMayores); // false`
        },
        {
          titulo: 'sort: ordenar',
          texto: `Ordena el array. Cuidado: por defecto ordena como texto, no como números. Para números pasa una función comparadora.`,
          ejemplo: `const numeros = [10, 1, 21, 2];
numeros.sort(); // ['1', '10', '2', '21'] como texto
// Para orden numérico:
numeros.sort((a, b) => a - b);
console.log(numeros); // [1, 2, 10, 21]

// Ordenar objetos por una propiedad
const users = [{ edad: 30 }, { edad: 22 }, { edad: 40 }];
users.sort((a, b) => a.edad - b.edad);`,
          nota: {
            tipo: 'warning',
            texto: 'sort MODIFICA el array original. Si quieres conservarlo, copia antes: [...arr].sort(...).'
          }
        }
      ],
      resumen: [
        'reduce: acumula y devuelve un único valor (suma, conteo, agrupación).',
        'some: ¿al menos uno cumple? Devuelve boolean.',
        'every: ¿todos cumplen? Devuelve boolean.',
        'sort modifica el array. Para números, pasa (a, b) => a - b.'
      ]
    },
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Dado `const nums = [5, 10, 15, 20]`, usa reduce para calcular la suma total y muéstrala.',
        plantilla: `// Día 6 - Ejercicio 1\nconst nums = [5, 10, 15, 20];\n\n`
      },
      {
        numero: 2,
        enunciado:
          'Dado `const edades = [12, 18, 25, 7]`, usa every y some para decir si TODOS son mayores de edad y si ALGUNO es menor de 10. Muestra ambos.',
        plantilla: `// Día 6 - Ejercicio 2\nconst edades = [12, 18, 25, 7];\n\n`
      },
      {
        numero: 3,
        enunciado:
          'Dado `const precios = [29, 5, 17, 99, 8]`, crea una COPIA ordenada de menor a mayor sin modificar el original. Muestra ambos arrays.',
        plantilla: `// Día 6 - Ejercicio 3\nconst precios = [29, 5, 17, 99, 8];\n\n`
      }
    ]
  },

  // ────────── EXAMEN SEMANA 1 ──────────
  {
    dia: 7,
    semana: 1,
    tipo: 'examen',
    titulo: 'Examen Semana 1: JavaScript moderno',
    objetivo: 'Demostrar dominio de variables, condicionales, funciones y arrays.',
    instrucciones: `Cinco ejercicios mezclados de toda la semana. Trabájalos en orden, corrige cada uno hasta que el tutor lo apruebe. Con 4 de 5 correctos el examen queda aprobado y desbloqueas la semana 2.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Crea una función `saludo(nombre, edad)` que devuelva el string "Hola NOMBRE, tienes EDAD años" usando template strings. Llámala con tus datos.',
        plantilla: `// Examen Semana 1 - Ejercicio 1\n\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe una función `mayorDeTres(a, b, c)` que devuelva el mayor de los tres números usando solo if/else.',
        plantilla: `// Examen Semana 1 - Ejercicio 2\nfunction mayorDeTres(a, b, c) {\n  // ...\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Dado `const nums = [1, 2, 3, 4, 5, 6]`, devuelve con filter y map un nuevo array con los pares MULTIPLICADOS por 10. Resultado esperado: [20, 40, 60].',
        plantilla: `// Examen Semana 1 - Ejercicio 3\nconst nums = [1, 2, 3, 4, 5, 6];\n\n`
      },
      {
        numero: 4,
        enunciado:
          'Dado `const productos = [{nombre:"A", precio:10},{nombre:"B", precio:20},{nombre:"C", precio:5}]`, calcula con reduce la suma total de precios.',
        plantilla: `// Examen Semana 1 - Ejercicio 4\nconst productos = [\n  { nombre: 'A', precio: 10 },\n  { nombre: 'B', precio: 20 },\n  { nombre: 'C', precio: 5 }\n];\n\n`
      },
      {
        numero: 5,
        enunciado:
          'Dado `const users = [{nombre:"Ana", edad:25},{nombre:"Luis", edad:17}]`, encuentra con find al usuario "Luis" y muestra true/false según si es mayor de edad.',
        plantilla: `// Examen Semana 1 - Ejercicio 5\nconst users = [\n  { nombre: 'Ana', edad: 25 },\n  { nombre: 'Luis', edad: 17 }\n];\n\n`
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // SEMANA 2 — JS AVANZADO + TOOLING
  // ═══════════════════════════════════════════════════════════════════
  {
    dia: 8,
    semana: 2,
    tipo: 'leccion',
    titulo: 'Objetos, destructuring y spread/rest',
    objetivo: 'Manejar datos estructurados con sintaxis moderna.',
    contenido: {
      intro: `Si los arrays son listas, los objetos son fichas: agrupan datos con nombre (clave-valor). Más el destructuring y el spread, te ahorras toneladas de líneas y queda mucho más legible.`,
      secciones: [
        {
          titulo: 'Objetos básicos',
          texto: `Se accede a las propiedades con punto. Puedes modificarlas (incluso con const, porque const fija la referencia, no el contenido).`,
          ejemplo: `const usuario = {
  nombre: 'Ana',
  edad: 30,
  email: 'ana@x.com'
};

console.log(usuario.nombre); // 'Ana'
usuario.edad = 31;            // OK aunque sea const
usuario.activo = true;        // añadir propiedad`
        },
        {
          titulo: 'Destructuring',
          texto: `Extraer propiedades de un objeto en variables, en una sola línea. También funciona con arrays.`,
          ejemplo: `const usuario = { nombre: 'Ana', edad: 30, email: 'ana@x.com' };

// En vez de:
const nombre1 = usuario.nombre;
const edad1 = usuario.edad;

// Haces:
const { nombre, edad } = usuario;
console.log(nombre, edad);

// Arrays:
const [primero, segundo] = [10, 20];
console.log(primero, segundo); // 10 20`
        },
        {
          titulo: 'Spread (...) y rest',
          texto: `El operador ... despliega un array u objeto. Sirve para copiar, combinar, o pasar argumentos. Como "rest" recoge el resto en una variable.`,
          ejemplo: `const a = [1, 2, 3];
const b = [4, 5];
const todo = [...a, ...b]; // [1, 2, 3, 4, 5]

const user = { nombre: 'Ana', edad: 30 };
const userAdmin = { ...user, rol: 'admin' };

// Rest en parámetros: recoge "todos los demás"
function sumar(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
console.log(sumar(1, 2, 3, 4)); // 10`,
          nota: {
            tipo: 'tip',
            texto: 'spread es la forma idiomática de COPIAR sin mutar el original. Lo verás muchísimo en Svelte/React.'
          }
        }
      ],
      resumen: [
        'Accedes a propiedades con punto: obj.propiedad.',
        'Destructuring: const { a, b } = obj; o const [x, y] = arr;',
        'Spread (...obj) copia o combina objetos/arrays sin mutar el original.',
        'Rest (...args) recoge los argumentos sobrantes en un array.'
      ]
    },
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Crea un objeto `coche` con marca, modelo y año. Usa destructuring para extraer marca y año en variables y muéstralas.',
        plantilla: `// Día 8 - Ejercicio 1\n\n`
      },
      {
        numero: 2,
        enunciado:
          'Dado `const persona = { nombre: "Ana", edad: 30 }`, crea con spread una copia llamada `personaConPais` que tenga además pais: "España".',
        plantilla: `// Día 8 - Ejercicio 2\nconst persona = { nombre: 'Ana', edad: 30 };\n\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe una función `maxDe(...nums)` que reciba cualquier cantidad de números con rest y devuelva el mayor. Pruébala con maxDe(3, 8, 1, 5).',
        plantilla: `// Día 8 - Ejercicio 3\n\n`
      }
    ]
  },

  {
    dia: 9,
    semana: 2,
    tipo: 'leccion',
    titulo: 'Bucles vs métodos de array',
    objetivo: 'Saber cuándo usar for clásico y cuándo map/filter.',
    contenido: {
      intro: `Antes de map/filter solo existían los bucles. Hoy conviven y conviene saber cuándo usar cada uno. Spoiler: en JS moderno usas métodos de array casi siempre, pero los for siguen siendo útiles para ciertos casos.`,
      secciones: [
        {
          titulo: 'for clásico',
          texto: `Sigue siendo válido cuando necesitas un índice, romper el bucle (break) o ejecutar algo X veces.`,
          ejemplo: `for (let i = 0; i < 5; i++) {
  console.log(\`Iteración \${i}\`);
}

// Break: para cuando encuentras lo que buscas
const nums = [1, 2, 3, 4, 5];
for (let i = 0; i < nums.length; i++) {
  if (nums[i] === 3) {
    console.log('Encontrado en posición', i);
    break;
  }
}`
        },
        {
          titulo: 'for...of',
          texto: `Recorre los elementos de un array o iterable sin tener que usar índice. Más legible que el for clásico cuando no necesitas i.`,
          ejemplo: `const frutas = ['manzana', 'pera', 'uva'];

for (const fruta of frutas) {
  console.log(fruta);
}`
        },
        {
          titulo: 'while',
          texto: `Repite mientras la condición sea verdadera. Útil cuando no sabes cuántas vueltas darás (por ejemplo, esperar input válido).`,
          ejemplo: `let intentos = 0;
while (intentos < 3) {
  console.log(\`Intento \${intentos + 1}\`);
  intentos++;
}`,
          nota: {
            tipo: 'warning',
            texto: 'Si la condición de un while nunca se hace falsa, el bucle es infinito y se cuelga la pestaña del navegador. Asegúrate de modificar la variable dentro.'
          }
        },
        {
          titulo: '¿Cuándo cada uno?',
          texto: `Regla práctica: si vas a transformar un array a otro array → map. Si filtras → filter. Si solo buscas → find. Si solo necesitas efectos secundarios (console.log, sumar fuera, etc.) → for...of. Si necesitas índice o break → for clásico.`
        }
      ],
      resumen: [
        'for clásico: cuando necesitas índice o break.',
        'for...of: recorrer los valores sin índice.',
        'while: cuando no sabes cuántas vueltas darás.',
        'Si vas a producir un array nuevo, casi siempre prefiere map/filter.'
      ]
    },
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Usando un for clásico, muestra del 1 al 10 SOLO los números impares.',
        plantilla: `// Día 9 - Ejercicio 1\n\n`
      },
      {
        numero: 2,
        enunciado:
          'Usa for...of para recorrer `["rojo","verde","azul"]` y mostrar cada color en mayúsculas. Pista: usa color.toUpperCase().',
        plantilla: `// Día 9 - Ejercicio 2\n\n`
      },
      {
        numero: 3,
        enunciado:
          'Recibe `const nums = [4, 9, 16, 25]`. Usa un for clásico con break para encontrar el primer número mayor que 10 y muéstralo.',
        plantilla: `// Día 9 - Ejercicio 3\nconst nums = [4, 9, 16, 25];\n\n`
      }
    ]
  },

  {
    dia: 10,
    semana: 2,
    tipo: 'leccion',
    titulo: 'Scope, closures y this básico',
    objetivo: 'Entender por qué a veces "esa variable no existe aquí".',
    contenido: {
      intro: `Scope = "dónde vive una variable". Es la causa nº1 de errores raros para principiantes. Y closures es un concepto que cae en CASI todas las entrevistas frontend. Hoy te quitas el miedo a estos términos.`,
      secciones: [
        {
          titulo: 'Scope: global, función y bloque',
          texto: `Las variables solo existen dentro del bloque (\`{ }\`) en el que se declararon. Una variable de dentro de una función no se ve fuera. let y const tienen "scope de bloque".`,
          ejemplo: `let global = 'soy global';

function ejemplo() {
  let local = 'soy local';
  console.log(global); // OK
}

ejemplo();
// console.log(local); // ERROR: local no existe aquí

if (true) {
  let dentro = 1;
}
// console.log(dentro); // ERROR: solo vive dentro del if`
        },
        {
          titulo: 'Closures',
          texto: `Una closure es una función que "recuerda" las variables del scope donde fue creada, aunque ese scope ya haya terminado. Es la magia detrás de muchos patrones de JS.`,
          ejemplo: `function crearContador() {
  let cuenta = 0;
  return function () {
    cuenta++;
    return cuenta;
  };
}

const contador = crearContador();
console.log(contador()); // 1
console.log(contador()); // 2
console.log(contador()); // 3
// 'cuenta' vive dentro de la closure, persistente`,
          nota: {
            tipo: 'info',
            texto: 'En entrevistas, "explica qué es una closure" es pregunta clásica. Respuesta corta: una función que recuerda el entorno donde nació.'
          }
        },
        {
          titulo: 'this (lo mínimo)',
          texto: `this depende de CÓMO se llama la función, no de dónde se define. Como regla práctica al empezar: las arrow functions NO tienen su propio this (heredan el de fuera), las funciones normales sí.`,
          ejemplo: `const obj = {
  nombre: 'Ana',
  saludarNormal() {
    console.log(\`Hola \${this.nombre}\`); // 'Hola Ana'
  },
  saludarFlecha: () => {
    console.log(\`Hola \${this.nombre}\`); // undefined
  }
};

obj.saludarNormal();
obj.saludarFlecha();`
        }
      ],
      resumen: [
        'Las variables solo viven en su bloque {}.',
        'Una closure es una función que recuerda variables del scope donde nació.',
        'Las arrow functions no tienen su propio this.',
        'Si una variable "no existe", revisa primero el scope.'
      ]
    },
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Crea una función `crearSaludo(nombre)` que devuelva una nueva función SIN parámetros que al llamarla muestre "Hola NOMBRE". Crea saludaAna = crearSaludo("Ana") y llámala dos veces.',
        plantilla: `// Día 10 - Ejercicio 1\n\n`
      },
      {
        numero: 2,
        enunciado:
          'Implementa `crearAcumulador()` que devuelva una función que cada vez que se llame con un número, lo sume al total interno y devuelva el total acumulado.',
        plantilla: `// Día 10 - Ejercicio 2\nfunction crearAcumulador() {\n  // ...\n}\n\nconst sumar = crearAcumulador();\nconsole.log(sumar(5));  // 5\nconsole.log(sumar(3));  // 8\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe una función `dentro()` que declare `let secreto = 42` y NO lo retorne. Fuera de la función, intenta hacer console.log(secreto) y comenta en un comentario qué error daría y por qué.',
        plantilla: `// Día 10 - Ejercicio 3\n\n`
      }
    ]
  },

  {
    dia: 11,
    semana: 2,
    tipo: 'leccion',
    titulo: 'Promesas (then/catch)',
    objetivo: 'Manejar operaciones que tardan: red, timers, archivos.',
    contenido: {
      intro: `Una promesa es "te prometo darte un valor más tarde, cuando termine una operación". Es el cimiento de async/await que verás mañana. Si entiendes promesas, entiendes el 90% del JS asíncrono.`,
      secciones: [
        {
          titulo: '¿Por qué promesas?',
          texto: `Algunas operaciones no son instantáneas: pedir datos a un servidor, esperar un timer, leer un archivo. JS no se queda bloqueado esperando. En su lugar, te devuelve una promesa: un objeto que representa "el resultado vendrá".`,
          ejemplo: `// Función que simula una petición que tarda 1 segundo
function dameNombre() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Ana'), 1000);
  });
}

dameNombre().then((nombre) => {
  console.log(nombre); // 'Ana' después de 1s
});`
        },
        {
          titulo: '.then y .catch',
          texto: `.then se ejecuta cuando la promesa termina con éxito (resuelve). .catch se ejecuta si algo falla (rechaza). Puedes encadenarlos.`,
          ejemplo: `function buscarUsuario(id) {
  return new Promise((resolve, reject) => {
    if (id <= 0) reject(new Error('ID inválido'));
    else resolve({ id, nombre: 'Test' });
  });
}

buscarUsuario(5)
  .then((user) => console.log('OK', user))
  .catch((err) => console.error('Error', err.message));

buscarUsuario(-1)
  .then((user) => console.log('OK', user))
  .catch((err) => console.error('Error', err.message));`,
          nota: {
            tipo: 'tip',
            texto: 'No anides .then dentro de .then. Si necesitas encadenar, devuelve la promesa dentro del .then y enlaza otro .then después.'
          }
        },
        {
          titulo: 'Estados de una promesa',
          texto: `Una promesa puede estar en uno de tres estados: pending (en curso), fulfilled (resuelta con éxito) o rejected (fallida). Una vez decidida, no cambia más.`
        }
      ],
      resumen: [
        'Una promesa representa un valor futuro.',
        '.then recibe el resultado si todo va bien.',
        '.catch recibe el error si algo falla.',
        'Estados: pending → fulfilled o rejected.'
      ]
    },
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Crea una función `esperar(ms)` que devuelva una promesa que resuelve después de ms milisegundos. Usa esperar(2000).then(() => console.log("Listo")).',
        plantilla: `// Día 11 - Ejercicio 1\nfunction esperar(ms) {\n  // ...\n}\n\n`
      },
      {
        numero: 2,
        enunciado:
          'Crea una función `dividir(a, b)` que devuelva una promesa: resuelve con a/b si b !== 0, o rechaza con un error "No se puede dividir por cero".',
        plantilla: `// Día 11 - Ejercicio 2\n\n`
      },
      {
        numero: 3,
        enunciado:
          'Llama a la función dividir del ejercicio anterior con (10, 2) y (10, 0), encadenando .then y .catch para mostrar el resultado o el error en cada caso.',
        plantilla: `// Día 11 - Ejercicio 3\n// Asume que ya tienes la función dividir definida arriba.\n\n`
      }
    ]
  },

  {
    dia: 12,
    semana: 2,
    tipo: 'leccion',
    titulo: 'async/await, try/catch y fetch',
    objetivo: 'Hacer peticiones HTTP de forma limpia.',
    contenido: {
      intro: `async/await es azúcar sobre las promesas: el mismo concepto, mejor sintaxis. Junto con fetch te permite llamar a APIs reales en 3 líneas. Es el modo estándar de pedir datos en cualquier app moderna.`,
      secciones: [
        {
          titulo: 'async / await',
          texto: `async marca una función como asíncrona (siempre devuelve una promesa). await "espera" a que una promesa se resuelva y te da el valor, como si fuera síncrono.`,
          ejemplo: `async function obtenerNombre() {
  const nombre = await dameNombre(); // promesa de día 11
  console.log(nombre);
  return nombre;
}

// Llamar a una async function:
obtenerNombre().then((n) => console.log('Recibido:', n));`
        },
        {
          titulo: 'try / catch para errores',
          texto: `Con await, los errores los capturas con try/catch igual que en código síncrono. Mucho más limpio que .catch encadenado.`,
          ejemplo: `async function pedirUsuario(id) {
  try {
    const user = await buscarUsuario(id);
    console.log('Usuario:', user);
  } catch (err) {
    console.error('Falló:', err.message);
  }
}`
        },
        {
          titulo: 'fetch + JSON',
          texto: `fetch hace una petición HTTP y devuelve una promesa con la respuesta. Para leer el cuerpo como JSON, llama a .json(), que también es asíncrono.`,
          ejemplo: `async function listarPosts() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const datos = await res.json();
    console.log(datos.length); // 100
  } catch (err) {
    console.error(err.message);
  }
}`,
          nota: {
            tipo: 'tip',
            texto: 'Siempre comprueba res.ok antes de hacer res.json(). fetch NO lanza error si el servidor devuelve 404 o 500: solo si la red falla.'
          }
        }
      ],
      resumen: [
        'async marca una función como asíncrona; devuelve promesa.',
        'await espera el valor de una promesa.',
        'try/catch captura errores en código async.',
        'fetch + res.json() es la combinación estándar para llamar a APIs.'
      ]
    },
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe una función async `esperarYSaludar(nombre, ms)` que espere ms milisegundos y luego devuelva "Hola NOMBRE". Pista: reutiliza la idea de esperar() del Día 11.',
        plantilla: `// Día 12 - Ejercicio 1\nfunction esperar(ms) {\n  return new Promise((r) => setTimeout(r, ms));\n}\n\nasync function esperarYSaludar(nombre, ms) {\n  // ...\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Crea una función async `obtenerUsuario(id)` que llame a fetch a `https://jsonplaceholder.typicode.com/users/${id}` y devuelva el JSON. Captura errores con try/catch.',
        plantilla: `// Día 12 - Ejercicio 2\nasync function obtenerUsuario(id) {\n  // ...\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Llama a obtenerUsuario(1) y muestra solo el campo "name" del JSON resultante con console.log.',
        plantilla: `// Día 12 - Ejercicio 3\n// Usa la función obtenerUsuario del ejercicio anterior.\n\n`
      }
    ]
  },

  {
    dia: 13,
    semana: 2,
    tipo: 'leccion',
    titulo: 'DOM, eventos y localStorage',
    objetivo: 'Tocar la página y guardar datos en el navegador.',
    contenido: {
      intro: `Antes de un framework, todo el frontend se hacía moviendo nodos del DOM a mano. Hoy lo hacen Svelte/React por ti, pero saber lo básico te ayuda en entrevistas y para entender qué pasa por debajo.`,
      secciones: [
        {
          titulo: 'Seleccionar y modificar elementos',
          texto: `document.querySelector busca un elemento con un selector CSS. Una vez tienes el nodo, puedes leer/cambiar textContent, value, classList...`,
          ejemplo: `const titulo = document.querySelector('h1');
titulo.textContent = 'Hola DOM';
titulo.classList.add('destacado');

const input = document.querySelector('#nombre');
console.log(input.value);`
        },
        {
          titulo: 'Eventos con addEventListener',
          texto: `Para reaccionar a clicks, escrituras, envíos de formulario, etc. La función que pasas se llama callback.`,
          ejemplo: `const boton = document.querySelector('button');

boton.addEventListener('click', () => {
  console.log('Has hecho click');
});

const input = document.querySelector('input');
input.addEventListener('input', (e) => {
  console.log('Valor actual:', e.target.value);
});`
        },
        {
          titulo: 'localStorage',
          texto: `Permite guardar pares clave-valor en el navegador. Sobreviven al recargar la página. Los valores siempre son strings; usa JSON.stringify y JSON.parse para guardar objetos.`,
          ejemplo: `// Guardar
localStorage.setItem('nombre', 'Ana');
localStorage.setItem('user', JSON.stringify({ id: 1, rol: 'admin' }));

// Leer
const nombre = localStorage.getItem('nombre');
const user = JSON.parse(localStorage.getItem('user'));

// Borrar
localStorage.removeItem('nombre');
localStorage.clear();`,
          nota: {
            tipo: 'warning',
            texto: 'localStorage NO está disponible en SSR. En SvelteKit, úsalo solo dentro de $effect o tras comprobar typeof window !== "undefined".'
          }
        }
      ],
      resumen: [
        'document.querySelector(selector) selecciona un elemento.',
        '.textContent, .value, .classList son las propiedades que más cambiarás.',
        'addEventListener("evento", callback) escucha eventos.',
        'localStorage guarda strings entre recargas; usa JSON.stringify/parse para objetos.'
      ]
    },
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Asume que existe un <h1 id="t"> en la página. Escribe el código JS que cambie su texto a "Mi web" usando querySelector.',
        plantilla: `// Día 13 - Ejercicio 1\n\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe el código que añada un listener al botón con id "saluda": al hacer click debe mostrar un console.log("¡Hola!").',
        plantilla: `// Día 13 - Ejercicio 2\n\n`
      },
      {
        numero: 3,
        enunciado:
          'Guarda en localStorage un objeto `const config = { tema: "dark", idioma: "es" }` bajo la clave "config". Luego léelo y muestra solo el tema.',
        plantilla: `// Día 13 - Ejercicio 3\nconst config = { tema: 'dark', idioma: 'es' };\n\n`
      }
    ]
  },

  // ────────── EXAMEN SEMANA 2 ──────────
  {
    dia: 14,
    semana: 2,
    tipo: 'examen',
    titulo: 'Examen Semana 2: JS avanzado + tooling',
    objetivo: 'Demostrar dominio de objetos, async/await, fetch y DOM.',
    instrucciones: `Cinco ejercicios sobre destructuring, closures, promesas, async/await, fetch y localStorage. Necesitas 4 de 5 correctos para aprobar y abrir la semana de Svelte.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Dado `const user = { nombre: "Ana", edad: 30, email: "a@x.com" }`, usa destructuring para crear variables nombre y email en una sola línea y muéstralas.',
        plantilla: `// Examen Semana 2 - Ejercicio 1\nconst user = { nombre: 'Ana', edad: 30, email: 'a@x.com' };\n\n`
      },
      {
        numero: 2,
        enunciado:
          'Implementa `crearMultiplicador(factor)` que devuelva una función que reciba un número y lo multiplique por factor. Crea por5 y úsalo con 7 (debe dar 35).',
        plantilla: `// Examen Semana 2 - Ejercicio 2\n\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe una función async `dobleAsincrono(n)` que use una Promesa con setTimeout 500ms y resuelva con n * 2. Llámala con await y muestra el resultado.',
        plantilla: `// Examen Semana 2 - Ejercicio 3\n\n`
      },
      {
        numero: 4,
        enunciado:
          'Crea async `getTodo(id)` que haga fetch a `https://jsonplaceholder.typicode.com/todos/${id}` y devuelva el JSON. Maneja errores con try/catch. Llámala con id 1.',
        plantilla: `// Examen Semana 2 - Ejercicio 4\n\n`
      },
      {
        numero: 5,
        enunciado:
          'Escribe el código que: 1) guarde `{ visitas: 1 }` en localStorage bajo la clave "stats", 2) lo lea, 3) incremente visitas en 1, 4) lo vuelva a guardar. Imprime el resultado final.',
        plantilla: `// Examen Semana 2 - Ejercicio 5\n\n`
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // SEMANA 3 — SVELTE 5 CON RUNES
  // ═══════════════════════════════════════════════════════════════════
  {
    dia: 15,
    semana: 3,
    tipo: 'leccion',
    titulo: '¿Qué es Svelte/SvelteKit?',
    objetivo: 'Entender por qué Svelte y cómo encaja SvelteKit.',
    contenido: {
      intro: `Svelte no es como React o Vue: es un COMPILADOR. Cuando construyes tu app, Svelte convierte tus componentes en JS plano súper optimizado. Resultado: bundles más pequeños, menos overhead y, sobre todo, sintaxis muchísimo más simple.`,
      secciones: [
        {
          titulo: 'Svelte vs React/Vue (express)',
          texto: `React/Vue necesitan un "runtime" en el navegador que interpreta tu código y reacciona a cambios (virtual DOM, diff, etc.). Svelte compila TODO eso en tiempo de build: el navegador solo recibe JS que actualiza el DOM directamente. Menos código, más rápido.`,
          ejemplo: `// En React (simplificado)
function Contador() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>{n}</button>;
}

// En Svelte 5
<script>
  let n = $state(0);
</script>
<button onclick={() => n++}>{n}</button>`
        },
        {
          titulo: 'SvelteKit = Svelte + framework',
          texto: `Svelte por sí solo te da componentes. SvelteKit añade lo que necesitas para hacer una web/app real: routing por archivos, data loading, formularios server-side, SSR, deploy fácil... como Next.js para React.`,
          ejemplo: `src/
  routes/
    +page.svelte          → /
    about/+page.svelte    → /about
    blog/[slug]/+page.svelte → /blog/:slug
    +layout.svelte        → layout común`
        },
        {
          titulo: 'Stack actual',
          texto: `Hoy Svelte va por la versión 5 con "runes" ($state, $derived, $effect, $props). Es lo que usaremos toda la semana. Lo viejo (let reactivos, $:, export let) sigue existiendo pero ya no es el estilo recomendado.`,
          nota: {
            tipo: 'info',
            texto: 'Si googleas y encuentras tutoriales con $:, export let o on:click, son de Svelte 4. La sintaxis válida hoy usa $state, $props y onclick=.'
          }
        }
      ],
      resumen: [
        'Svelte es un compilador: convierte componentes en JS plano.',
        'Resultado: menos bundle, más rápido, sintaxis más simple.',
        'SvelteKit añade routing, SSR, data loading y formularios.',
        'Svelte 5 introduce las "runes": $state, $derived, $effect, $props.'
      ]
    },
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'En un comentario, explica con tus palabras la diferencia clave entre Svelte y React (1-2 frases sobre el compilador).',
        plantilla: `// Día 15 - Ejercicio 1\n// Escribe tu explicación como un string asignado a const:\nconst respuesta = \`...\`;\n`
      },
      {
        numero: 2,
        enunciado:
          'Crea una constante `rutas` con un array de strings que sean las URLs que generaría SvelteKit a partir de estos archivos: src/routes/+page.svelte, src/routes/about/+page.svelte, src/routes/blog/[slug]/+page.svelte (usa "[slug]" como literal en el string).',
        plantilla: `// Día 15 - Ejercicio 2\nconst rutas = [\n  // ...\n];\n`
      },
      {
        numero: 3,
        enunciado:
          'En un comentario, lista las cuatro runes principales de Svelte 5 y para qué sirve cada una en una línea. Guarda el comentario en una const llamada `notas` como string.',
        plantilla: `// Día 15 - Ejercicio 3\nconst notas = \`\n$state: ...\n$derived: ...\n$effect: ...\n$props: ...\n\`;\n`
      }
    ]
  },

  {
    dia: 16,
    semana: 3,
    tipo: 'leccion',
    titulo: 'Tu primer componente',
    objetivo: 'Crear y usar componentes Svelte.',
    contenido: {
      intro: `Un componente Svelte es un archivo .svelte con tres partes: la lógica (script), la pinta (markup) y el estilo (style). Cada componente vive en su archivo y se importa donde lo necesites.`,
      secciones: [
        {
          titulo: 'Las tres secciones de un .svelte',
          texto: `Un archivo Svelte tiene <script>, el HTML del componente y <style>. Las tres son opcionales pero lo normal es tener al menos las dos primeras.`,
          ejemplo: `<script lang="ts">
  let nombre = 'mundo';
</script>

<h1>Hola, {nombre}!</h1>

<style>
  h1 {
    color: tomato;
    font-family: sans-serif;
  }
</style>`
        },
        {
          titulo: 'Importar y usar un componente',
          texto: `Otro componente se importa como cualquier módulo JS. Luego lo escribes con tag PascalCase. Los estilos están aislados por componente: el CSS de uno no se cuela en otro.`,
          ejemplo: `<!-- src/lib/Saludo.svelte -->
<script lang="ts">
  let nombre = 'amig@';
</script>

<p>Hola, {nombre}!</p>

<!-- src/routes/+page.svelte -->
<script lang="ts">
  import Saludo from '$lib/Saludo.svelte';
</script>

<Saludo />
<Saludo />`,
          nota: {
            tipo: 'tip',
            texto: 'Mete tus componentes reutilizables en src/lib/components/ y el alias $lib te ahorra rutas relativas largas.'
          }
        },
        {
          titulo: 'Interpolación: {expresión}',
          texto: `Dentro del HTML, las llaves {} ejecutan cualquier expresión JS. Puedes mostrar variables, hacer cuentas, llamar funciones...`,
          ejemplo: `<script lang="ts">
  const a = 3;
  const b = 4;
  const items = ['leche', 'pan'];
</script>

<p>{a} + {b} = {a + b}</p>
<p>Tienes {items.length} cosas que comprar.</p>`
        }
      ],
      resumen: [
        'Un componente Svelte tiene script, markup y style.',
        'Los estilos están aislados por componente.',
        'Se importa con import y se usa como <Tag />.',
        'Dentro del markup, {expresión} ejecuta JS.'
      ]
    },
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe el contenido del archivo `Saludo.svelte` (como un string) que contenga script con `const nombre = "Marta"` y un <h2>Hola Marta</h2> interpolando la variable. Asigna ese string completo a `const componente`.',
        plantilla: `// Día 16 - Ejercicio 1\nconst componente = \`\n<script>\n  // ...\n</script>\n\n<h2>...</h2>\n\`;\n`
      },
      {
        numero: 2,
        enunciado:
          'Como string, escribe en `const importacion` la línea exacta de TypeScript/Svelte para importar el componente Saludo desde "$lib/Saludo.svelte".',
        plantilla: `// Día 16 - Ejercicio 2\nconst importacion = \`...\`;\n`
      },
      {
        numero: 3,
        enunciado:
          'Calcula y muestra el resultado: dado `const items = ["leche", "pan", "uva"]`, ¿qué pondría Svelte en pantalla si el markup es `<p>Tienes {items.length} cosas.</p>`? Asigna el texto resultante a `const renderizado`.',
        plantilla: `// Día 16 - Ejercicio 3\nconst items = ['leche', 'pan', 'uva'];\nconst renderizado = ''; // p. ej. 'Tienes 3 cosas.'\n`
      }
    ]
  },

  {
    dia: 17,
    semana: 3,
    tipo: 'leccion',
    titulo: 'Reactividad con $state',
    objetivo: 'Hacer que cambios en datos actualicen el DOM solos.',
    contenido: {
      intro: `Reactividad significa: cambias una variable y el DOM se actualiza solo, sin tocar nada. En Svelte 5 lo consigues marcando la variable como $state. Es la rune central de la 5.`,
      secciones: [
        {
          titulo: '$state básico',
          texto: `Envuelves el valor inicial con $state(...). A partir de ahí, leer y escribir esa variable funciona como con cualquier let, pero el DOM se entera.`,
          ejemplo: `<script lang="ts">
  let contador = $state(0);
</script>

<button onclick={() => contador++}>
  Has pulsado {contador} veces
</button>`
        },
        {
          titulo: '$state con objetos y arrays',
          texto: `También funciona con objetos y arrays. Cuando mutas dentro (push, pop, asignar propiedad), Svelte detecta el cambio.`,
          ejemplo: `<script lang="ts">
  let tarea = $state({ texto: '', hecho: false });
  let lista = $state<string[]>([]);

  function añadir() {
    lista.push('Nueva tarea'); // Svelte se entera
  }
</script>

<input bind:value={tarea.texto} />
<button onclick={añadir}>+</button>
<p>Total: {lista.length}</p>`,
          nota: {
            tipo: 'tip',
            texto: 'Olvida los let reactivos de Svelte 4 (let x = 0 + $: ...). En Svelte 5 se usa $state SIEMPRE para variables que cambian y deben afectar al DOM.'
          }
        },
        {
          titulo: 'Snippet final con TypeScript',
          texto: `Si quieres tipar un $state, lo haces inline con el genérico, igual que en TypeScript normal.`,
          ejemplo: `let nombre = $state<string>('');
let edad = $state<number | null>(null);
let lista = $state<{ id: number; titulo: string }[]>([]);`
        }
      ],
      resumen: [
        '$state(valorInicial) marca una variable como reactiva.',
        'Se usa igual que un let normal para leer y escribir.',
        'Funciona con primitivos, objetos y arrays (incluso al mutar dentro).',
        'Tipas con $state<Tipo>(...) cuando hace falta.'
      ]
    },
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Asigna a `const codigo` un string que sea el contenido de un <script> Svelte declarando `contador` con $state(0). Solo el script, no más.',
        plantilla: `// Día 17 - Ejercicio 1\nconst codigo = \`\n<script lang="ts">\n  // ...\n</script>\n\`;\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe en `const codigo` un string con un <script> que declare `lista` como $state<string[]> inicializada con ["a", "b"].',
        plantilla: `// Día 17 - Ejercicio 2\nconst codigo = \`...\`;\n`
      },
      {
        numero: 3,
        enunciado:
          'Asigna a `const explicacion` un string de 1-2 frases que explique con tus palabras qué hace $state en Svelte 5.',
        plantilla: `// Día 17 - Ejercicio 3\nconst explicacion = \`...\`;\n`
      }
    ]
  },

  {
    dia: 18,
    semana: 3,
    tipo: 'leccion',
    titulo: '$derived y $effect',
    objetivo: 'Calcular valores derivados y reaccionar a cambios.',
    contenido: {
      intro: `Después de $state, las dos runes que más usarás son $derived (para valores calculados a partir de otros) y $effect (para ejecutar código cuando algo cambia). Con estas tres ya manejas el 90% de Svelte 5.`,
      secciones: [
        {
          titulo: '$derived: valores calculados',
          texto: `Un $derived es una variable cuyo valor depende de otros $state. Svelte recalcula automáticamente cuando cambia algo de lo que depende.`,
          ejemplo: `<script lang="ts">
  let precio = $state(100);
  let cantidad = $state(2);
  const total = $derived(precio * cantidad);
</script>

<input type="number" bind:value={cantidad} />
<p>Total: {total}</p>`
        },
        {
          titulo: '$effect: efectos secundarios',
          texto: `$effect ejecuta una función cada vez que cambia algo que lee dentro. Úsalo para sincronizar con cosas FUERA de Svelte: localStorage, listeners globales, llamadas externas...`,
          ejemplo: `<script lang="ts">
  let tema = $state<'dark' | 'light'>('light');

  $effect(() => {
    localStorage.setItem('tema', tema);
    document.documentElement.dataset.tema = tema;
  });
</script>

<button onclick={() => (tema = tema === 'dark' ? 'light' : 'dark')}>
  Tema: {tema}
</button>`,
          nota: {
            tipo: 'warning',
            texto: 'NO uses $effect para "actualizar otra variable". Para eso está $derived. $effect solo para efectos externos (localStorage, fetch, timers, listeners).'
          }
        },
        {
          titulo: 'Cleanup en $effect',
          texto: `Si tu efecto crea algo que hay que limpiar (un setInterval, un listener), devuelve una función de cleanup.`,
          ejemplo: `<script lang="ts">
  let segundos = $state(0);

  $effect(() => {
    const id = setInterval(() => segundos++, 1000);
    return () => clearInterval(id); // limpieza
  });
</script>

<p>Segundos: {segundos}</p>`
        }
      ],
      resumen: [
        '$derived(expresión): valor que se recalcula al cambiar las dependencias.',
        '$effect(fn): ejecuta fn cuando cambia algo que lee dentro.',
        'Usa $derived para calcular valores, $effect para efectos externos.',
        '$effect puede devolver una función de cleanup.'
      ]
    },
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Asigna a `const codigo` el contenido de un <script> que declare `nombre = $state("")` y `largo = $derived(nombre.length)`. Solo el script.',
        plantilla: `// Día 18 - Ejercicio 1\nconst codigo = \`...\`;\n`
      },
      {
        numero: 2,
        enunciado:
          'Asigna a `const codigo` el contenido de un <script> que declare `n = $state(0)` y un $effect que guarde `localStorage.setItem("n", String(n))` cada vez que n cambie.',
        plantilla: `// Día 18 - Ejercicio 2\nconst codigo = \`...\`;\n`
      },
      {
        numero: 3,
        enunciado:
          'En `const decision`, asigna un string con una sola palabra ("derived" o "effect") según cuál usarías para: "calcular el precio total a partir de precio y cantidad".',
        plantilla: `// Día 18 - Ejercicio 3\nconst decision = ''; // "derived" o "effect"\n`
      }
    ]
  },

  {
    dia: 19,
    semana: 3,
    tipo: 'leccion',
    titulo: 'Props con $props() y tipado',
    objetivo: 'Pasar datos de un componente a otro de forma tipada.',
    contenido: {
      intro: `Sin props un componente solo sirve para mostrar lo mismo siempre. Con props lo conviertes en una pieza reutilizable que recibe datos desde fuera. En Svelte 5 las props se declaran con la rune $props().`,
      secciones: [
        {
          titulo: '$props() básico',
          texto: `Destructuras las props con $props(), igual que un objeto. Lo normal es darles tipo en la propia destructuración.`,
          ejemplo: `<!-- src/lib/Boton.svelte -->
<script lang="ts">
  let { texto, color = 'primary' }: { texto: string; color?: string } = $props();
</script>

<button class="boton {color}">{texto}</button>

<!-- Uso -->
<script lang="ts">
  import Boton from '$lib/Boton.svelte';
</script>

<Boton texto="Aceptar" />
<Boton texto="Cancelar" color="secondary" />`
        },
        {
          titulo: 'Valores por defecto',
          texto: `Pones el valor por defecto en la propia destructuración. Si el padre no pasa la prop, se usa el default.`,
          ejemplo: `let { tamaño = 'md', autoFocus = false }: {
  tamaño?: 'sm' | 'md' | 'lg';
  autoFocus?: boolean;
} = $props();`
        },
        {
          titulo: 'Children (snippets)',
          texto: `Para que un componente pueda envolver contenido (lo que en HTML serían slots), recibes la prop especial children y la renderizas con {@render children?.()}.`,
          ejemplo: `<!-- src/lib/Tarjeta.svelte -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  let { titulo, children }: { titulo: string; children: Snippet } = $props();
</script>

<section>
  <h3>{titulo}</h3>
  <div>{@render children()}</div>
</section>

<!-- Uso: -->
<Tarjeta titulo="Aviso">
  <p>Hola desde dentro</p>
</Tarjeta>`,
          nota: {
            tipo: 'info',
            texto: 'Si tu prop es opcional, usa {@render children?.()} con interrogación, para que no pete cuando no se pasa.'
          }
        }
      ],
      resumen: [
        '$props() destructura las props con tipo inline.',
        'Los valores por defecto van en la propia destructuración.',
        'children: Snippet recibe el contenido envuelto.',
        'Se renderiza con {@render children?.()}.'
      ]
    },
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'En `const codigo` (string), escribe el <script> de un componente que reciba props { titulo: string; activo?: boolean } con $props() y activo por defecto false.',
        plantilla: `// Día 19 - Ejercicio 1\nconst codigo = \`...\`;\n`
      },
      {
        numero: 2,
        enunciado:
          'En `const uso` (string), escribe la línea exacta para usar el componente Boton importado, pasándole texto "Guardar" y color "danger".',
        plantilla: `// Día 19 - Ejercicio 2\nconst uso = \`...\`;\n`
      },
      {
        numero: 3,
        enunciado:
          'En `const codigo`, escribe el <script> de un componente Tarjeta que reciba { titulo: string; children: Snippet } (importando Snippet con `import type`).',
        plantilla: `// Día 19 - Ejercicio 3\nconst codigo = \`...\`;\n`
      }
    ]
  },

  {
    dia: 20,
    semana: 3,
    tipo: 'leccion',
    titulo: 'Eventos y bind:value',
    objetivo: 'Interactuar con clicks y formularios sincronizados.',
    contenido: {
      intro: `Sin eventos, una app no responde. Sin bind, escribir formularios sería un infierno de listeners. En Svelte 5 ambos son super simples.`,
      secciones: [
        {
          titulo: 'Eventos como atributos',
          texto: `Se usan onclick, oninput, onsubmit, etc. (en minúsculas y sin guion). Reciben directamente la función, sin la coletilla on:click de Svelte 4.`,
          ejemplo: `<script lang="ts">
  let cuenta = $state(0);

  function sumar() {
    cuenta++;
  }
</script>

<button onclick={sumar}>+1</button>
<button onclick={() => (cuenta = 0)}>Reset</button>
<p>Valor: {cuenta}</p>`
        },
        {
          titulo: 'bind:value',
          texto: `Sincroniza una variable $state con el value de un input. Si escribes, la variable se actualiza. Si cambias la variable, el input se actualiza.`,
          ejemplo: `<script lang="ts">
  let nombre = $state('');
  let edad = $state<number>(0);
</script>

<input type="text" bind:value={nombre} placeholder="Tu nombre" />
<input type="number" bind:value={edad} />

<p>Hola {nombre}, tienes {edad} años.</p>`
        },
        {
          titulo: 'bind:checked y bind:group',
          texto: `bind:checked para checkboxes. bind:group cuando varios inputs comparten una variable (típico en radios o multi-checkbox).`,
          ejemplo: `<script lang="ts">
  let aceptado = $state(false);
  let intereses = $state<string[]>([]);
</script>

<label>
  <input type="checkbox" bind:checked={aceptado} />
  Acepto los términos
</label>

<label><input type="checkbox" bind:group={intereses} value="js" /> JS</label>
<label><input type="checkbox" bind:group={intereses} value="svelte" /> Svelte</label>

<p>Has elegido: {intereses.join(', ')}</p>`,
          nota: {
            tipo: 'tip',
            texto: 'bind te ahorra un listener oninput + reasignación manual. Úsalo siempre que la prop sea un campo de formulario y quieras sincronizar.'
          }
        }
      ],
      resumen: [
        'onclick, oninput, onsubmit reciben directamente la función.',
        'bind:value sincroniza un input con un $state.',
        'bind:checked para checkboxes individuales.',
        'bind:group cuando varios inputs comparten una variable.'
      ]
    },
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'En `const codigo` (string), escribe un botón con onclick que ponga el $state `mensaje` a "Pulsado".',
        plantilla: `// Día 20 - Ejercicio 1\nconst codigo = \`...\`;\n`
      },
      {
        numero: 2,
        enunciado:
          'En `const codigo`, escribe un <input type="text"> que use bind:value sobre un $state llamado nombre.',
        plantilla: `// Día 20 - Ejercicio 2\nconst codigo = \`...\`;\n`
      },
      {
        numero: 3,
        enunciado:
          'En `const codigo`, escribe un <input type="checkbox"> con bind:checked sobre un $state llamado activado.',
        plantilla: `// Día 20 - Ejercicio 3\nconst codigo = \`...\`;\n`
      }
    ]
  },

  // ────────── EXAMEN SEMANA 3 ──────────
  {
    dia: 21,
    semana: 3,
    tipo: 'examen',
    titulo: 'Examen Semana 3: Svelte 5 con runes',
    objetivo: 'Demostrar dominio de componentes, runes, props y eventos.',
    instrucciones: `Cinco ejercicios sobre Svelte 5. Necesitas 4 de 5 correctos para aprobar y abrir SvelteKit. Los ejercicios piden snippets de Svelte como strings dentro de variables JS, porque el editor evalúa JavaScript.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'En `const codigo`, escribe el <script lang="ts"> de un componente que declare `precio = $state(0)` y `cantidad = $state(1)` y un $derived `total` que multiplique ambos.',
        plantilla: `// Examen Semana 3 - Ejercicio 1\nconst codigo = \`...\`;\n`
      },
      {
        numero: 2,
        enunciado:
          'En `const codigo`, escribe un <script lang="ts"> que defina las props { titulo: string; subtitulo?: string } usando $props() con tipado inline.',
        plantilla: `// Examen Semana 3 - Ejercicio 2\nconst codigo = \`...\`;\n`
      },
      {
        numero: 3,
        enunciado:
          'En `const codigo`, escribe un <script> con un $effect que sincronice el $state `tema` (string) con localStorage bajo la clave "tema".',
        plantilla: `// Examen Semana 3 - Ejercicio 3\nconst codigo = \`...\`;\n`
      },
      {
        numero: 4,
        enunciado:
          'En `const markup` (string solo del markup, sin <script>), escribe un <button> con onclick que incremente la variable `n`, y debajo un <p> que muestre "Total: " seguido de n.',
        plantilla: `// Examen Semana 3 - Ejercicio 4\nconst markup = \`...\`;\n`
      },
      {
        numero: 5,
        enunciado:
          'En `const markup`, escribe un <input type="text"> con bind:value sobre `nombre`, un <input type="checkbox"> con bind:checked sobre `acepta`, y un <p> que muestre "Bienvenido NOMBRE" solo si acepta es true (usa {#if}).',
        plantilla: `// Examen Semana 3 - Ejercicio 5\nconst markup = \`...\`;\n`
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // SEMANA 4 — SVELTEKIT REAL
  // ═══════════════════════════════════════════════════════════════════
  {
    dia: 22,
    semana: 4,
    tipo: 'leccion',
    titulo: 'Estructura, routing y +page.svelte',
    objetivo: 'Crear páginas con el sistema de rutas por carpetas.',
    contenido: {
      intro: `En SvelteKit el routing es por archivos: la estructura de src/routes ES la estructura de URLs de tu app. No hay configuración de rutas, no hay router separado. Si quieres /about, creas src/routes/about/+page.svelte.`,
      secciones: [
        {
          titulo: 'Archivos especiales',
          texto: `SvelteKit reconoce por nombre. Los que más usarás: +page.svelte (la página), +layout.svelte (layout común), +page.ts/+page.server.ts (data loading) y +page.server.ts con actions (formularios).`,
          ejemplo: `src/routes/
├── +page.svelte          → /
├── +layout.svelte        → layout para todas las páginas
├── about/
│   └── +page.svelte      → /about
├── blog/
│   ├── +page.svelte      → /blog
│   └── [slug]/
│       └── +page.svelte  → /blog/:slug
└── api/
    └── ping/+server.ts   → endpoint GET/POST /api/ping`
        },
        {
          titulo: 'Una página +page.svelte',
          texto: `Es un componente Svelte normal. Recibe los datos del load (si existe) en la prop \`data\`.`,
          ejemplo: `<!-- src/routes/about/+page.svelte -->
<script lang="ts">
  // Si hay +page.ts, los datos vienen aquí:
  // let { data } = $props();
</script>

<h1>Sobre mí</h1>
<p>Texto de la página About.</p>`
        },
        {
          titulo: 'Links',
          texto: `Usa <a href="/ruta">. SvelteKit intercepta el click y hace navegación cliente (sin recargar la página). Para preload anticipado, añade data-sveltekit-preload-data="hover".`,
          ejemplo: `<a href="/about">Sobre mí</a>
<a href="/blog" data-sveltekit-preload-data="hover">Blog</a>`,
          nota: {
            tipo: 'info',
            texto: 'Para programáticamente, usa import { goto } from "$app/navigation". Lo verás en el día de Navegación.'
          }
        }
      ],
      resumen: [
        'src/routes/.../+page.svelte = la página de esa ruta.',
        '+layout.svelte envuelve a sus rutas hijas.',
        'Las carpetas son segmentos de URL; [param] = ruta dinámica.',
        '<a href> hace navegación SPA por defecto.'
      ]
    },
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'En `const rutas` asigna un array con las URLs (strings) que generaría esta estructura: src/routes/+page.svelte, src/routes/contacto/+page.svelte, src/routes/proyectos/+page.svelte.',
        plantilla: `// Día 22 - Ejercicio 1\nconst rutas = [\n  // ...\n];\n`
      },
      {
        numero: 2,
        enunciado:
          'En `const path`, escribe la ruta de archivo (string) que tendrías que crear para servir la URL "/precios" en SvelteKit.',
        plantilla: `// Día 22 - Ejercicio 2\nconst path = ''; // p. ej. 'src/routes/...'\n`
      },
      {
        numero: 3,
        enunciado:
          'En `const enlaces` asigna un array de objetos {href, label} con tres enlaces: "/", "/about" y "/blog". Después escribe en `const markup` un string con tres <a href> generados a partir de ese array (puedes hacerlo concatenando con map y join).',
        plantilla: `// Día 22 - Ejercicio 3\nconst enlaces = [\n  // ...\n];\nconst markup = enlaces.map((e) => '').join('\\n');\n`
      }
    ]
  },

  {
    dia: 23,
    semana: 4,
    tipo: 'leccion',
    titulo: '+layout.svelte y composición',
    objetivo: 'Crear estructura común (header, footer) sin repetirla.',
    contenido: {
      intro: `Un layout es un componente que envuelve a todas las páginas de su carpeta (y subcarpetas). Te ahorra repetir header, footer, navegación en cada página.`,
      secciones: [
        {
          titulo: 'Layout raíz',
          texto: `src/routes/+layout.svelte envuelve TODAS las páginas. El contenido de cada página entra donde pongas {@render children?.()}.`,
          ejemplo: `<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  let { children }: { children: Snippet } = $props();
</script>

<header>
  <nav>
    <a href="/">Inicio</a>
    <a href="/about">About</a>
  </nav>
</header>

<main>
  {@render children?.()}
</main>

<footer>© 2026</footer>`
        },
        {
          titulo: 'Layouts anidados',
          texto: `Cada carpeta puede tener su propio +layout.svelte. Se anidan: el de /blog envuelve al de /blog/[slug], etc.`,
          ejemplo: `src/routes/
├── +layout.svelte           ← envuelve todo
└── blog/
    ├── +layout.svelte       ← envuelve /blog y /blog/[slug]
    ├── +page.svelte
    └── [slug]/+page.svelte`,
          nota: {
            tipo: 'tip',
            texto: 'Si una sección de tu app necesita una nav o estilo distinto (admin, panel, login), crea ahí un +layout.svelte propio.'
          }
        },
        {
          titulo: 'Datos de layout',
          texto: `+layout.ts o +layout.server.ts cargan datos comunes para todas las páginas hijas, igual que un +page.ts. Útil para la sesión del usuario, el menú, etc.`
        }
      ],
      resumen: [
        '+layout.svelte envuelve a sus rutas hijas con {@render children?.()}.',
        'Hay un layout raíz y se pueden anidar por carpetas.',
        '+layout.ts / +layout.server.ts cargan datos comunes.',
        'Importa Snippet con `import type { Snippet } from "svelte"`.'
      ]
    },
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'En `const codigo`, escribe el contenido completo de un +layout.svelte que tenga un <header><nav> con enlaces a "/" y "/contacto", y dentro de <main> renderice los children.',
        plantilla: `// Día 23 - Ejercicio 1\nconst codigo = \`...\`;\n`
      },
      {
        numero: 2,
        enunciado:
          'En `const ubicacion`, asigna la ruta de archivo exacta para crear un layout específico de la sección /admin de tu app.',
        plantilla: `// Día 23 - Ejercicio 2\nconst ubicacion = ''; // 'src/routes/...'\n`
      },
      {
        numero: 3,
        enunciado:
          'En `const linea`, escribe la línea exacta para renderizar el contenido hijo dentro de un layout en Svelte 5 (incluye signo de interrogación opcional).',
        plantilla: `// Día 23 - Ejercicio 3\nconst linea = ''; // '{@render ...}'\n`
      }
    ]
  },

  {
    dia: 24,
    semana: 4,
    tipo: 'leccion',
    titulo: 'Rutas dinámicas y params',
    objetivo: 'Crear páginas como /blog/mi-post sin escribir cada una.',
    contenido: {
      intro: `Cuando tienes una página por cada elemento (post, producto, usuario), no vas a crear un archivo por cada uno. Usas rutas dinámicas: el segmento entre corchetes [slug] captura cualquier valor.`,
      secciones: [
        {
          titulo: 'La sintaxis [param]',
          texto: `Si creas src/routes/blog/[slug]/+page.svelte, las URLs /blog/hola, /blog/sveltekit-tips, etc. caen ahí.`,
          ejemplo: `src/routes/blog/[slug]/+page.svelte
  → /blog/hola
  → /blog/mi-post
  → /blog/lo-que-sea`
        },
        {
          titulo: 'Leer el param',
          texto: `En +page.ts (o +page.server.ts) recibes \`params\`. En la página, llega como \`data.slug\` si lo devuelves desde load. También puedes acceder desde el componente con $page (store) o desde props del runtime.`,
          ejemplo: `// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  // params.slug = "mi-post"
  return { slug: params.slug };
};

// src/routes/blog/[slug]/+page.svelte
<script lang="ts">
  let { data } = $props();
</script>
<h1>Post: {data.slug}</h1>`,
          nota: {
            tipo: 'tip',
            texto: 'Si quieres una ruta con dos params (/users/[id]/posts/[postId]), simplemente anida carpetas con corchetes.'
          }
        },
        {
          titulo: 'Params opcionales y rest',
          texto: `[[opcional]] captura un segmento opcional. [...rest] captura cero o más segmentos. Útil para docs o catch-all.`,
          ejemplo: `src/routes/docs/[...rest]/+page.svelte
  → /docs/guia
  → /docs/guia/instalacion
  → /docs/cualquier/cosa/anidada`
        }
      ],
      resumen: [
        '[param] captura un segmento de URL.',
        'En load recibes params.NOMBRE.',
        'Devuelve los datos al componente con return { ... }.',
        'Puedes anidar params y usar [...rest] o [[opcional]].'
      ]
    },
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'En `const path`, asigna la ruta de archivo para una página /productos/[id] en SvelteKit.',
        plantilla: `// Día 24 - Ejercicio 1\nconst path = '';\n`
      },
      {
        numero: 2,
        enunciado:
          'En `const codigo`, escribe el contenido de un +page.ts cuyo load reciba params y devuelva { id: params.id } tipado con PageLoad.',
        plantilla: `// Día 24 - Ejercicio 2\nconst codigo = \`...\`;\n`
      },
      {
        numero: 3,
        enunciado:
          'En `const codigo`, escribe el <script> del +page.svelte que reciba `data` por $props() y muestre data.id en un <h1>.',
        plantilla: `// Día 24 - Ejercicio 3\nconst codigo = \`...\`;\n`
      }
    ]
  },

  {
    dia: 25,
    semana: 4,
    tipo: 'leccion',
    titulo: 'load: data fetching con +page.ts',
    objetivo: 'Cargar datos antes de renderizar la página.',
    contenido: {
      intro: `load es el corazón del data fetching en SvelteKit. Lo defines en +page.ts (o +page.server.ts) y se ejecuta antes de mostrar la página. Lo que retornes llega a tu componente como data.`,
      secciones: [
        {
          titulo: 'Estructura básica',
          texto: `Exportas una constante load. Recibe un objeto con fetch, params, url, etc. Devuelves un objeto con los datos.`,
          ejemplo: `// src/routes/posts/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();
  return { posts };
};

// src/routes/posts/+page.svelte
<script lang="ts">
  let { data } = $props();
</script>

<ul>
  {#each data.posts as p (p.id)}
    <li>{p.title}</li>
  {/each}
</ul>`
        },
        {
          titulo: '+page.ts vs +page.server.ts',
          texto: `+page.ts se ejecuta en server Y en cliente (durante navegaciones). +page.server.ts SOLO en el servidor. Usa el server cuando hagas cosas con secretos (bases de datos, API keys privadas).`,
          ejemplo: `// +page.server.ts (NO se ejecuta en cliente)
import { SECRET_KEY } from '$env/static/private';

export const load = async () => {
  // Aquí puedes usar SECRET_KEY sin riesgo
  return { ... };
};`,
          nota: {
            tipo: 'warning',
            texto: 'Si pones credenciales o conexiones a DB en +page.ts, acabarán en el bundle del cliente. Para todo lo sensible: +page.server.ts.'
          }
        },
        {
          titulo: 'Acceso a data',
          texto: `En tu componente, los datos llegan como \`data\` dentro de $props(). El nombre lo decide SvelteKit, no se cambia.`,
          ejemplo: `<script lang="ts">
  let { data } = $props();
</script>

<h1>Tienes {data.posts.length} posts</h1>`
        }
      ],
      resumen: [
        '+page.ts → export const load = async ({ fetch, params }) => ({ ... }).',
        'Lo retornado llega como data al componente.',
        '+page.server.ts solo en server; úsalo para secretos.',
        'En el componente: let { data } = $props().'
      ]
    },
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'En `const codigo`, escribe el contenido de un +page.ts con una función load tipada (PageLoad) que devuelva { ahora: new Date().toISOString() }.',
        plantilla: `// Día 25 - Ejercicio 1\nconst codigo = \`...\`;\n`
      },
      {
        numero: 2,
        enunciado:
          'En `const codigo`, escribe el <script lang="ts"> del componente +page.svelte que reciba `data` por $props() y muestre data.ahora en un <p>.',
        plantilla: `// Día 25 - Ejercicio 2\nconst codigo = \`...\`;\n`
      },
      {
        numero: 3,
        enunciado:
          'En `const eleccion` asigna el string "ts" o "server" según en qué archivo deberías cargar datos que usen una API key privada.',
        plantilla: `// Día 25 - Ejercicio 3\nconst eleccion = ''; // 'ts' o 'server'\n`
      }
    ]
  },

  {
    dia: 26,
    semana: 4,
    tipo: 'leccion',
    titulo: 'Form actions con +page.server.ts',
    objetivo: 'Procesar formularios sin escribir endpoints.',
    contenido: {
      intro: `SvelteKit te permite manejar formularios sin /api/cosa: declaras "actions" en +page.server.ts y SvelteKit las llama cuando el form se envía. Funciona incluso sin JS gracias al progressive enhancement.`,
      secciones: [
        {
          titulo: 'Action por defecto',
          texto: `Exportas un objeto actions con default. Recibe { request, ... }. Lees el FormData con request.formData().`,
          ejemplo: `// src/routes/contacto/+page.server.ts
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const email = String(data.get('email') ?? '');
    // ... guardar, enviar email, etc.
    return { ok: true };
  }
};`
        },
        {
          titulo: 'El formulario en la página',
          texto: `Usas un <form method="POST"> normal y corriente. Si añades use:enhance, SvelteKit hace la submission con JS, sin recarga.`,
          ejemplo: `<!-- src/routes/contacto/+page.svelte -->
<script lang="ts">
  import { enhance } from '$app/forms';
  let { form } = $props();
</script>

<form method="POST" use:enhance>
  <input name="email" type="email" required />
  <button>Enviar</button>
</form>

{#if form?.ok}
  <p>Enviado.</p>
{/if}`,
          nota: {
            tipo: 'tip',
            texto: 'Si no usas use:enhance, el form sigue funcionando (recarga la página). Por eso se llama "progressive enhancement": funciona con o sin JS.'
          }
        },
        {
          titulo: 'Actions con nombre',
          texto: `Cuando un mismo +page.server.ts tiene varios formularios (crear, editar, borrar), nombra cada action y referénciala con action="?/nombre" en el form.`,
          ejemplo: `// +page.server.ts
export const actions = {
  crear: async ({ request }) => { /* ... */ },
  borrar: async ({ request }) => { /* ... */ }
};

// +page.svelte
<form method="POST" action="?/crear">...</form>
<form method="POST" action="?/borrar">...</form>`
        }
      ],
      resumen: [
        'actions: { default } o actions: { nombre } en +page.server.ts.',
        'Lees datos con (await request.formData()).get(...).',
        'Devuelves un objeto que llega a la página como prop form.',
        'use:enhance evita recargar la página.'
      ]
    },
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'En `const codigo`, escribe el contenido de un +page.server.ts con una action default tipada (Actions) que lea "nombre" del formData y devuelva { saludo: "Hola " + nombre }.',
        plantilla: `// Día 26 - Ejercicio 1\nconst codigo = \`...\`;\n`
      },
      {
        numero: 2,
        enunciado:
          'En `const markup`, escribe un <form method="POST" use:enhance> que contenga un input name="nombre" y un botón "Enviar".',
        plantilla: `// Día 26 - Ejercicio 2\nconst markup = \`...\`;\n`
      },
      {
        numero: 3,
        enunciado:
          'En `const linea`, escribe el atributo action exacto para llamar a una action llamada "borrar" desde un <form>.',
        plantilla: `// Día 26 - Ejercicio 3\nconst linea = ''; // p. ej. action="..."\n`
      }
    ]
  },

  {
    dia: 27,
    semana: 4,
    tipo: 'leccion',
    titulo: 'Supabase básico',
    objetivo: 'Conectar tu app a una base de datos y autenticación reales.',
    contenido: {
      intro: `Supabase es una base de datos Postgres + auth + storage + todo lo que necesitas para una app real. Hablas con él con el SDK @supabase/supabase-js. Te quita la necesidad de montar backend.`,
      secciones: [
        {
          titulo: 'Crear el cliente',
          texto: `Necesitas dos cosas: la URL del proyecto y la "anon key" (pública). En SvelteKit las pones como variables PUBLIC_*.`,
          ejemplo: `// $lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);`
        },
        {
          titulo: 'select e insert',
          texto: `Las operaciones más comunes. select lee; insert crea. Hablas con tablas como si fueran objetos.`,
          ejemplo: `// Leer todo
const { data, error } = await supabase.from('posts').select('*');

// Leer con filtro
const { data: misPosts } = await supabase
  .from('posts')
  .select('id, title')
  .eq('autor', 'ana')
  .order('created_at', { ascending: false });

// Crear
const { error: insertErr } = await supabase
  .from('posts')
  .insert({ title: 'Nuevo', autor: 'ana' });`
        },
        {
          titulo: 'Auth con Magic Link',
          texto: `Una forma sencilla de login: el usuario pone su email, le llega un enlace, hace click y queda logueado. No hay password.`,
          ejemplo: `await supabase.auth.signInWithOtp({
  email: 'tu@email.com',
  options: {
    emailRedirectTo: 'https://miapp.com/auth/callback'
  }
});

// En /auth/callback:
const code = url.searchParams.get('code');
await supabase.auth.exchangeCodeForSession(code);`,
          nota: {
            tipo: 'warning',
            texto: 'Activa Row Level Security (RLS) en tus tablas desde el día 1. Sin RLS, cualquiera con tu anon key puede leer/escribir.'
          }
        }
      ],
      resumen: [
        'createClient(URL, ANON_KEY) crea el cliente Supabase.',
        '.from("tabla").select(...) / .insert(...) para CRUD básico.',
        '.eq, .order, .limit son los filtros más usados.',
        'auth.signInWithOtp envía Magic Link; activa RLS desde el inicio.'
      ]
    },
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'En `const codigo`, escribe el contenido de un archivo $lib/supabase.ts que importe createClient y las variables públicas, y exporte una const supabase.',
        plantilla: `// Día 27 - Ejercicio 1\nconst codigo = \`...\`;\n`
      },
      {
        numero: 2,
        enunciado:
          'En `const codigo`, escribe la línea (puede ocupar varias) para hacer un select de la columna "id, title" en la tabla "posts" filtrado por autor "ana" usando await.',
        plantilla: `// Día 27 - Ejercicio 2\nconst codigo = \`...\`;\n`
      },
      {
        numero: 3,
        enunciado:
          'En `const codigo`, escribe la llamada exacta a supabase.auth.signInWithOtp para enviar Magic Link al email "tu@email.com" con redirect a "https://miapp.com/auth/callback".',
        plantilla: `// Día 27 - Ejercicio 3\nconst codigo = \`...\`;\n`
      }
    ]
  },

  // ────────── EXAMEN SEMANA 4 ──────────
  {
    dia: 28,
    semana: 4,
    tipo: 'examen',
    titulo: 'Examen Semana 4: SvelteKit + Supabase',
    objetivo: 'Construir mentalmente una mini-app integradora.',
    instrucciones: `Cinco ejercicios que simulan construir una mini-app de "notas" con SvelteKit + Supabase. Cada uno cubre una pieza: ruta, layout, load, action y query. 4 de 5 para aprobar y desbloquear la última semana.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'En `const path` asigna la ruta de archivo para servir la URL /notas/[id] en SvelteKit.',
        plantilla: `// Examen Semana 4 - Ejercicio 1\nconst path = '';\n`
      },
      {
        numero: 2,
        enunciado:
          'En `const codigo`, escribe el contenido de un +layout.svelte mínimo que ponga un <nav> con enlaces a "/" y "/notas" y renderice los children dentro de <main>.',
        plantilla: `// Examen Semana 4 - Ejercicio 2\nconst codigo = \`...\`;\n`
      },
      {
        numero: 3,
        enunciado:
          'En `const codigo`, escribe un +page.server.ts con load tipado (PageServerLoad) que haga un select * de la tabla "notas" en supabase y devuelva { notas: data ?? [] }. Asume `import { supabase } from "$lib/supabase"`.',
        plantilla: `// Examen Semana 4 - Ejercicio 3\nconst codigo = \`...\`;\n`
      },
      {
        numero: 4,
        enunciado:
          'En `const codigo`, escribe un +page.server.ts con actions.crear que lea "titulo" del formData, haga un insert en "notas" con { titulo } y devuelva { ok: true }.',
        plantilla: `// Examen Semana 4 - Ejercicio 4\nconst codigo = \`...\`;\n`
      },
      {
        numero: 5,
        enunciado:
          'En `const codigo`, escribe el +page.svelte que muestre data.notas en un <ul> con {#each} y un <form method="POST" action="?/crear" use:enhance> con input name="titulo" y botón.',
        plantilla: `// Examen Semana 4 - Ejercicio 5\nconst codigo = \`...\`;\n`
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // SEMANA 5 — TYPESCRIPT, DEPLOY Y ENTREVISTAS
  // ═══════════════════════════════════════════════════════════════════
  {
    dia: 29,
    semana: 5,
    tipo: 'leccion',
    titulo: 'TypeScript exprés',
    objetivo: 'Leer y escribir tipos sin asustarse.',
    contenido: {
      intro: `TypeScript es JavaScript con tipos. No vas a aprenderlo entero en un día, pero sí lo justo para defender el código de tu proyecto y entender entrevistas.`,
      secciones: [
        {
          titulo: 'Tipos básicos',
          texto: `Los anotas con dos puntos. Hay primitivos (string, number, boolean), arrays, uniones (a | b), opcionales (?), y any (úsalo solo cuando no haya remedio).`,
          ejemplo: `let nombre: string = 'Ana';
let edad: number = 30;
let activo: boolean = true;
let tags: string[] = ['ts', 'js'];
let estado: 'pendiente' | 'hecho' = 'pendiente';
let email: string | null = null;

function saludar(n: string, mayuscula: boolean = false): string {
  return mayuscula ? \`HOLA \${n.toUpperCase()}\` : \`hola \${n}\`;
}`
        },
        {
          titulo: 'Interfaces y types',
          texto: `Sirven para nombrar la forma de un objeto. interface se usa más en clases; type es más versátil. En la práctica son casi intercambiables.`,
          ejemplo: `type Usuario = {
  id: number;
  nombre: string;
  email?: string;
  rol: 'admin' | 'user';
};

interface Producto {
  id: number;
  precio: number;
  nombre: string;
}

function crear(u: Usuario): Usuario {
  return u;
}`
        },
        {
          titulo: 'Generics (lo justo)',
          texto: `Generics son "tipos parametrizables". Se usan en funciones/clases que deben funcionar con muchos tipos sin perder seguridad.`,
          ejemplo: `function primero<T>(lista: T[]): T | undefined {
  return lista[0];
}

const n = primero([1, 2, 3]);      // number
const s = primero(['a', 'b']);     // string`,
          nota: {
            tipo: 'tip',
            texto: 'Para entrevistas junior basta con saber explicar qué es un generic y para qué sirve. No hace falta escribir librerías de tipos complejos.'
          }
        }
      ],
      resumen: [
        'Tipas con :tipo. Uniones con |, opcionales con ?.',
        'type y interface describen objetos.',
        'Generics: <T> hace una función reutilizable con tipos distintos.',
        'Evita any: úsalo solo si TS te derrota y tienes prisa.'
      ]
    },
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Tipa la función: declara `function area(base: number, altura: number): number` que devuelva base*altura. Llámala con (5, 3) y muestra el resultado.',
        plantilla: `// Día 29 - Ejercicio 1\n// Recuerda usar tipos.\n\n`
      },
      {
        numero: 2,
        enunciado:
          'Declara un type `Tarea = { id: number; texto: string; hecho: boolean }`. Crea un array `tareas: Tarea[]` con dos tareas y muéstralo.',
        plantilla: `// Día 29 - Ejercicio 2\n\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe una función genérica `ultimo<T>(arr: T[]): T | undefined` que devuelva el último elemento. Pruébala con un array de números y otro de strings.',
        plantilla: `// Día 29 - Ejercicio 3\n\n`
      }
    ]
  },

  {
    dia: 30,
    semana: 5,
    tipo: 'leccion',
    titulo: 'Variables de entorno y hooks.server.ts',
    objetivo: 'Manejar secretos y middleware en SvelteKit.',
    contenido: {
      intro: `Una app real tiene secretos (API keys) y suele necesitar lógica común para cada petición (autenticación, logging). En SvelteKit eso vive en $env y hooks.server.ts.`,
      secciones: [
        {
          titulo: 'Variables de entorno',
          texto: `Defines variables en .env. Las que empiezan por PUBLIC_ son accesibles desde el cliente; las demás SOLO desde el servidor. SvelteKit las importa con $env/static/public y $env/static/private.`,
          ejemplo: `# .env
PUBLIC_SUPABASE_URL=https://x.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJh...
GEMINI_API_KEY=AIzaSy...
ALLOWED_EMAILS=tu@email.com

// En código cliente o universal:
import { PUBLIC_SUPABASE_URL } from '$env/static/public';

// SOLO en código server:
import { GEMINI_API_KEY } from '$env/static/private';`,
          nota: {
            tipo: 'warning',
            texto: 'Nunca subas .env a git. Añádelo a .gitignore. En Vercel/Netlify las pones desde el panel de control.'
          }
        },
        {
          titulo: 'hooks.server.ts',
          texto: `Es un archivo que SvelteKit ejecuta en CADA petición antes de tu ruta. Útil para auth, logging, attach del cliente Supabase a locals, etc.`,
          ejemplo: `// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // Ejemplo: añadir info a event.locals para todas las rutas
  event.locals.user = null; // (en real, lo sacarías de la cookie)

  const response = await resolve(event);
  return response;
};`
        },
        {
          titulo: 'app.d.ts',
          texto: `Aquí tipas event.locals para que TypeScript sepa qué hay. Te lo agradecerá tu autocompletado.`,
          ejemplo: `// src/app.d.ts
declare global {
  namespace App {
    interface Locals {
      user: { id: string; email: string } | null;
    }
  }
}
export {};`
        }
      ],
      resumen: [
        'PUBLIC_* van al cliente; el resto SOLO al servidor.',
        '$env/static/public y $env/static/private para importarlas.',
        'hooks.server.ts intercepta TODAS las peticiones.',
        'event.locals te sirve para pasar info (usuario, supabase) a las rutas. Tipa en app.d.ts.'
      ]
    },
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'En `const archivo` asigna el string con el contenido de un .env de ejemplo con PUBLIC_API_URL y SECRET_TOKEN.',
        plantilla: `// Día 30 - Ejercicio 1\nconst archivo = \`...\`;\n`
      },
      {
        numero: 2,
        enunciado:
          'En `const codigo`, escribe un hooks.server.ts mínimo cuya handle añada event.locals.timestamp = new Date().toISOString() y luego llame a resolve(event).',
        plantilla: `// Día 30 - Ejercicio 2\nconst codigo = \`...\`;\n`
      },
      {
        numero: 3,
        enunciado:
          'En `const codigo`, escribe el contenido de un app.d.ts que tipe App.Locals.timestamp como string.',
        plantilla: `// Día 30 - Ejercicio 3\nconst codigo = \`...\`;\n`
      }
    ]
  },

  {
    dia: 31,
    semana: 5,
    tipo: 'leccion',
    titulo: 'Deploy a Vercel + README',
    objetivo: 'Subir tu app a internet y documentarla decentemente.',
    contenido: {
      intro: `Una web que solo corre en localhost no existe. Vercel hace el deploy a un dominio público con un par de clicks. Y un buen README es la portada de tu portfolio para un reclutador.`,
      secciones: [
        {
          titulo: 'Adaptador Vercel',
          texto: `SvelteKit necesita un "adapter" según dónde despliegas. Para Vercel, es @sveltejs/adapter-vercel. Suele venir preinstalado.`,
          ejemplo: `// svelte.config.js
import adapter from '@sveltejs/adapter-vercel';

export default {
  kit: {
    adapter: adapter()
  }
};`
        },
        {
          titulo: 'Pasos para deploy',
          texto: `Sube el repo a GitHub, conéctalo en vercel.com/new, configura las variables de entorno y pulsa Deploy. Cada git push hace un nuevo deploy automáticamente.`,
          ejemplo: `# Local
git add -A
git commit -m "ready for deploy"
git push

# Vercel
1. vercel.com/new → importar repo
2. Settings → Environment Variables → meter las del .env
3. Deploy
`,
          nota: {
            tipo: 'tip',
            texto: 'Antes del deploy ejecuta `npm run check` y `npm run build` en local. Si fallan ahí, en Vercel también fallarán.'
          }
        },
        {
          titulo: 'README mínimo decente',
          texto: `Para un proyecto de portfolio basta con: descripción de 1 línea, stack, screenshots, cómo correrlo en local, deploy.`,
          ejemplo: `# DevDays

Portal de estudio de 35 días para aprender JS + SvelteKit desde cero.

## Stack
- SvelteKit + TypeScript
- Tailwind CSS v4 + shadcn-svelte
- Supabase (auth + DB)
- OpenAI / Gemini (tutor IA)

## Local
1. cp .env.example .env y rellena las variables.
2. npm install
3. npm run dev

## Deploy
Vercel, push a main. Variables en panel de Vercel.`
        }
      ],
      resumen: [
        'Vercel detecta SvelteKit y construye solo.',
        'Variables de entorno → Settings → Environment Variables.',
        'Antes de deploy: npm run check + npm run build.',
        'README: descripción, stack, cómo correr, deploy.'
      ]
    },
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'En `const codigo`, escribe el contenido de un svelte.config.js que use adapter-vercel.',
        plantilla: `// Día 31 - Ejercicio 1\nconst codigo = \`...\`;\n`
      },
      {
        numero: 2,
        enunciado:
          'En `const pasos`, asigna un array de 4 strings con los pasos para deployar a Vercel en el orden correcto.',
        plantilla: `// Día 31 - Ejercicio 2\nconst pasos = [\n  // ...\n];\n`
      },
      {
        numero: 3,
        enunciado:
          'En `const readme`, escribe un README mínimo (string Markdown) con: título, descripción, stack en lista, sección Local con npm install + npm run dev.',
        plantilla: `// Día 31 - Ejercicio 3\nconst readme = \`...\`;\n`
      }
    ]
  },

  {
    dia: 32,
    semana: 5,
    tipo: 'leccion',
    titulo: 'Explicar tu stack en 2 minutos',
    objetivo: 'Tener un pitch técnico claro para entrevistas.',
    contenido: {
      intro: `En una entrevista te van a pedir: "cuéntame tu proyecto / tu stack". La diferencia entre sonar a junior espabilado y a junior perdido está en tener un pitch corto y bien estructurado.`,
      secciones: [
        {
          titulo: 'Estructura del pitch (1-2 min)',
          texto: `1) Qué es la app (1 frase). 2) Stack principal. 3) Por qué ese stack. 4) Algo que aprendiste construyéndola. 5) Próximo paso. No más de 2 minutos.`,
          ejemplo: `"DevDays es un portal de estudio de 35 días para aprender JS y SvelteKit. El usuario lee la lección, escribe código en un editor real y un tutor IA le corrige y le da pistas.

El stack es SvelteKit con TypeScript en el front, Supabase para auth y guardar el progreso, y OpenAI/Gemini para la corrección con fallback automático.

Elegí SvelteKit porque es muy rápido y la sintaxis con runes me deja escribir menos código que en React. Supabase me ahorra montar backend.

Lo más interesante de construirla fue el orquestador de IA con failover entre proveedores: cuando uno satura, salto al otro sin que el usuario lo note.

Ahora estoy ampliando con exámenes semanales y bloqueo de progresión."`
        },
        {
          titulo: 'Preguntas trampa que esperar',
          texto: `Te van a profundizar. Prepara respuestas cortas para: ¿por qué SvelteKit y no React/Next? ¿cómo manejas autenticación? ¿qué pasaría si esto tuviera 10.000 usuarios? ¿y los costes de IA? Si no tienes la respuesta, di "no lo he medido, pero lo investigaría haciendo X".`,
          nota: {
            tipo: 'tip',
            texto: 'No memorices el pitch palabra a palabra. Memoriza los 5 puntos de la estructura. Cada vez que lo cuentes saldrá distinto y será mejor.'
          }
        },
        {
          titulo: 'Lo que NO hacer',
          texto: `- No empieces explicando lo más técnico ("uso un orquestador con backoff"). Empieza por QUÉ hace la app.\n- No leas un papel.\n- No hables 10 minutos. 2 minutos máximo. Si quieren más, preguntarán.`
        }
      ],
      resumen: [
        'Estructura: qué hace + stack + por qué + lo aprendido + siguiente paso.',
        'Máximo 2 minutos. Si hay interés, preguntarán.',
        'Empieza por el QUÉ, no por el CÓMO técnico.',
        'Prepara respuestas a las preguntas trampa típicas.'
      ]
    },
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'En `const pitch`, escribe TU propio pitch siguiendo los 5 puntos (qué hace + stack + por qué + lo aprendido + siguiente paso). Mínimo 5 frases.',
        plantilla: `// Día 32 - Ejercicio 1\nconst pitch = \`\n1) Qué hace: ...\n2) Stack: ...\n3) Por qué ese stack: ...\n4) Aprendido: ...\n5) Siguiente paso: ...\n\`;\n`
      },
      {
        numero: 2,
        enunciado:
          'En `const respuesta`, prepara una respuesta corta (1-3 frases) a: "¿Por qué elegiste SvelteKit y no Next.js?".',
        plantilla: `// Día 32 - Ejercicio 2\nconst respuesta = \`...\`;\n`
      },
      {
        numero: 3,
        enunciado:
          'En `const respuesta`, prepara una respuesta corta a: "¿Cómo gestionas la autenticación en tu app?".',
        plantilla: `// Día 32 - Ejercicio 3\nconst respuesta = \`...\`;\n`
      }
    ]
  },

  {
    dia: 33,
    semana: 5,
    tipo: 'leccion',
    titulo: 'Top preguntas técnicas (JS + Svelte + Git)',
    objetivo: 'Tener listas las respuestas a lo que más te van a preguntar.',
    contenido: {
      intro: `No hay sorpresas en una entrevista junior: las preguntas se repiten en el 80% de los casos. Aquí tienes las clásicas y la idea clave para responderlas.`,
      secciones: [
        {
          titulo: 'JavaScript',
          texto: `1) Diferencia entre let, const y var → const fijo, let mutable, var scope de función (evítalo).\n2) ¿Qué es una closure? → Una función que recuerda variables del scope donde nació.\n3) ¿==  o ===? → Siempre ===. == hace conversiones raras.\n4) ¿Qué hace map/filter/reduce? → transforma, filtra, acumula. Devuelven nuevo array (excepto reduce, valor).\n5) ¿Diferencia entre Promise y async/await? → Mismo concepto, distinta sintaxis. async/await más legible con try/catch.`
        },
        {
          titulo: 'Svelte / SvelteKit',
          texto: `1) ¿Qué hace Svelte distinto a React? → Es compilador, no runtime. Menos bundle, sintaxis simple.\n2) ¿Qué son las runes de Svelte 5? → $state, $derived, $effect, $props. Sustituyen a let reactivos y $:.\n3) ¿Diferencia entre +page.ts y +page.server.ts? → ts corre en server+cliente, server.ts solo server (úsalo para secretos).\n4) ¿Cuándo usar load vs actions? → load para leer datos, actions para procesar formularios (POST).\n5) ¿Qué es hooks.server.ts? → Middleware que se ejecuta en cada request: auth, logging, locals.`
        },
        {
          titulo: 'Git',
          texto: `1) git init / add / commit / push → ciclo básico.\n2) git branch / checkout / merge → ramas y fusión.\n3) ¿Qué es un PR? → propuesta de cambios en GitHub/GitLab antes de mergear a main.\n4) git stash → guardar cambios temporales sin commitear.\n5) ¿Qué haces si hay conflictos? → abrir los archivos, decidir qué versión queda, marcar resueltos con git add y commitear.`,
          nota: {
            tipo: 'info',
            texto: 'No memorices respuestas literales. Memoriza el concepto en 1 frase y reformúlalo en tus palabras. Si dudas, di "no estoy 100% seguro, pero creo que...". Es mejor que inventarse algo y quedar pillado.'
          }
        }
      ],
      resumen: [
        'JS: closures, ===, métodos de array, async/await.',
        'Svelte 5: runes, página/server, hooks.',
        'Git: ciclo básico, ramas, PR, resolver conflictos.',
        'Mejor 1 frase clara que un párrafo borroso.'
      ]
    },
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'En `const respuesta`, contesta con tus palabras (2-3 frases) "¿Qué es una closure?".',
        plantilla: `// Día 33 - Ejercicio 1\nconst respuesta = \`...\`;\n`
      },
      {
        numero: 2,
        enunciado:
          'En `const respuesta`, contesta "¿Qué diferencia hay entre +page.ts y +page.server.ts en SvelteKit?".',
        plantilla: `// Día 33 - Ejercicio 2\nconst respuesta = \`...\`;\n`
      },
      {
        numero: 3,
        enunciado:
          'En `const pasos` asigna un array de strings con los comandos Git exactos para: 1) crear una rama nueva "feature", 2) hacer un commit, 3) subirla al remoto.',
        plantilla: `// Día 33 - Ejercicio 3\nconst pasos = [\n  // ...\n];\n`
      }
    ]
  },

  {
    dia: 34,
    semana: 5,
    tipo: 'leccion',
    titulo: 'Simulacro de entrevista (live coding)',
    objetivo: 'Practicar escribiendo código bajo presión.',
    contenido: {
      intro: `En una entrevista técnica te van a poner a escribir código en directo. La clave no es resolver el problema en silencio: es hablar lo que estás pensando.`,
      secciones: [
        {
          titulo: 'Cómo afrontar un ejercicio en vivo',
          texto: `1) Lee/escucha el enunciado entero. 2) Repítelo con tus palabras para confirmar. 3) Pregunta dudas (¿inputs negativos? ¿qué hago si está vacío?). 4) Plantea un enfoque ANTES de escribir. 5) Implementa hablando. 6) Prueba con un ejemplo. 7) Habla de qué optimizarías.`
        },
        {
          titulo: 'Problema típico',
          texto: `"Dado un array de números, devuelve uno nuevo con cada número multiplicado por 2, EXCEPTO los negativos, que se quedan iguales."`,
          ejemplo: `function transformar(nums) {
  return nums.map((n) => (n < 0 ? n : n * 2));
}

// Prueba
console.log(transformar([1, -2, 3, -4])); // [2, -2, 6, -4]`,
          nota: {
            tipo: 'tip',
            texto: 'Hablar mientras codeas demuestra cómo piensas. Aunque la solución no sea perfecta, mostrar el razonamiento clarito te puntúa muchísimo.'
          }
        },
        {
          titulo: 'Si te bloqueas',
          texto: `1) Di "déjame pensar 30 segundos". 2) Reformula el problema. 3) Empieza con un caso súper simple (un solo elemento, vacío). 4) Si sigues bloqueado, plantea fuerza bruta primero y di "después podríamos optimizar". Mucho mejor algo lento que pantalla en blanco.`
        }
      ],
      resumen: [
        'Confirma el enunciado y pregunta dudas antes de codear.',
        'Plantea el enfoque antes de escribir.',
        'Habla mientras codeas, demuestra cómo piensas.',
        'Si te bloqueas: caso simple → fuerza bruta → optimización después.'
      ]
    },
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe una función `invertirCadena(texto)` que devuelva el string al revés. Prueba con "hola".',
        plantilla: `// Día 34 - Ejercicio 1\nfunction invertirCadena(texto) {\n  // ...\n}\nconsole.log(invertirCadena('hola'));\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe `fizzBuzz(n)` que imprima del 1 a n: "Fizz" si múltiplo de 3, "Buzz" si de 5, "FizzBuzz" si de ambos. Si no, el número. Prueba con n=15.',
        plantilla: `// Día 34 - Ejercicio 2\nfunction fizzBuzz(n) {\n  // ...\n}\nfizzBuzz(15);\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe `contarPalabras(texto)` que devuelva un objeto con cuántas veces aparece cada palabra. Pista: split(" ") y reduce. Prueba con "hola mundo hola".',
        plantilla: `// Día 34 - Ejercicio 3\nfunction contarPalabras(texto) {\n  // ...\n}\nconsole.log(contarPalabras('hola mundo hola'));\n`
      }
    ]
  },

  // ────────── EXAMEN FINAL ──────────
  {
    dia: 35,
    semana: 5,
    tipo: 'examen',
    titulo: 'Examen Final: repaso global',
    objetivo: 'Demostrar que estás listo para una entrevista junior.',
    instrucciones: `Cinco ejercicios mezclando todo el temario: JS moderno, async, Svelte 5, SvelteKit y entrevista. Con 4 de 5 correctos completas el curso.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Dado `const items = [{nombre:"A",precio:10,stock:0},{nombre:"B",precio:5,stock:3},{nombre:"C",precio:8,stock:1}]`, devuelve con filter+map un array de nombres SOLO de los items con stock > 0.',
        plantilla: `// Examen Final - Ejercicio 1\nconst items = [\n  { nombre: 'A', precio: 10, stock: 0 },\n  { nombre: 'B', precio: 5, stock: 3 },\n  { nombre: 'C', precio: 8, stock: 1 }\n];\n\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe una función async `cargarUsuarios()` que haga fetch a "https://jsonplaceholder.typicode.com/users", maneje errores con try/catch y devuelva los nombres (array de strings) o [] si falla.',
        plantilla: `// Examen Final - Ejercicio 2\n\n`
      },
      {
        numero: 3,
        enunciado:
          'En `const codigo`, escribe el <script> de un componente Svelte 5 que use $state para `cantidad` y $derived para `iva` (cantidad * 0.21).',
        plantilla: `// Examen Final - Ejercicio 3\nconst codigo = \`...\`;\n`
      },
      {
        numero: 4,
        enunciado:
          'En `const codigo`, escribe el contenido de un +page.server.ts con load que devuelva el timestamp actual { ahora } y actions.guardar que lea "nota" del formData y devuelva { ok: true, nota }.',
        plantilla: `// Examen Final - Ejercicio 4\nconst codigo = \`...\`;\n`
      },
      {
        numero: 5,
        enunciado:
          'En `const respuesta`, escribe en 2-4 frases tu pitch personal: explicas qué hace tu proyecto, el stack y la decisión técnica más interesante.',
        plantilla: `// Examen Final - Ejercicio 5\nconst respuesta = \`...\`;\n`
      }
    ]
  }
];
