<script setup>
import { useAuthStore } from '@/features/auth/store/auth.js';

const authStore = useAuthStore();
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
      <span class="material-symbols-outlined !text-[48px] text-blue-600 mb-4">admin_panel_settings</span>
      <h1 class="text-2xl font-bold mb-2">Panel de Administración</h1>
      <p class="text-gray-600">Bienvenido, tu rol es: <span class="font-bold">{{ authStore.role }}</span></p>
    </div>
  </div>
</template>