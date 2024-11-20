<template>
  <div class="min-h-screen w-full flex flex-col">
    <!-- Encabezado -->
    <header class="bg-blue-600 text-white p-4">
      <h1 class="text-2xl font-bold">Mi Aplicación</h1>
    </header>

    <!-- Contenido principal -->
    <main class="flex-1 bg-gray-100 p-6">
      <slot />
    </main>

    <!-- Pie de página -->
    <footer class="bg-blue-800 text-white p-4 text-center">
      &copy; 2024 Mi Aplicación
    </footer>
  </div>
</template>
