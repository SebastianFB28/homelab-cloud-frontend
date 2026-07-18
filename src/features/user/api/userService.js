import api from '@/components/core/api/axiosInstance.js';

export const userService = {
  /**
   * Obtiene la información del dashboard del usuario (perfil y cuotas de almacenamiento)
   */
  async getDashboardData() {
    const response = await api.get('/user/dashboard');
    return response.data;
  },

  
  async updateProfile(nickname, password) {
    const payload = { nickname, password };
    const response = await api.put('/user/profile', payload);
    return response.data;
  },

  // Subir el avatar usando FormData
  async uploadAvatar(file) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    
    // No establecer Content-Type manualmente: Axios añade el boundary requerido
    // para que Spring reconozca la petición como multipart.
    const response = await api.post('/storage/save-avatar', formData);
    return response.data;
  },

  // Descargar el avatar y convertirlo a una URL visualizable
  async getAvatarUrl() {
    // Evita que el navegador devuelva una versión anterior desde caché después de subir otra imagen.
    const response = await api.get('/storage/get-avatar', {
      params: { _: Date.now() },
      responseType: 'blob' // Fundamental para recibir archivos binarios
    });
    return URL.createObjectURL(response.data); // Crea una URL temporal (blob:http://...)
  }

};
