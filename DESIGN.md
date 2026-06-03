# Design

## Visual Direction

DevDays usa un sistema de “juego suave profesional”: interfaz calmada, táctil y motivadora, con progreso visible y pequeñas misiones. Debe sentirse como un taller guiado, no como una landing ni como un editor técnico intimidante.

## Color

- Base: superficies oscuras y claras ya definidas en `src/app.css`, con contraste alto.
- Primary: se usa para selección, acción principal y progreso activo.
- Success: se usa solo para pasos completados, días practicados y tareas hechas.
- Warning/info: reservado para ayuda, pistas y estados de atención.
- No usar color como decoración masiva; el color debe comunicar estado o foco.

## Typography

- Mantener una familia sans consistente para producto.
- Headings compactos y claros, sin escalas hero.
- Texto de ayuda con línea de 65-75 caracteres cuando sea prose.
- Etiquetas cortas, verbos claros y lenguaje directo en español.

## Components

- Shell de curso: cabecera sticky, progreso global y acceso a modo claro/oscuro.
- Intro de curso: explica qué se construye, cómo avanzar y que no hay login inicial.
- Barra de bloques: JavaScript, Svelte, SvelteKit con progreso por bloque.
- Tarjeta de misión: día, dificultad, minutos, objetivo, historia y estado esperado.
- Checklist: pasos practicables con estado persistido por día.
- Gestor de tareas: pieza central, visible como producto que se está construyendo.
- Mentor: pistas por capas, microfeedback y consulta IA opcional.
- Ruta compacta: navegación de días resumida, no lista gigante dominante.

## Layout

- Desktop: curso en fases, con contenido principal dominante y apoyos laterales sticky.
- Mobile: intro → misión → gestor → checklist → mentor → ruta compacta.
- Evitar contenedores `fixed` que bloqueen scroll global.
- Evitar tarjetas dentro de tarjetas cuando no aportan una agrupación real.

## Motion & Feedback

- Transiciones cortas de 150-250 ms para selección, checklist y feedback.
- Sin animaciones decorativas de carga.
- Feedback textual breve al completar día, añadir tarea o pedir pista.
- Respetar `prefers-reduced-motion`.
