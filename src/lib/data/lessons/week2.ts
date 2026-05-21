import type { Leccion } from '$lib/types/lesson';
import { sec, ej, contenidoLab } from './_helpers';

export const week2: Leccion[] = [
  {
    dia: 8,
    semana: 2,
    tipo: 'leccion',
    titulo: 'Objetos: agrupar propiedades',
    objetivo: 'Modelar entidades (usuario, producto, pedido) con objetos literales y acceder a sus propiedades.',
    contenido: contenidoLab(
      'dia-8-objetos',
      'Laboratorio: ficha de producto como objeto.',
      ['Card de producto', 'Actualizar propiedad', 'Destructuring']
    ),
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
          seccionRef: 'Card de producto',
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
          seccionRef: 'Actualizar propiedad',
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
          seccionRef: 'Destructuring',
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
    contenido: contenidoLab(
      'dia-9-bucles',
      'Laboratorio: tablas y chips desde arrays.',
      ['Generar filas', 'Chips de categorías', 'includes en carrito']
    ),
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
          seccionRef: 'Generar filas',
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
          seccionRef: 'Chips de categorías',
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
          seccionRef: 'includes en carrito',
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
    contenido: contenidoLab(
      'dia-10-closures',
      'Laboratorio: closures y factory de descuento.',
      ['Contador privado', 'Factory descuento', 'Precio final']
    ),
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
          seccionRef: 'Contador privado',
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
          seccionRef: 'Factory descuento',
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
          seccionRef: 'Precio final',
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
    contenido: contenidoLab(
      'dia-11-promesas',
      'Laboratorio: estados de Promise en checkout.',
      ['Simular carga', 'Timeout', 'Encadenar']
    ),
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
          seccionRef: 'Simular carga',
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
          seccionRef: 'Timeout',
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
          seccionRef: 'Encadenar',
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
    contenido: contenidoLab(
      'dia-12-async',
      'Laboratorio: async/await y estados de fetch.',
      ['Cargar catálogo', 'Skeleton', 'Retry']
    ),
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
          seccionRef: 'Cargar catálogo',
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
          seccionRef: 'Skeleton',
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
          seccionRef: 'Retry',
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
    contenido: contenidoLab(
      'dia-13-dom',
      'Laboratorio: eventos y localStorage simulado.',
      ['Tema claro/oscuro', 'onclick', 'Carrito guardado']
    ),
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
          seccionRef: 'Tema claro/oscuro',
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
          seccionRef: 'onclick',
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
          seccionRef: 'Carrito guardado',
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
    repasoVisual: 'repaso-s2',
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
