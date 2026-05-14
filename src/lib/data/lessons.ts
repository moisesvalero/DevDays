import type { Leccion } from '$lib/types/lesson';

export const lessons: Leccion[] = [
  // ═══════════════════════════════════════════════════════════════════
  // SEMANA 1 — JAVASCRIPT BÁSICO
  // ═══════════════════════════════════════════════════════════════════
  {
    dia: 1,
    semana: 1,
    titulo: 'Variables',
    objetivo: 'Entender let, const, texto y números.',
    explicacion: `En JavaScript hay dos formas principales de declarar variables: let y const.
let permite reasignar el valor más tarde. const fija el valor y no se puede cambiar.
Los tipos básicos son string (texto entre comillas), number (números) y boolean (true/false).
Regla práctica: usa const por defecto y let solo cuando sepas que vas a reasignar.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Declara una constante llamada `nombre` con tu nombre (string) y muéstrala con console.log.',
        plantilla: `// Día 1 - Ejercicio 1\n// Declara una constante 'nombre' con tu nombre y muéstrala con console.log.\n\n`
      },
      {
        numero: 2,
        enunciado:
          'Declara una variable `edad` con let y valor 25. Cámbiala a 26 y muestra ambos valores con console.log.',
        plantilla: `// Día 1 - Ejercicio 2\n\n`
      },
      {
        numero: 3,
        enunciado:
          'Crea una constante `pi = 3.14`. En un comentario explica qué pasaría si intentaras reasignarla.',
        plantilla: `// Día 1 - Ejercicio 3\n\n`
      }
    ]
  },
  {
    dia: 2,
    semana: 1,
    titulo: 'Arrays y objetos',
    objetivo: 'Entender listas y datos estructurados.',
    explicacion: `Un array es una lista ordenada: const frutas = ['manzana', 'pera'].
Accedes por índice empezando en 0: frutas[0] devuelve 'manzana'.
Un objeto agrupa datos con clave-valor: const persona = { nombre: 'Ana', edad: 30 }.
Accedes con punto: persona.nombre. Arrays para colecciones, objetos para entidades.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Crea un array `colores` con tres colores. Muestra el segundo color con console.log.',
        plantilla: `// Día 2 - Ejercicio 1\n\n`
      },
      {
        numero: 2,
        enunciado:
          'Crea un objeto `coche` con las propiedades marca (string), modelo (string) y año (number). Muestra la marca.',
        plantilla: `// Día 2 - Ejercicio 2\n\n`
      },
      {
        numero: 3,
        enunciado:
          'Crea un array `usuarios` con dos objetos, cada uno con nombre y edad. Muestra el nombre del segundo usuario.',
        plantilla: `// Día 2 - Ejercicio 3\n\n`
      }
    ]
  },
  {
    dia: 3,
    semana: 1,
    titulo: 'Funciones',
    objetivo: 'Saber qué hacen y cómo se usan.',
    explicacion: `Una función agrupa código para reutilizarlo. Sintaxis clásica:
function sumar(a, b) { return a + b; }
También existen las flecha: const sumar = (a, b) => a + b.
Una función puede recibir parámetros y devolver un valor con return.
Si no hay return, devuelve undefined.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe una función `saludar` que reciba un nombre y devuelva el string "Hola, [nombre]".',
        plantilla: `// Día 3 - Ejercicio 1\n\nfunction saludar(nombre) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 2,
        enunciado: 'Escribe una función flecha `doble` que reciba un número y devuelva su doble.',
        plantilla: `// Día 3 - Ejercicio 2\n\nconst doble = (n) => {\n  // tu código aquí\n};\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe una función `esMayorDeEdad` que reciba una edad y devuelva true si es >= 18, false si no.',
        plantilla: `// Día 3 - Ejercicio 3\n\n`
      }
    ]
  },
  {
    dia: 4,
    semana: 1,
    titulo: 'Condiciones',
    objetivo: 'Entender if, else y comparaciones.',
    explicacion: `if ejecuta código si una condición es verdadera. else cubre el caso contrario.
Comparadores: === (igual estricto), !== (distinto), >, <, >=, <=.
Operadores lógicos: && (y), || (o), ! (no).
Usa siempre === en vez de == para evitar conversiones raras.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe una función `parOImpar` que reciba un número y devuelva "par" o "impar".',
        plantilla: `// Día 4 - Ejercicio 1\n\nfunction parOImpar(n) {\n  // usa el operador % (módulo)\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe una función `nota` que reciba un número 0-10 y devuelva "suspenso" (<5), "aprobado" (<7), "notable" (<9) o "sobresaliente".',
        plantilla: `// Día 4 - Ejercicio 2\n\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe una función `puedeConducir` que reciba edad y tieneCarnet (boolean) y devuelva true solo si edad>=18 Y tieneCarnet.',
        plantilla: `// Día 4 - Ejercicio 3\n\n`
      }
    ]
  },
  {
    dia: 5,
    semana: 1,
    titulo: 'Bucles y listas',
    objetivo: 'Entender cómo trabajar con colecciones (map, filter).',
    explicacion: `map transforma cada elemento de un array y devuelve uno nuevo del mismo tamaño.
filter devuelve un array nuevo con los elementos que cumplen una condición.
Ejemplos: [1,2,3].map(n => n*2) → [2,4,6]; [1,2,3].filter(n => n>1) → [2,3].
Ambos NO modifican el array original. Aprende también el for clásico y el for...of.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Dado `const nums = [1,2,3,4,5]`, usa map para crear un array con los cuadrados.',
        plantilla: `// Día 5 - Ejercicio 1\nconst nums = [1, 2, 3, 4, 5];\n\n`
      },
      {
        numero: 2,
        enunciado: 'Usando filter, crea una función `pares` que reciba un array y devuelva solo los pares.',
        plantilla: `// Día 5 - Ejercicio 2\n\nfunction pares(arr) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Dado un array de objetos `usuarios` con nombre y edad, usa filter+map para devolver los nombres de los mayores de 18.',
        plantilla: `// Día 5 - Ejercicio 3\nconst usuarios = [\n  { nombre: 'Ana', edad: 17 },\n  { nombre: 'Luis', edad: 22 },\n  { nombre: 'Eva', edad: 30 }\n];\n\n`
      }
    ]
  },
  {
    dia: 6,
    semana: 1,
    titulo: 'Eventos y async/await',
    objetivo: 'Entender clicks y lógica asíncrona.',
    explicacion: `async/await permite escribir código asíncrono como si fuera síncrono.
Una función marcada con async devuelve siempre una Promise.
Dentro puedes usar await para esperar a otra Promise sin bloquear.
fetch(url) devuelve una Promise con la respuesta de un servidor.
Los eventos del DOM (click, input...) se gestionan con addEventListener o atributos onclick.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe una función async `esperar` que use `await new Promise(r => setTimeout(r, 100))` y luego devuelva el string "listo".',
        plantilla: `// Día 6 - Ejercicio 1\n\nasync function esperar() {\n  // tu código aquí\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe una función async `getUsuario` que llame a fetch("https://jsonplaceholder.typicode.com/users/1"), lea el .json() y devuelva el objeto.',
        plantilla: `// Día 6 - Ejercicio 2\n\nasync function getUsuario() {\n  // tu código aquí\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Simula un handler de click: escribe una función `onClick(evento)` que reciba un objeto `{ tipo: "click", target: "boton" }` y devuelva el string "Pulsado: boton".',
        plantilla: `// Día 6 - Ejercicio 3\n\nfunction onClick(evento) {\n  // tu código aquí\n}\n`
      }
    ]
  },
  {
    dia: 7,
    semana: 1,
    titulo: 'Repaso de JavaScript',
    objetivo: 'Consolidar todo lo visto esta semana.',
    explicacion: `Hoy combinas variables, funciones, condiciones, arrays y async.
La idea es resolver problemas pequeños que mezclen varios conceptos.
Si te atascas, vuelve a los días anteriores y repasa.
Cuando completes este día, estarás listo para empezar con Svelte.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe una función `mayorEdad(usuarios)` que reciba un array de objetos con nombre y edad y devuelva el nombre del más mayor.',
        plantilla: `// Día 7 - Ejercicio 1\n\nfunction mayorEdad(usuarios) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe una función `contarPalabras(frase)` que devuelva el número de palabras (separadas por espacios) de un string.',
        plantilla: `// Día 7 - Ejercicio 2\n\nfunction contarPalabras(frase) {\n  // pista: split(' ').length\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe una función async `dobleAsync(n)` que tras esperar 50ms devuelva n*2.',
        plantilla: `// Día 7 - Ejercicio 3\n\n`
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // SEMANA 2 — SVELTE BÁSICO (practicado en JS plano)
  // ═══════════════════════════════════════════════════════════════════
  {
    dia: 8,
    semana: 2,
    titulo: 'Qué es Svelte',
    objetivo: 'Entender el framework y qué hace un componente.',
    explicacion: `Svelte es un compilador, no una librería en runtime como React.
Tu código .svelte se transforma en JS plano que actualiza el DOM directamente.
Un componente es un fichero .svelte con tres bloques: <script>, marcado HTML y <style>.
Nota: hoy practicamos en JS plano simulando lo que haría un componente.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Simula un componente: escribe una función `render()` que devuelva el string "<h1>Hola Svelte</h1>".',
        plantilla: `// Día 8 - Ejercicio 1\n// Simulamos un componente Svelte como una función que devuelve HTML.\n\nfunction render() {\n  // tu código aquí\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe una función `renderBoton(texto)` que devuelva el string `<button>${texto}</button>`.',
        plantilla: `// Día 8 - Ejercicio 2\n\nfunction renderBoton(texto) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Explica en un comentario (sin código) en qué se diferencia Svelte de React en una línea.',
        plantilla: `// Día 8 - Ejercicio 3\n// Tu respuesta como comentario:\n//\n`
      }
    ]
  },
  {
    dia: 9,
    semana: 2,
    titulo: 'Componentes',
    objetivo: 'Crear y usar componentes.',
    explicacion: `Cada archivo .svelte es un componente reutilizable.
Para usar uno, lo importas: import Boton from './Boton.svelte' y luego <Boton />.
Hoy simulamos los componentes como funciones JS que devuelven HTML como string.
Esto te ayudará a entender la mecánica de composición sin escribir .svelte todavía.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe una función `Card(titulo, contenido)` que devuelva un string `<div class="card"><h2>${titulo}</h2><p>${contenido}</p></div>`.',
        plantilla: `// Día 9 - Ejercicio 1\n\nfunction Card(titulo, contenido) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe una función `Lista(items)` que reciba un array y devuelva `<ul>` con un `<li>` por cada item.',
        plantilla: `// Día 9 - Ejercicio 2\n\nfunction Lista(items) {\n  // pista: items.map(...).join('')\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Combina: escribe una función `Pagina()` que use Card y Lista y devuelva una página con una tarjeta y una lista.',
        plantilla: `// Día 9 - Ejercicio 3\n\nfunction Card(titulo, contenido) {\n  return \`<div class="card"><h2>\${titulo}</h2><p>\${contenido}</p></div>\`;\n}\nfunction Lista(items) {\n  return \`<ul>\${items.map(i => \`<li>\${i}</li>\`).join('')}</ul>\`;\n}\n\nfunction Pagina() {\n  // tu código aquí\n}\n`
      }
    ]
  },
  {
    dia: 10,
    semana: 2,
    titulo: 'Variables en Svelte',
    objetivo: 'Mostrar datos en pantalla.',
    explicacion: `En Svelte, las variables del <script> se usan en el HTML con llaves: {variable}.
Si la variable cambia, el DOM se actualiza automáticamente.
En Svelte 5 se usan runes: let count = $state(0).
Hoy simulamos esto: una función recibe variables y las interpola en un string HTML.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe `mostrarNombre(nombre)` que devuelva `<p>Hola, ${nombre}</p>` con template literals.',
        plantilla: `// Día 10 - Ejercicio 1\n\nfunction mostrarNombre(nombre) {\n  // usa backticks\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe `contador(n)` que devuelva `<span>Total: ${n}</span>`.',
        plantilla: `// Día 10 - Ejercicio 2\n\nfunction contador(n) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe `perfil({nombre, edad})` que reciba un objeto y devuelva `<div><h3>${nombre}</h3><p>Edad: ${edad}</p></div>`.',
        plantilla: `// Día 10 - Ejercicio 3\n\nfunction perfil({ nombre, edad }) {\n  // tu código aquí\n}\n`
      }
    ]
  },
  {
    dia: 11,
    semana: 2,
    titulo: 'Props',
    objetivo: 'Pasar datos entre componentes.',
    explicacion: `Las props son los datos que un componente padre pasa a un hijo.
En Svelte 5 se reciben con: let { titulo, color } = $props().
Hoy simulamos: una función "componente" recibe un objeto con las props.
Esto es exactamente lo que hace Svelte por debajo.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe `Saludo(props)` que reciba `{ nombre }` y devuelva `<h1>Hola ${nombre}</h1>`.',
        plantilla: `// Día 11 - Ejercicio 1\n\nfunction Saludo(props) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe `Boton(props)` que reciba `{ texto, tipo }` y devuelva `<button type="${tipo}">${texto}</button>`. Si no hay tipo, usa "button" por defecto.',
        plantilla: `// Día 11 - Ejercicio 2\n\nfunction Boton(props) {\n  const tipo = props.tipo || 'button';\n  // tu código aquí\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe `Tarjeta(props)` que reciba `{ titulo, contenido, autor = "Anónimo" }` con destructuring y devuelva una tarjeta HTML.',
        plantilla: `// Día 11 - Ejercicio 3\n\nfunction Tarjeta({ titulo, contenido, autor = 'Anónimo' }) {\n  // tu código aquí\n}\n`
      }
    ]
  },
  {
    dia: 12,
    semana: 2,
    titulo: 'Eventos',
    objetivo: 'Clicks y acciones.',
    explicacion: `En Svelte 5 los eventos se asignan como propiedades: <button onclick={handler}>.
El handler es una función que se ejecuta al producirse el evento.
Hoy simulamos: una función "handler" recibe un evento (objeto) y reacciona devolviendo o cambiando algo.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe `manejarClick(evento)` que reciba `{ target: { id } }` y devuelva el string `Pulsado: ${id}`.',
        plantilla: `// Día 12 - Ejercicio 1\n\nfunction manejarClick(evento) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe `incrementar(estado)` que reciba `{ count: 0 }` y devuelva un nuevo objeto con count+1.',
        plantilla: `// Día 12 - Ejercicio 2\n\nfunction incrementar(estado) {\n  // tu código aquí (devuelve un objeto NUEVO)\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe `togglear(estado)` que reciba `{ abierto: false }` y devuelva un nuevo objeto con `abierto` invertido.',
        plantilla: `// Día 12 - Ejercicio 3\n\nfunction togglear(estado) {\n  // tu código aquí\n}\n`
      }
    ]
  },
  {
    dia: 13,
    semana: 2,
    titulo: '{#if} y {#each}',
    objetivo: 'Condicionales y listas en plantilla.',
    explicacion: `En Svelte: {#if cond} ... {:else} ... {/if} para condicionales en HTML.
{#each lista as item} ... {/each} para iterar arrays.
Hoy simulamos ambos con JS plano: if/else y .map().join('').
La lógica es la misma; Svelte solo te da una sintaxis más declarativa.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe `renderEstado(logueado)` que devuelva `<p>Bienvenido</p>` si es true, o `<p>Inicia sesión</p>` si no.',
        plantilla: `// Día 13 - Ejercicio 1\n\nfunction renderEstado(logueado) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe `renderLista(items)` que devuelva un `<ul>` con un `<li>` por cada item.',
        plantilla: `// Día 13 - Ejercicio 2\n\nfunction renderLista(items) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe `renderUsuarios(usuarios)` que para cada usuario `{nombre, activo}` muestre `<li>` con el nombre en verde si activo, gris si no.',
        plantilla: `// Día 13 - Ejercicio 3\n\nfunction renderUsuarios(usuarios) {\n  // usa map + if dentro del template literal\n}\n`
      }
    ]
  },
  {
    dia: 14,
    semana: 2,
    titulo: 'bind:value',
    objetivo: 'Inputs controlados.',
    explicacion: `bind:value crea un enlace bidireccional entre una variable y un input.
Sintaxis Svelte: <input bind:value={nombre} />.
Cuando el usuario escribe, la variable se actualiza; si cambias la variable, el input también.
Hoy simulamos esto con una función que actualiza un objeto-estado.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe `setValor(estado, campo, valor)` que devuelva un nuevo estado con el campo actualizado. Ej: setValor({nombre: ""}, "nombre", "Ana") → {nombre: "Ana"}.',
        plantilla: `// Día 14 - Ejercicio 1\n\nfunction setValor(estado, campo, valor) {\n  // pista: spread {...estado, [campo]: valor}\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe `validarEmail(estado)` que reciba `{email: string}` y devuelva true si contiene @ y un punto, false si no.',
        plantilla: `// Día 14 - Ejercicio 2\n\nfunction validarEmail(estado) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe `actualizarFormulario(estado, evento)` donde evento es `{target: {name, value}}` y devuelva un nuevo estado con el campo `name` actualizado al `value`.',
        plantilla: `// Día 14 - Ejercicio 3\n\nfunction actualizarFormulario(estado, evento) {\n  // tu código aquí\n}\n`
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // SEMANA 3 — SVELTEKIT
  // ═══════════════════════════════════════════════════════════════════
  {
    dia: 15,
    semana: 3,
    titulo: 'Estructura de SvelteKit',
    objetivo: 'Entender src/routes, +page.svelte, +layout.svelte.',
    explicacion: `SvelteKit usa enrutado por ficheros dentro de src/routes.
Una carpeta = una ruta. +page.svelte es la página, +layout.svelte el envoltorio.
+page.server.ts solo se ejecuta en el servidor (auth, BD). +page.ts en ambos.
Hoy simulamos: una función "router" recibe una ruta y devuelve qué fichero la sirve.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe `resolverRuta(path)` que devuelva el string `src/routes${path}/+page.svelte`. Ej: resolverRuta("/about") → "src/routes/about/+page.svelte".',
        plantilla: `// Día 15 - Ejercicio 1\n\nfunction resolverRuta(path) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe `esRutaPublica(path)` que devuelva true si path empieza por "/", false si no.',
        plantilla: `// Día 15 - Ejercicio 2\n\nfunction esRutaPublica(path) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe `tipoFichero(nombre)` que devuelva "pagina", "layout" o "servidor" según el nombre del fichero (+page.svelte, +layout.svelte, +page.server.ts).',
        plantilla: `// Día 15 - Ejercicio 3\n\nfunction tipoFichero(nombre) {\n  // tu código aquí\n}\n`
      }
    ]
  },
  {
    dia: 16,
    semana: 3,
    titulo: 'Rutas',
    objetivo: 'Crear páginas.',
    explicacion: `Cada carpeta dentro de src/routes con un +page.svelte se convierte en una ruta.
src/routes/about/+page.svelte → /about.
src/routes/blog/post/+page.svelte → /blog/post.
La home es src/routes/+page.svelte → /.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe `rutaToCarpeta(ruta)` que reciba "/about" y devuelva "src/routes/about". Para "/" devuelve "src/routes".',
        plantilla: `// Día 16 - Ejercicio 1\n\nfunction rutaToCarpeta(ruta) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe `listarRutas(rutas)` que reciba un array de strings ["/", "/about", "/blog"] y devuelva un array de objetos `{ruta, carpeta}`.',
        plantilla: `// Día 16 - Ejercicio 2\n\nfunction listarRutas(rutas) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe `validarRuta(ruta)` que devuelva true si ruta empieza por "/" y no contiene espacios.',
        plantilla: `// Día 16 - Ejercicio 3\n\nfunction validarRuta(ruta) {\n  // tu código aquí\n}\n`
      }
    ]
  },
  {
    dia: 17,
    semana: 3,
    titulo: '+page.svelte',
    objetivo: 'Entender una página.',
    explicacion: `+page.svelte es el componente que se renderiza en una ruta concreta.
Recibe los datos cargados por +page.ts o +page.server.ts vía la prop 'data'.
En Svelte 5: let { data } = $props().
Es la unidad básica de cualquier app SvelteKit.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe `Pagina(data)` que reciba `{titulo: string}` y devuelva `<h1>${titulo}</h1>`.',
        plantilla: `// Día 17 - Ejercicio 1\n\nfunction Pagina(data) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe `PaginaBlog(data)` que reciba `{posts: array}` y devuelva un `<ul>` con un `<li>` por cada post.titulo.',
        plantilla: `// Día 17 - Ejercicio 2\n\nfunction PaginaBlog(data) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe `PaginaPerfil(data)` que reciba `{usuario: {nombre, email}}` y devuelva un perfil HTML. Si no hay usuario, devuelve "<p>Cargando...</p>".',
        plantilla: `// Día 17 - Ejercicio 3\n\nfunction PaginaPerfil(data) {\n  // tu código aquí\n}\n`
      }
    ]
  },
  {
    dia: 18,
    semana: 3,
    titulo: '+layout.svelte',
    objetivo: 'Crear estructura común (menú, footer).',
    explicacion: `+layout.svelte envuelve todas las páginas que estén dentro de su carpeta.
La raíz src/routes/+layout.svelte envuelve TODA la app.
Dentro renderizas el contenido hijo con {@render children()}.
Útil para nav, footer, providers globales.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe `Layout(contenidoHijo)` que devuelva `<header>Mi App</header>${contenidoHijo}<footer>© 2025</footer>`.',
        plantilla: `// Día 18 - Ejercicio 1\n\nfunction Layout(contenidoHijo) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe `LayoutConNav(contenidoHijo, links)` que reciba un array de links `[{href, texto}]` y los pinte en un `<nav>` antes del contenido.',
        plantilla: `// Día 18 - Ejercicio 2\n\nfunction LayoutConNav(contenidoHijo, links) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe `renderApp(paginaHTML)` que combine LayoutConNav (header con links Home/About) + el HTML de la página recibida.',
        plantilla: `// Día 18 - Ejercicio 3\n\nfunction renderApp(paginaHTML) {\n  // tu código aquí\n}\n`
      }
    ]
  },
  {
    dia: 19,
    semana: 3,
    titulo: 'Rutas dinámicas',
    objetivo: 'Blog, proyectos, portfolio.',
    explicacion: `Las rutas dinámicas usan corchetes en el nombre de carpeta.
src/routes/blog/[slug]/+page.svelte → /blog/cualquier-cosa.
El parámetro slug llega en params: const { slug } = params.
Sirve para detalles de productos, posts, perfiles.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe `matchRuta(patron, ruta)` donde patron="/blog/[slug]" y ruta="/blog/hola". Devuelve `{slug: "hola"}` si coincide, null si no.',
        plantilla: `// Día 19 - Ejercicio 1\n\nfunction matchRuta(patron, ruta) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe `extraerParams(patron, ruta)` que extraiga todos los `[param]` (puede haber varios) y devuelva un objeto.',
        plantilla: `// Día 19 - Ejercicio 2\n// Ej: extraerParams('/users/[id]/posts/[postId]', '/users/5/posts/10')\n// → {id: '5', postId: '10'}\n\nfunction extraerParams(patron, ruta) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe `PaginaPost(params, posts)` que busque en un array de posts el que tenga `slug === params.slug` y devuelva su título o "404".',
        plantilla: `// Día 19 - Ejercicio 3\n\nfunction PaginaPost(params, posts) {\n  // tu código aquí\n}\n`
      }
    ]
  },
  {
    dia: 20,
    semana: 3,
    titulo: 'Navegación',
    objetivo: 'Moverse entre páginas sin recargar.',
    explicacion: `Para navegar sin recargar se usa <a href="/ruta">: SvelteKit lo intercepta.
Programáticamente: import { goto } from '$app/navigation'; goto('/about').
El módulo $app/state expone la URL actual.
Esto es client-side routing: muy rápido, no descarga HTML entero.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe `crearEnlace(href, texto)` que devuelva `<a href="${href}">${texto}</a>`.',
        plantilla: `// Día 20 - Ejercicio 1\n\nfunction crearEnlace(href, texto) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe `navegar(rutaActual, nuevaRuta)` que devuelva un objeto `{anterior: rutaActual, actual: nuevaRuta}`.',
        plantilla: `// Día 20 - Ejercicio 2\n\nfunction navegar(rutaActual, nuevaRuta) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe `renderMenu(links, rutaActual)` que devuelva un `<nav>` con todos los links; el activo lleva clase "active".',
        plantilla: `// Día 20 - Ejercicio 3\n\nfunction renderMenu(links, rutaActual) {\n  // tu código aquí\n}\n`
      }
    ]
  },
  {
    dia: 21,
    semana: 3,
    titulo: 'Mini web',
    objetivo: 'Unir todo lo anterior.',
    explicacion: `Hoy "construyes" mentalmente una mini web con varias páginas.
Combina layout, rutas estáticas, rutas dinámicas y un menú activo.
Los ejercicios simulan piezas concretas que ensamblarías en una SvelteKit real.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe `appRouter(ruta, posts)` que devuelva el HTML de la página correcta: "/" → home, "/blog" → lista de posts, "/blog/[slug]" → detalle. 404 si no coincide.',
        plantilla: `// Día 21 - Ejercicio 1\n\nfunction appRouter(ruta, posts) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe `slugify(texto)` que convierta "Mi Primer Post" en "mi-primer-post" (minúsculas, espacios a guiones).',
        plantilla: `// Día 21 - Ejercicio 2\n\nfunction slugify(texto) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe `generarSitemap(rutas)` que reciba un array de rutas y devuelva un string XML básico (<urlset>...<url><loc>${ruta}</loc></url>...).',
        plantilla: `// Día 21 - Ejercicio 3\n\nfunction generarSitemap(rutas) {\n  // tu código aquí\n}\n`
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // SEMANA 4 — FORMULARIOS, FETCH Y SUPABASE
  // ═══════════════════════════════════════════════════════════════════
  {
    dia: 22,
    semana: 4,
    titulo: 'Formularios',
    objetivo: 'Cómo funcionan los formularios en SvelteKit.',
    explicacion: `SvelteKit potencia formularios HTML con progressive enhancement.
Un <form method="POST"> funciona sin JS. Con use:enhance se hace AJAX automáticamente.
Los datos llegan al servidor en FormData.
Hoy simulamos parseo de FormData y validaciones simples.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe `parsearForm(entradas)` que reciba un array `[[key, value], ...]` y devuelva un objeto. Ej: [["nombre","Ana"]] → {nombre:"Ana"}.',
        plantilla: `// Día 22 - Ejercicio 1\n// Simula formData.entries()\n\nfunction parsearForm(entradas) {\n  // pista: Object.fromEntries\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe `validarLogin(datos)` que reciba `{email, password}` y devuelva `{ok: true}` si email tiene @ y password.length>=6, o `{ok: false, error}` si no.',
        plantilla: `// Día 22 - Ejercicio 2\n\nfunction validarLogin(datos) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe `procesarRegistro(datos)` que devuelva `{ok, datos}` si nombre y email están presentes, o `{ok: false, errores: []}` listando los campos vacíos.',
        plantilla: `// Día 22 - Ejercicio 3\n\nfunction procesarRegistro(datos) {\n  // tu código aquí\n}\n`
      }
    ]
  },
  {
    dia: 23,
    semana: 4,
    titulo: 'Actions',
    objetivo: 'Procesar formularios en el servidor.',
    explicacion: `En +page.server.ts se exporta un objeto actions con funciones nombradas.
Cada action recibe el evento y devuelve datos o errores.
El form llama a la action con action="?/nombreAction".
fail(400, {error}) devuelve un error sin lanzar excepción.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe una "action" `crearUsuario(datos)` que devuelva `{success: true, id: 1}` si datos.nombre existe, o `{success: false, error: "nombre requerido"}`.',
        plantilla: `// Día 23 - Ejercicio 1\n\nfunction crearUsuario(datos) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe `actions` como objeto con dos funciones: `login(datos)` y `logout()`. login devuelve `{ok}`, logout `{redirect: "/"}`.',
        plantilla: `// Día 23 - Ejercicio 2\n\nconst actions = {\n  login(datos) {\n    // tu código aquí\n  },\n  logout() {\n    // tu código aquí\n  }\n};\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe `ejecutarAction(actions, nombre, datos)` que llame `actions[nombre](datos)` y devuelva el resultado. Si no existe, devuelve `{error: "Action no encontrada"}`.',
        plantilla: `// Día 23 - Ejercicio 3\n\nfunction ejecutarAction(actions, nombre, datos) {\n  // tu código aquí\n}\n`
      }
    ]
  },
  {
    dia: 24,
    semana: 4,
    titulo: 'Fetch',
    objetivo: 'Hacer peticiones HTTP.',
    explicacion: `fetch(url) hace una petición GET. Para POST, pasas un segundo argumento con method, headers y body.
Devuelve una Promise con la Response: usa .json() para leerla.
En SvelteKit el fetch interno puede usarse en load() y se hidrata bien.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe `getJson(url)` async que haga fetch(url) y devuelva el JSON parseado.',
        plantilla: `// Día 24 - Ejercicio 1\n\nasync function getJson(url) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe `postJson(url, datos)` async que envíe POST con headers JSON y body stringify, y devuelva la respuesta JSON.',
        plantilla: `// Día 24 - Ejercicio 2\n\nasync function postJson(url, datos) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe `getPost(id)` que llame a https://jsonplaceholder.typicode.com/posts/${id} y devuelva el objeto.',
        plantilla: `// Día 24 - Ejercicio 3\n\nasync function getPost(id) {\n  // tu código aquí\n}\n`
      }
    ]
  },
  {
    dia: 25,
    semana: 4,
    titulo: 'Loading y error',
    objetivo: 'Manejar carga y errores.',
    explicacion: `Cualquier petición async puede fallar o tardar. Necesitas estados loading/error.
Patrón: estado = {loading, data, error}. Empiezas con loading=true.
En SvelteKit, +error.svelte captura errores no manejados de una ruta.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe `crearEstado()` que devuelva `{loading: true, data: null, error: null}`.',
        plantilla: `// Día 25 - Ejercicio 1\n\nfunction crearEstado() {\n  // tu código aquí\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe `cargarDatos(fetcher)` async que intente fetcher() y devuelva `{loading: false, data, error: null}` si va bien, o `{loading: false, data: null, error: e.message}` si falla.',
        plantilla: `// Día 25 - Ejercicio 2\n\nasync function cargarDatos(fetcher) {\n  // usa try/catch\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe `renderEstado(estado)` que devuelva "<p>Cargando...</p>" si loading, "<p>Error</p>" si error, o `<p>${estado.data}</p>` si data.',
        plantilla: `// Día 25 - Ejercicio 3\n\nfunction renderEstado(estado) {\n  // tu código aquí\n}\n`
      }
    ]
  },
  {
    dia: 26,
    semana: 4,
    titulo: 'Load',
    objetivo: 'Cargar datos antes de renderizar.',
    explicacion: `La función load se exporta desde +page.ts o +page.server.ts.
Recibe { params, fetch, locals } y debe devolver un objeto.
Ese objeto llega a +page.svelte como data prop.
load corre antes de mostrar la página: ideal para datos que la página necesita sí o sí.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe `load(event)` async que reciba `{params: {id}}` y devuelva `{post: {id, titulo: "Post " + id}}`.',
        plantilla: `// Día 26 - Ejercicio 1\n\nasync function load(event) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe `loadConFetch(event)` async que haga fetch a https://jsonplaceholder.typicode.com/posts/${event.params.id} y devuelva `{post}`.',
        plantilla: `// Día 26 - Ejercicio 2\n\nasync function loadConFetch(event) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe `loadProtegido(event)` que devuelva `{error: "No autorizado"}` si no hay event.locals.user, o `{user: locals.user}` si lo hay.',
        plantilla: `// Día 26 - Ejercicio 3\n\nfunction loadProtegido(event) {\n  // tu código aquí\n}\n`
      }
    ]
  },
  {
    dia: 27,
    semana: 4,
    titulo: 'Supabase básico',
    objetivo: 'Usar Supabase con SvelteKit.',
    explicacion: `Supabase es Postgres + auth + storage gestionados.
Cliente JS: supabase.from('tabla').select() devuelve {data, error}.
Para insertar: .insert({campo: valor}). Para actualizar: .update().eq('id', x).
RLS (Row Level Security) protege filas; cada usuario solo ve las suyas.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Simula `select(tabla, filas)` que reciba el nombre de la tabla y un array de filas y devuelva `{data: filas, error: null}`.',
        plantilla: `// Día 27 - Ejercicio 1\n\nfunction select(tabla, filas) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Simula `insert(tabla, filas, nueva)` que añada `nueva` a `filas` y devuelva `{data: [nueva], error: null}`.',
        plantilla: `// Día 27 - Ejercicio 2\n\nfunction insert(tabla, filas, nueva) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Simula `filtrar(filas, campo, valor)` que devuelva las filas donde `fila[campo] === valor`. Equivale a .eq().',
        plantilla: `// Día 27 - Ejercicio 3\n\nfunction filtrar(filas, campo, valor) {\n  // tu código aquí\n}\n`
      }
    ]
  },
  {
    dia: 28,
    semana: 4,
    titulo: 'Mini app real',
    objetivo: 'Construir una mini app con SvelteKit y Supabase.',
    explicacion: `Una app real combina rutas, layouts, load, actions y Supabase.
Flujo típico: usuario hace login → +layout.server.ts carga sus datos → +page.svelte los muestra.
Hoy simulas un flujo completo en JS: login, guardar, leer, render.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe `login(email, password, usuarios)` que busque en `usuarios` uno con email+password y devuelva `{ok: true, user}` o `{ok: false}`.',
        plantilla: `// Día 28 - Ejercicio 1\n\nfunction login(email, password, usuarios) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe `crearTarea(tareas, texto, userId)` que devuelva un nuevo array con la tarea añadida `{id, texto, userId, hecha: false}`. Id incremental.',
        plantilla: `// Día 28 - Ejercicio 2\n\nfunction crearTarea(tareas, texto, userId) {\n  // tu código aquí\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe `tareasDeUsuario(tareas, userId)` que devuelva solo las tareas de ese usuario, ordenadas por id descendente.',
        plantilla: `// Día 28 - Ejercicio 3\n\nfunction tareasDeUsuario(tareas, userId) {\n  // tu código aquí\n}\n`
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════
  // SEMANA 5 — ENTREVISTAS Y DEFENSA
  // ═══════════════════════════════════════════════════════════════════
  {
    dia: 29,
    semana: 5,
    titulo: 'Explicar tu stack',
    objetivo: 'Saber explicar tu stack en una entrevista.',
    explicacion: `En una entrevista te van a pedir: "Háblame de tu stack". Debes saber explicar cada pieza en una frase.
SvelteKit: framework full-stack para web rápida. WordPress: CMS para webs con backend de contenido. Supabase: BD + auth gestionado. APIs/IA: integraciones con servicios externos.
Los ejercicios de hoy son funciones que devuelven el string de tu respuesta a cada pregunta. Sé claro y breve.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe una función `explicarSvelteKit()` que devuelva un string explicando qué es SvelteKit (2-3 frases).',
        plantilla: `// Día 29 - Ejercicio 1\n\nfunction explicarSvelteKit() {\n  return \`tu respuesta aquí\`;\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe `explicarSupabase()` que devuelva un string explicando qué es Supabase y por qué lo usas (2-3 frases).',
        plantilla: `// Día 29 - Ejercicio 2\n\nfunction explicarSupabase() {\n  return \`tu respuesta aquí\`;\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe `explicarStackCompleto()` que devuelva un string presentando tu stack completo (SvelteKit, WordPress, Supabase, APIs/IA) en 4-5 frases naturales.',
        plantilla: `// Día 29 - Ejercicio 3\n\nfunction explicarStackCompleto() {\n  return \`tu respuesta aquí\`;\n}\n`
      }
    ]
  },
  {
    dia: 30,
    semana: 5,
    titulo: 'Preguntas de entrevista',
    objetivo: 'Responder preguntas técnicas comunes.',
    explicacion: `Te preguntarán: "¿Qué es un componente?", "¿Diferencia entre client-side y server-side?", "¿Qué es una API REST?".
Responde corto, con ejemplos. No teorices, demuestra que lo has tocado.
Tus respuestas van como strings en las funciones.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe `queEsComponente()` que devuelva tu respuesta a "¿Qué es un componente?" (3-4 frases).',
        plantilla: `// Día 30 - Ejercicio 1\n\nfunction queEsComponente() {\n  return \`tu respuesta aquí\`;\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe `clientVsServer()` que devuelva tu respuesta a "¿Diferencia entre client-side y server-side rendering?" (3-4 frases con ejemplo).',
        plantilla: `// Día 30 - Ejercicio 2\n\nfunction clientVsServer() {\n  return \`tu respuesta aquí\`;\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe `queEsApiRest()` que devuelva tu respuesta a "¿Qué es una API REST?" con ejemplo de endpoint.',
        plantilla: `// Día 30 - Ejercicio 3\n\nfunction queEsApiRest() {\n  return \`tu respuesta aquí\`;\n}\n`
      }
    ]
  },
  {
    dia: 31,
    semana: 5,
    titulo: 'Defender proyectos',
    objetivo: 'Hablar de proyectos del portfolio.',
    explicacion: `"Cuéntame un proyecto del que estés orgulloso" es la pregunta clave.
Estructura STAR: Situación, Tarea, Acción, Resultado. Sé concreto: nombra tecnologías, decisiones, lo que aprendiste.
Hoy preparas 3 respuestas tipo para tus proyectos.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe `defenderProyecto1()` que devuelva un string presentando un proyecto tuyo: qué hace, stack, qué aprendiste (4-5 frases).',
        plantilla: `// Día 31 - Ejercicio 1\n\nfunction defenderProyecto1() {\n  return \`tu respuesta aquí\`;\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe `decisionTecnica()` que cuente una decisión técnica importante que hayas tomado y por qué (4-5 frases).',
        plantilla: `// Día 31 - Ejercicio 2\n\nfunction decisionTecnica() {\n  return \`tu respuesta aquí\`;\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe `loQueMejoraria()` que conteste a "¿Qué mejorarías de tu proyecto si tuvieras más tiempo?" mostrando autocrítica sana (3-4 frases).',
        plantilla: `// Día 31 - Ejercicio 3\n\nfunction loQueMejoraria() {\n  return \`tu respuesta aquí\`;\n}\n`
      }
    ]
  },
  {
    dia: 32,
    semana: 5,
    titulo: 'Revisión técnica',
    objetivo: 'Repasar rutas, componentes, props, load, forms, fetch.',
    explicacion: `Hoy haces un test rápido: responde por escrito a cada pregunta como si la tuvieras en una entrevista técnica.
Sé concreto. Mejor un ejemplo de 2 líneas que media página de teoría.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe `explicarLoad()` que responda en 3 frases: "¿Qué hace la función load en SvelteKit?".',
        plantilla: `// Día 32 - Ejercicio 1\n\nfunction explicarLoad() {\n  return \`tu respuesta aquí\`;\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe `explicarProps()` que responda en 3 frases: "¿Cómo se pasan props entre componentes en Svelte 5?".',
        plantilla: `// Día 32 - Ejercicio 2\n\nfunction explicarProps() {\n  return \`tu respuesta aquí\`;\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe `explicarActions()` que responda en 3 frases: "¿Cómo funcionan las form actions en SvelteKit y para qué sirven?".',
        plantilla: `// Día 32 - Ejercicio 3\n\nfunction explicarActions() {\n  return \`tu respuesta aquí\`;\n}\n`
      }
    ]
  },
  {
    dia: 33,
    semana: 5,
    titulo: 'Simulación real',
    objetivo: 'Simular una entrevista técnica completa.',
    explicacion: `Imagina que estás en una entrevista de 30 minutos para un puesto junior de desarrollador web con SvelteKit y WordPress.
Las preguntas se vuelven más complejas. Responde como en un papel: claro, sin titubear.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe `presentacion()` que devuelva tu presentación de 30 segundos (quién eres, qué haces, qué buscas).',
        plantilla: `// Día 33 - Ejercicio 1\n\nfunction presentacion() {\n  return \`tu respuesta aquí\`;\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe `comoIntegrarWordPressYSvelteKit()` que explique cómo usarías WordPress como headless CMS con SvelteKit (4-5 frases).',
        plantilla: `// Día 33 - Ejercicio 2\n\nfunction comoIntegrarWordPressYSvelteKit() {\n  return \`tu respuesta aquí\`;\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe `preguntaParaEntrevistador()` que devuelva una pregunta tuya para hacer al final de la entrevista, demostrando interés genuino.',
        plantilla: `// Día 33 - Ejercicio 3\n\nfunction preguntaParaEntrevistador() {\n  return \`tu respuesta aquí\`;\n}\n`
      }
    ]
  },
  {
    dia: 34,
    semana: 5,
    titulo: 'Repaso general',
    objetivo: 'Identificar lo que aún hay que reforzar.',
    explicacion: `Último repaso antes del día final. Identifica tus 3 puntos débiles y reconócelos por escrito.
Saber lo que no sabes es tan valioso como saber lo que sabes.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Escribe `puntosFuertes()` que devuelva un string listando 3 cosas que dominas bien del stack.',
        plantilla: `// Día 34 - Ejercicio 1\n\nfunction puntosFuertes() {\n  return \`tu respuesta aquí\`;\n}\n`
      },
      {
        numero: 2,
        enunciado:
          'Escribe `puntosDebiles()` que devuelva un string listando 3 cosas en las que aún flaqueas y cómo planeas mejorarlas.',
        plantilla: `// Día 34 - Ejercicio 2\n\nfunction puntosDebiles() {\n  return \`tu respuesta aquí\`;\n}\n`
      },
      {
        numero: 3,
        enunciado:
          'Escribe `siguientePaso()` que devuelva un string explicando qué vas a hacer la próxima semana para seguir creciendo.',
        plantilla: `// Día 34 - Ejercicio 3\n\nfunction siguientePaso() {\n  return \`tu respuesta aquí\`;\n}\n`
      }
    ]
  },
  {
    dia: 35,
    semana: 5,
    titulo: 'Código real',
    objetivo: 'Leer y explicar código línea por línea.',
    explicacion: `Mira el código que aparece como plantilla y explícalo línea por línea, como si se lo contaras a alguien que empieza.
Tu objetivo no es ejecutarlo, es demostrar que entiendes lo que hace cada parte.`,
    ejercicios: [
      {
        numero: 1,
        enunciado:
          'Lee el código de la plantilla. En el comentario final, escribe qué hace este código en 3 líneas.',
        plantilla: `// Día 35 - Ejercicio 1\n// Explica este código línea por línea en un comentario al final.\n\nasync function obtenerUsuarios() {\n  const res = await fetch('/api/usuarios');\n  if (!res.ok) throw new Error('Fallo en la petición');\n  const datos = await res.json();\n  return datos.filter(u => u.activo);\n}\n\n// Tu explicación aquí:\n//\n`
      },
      {
        numero: 2,
        enunciado:
          'Mismo ejercicio con este componente simulado. Explica qué hace en un comentario al final.',
        plantilla: `// Día 35 - Ejercicio 2\n\nfunction CardUsuario({ nombre, edad, activo }) {\n  const estado = activo ? 'En línea' : 'Desconectado';\n  return \`\n    <div class="card">\n      <h3>\${nombre}</h3>\n      <p>Edad: \${edad}</p>\n      <span>\${estado}</span>\n    </div>\n  \`;\n}\n\n// Tu explicación aquí:\n//\n`
      },
      {
        numero: 3,
        enunciado:
          'Explica este action de SvelteKit. ¿Qué hace cada línea?',
        plantilla: `// Día 35 - Ejercicio 3\n\nconst actions = {\n  guardar: async ({ request, locals }) => {\n    const data = await request.formData();\n    const titulo = String(data.get('titulo'));\n    if (!titulo) return { ok: false, error: 'falta título' };\n    await locals.supabase.from('posts').insert({ titulo, user_id: locals.user.id });\n    return { ok: true };\n  }\n};\n\n// Tu explicación aquí:\n//\n`
      }
    ]
  }
];
