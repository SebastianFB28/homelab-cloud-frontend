import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode'; // Importamos la librería

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    role: localStorage.getItem('role') || null, // Guardamos el rol para sobrevivir al F5
    accessToken: localStorage.getItem('token') || null, 
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    isAdmin: (state) => state.role === 'ADMIN' || state.role === 'ROLE_ADMIN', // Ajusta según tu backend
  },
  
  actions: {
    setToken(token) {
      this.accessToken = token;
      localStorage.setItem('token', token);
      
      // Decodificamos el token para extraer información
      try {
        const decoded = jwtDecode(token);
        
        // Dependiendo de cómo Spring Boot genere tu token, el claim puede llamarse 'role', 'roles', o 'authorities'
        // Haz un console.log(decoded) si no estás seguro del nombre exacto.
        this.role = decoded.role || decoded.authorities; 
        localStorage.setItem('role', this.role);
      } catch (error) {
        console.error("Error al decodificar el token", error);
      }
    },
    
    setUser(userData) {
      this.user = userData;
    },
    
    logout() {
      this.accessToken = null;
      this.user = null;
      this.role = null;
      localStorage.removeItem('token');
      localStorage.removeItem('role'); // Limpiamos también el rol
    }
  }
});