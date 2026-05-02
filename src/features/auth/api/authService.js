import api from '@/components/core/api/axiosInstance.js'

export const authService = {
  async login(credentials) {
    // credentials = { email, password }
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  async register(userData) {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  async logout() {
    await api.post('/auth/logout');
  }
};