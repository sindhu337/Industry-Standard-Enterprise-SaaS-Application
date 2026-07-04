import apiClient from './apiClient'

export const procurementApi = {
  getAll: (params) => apiClient.get('/procurement', { params }),
  getById: (id) => apiClient.get(`/procurement/${id}`),
  create: (data) => apiClient.post('/procurement', data),
  update: (id, data) => apiClient.put(`/procurement/${id}`, data),
  delete: (id) => apiClient.delete(`/procurement/${id}`),
  approve: (id, note) => apiClient.post(`/procurement/${id}/approve`, { note }),
  reject: (id, reason) => apiClient.post(`/procurement/${id}/reject`, { reason }),
  addComment: (id, comment) => apiClient.post(`/procurement/${id}/comments`, { comment }),
  uploadAttachment: (id, file) => apiClient.post(`/procurement/${id}/attachments`, file),
  exportCsv: (params) => apiClient.get('/procurement/export/csv', { params, responseType: 'blob' }),
  exportExcel: (params) => apiClient.get('/procurement/export/excel', { params, responseType: 'blob' }),
}
