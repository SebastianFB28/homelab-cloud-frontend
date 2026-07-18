import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    // Inicializamos el token leyendo del localStorage de una vez
    accessToken: localStorage.getItem('token') || null, 
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },
  
  actions: {
    setToken(token) {
      this.accessToken = token;
      // Guardamos en disco para que sobreviva al F5
      localStorage.setItem('token', token);
    },
    
    setUser(userData) {
      this.user = userData;
    },
    
    logout() {
      this.accessToken = null;
      this.user = null;
      // Borramos del disco al cerrar sesión
      localStorage.removeItem('token');
    }
  }
});