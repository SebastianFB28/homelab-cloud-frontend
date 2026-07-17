<script setup>
import { onMounted } from 'vue';
import { useFilesStore } from '@/features/files/store/filesStore.js';

// Inicializamos el store
const filesStore = useFilesStore();

// Cuando el componente aparece en pantalla, le decimos al store que cargue los archivos
onMounted(() => {
  filesStore.fetchItems('/');
});

// Función auxiliar para determinar el icono según el tipo o extensión
const getIconProps = (item) => {
  if (item.type === 'folder') return { name: 'folder', color: 'text-[#37352F]' };
  
  // Si es un archivo, miramos la extensión
  const map = {
    pdf: { name: 'picture_as_pdf', color: 'text-red-600' },
    png: { name: 'image', color: 'text-blue-600' },
    jpg: { name: 'image', color: 'text-blue-600' },
    mp4: { name: 'movie', color: 'text-yellow-500' }
  };
  return map[item.extension] || { name: 'description', color: 'text-gray-500' }; // Icono por defecto
};
</script>

<template>
  <section>
    <div class="flex items-center justify-between mb-6">
      <!-- Muestra la ruta actual dinámicamente -->
      <h3 class="text-[22px] font-semibold text-[#21201a]">
        Explorando: {{ filesStore.currentPath }}
      </h3>
    </div>
    
    <div class="bg-white border border-[#EDEDED] rounded-lg overflow-hidden">
      <!-- Cabecera de la tabla -->
      <div class="grid grid-cols-12 px-6 py-3 border-b border-[#EDEDED] text-[12px] font-semibold tracking-widest text-[#49473f]">
        <div class="col-span-6">NAME</div>
        <div class="col-span-3">MODIFIED</div>
        <div class="col-span-2">SIZE</div>
        <div class="col-span-1 text-right">ACTION</div>
      </div>
      
      <!-- Estado de carga -->
      <div v-if="filesStore.isLoading" class="p-8 text-center text-[#49473f]">
        <span class="material-symbols-outlined animate-spin text-2xl mb-2">sync</span>
        <p>Loading files...</p>
      </div>

      <!-- Lista de archivos y carpetas -->
      <div v-else class="divide-y divide-[#EDEDED]">
        <!-- Renderizado dinámico desde el store -->
        <div v-for="item in filesStore.items" :key="item.id" class="grid grid-cols-12 px-6 py-3 items-center hover:bg-[#F7F7F5] transition-colors cursor-pointer group">
          
          <div class="col-span-6 flex items-center gap-3">
            <span class="material-symbols-outlined" :class="getIconProps(item).color">
              {{ getIconProps(item).name }}
            </span>
            <span class="text-[14px] font-medium text-[#21201a]" :class="{ 'font-semibold': item.type === 'folder' }">
              {{ item.name }}
            </span>
          </div>
          
          <div class="col-span-3 text-[14px] text-[#49473f]">{{ item.modified }}</div>
          <div class="col-span-2 text-[14px] text-[#49473f]">{{ item.size }}</div>
          
          <div class="col-span-1 text-right">
            <span class="material-symbols-outlined text-[18px] text-[#37352F]/30 group-hover:text-[#21201a] transition-colors">more_horiz</span>
          </div>
        </div>
      </div>
      
      <!-- Estado vacío (por si el JSON llega sin nada) -->
      <div v-if="!filesStore.isLoading && filesStore.items.length === 0" class="p-8 text-center text-[#49473f]">
        <p>This folder is empty.</p>
      </div>

    </div>
  </section>
</template>