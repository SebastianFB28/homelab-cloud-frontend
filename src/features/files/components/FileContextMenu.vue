<script setup>
import { onMounted, onUnmounted } from 'vue';

const props = defineProps({
  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 },
  isOpen: { type: Boolean, default: false }
});

const emit = defineEmits(['close', 'action']);

// Si el menú está abierto y el usuario hace clic en otro lado, lo cerramos
const handleClickOutside = () => {
  if (props.isOpen) {
    emit('close');
  }
};

onMounted(() => {
  // Escuchamos clics en toda la ventana
  window.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div 
    v-if="isOpen"
    :style="{ top: `${y}px`, left: `${x}px` }"
    class="fixed z-50 w-52 bg-white border border-[#EDEDED] shadow-[0px_4px_20px_rgba(0,0,0,0.08)] rounded-lg py-1.5 font-['Inter'] text-sm"
    @contextmenu.prevent="emit('close')"
  >
    <button 
      @click="emit('action', 'new-folder')" 
      class="w-full flex items-center gap-3 px-4 py-2 text-[#21201a] hover:bg-[#F7F7F5] transition-colors"
    >
      <span class="material-symbols-outlined text-[20px] text-[#37352F]/60">create_new_folder</span>
      <span>New folder</span>
    </button>
    
    <div class="h-[1px] bg-[#EDEDED] my-1.5"></div>
    
    <button 
      @click="emit('action', 'upload-file')" 
      class="w-full flex items-center gap-3 px-4 py-2 text-[#21201a] hover:bg-[#F7F7F5] transition-colors"
    >
      <span class="material-symbols-outlined text-[20px] text-[#37352F]/60">upload_file</span>
      <span>File upload</span>
    </button>
  </div>
</template>