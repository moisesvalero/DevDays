import type { Leccion } from '$lib/types/lesson';
import { sec, ej } from './_helpers';

export const week3: Leccion[] = [
  {
    dia: 15,
    semana: 3,
    tipo: 'leccion',
    titulo: 'Svelte: piezas prefabricadas',
    objetivo: 'Qué hace Svelte frente a “montar la web a mano”.',
    contenido: {
      intro: `Svelte compila tu componente a JS eficiente. SvelteKit añade rutas, servidor y despliegue. Piensa en módulos de cocina prefabricados que encajan.`,
      secciones: [
        sec('Svelte vs otros', 'React lleva mucho runtime; Svelte hace el trabajo al compilar.', 'Apps más ligeras, sintaxis cercana al HTML.', 'Componente = archivo .svelte'),
        sec('SvelteKit', 'Carpetas = URLs. +page.svelte = una pantalla.', 'Como plano de nave con habitaciones.', 'src/routes/+page.svelte → /'),
        sec('Stack DevDays', 'SvelteKit + Supabase + IA. Lo que ya usas en este portal.', 'Tu proyecto real encaja aquí.', '')
      ],
      resumen: ['Svelte = compilador UI.', 'SvelteKit = app completa.', 'Rutas por carpetas.']
    },
    ejercicios: [
      ej(1, 'En texto.', 'respuesta: una frase qué hace un componente.', ['Menciona pieza/reutilizable'], ['Texto componente'], `const respuesta = \`...\`;\nconsole.log(respuesta);`),
      ej(2, 'Ruta raíz.', 'path string de archivo para URL /', ['src/routes/+page.svelte'], ['ruta page'], `const path = '';\nconsole.log(path);`),
      ej(3, 'Ventaja.', 'respuesta: por qué menos JS al usuario.', ['Menciona compilar/ligero'], ['Texto ventaja'], `const respuesta = \`...\`;\nconsole.log(respuesta);`)
    ]
  },
  {
    dia: 16,
    semana: 3,
    tipo: 'leccion',
    titulo: 'Tu primer componente .svelte',
    objetivo: 'Tres bloques: script, HTML, estilo.',
    contenido: {
      intro: `Un .svelte es una pieza: lógica arriba, cartel en medio, decoración abajo.`,
      secciones: [
        sec('Tres secciones', 'script = cerebro; HTML = lo que ve el usuario; style = pintura.', 'Separación clara.', '<script>...</script>\n<h1>Hola</h1>\n<style>...</style>'),
        sec('Importar componente', 'Como traer un módulo del almacén.', 'App = puzzle de piezas.', "import Card from './Card.svelte';"),
        sec('Interpolación', '{expresión} muestra valor en el cartel.', 'Nombre, contador, etc.', '<p>Hola {nombre}</p>')
      ],
      resumen: ['.svelte = script + markup + style.', 'Import = usar pieza.', '{ } = mostrar valor.']
    },
    ejercicios: [
      ej(1, 'String markup.', 'markup string con h1 y {titulo} dentro.', ['h1 con variable'], ['template con titulo'], `const titulo = 'DevDays';\nconst markup = \`...\`;\nconsole.log(markup);`),
      ej(2, 'Partes.', 'array con 3 strings: script, html, style.', ['3 partes'], ['array 3 elementos'], `const partes = [];\nconsole.log(partes.length);`),
      ej(3, 'Import path.', 'string ruta importar Button desde lib.', ['ruta con $lib o relativa'], ['string import'], `const importPath = '';\nconsole.log(importPath);`)
    ]
  },
  {
    dia: 17,
    semana: 3,
    tipo: 'leccion',
    titulo: '$state: lo que cambia al instante',
    objetivo: 'Cuando cambia un dato, la pantalla se actualiza sola.',
    contenido: {
      intro: `$state es la etiqueta “esto es vivo”: si cambia el contador, el cartel se repinta.`,
      secciones: [
        sec('$state básico', 'let contador = $state(0); al sumar, UI reacciona.', 'Botones, formularios, toggles.', 'let n = $state(0);\nn++;'),
        sec('Objetos y arrays', '$state({ ... }) y $state([...]).', 'Listas de tareas, carrito.', 'let items = $state([]);'),
        sec('TypeScript opcional', 'Tipos ayudan al editor, no al cerebro.', 'Autocompletado mejor.', 'let n = $state<number>(0);')
      ],
      resumen: ['$state = dato reactivo.', 'Cambia → pantalla cambia.', 'Objetos y arrays también.']
    },
    ejercicios: [
      ej(1, 'Simular estado.', 'objeto { count: 0 } incrementa count y muestra 1.', ['count 1'], ['incremento'], `const ui = { count: 0 };\nui.count++;\nconsole.log(ui.count);`),
      ej(2, 'Lista state.', 'array push elemento y length 1.', ['length 1'], ['push'], `const lista = [];\nlista.push('a');\nconsole.log(lista.length);`),
      ej(3, 'Explica.', 'respuesta qué hace $state en una frase.', ['reactivo/actualiza'], ['texto $state'], `const respuesta = \`...\`;\nconsole.log(respuesta);`)
    ]
  },
  {
    dia: 18,
    semana: 3,
    tipo: 'leccion',
    titulo: '$derived y $effect',
    objetivo: 'Calculado automático y efectos secundarios.',
    contenido: {
      intro: `$derived = cartel que se recalcula solo. $effect = cuando cambia X, haz Y (con cuidado).`,
      secciones: [
        sec('$derived', 'doble = precio * 2 siempre al día.', 'Totales, filtros visuales.', 'const doble = $derived(precio * 2);'),
        sec('$effect', 'Cuando cambia usuario, guarda en log o storage.', 'Sincronizar, analytics.', '$effect(() => { ... });'),
        sec('Cleanup', 'A veces hay que desmontar listener al salir.', 'Como apagar máquina al cerrar.', 'return () => cleanup();')
      ],
      resumen: ['$derived = calculado.', '$effect = reaccionar.', 'Cleanup = limpiar.']
    },
    ejercicios: [
      ej(1, 'Derived manual.', 'precio 10, iva 0.21, muestra total con iva.', ['12.1 aprox'], ['total con iva'], `const precio = 10;\nconst iva = 0.21;\n\n`),
      ej(2, 'Effect idea.', 'comentario: cuándo usarías $effect.', ['menciona cambio/side effect'], ['comentario'], `// Usaría $effect cuando...\n\n`),
      ej(3, 'Doble.', 'n=5 muestra n*2.', ['10'], ['multiplica'], `const n = 5;\nconsole.log(n * 2);`)
    ]
  },
  {
    dia: 19,
    semana: 3,
    tipo: 'leccion',
    titulo: '$props: datos que entran al componente',
    objetivo: 'Pasar piezas de fuera hacia dentro.',
    contenido: {
      intro: `El componente recibe props como instrucciones del capataz: título, color, deshabilitado.`,
      secciones: [
        sec('$props()', 'let { titulo } = $props();', 'Reutilizar Card con distintos textos.', 'let { titulo, activo = false } = $props();'),
        sec('Default', 'Si no mandan color, usa gris.', 'Valores por defecto.', 'activo = false en destructuring'),
        sec('Children snippets', '{@render children?.()} para contenido interior.', 'Layout que envuelve páginas.', 'import type { Snippet } from "svelte";')
      ],
      resumen: ['$props = entrada.', 'Defaults = respaldo.', 'children = hueco interior.']
    },
    ejercicios: [
      ej(1, 'Props objeto.', 'simula props { label: "OK" } y muestra label.', ['OK'], ['label'], `const props = { label: 'OK' };\nconsole.log(props.label);`),
      ej(2, 'Default.', 'props sin color usa "gris".', ['gris'], ['default'], `const props = {};\nconst color = props.color ?? 'gris';\nconsole.log(color);`),
      ej(3, 'Snippet línea.', 'const linea con {@render children?.()}', ['render children'], ['snippet render'], `const linea = '{@render children?.()}';\nconsole.log(linea);`)
    ]
  },
  {
    dia: 20,
    semana: 3,
    tipo: 'leccion',
    titulo: 'Eventos y formularios',
    objetivo: 'Clics y enlazar inputs con estado.',
    contenido: {
      intro: `onclick dispara acción. bind:value ata el input al estado como cable entre interruptor y bombilla.`,
      secciones: [
        sec('Eventos', 'onclick={() => contador++}', 'Interacción usuario.', '<button onclick={...}>'),
        sec('bind:value', 'Input y variable van juntos.', 'Formularios sin pelear con DOM.', '<input bind:value={nombre} />'),
        sec('bind:checked', 'Checkbox y boolean.', 'Aceptar términos.', '<input type="checkbox" bind:checked={ok} />')
      ],
      resumen: ['onclick = acción.', 'bind:value = texto ligado.', 'bind:checked = sí/no.']
    },
    ejercicios: [
      ej(1, 'Handler.', 'función que suma 1 a contador simulado.', ['incremento'], ['función suma'], `let c = 0;\nfunction click() { c++; }\nclick();\nconsole.log(c);`),
      ej(2, 'Bind simulado.', 'nombre variable cambia y se refleja en mensaje.', ['mensaje con nombre'], ['nombre en texto'], `let nombre = 'Ana';\nconst msg = \`Hola \${nombre}\`;\nconsole.log(msg);`),
      ej(3, 'Checked.', 'ok true muestra "aceptado".', ['aceptado'], ['condicional ok'], `const ok = true;\nconsole.log(ok ? 'aceptado' : 'pendiente');`)
    ]
  },
  {
    dia: 21,
    semana: 3,
    tipo: 'examen',
    titulo: 'Repaso Semana 3: Svelte 5',
    objetivo: 'Runes y componentes en concepto.',
    instrucciones: `Cinco retos conceptuales con código corto.`,
    ejercicios: [
      ej(1, '$state.', 'Explica $state en respuesta.', ['reactivo'], ['texto'], `const respuesta = \`...\`;\nconsole.log(respuesta);`),
      ej(2, '$derived.', 'precio y cantidad → total.', ['total correcto'], ['multiplica'], `const precio = 5, cant = 3;\nconsole.log(precio * cant);`),
      ej(3, '$props.', 'props titulo muestra en string.', ['titulo'], ['props'], `const props = { titulo: 'Hola' };\nconsole.log(props.titulo);`),
      ej(4, 'Evento.', 'función toggle boolean.', ['cambia'], ['toggle'], `let on = false;\nfunction toggle() { on = !on; }\ntoggle();\nconsole.log(on);`),
      ej(5, 'Componente.', '3 partes de .svelte en array.', ['3'], ['script html style'], `console.log(['script','html','style'].length);`)
    ]
  }
];
