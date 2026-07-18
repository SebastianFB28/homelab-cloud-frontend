<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/features/user/store/userStore.js';
import { useAuthStore } from '@/features/auth/store/auth.js';
import { authService } from '@/features/auth/api/authService.js';
import ProfileSettings from '@/features/user/components/ProfileSettings.vue';
import FeatureUnavailableModal from '@/components/shared/FeatureUnavailableModal.vue';

defineEmits(['create-folder', 'upload-file']);

// Usamos el store del usuario
const userStore = useUserStore();
const authStore = useAuthStore();
const router = useRouter();
const showProfileModal = ref(false);
const showFeatureModal = ref(false);
const unavailableFeature = ref('');
const isSigningOut = ref(false);

// Apenas se monta el layout (que envuelve toda la app), pedimos los datos
onMounted(() => {
  userStore.fetchDashboardData();
});

const handleLogout = async () => {
  if (isSigningOut.value) return;

  isSigningOut.value = true;
  try {
    await authService.logout();
  } catch (error) {
    // Aunque el servidor no responda, eliminamos las credenciales locales.
    console.warn('No se pudo cerrar la sesión en el servidor:', error);
  } finally {
    authStore.logout();
    router.replace('/');
  }
};

const showUnavailableFeature = (feature) => {
  unavailableFeature.value = feature;
  showFeatureModal.value = true;
};
</script>

<template>
  <div class="font-body-md overflow-x-hidden bg-[#f9f9f9] text-[#1a1c1c] min-h-screen">
    <!-- SideNavBar -->
    <aside class="fixed left-0 top-0 z-50 flex h-full w-64 flex-col gap-4 border-r border-[#EDEDED] bg-white p-5 font-['Inter'] text-sm antialiased">

      <!-- AQUÍ CONECTAMOS LOS DATOS DEL USUARIO -->
      <button
        type="button"
        @click="showProfileModal = true"
        class="mb-3 flex w-full flex-col items-center rounded-xl border border-transparent px-3 py-4 text-center transition-colors hover:border-[#EDEDED] hover:bg-[#F7F7F5]"
      >
        <img
          alt="Profile"
          class="mb-3 h-24 w-24 rounded-full border-2 border-[#EDEDED] object-cover shadow-sm"
          :src="userStore.profile.avatarUrl || `https://ui-avatars.com/api/?name=${userStore.profile.nickname || 'User'}&background=random`"
        />
        <!-- Mostramos "Cargando..." mientras llega la petición -->
        <h2 class="text-lg font-bold text-[#21201a]">{{ userStore.profile.nickname || 'Loading...' }}</h2>
        <p class="mt-0.5 text-[12px] text-[#21201a]/65">{{ userStore.profile.email || '...' }}</p>
      </button>

      <nav class="flex flex-col gap-1">
        <RouterLink to="/dashboard" active-class="bg-[#F7F7F5] text-black font-semibold" class="flex items-center gap-3 rounded-md px-3 py-2 text-black transition-all hover:bg-[#F7F7F5] active:scale-[0.98]">
          <span class="material-symbols-outlined text-[20px]">home</span>
          <span>Home</span>
        </RouterLink>
        <RouterLink to="/files" active-class="bg-[#F7F7F5] text-black font-semibold" class="flex items-center gap-3 rounded-md px-3 py-2 text-black transition-all hover:bg-[#F7F7F5] active:scale-[0.98]">
          <span class="material-symbols-outlined text-[20px]">folder</span>
          <span>My Drive</span>
        </RouterLink>
      </nav>

      <div class="h-[1px] bg-[#EDEDED] mx-2"></div>

      <nav class="mt-auto flex flex-col gap-1 border-t border-[#EDEDED] pt-4">
        <button type="button" @click="showProfileModal = true" class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-black transition-all hover:bg-[#F7F7F5] active:scale-[0.98]">
          <span class="material-symbols-outlined text-[20px]">settings</span>
          <span>Settings</span>
        </button>
        <button type="button" :disabled="isSigningOut" @click="handleLogout" class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-black transition-all hover:bg-red-50 disabled:cursor-wait disabled:opacity-60">
          <span class="material-symbols-outlined text-[20px]">logout</span>
          <span>{{ isSigningOut ? 'Signing out...' : 'Sign out' }}</span>
        </button>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <main class="ml-64 min-h-screen">
      <!-- TopAppBar (sin cambios) -->
      <header class="flex justify-between items-center px-8 h-14 bg-white/80 backdrop-blur-md border-b border-[#EDEDED] sticky top-0 z-40 font-['Inter'] text-sm tracking-tight">
        <div class="flex items-center gap-4 w-1/3">
          <div class="relative w-full max-w-sm">
            <span class="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-[#37352F]/40 text-[18px]">search</span>
            <input @click="showUnavailableFeature('La búsqueda de archivos')" class="w-full bg-[#F7F7F5] border-none rounded-[4px] py-1.5 pl-9 pr-4 text-sm focus:ring-1 focus:ring-secondary/20 placeholder:text-[#37352F]/30" placeholder="Search files..." type="text" />
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button type="button" @click="$emit('create-folder')" class="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#EDEDED] text-[#37352F] rounded-[4px] hover:bg-[#F7F7F5] transition-colors">
            <span class="material-symbols-outlined text-[18px]">create_new_folder</span>
            <span>New Folder</span>
          </button>
          <button type="button" @click="$emit('upload-file')" class="flex items-center gap-2 px-3 py-1.5 bg-[#21201a] text-white rounded-[4px] hover:opacity-90 transition-opacity">
            <span class="material-symbols-outlined text-[18px]">upload</span>
            <span>Upload</span>
          </button>
        </div>
      </header>

      <!-- Aquí se inyecta el contenido de cada vista -->
      <slot />
    </main>

    <div
      v-if="showProfileModal"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-[#21201a]/30 p-4 backdrop-blur-sm"
      @click.self="showProfileModal = false"
    >
      <div class="relative w-full max-w-2xl animate-fade-in-up">
        <button
          type="button"
          aria-label="Cerrar configuración de perfil"
          @click="showProfileModal = false"
          class="absolute right-6 top-6 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
        >
          <span class="material-symbols-outlined text-[18px]">close</span>
        </button>
        <ProfileSettings />
      </div>
    </div>

    <FeatureUnavailableModal v-if="showFeatureModal" :feature="unavailableFeature" @close="showFeatureModal = false" />
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
