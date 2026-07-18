<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '@/features/user/store/userStore.js';
import { userService } from '@/features/user/api/userService.js';

const emit = defineEmits(['avatar-updated', 'profile-updated']);
const userStore = useUserStore();

// Estados del formulario
const nickname = ref('');
const password = ref('');
const avatarUrl = computed(() => userStore.profile.avatarUrl);

// Estados de carga
const isSaving = ref(false);
const isUploading = ref(false);
const message = ref({ text: '', type: '' }); // Para alertas de éxito/error

const fileInput = ref(null); // Referencia al input HTML oculto

// Acción 1: Subir Avatar
const handleAvatarUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Validación de tamaño (2MB) - Opcional en frontend pero buena práctica
  if (file.size > 2 * 1024 * 1024) {
    showMessage('La imagen supera el límite de 2MB', 'error');
    return;
  }

  isUploading.value = true;
  try {
    await userService.uploadAvatar(file);
    await userStore.fetchAvatar();
    emit('avatar-updated');
    showMessage('Avatar actualizado', 'success');
  } catch (error) {
    showMessage('Error al subir el avatar', 'error');
  } finally {
    isUploading.value = false;
  }
};

// Acción 2: Actualizar Perfil
const saveProfile = async () => {
  isSaving.value = true;
  try {
    await userService.updateProfile(nickname.value, password.value);
    await userStore.fetchDashboardData();
    emit('profile-updated');
    showMessage('Perfil actualizado correctamente', 'success');
    password.value = ''; // Limpiamos la contraseña por seguridad
  } catch (error) {
    showMessage('Error al actualizar el perfil', 'error');
  } finally {
    isSaving.value = false;
  }
};

// Mostrar mensajes temporales
const showMessage = (text, type) => {
  message.value = { text, type };
  setTimeout(() => message.value = { text: '', type: '' }, 4000);
};

// Abrir el explorador de archivos oculto
const triggerFileInput = () => {
  fileInput.value.click();
};
</script>

<template>
  <div class="max-w-2xl bg-white border border-[#EDEDED] p-8 rounded-xl shadow-sm">
    <h2 class="text-2xl font-bold text-[#21201a] mb-6">Profile Settings</h2>

    <!-- Alertas -->
    <div v-if="message.text" 
         :class="message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'"
         class="p-3 mb-6 rounded-lg text-sm font-medium">
      {{ message.text }}
    </div>

    <!-- Sección de Avatar -->
    <div class="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
      <div class="relative w-24 h-24 rounded-full bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center shrink-0">
        <!-- Overlay de carga -->
        <div v-if="isUploading" class="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
          <span class="material-symbols-outlined animate-spin">progress_activity</span>
        </div>
        
        <!-- Imagen o Icono por defecto -->
        <img v-if="avatarUrl" :src="avatarUrl" class="w-full h-full object-cover" alt="User Avatar" />
        <span v-else class="material-symbols-outlined text-[40px] text-gray-400">person</span>
      </div>

      <div>
        <h3 class="text-sm font-bold text-gray-700 mb-1">Profile Picture</h3>
        <p class="text-xs text-gray-500 mb-3">Max file size 2MB. Jpeg or Png.</p>
        
        <!-- Input oculto y botón estilizado -->
        <input 
          type="file" 
          ref="fileInput" 
          @change="handleAvatarUpload" 
          accept="image/jpeg, image/png, image/webp" 
          class="hidden" 
        />
        <button 
          @click="triggerFileInput"
          type="button" 
          class="px-4 py-1.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          :disabled="isUploading"
        >
          Change Avatar
        </button>
      </div>
    </div>

    <!-- Sección de Datos del Perfil -->
    <form @submit.prevent="saveProfile" class="space-y-5">
      <div class="space-y-1">
        <label class="text-[12px] font-bold text-gray-500 uppercase tracking-wider">Nickname</label>
        <input 
          v-model="nickname"
          type="text" 
          placeholder="New nickname"
          class="w-full px-3 py-2 bg-transparent border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#0059ba] focus:border-[#0059ba] outline-none text-sm"
        />
      </div>

      <div class="space-y-1">
        <label class="text-[12px] font-bold text-gray-500 uppercase tracking-wider">New Password</label>
        <input 
          v-model="password"
          type="password" 
          placeholder="Leave blank to keep current password"
          class="w-full px-3 py-2 bg-transparent border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#0059ba] focus:border-[#0059ba] outline-none text-sm"
        />
      </div>

      <div class="pt-4 flex justify-end">
        <button 
          type="submit"
          :disabled="isSaving"
          class="bg-[#0059ba] text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-[#004a9e] transition-colors disabled:opacity-70 flex items-center gap-2"
        >
          <span v-if="isSaving" class="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
          Save Changes
        </button>
      </div>
    </form>
  </div>
</template>
