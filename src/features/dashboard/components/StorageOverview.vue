<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/features/user/store/userStore.js';

const userStore = useUserStore();

// Función inteligente que decide si mostrar MB o GB
const formatStorage = (bytes) => {
  if (!bytes || bytes === 0) return '0 GB';
  const mb = bytes / (1024 * 1024);
  const gb = bytes / (1024 * 1024 * 1024);
  
  if (gb < 0.1) return `${mb.toFixed(1)} MB`;
  return `${gb.toFixed(1)} GB`;
};

const totalGb = computed(() => formatStorage(userStore.storage?.maxCapacityInBytes));
const usedGb = computed(() => formatStorage(userStore.storage?.usedCapacityInBytes));

// Porcentaje EXACTO para la barra azul (ej. 0.5%)
const exactPercentage = computed(() => {
  const max = userStore.storage?.maxCapacityInBytes;
  const used = userStore.storage?.usedCapacityInBytes;
  if (!max || max === 0) return 0;
  return (used / max) * 100;
});

// Porcentaje VISUAL para el texto (ej. "< 1" o "5")
const displayPercentage = computed(() => {
  const p = exactPercentage.value;
  if (p > 0 && p < 1) return '< 1';
  return Math.round(p);
});
</script>

<template>
  <section class="mb-12">
    <h1 class="font-h1 text-[40px] font-bold tracking-tight text-[#21201a] mb-6">Storage Overview</h1>
    
    <div class="bg-white border border-[#EDEDED] p-8 rounded-xl relative overflow-hidden">
      
      <!-- Mostramos un overlay de carga suave mientras esperamos la API -->
      <div v-if="userStore.isLoading" class="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center">
        <span class="material-symbols-outlined animate-spin text-[#0059ba]">progress_activity</span>
      </div>

      <div class="flex justify-between items-end mb-4">
        <div>
          <!-- Muestra los MB o GB automáticamente -->
          <span class="text-[30px] font-semibold text-[#21201a]">{{ usedGb }}</span>
          <span class="text-[14px] text-[#49473f] ml-2">of {{ totalGb }} used</span>
        </div>
        <!-- Texto con el porcentaje visual (< 1% o números enteros) -->
        <span class="text-[12px] font-semibold tracking-widest text-[#0059ba]">{{ displayPercentage }}% CAPACITY</span>
      </div>
      
      <!-- Progress Bar (Dinámica) -->
      <div class="w-full h-2 bg-[#eeeeee] rounded-full overflow-hidden">
        <!-- Ancho usando el porcentaje exacto decimal -->
        <div class="h-full bg-[#0059ba] rounded-full transition-all duration-1000 ease-out" :style="{ width: `${exactPercentage}%` }"></div>
      </div>
      
      <!-- Legends -->
      <div class="mt-6 flex gap-8">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 bg-[#0059ba] rounded-full"></div>
          <span class="text-[14px] text-[#49473f]">Used</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 bg-[#e2e2e2] rounded-full"></div>
          <span class="text-[14px] text-[#49473f]">Free</span>
        </div>
      </div>
    </div>
  </section>
</template>