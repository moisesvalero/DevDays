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
        'Registro de producto.',
        'Objeto producto con nombre y precio; muestra nombre.',
        ['Muestra nombre'],
        ['Objeto con campos', 'Accede a nombre'],
        `const producto = { nombre: 'mesa', precio: 99 };\n\n`
      ),
      ej(
        2,
        'Desestructurar usuario.',
        'Destructuring de usuario con nombre y rol; muestra ambos.',
        ['Muestra nombre y rol'],
        ['Destructuring', 'Dos valores visibles'],
        `const usuario = { nombre: 'Luis', rol: 'admin' };\n\n`
      ),
      ej(
        3,
        'Copia inmutable.',
        'Copia cliente y cambia solo ciudad; muestra ciudad nueva.',
        ['Ciudad actualizada'],
        ['Spread', 'Ciudad distinta en copia'],
        `const cliente = { nombre: 'Ana', ciudad: 'Valencia' };\n\n`
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
        'Iterar frutas.',
        'Imprime cada fruta de un array con for...of.',
        ['Cada fruta impresa'],
        ['Recorre array', 'Imprime elementos'],
        `const frutas = ['manzana', 'pera'];\n\n`
      ),
      ej(
        2,
        'map para duplicar.',
        'Duplica números [1,2,3] con map.',
        ['[2,4,6]'],
        ['map x2'],
        `const n = [1, 2, 3];\n\n`
      ),
      ej(
        3,
        'Acumular con bucle.',
        'Suma [1,2,3] con for o reduce.',
        ['6'],
        ['Suma total 6'],
        `const vals = [1, 2, 3];\n\n`
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
        'Factory contador.',
        'Función que devuelve otra que suma 1 cada vez; llama 3 veces.',
        ['1,2,3 o acumulado visible'],
        ['Closure contador'],
        `function crearContador() {\n}\n\n`
      ),
      ej(
        2,
        'Factory multiplicador.',
        'crearMultiplicador(5) devuelve función que multiplica por 5.',
        ['10 si pasas 2'],
        ['Closure con factor'],
        `function crearMultiplicador(factor) {\n}\n\n`
      ),
      ej(
        3,
        'Definición en texto.',
        'Variable respuesta: en 2 frases qué es una closure.',
        ['Menciona recuerda/entorno'],
        ['Texto con idea de closure'],
        `const respuesta = \`...\`;\nconsole.log(respuesta);`
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
        'Resolver manualmente.',
        'Crea Promise que resuelve con "hola" y muestra en then.',
        ['Muestra hola'],
        ['Promise resolve', 'then imprime'],
        `const p = new Promise((resolve) => {\n});\n\n`
      ),
      ej(
        2,
        'Rechazar y catch.',
        'Promesa que rechaza y catch muestra mensaje.',
        ['Muestra error'],
        ['reject y catch'],
        `const p = new Promise((_, reject) => {\n});\n\n`
      ),
      ej(
        3,
        'Encadenar transformación.',
        'then que transforma "hola" a "HOLA".',
        ['HOLA'],
        ['then transforma'],
        `Promise.resolve('hola').then(...);\n\n`
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
        'Await básico.',
        'async que await Promise.resolve(42) y muestra 42.',
        ['42'],
        ['async await', '42 visible'],
        `async function main() {\n}\nmain();`
      ),
      ej(
        2,
        'try catch.',
        'try divide 10/0 o acceso fallido; catch muestra "error".',
        ['Muestra error'],
        ['try y catch'],
        `async function probar() {\n}\nprobar();`
      ),
      ej(
        3,
        'fetch público.',
        'fetch a jsonplaceholder post 1 y muestra title (o explica en comentario si no hay red).',
        ['title o manejo error'],
        ['fetch o try', 'datos o error'],
        `async function cargar() {\n}\ncargar();`
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
        'querySelector en comentario.',
        'Escribe en comentario qué haría querySelector para cambiar un h1.',
        ['Comentario explica'],
        ['Menciona querySelector o selección'],
        `// Si tuviera un h1 en la página...\n\n`
      ),
      ej(
        2,
        'Persistir tema.',
        'Guarda clave "tema" valor "oscuro" y léela.',
        ['Muestra oscuro'],
        ['setItem y getItem'],
        `localStorage.setItem('tema', 'oscuro');\nconsole.log(localStorage.getItem('tema'));`
      ),
      ej(
        3,
        'addEventListener en texto.',
        'respuesta: una frase qué hace addEventListener.',
        ['Explica escuchar evento'],
        ['Texto sobre evento'],
        `const respuesta = \`...\`;\nconsole.log(respuesta);`
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
        'Objeto pedido.',
        'Objeto pedido id y total; muestra total.',
        ['total visible'],
        ['objeto pedido'],
        `const pedido = { id: 1, total: 50 };\n\n`
      ),
      ej(
        2,
        'async con await.',
        'async muestra 100 tras await Promise.resolve(100).',
        ['100'],
        ['async await'],
        `async function f() {}\nf();`
      ),
      ej(
        3,
        'map en precios.',
        'Duplica precios [5,10] con map.',
        ['[10,20]'],
        ['map'],
        `const p = [5, 10];\n\n`
      ),
      ej(
        4,
        'Closure de saludo.',
        'Función que recuerda saludo y lo devuelve.',
        ['saludo'],
        ['closure'],
        `function crear(s) {}\n\n`
      ),
      ej(
        5,
        'localStorage usuario.',
        'Guarda y lee nombre usuario.',
        ['nombre leído'],
        ['localStorage'],
        `localStorage.setItem('user', 'Moi');\n\n`
      )
    ]
  }
];
