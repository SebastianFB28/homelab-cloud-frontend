import axios from 'axios';

// 1. Creamos una instancia base con la URL de tu backend
const api = axios.create({
    baseURL: 'http://tu-backend-url.com/api', // Cambiarás esto luego
    timeout: 10000, // Si el backend no responde en 10s, da error
});

// 2. Configuramos el Interceptor de Peticiones (Requests)
api.interceptors.request.use(
    (config) => {
        // Aquí buscaremos el token (normalmente en localStorage o en Pinia)
        const token = localStorage.getItem('jwt_token');

        // Si hay token, lo inyectamos en la cabecera de Autorización
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Si hay un error antes de enviar la petición, lo rechazamos
        return Promise.reject(error);
    }
);

export default api;