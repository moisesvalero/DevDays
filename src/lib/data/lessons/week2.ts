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
          'Un objeto literal usa pares clave:valor. Accedes con notación de punto (obj.prop) o corchetes (obj["prop"]). const cliente = { nombre: "Ana", edad: 30 } agrupa datos que viajan juntos en funciones y en fetch.',
          'cliente.nombre'
        ),
        sec(
          'Destructuring',
          'Sacar columnas concretas del registro en variables nombradas de un solo paso.',
          'Extraer campos de respuestas API, props o objetos de formulario sin repetir obj.campo muchas veces.',
          'La destructuring de objetos crea variables locales desde las claves: const { nombre, edad } = cliente. Útil al desestructurar parámetros de función o el resultado de await res.json().',
          'const { nombre, edad } = cliente;'
        ),
        sec(
          'Spread operator',
          'Copiar el registro y sobrescribir solo las claves que cambian.',
          'Actualizar estado inmutablemente (nuevo objeto en lugar de mutar el original), patrón habitual antes de asignar a $state o enviar a una API.',
          'El spread ...obj copia propiedades en un objeto nuevo. const nuevo = { ...cliente, ciudad: "Madrid" } mantiene el resto y reemplaza solo ciudad. Evita efectos secundarios al pasar datos entre funciones.',
          'const nuevo = { ...cliente, ciudad: "Madrid" };'
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
          notas: 'Consulte la sección «Objeto literal».'
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
          notas: 'Consulte la sección «Destructuring».'
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
          notas: 'Consulte la sección «Spread operator».'
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
    objetivo: 'Elegir entre for, for...of, while y map según si necesitas índice, iteración simple o transformación de lista.',
    contenido: {
      intro: `Los arrays son listas ordenadas en JavaScript. Puedes iterar con bucles clásicos o con métodos de orden superior (map, filter, reduce). En frontends modernos, map suele ser la opción más legible para transformar datos antes de renderizar.`,
      secciones: [
        sec(
          'for clásico',
          'Recorrer por índice numérico de 0 a length - 1.',
          'Cuando necesitas la posición (i), recorrer al revés o salir con break/continue.',
          'for (let i = 0; i < arr.length; i++) accede a arr[i] y al índice i. Útil en algoritmos que comparan elementos vecinos o recorren matrices. En UI declarativa (Svelte) lo usarás menos que map.',
          'for (let i = 0; i < arr.length; i++) { ... }'
        ),
        sec(
          'for...of',
          'Recorrer cada elemento del iterable sin manejar el índice.',
          'Recorrer arrays, strings o NodeLists cuando solo te importa el valor actual.',
          'for (const item of lista) asigna cada elemento a item. Más legible que for con índice cuando no necesitas i. Funciona con cualquier iterable compatible.',
          'for (const item of lista) { ... }'
        ),
        sec(
          'while',
          'Repetir mientras una condición booleana sea true.',
          'Colas, lectura hasta agotar datos o bucles cuya longitud no conoces de antemano.',
          'while (condicion) ejecuta el bloque mientras condicion sea truthy. Cuidado con bucles infinitos si la condición nunca pasa a false. Útil para procesar colas: while (cola.length > 0) { ... }.',
          'while (cola.length > 0) { ... }'
        ),
        sec(
          '¿Cuándo cada uno?',
          'map cuando transformas toda la lista; for cuando la lógica paso a paso no encaja en un método.',
          'Preparar datos para {#each} en Svelte o para pintar listas en cualquier framework.',
          'Usa map cuando devuelves un array nuevo del mismo tamaño (por ejemplo duplicar números). Usa filter para quedarte con un subconjunto y reduce para un único acumulado. Elige la herramienta que exprese mejor la intención; la corrección acepta equivalentes con el mismo efecto.',
          'Elige lo que entiendas; la IA acepta equivalentes.'
        )
      ],
      resumen: [
        'for = índice y control fino del recorrido.',
        'for...of = cada valor del iterable.',
        'while = repetir hasta que la condición falle.',
        'map = transformar array → nuevo array.'
      ]
    },
    ejercicios: [
      ej(
        1,
        'Iterar con for...of',
        {
          planteamiento:
            'Se dispone de un array de cadenas que representa una lista de elementos. Se requiere recorrer cada elemento e imprimirlo en consola sin utilizar un índice numérico explícito.',
          requisitos: [
            'Utilice el array `frutas` proporcionado en la plantilla.',
            'Recorra el array con un bucle `for...of`.',
            'Escriba en consola cada elemento del array.'
          ],
          salidaEsperada: 'manzana y pera (una línea por elemento)',
          notas: 'Consulte la sección «for...of».'
        },
        ['Recorre array', 'Imprime elementos'],
        `const frutas = ['manzana', 'pera'];\n// for (const fruta of frutas) { ... }\n\n`
      ),
      ej(
        2,
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
          notas: 'Consulte la sección «¿Cuándo cada uno?».'
        },
        ['map x2'],
        `const n = [1, 2, 3];\n// const duplicados = n.map(x => x * 2);\n\n`
      ),
      ej(
        3,
        'Acumular con bucle',
        {
          planteamiento:
            'Se plantea calcular la suma total de los elementos de un array numérico. Puede resolverse con un bucle acumulador (`for`, `for...of` o `while`) o con el método `reduce`.',
          requisitos: [
            'Utilice el array `vals` de la plantilla.',
            'Calcule la suma de todos sus elementos.',
            'Escriba en consola el total obtenido.'
          ],
          salidaEsperada: '6',
          notas: 'Se aceptan `for`, `for...of`, `while` o `reduce` con el mismo resultado.'
        },
        ['Suma total 6'],
        `const vals = [1, 2, 3];\n// Acumule la suma e imprímala\n\n`
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
          'const y let tienen scope de bloque; var tiene scope de función (evítalo). Una función interna puede leer variables del scope padre mientras la closure siga viva. const global = 1; function f() { const local = 2; } — local no existe fuera de f.',
          'const global = 1;\nfunction f() { const local = 2; }'
        ),
        sec(
          'Closure',
          'Una función que “lleva” variables del sitio donde nació.',
          'Contadores, memoización, callbacks con configuración y patrones de factory en librerías.',
          'Si una función interna referencia una variable del exterior, esa referencia persiste: function crear() { let n = 0; return () => ++n; }. Cada llamada a la función devuelta comparte el mismo n encapsulado.',
          'function crear() { let n = 0; return () => ++n; }'
        ),
        sec(
          'this (referencia breve)',
          'En JS clásico, this apunta al contexto de llamada; en Svelte casi no lo usas.',
          'Conocerlo evita confusiones al leer código ajeno; no es requisito en este bootcamp.',
          'this depende de cómo invocas la función (objeto, call, bind). En módulos ES y Svelte 5 el estado vive en variables y runes ($state), no en this. Si aparece en tutoriales antiguos, puedes ignorarlo por ahora.',
          '// En Svelte 5 usas runes, no this'
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
          notas: 'Consulte la sección «Closure».'
        },
        ['Closure contador'],
        `function crearContador() {\n  // let n = 0; return () => ++n;\n}\n\n`
      ),
      ej(
        2,
        'Factory multiplicador',
        {
          planteamiento:
            'Una función de orden superior puede recibir un factor numérico y devolver otra función que multiplique cualquier argumento por dicho factor. El factor queda capturado en la closure de la función interna.',
          requisitos: [
            'Complete `crearMultiplicador` para que reciba `factor` y devuelva una función multiplicadora.',
            'Cree una instancia con factor `5` (por ejemplo `porCinco`).',
            'Invoque la función resultante con el argumento `2` y escriba en consola el producto.'
          ],
          salidaEsperada: '10',
          notas: 'Consulte la sección «Closure».'
        },
        ['Closure con factor'],
        `function crearMultiplicador(factor) {\n  // return (n) => n * factor;\n}\n\n`
      ),
      ej(
        3,
        'Definición en texto',
        {
          planteamiento:
            'Además de implementar closures en código, se solicita expresar con sus propias palabras el concepto de closure en JavaScript. La respuesta debe redactarse en prosa breve.',
          requisitos: [
            'Declare la constante `respuesta` con un template string de dos frases.',
            'Explique qué es una closure y qué relación tiene con el entorno léxico.',
            'Escriba en consola el contenido de `respuesta`.'
          ],
          salidaEsperada: 'Texto que mencione entorno, recuerda o variables capturadas',
          notas: 'No se evalúa sintaxis de código ejecutable; basta la explicación en `respuesta`.'
        },
        ['Texto con idea de closure'],
        `const respuesta = \`...\`; // Dos frases sobre closure\nconsole.log(respuesta);`
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
          'Las operaciones I/O (red, base de datos, archivos) tardan milisegundos o segundos. El event loop encola callbacks cuando la promesa termina. Sin esto, toda la página quedaría bloqueada en cada fetch.',
          'fetch y APIs usan promesas.'
        ),
        sec(
          'then / catch',
          'then encadena el éxito; catch captura el rechazo.',
          'Encadenar transformaciones de respuesta HTTP y manejar errores de red o 4xx/5xx.',
          'promise.then(valor => { ... }) ejecuta si resolve; .catch(err => { ... }) si reject. Puedes encadenar: fetch(url).then(r => r.json()).then(data => ...).catch(e => console.error(e)).',
          'fetch(url).then(r => r.json()).catch(e => console.log(e));'
        ),
        sec(
          'Estados de una Promise',
          'pending → fulfilled o rejected; como un pedido en curso, entregado o cancelado.',
          'Razonar sobre loaders, spinners y mensajes de error en la UI.',
          'Al crear new Promise((resolve, reject) => ...) empieza en pending. resolve(valor) pasa a fulfilled; reject(error) a rejected. Solo importa el flujo mental; los nombres exactos los verás en DevTools.',
          ''
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
        'Resolver manualmente',
        {
          planteamiento:
            'Se requiere construir una promesa que se resuelva de forma síncrona dentro del ejecutor y consumir su valor mediante el método `then`. Este patrón ilustra el estado fulfilled de una Promise.',
          requisitos: [
            'Complete el constructor de `p` invocando `resolve` con la cadena `"hola"`.',
            'Encadene `.then` para recibir el valor resuelto.',
            'Escriba en consola el valor recibido en el callback de `then`.'
          ],
          salidaEsperada: 'hola',
          notas: 'Consulte la sección «then / catch».'
        },
        ['Promise resolve', 'then imprime'],
        `const p = new Promise((resolve) => {\n  // resolve('hola');\n});\n// p.then(valor => console.log(valor));\n\n`
      ),
      ej(
        2,
        'Rechazar y catch',
        {
          planteamiento:
            'Cuando una operación asíncrona falla, la promesa pasa al estado rejected. El método `catch` permite capturar el error y reaccionar sin interrumpir el hilo principal.',
          requisitos: [
            'Complete el constructor de `p` invocando `reject` con un mensaje de error.',
            'Encadene `.catch` para manejar el rechazo.',
            'Escriba en consola el mensaje de error capturado.'
          ],
          salidaEsperada: 'error (o el mensaje que haya pasado a reject)',
          notas: 'Consulte la sección «then / catch».'
        },
        ['reject y catch'],
        `const p = new Promise((_, reject) => {\n  // reject('error');\n});\n// p.catch(err => console.log(err));\n\n`
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
          notas: 'Consulte la sección «then / catch».'
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
          'async function cargar() { const res = await fetch(url); } — await solo dentro de async (o top-level en módulos). Cada await devuelve el valor resuelto o lanza si la promesa rechaza.',
          'async function cargar() { const r = await fetch(url); }'
        ),
        sec(
          'try / catch',
          'try envuelve código que puede lanzar; catch recibe el error.',
          'Manejar fallos de red, JSON inválido o respuestas no ok sin romper la app.',
          'try { const data = await res.json(); } catch (e) { ... } captura excepciones síncronas y rechazos de await. Combínalo con if (!res.ok) para errores HTTP.',
          'try { ... } catch (e) { ... }'
        ),
        sec(
          'fetch + JSON',
          'fetch devuelve Response; .json() convierte el body a objeto/array.',
          'Consumir REST públicos, Supabase REST o tu propia API en SvelteKit.',
          'const res = await fetch(url); const data = await res.json(); — revisa res.ok antes de confiar en data. Las APIs suelen responder application/json compatible con objetos literales de JS.',
          'const data = await res.json();'
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
          notas: 'Consulte la sección «async / await».'
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
          notas: 'Consulte la sección «try / catch».'
        },
        ['try y catch'],
        `async function probar() {\n  // try { ... } catch { console.log('error'); }\n}\nprobar();`
      ),
      ej(
        3,
        'fetch público',
        {
          planteamiento:
            'Se desea consumir un recurso HTTP público mediante `fetch`, parsear la respuesta JSON y mostrar un campo del objeto resultante. Si no hay conectividad, puede documentarse el manejo en un comentario.',
          requisitos: [
            'Complete `cargar` como función `async`.',
            'Realice `fetch` a `https://jsonplaceholder.typicode.com/posts/1`.',
            'Parsee el cuerpo con `.json()` y escriba en consola la propiedad `title`.',
            'Si no hay red, indique en un comentario cómo capturaría el fallo con `try/catch`.'
          ],
          salidaEsperada: 'title del post (cadena no vacía) o manejo de error documentado',
          notas: 'Consulte la sección «fetch + JSON».'
        },
        ['fetch o try', 'datos o error'],
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
          'Scripts vanilla, tests e2e o migraciones; en componentes Svelte usas bindings y {#if}, no DOM imperativo.',
          'document.querySelector("h1") devuelve un Element o null. Puedes cambiar textContent, classList o innerHTML. En Svelte el markup del .svelte es la fuente de verdad; manipular el DOM a mano puede pelear con el framework.',
          '// document.querySelector("h1").textContent = "Hola";'
        ),
        sec(
          'Eventos del navegador',
          'addEventListener registra un callback cuando ocurre click, input, submit, etc.',
          'Entender cómo funcionan on:click en Svelte (delegación y handlers) y formularios nativos.',
          'elemento.addEventListener("click", handler) ejecuta handler en la fase de bubbling (por defecto). removeEventListener limpia el listener. En Svelte escribes onclick o on:click en el template en lugar de imperativo.',
          '// btn.addEventListener("click", () => ...)'
        ),
        sec(
          'localStorage',
          'API key-value persistente en el origen (mismo protocolo + host + puerto).',
          'Guardar tema, borrador o preferencias del usuario entre sesiones (no datos sensibles).',
          'localStorage.setItem("clave", "valor") serializa strings; getItem lee o devuelve null. No guardes tokens secretos: es accesible desde JS en la página. Para auth real usa cookies httpOnly o sesión Supabase.',
          'localStorage.setItem("clave", "valor");'
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
          notas: 'Consulte la sección «Seleccionar y mutar nodos».'
        },
        ['Menciona querySelector o selección'],
        `// Describa: document.querySelector('h1') y .textContent = '...'\n\n`
      ),
      ej(
        2,
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
          notas: 'Consulte la sección «localStorage».'
        },
        ['setItem y getItem'],
        `localStorage.setItem('tema', 'oscuro');\nconsole.log(localStorage.getItem('tema'));`
      ),
      ej(
        3,
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
          notas: 'Consulte la sección «Eventos del navegador».'
        },
        ['Texto sobre evento'],
        `const respuesta = \`...\`; // Una frase sobre addEventListener\nconsole.log(respuesta);`
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
          salidaEsperada: '50'
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
          salidaEsperada: '100'
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
          salidaEsperada: '[10, 20]'
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
          salidaEsperada: 'El saludo pasado al factory (cadena no vacía)'
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
          salidaEsperada: 'El nombre guardado (cadena no vacía)'
        },
        ['localStorage'],
        `localStorage.setItem('user', 'Moi');\n// console.log(localStorage.getItem('user'));\n\n`
      )
    ]
  }
];
