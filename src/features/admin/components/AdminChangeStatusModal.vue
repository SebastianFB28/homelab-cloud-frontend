<script setup>
import { ref } from 'vue';

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close', 'save']);

const isLoading = ref(false);
const selectedStatus = ref(props.user.status || 'APPROVED');

const statusOptions = [
  { value: 'APPROVED', label: 'Aprobado' },
  { value: 'PENDING', label: 'Pendiente' },
  { value: 'BANNED', label: 'Baneado' },
  { value: 'REJECTED', label: 'Rechazado' }
];

const submitForm = async () => {
  isLoading.value = true;

  console.log('[AdminChangeStatusModal] submitForm ->', {
    userId: props.user.id,
    selectedStatus: selectedStatus.value,
    user: props.user
  });

  emit('save', {
    userId: props.user.id,
    newStatus: selectedStatus.value,
    onComplete: () => {
      isLoading.value = false;
    }
  });
};
</script>

<template>
  <div
    class="fixed inset-0 z-[100] flex items-center justify-center bg-[#21201a]/30 p-4 backdrop-blur-sm"
    @click.self="$emit('close')"
  >
    <div class="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in-up font-['Inter']">
      <div class="flex items-center justify-between border-b border-[#EDEDED] px-6 py-4 bg-[#F7F7F5]">
        <div>
          <h2 class="text-lg font-bold text-[#1a1c1c]">Cambiar Estado</h2>
          <p class="text-xs text-[#737267] mt-0.5">Actualizar el estado del usuario</p>
        </div>
        <button
          @click="$emit('close')"
          class="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-[#EDEDED] hover:text-black transition-colors"
        >
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <div class="px-6 py-5 space-y-4">
        <div class="rounded-xl border border-[#EDEDED] bg-[#F7F7F5] p-4">
          <p class="text-sm text-[#49473f]">
            <span class="font-semibold text-[#1a1c1c]">Usuario:</span>
            {{ user.nickname || user.email }}
          </p>
          <p class="text-sm text-[#49473f] mt-1">
            <span class="font-semibold text-[#1a1c1c]">Estado actual:</span>
            {{ user.status }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-[#1a1c1c] mb-1.5">Nuevo estado</label>
          <select
            v-model="selectedStatus"
            class="w-full bg-white border border-[#EDEDED] rounded-lg py-2 px-3 text-sm focus:border-[#0059ba]/50 focus:ring-2 focus:ring-[#0059ba]/10 transition-all outline-none appearance-none"
          >
            <option v-for="option in statusOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>

      <div class="border-t border-[#EDEDED] px-6 py-4 bg-gray-50 flex justify-end gap-3">
        <button
          type="button"
          @click="$emit('close')"
          class="px-4 py-2 text-sm font-medium text-[#49473f] hover:bg-[#EDEDED] rounded-lg transition-colors"
        >
          Cancelar
        </button>
        <button
          @click="submitForm"
          :disabled="isLoading"
          class="px-4 py-2 text-sm font-medium bg-[#0059ba] text-white rounded-lg hover:bg-[#004a9e] transition-colors disabled:opacity-70 flex items-center gap-2"
        >
          <span v-if="isLoading" class="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
          {{ isLoading ? 'Guardando...' : 'Guardar Estado' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.2s ease-out forwards;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
