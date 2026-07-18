<script setup>
import { ref } from 'vue';
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import FileTableList from '@/features/dashboard/components/FileTableList.vue';
import FileContextMenu from '../components/FileContextMenu.vue';
import { useFilesStore } from '@/features/files/store/filesStore.js';

const filesStore = useFilesStore();

// Estado del menú contextual
const contextMenu = ref({
  isOpen: false,
  x: 0,
  y: 0
});
const showFolderModal = ref(false);
const showUploadModal = ref(false);
const folderName = ref('');
const selectedFile = ref(null);
const fileInput = ref(null);
const feedback = ref({ text: '', type: '' });

// Función que captura el clic derecho
const handleRightClick = (event) => {
  contextMenu.value = {
    isOpen: true,
    x: event.clientX,
    y: event.clientY
  };
};

// Función que recibe la acción seleccionada del menú
const handleMenuAction = (action) => {
  contextMenu.value.isOpen = false;
  if (action === 'new-folder') {
    openFolderModal();
  } else if (action === 'upload-file') {
    openUploadModal();
  }
};

const openFolderModal = () => {
  folderName.value = '';
  feedback.value = { text: '', type: '' };
  showFolderModal.value = true;
};

const openUploadModal = () => {
  selectedFile.value = null;
  feedback.value = { text: '', type: '' };
  showUploadModal.value = true;
};

const handleCreateFolder = async () => {
  try {
    await filesStore.createFolder(folderName.value);
    showFolderModal.value = false;
  } catch (error) {
    feedback.value = { text: error.response?.data?.message || error.message || 'No se pudo crear la carpeta.', type: 'error' };
  }
};

const handleFileSelection = (event) => {
  selectedFile.value = event.target.files?.[0] || null;
};

const handleUploadFile = async () => {
  try {
    await filesStore.uploadFile(selectedFile.value);
    showUploadModal.value = false;
  } catch (error) {
    feedback.value = { text: error.response?.data?.message || error.message || 'No se pudo subir el archivo.', type: 'error' };
  }
};
</script>

<template>
  <DashboardLayout @create-folder="openFolderModal" @upload-file="openUploadModal">
    <!-- El div principal ahora ocupa toda la altura y captura el clic derecho -->
    <div 
      class="h-full min-h-[calc(100vh-3.5rem)] px-8 py-8"
      @contextmenu.prevent="handleRightClick"
    >
      <div class="max-w-[1200px] mx-auto">
        <h1 class="font-h1 text-[32px] font-bold tracking-tight text-[#21201a] mb-2">My Drive</h1>
        <p class="text-[14px] text-[#49473f] mb-8">Manage and organize all your home lab files. Right-click anywhere to add items.</p>
        
        <FileTableList />
      </div>
    </div>

    <!-- Renderizamos nuestro componente flotante -->
    <FileContextMenu 
      :is-open="contextMenu.isOpen"
      :x="contextMenu.x"
      :y="contextMenu.y"
      @close="contextMenu.isOpen = false"
      @action="handleMenuAction"
    />

    <div v-if="showFolderModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 p-4" @click.self="showFolderModal = false">
      <form @submit.prevent="handleCreateFolder" class="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 class="text-lg font-bold text-[#21201a]">Nueva carpeta</h2>
        <p class="mt-1 text-sm text-[#49473f]">Ubicación: {{ filesStore.currentPath }}</p>
        <input v-model="folderName" autofocus required maxlength="255" placeholder="Nombre de la carpeta" class="mt-5 w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-1 focus:ring-[#0059ba]" />
        <p v-if="feedback.text" class="mt-3 text-sm text-red-600">{{ feedback.text }}</p>
        <div class="mt-6 flex justify-end gap-3">
          <button type="button" @click="showFolderModal = false" class="rounded-lg px-4 py-2 text-sm hover:bg-gray-100">Cancelar</button>
          <button type="submit" :disabled="filesStore.isMutating" class="rounded-lg bg-[#0059ba] px-4 py-2 text-sm font-medium text-white disabled:opacity-60">{{ filesStore.isMutating ? 'Creando...' : 'Crear carpeta' }}</button>
        </div>
      </form>
    </div>

    <div v-if="showUploadModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 p-4" @click.self="showUploadModal = false">
      <form @submit.prevent="handleUploadFile" class="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 class="text-lg font-bold text-[#21201a]">Subir archivo</h2>
        <p class="mt-1 text-sm text-[#49473f]">Ubicación: {{ filesStore.currentPath }}</p>
        <input ref="fileInput" type="file" required class="mt-5 block w-full text-sm" @change="handleFileSelection" />
        <p v-if="selectedFile" class="mt-2 text-sm text-[#49473f]">{{ selectedFile.name }}</p>
        <p v-if="feedback.text" class="mt-3 text-sm text-red-600">{{ feedback.text }}</p>
        <div class="mt-6 flex justify-end gap-3">
          <button type="button" @click="showUploadModal = false" class="rounded-lg px-4 py-2 text-sm hover:bg-gray-100">Cancelar</button>
          <button type="submit" :disabled="filesStore.isMutating || !selectedFile" class="rounded-lg bg-[#21201a] px-4 py-2 text-sm font-medium text-white disabled:opacity-60">{{ filesStore.isMutating ? 'Subiendo...' : 'Subir archivo' }}</button>
        </div>
      </form>
    </div>
  </DashboardLayout>
</template>
