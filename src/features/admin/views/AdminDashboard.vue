<script setup> 
import { ref } from 'vue';
import AdminLayout from '../components/AdminLayout.vue'; 
import AdminUserStats from '../components/AdminUserStats.vue'; 
import AdminStorageOverview from '../components/AdminStorageOverview.vue'; 
import AdminSystemHealth from '../components/AdminSystemHealth.vue'; 
import AdminApprovedUsersTable from '../components/AdminApprovedUsersTable.vue';

// Estado de la vista activa (por defecto el dashboard)
const currentView = ref('dashboard');
</script> 

<template> 
  <AdminLayout @change-view="(view) => currentView = view"> 
    <div class="max-w-[1100px] mx-auto py-12 px-8"> 

      <!-- VISTA 1: DASHBOARD OVERVIEW -->
      <template v-if="currentView === 'dashboard'">
        <div class="mb-10"> 
          <h1 class="font-h1 text-[40px] font-bold tracking-tight text-[#21201a]">Dashboard Overview</h1> 
          <p class="text-[#49473f] mt-2">Bienvenido al panel de control principal del servidor.</p> 
        </div> 

        <AdminUserStats /> 
        <AdminStorageOverview /> 

        <h3 class="text-[18px] font-bold text-[#21201a] mb-4">System Resources</h3> 
        <AdminSystemHealth /> 
      </template>

      <!-- VISTA 2: CONFIGURACIÓN DE USUARIOS (NUEVO NOMBRE) -->
      <template v-else-if="currentView === 'user-config'">
        <AdminApprovedUsersTable />
      </template>

    </div> 
  </AdminLayout> 
</template>