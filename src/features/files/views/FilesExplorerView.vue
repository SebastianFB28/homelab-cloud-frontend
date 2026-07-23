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
const selectedFiles = ref([]);
const fileInput = ref(null);
const feedback = ref({ text: '', type: '' });
const uploads = ref([]);
const uploadControllers = new Map();

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
  selectedFiles.value = [];
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
  selectedFiles.value = Array.from(event.target.files || []);
};

const getUploadId = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;

const getUploadIcon = (fileName) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(extension)) return 'image';
  if (extension === 'pdf') return 'picture_as_pdf';
  if (['mp3', 'wav', 'ogg'].includes(extension)) return 'audio_file';
  if (['mp4', 'webm', 'mov'].includes(extension)) return 'movie';
  return 'description';
};

const removeUpload = (uploadId) => {
  uploadControllers.delete(uploadId);
  uploads.value = uploads.value.filter((upload) => upload.id !== uploadId);
};

const cancelUpload = (uploadId) => {
  const upload = uploads.value.find((item) => item.id === uploadId);
  const controller = uploadControllers.get(uploadId);
  if (!upload || !controller || upload.status !== 'uploading') return;

  upload.status = 'cancelled';
  controller.abort();
  uploadControllers.delete(uploadId);
};

const handleUploadFile = () => {
  const files = selectedFiles.value;
  if (!files.length) return;

  showUploadModal.value = false;
  selectedFiles.value = [];
  feedback.value = { text: '', type: '' };

  files.forEach((file) => {
    const upload = {
      id: getUploadId(),
      name: file.name,
      icon: getUploadIcon(file.name),
      progress: 0,
      status: 'uploading',
      error: ''
    };

    uploads.value.push(upload);
    const controller = new AbortController();
    uploadControllers.set(upload.id, controller);

    // Cada archivo se sube de forma independiente y no bloquea el explorador.
    filesStore.uploadFile(file, (event) => {
      const total = event.total || file.size;
      if (!total) return;

      const currentUpload = uploads.value.find((item) => item.id === upload.id);
      if (currentUpload) {
        currentUpload.progress = Math.min(100, Math.round((event.loaded * 100) / total));
      }
    }, controller.signal).then(() => {
      const currentUpload = uploads.value.find((item) => item.id === upload.id);
      uploadControllers.delete(upload.id);
      if (!currentUpload || currentUpload.status !== 'uploading') return;

      currentUpload.progress = 100;
      currentUpload.status = 'completed';
      window.setTimeout(() => removeUpload(upload.id), 4000);
    }).catch((error) => {
      const currentUpload = uploads.value.find((item) => item.id === upload.id);
      if (!currentUpload) return;

      uploadControllers.delete(upload.id);
      if (currentUpload.status === 'cancelled' || controller.signal.aborted) return;

      currentUpload.status = 'error';
      currentUpload.error = error.response?.data?.message || error.message || 'No se pudo subir el archivo.';
    });
  });
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
        <input ref="fileInput" type="file" multiple required class="mt-5 block w-full text-sm" @change="handleFileSelection" />
        <p v-if="selectedFiles.length" class="mt-2 text-sm text-[#49473f]">{{ selectedFiles.length }} archivo{{ selectedFiles.length === 1 ? '' : 's' }} seleccionado{{ selectedFiles.length === 1 ? '' : 's' }}</p>
        <p v-if="feedback.text" class="mt-3 text-sm text-red-600">{{ feedback.text }}</p>
        <div class="mt-6 flex justify-end gap-3">
          <button type="button" @click="showUploadModal = false" class="rounded-lg px-4 py-2 text-sm hover:bg-gray-100">Cancelar</button>
          <button type="submit" :disabled="!selectedFiles.length" class="rounded-lg bg-[#21201a] px-4 py-2 text-sm font-medium text-white disabled:opacity-60">Subir archivos</button>
        </div>
      </form>
    </div>

    <div class="fixed bottom-5 right-5 z-[110] flex w-[min(24rem,calc(100vw-2.5rem))] flex-col gap-3" aria-live="polite" aria-label="Estado de las cargas">
      <article v-for="upload in uploads" :key="upload.id" class="rounded-xl border border-[#EDEDED] bg-white p-4 shadow-lg">
        <div class="flex items-start gap-3">
          <span class="material-symbols-outlined mt-0.5 text-[24px]" :class="upload.status === 'error' ? 'text-red-600' : upload.status === 'completed' ? 'text-green-600' : 'text-[#0059ba]'">
            {{ upload.icon }}
          </span>
          <div class="min-w-0 flex-1">
            <div class="flex items-start justify-between gap-3">
              <p class="truncate text-sm font-medium text-[#21201a]" :title="upload.name">{{ upload.name }}</p>
              <button v-if="upload.status === 'uploading'" type="button" @click="cancelUpload(upload.id)" class="-mr-1 -mt-1 rounded px-2 py-1 text-xs font-medium text-[#0059ba] hover:bg-blue-50" aria-label="Cancelar carga">
                Cancelar
              </button>
              <button v-else type="button" @click="removeUpload(upload.id)" class="-mr-1 -mt-1 rounded p-1 text-[#49473f] hover:bg-gray-100" aria-label="Cerrar estado de carga">
                <span class="material-symbols-outlined block text-[18px]">close</span>
              </button>
            </div>
            <p class="mt-1 text-xs" :class="upload.status === 'error' ? 'text-red-600' : 'text-[#49473f]'">
              {{ upload.status === 'uploading' ? `Subiendo… ${upload.progress}%` : upload.status === 'completed' ? 'Carga completada' : upload.status === 'cancelled' ? 'Carga cancelada' : upload.error }}
            </p>
            <div v-if="upload.status === 'uploading' || upload.status === 'completed'" class="mt-3 h-1.5 overflow-hidden rounded-full bg-[#EDEDED]">
              <div class="h-full rounded-full transition-[width] duration-200" :class="upload.status === 'completed' ? 'bg-green-600' : 'bg-[#0059ba]'" :style="{ width: `${upload.progress}%` }"></div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </DashboardLayout>
</template>
