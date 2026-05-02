<script setup>
import { useAuthStore } from '@/features/auth/store/auth.js';
const authStore = useAuthStore();
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-[#f9f9f9]">
    <span class="material-symbols-outlined text-[64px] text-green-600 mb-4">check_circle</span>
    <h1 class="text-3xl font-bold text-black mb-2">Workspace Connected</h1>
    <p class="text-gray-500 mb-6">Tu token de acceso es válido.</p>
    
    <code class="bg-gray-200 px-4 py-2 rounded text-sm break-all max-w-lg text-center">
      Token JWT: {{ authStore.accessToken?.substring(0, 40) }}...
    </code>
  </div>
</template>