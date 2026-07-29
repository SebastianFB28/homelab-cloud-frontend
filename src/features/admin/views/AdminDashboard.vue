<script setup>
import AdminLayout from '../components/AdminLayout.vue';
import AdminUserStats from '../components/AdminUserStats.vue';
import AdminStorageOverview from '../components/AdminStorageOverview.vue';
import AdminSystemHealth from '../components/AdminSystemHealth.vue';
</script>

<template>
  <AdminLayout>
    <div class="max-w-[1100px] mx-auto py-12 px-8">
      
      <div class="mb-10">
        <h1 class="font-h1 text-[40px] font-bold tracking-tight text-[#21201a]">Dashboard Overview</h1>
        <p class="text-[#49473f] mt-2">Bienvenido al panel de control principal del servidor.</p>
      </div>

      <!-- Componente 1: Estadísticas de Usuarios según Enums -->
      <AdminUserStats />

      <!-- Componente 2: Vista Global de Almacenamiento -->
      <AdminStorageOverview />

      <!-- Componente 3: Salud del Sistema (Reemplazo de la tabla en esta vista) -->
      <h3 class="text-[18px] font-bold text-[#21201a] mb-4">System Resources</h3>
      <AdminSystemHealth />

    </div>
  </AdminLayout>
</template>