import axios from "axios";
import { useAuthStore } from "@/features/auth/store/auth.js";

const api = axios.create({
  // Si la variable existe la usa, si no, usa localhost por defecto para cuando desarrolles
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1",
  withCredentials: true, // Fundamental para que las cookies seguras (Refresh Token) viajen al servidor
});

// Interceptor de Peticiones
api.interceptors.request.use((config) => {
  const publicEndpoints = [
    "/auth/login",
    "/auth/register",
  ];

  const isPublic = publicEndpoints.some(endpoint =>
    config.url?.endsWith(endpoint)
  );

  if (isPublic) {
    return config;
  }

  const authStore = useAuthStore();

  let token = authStore.accessToken;

  if (!token) {
    token = localStorage.getItem("token");

    if (token) {
      authStore.accessToken = token;
    }
  }

  config.headers = config.headers || {};

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  console.log('[axiosInstance] request ->', {
    url: config.url,
    method: config.method,
    hasToken: !!token,
    authHeader: config.headers.Authorization || null
  });

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[axiosInstance] response error ->', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers
    });

    return Promise.reject(error);
  }
);

export default api;
