<script setup>
import { ref } from 'vue';

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close', 'save']);

// Inicializamos el formulario agregando storagePlan
const formData = ref({
  nickname: props.user.nickname || '',
  password: '', // Se deja en blanco por seguridad
  role: props.user.role || 'USER',
  status: props.user.status || 'APPROVED',
  storagePlan: props.user.storagePlan || 'BASIC' // Por defecto BASIC si no viene
});

const isLoading = ref(false);
const showPassword = ref(false);

const statusOptions = [
  { value: 'APPROVED', label: 'Aprobado' },
  { value: 'PENDING', label: 'Pendiente' },
  { value: 'BANNED', label: 'Baneado' },
  { value: 'REJECTED', label: 'Rechazado' }
];

const roles = ['USER', 'ADMIN'];

// Mapeamos tu Enum de Java para la UI
const planOptions = [
  { value: 'BASIC', label: 'Basic (10 GB)' },
  { value: 'STANDARD', label: 'Standard (20 GB)' },
  { value: 'PREMIUM', label: 'Premium (30 GB)' },
  { value: 'ENTERPRISE', label: 'Enterprise (40 GB)' }
];

const formatDate = (isoString) => {
  if (!isoString) return 'N/A';
  return new Date(isoString).toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const submitForm = async () => {
  isLoading.value = true;

  const payload = {
    nickname: formData.value.nickname,
    role: formData.value.role,
    status: formData.value.status,
    storagePlan: formData.value.storagePlan
  };

  if (formData.value.password.trim() !== '') {
    payload.password = formData.value.password;
  }

  emit('save', {
    userId: props.user.id,
    data: payload,
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
    <div class="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in-up font-['Inter']">
      
      <!-- Cabecera -->
      <div class="flex items-center justify-between border-b border-[#EDEDED] px-6 py-4 bg-[#F7F7F5]">
        <div>
          <h2 class="text-lg font-bold text-[#1a1c1c]">Información del Usuario</h2>
          <p class="text-xs text-[#737267] mt-0.5">ID: {{ user.id }}</p>
        </div>
        <button 
          @click="$emit('close')"
          class="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-[#EDEDED] hover:text-black transition-colors"
        >
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <!-- Cuerpo del Modal -->
      <div class="px-6 py-5 space-y-5">
        
        <!-- Datos de Solo Lectura -->
        <div class="flex gap-4 p-4 bg-[#F7F7F5] rounded-xl border border-[#EDEDED]">
          <div class="h-12 w-12 shrink-0 rounded-full bg-[#0059ba] text-white flex items-center justify-center font-bold text-xl"> 
            {{ (user.nickname || user.email).charAt(0).toUpperCase() }} 
          </div> 
          <div class="overflow-hidden">
            <p class="text-xs font-semibold text-[#737267] uppercase tracking-wider mb-1">Cuenta</p>
            <p class="text-sm text-black truncate"><strong>Email:</strong> {{ user.email }}</p>
            <p class="text-sm text-[#49473f]"><strong>Creado:</strong> {{ formatDate(user.createdAt) }}</p>
          </div>
        </div>

        <form @submit.prevent="submitForm" class="space-y-4">
          <!-- Grid para Nickname y Contraseña (2 columnas) -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Nickname -->
            <div>
              <label class="block text-sm font-medium text-[#1a1c1c] mb-1.5">Nickname</label>
              <input 
                v-model="formData.nickname"
                type="text" 
                class="w-full bg-white border border-[#EDEDED] rounded-lg py-2 px-3 text-sm focus:border-[#0059ba]/50 focus:ring-2 focus:ring-[#0059ba]/10 transition-all outline-none"
                placeholder="Ej. Usuario123"
              />
            </div>

            <!-- Contraseña -->
            <div>
              <label class="block text-sm font-medium text-[#1a1c1c] mb-1.5">Nueva Contraseña</label>
              <div class="relative">
                <input 
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'" 
                  class="w-full bg-white border border-[#EDEDED] rounded-lg py-2 pl-3 pr-10 text-sm focus:border-[#0059ba]/50 focus:ring-2 focus:ring-[#0059ba]/10 transition-all outline-none placeholder:text-gray-400"
                  placeholder="Dejar en blanco para omitir"
                />
                <button 
                  type="button" 
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <span class="material-symbols-outlined text-[18px]">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Grid para Rol, Estado y Plan (3 columnas) -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-[#EDEDED]">
            <!-- Rol -->
            <div>
              <label class="block text-sm font-medium text-[#1a1c1c] mb-1.5">Rol de Sistema</label>
              <select 
                v-model="formData.role"
                class="w-full bg-white border border-[#EDEDED] rounded-lg py-2 px-3 text-sm focus:border-[#0059ba]/50 focus:ring-2 focus:ring-[#0059ba]/10 transition-all outline-none appearance-none"
              >
                <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
              </select>
            </div>

            <!-- Estado -->
            <div>
              <label class="block text-sm font-medium text-[#1a1c1c] mb-1.5">Estado</label>
              <select 
                v-model="formData.status"
                class="w-full bg-white border border-[#EDEDED] rounded-lg py-2 px-3 text-sm focus:border-[#0059ba]/50 focus:ring-2 focus:ring-[#0059ba]/10 transition-all outline-none appearance-none"
              >
                <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">
                  {{ opt.label }}
                </option>
              </select>
            </div>

            <!-- Plan de Almacenamiento -->
            <div>
              <label class="block text-sm font-medium text-[#1a1c1c] mb-1.5">Plan Storage</label>
              <select 
                v-model="formData.storagePlan"
                class="w-full bg-white border border-[#EDEDED] rounded-lg py-2 px-3 text-sm focus:border-[#0059ba]/50 focus:ring-2 focus:ring-[#0059ba]/10 transition-all outline-none appearance-none font-medium text-[#0059ba]"
              >
                <option v-for="plan in planOptions" :key="plan.value" :value="plan.value">
                  {{ plan.label }}
                </option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <!-- Footer / Acciones -->
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
          {{ isLoading ? 'Guardando...' : 'Guardar Cambios' }}
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