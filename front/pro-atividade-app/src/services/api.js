import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL,
});

export const atividadeService = {
  getAll: () => api.get('/atividade'),
  getById: (id) => api.get(`/atividade/${id}`),
  create: (data) => api.post('/atividade', data),
  update: (id, data) => api.put(`/atividade/${id}`, data),
  delete: (id) => api.delete(`/atividade/${id}`),
};

export default api;
