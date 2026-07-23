import api from '@/components/core/api/axiosInstance.js';

export const filesService = {
  async listDirectory(folderId = null) {
    const params = {};
    if (folderId) params.folderId = folderId;

    const response = await api.get('/storage/list', { params });
    return response.data;
  },

  async createFolder(name, parentFolderId = null) {
    const response = await api.post('/storage/folders', {
      name,
      parentFolderId
    });
    return response.data;
  },

  async uploadFile(file, parentFolderId = null, onUploadProgress, signal) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    if (parentFolderId) formData.append('parentFolderId', parentFolderId);

    // Axios añade el boundary multipart automáticamente.
    const response = await api.post('/storage/files/upload', formData, {
      // Las cargas grandes no deben expirar aunque cambie el timeout global.
      timeout: 0,
      onUploadProgress,
      signal
    });
    return response.data;
  },

  async downloadFile(fileId) {
    const response = await api.get(`/storage/files/${fileId}/download`, {
      responseType: 'blob'
    });
    return {
      blob: response.data,
      contentDisposition: response.headers['content-disposition']
    };
  }
};
