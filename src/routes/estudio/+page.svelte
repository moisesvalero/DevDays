<script lang="ts">
  // Placeholder: el bloque C lo reemplaza por las 3 columnas reales del portal.
  let { data } = $props();
</script>

<div class="flex flex-1 items-center justify-center p-10">
  <div class="text-center">
    <h1 class="text-3xl font-bold text-primary">DevDays</h1>
    <p class="mt-2 text-on-surface-variant">
      Bienvenido, {data.user.email}. {data.lessons.length} lecciones cargadas.
    </p>
    <p class="mt-1 text-sm text-on-surface-variant">
      {data.progreso.length} días completados.
    </p>
    <p class="mt-6 text-xs text-outline">Bloque C pintará aquí las 3 columnas.</p>
  </div>
</div>
