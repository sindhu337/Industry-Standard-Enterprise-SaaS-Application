import apiClient from './apiClient'

export const reportApi = {
  getProcurementStats: (params) => apiClient.get('/reports/procurement', { params }),
  getVendorStats: (params) => apiClient.get('/reports/vendors', { params }),
  getComplianceStats: (params) => apiClient.get('/reports/compliance', { params }),
  getRiskStats: (params) => apiClient.get('/reports/risk', { params }),
  getSavedReports: () => apiClient.get('/reports/saved'),
  saveReport: (data) => apiClient.post('/reports/saved', data),
  deleteReport: (id) => apiClient.delete(`/reports/saved/${id}`),
  exportCsv: (type, params) => apiClient.get(`/reports/${type}/export/csv`, { params, responseType: 'blob' }),
  exportExcel: (type, params) => apiClient.get(`/reports/${type}/export/excel`, { params, responseType: 'blob' }),
}
