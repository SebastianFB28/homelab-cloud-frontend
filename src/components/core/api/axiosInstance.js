import axios from "axios";
import { useAuthStore } from "@/features/auth/store/auth.js";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  timeout: 10000,
  withCredentials: true, // Fundamental para que las cookies seguras (Refresh Token) viajen al servidor
});

// Interceptor de Peticiones
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    
    // 1. Intentamos sacar el token de Pinia (memoria)
    let token = authStore.accessToken;

    // 2. Si Pinia está vacío (porque se hizo F5), lo buscamos en localStorage
    if (!token) {
      token = localStorage.getItem('token');
      // Opcional: Si lo encontramos en localStorage, lo volvemos a meter a Pinia
      if (token) authStore.accessToken = token; 
    }

    // 3. Si hay token de alguna de las dos fuentes, lo inyectamos
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
