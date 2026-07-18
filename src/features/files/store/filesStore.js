import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { filesService } from '../api/filesService.js';

export const useFilesStore = defineStore('files', () => {
  const currentPath = ref('My Drive');
  const currentFolderId = ref(null);
  const folderHistory = ref([]);
  const items = ref([]);
  const isLoading = ref(false);
  const isMutating = ref(false);
  const error = ref(null);

  const foldersOnly = computed(() => items.value.filter(item => item.type === 'folder'));
  const filesOnly = computed(() => items.value.filter(item => item.type === 'file'));

  const canGoBack = computed(() => folderHistory.value.length > 0);

  const loadDirectory = async (folderId, folderName) => {
    isLoading.value = true;
    error.value = null;
    currentFolderId.value = folderId;
    currentPath.value = folderName;

    try {
      const directoryContent = await filesService.listDirectory(folderId);
      items.value = directoryContent.map((item) => ({
        id: item.id,
        name: item.name,
        type: item.folder ? 'folder' : 'file',
        extension: item.folder ? null : item.name.split('.').pop().toLowerCase(),
        modified: item.createdAt,
        size: item.folder ? '--' : item.sizeInBytes,
        parentFolderId: item.parentFolderId,
        ownerId: item.ownerId,
        mimeType: item.mimeType,
        physicalPath: item.physicalPath,
        folder: item.folder,
      }));
    } catch (err) {
      console.error('Error cargando directorio:', err);
      items.value = [];
      error.value = 'No se pudo cargar el contenido de esta carpeta.';
    } finally {
      isLoading.value = false;
    }
  };

  const loadRoot = () => {
    folderHistory.value = [];
    return loadDirectory(null, 'My Drive');
  };

  const openFolder = (folder) => {
    folderHistory.value.push({
      id: currentFolderId.value,
      name: currentPath.value
    });
    return loadDirectory(folder.id, folder.name);
  };

  const goBack = () => {
    const parent = folderHistory.value.pop();
    if (parent) {
      return loadDirectory(parent.id, parent.name);
    }
  };

  const refreshCurrentDirectory = () => loadDirectory(currentFolderId.value, currentPath.value);

  const createFolder = async (name) => {
    const trimmedName = name.trim();
    if (!trimmedName) throw new Error('El nombre de la carpeta es obligatorio.');

    isMutating.value = true;
    try {
      await filesService.createFolder(trimmedName, currentFolderId.value);
      await refreshCurrentDirectory();
    } finally {
      isMutating.value = false;
    }
  };

  const uploadFile = async (file) => {
    if (!file) throw new Error('Selecciona un archivo para subir.');

    isMutating.value = true;
    try {
      await filesService.uploadFile(file, currentFolderId.value);
      await refreshCurrentDirectory();
    } finally {
      isMutating.value = false;
    }
  };

  return {
    currentPath,
    currentFolderId,
    items,
    isLoading,
    isMutating,
    error,
    canGoBack,
    foldersOnly,
    filesOnly,
    loadRoot,
    refreshCurrentDirectory,
    openFolder,
    goBack,
    createFolder,
    uploadFile
  };
});
