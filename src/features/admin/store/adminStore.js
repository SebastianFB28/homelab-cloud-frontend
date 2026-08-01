import { defineStore } from 'pinia';
import { adminService } from '../api/adminService.js';

export const useAdminStore = defineStore('admin', {
  state: () => ({
    users: [],
    isLoading: false,
    error: null,
  }),
  
  actions: {
    async fetchUsersByStatus(status) {
      this.isLoading = true;
      this.error = null;
      try {
        const data = await adminService.getUsersByStatus(status);
        const normalizedUsers = Array.isArray(data)
          ? data
          : data?.users || data?.data || data?.content || [];

        this.users = normalizedUsers;
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
        this.error = error.response?.data?.message || 'Error al cargar los usuarios';
        this.users = [];
      } finally {
        this.isLoading = false;
      }
    },

    async updateUser(userId, userData) {
      this.isLoading = true;
      this.error = null;
      try {
        await adminService.updateUser(userId, userData);
        
        const index = this.users.findIndex(u => u.id === userId);
        if (index !== -1) {
          this.users[index] = { ...this.users[index], ...userData };
        }
        
        return true;
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al actualizar el usuario';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async updateUserStatus(userId, newStatus) {
      this.isLoading = true;
      this.error = null;
      try {
        await adminService.updateUserStatus(userId, newStatus);

        const index = this.users.findIndex(u => u.id === userId);
        if (index !== -1) {
          this.users[index] = { ...this.users[index], status: newStatus };
        }

        return true;
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al cambiar el estado del usuario';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async updateUserStoragePlan(userId, storagePlan) {
      this.isLoading = true;
      this.error = null;
      try {
        await adminService.updateUserStoragePlan(userId, storagePlan);

        // Actualizamos el usuario en la tabla local
        const index = this.users.findIndex(u => u.id === userId);
        if (index !== -1) {
          this.users[index] = { ...this.users[index], storagePlan };
        }

        return true;
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al cambiar el plan de almacenamiento';
        throw error;
      } finally {
        this.isLoading = false;
      }
    }
  }
});