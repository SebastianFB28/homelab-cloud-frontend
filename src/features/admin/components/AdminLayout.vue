<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/features/auth/store/auth.js';
import FeatureUnavailableModal from '@/components/shared/FeatureUnavailableModal.vue';

const authStore = useAuthStore();
const router = useRouter();
const isSigningOut = ref(false);
const showFeatureModal = ref(false);
const unavailableFeature = ref('');

// Estado para los menús desplegables
const openMenu = ref('users');

const toggleMenu = (menuName) => {
  openMenu.value = openMenu.value === menuName ? null : menuName;
};

const handleLogout = async () => {
  if (isSigningOut.value) return;
  isSigningOut.value = true;
  authStore.logout();
  router.replace('/');
};

const showUnavailableFeature = (feature) => {
  unavailableFeature.value = feature;
  showFeatureModal.value = true;
};

// Emits para cambiar la vista dinámica en AdminDashboardView
const emit = defineEmits(['change-view']);

const handleViewChange = (viewName) => {
  emit('change-view', viewName);
};
</script>

<template>
  <div class="font-body-md overflow-x-hidden bg-[#f9f9f9] text-[#1a1c1c] min-h-screen">
    <!-- SideNavBar Admin -->
    <aside class="fixed left-0 top-0 z-50 flex h-full w-64 flex-col gap-4 border-r border-[#EDEDED] bg-white p-5 font-['Inter'] text-sm antialiased">
      <div class="mb-3 flex w-full flex-col items-center rounded-xl px-3 py-4 text-center">
        <div class="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-[#21201a] text-white shadow-sm">
          <span class="material-symbols-outlined !text-[40px]">shield_person</span>
        </div>
        <h2 class="text-lg font-bold text-[#21201a]">Admin Panel</h2>
        <p class="mt-0.5 text-[12px] font-semibold tracking-wide text-[#0059ba]">SUPERUSER</p>
      </div>

      <nav class="flex flex-col gap-2 overflow-y-auto">
        <!-- Dashboard Principal -->
        <button @click="handleViewChange('dashboard')" class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-black transition-all hover:bg-[#F7F7F5] active:scale-[0.98]">
          <span class="material-symbols-outlined text-[20px]">dashboard</span>
          <span>Dashboard</span>
        </button>

        <!-- SECCIÓN: Gestión de Usuarios (NUEVA ESTRUCTURA) -->
        <div>
          <button @click="toggleMenu('users')" class="flex w-full items-center justify-between rounded-md px-3 py-2 text-black transition-all hover:bg-[#F7F7F5]">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-[20px]">group</span>
              <span class="font-medium">Gestión Usuarios</span>
            </div>
            <span class="material-symbols-outlined text-[18px] transition-transform" :class="{ 'rotate-180': openMenu === 'users' }">expand_more</span>
          </button>
          
          <div v-show="openMenu === 'users'" class="ml-8 mt-1 flex flex-col gap-1 border-l-2 border-[#EDEDED] pl-2">
            <!-- Opción 1: Configuración de Usuarios (Muestra la Tabla) -->
            <button @click="handleViewChange('user-config')" class="text-left w-full px-2 py-1.5 text-[13px] text-[#49473f] hover:text-black hover:bg-[#F7F7F5] rounded transition-colors">
              Configuración Usuarios
            </button>

            <!-- Opción 2: Peticiones -->
            <button @click="showUnavailableFeature('Peticiones de Registro')" class="text-left w-full px-2 py-1.5 text-[13px] text-[#49473f] hover:text-black hover:bg-[#F7F7F5] rounded transition-colors">
              Peticiones
            </button>

            <!-- Opción 3: Cuentas Eliminadas -->
            <button @click="showUnavailableFeature('Cuentas Eliminadas')" class="text-left w-full px-2 py-1.5 text-[13px] text-red-600 hover:bg-red-50 rounded transition-colors">
              Cuentas Eliminadas
            </button>
          </div>
        </div>

        <!-- SECCIÓN: Servidor -->
        <div>
          <button @click="toggleMenu('server')" class="flex w-full items-center justify-between rounded-md px-3 py-2 text-black transition-all hover:bg-[#F7F7F5]">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-[20px]">dns</span>
              <span class="font-medium">Administración</span>
            </div>
            <span class="material-symbols-outlined text-[18px] transition-transform" :class="{ 'rotate-180': openMenu === 'server' }">expand_more</span>
          </button>
          
          <div v-show="openMenu === 'server'" class="ml-8 mt-1 flex flex-col gap-1 border-l-2 border-[#EDEDED] pl-2">
            <button @click="showUnavailableFeature('Configuración Almacenamiento')" class="text-left px-2 py-1.5 text-[13px] text-[#49473f] hover:text-black hover:bg-[#F7F7F5] rounded">Config. Almacenamiento</button>
            <button @click="showUnavailableFeature('Monitoreo de Seguridad')" class="text-left px-2 py-1.5 text-[13px] text-[#49473f] hover:text-black hover:bg-[#F7F7F5] rounded">Monitoreo de Seguridad</button>
          </div>
        </div>
      </nav>

      <div class="h-[1px] bg-[#EDEDED] mx-2 mt-auto"></div>

      <nav class="flex flex-col gap-1 border-t border-[#EDEDED] pt-4">
        <button type="button" :disabled="isSigningOut" @click="handleLogout" class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-black transition-all hover:bg-red-50 disabled:cursor-wait disabled:opacity-60">
          <span class="material-symbols-outlined text-[20px]">logout</span>
          <span>{{ isSigningOut ? 'Signing out...' : 'Sign out' }}</span>
        </button>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <main class="ml-64 min-h-screen">
      <header class="flex justify-end items-center px-8 h-14 bg-white/80 backdrop-blur-md border-b border-[#EDEDED] sticky top-0 z-40 font-['Inter'] text-sm tracking-tight">
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-100 text-green-700 rounded-full text-[12px] font-semibold">
            <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            System Online
          </div>
        </div>
      </header>

      <slot />
    </main>
    <FeatureUnavailableModal v-if="showFeatureModal" :feature="unavailableFeature" @close="showFeatureModal = false" />
  </div>
</template>