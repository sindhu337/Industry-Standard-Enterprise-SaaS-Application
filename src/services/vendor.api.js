import apiClient from './apiClient'

export const vendorApi = {
  getAll: (params) => apiClient.get('/vendors', { params }),
  getById: (id) => apiClient.get(`/vendors/${id}`),
  create: (data) => apiClient.post('/vendors', data),
  update: (id, data) => apiClient.put(`/vendors/${id}`, data),
  delete: (id) => apiClient.delete(`/vendors/${id}`),
  getContacts: (id) => apiClient.get(`/vendors/${id}/contacts`),
  getDocuments: (id) => apiClient.get(`/vendors/${id}/documents`),
  getRiskHistory: (id) => apiClient.get(`/vendors/${id}/risk-history`),
  exportCsv: (params) => apiClient.get('/vendors/export/csv', { params, responseType: 'blob' }),
}
