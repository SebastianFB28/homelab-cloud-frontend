<script setup>
import { onMounted } from 'vue';
import { useFilesStore } from '@/features/files/store/filesStore.js';

const filesStore = useFilesStore();

onMounted(() => {
  filesStore.fetchItems('/');
});

const getIconProps = (item) => {
  if (item.type === 'folder') return { name: 'folder', color: 'text-[#37352F]' };
  
  const map = {
    pdf: { name: 'picture_as_pdf', color: 'text-red-600' },
    png: { name: 'image', color: 'text-blue-600' },
    jpg: { name: 'image', color: 'text-blue-600' },
    mp4: { name: 'movie', color: 'text-yellow-500' }
  };
  return map[item.extension] || { name: 'description', color: 'text-gray-500' };
};

// Nueva función para manejar el clic en las filas
const handleRowClick = (item) => {
  if (item.type === 'folder') {
    // Si es carpeta, entramos a ella
    filesStore.fetchItems(item.path);
  } else {
    // Si es archivo, por ahora solo mostramos un log (luego podríamos abrir una vista previa)
    console.log("Abriendo archivo:", item.name);
  }
};
</script>

<template>
  <section>
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-4">
        <!-- Botón para ir atrás (solo se muestra si no estamos en la raíz) -->
        <button 
          v-if="filesStore.canGoBack" 
          @click="filesStore.goBack"
          class="flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#EDEDED] transition-colors"
          title="Go back"
        >
          <span class="material-symbols-outlined text-[20px] text-[#21201a]">arrow_back</span>
        </button>
        
        <h3 class="text-[22px] font-semibold text-[#21201a]">
          Explorando: {{ filesStore.currentPath }}
        </h3>
      </div>
    </div>
    
    <div class="bg-white border border-[#EDEDED] rounded-lg overflow-hidden">
      <div class="grid grid-cols-12 px-6 py-3 border-b border-[#EDEDED] text-[12px] font-semibold tracking-widest text-[#49473f]">
        <div class="col-span-6">NAME</div>
        <div class="col-span-3">MODIFIED</div>
        <div class="col-span-2">SIZE</div>
        <div class="col-span-1 text-right">ACTION</div>
      </div>
      
      <!-- Loader reutilizado -->
      <div v-if="filesStore.isLoading" class="p-8 text-center text-[#49473f]">
        <span class="material-symbols-outlined animate-spin text-2xl mb-2">sync</span>
        <p>Loading files...</p>
      </div>

      <div v-else class="divide-y divide-[#EDEDED]">
        <!-- Al hacer clic en la fila, llamamos a handleRowClick -->
        <div 
          v-for="item in filesStore.items" 
          :key="item.id" 
          @click="handleRowClick(item)"
          class="grid grid-cols-12 px-6 py-3 items-center hover:bg-[#F7F7F5] transition-colors cursor-pointer group"
        >
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
            <!-- Detenemos la propagación del clic para que el menú de opciones no abra la carpeta -->
            <button @click.stop class="p-1 rounded-md hover:bg-[#EDEDED]">
              <span class="material-symbols-outlined text-[18px] text-[#37352F]/30 group-hover:text-[#21201a] transition-colors block">more_horiz</span>
            </button>
          </div>
        </div>
      </div>
      
      <div v-if="!filesStore.isLoading && filesStore.items.length === 0" class="p-8 text-center text-[#49473f]">
        <p>This folder is empty.</p>
      </div>

    </div>
  </section>
</template>