import api from '@/components/core/api/axiosInstance.js';

export const streamingService = {
  async fetchVideoPreview(fileId, signal) {
    const response = await api.get(`/storage/files/${fileId}/download`, {
      responseType: 'blob',
      timeout: 0,
      signal
    });
    return response.data;
  }
};
