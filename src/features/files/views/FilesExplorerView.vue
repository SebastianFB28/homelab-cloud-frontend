<script setup>
import { ref } from 'vue';
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import FileTableList from '@/features/dashboard/components/FileTableList.vue';
import FileContextMenu from '../components/FileContextMenu.vue';

// Estado del menú contextual
const contextMenu = ref({
  isOpen: false,
  x: 0,
  y: 0
});

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
    console.log("Abrir modal para crear nueva carpeta");
  } else if (action === 'upload-file') {
    console.log("Abrir modal para subir archivo");
  }
};
</script>

<template>
  <DashboardLayout>
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
  </DashboardLayout>
</template>