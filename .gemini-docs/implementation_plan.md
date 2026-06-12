# Plan de Implementación: Perfil de Usuario, Barras Laterales Unificadas, Iconografía Visual y Chat de IA Global

Este plan detalla los cambios para solucionar y mejorar múltiples áreas de la experiencia en DevDays: el perfil dinámico de estudiante, la consistencia de navegación, el realismo visual en incidencias y el chat de ayuda inteligente mediante el botón flotante.

---

## Cambios Propuestos

### 1. Perfil del Estudiante en el Header (Nombre Real y Avatar)

- **API del Perfil (`/api/perfil`):** Se ha creado un endpoint POST en SvelteKit para actualizar los metadatos de Supabase Auth del usuario autenticado (`full_name` y `avatar_url`).
- **Header Dinámico:** En `/estudio`, `/terminal` y `/codigo`, se reemplaza el texto fijo `"Simulation Lead"` por el nombre real y el avatar configurado.
- **Modal de Perfil:** Al pulsar en el avatar, se abre un diálogo modal interactivo que permite ingresar el nombre real y seleccionar entre dos personajes/avatares del taller.

### 2. Unificación de la Barra Lateral y Enlace al Catálogo

- **CODE en todo el estudio:** Se añade la opción de **Código** (`CODE`) a la barra lateral izquierda en `/estudio` y `/terminal` para conectar todos los cursos del bootcamp.
- **Salida al Catálogo (INICIO):** Se añade un botón de **Inicio** (`INICIO`) en la barra lateral de todas las rutas del estudio para poder volver a la landing page en un clic.

### 3. Iconografía y Evidencias Visuales en Incidencias

- **Microsoft Windows en SVG:** Reemplazamos el icono genérico en "Sistema operativo" de las evidencias de soporte por el logotipo a color de Microsoft Windows si el entorno es Windows.
- **Badge de Dificultad Dinámico:** Mostramos chips estilizados y de colores correspondientes basados en la dificultad del ticket: **Baja** (Verde), **Media** (Azul) y **Reto** (Rojo con icono de fuego).

### 4. IA del Botón de Soporte Flotante

- **Chat Conversacional Global:** El botón de soporte flotante ahora despliega un chat interactivo con el tutor de IA, manteniendo un historial reactivo en pantalla para dialogar de forma fluida.
- **Contexto automático:** Si hay un ticket de soporte abierto en `/estudio`, la IA leerá automáticamente su ID de `localStorage` para guiar al alumno sobre su resolución; en otras páginas, actuará como tutor general de IT.
