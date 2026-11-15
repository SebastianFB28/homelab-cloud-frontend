import api from '@/components/core/api/axiosInstance.js';

/**
 * Servicio de streaming de video.
 *
 * Flujo:
 *  1. `POST /files/{id}/stream-token` -> petición autenticada con axios (lleva el header
 *     `Authorization`). El backend devuelve un token de corta duración.
 *  2. Se construye la URL pública `GET /files/{id}/stream?token=...` que el navegador
 *     consume directamente en el <video>. Así el backend sirve el contenido con soporte
 *     de Range (HTTP 206) y nunca se expone el JWT en la URL.
 */
export const streamingService = {
  /**
   * Obtiene un token de streaming y devuelve la URL lista para usar en el reproductor.
   * @param {string} fileId UUID del archivo de video.
   * @param {AbortSignal} [signal] Permite cancelar la petición del token.
   * @returns {Promise<string>} URL absoluta del stream.
   */
  async getStreamUrl(fileId, signal) {
    const { data } = await api.post(`/files/${fileId}/stream-token`, null, { signal });

    const token = data?.token;
    if (!token) {
      throw new Error('El servidor no devolvió un token de streaming.');
    }

    const base = (api.defaults.baseURL || '').replace(/\/$/, '');
    return `${base}/files/${fileId}/stream?token=${encodeURIComponent(token)}`;
  }
};
