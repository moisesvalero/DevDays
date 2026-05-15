import type { Leccion } from '$lib/types/lesson';
import { sec, ej } from './_helpers';

export const week3: Leccion[] = [
  {
    dia: 15,
    semana: 3,
    tipo: 'leccion',
    titulo: 'Svelte y SvelteKit: el stack UI',
    objetivo: 'Diferenciar compilador Svelte, framework SvelteKit y cómo encajan en DevDays.',
    contenido: {
      intro:
        'Svelte compila componentes .svelte a JavaScript mínimo en build; SvelteKit añade file-based routing, SSR y adapters de despliegue. En este bootcamp el portal /estudio ya corre ese stack — hoy nombras las piezas, no montas el proyecto desde cero.',
      secciones: [
        sec(
          'Svelte (compilador UI)',
          'Como un taller que corta las piezas de madera en fábrica y te las entrega listas para montar, en lugar de traer la sierra entera a cada obra.',
          'Interfaces más ligeras: menos runtime en el navegador, arranque más rápido en móvil y redes lentas.',
          'Svelte analiza tu `.svelte` en compile time y genera código DOM eficiente. No es una librería que re-renderiza un árbol virtual en cada tick como React.',
          'Componente = archivo MiCard.svelte exportado e importado.',
          [
            'Lea el bloque «En código» y el ejemplo.',
            'Complete la plantilla del ejercicio 1.',
            'Compruebe la salida con console.log.'
          ]
        ),
        sec(
          'SvelteKit (app framework)',
          'El plano del edificio: cada habitación tiene dirección (URL) y puertas al servidor (load, actions, hooks).',
          'Rutas, datos en servidor, auth y deploy sin montar Express a mano.',
          'Carpetas bajo `src/routes/` mapean URLs: `+page.svelte` pinta la vista, `+page.server.ts` carga datos con `load`, `+layout.svelte` envuelve hijas. `+page.ts` sirve para load universal (cliente + servidor).',
          'src/routes/+page.svelte → /',
          [
            'Lea el bloque «En código» y el ejemplo.',
            'Complete la plantilla del ejercicio 2.',
            'Compruebe la salida con console.log.'
          ]
        ),
        sec(
          'Stack DevDays',
          'Tres proveedores en el mismo mostrador: UI (Svelte), datos (Supabase), corrección (API `/api/corregir`).',
          'Saber qué archivo tocar cuando cambias pantalla, sesión o lección.',
          'Frontend SvelteKit 2 + runes; backend vía endpoints en `src/routes/api/`; sesión Supabase en `hooks.server.ts`. Las lecciones viven en TypeScript estático (`week3.ts`), no en CMS.',
          '// UI + datos + tutor IA en el mismo repo',
          [
            'Lea el bloque «En código» y el ejemplo.',
            'Complete la plantilla del ejercicio 3.',
            'Compruebe la salida con console.log.'
          ]
        )
      ],
      resumen: [
        'Svelte = compilador de componentes reactivos.',
        'SvelteKit = rutas, SSR, API routes y build.',
        'DevDays = SvelteKit + Supabase + tutor IA.'
      ]
    },
    ejercicios: [
      ej(
        1,
        'Ficha de arquitectura',
        {
          planteamiento:
            'Se solicita documentar en consola qué es un componente Svelte dentro del stack UI del bootcamp.',
          requisitos: [
            'Defina la variable `respuesta` con una frase técnica que describa qué es un componente Svelte.',
            'Escriba en consola el valor de `respuesta`.'
          ],
          salidaEsperada: 'Menciona pieza reutilizable o .svelte',
          seccionRef: 'Svelte (compilador UI)',
          notas: 'Consulte la sección «Svelte (compilador UI)».'
        },
        ['Texto define componente'],
        `const respuesta = \`...\`;\nconsole.log(respuesta);`
      ),
      ej(
        2,
        'Ruta raíz',
        {
          planteamiento:
            'Se solicita identificar el archivo de ruta que SvelteKit asocia a la URL raíz del sitio.',
          requisitos: [
            'Asigne a `path` la ruta de archivo que sirve la URL `/` en SvelteKit.',
            'Escriba en consola `path`.'
          ],
          salidaEsperada: 'src/routes/+page.svelte',
          seccionRef: 'SvelteKit (app framework)',
          notas: 'Consulte la sección «SvelteKit (app framework)».'
        },
        ['Convención +page.svelte en routes'],
        `const path = '';\nconsole.log(path);`
      ),
      ej(
        3,
        'Menos JS en cliente',
        {
          planteamiento:
            'Se solicita explicar por qué Svelte suele enviar menos JavaScript al navegador que frameworks con runtime grande.',
          requisitos: [
            'Defina la variable `respuesta` con una frase que justifique el menor peso del bundle en cliente.',
            'Escriba en consola `respuesta`.'
          ],
          salidaEsperada: 'Menciona compilar / build / ligero',
          seccionRef: 'Stack DevDays',
          notas: 'Consulte la sección «Stack DevDays».'
        },
        ['Texto sobre compilación o bundle'],
        `const respuesta = \`...\`;\nconsole.log(respuesta);`
      )
    ]
  },
  {
    dia: 16,
    semana: 3,
    tipo: 'leccion',
    titulo: 'Archivo .svelte: script, markup, style',
    objetivo: 'Leer y escribir la estructura estándar de un componente Svelte 5.',
    contenido: {
      intro:
        'Un archivo .svelte combina <script> (lógica TS/JS), markup HTML-like con directivas Svelte, y <style> con scope automático. SvelteKit importa esos módulos en +page.svelte y en componentes bajo $lib/components/.',
      secciones: [
        sec(
          'Tres bloques del archivo',
          'Plano en tres capas: motor arriba, cartel en el centro, pintura abajo que solo afecta a esta pieza.',
          'Separar lógica, vista y estilo sin mezclar CSS global por accidente.',
          '`<script lang="ts">` declara variables, runes e imports. El markup es HTML con `{expresiones}` y directivas (`{#if}`, `{#each}`). `<style>` aplica estilos scoped al componente (Svelte añade atributos únicos).',
          '<script lang="ts">let x = 1;</script>\n<p>{x}</p>\n<style>p { color: teal; }</style>',
          [
            'Lea el bloque «En código» y el ejemplo.',
            'Complete la plantilla del ejercicio 1.',
            'Compruebe la salida con console.log.'
          ]
        ),
        sec(
          'Import y composición',
          'Encajar piezas prefabricadas: el `+page` es el montaje final del catálogo.',
          'Apps mantenibles: pantallas pequeñas reutilizables (botón, card, editor).',
          'Importas con ES modules: `import Card from "$lib/components/ui/card/card.svelte"`. El árbol de componentes es estático — el bundler (Vite) resuelve dependencias en build.',
          "import Button from '$lib/components/ui/button/button.svelte';",
          [
            'Lea el bloque «En código» y el ejemplo.',
            'Complete la plantilla del ejercicio 2.',
            'Compruebe la salida con console.log.'
          ]
        ),
        sec(
          'Interpolación `{expresión}`',
          'Hueco en el cartel donde entra el valor actual del almacén.',
          'Mostrar estado, props y `$derived` sin concatenar strings en el DOM a mano.',
          'En markup, `{nombre}` evalúa JavaScript y escapa HTML por defecto. Para HTML crudo existe `{@html}` (úsalo solo con contenido confiable).',
          '<p>Hola {nombre}</p>',
          [
            'Lea el bloque «En código» y el ejemplo.',
            'Complete la plantilla del ejercicio 3.',
            'Compruebe la salida con console.log.'
          ]
        )
      ],
      resumen: [
        '.svelte = script + markup + style scoped.',
        'import = composición de componentes.',
        '{ } = binding de expresión en template.'
      ]
    },
    ejercicios: [
      ej(
        1,
        'Template en string',
        {
          planteamiento:
            'Se solicita simular en un string el markup de un componente Svelte con interpolación de variable.',
          requisitos: [
            'Defina `markup` como string con un `h1` que incluya `{titulo}` al estilo Svelte (placeholder dentro del string).',
            'Escriba en consola `markup`.'
          ],
          salidaEsperada: 'h1 con placeholder de titulo',
          seccionRef: 'Tres bloques del archivo',
          notas: 'Consulte la sección «Tres bloques del archivo».'
        },
        ['String contiene h1 y titulo'],
        `const titulo = 'DevDays';\nconst markup = \`...\`;\nconsole.log(markup);`
      ),
      ej(
        2,
        'Partes del archivo',
        {
          planteamiento:
            'Se solicita representar las tres secciones canónicas de un archivo `.svelte`.',
          requisitos: [
            'Construya el array `partes` con tres strings: `script`, `html` y `style` (nombres de sección).',
            'Escriba en consola `partes.length`.'
          ],
          salidaEsperada: '3',
          seccionRef: 'Import y composición',
          notas: 'Consulte la sección «Import y composición».'
        },
        ['Array de tres elementos'],
        `const partes = [];\nconsole.log(partes.length);`
      ),
      ej(
        3,
        'Ruta de import',
        {
          planteamiento:
            'Se solicita indicar una ruta de importación válida para un componente en `$lib`.',
          requisitos: [
            'Asigne a `importPath` un string válido para importar `Button.svelte` desde `$lib`.',
            'Escriba en consola `importPath`.'
          ],
          salidaEsperada: 'Ruta con $lib o relativa a components',
          seccionRef: 'Interpolación `{expresión}`',
          notas: 'Consulte la sección «Interpolación `{expresión}`».'
        },
        ['String de import ES'],
        `const importPath = '';\nconsole.log(importPath);`
      )
    ]
  },
  {
    dia: 17,
    semana: 3,
    tipo: 'leccion',
    titulo: '$state: estado reactivo mutable',
    objetivo: 'Declarar datos que, al cambiar, actualizan el markup automáticamente.',
    contenido: {
      intro:
        '$state es la rune de Svelte 5 para estado mutable reactivo: sustituye el patrón let x + asignación que en Svelte 3/4 dependía del compilador. Al mutar el valor, Svelte marca dependientes y actualiza el DOM de forma granular.',
      secciones: [
        sec(
          '$state(primitivo)',
          'Contador en el mostrador: si sube el número en el almacén, el cartel cambia sin que nadie repinte a mano.',
          'Contadores, inputs controlados, flags de UI (modal abierto, pestaña activa).',
          '`let contador = $state(0)` crea una señal reactiva. `contador++` o `contador = 1` disparan actualización en el template que lo lee. No necesitas `setState` ni stores para estado local.',
          'let n = $state(0);\nn++;',
          [
            'Lea el bloque «En código» y el ejemplo.',
            'Complete la plantilla del ejercicio 1.',
            'Compruebe la salida con console.log.'
          ]
        ),
        sec(
          '$state(objeto | array)',
          'La ficha del pedido entera está viva: cambias una línea y la lista en pantalla se entera.',
          'Listas de tareas, carritos, formularios con varios campos en un solo objeto.',
          '`let items = $state<string[]>([])` y `let user = $state({ nombre: "" })` son reactivos. Mutaciones como `items.push(x)` o `user.nombre = "Ana"` invalidan lectores. Para reemplazo inmutable también vale `items = [...items, x]`.',
          'let items = $state([]);\nitems.push("nuevo");',
          [
            'Lea el bloque «En código» y el ejemplo.',
            'Complete la plantilla del ejercicio 2.',
            'Compruebe la salida con console.log.'
          ]
        ),
        sec(
          'TypeScript con runes',
          'Etiqueta en la caja que dice “solo números” — el editor avisa antes de romper producción.',
          'Menos bugs en equipos: autocompletado y errores en `$props` y `$state`.',
          'Anota genéricos: `let n = $state<number>(0)`, `let lista = $state<Producto[]>([])`. En `<script lang="ts">` el checker de Svelte valida tipos en compile time.',
          'let n = $state<number>(0);',
          [
            'Lea el bloque «En código» y el ejemplo.',
            'Complete la plantilla del ejercicio 3.',
            'Compruebe la salida con console.log.'
          ]
        )
      ],
      resumen: [
        '$state = mutable + reactivo.',
        'Objetos y arrays: mutación reactiva.',
        'Tipos opcionales en script TS.'
      ]
    },
    ejercicios: [
      ej(
        1,
        'Simular contador',
        {
          planteamiento:
            'Se solicita simular en JavaScript la mutación de estado que `$state` gestiona en un componente.',
          requisitos: [
            'Utilice el objeto `ui` con `count: 0`, incremente `count` en una unidad y escriba en consola su valor.'
          ],
          salidaEsperada: '1',
          seccionRef: '$state(primitivo)',
          notas: 'Consulte la sección «$state(primitivo)».'
        },
        ['Incremento y log 1'],
        `const ui = { count: 0 };\nui.count++;\nconsole.log(ui.count);`
      ),
      ej(
        2,
        'Array mutable',
        {
          planteamiento:
            'Se solicita practicar la mutación reactiva típica de arrays bajo `$state`.',
          requisitos: [
            'Parta de un array vacío, añada el elemento `"a"` con `push` y escriba en consola `length`.'
          ],
          salidaEsperada: '1',
          seccionRef: '$state(objeto | array)',
          notas: 'Consulte la sección «$state(objeto | array)».'
        },
        ['push y length'],
        `const lista = [];\nlista.push('a');\nconsole.log(lista.length);`
      ),
      ej(
        3,
        'Definición en texto',
        {
          planteamiento:
            'Se solicita definir con sus palabras el comportamiento de la rune `$state` en Svelte 5.',
          requisitos: [
            'Defina la variable `respuesta` con una frase que explique qué hace `$state`.',
            'Escriba en consola `respuesta`.'
          ],
          salidaEsperada: 'Menciona reactivo o actualiza UI',
          seccionRef: 'TypeScript con runes',
          notas: 'Consulte la sección «TypeScript con runes».'
        },
        ['Texto explica $state'],
        `const respuesta = \`...\`;\nconsole.log(respuesta);`
      )
    ]
  },
  {
    dia: 18,
    semana: 3,
    tipo: 'leccion',
    titulo: '$derived y $effect',
    objetivo: 'Valores calculados automáticos y efectos secundarios controlados.',
    contenido: {
      intro:
        '$derived expresa valores que dependen de otras señales (como un Excel que recalcula). $effect ejecuta código cuando cambian dependencias — útil para logging, localStorage o integraciones; evita lógica de negocio pesada dentro del efecto.',
      secciones: [
        sec(
          '$derived',
          'Precio en etiqueta: si cambia el coste en almacén, el total con IVA se recalcula solo en la caja.',
          'Totales, filtros, clases CSS condicionales, texto formateado derivado de props/estado.',
          '`const total = $derived(precio * cantidad)` se recalcula cuando `precio` o `cantidad` cambian. Para lógica multi-línea: `const etiqueta = $derived.by(() => { ... })`.',
          'const doble = $derived(precio * 2);',
          [
            'Lea el bloque «En código» y el ejemplo.',
            'Complete la plantilla del ejercicio 1.',
            'Compruebe la salida con console.log.'
          ]
        ),
        sec(
          '$effect',
          'Cuando cambia el cliente en ficha, el sistema archiva copia en el cajón lateral.',
          'Sincronizar con APIs del navegador, analytics, focus, suscripciones fuera del template.',
          '`$effect(() => { ... })` corre tras commit DOM cuando lee señales reactivas dentro. Puede devolver cleanup: `return () => { subscription.unsubscribe() }` al destruir el componente.',
          '$effect(() => { console.log(usuario); });',
          [
            'Lea el bloque «En código» y el ejemplo.',
            'Complete la plantilla del ejercicio 2.',
            'Compruebe la salida con console.log.'
          ]
        ),
        sec(
          'Cleanup en $effect',
          'Apagar la máquina al cerrar el turno: quitar listeners que no siguen en otra pantalla.',
          'Evitar fugas de memoria en SPA largas (timers, listeners, observers).',
          'Si registras `setInterval`, `addEventListener` o `IntersectionObserver`, retorna función que los desmonte. Svelte la ejecuta antes del siguiente efecto o al unmount.',
          'return () => clearInterval(id);',
          [
            'Lea el bloque «En código» y el ejemplo.',
            'Complete la plantilla del ejercicio 3.',
            'Compruebe la salida con console.log.'
          ]
        )
      ],
      resumen: [
        '$derived = valor calculado reactivo.',
        '$effect = side effect tras cambio.',
        'return en $effect = cleanup.'
      ]
    },
    ejercicios: [
      ej(
        1,
        'Total con IVA',
        {
          planteamiento:
            'Se solicita calcular un total con IVA a partir de precio base y tipo impositivo (equivalente manual a `$derived`).',
          requisitos: [
            'Con `precio` 10 e `iva` 0.21, calcule el total con IVA incluido y escriba el resultado en consola.'
          ],
          salidaEsperada: '12.1',
          seccionRef: '$derived',
          notas: 'Consulte la sección «$derived».'
        },
        ['Multiplica precio por 1+iva o suma iva'],
        `const precio = 10;\nconst iva = 0.21;\n\n`
      ),
      ej(
        2,
        'Cuándo $effect',
        {
          planteamiento:
            'Se solicita reflexionar sobre el uso adecuado de `$effect` frente a lógica en el template.',
          requisitos: [
            'Escriba un comentario indicando en qué caso usaría `$effect` en un componente real.'
          ],
          salidaEsperada: 'Menciona cambio, sync o side effect',
          seccionRef: '$effect',
          notas: 'Consulte la sección «$effect».'
        },
        ['Comentario con idea de efecto'],
        `// Usaría $effect cuando...\n\n`
      ),
      ej(
        3,
        'Doble numérico',
        {
          planteamiento:
            'Se solicita obtener un valor derivado por multiplicación (análogo a `$derived` con una expresión simple).',
          requisitos: [
            'Con `n` igual a 5, escriba en consola el doble (`n * 2`).'
          ],
          salidaEsperada: '10',
          seccionRef: 'Cleanup en $effect',
          notas: 'Consulte la sección «Cleanup en $effect».'
        },
        ['Multiplicación por 2'],
        `const n = 5;\nconsole.log(n * 2);`
      )
    ]
  },
  {
    dia: 19,
    semana: 3,
    tipo: 'leccion',
    titulo: '$props: API del componente',
    objetivo: 'Recibir datos del padre, defaults y slots con snippets.',
    contenido: {
      intro:
        '$props() declara la interfaz pública del componente (sustituye export let de Svelte 4). El padre pasa atributos como en HTML; el hijo desestructura con tipos y valores por defecto. {@render children?.()} compone contenido interior con snippets tipados.',
      secciones: [
        sec(
          '$props() y destructuring',
          'Instrucciones en el sobre que llega al taller: título del cartel, color, si está activo.',
          'Reutilizar `Card`, `Button`, filas de lista con distintos datos sin duplicar markup.',
          'En `<script lang="ts">`: `let { titulo, activo = false } = $props();`. Props son de solo lectura — si el hijo necesita mutar, copia a `$state` local o usa `$bindable` en casos concretos.',
          'let { titulo, activo = false } = $props();',
          [
            'Lea el bloque «En código» y el ejemplo.',
            'Complete la plantilla del ejercicio 1.',
            'Compruebe la salida con console.log.'
          ]
        ),
        sec(
          'Valores por defecto',
          'Si el capataz no manda color, pintas gris de fábrica.',
          'Componentes flexibles sin obligar al padre a pasar cada atributo.',
          'Defaults en destructuring: `let { variant = "default" } = $props()`. También puedes tipar: `let { label }: { label: string } = $props()`.',
          'let { color = "gris" } = $props();',
          [
            'Lea el bloque «En código» y el ejemplo.',
            'Complete la plantilla del ejercicio 2.',
            'Compruebe la salida con console.log.'
          ]
        ),
        sec(
          'Snippets y children',
          'Hueco en el marco donde el padre inserta su propio cartel interior.',
          'Layouts (`+layout.svelte`), wrappers, tabs — composición sin prop-drilling de HTML strings.',
          'Define `children` como `Snippet` opcional: `import type { Snippet } from "svelte";` y `let { children }: { children?: Snippet } = $props();`. En markup: `{@render children?.()}`.',
          '{@render children?.()}',
          [
            'Lea el bloque «En código» y el ejemplo.',
            'Complete la plantilla del ejercicio 3.',
            'Compruebe la salida con console.log.'
          ]
        )
      ],
      resumen: [
        '$props = contrato entrada.',
        'Defaults en destructuring.',
        'Snippet children = slot Svelte 5.'
      ]
    },
    ejercicios: [
      ej(
        1,
        'Objeto props',
        {
          planteamiento:
            'Se solicita simular la lectura de props que un componente hijo recibe del padre.',
          requisitos: [
            'Simule `props = { label: "OK" }` y escriba en consola `props.label`.'
          ],
          salidaEsperada: 'OK',
          seccionRef: '$props() y destructuring',
          notas: 'Consulte la sección «$props() y destructuring».'
        },
        ['Acceso a label'],
        `const props = { label: 'OK' };\nconsole.log(props.label);`
      ),
      ej(
        2,
        'Default con ??',
        {
          planteamiento:
            'Se solicita aplicar un valor por defecto cuando una prop opcional no está definida.',
          requisitos: [
            'Parta de un objeto `props` vacío y resuelva `color` con el operador `??` para que valga `"gris"`.',
            'Escriba en consola `color`.'
          ],
          salidaEsperada: 'gris',
          seccionRef: 'Valores por defecto',
          notas: 'Consulte la sección «Valores por defecto».'
        },
        ['Nullish coalescing o default'],
        `const props = {};\nconst color = props.color ?? 'gris';\nconsole.log(color);`
      ),
      ej(
        3,
        'Sintaxis snippet',
        {
          planteamiento:
            'Se solicita identificar la sintaxis Svelte 5 para renderizar contenido hijo con snippets.',
          requisitos: [
            'Asigne a `linea` el texto exacto `{@render children?.()}`.',
            'Escriba en consola `linea`.'
          ],
          salidaEsperada: 'Contiene render children',
          seccionRef: 'Snippets y children',
          notas: 'Consulte la sección «Snippets y children».'
        },
        ['String con sintaxis Svelte 5'],
        `const linea = '{@render children?.()}';\nconsole.log(linea);`
      )
    ]
  },
  {
    dia: 20,
    semana: 3,
    tipo: 'leccion',
    titulo: 'Eventos DOM y bind: two-way',
    objetivo: 'Manejar interacción con `onclick` y enlazar inputs al estado.',
    contenido: {
      intro:
        'En Svelte 5 los eventos usan atributos como onclick (no on:click legacy en código nuevo). bind:value, bind:checked y $bindable en props crean enlace bidireccional sin addEventListener manual ni leer .value en cada input.',
      secciones: [
        sec(
          'Eventos (onclick, onsubmit)',
          'Timbre del mostrador: el usuario pulsa y ejecutas la función registrada.',
          'Botones, formularios, teclado; lógica en script, markup declarativo.',
          '`<button onclick={() => contador++}>+</button>`. Pasa el handler: `onclick={incrementar}` o define `function incrementar() { ... }` en script. En formularios: `onsubmit={(e) => { e.preventDefault(); ... }}`.',
          '<button onclick={() => n++}>Sumar</button>',
          [
            'Lea el bloque «En código» y el ejemplo.',
            'Complete la plantilla del ejercicio 1.',
            'Compruebe la salida con console.log.'
          ]
        ),
        sec(
          'bind:value',
          'Cable entre el cuaderno del operario y el cartel: escribes en uno y se lee en el otro.',
          'Formularios de login, búsqueda, comentarios sin sincronizar input y variable a mano.',
          '`<input bind:value={nombre} />` mantiene `nombre` al día con el input text/textarea. Con `$state`, la mutación del input re-renderiza dependientes.',
          '<input bind:value={nombre} />',
          [
            'Lea el bloque «En código» y el ejemplo.',
            'Complete la plantilla del ejercicio 2.',
            'Compruebe la salida con console.log.'
          ]
        ),
        sec(
          'bind:checked y booleanos',
          'Interruptor sí/no del almacén enlazado al checkbox.',
          'Términos legales, filtros “solo activos”, toggles de configuración.',
          '`<input type="checkbox" bind:checked={acepto} />` liga boolean. Combina con `{#if acepto}` o un ternario en script: `ok ? "aceptado" : "pendiente"`.',
          '<input type="checkbox" bind:checked={ok} />',
          [
            'Lea el bloque «En código» y el ejemplo.',
            'Complete la plantilla del ejercicio 3.',
            'Compruebe la salida con console.log.'
          ]
        )
      ],
      resumen: [
        'onclick = handler de interacción.',
        'bind:value = texto two-way.',
        'bind:checked = boolean two-way.'
      ]
    },
    ejercicios: [
      ej(
        1,
        'Handler incremento',
        {
          planteamiento:
            'Se solicita simular un manejador de evento `onclick` que muta estado local.',
          requisitos: [
            'Con `c` inicializado en 0, defina la función `click` que incrementa `c`, invóquela y escriba `c` en consola.'
          ],
          salidaEsperada: '1',
          seccionRef: 'Eventos (onclick, onsubmit)',
          notas: 'Consulte la sección «Eventos (onclick, onsubmit)».'
        },
        ['Función muta contador'],
        `let c = 0;\nfunction click() { c++; }\nclick();\nconsole.log(c);`
      ),
      ej(
        2,
        'Mensaje con nombre',
        {
          planteamiento:
            'Se solicita construir un mensaje enlazado a una variable de nombre (análogo a `bind:value`).',
          requisitos: [
            'Con `nombre` igual a `"Ana"`, defina `msg` como template de saludo e imprímalo en consola.'
          ],
          salidaEsperada: 'Hola Ana o equivalente',
          seccionRef: 'bind:value',
          notas: 'Consulte la sección «bind:value».'
        },
        ['Template incluye nombre'],
        `let nombre = 'Ana';\nconst msg = \`Hola \${nombre}\`;\nconsole.log(msg);`
      ),
      ej(
        3,
        'Condicional checked',
        {
          planteamiento:
            'Se solicita ramificar la salida según un booleano (análogo a `bind:checked`).',
          requisitos: [
            'Con `ok` en `true`, escriba en consola `"aceptado"`; en caso contrario, `"pendiente"`.'
          ],
          salidaEsperada: 'aceptado',
          seccionRef: 'bind:checked y booleanos',
          notas: 'Consulte la sección «bind:checked y booleanos».'
        },
        ['Ternario o if con ok'],
        `const ok = true;\nconsole.log(ok ? 'aceptado' : 'pendiente');`
      )
    ]
  },
  {
    dia: 21,
    semana: 3,
    tipo: 'examen',
    titulo: 'Repaso Semana 3: Svelte 5',
    objetivo: 'Runes, componentes y eventos en código corto — la IA valora el efecto, no la sintaxis perfecta.',
    instrucciones: `Cinco retos conceptuales con código corto. Importa el resultado final, no el estilo exacto.`,
    ejercicios: [
      ej(
        1,
        '$state en texto',
        {
          planteamiento:
            'Repaso de semana: defina en prosa el rol de la rune `$state` en Svelte 5.',
          requisitos: [
            'Defina la variable `respuesta` explicando `$state` en una o dos frases.',
            'Escriba en consola `respuesta`.'
          ],
          salidaEsperada: 'Menciona reactivo o actualización UI',
          seccionRef: 'Repaso semana 3',
          notas: 'Repaso de los días 15–20 (semana 3): rune $state.'
        },
        ['Texto con idea de $state'],
        `const respuesta = \`...\`;\nconsole.log(respuesta);`
      ),
      ej(
        2,
        '$derived manual',
        {
          planteamiento:
            'Repaso de semana: calcule un total derivado de precio y cantidad sin usar runes en el entorno de práctica.',
          requisitos: [
            'Con `precio` 5 y `cant` 3, escriba en consola el producto (total).'
          ],
          salidaEsperada: '15',
          seccionRef: 'Repaso semana 3',
          notas: 'Repaso de los días 15–20 (semana 3): $derived y cálculos derivados.'
        },
        ['Multiplica precio por cantidad'],
        `const precio = 5, cant = 3;\nconsole.log(precio * cant);`
      ),
      ej(
        3,
        '$props simulado',
        {
          planteamiento: 'Repaso de semana: lea una prop simulada desde un objeto.',
          requisitos: [
            'Utilice `props` con `titulo: "Hola"` y escriba en consola `props.titulo`.'
          ],
          salidaEsperada: 'Hola',
          seccionRef: 'Repaso semana 3',
          notas: 'Repaso de los días 15–20 (semana 3): $props y lectura de props.'
        },
        ['Lee props.titulo'],
        `const props = { titulo: 'Hola' };\nconsole.log(props.titulo);`
      ),
      ej(
        4,
        'Toggle evento',
        {
          planteamiento:
            'Repaso de semana: invierta un booleano con una función tipo manejador de evento.',
          requisitos: [
            'Con `on` en `false`, defina `toggle` que invierte el booleano, invóquela y escriba `on` en consola.'
          ],
          salidaEsperada: 'true',
          seccionRef: 'Repaso semana 3',
          notas: 'Repaso de los días 15–20 (semana 3): eventos onclick y handlers.'
        },
        ['toggle cambia on'],
        `let on = false;\nfunction toggle() { on = !on; }\ntoggle();\nconsole.log(on);`
      ),
      ej(
        5,
        'Anatomía .svelte',
        {
          planteamiento:
            'Repaso de semana: enumere las tres secciones de un archivo `.svelte` y compruebe su cantidad.',
          requisitos: [
            'Utilice un array con `script`, `html` y `style` y escriba en consola su longitud.'
          ],
          salidaEsperada: '3',
          seccionRef: 'Repaso semana 3',
          notas: 'Repaso de los días 15–20 (semana 3): anatomía del archivo .svelte.'
        },
        ['Array tres elementos'],
        `console.log(['script', 'html', 'style'].length);`
      )
    ]
  }
];
