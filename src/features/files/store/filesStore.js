import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useFilesStore = defineStore('files', () => {
  // --- ESTADO (Los datos) ---
  const currentPath = ref('/'); // Ruta actual (raíz por defecto)
  const items = ref([]); // Aquí guardaremos la lista mixta de carpetas y archivos
  const isLoading = ref(false); // Para mostrar estado de carga

  // --- GETTERS (Datos calculados automáticamente) ---
  // Podemos separar virtualmente si algún componente solo quiere ver carpetas
  const foldersOnly = computed(() => items.value.filter(item => item.type === 'folder'));
  const filesOnly = computed(() => items.value.filter(item => item.type === 'file'));

  // --- ACCIONES (Funciones que modifican el estado) ---
  const fetchItems = async (path = '/') => {
    isLoading.value = true;
    currentPath.value = path;

    // SIMULACIÓN: Aquí irá tu llamada real con axios (ej: api.get(`/files?path=${path}`))
    // Por ahora, simulamos un retraso de red y una respuesta JSON mixta
    setTimeout(() => {
      items.value = [
        { id: 'f1', name: 'Documents', type: 'folder', modified: '2 days ago', size: '--' },
        { id: 'f2', name: 'Photos', type: 'folder', modified: '1 week ago', size: '--' },
        { id: 'a1', name: 'Presentation.pdf', type: 'file', extension: 'pdf', modified: '2h ago', size: '4.2 MB' },
        { id: 'a2', name: 'Dashboard_Mockup.png', type: 'file', extension: 'png', modified: '5h ago', size: '1.8 MB' },
        { id: 'a3', name: 'Product_Demo.mp4', type: 'file', extension: 'mp4', modified: '2 days ago', size: '45 MB' }
      ];
      isLoading.value = false;
    }, 800);
  };

  return {
    currentPath,
    items,
    isLoading,
    foldersOnly,
    filesOnly,
    fetchItems
  };
});