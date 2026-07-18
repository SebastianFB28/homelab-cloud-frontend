<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useFilesStore } from '@/features/files/store/filesStore.js';
import { filesService } from '@/features/files/api/filesService.js';
import FeatureUnavailableModal from '@/components/shared/FeatureUnavailableModal.vue';

const filesStore = useFilesStore();
const openMenuId = ref(null);
const downloadingId = ref(null);
const actionError = ref('');
const showFeatureModal = ref(false);
const unavailableFeature = ref('');

onMounted(() => {
  filesStore.loadRoot();
  window.addEventListener('click', closeMenu);
});

onUnmounted(() => {
  window.removeEventListener('click', closeMenu);
});

const getIconProps = (item) => {
  if (item.type === 'folder') return { name: 'folder', color: 'text-[#37352F]' };

  const map = {
    pdf: { name: 'picture_as_pdf', color: 'text-red-600' },
    png: { name: 'image', color: 'text-blue-600' },
    jpg: { name: 'image', color: 'text-blue-600' },
    jpeg: { name: 'image', color: 'text-blue-600' },
    gif: { name: 'image', color: 'text-blue-600' },
    webp: { name: 'image', color: 'text-blue-600' },
    mp3: { name: 'audio_file', color: 'text-violet-600' },
    mp4: { name: 'movie', color: 'text-yellow-500' }
  };
  return map[item.extension] || { name: 'description', color: 'text-gray-500' };
};

const handleRowClick = (item) => {
  if (item.type === 'folder') {
    filesStore.openFolder(item);
  } else {
    console.log('Abriendo archivo:', item.name);
  }
};

const closeMenu = () => {
  openMenuId.value = null;
};

const toggleMenu = (itemId) => {
  openMenuId.value = openMenuId.value === itemId ? null : itemId;
};

const showUnavailableFeature = (feature) => {
  openMenuId.value = null;
  unavailableFeature.value = feature;
  showFeatureModal.value = true;
};

const isPreviewable = (item) => {
  if (item.type !== 'file') return false;
  return item.mimeType?.startsWith('image/')
    || item.mimeType?.startsWith('video/')
    || ['png', 'jpg', 'jpeg', 'gif', 'webp', 'mp4', 'webm', 'mov'].includes(item.extension);
};

const handleDoubleClick = (item) => {
  if (isPreviewable(item)) {
    showUnavailableFeature('La vista previa de imágenes y videos');
  }
};

const getDownloadName = (contentDisposition, fallbackName) => {
  const encodedMatch = contentDisposition?.match(/filename\*=UTF-8''([^;]+)/i);
  if (encodedMatch) return decodeURIComponent(encodedMatch[1]);

  const quotedMatch = contentDisposition?.match(/filename="?([^";]+)"?/i);
  return quotedMatch?.[1] || fallbackName;
};

const downloadFile = async (item) => {
  if (item.type === 'folder' || downloadingId.value) return;

  actionError.value = '';
  downloadingId.value = item.id;
  openMenuId.value = null;
  try {
    const { blob, contentDisposition } = await filesService.downloadFile(item.id);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = getDownloadName(contentDisposition, item.name);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error descargando archivo:', error);
    actionError.value = `No se pudo descargar “${item.name}”.`;
  } finally {
    downloadingId.value = null;
  }
};

const formatFileSize = (bytes) => {
  if (bytes === null || bytes === undefined || bytes === 0) return bytes === 0 ? '0 B' : '--';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / (1024 ** index);
  return `${value.toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
};

const formatDate = (date) => {
  if (!date) return '--';
  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime())
    ? date
    : new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium', timeStyle: 'short' }).format(parsedDate);
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
          @dblclick.stop="handleDoubleClick(item)"
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
          
          <div class="col-span-3 text-[14px] text-[#49473f]">{{ formatDate(item.modified) }}</div>
          <div class="col-span-2 text-[14px] text-[#49473f]">{{ item.type === 'folder' ? '--' : formatFileSize(item.size) }}</div>
          
          <div class="col-span-1 text-right">
            <div v-if="item.type === 'file'" class="relative flex justify-end gap-1">
              <button
                type="button"
                :disabled="downloadingId === item.id"
                @click.stop="downloadFile(item)"
                class="rounded-md p-1 hover:bg-[#EDEDED] disabled:cursor-wait disabled:opacity-50"
                title="Descargar"
                aria-label="Descargar archivo"
              >
                <span class="material-symbols-outlined block text-[18px] text-[#37352F]/50 group-hover:text-[#21201a]">download</span>
              </button>
              <button
                type="button"
                @click.stop="toggleMenu(item.id)"
                class="rounded-md p-1 hover:bg-[#EDEDED]"
                title="Más acciones"
                aria-label="Más acciones"
              >
                <span class="material-symbols-outlined block text-[18px] text-[#37352F]/30 transition-colors group-hover:text-[#21201a]">more_horiz</span>
              </button>
              <div v-if="openMenuId === item.id" @click.stop class="absolute right-0 top-8 z-20 w-40 rounded-lg border border-[#EDEDED] bg-white py-1 shadow-lg">
                <button type="button" @click="downloadFile(item)" class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F7F7F5]">
                  <span class="material-symbols-outlined text-[18px]">download</span>
                  Descargar
                </button>
                <button type="button" @click="showUnavailableFeature('Renombrar archivos')" class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F7F7F5]">
                  <span class="material-symbols-outlined text-[18px]">drive_file_rename_outline</span>
                  Renombrar
                </button>
                <button type="button" @click="showUnavailableFeature('Eliminar archivos')" class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-700 hover:bg-red-50">
                  <span class="material-symbols-outlined text-[18px]">delete</span>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p v-if="actionError" class="border-t border-red-100 bg-red-50 px-6 py-3 text-sm text-red-700">{{ actionError }}</p>

      <div v-if="filesStore.error" class="p-8 text-center text-red-600">
        <p>{{ filesStore.error }}</p>
        <button @click="filesStore.loadRoot" class="mt-3 text-sm font-medium underline">Reintentar</button>
      </div>
      
      <div v-if="!filesStore.isLoading && !filesStore.error && filesStore.items.length === 0" class="p-8 text-center text-[#49473f]">
        <p>This folder is empty.</p>
      </div>

    </div>

    <FeatureUnavailableModal v-if="showFeatureModal" :feature="unavailableFeature" @close="showFeatureModal = false" />
  </section>
</template>
