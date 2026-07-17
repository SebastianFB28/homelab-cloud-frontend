import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useFilesStore = defineStore('files', () => {
  const currentPath = ref('/'); 
  const items = ref([]); 
  const isLoading = ref(false); 

  const foldersOnly = computed(() => items.value.filter(item => item.type === 'folder'));
  const filesOnly = computed(() => items.value.filter(item => item.type === 'file'));

  // Propiedad computada para saber si podemos ir hacia atrás
  const canGoBack = computed(() => currentPath.value !== '/');

  const fetchItems = async (path = '/') => {
    isLoading.value = true;
    currentPath.value = path;

    // SIMULACIÓN: Diferentes datos dependiendo de la ruta
    setTimeout(() => {
      if (path === '/') {
        items.value = [
          { id: 'f1', name: 'Documents', type: 'folder', path: '/Documents', modified: '2 days ago', size: '--' },
          { id: 'f2', name: 'Photos', type: 'folder', path: '/Photos', modified: '1 week ago', size: '--' },
          { id: 'a1', name: 'Presentation.pdf', type: 'file', extension: 'pdf', modified: '2h ago', size: '4.2 MB' }
        ];
      } else if (path === '/Documents') {
        items.value = [
          { id: 'a2', name: 'Factura_Luz.pdf', type: 'file', extension: 'pdf', modified: '1 day ago', size: '1.1 MB' },
          { id: 'a3', name: 'Presupuesto.pdf', type: 'file', extension: 'pdf', modified: '3 days ago', size: '2.4 MB' }
        ];
      } else if (path === '/Photos') {
        items.value = [
          { id: 'a4', name: 'Vacaciones.jpg', type: 'file', extension: 'jpg', modified: '10 days ago', size: '5.4 MB' }
        ];
      }
      
      isLoading.value = false;
    }, 600); // 600ms de "carga"
  };

  // Función para subir un nivel en las carpetas
  const goBack = () => {
    // Si estamos en /Documents, el padre es /
    // Para simplificar ahora, si no es la raíz, volvemos a la raíz.
    if (currentPath.value !== '/') {
      fetchItems('/');
    }
  };

  return {
    currentPath,
    items,
    isLoading,
    canGoBack,
    foldersOnly,
    filesOnly,
    fetchItems,
    goBack
  };
});