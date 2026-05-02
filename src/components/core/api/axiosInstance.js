import axios from "axios";
import { useAuthStore } from "@/features/auth/store/auth.js";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // URL temporal
  timeout: 10000,
  withCredentials: true, // Fundamental para que las cookies seguras (Refresh Token) viajen al servidor
});

// Interceptor de Peticiones
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();

    // Sacamos el token directamente de Pinia (en memoria, más seguro)
    if (authStore.accessToken) {
      config.headers.Authorization = `Bearer ${authStore.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
