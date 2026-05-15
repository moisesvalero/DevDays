import type { Leccion } from '$lib/types/lesson';
import { sec, ej } from './_helpers';

export const week2: Leccion[] = [
  {
    dia: 8,
    semana: 2,
    tipo: 'leccion',
    titulo: 'Fichas de cliente: objetos',
    objetivo: 'Un objeto agrupa datos que van juntos, como una ficha en el archivador.',
    contenido: {
      intro: `Hasta ahora cajas sueltas. Ahora una ficha con nombre, teléfono y ciudad juntos: eso es un objeto.`,
      secciones: [
        sec('Objeto básico', 'Ficha con campos escritos a mano.', 'Agrupar datos relacionados en apps reales (usuario, producto).', 'const cliente = { nombre: "Ana", edad: 30 };', 'cliente.nombre'),
        sec('Destructuring', 'Sacar campos de la ficha de un golpe.', 'No repetir cliente.nombre diez veces.', 'const { nombre, edad } = cliente;'),
        sec('Spread', 'Copiar ficha y cambiar solo un campo.', 'Actualizar datos sin romper el original.', 'const nuevo = { ...cliente, ciudad: "Madrid" };')
      ],
      resumen: ['Objeto = ficha.', 'Destructuring = sacar campos.', 'Spread = copiar y mezclar.']
    },
    ejercicios: [
      ej(1, 'Ficha producto.', 'Objeto producto con nombre y precio; muestra nombre.', ['Muestra nombre'], ['Objeto con campos', 'Accede a nombre'], `const producto = { nombre: 'mesa', precio: 99 };\n\n`),
      ej(2, 'Sacar datos.', 'Destructuring de usuario con nombre y rol; muestra ambos.', ['Muestra nombre y rol'], ['Destructuring', 'Dos valores visibles'], `const usuario = { nombre: 'Luis', rol: 'admin' };\n\n`),
      ej(3, 'Copia con cambio.', 'Copia cliente y cambia solo ciudad; muestra ciudad nueva.', ['Ciudad actualizada'], ['Spread', 'Ciudad distinta en copia'], `const cliente = { nombre: 'Ana', ciudad: 'Valencia' };\n\n`)
    ]
  },
  {
    dia: 9,
    semana: 2,
    tipo: 'leccion',
    titulo: 'Recorrer a mano o con map',
    objetivo: 'Cuándo un bucle manual y cuándo métodos de lista.',
    contenido: {
      intro: `A veces recorres la lista pieza a pieza (for). A veces le dices al ayudante “transforma todas” (map). Misma idea, distinta herramienta.`,
      secciones: [
        sec('for clásico', 'Recorrer estantería contando posición.', 'Control total del índice.', 'for (let i = 0; i < arr.length; i++) { ... }'),
        sec('for...of', 'Coger cada elemento sin contar.', 'Más legible cuando no necesitas índice.', 'for (const item of lista) { ... }'),
        sec('while', 'Seguir mientras quede trabajo.', 'Cola de tareas hasta vaciar.', 'while (cola.length > 0) { ... }'),
        sec('¿Cuándo cada uno?', 'map/filter cuando transformas lista entera; for cuando lógica rara paso a paso.', 'En SvelteKit usarás más map que for.', 'Elige lo que entiendas; la IA acepta equivalentes.')
      ],
      resumen: ['for = índice.', 'for...of = cada elemento.', 'while = hasta condición.', 'map = atajo habitual.']
    },
    ejercicios: [
      ej(1, 'Lista con for.', 'Imprime cada fruta de un array con for...of.', ['Cada fruta impresa'], ['Recorre array', 'Imprime elementos'], `const frutas = ['manzana', 'pera'];\n\n`),
      ej(2, 'Misma idea con map.', 'Duplica números [1,2,3] con map.', ['[2,4,6]'], ['map x2'], `const n = [1, 2, 3];\n\n`),
      ej(3, 'Suma con bucle.', 'Suma [1,2,3] con for o reduce.', ['6'], ['Suma total 6'], `const vals = [1, 2, 3];\n\n`)
    ]
  },
  {
    dia: 10,
    semana: 2,
    tipo: 'leccion',
    titulo: 'La herramienta que recuerda el taller',
    objetivo: 'Closure: función que recuerda datos de donde nació.',
    contenido: {
      intro: `A veces una función “recuerda” un valor de fuera, como un aprendiz que recuerda la medida del primer corte. Eso es closure. Olvida "this" por ahora: en Svelte casi no lo necesitas.`,
      secciones: [
        sec('Scope', 'Variables visibles según la habitación donde las creaste.', 'Evitar mezclar nombres globales.', 'const global = 1;\nfunction f() { const local = 2; }'),
        sec('Closure', 'Función interna que usa variable del exterior.', 'Contadores, configuración, factories.', 'function crear() { let n = 0; return () => ++n; }'),
        sec('this (casi nada hoy)', 'En otros frameworks importa más. Aquí: si te sale, bien; si no, sigue.', 'No es examen de this.', '// En Svelte 5 usas runes, no this')
      ],
      resumen: ['Scope = quién ve qué.', 'Closure = recuerda el entorno.', 'this = omitible por ahora.']
    },
    ejercicios: [
      ej(1, 'Contador.', 'Función que devuelve otra que suma 1 cada vez; llama 3 veces.', ['1,2,3 o acumulado visible'], ['Closure contador'], `function crearContador() {\n}\n\n`),
      ej(2, 'Multiplicador.', 'crearMultiplicador(5) devuelve función que multiplica por 5.', ['10 si pasas 2'], ['Closure con factor'], `function crearMultiplicador(factor) {\n}\n\n`),
      ej(3, 'Explica en texto.', 'Variable respuesta: en 2 frases qué es una closure.', ['Menciona recuerda/entorno'], ['Texto con idea de closure'], `const respuesta = \`...\`;\nconsole.log(respuesta);`)
    ]
  },
  {
    dia: 11,
    semana: 2,
    tipo: 'leccion',
    titulo: 'Pedir y esperar: promesas',
    objetivo: 'Entender async como pedir pizza y seguir limpiando hasta que suena el timbre.',
    contenido: {
      intro: `Cuando pides datos a un servidor, no llegan al instante. Una promesa es un ticket: “cuando esté listo, te aviso”.`,
      secciones: [
        sec('¿Por qué?', 'La web espera respuestas de red, bases de datos, IA…', 'Sin bloquear toda la pantalla.', 'fetch y APIs usan promesas.'),
        sec('then / catch', 'then = cuando llega bien; catch = cuando falla.', 'Encadenas de pasos.', 'fetch(url).then(r => r.json()).catch(e => console.log(e));'),
        sec('Estados', 'pending, fulfilled, rejected. Como pedido: en cocina, entregado, cancelado.', 'Mentalidad, no memorizar nombres.', '')
      ],
      resumen: ['Promesa = trabajo futuro.', 'then = éxito.', 'catch = error.']
    },
    ejercicios: [
      ej(1, 'Promesa manual.', 'Crea Promise que resuelve con "hola" y muestra en then.', ['Muestra hola'], ['Promise resolve', 'then imprime'], `const p = new Promise((resolve) => {\n});\n\n`),
      ej(2, 'catch error.', 'Promesa que rechaza y catch muestra mensaje.', ['Muestra error'], ['reject y catch'], `const p = new Promise((_, reject) => {\n});\n\n`),
      ej(3, 'Encadenar.', 'then que transforma "hola" a "HOLA".', ['HOLA'], ['then transforma'], `Promise.resolve('hola').then(...);\n\n`)
    ]
  },
  {
    dia: 12,
    semana: 2,
    tipo: 'leccion',
    titulo: 'async/await y pedir datos (fetch)',
    objetivo: 'Escribir async como lista de pasos en orden.',
    contenido: {
      intro: `async/await es leer una receta paso a paso en vez de tickets encadenados. fetch pide datos a una URL.`,
      secciones: [
        sec('async / await', 'async function = función que puede esperar.', 'await pausa hasta que llega la respuesta.', 'async function cargar() { const r = await fetch(url); }'),
        sec('try / catch', 'try el intento; catch si la red falla.', 'Como plan B si el proveedor no contesta.', 'try { ... } catch (e) { ... }'),
        sec('fetch + JSON', 'fetch trae respuesta; .json() la convierte a objeto.', 'APIs y Supabase hablan JSON.', 'const data = await res.json();')
      ],
      resumen: ['async/await = pasos en orden.', 'try/catch = errores.', 'fetch = pedir por URL.']
    },
    ejercicios: [
      ej(1, 'Función async.', 'async que await Promise.resolve(42) y muestra 42.', ['42'], ['async await', '42 visible'], `async function main() {\n}\nmain();`),
      ej(2, 'try catch.', 'try divide 10/0 o acceso fallido; catch muestra "error".', ['Muestra error'], ['try y catch'], `async function probar() {\n}\nprobar();`),
      ej(3, 'fetch público.', 'fetch a jsonplaceholder post 1 y muestra title (o explica en comentario si no hay red).', ['title o manejo error'], ['fetch o try', 'datos o error'], `async function cargar() {\n}\ncargar();`)
    ]
  },
  {
    dia: 13,
    semana: 2,
    tipo: 'leccion',
    titulo: 'El navegador por detrás (DOM ligero)',
    objetivo: 'Saber qué hace el DOM sin convertirte en maquetador manual.',
    contenido: {
      intro: `Svelte pinta por ti. Pero conviene saber: el DOM es el cartel que el navegador muestra; puedes cambiarlo y escuchar clics.`,
      secciones: [
        sec('Seleccionar y cambiar', 'document.querySelector es coger un cartel y cambiar el texto.', 'En Svelte casi no lo harás a mano.', '// document.querySelector("h1").textContent = "Hola";'),
        sec('Eventos', 'addEventListener: cuando clic, haz esto.', 'Botones y formularios.', '// btn.addEventListener("click", () => ...)'),
        sec('localStorage', 'Cajón del navegador que recuerda tras cerrar.', 'Preferencias, borrador.', 'localStorage.setItem("clave", "valor");')
      ],
      resumen: ['DOM = cartel del navegador.', 'Eventos = reaccionar a clic.', 'localStorage = memoria local.']
    },
    ejercicios: [
      ej(1, 'En comentario.', 'Escribe en comentario qué haría querySelector para cambiar un h1.', ['Comentario explica'], ['Menciona querySelector o selección'], `// Si tuviera un h1 en la página...\n\n`),
      ej(2, 'localStorage.', 'Guarda clave "tema" valor "oscuro" y léela.', ['Muestra oscuro'], ['setItem y getItem'], `localStorage.setItem('tema', 'oscuro');\nconsole.log(localStorage.getItem('tema'));`),
      ej(3, 'Evento en texto.', 'respuesta: una frase qué hace addEventListener.', ['Explica escuchar evento'], ['Texto sobre evento'], `const respuesta = \`...\`;\nconsole.log(respuesta);`)
    ]
  },
  {
    dia: 14,
    semana: 2,
    tipo: 'examen',
    titulo: 'Repaso Semana 2: datos y esperas',
    objetivo: 'Objetos, async y lógica sin presión de sintaxis.',
    instrucciones: `Cinco retos. Importa el efecto final.`,
    ejercicios: [
      ej(1, 'Ficha pedido.', 'Objeto pedido id y total; muestra total.', ['total visible'], ['objeto pedido'], `const pedido = { id: 1, total: 50 };\n\n`),
      ej(2, 'await número.', 'async muestra 100 tras await Promise.resolve(100).', ['100'], ['async await'], `async function f() {}\nf();`),
      ej(3, 'map precios.', 'Duplica precios [5,10] con map.', ['[10,20]'], ['map'], `const p = [5, 10];\n\n`),
      ej(4, 'Closure.', 'Función que recuerda saludo y lo devuelve.', ['saludo'], ['closure'], `function crear(s) {}\n\n`),
      ej(5, 'localStorage.', 'Guarda y lee nombre usuario.', ['nombre leído'], ['localStorage'], `localStorage.setItem('user', 'Moi');\n\n`)
    ]
  }
];
