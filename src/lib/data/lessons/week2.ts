import type { Leccion } from '$lib/types/lesson';
import { sec, ej } from './_helpers';

export const week2: Leccion[] = [
  {
    dia: 8,
    semana: 2,
    tipo: 'leccion',
    titulo: 'Objetos: agrupar propiedades',
    objetivo: 'Modelar entidades (usuario, producto, pedido) con objetos literales y acceder a sus propiedades.',
    contenido: {
      intro: `Un objeto literal agrupa propiedades relacionadas bajo un solo identificador. Es la forma estándar en JavaScript de representar registros JSON, respuestas de API y estado de componentes antes de pasarlo a Svelte.`,
      secciones: [
        sec(
          'Objeto literal',
          'Como una fila de una tabla: varias columnas (propiedades) en un mismo registro.',
          'Modelar usuarios, productos o configuración sin variables sueltas por cada campo.',
          'Un objeto literal usa pares clave:valor con `const`. Accedes con notación de punto (`obj.prop`) o corchetes (`obj["prop"]`). `console.log(producto.nombre)` muestra un campo concreto.',
          `const producto = { nombre: 'mesa', precio: 99 };\nconsole.log(producto.nombre);`,
          [
            'Use el objeto `producto` de la plantilla.',
            'Acceda a `nombre` con `.nombre` o corchetes.',
            'Muestre el valor con `console.log`.'
          ]
        ),
        sec(
          'Destructuring',
          'Sacar columnas concretas del registro en variables nombradas de un solo paso.',
          'Extraer campos de respuestas API, props o objetos de formulario sin repetir `obj.campo` muchas veces.',
          'La destructuring de objetos crea variables locales: `const { nombre, rol } = usuario`. Luego `console.log(nombre)` y `console.log(rol)` muestran cada campo.',
          `const usuario = { nombre: 'Luis', rol: 'admin' };\nconst { nombre, rol } = usuario;\nconsole.log(nombre);\nconsole.log(rol);`,
          [
            'Aplique `const { nombre, rol } = usuario` sobre el objeto dado.',
            'Escriba en consola el valor de `nombre`.',
            'Escriba en consola el valor de `rol`.'
          ]
        ),
        sec(
          'Spread operator',
          'Copiar el registro y sobrescribir solo las claves que cambian.',
          'Actualizar estado inmutablemente (nuevo objeto en lugar de mutar el original), patrón habitual antes de asignar a `$state` o enviar a una API.',
          'El spread `...obj` copia propiedades en un objeto nuevo: `const actualizado = { ...cliente, ciudad: "Madrid" }`. `console.log(actualizado.ciudad)` comprueba la copia sin mutar el original.',
          `const cliente = { nombre: 'Ana', ciudad: 'Valencia' };\nconst actualizado = { ...cliente, ciudad: 'Madrid' };\nconsole.log(actualizado.ciudad);`,
          [
            'Cree `actualizado` con `{ ...cliente, ciudad: "Madrid" }`.',
            'No modifique `cliente` directamente.',
            'Muestre `actualizado.ciudad` con `console.log`.'
          ]
        )
      ],
      resumen: [
        'Objeto literal = propiedades clave:valor en un registro.',
        'Destructuring = extraer propiedades a variables.',
        'Spread = copiar y mezclar objetos sin mutar el original.'
      ]
    },
    ejercicios: [
      ej(
        1,
        'Objeto producto',
        {
          planteamiento:
            'Se dispone de un registro de producto representado mediante un objeto literal con las propiedades `nombre` y `precio`. Se requiere acceder a uno de sus campos y mostrarlo en consola.',
          requisitos: [
            'Utilice el objeto `producto` ya declarado en la plantilla.',
            'Acceda a la propiedad `nombre` mediante notación de punto o corchetes.',
            'Escriba en consola el valor obtenido.'
          ],
          salidaEsperada: 'mesa',
          seccionRef: 'Objeto literal',
          notas: 'Siga los pasos de la sección «Objeto literal» (`producto.nombre` y `console.log`).'
        },
        ['Objeto con campos', 'Accede a nombre'],
        `const producto = { nombre: 'mesa', precio: 99 };\n// Muestre producto.nombre\n\n`
      ),
      ej(
        2,
        'Destructuring de usuario',
        {
          planteamiento:
            'Un objeto `usuario` agrupa el nombre y el rol de una cuenta. Mediante destructuring de objetos se pueden extraer ambas propiedades en variables independientes.',
          requisitos: [
            'Aplique destructuring sobre `usuario` para obtener `nombre` y `rol`.',
            'Escriba en consola el valor de `nombre`.',
            'Escriba en consola el valor de `rol`.'
          ],
          salidaEsperada: 'Luis y admin (dos líneas o valores visibles)',
          seccionRef: 'Destructuring',
          notas: 'Véase la sección «Destructuring»: patrón `const { nombre, rol } = usuario`.'
        },
        ['Destructuring', 'Dos valores visibles'],
        `const usuario = { nombre: 'Luis', rol: 'admin' };\n// const { nombre, rol } = usuario;\n\n`
      ),
      ej(
        3,
        'Copia con spread',
        {
          planteamiento:
            'Se desea actualizar únicamente la ciudad de un cliente sin modificar el objeto original. El operador spread permite crear una copia superficial y sobrescribir propiedades concretas.',
          requisitos: [
            'Cree un nuevo objeto `actualizado` a partir de `cliente` mediante spread (`...`).',
            'Asigne la propiedad `ciudad` con el valor `"Madrid"` en el objeto resultante.',
            'Escriba en consola `actualizado.ciudad`.'
          ],
          salidaEsperada: 'Madrid',
          seccionRef: 'Spread operator',
          notas: 'Repita el ejemplo de «Spread operator»: `{ ...cliente, ciudad: "Madrid" }`.'
        },
        ['Spread', 'Ciudad distinta en copia'],
        `const cliente = { nombre: 'Ana', ciudad: 'Valencia' };\n// const actualizado = { ...cliente, ciudad: 'Madrid' };\n\n`
      )
    ]
  },
  {
    dia: 9,
    semana: 2,
    tipo: 'leccion',
    titulo: 'Bucles y métodos de array',
    objetivo: 'Elegir entre for, for...of y map según si necesitas índice, iteración simple o transformación de lista.',
    contenido: {
      intro: `Los arrays son listas ordenadas en JavaScript. Puedes iterar con bucles clásicos o con métodos de orden superior (map). En frontends modernos, map suele ser la opción más legible para transformar datos antes de renderizar.`,
      secciones: [
        sec(
          'for clásico',
          'Recorrer por índice numérico de 0 a length - 1.',
          'Cuando necesitas la posición (i), recorrer al revés o salir con break/continue.',
          'El bucle `for (let i = 0; i < arr.length; i++)` accede a `arr[i]` y al índice `i`. Puedes acumular: `let suma = 0; for (let i = 0; i < vals.length; i++) { suma += vals[i]; }` y luego `console.log(suma)`.',
          `const vals = [1, 2, 3];\nlet suma = 0;\nfor (let i = 0; i < vals.length; i++) {\n  suma += vals[i];\n}\nconsole.log(suma);`,
          [
            'Use el array `vals` de la plantilla.',
            'Declare `let suma = 0` y recorra con `for (let i = 0; i < vals.length; i++)`.',
            'Sume cada `vals[i]` y muestre el total con `console.log(suma)`.'
          ]
        ),
        sec(
          'Bucle for-of',
          'Recorrer cada elemento del iterable sin manejar el índice.',
          'Recorrer arrays, strings o NodeLists cuando solo te importa el valor actual.',
          '`for (const fruta of frutas)` asigna cada elemento a `fruta`. Dentro del bucle, `console.log(fruta)` imprime cada valor sin índice explícito.',
          `const frutas = ['manzana', 'pera'];\nfor (const fruta of frutas) {\n  console.log(fruta);\n}`,
          [
            'Use el array `frutas` de la plantilla.',
            'Recorra con `for (const fruta of frutas)`.',
            'Escriba en consola cada elemento.'
          ]
        ),
        sec(
          'map',
          'Transformar cada elemento y obtener un array nuevo del mismo tamaño.',
          'Preparar datos para `{#each}` en Svelte o duplicar valores antes de pintar listas.',
          '`n.map(x => x * 2)` devuelve un array nuevo donde cada número se multiplica por 2. `console.log(duplicados)` muestra el resultado.',
          `const n = [1, 2, 3];\nconst duplicados = n.map((x) => x * 2);\nconsole.log(duplicados);`,
          [
            'Use el array `n` de la plantilla.',
            'Aplique `map` para multiplicar cada elemento por 2.',
            'Escriba en consola el array resultante.'
          ]
        )
      ],
      resumen: [
        'for = índice y control fino del recorrido.',
        'for-of = cada valor del iterable.',
        'map = transformar array → nuevo array.'
      ]
    },
    ejercicios: [
      ej(
        1,
        'Suma con for clásico',
        {
          planteamiento:
            'Se plantea calcular la suma total de los elementos de un array numérico empleando un bucle `for` con índice.',
          requisitos: [
            'Utilice el array `vals` de la plantilla.',
            'Recorra con `for (let i = 0; i < vals.length; i++)` y acumule en una variable.',
            'Escriba en consola el total obtenido.'
          ],
          salidaEsperada: '6',
          seccionRef: 'for clásico',
          notas: 'Copie el acumulador de la sección «for clásico» (`let suma` y `suma += vals[i]`).'
        },
        ['Suma total 6'],
        `const vals = [1, 2, 3];\n// let suma = 0; for (let i = 0; ...) { ... }\n\n`
      ),
      ej(
        2,
        'Iterar con for...of',
        {
          planteamiento:
            'Se dispone de un array de cadenas que representa una lista de elementos. Se requiere recorrer cada elemento e imprimirlo en consola sin utilizar un índice numérico explícito.',
          requisitos: [
            'Utilice el array `frutas` proporcionado en la plantilla.',
            'Recorra el array con la sintaxis `for (const fruta of frutas)`.',
            'Escriba en consola cada elemento del array.'
          ],
          salidaEsperada: 'manzana y pera (una línea por elemento)',
          seccionRef: 'Bucle for-of',
          notas: 'Véase la sección «Bucle for-of»: patrón `for (const fruta of frutas) { console.log(fruta); }`.'
        },
        ['Recorre array', 'Imprime elementos'],
        `const frutas = ['manzana', 'pera'];\n// for (const fruta of frutas) { ... }\n\n`
      ),
      ej(
        3,
        'map para duplicar',
        {
          planteamiento:
            'Dado un array de números enteros, se desea obtener un nuevo array donde cada valor sea el doble del original. El método `map` transforma cada elemento y devuelve un array del mismo tamaño.',
          requisitos: [
            'Utilice el array `n` declarado en la plantilla.',
            'Aplique `map` para multiplicar cada elemento por 2.',
            'Escriba en consola el array resultante.'
          ],
          salidaEsperada: '[2, 4, 6]',
          seccionRef: 'map',
          notas: 'Siga el ejemplo de la sección «map»: `n.map(x => x * 2)`.'
        },
        ['map x2'],
        `const n = [1, 2, 3];\n// const duplicados = n.map(x => x * 2);\n\n`
      )
    ]
  },
  {
    dia: 10,
    semana: 2,
    tipo: 'leccion',
    titulo: 'Scope y closures',
    objetivo: 'Entender lexical scope y closures: funciones que conservan variables del entorno donde se crearon.',
    contenido: {
      intro: `El scope define qué variables ve cada bloque o función. Una closure es una función que sigue accediendo a variables de su scope externo aunque esa función se ejecute más tarde. Patrón base para factories, contadores y configuración. En Svelte 5 usas runes, no this.`,
      secciones: [
        sec(
          'Scope (ámbito léxico)',
          'Cada función es una habitación: solo ve lo de adentro y lo declarado fuera que aún exista.',
          'Evitar colisiones de nombres y fugas de variables globales en módulos y componentes.',
          'Las variables `const` y `let` tienen scope de bloque. Una función puede leer variables del exterior: `function leer() { return externa; }` donde `const externa = 1` está fuera. `console.log(leer())` muestra el valor capturado del scope padre.',
          `const externa = 42;\nfunction leer() {\n  return externa;\n}\nconsole.log(leer());`,
          [
            'Use la variable `externa` ya declarada en la plantilla.',
            'Complete `leer` para que devuelva `externa` con `return`.',
            'Invoque `leer()` y muestre el resultado con `console.log`.'
          ]
        ),
        sec(
          'Closure',
          'Una función que “lleva” variables del sitio donde nació.',
          'Contadores, memoización, callbacks con configuración y patrones de factory en librerías.',
          'Si una función interna referencia una variable del exterior, esa referencia persiste: `function crear() { let n = 0; return () => ++n; }`. Cada llamada a la función devuelta comparte el mismo `n` encapsulado.',
          `function crearContador() {\n  let n = 0;\n  return () => ++n;\n}\nconst siguiente = crearContador();\nconsole.log(siguiente());`,
          [
            'Complete `crearContador` para devolver una función que incremente `n`.',
            'Guarde la función devuelta en una variable (por ejemplo `siguiente`).',
            'Invóquela al menos tres veces y muestre el último valor con `console.log`.'
          ]
        ),
        sec(
          'this (referencia breve)',
          'En JS clásico, this apunta al contexto de llamada; en Svelte casi no lo usas.',
          'Conocerlo evita confusiones al leer código ajeno; no es requisito en este bootcamp.',
          '`this` depende de cómo invocas la función. En módulos ES y Svelte 5 el estado vive en variables y runes (`$state`), no en `this`. Redacte en un template string por qué prefiere runes frente a `this`.',
          `const respuesta = \`En Svelte 5 uso $state en lugar de depender de this en el componente.\`;\nconsole.log(respuesta);`,
          [
            'Declare `respuesta` como template string de dos frases.',
            'Mencione `this` y runes o variables locales.',
            'Escriba en consola `respuesta` con `console.log`.'
          ]
        )
      ],
      resumen: [
        'Scope = visibilidad de variables por bloque/función.',
        'Closure = función + variables del entorno capturadas.',
        'this = contexto de llamada; poco relevante en Svelte 5.'
      ]
    },
    ejercicios: [
      ej(
        1,
        'Leer variable externa',
        {
          planteamiento:
            'Una función interna puede acceder a variables declaradas en su scope exterior (ámbito léxico). Se pide leer un valor externo y mostrarlo en consola.',
          requisitos: [
            'Utilice `const externa = 42` de la plantilla.',
            'Complete `leer` para que devuelva el valor de `externa`.',
            'Invoque `leer()` y escriba en consola el resultado.'
          ],
          salidaEsperada: '42',
          seccionRef: 'Scope (ámbito léxico)',
          notas: 'Véase «Scope (ámbito léxico)»: la función devuelve una variable del scope padre.'
        },
        ['Función lee externa', 'Imprime 42'],
        `const externa = 42;\nfunction leer() {\n  // return externa;\n}\n// console.log(leer());\n\n`
      ),
      ej(
        2,
        'Factory contador',
        {
          planteamiento:
            'Se desea implementar un patrón factory que devuelve una función interna capaz de incrementar un contador privado. Cada invocación de la función devuelta debe aumentar el valor encapsulado en la closure.',
          requisitos: [
            'Complete `crearContador` para que devuelva una función que incremente un contador interno.',
            'Asigne la función devuelta a una variable (por ejemplo `siguiente`).',
            'Invoque esa función al menos tres veces y escriba en consola el resultado de la última llamada.'
          ],
          salidaEsperada: '3 (o secuencia 1, 2, 3 visible en consola)',
          seccionRef: 'Closure',
          notas: 'Siga el patrón de la sección «Closure»: `let n = 0; return () => ++n`.'
        },
        ['Closure contador'],
        `function crearContador() {\n  // let n = 0; return () => ++n;\n}\n\n`
      ),
      ej(
        3,
        'this vs runes',
        {
          planteamiento:
            'En código Svelte moderno el estado no depende de `this`. Se solicita expresar con sus propias palabras la diferencia frente al estilo clásico de componentes.',
          requisitos: [
            'Declare la constante `respuesta` con un template string de dos frases.',
            'Mencione `this` y el uso de runes o variables locales en Svelte 5.',
            'Escriba en consola el contenido de `respuesta`.'
          ],
          salidaEsperada: 'Texto que mencione this y runes o variables',
          seccionRef: 'this (referencia breve)',
          notas: 'Consulte la sección «this (referencia breve)»; no hace falta código ejecutable más allá del template string.'
        },
        ['Texto sobre this y runes'],
        `const respuesta = \`...\`; // Dos frases: this vs $state\nconsole.log(respuesta);`
      )
    ]
  },
  {
    dia: 11,
    semana: 2,
    tipo: 'leccion',
    titulo: 'Promesas (Promise)',
    objetivo: 'Representar operaciones asíncronas con Promise, then y catch antes de pasar a async/await.',
    contenido: {
      intro: `JavaScript no bloquea el hilo principal mientras espera red o disco. Una Promise representa un valor futuro: pending hasta resolverse (fulfilled) o fallar (rejected). fetch, timers y APIs de Supabase devuelven promesas.`,
      secciones: [
        sec(
          '¿Por qué asincronía?',
          'El navegador sigue respondiendo mientras espera la respuesta del servidor.',
          'Cargar JSON, autenticar o llamar a la IA sin congelar la interfaz.',
          'Las operaciones I/O (red, base de datos) tardan milisegundos o segundos. `fetch(url)` devuelve una Promise: el programa sigue y el callback se ejecuta cuando llega la respuesta. Sin asincronía, la página quedaría bloqueada.',
          `// fetch devuelve una Promise; el hilo no se bloquea\nfetch('https://ejemplo.com/datos');`,
          [
            'Escriba un comentario de dos líneas en el archivo.',
            'Explique por qué `fetch` no congela la interfaz.',
            'Mencione que `fetch` devuelve una Promise.'
          ]
        ),
        sec(
          'then / catch',
          'then encadena el éxito; catch captura el rechazo.',
          'Encadenar transformaciones de respuesta HTTP y manejar errores de red o 4xx/5xx.',
          '`promise.then(valor => { ... })` ejecuta si resolve; `.catch(err => { ... })` si reject. Ejemplo: `new Promise((resolve) => resolve("hola")).then(v => console.log(v))` o `new Promise((_, reject) => reject("error")).catch(e => console.log(e))`.',
          `const p = new Promise((resolve) => {\n  resolve('hola');\n});\np.then((valor) => console.log(valor));`,
          [
            'Complete el constructor invocando `resolve("hola")` o `reject("error")`.',
            'Encadene `.then` o `.catch` según el enunciado.',
            'Escriba en consola el valor o el error capturado.'
          ]
        ),
        sec(
          'Encadenar then',
          'Varios then transforman el valor resuelto antes de consumirlo.',
          'Normalizar cadenas, parsear JSON en pasos o preparar datos para la UI.',
          'Parta de `Promise.resolve("hola")`, encadene `.then(s => s.toUpperCase())` y luego `.then(s => console.log(s))` para obtener `HOLA` en consola.',
          `Promise.resolve('hola')\n  .then((s) => s.toUpperCase())\n  .then((s) => console.log(s));`,
          [
            'Use `Promise.resolve("hola")` como punto de partida.',
            'Encadene un `then` que aplique `toUpperCase()`.',
            'Muestre el resultado final con `console.log` en otro `then`.'
          ]
        )
      ],
      resumen: [
        'Promise = valor futuro con estados pending/fulfilled/rejected.',
        'then = manejar éxito y encadenar.',
        'catch = manejar error o rechazo.'
      ]
    },
    ejercicios: [
      ej(
        1,
        'Comentario sobre fetch',
        {
          planteamiento:
            'Antes de escribir promesas a mano, conviene entender por qué el código de red es asíncrono. Documente en un comentario el papel de `fetch` y las Promise.',
          requisitos: [
            'Escriba un comentario de dos líneas en el archivo.',
            'Indique que `fetch` devuelve una Promise.',
            'Explique que el hilo principal no queda bloqueado mientras espera la red.'
          ],
          salidaEsperada: 'Comentario que mencione fetch, Promise y no bloqueo',
          seccionRef: '¿Por qué asincronía?',
          notas: 'Véase la sección «¿Por qué asincronía?» sobre fetch y el event loop.'
        },
        ['Comentario sobre fetch y Promise'],
        `// Explique: fetch devuelve una Promise y no bloquea la UI\n\n`
      ),
      ej(
        2,
        'Resolver y catch',
        {
          planteamiento:
            'Se requiere construir una promesa que se resuelva o rechace dentro del ejecutor y consumir el resultado con `then` o `catch`.',
          requisitos: [
            'En la variante A: complete `p` con `resolve("hola")` y encadene `.then` para imprimir el valor.',
            'En la variante B: invoque `reject("error")` y use `.catch` para imprimir el mensaje.',
            'Elija una variante y deje visible el resultado en consola.'
          ],
          salidaEsperada: 'hola o error según la variante elegida',
          seccionRef: 'then / catch',
          notas: 'Copie los patrones de la sección «then / catch» (`resolve` + `then` o `reject` + `catch`).'
        },
        ['then o catch con salida en consola'],
        `const p = new Promise((resolve, reject) => {\n  // resolve('hola'); o reject('error');\n});\n// p.then(...) o p.catch(...);\n\n`
      ),
      ej(
        3,
        'Encadenar transformación',
        {
          planteamiento:
            'El encadenamiento de `then` permite transformar el valor resuelto antes de consumirlo. Se parte de una promesa ya resuelta con una cadena en minúsculas.',
          requisitos: [
            'Parta de `Promise.resolve("hola")`.',
            'Encadene un `then` que convierta el valor a mayúsculas (`toUpperCase`).',
            'Escriba en consola el resultado final del encadenamiento.'
          ],
          salidaEsperada: 'HOLA',
          seccionRef: 'Encadenar then',
          notas: 'Siga el ejemplo de «Encadenar then»: `.then(s => s.toUpperCase())`.'
        },
        ['then transforma'],
        `Promise.resolve('hola')\n  // .then(s => s.toUpperCase())\n  // .then(s => console.log(s));\n\n`
      )
    ]
  },
  {
    dia: 12,
    semana: 2,
    tipo: 'leccion',
    titulo: 'async/await y fetch',
    objetivo: 'Escribir flujo asíncrono lineal con async/await, try/catch y fetch para consumir APIs REST.',
    contenido: {
      intro: `async/await es azúcar sintáctico sobre promesas: lees el código en orden como funciones síncronas. fetch realiza peticiones HTTP GET/POST y devuelve un Response; .json() parsea el cuerpo a objeto JavaScript.`,
      secciones: [
        sec(
          'async / await',
          'async marca una función que devuelve Promise; await pausa hasta que resuelva.',
          'Funciones load en SvelteKit, handlers de formulario y llamadas a APIs en +page.ts o en el cliente.',
          '`async function main() { const n = await Promise.resolve(42); console.log(n); }` — `await` solo dentro de `async`. Cada `await` devuelve el valor resuelto.',
          `async function main() {\n  const n = await Promise.resolve(42);\n  console.log(n);\n}\nmain();`,
          [
            'Declare `main` como `async function`.',
            'Use `await` sobre `Promise.resolve(42)`.',
            'Muestre el valor con `console.log` e invoque `main()`.'
          ]
        ),
        sec(
          'try / catch',
          'try envuelve código que puede lanzar; catch recibe el error.',
          'Manejar fallos de red, JSON inválido o respuestas no ok sin romper la app.',
          '`try { ... } catch { console.log("error"); }` dentro de una función `async` captura excepciones y rechazos de `await`.',
          `async function probar() {\n  try {\n    throw new Error('fallo');\n  } catch {\n    console.log('error');\n  }\n}\nprobar();`,
          [
            'Complete `probar` como función `async`.',
            'Envuelva en `try` una operación que lance o rechace.',
            'En `catch`, escriba `console.log("error")` e invoque `probar()`.'
          ]
        ),
        sec(
          'fetch + JSON',
          'fetch devuelve Response; .json() convierte el body a objeto/array.',
          'Consumir REST públicos, Supabase REST o tu propia API en SvelteKit.',
          '`const res = await fetch(url); const data = await res.json(); console.log(data.title);` — revisa `res.ok` antes de confiar en `data`.',
          `async function cargar() {\n  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');\n  const data = await res.json();\n  console.log(data.title);\n}\ncargar();`,
          [
            'Complete `cargar` como función `async`.',
            'Haga `fetch` a la URL del enunciado y parsee con `.json()`.',
            'Escriba en consola la propiedad `title`.'
          ]
        )
      ],
      resumen: [
        'async/await = flujo asíncrono legible en orden.',
        'try/catch = capturar errores de await o parseo.',
        'fetch = petición HTTP; .json() = parsear cuerpo.'
      ]
    },
    ejercicios: [
      ej(
        1,
        'Await básico',
        {
          planteamiento:
            'La sintaxis `async/await` permite escribir código asíncrono con apariencia secuencial. Una función marcada como `async` puede usar `await` para obtener el valor de una promesa resuelta.',
          requisitos: [
            'Complete la función `main` declarada como `async`.',
            'Utilice `await` sobre `Promise.resolve(42)`.',
            'Escriba en consola el valor obtenido e invoque `main()`.'
          ],
          salidaEsperada: '42',
          seccionRef: 'async / await',
          notas: 'Véase «async / await»: `const n = await Promise.resolve(42);`.'
        },
        ['async await', '42 visible'],
        `async function main() {\n  // const n = await Promise.resolve(42);\n  // console.log(n);\n}\nmain();`
      ),
      ej(
        2,
        'try catch',
        {
          planteamiento:
            'Las excepciones y los rechazos de promesas pueden capturarse con `try/catch` dentro de funciones `async`. Se plantea un escenario donde la ejecución puede fallar y debe manejarse el error.',
          requisitos: [
            'Complete `probar` como función `async`.',
            'Envuelva en `try` una operación que lance o rechace (por ejemplo división inválida o acceso a propiedad inexistente).',
            'En `catch`, escriba en consola la cadena `"error"`.',
            'Invoque `probar()` al final del script.'
          ],
          salidaEsperada: 'error',
          seccionRef: 'try / catch',
          notas: 'Repita el patrón de la sección «try / catch» con `console.log("error")` en el bloque catch.'
        },
        ['try y catch'],
        `async function probar() {\n  // try { ... } catch { console.log('error'); }\n}\nprobar();`
      ),
      ej(
        3,
        'fetch público',
        {
          planteamiento:
            'Se desea consumir un recurso HTTP público mediante `fetch`, parsear la respuesta JSON y mostrar un campo del objeto resultante.',
          requisitos: [
            'Complete `cargar` como función `async`.',
            'Realice `fetch` a `https://jsonplaceholder.typicode.com/posts/1`.',
            'Parsee el cuerpo con `.json()` y escriba en consola la propiedad `title`.'
          ],
          salidaEsperada: 'title del post (cadena no vacía) o manejo de error documentado',
          seccionRef: 'fetch + JSON',
          notas: 'Siga «fetch + JSON»: `await fetch`, luego `await res.json()` y `console.log(data.title)`.'
        },
        ['fetch y json', 'title visible'],
        `async function cargar() {\n  // const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');\n  // const data = await res.json();\n  // console.log(data.title);\n}\ncargar();`
      )
    ]
  },
  {
    dia: 13,
    semana: 2,
    tipo: 'leccion',
    titulo: 'DOM, eventos y localStorage',
    objetivo: 'Conocer el DOM del navegador, eventos y almacenamiento local; Svelte abstrae la mayor parte del DOM manual.',
    contenido: {
      intro: `El DOM (Document Object Model) es el árbol de nodos HTML que el navegador expone a JavaScript. Svelte actualiza el DOM por ti con reactividad; aun así conviene saber querySelector, addEventListener y localStorage para depurar y entender APIs del navegador.`,
      secciones: [
        sec(
          'Seleccionar y mutar nodos',
          'querySelector devuelve el primer nodo que coincide con un selector CSS.',
          'Scripts vanilla, tests e2e o migraciones; en componentes Svelte usas bindings y `{#if}`, no DOM imperativo.',
          '`document.querySelector("h1")` devuelve un Element o null. Puedes cambiar `textContent` para actualizar el texto. En Svelte el markup del `.svelte` es la fuente de verdad.',
          `// document.querySelector('h1').textContent = 'Hola';`,
          [
            'Escriba un comentario de una o dos líneas.',
            'Indique el selector CSS para un `<h1>`.',
            'Nombre la propiedad para cambiar el texto (`textContent`).'
          ]
        ),
        sec(
          'Eventos del navegador',
          'addEventListener registra un callback cuando ocurre click, input, submit, etc.',
          'Entender cómo funcionan on:click en Svelte (delegación y handlers) y formularios nativos.',
          '`elemento.addEventListener("click", handler)` ejecuta `handler` al hacer click. En Svelte escribes `onclick` o `on:click` en el template en lugar de imperativo.',
          `const respuesta = \`addEventListener registra una función cuando ocurre un evento como click.\`;\nconsole.log(respuesta);`,
          [
            'Declare `respuesta` con un template string de una frase.',
            'Explique qué hace `addEventListener` (tipo de evento y callback).',
            'Escriba en consola `respuesta`.'
          ]
        ),
        sec(
          'localStorage',
          'API key-value persistente en el origen (mismo protocolo + host + puerto).',
          'Guardar tema, borrador o preferencias del usuario entre sesiones (no datos sensibles).',
          '`localStorage.setItem("clave", "valor")` guarda strings; `getItem` lee o devuelve null. `console.log(localStorage.getItem("tema"))` comprueba la lectura.',
          `localStorage.setItem('tema', 'oscuro');\nconsole.log(localStorage.getItem('tema'));`,
          [
            'Use `localStorage.setItem("tema", "oscuro")`.',
            'Lea con `localStorage.getItem("tema")`.',
            'Muestre el valor leído con `console.log`.'
          ]
        )
      ],
      resumen: [
        'DOM = árbol de nodos HTML manipulable con JS.',
        'addEventListener = reaccionar a eventos del usuario.',
        'localStorage = persistencia string en el navegador.'
      ]
    },
    ejercicios: [
      ej(
        1,
        'querySelector en comentario',
        {
          planteamiento:
            'En aplicaciones Svelte el DOM suele gestionarse de forma declarativa; no obstante, conviene conocer la API imperativa del navegador. Se solicita describir por escrito cómo seleccionar y modificar un encabezado.',
          requisitos: [
            'Escriba un comentario de una o dos líneas en el archivo.',
            'Indique qué selector CSS utilizaría con `document.querySelector`.',
            'Explique qué propiedad modificaría para cambiar el texto de un `<h1>`.'
          ],
          salidaEsperada: 'Comentario que mencione querySelector y textContent (o equivalente)',
          seccionRef: 'Seleccionar y mutar nodos',
          notas: 'Véase «Seleccionar y mutar nodos»: `querySelector` y `textContent`.'
        },
        ['Menciona querySelector o selección'],
        `// Describa: document.querySelector('h1') y .textContent = '...'\n\n`
      ),
      ej(
        2,
        'addEventListener en texto',
        {
          planteamiento:
            'Los eventos del navegador permiten ejecutar código cuando el usuario interactúa con la página. Se solicita definir con precisión el propósito del método `addEventListener`.',
          requisitos: [
            'Declare la constante `respuesta` con una frase en template string.',
            'Describa qué hace `addEventListener` (tipo de evento y función callback).',
            'Escriba en consola el contenido de `respuesta`.'
          ],
          salidaEsperada: 'Texto que explique registrar un listener para un evento',
          seccionRef: 'Eventos del navegador',
          notas: 'Consulte la sección «Eventos del navegador» sobre `addEventListener`.'
        },
        ['Texto sobre evento'],
        `const respuesta = \`...\`; // Una frase sobre addEventListener\nconsole.log(respuesta);`
      ),
      ej(
        3,
        'Persistir tema',
        {
          planteamiento:
            'La API `localStorage` permite almacenar pares clave-valor en el navegador de forma persistente entre sesiones. Se plantea guardar una preferencia de tema y recuperarla inmediatamente.',
          requisitos: [
            'Utilice `localStorage.setItem` con la clave `"tema"` y el valor `"oscuro"`.',
            'Lea el valor almacenado con `localStorage.getItem("tema")`.',
            'Escriba en consola el valor leído.'
          ],
          salidaEsperada: 'oscuro',
          seccionRef: 'localStorage',
          notas: 'Siga el ejemplo de «localStorage»: `setItem` y `getItem` con `console.log`.'
        },
        ['setItem y getItem'],
        `localStorage.setItem('tema', 'oscuro');\nconsole.log(localStorage.getItem('tema'));`
      )
    ]
  },
  {
    dia: 14,
    semana: 2,
    tipo: 'examen',
    titulo: 'Repaso Semana 2: objetos y asincronía',
    objetivo: 'Demostrar objetos, iteración, closures, promesas/async y APIs del navegador (sin exigir sintaxis perfecta).',
    instrucciones: `Cinco retos. La corrección evalúa el efecto del código (salida, datos, comportamiento), no cada punto y coma.`,
    ejercicios: [
      ej(
        1,
        'Objeto con total',
        {
          planteamiento:
            'Se dispone de un registro con identificador y importe total. Debe accederse a la propiedad numérica y mostrarse en consola como parte del repaso de objetos literales.',
          requisitos: [
            'Utilice el objeto `pedido` de la plantilla.',
            'Acceda a la propiedad `total`.',
            'Escriba en consola el valor de `total`.'
          ],
          salidaEsperada: '50',
          seccionRef: 'Repaso semana 2',
          notas: 'Repaso días 8–13: objeto literal y notación de punto (día 8).'
        },
        ['objeto pedido'],
        `const pedido = { id: 1, total: 50 };\n// console.log(pedido.total);\n\n`
      ),
      ej(
        2,
        'async con await',
        {
          planteamiento:
            'Como parte del repaso de asincronía, se requiere obtener un valor numérico mediante `await` dentro de una función `async` y mostrarlo en consola.',
          requisitos: [
            'Complete la función `f` como `async`.',
            'Utilice `await` sobre `Promise.resolve(100)`.',
            'Escriba en consola el valor obtenido e invoque `f()`.'
          ],
          salidaEsperada: '100',
          seccionRef: 'Repaso semana 2',
          notas: 'Repaso días 11–12: async/await y Promise (días 11 y 12).'
        },
        ['async await'],
        `async function f() {\n  // const n = await Promise.resolve(100);\n  // console.log(n);\n}\nf();`
      ),
      ej(
        3,
        'map en precios',
        {
          planteamiento:
            'Dado un array de precios unitarios, debe obtenerse un nuevo array con cada valor duplicado mediante el método `map`.',
          requisitos: [
            'Utilice el array `p` de la plantilla.',
            'Aplique `map` para multiplicar cada elemento por 2.',
            'Escriba en consola el array resultante.'
          ],
          salidaEsperada: '[10, 20]',
          seccionRef: 'Repaso semana 2',
          notas: 'Repaso día 9: método map sobre arrays.'
        },
        ['map'],
        `const p = [5, 10];\n// const doble = p.map(x => x * 2);\n\n`
      ),
      ej(
        4,
        'Closure de saludo',
        {
          planteamiento:
            'Se plantea una función factory que recibe una cadena de saludo y devuelve otra función capaz de recordar dicho valor gracias a una closure.',
          requisitos: [
            'Complete `crear` para que reciba `s` y devuelva una función sin argumentos.',
            'La función devuelta debe retornar el saludo capturado.',
            'Cree una instancia, invóquela y escriba en consola el resultado.'
          ],
          salidaEsperada: 'El saludo pasado al factory (cadena no vacía)',
          seccionRef: 'Repaso semana 2',
          notas: 'Repaso día 10: closure y factory (día 10).'
        },
        ['closure'],
        `function crear(s) {\n  // return () => s;\n}\n\n`
      ),
      ej(
        5,
        'localStorage usuario',
        {
          planteamiento:
            'Como cierre del repaso semanal, debe persistirse un nombre de usuario en `localStorage` y recuperarse para verificar la lectura correcta.',
          requisitos: [
            'Guarde en `localStorage` la clave `"user"` con un nombre de su elección.',
            'Lea el valor con `getItem("user")`.',
            'Escriba en consola el nombre recuperado.'
          ],
          salidaEsperada: 'El nombre guardado (cadena no vacía)',
          seccionRef: 'Repaso semana 2',
          notas: 'Repaso día 13: localStorage setItem y getItem.'
        },
        ['localStorage'],
        `localStorage.setItem('user', 'Moi');\n// console.log(localStorage.getItem('user'));\n\n`
      )
    ]
  }
];
