# Design

## Visual Direction

DevDays usa un sistema **Street Lab educativo**: calle + neobrutal, stickers, tags, bordes duros y superficies tipo póster pegado. Debe sentirse como un taller urbano de código, no como una landing, un SaaS serio ni un editor técnico intimidante.

## Color

- Base protagonista: negro/tinta en dark mode, blanco roto tipo póster en light mode.
- Lima: acción principal, progreso activo, foco y checks.
- Rosa: golpes visuales, stickers, tags y estados de energía.
- Amarillo/blanco roto: apoyo para sellos, notas y superficies pegadas.
- El color puede dar personalidad, pero no debe tapar el contenido ni sustituir estados textuales.

## Typography

- Usar una fuente display solo en H1, tags, sellos y números grandes.
- Mantener fuente legible para pasos, mentor, inputs y cuerpo.
- Texto de ayuda con línea de 65-75 caracteres cuando sea prose.
- Etiquetas cortas con más actitud: misión, beat, pista, tag, sin slang forzado.

## Components

- Shell Street Lab: cabecera sticky con marca tipo sticker, progreso global y modo claro/oscuro.
- Intro cartel: explica qué se construye con composición de póster urbano.
- Barra de bloques: JavaScript, Svelte, SvelteKit como tracks con progreso.
- Panel misión: cartel neobrutal con día, dificultad, minutos, objetivo y estado esperado.
- Checklist: pasos practicables como sellos/checks persistidos.
- Gestor de tareas: pieza central, con aspecto de panel pegado/libreta de misión.
- Mentor: pistas por capas, microfeedback y consulta IA opcional con tono de apoyo.
- Ruta compacta: navegación como tablero de stickers numerados.

## Layout

- Desktop: curso en fases, con contenido principal dominante y apoyos laterales sticky.
- Mobile: intro → misión → gestor → checklist → mentor → ruta compacta.
- Evitar contenedores `fixed` que bloqueen scroll global.
- Evitar tarjetas dentro de tarjetas cuando no aportan una agrupación real.

## Motion & Feedback

- Transiciones cortas de 150-250 ms para selección, checklist y feedback.
- Microgolpes visuales al completar, añadir tarea o desbloquear pista.
- Animaciones decorativas solo en stickers o fondos, ligeras y no esenciales.
- Respetar `prefers-reduced-motion`.
