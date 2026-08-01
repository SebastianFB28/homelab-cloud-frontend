import api from '@/components/core/api/axiosInstance.js'

export const adminService = {
  /**
   * Obtiene la lista de usuarios según su estado.
   * @param {string} status - Ej: 'APPROVED', 'PENDING', 'BANNED', 'REJECTED', 'DELETED' o 'ALL'
   */
  getUsersByStatus: async (status) => {
    // Si es 'ALL', no enviamos el query param para traer todos, o lo enviamos según tu backend
    const params = status && status !== 'ALL' ? { status } : {};
    
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

updateUserStatus: async (userId, newStatus) => {
    console.log('[adminService] updateUserStatus ->', { userId, newStatus });

    try {
      // 💡 CAMBIO AQUÍ: Pasamos newStatus directamente en la URL
      // Eliminamos el 'undefined' y el objeto de configuración { params: ... }
      const response = await api.patch(`/admin/users/${userId}/status?newStatus=${newStatus}`);

      console.log('[adminService] updateUserStatus response ->', response);
      return response.data;
    } catch (error) {
      console.error('[adminService] updateUserStatus error ->', error);
      throw error;
    }
  },

  
  updateUser: async (userId, userData) => {
    // Si la contraseña viene vacía o no se envía, el backend debería ignorarla
    const response = await api.put(`/admin/users/${userId}`, userData);
    return response.data;
  },

  updateUserStoragePlan: async (userId, storagePlan) => {
    console.log('[adminService] updateUserStoragePlan ->', { userId, storagePlan });
    try {
      const response = await api.patch(`/admin/users/${userId}/update-storage-quota`, { storagePlan });
      return response.data;
    } catch (error) {
      console.error('[adminService] updateUserStoragePlan error ->', error);
      throw error;
    }
  }

};