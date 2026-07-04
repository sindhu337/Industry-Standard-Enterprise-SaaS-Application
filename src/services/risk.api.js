import apiClient from './apiClient'

export const riskApi = {
  getAll: (params) => apiClient.get('/risks', { params }),
  getById: (id) => apiClient.get(`/risks/${id}`),
  getSummary: () => apiClient.get('/risks/summary'),
  getTrend: () => apiClient.get('/risks/trend'),
  create: (data) => apiClient.post('/risks', data),
  update: (id, data) => apiClient.put(`/risks/${id}`, data),
  delete: (id) => apiClient.delete(`/risks/${id}`),
  exportCsv: (params) => apiClient.get('/risks/export/csv', { params, responseType: 'blob' }),
}
