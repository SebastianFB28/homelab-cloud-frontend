import { defineStore } from 'pinia';
import { userService } from '../api/userService.js';

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: {
      nickname: '',
      email: '',
      avatarUrl: null
    },
    storage: {
      maxCapacityInBytes: 0,
      usedCapacityInBytes: 0,
      availableCapacityInBytes: 0
    },
    isLoading: false,
    error: null
  }),

  actions: {
    async fetchAvatar() {
      try {
        const avatarUrl = await userService.getAvatarUrl();
        if (this.profile.avatarUrl) {
          URL.revokeObjectURL(this.profile.avatarUrl);
        }
        this.profile.avatarUrl = avatarUrl;
      } catch (err) {
        // Un avatar es opcional; conservamos el avatar por defecto si no existe.
        this.profile.avatarUrl = null;
      }
    },

    async fetchDashboardData() {
      this.isLoading = true;
      this.error = null;
      try {
        const data = await userService.getDashboardData();
        
        // Guardamos los datos del usuario
        this.profile.nickname = data.nickname;
        this.profile.email = data.email;
        
        // Guardamos los datos de almacenamiento
        this.storage.maxCapacityInBytes = data.maxCapacityInBytes;
        this.storage.usedCapacityInBytes = data.usedCapacityInBytes;
        this.storage.availableCapacityInBytes = data.availableCapacityInBytes;
        await this.fetchAvatar();
        
      } catch (err) {
        console.error('Error al obtener datos del dashboard:', err);
        this.error = 'No se pudo cargar la información del usuario.';
      } finally {
        this.isLoading = false;
      }
    }
  }
});
