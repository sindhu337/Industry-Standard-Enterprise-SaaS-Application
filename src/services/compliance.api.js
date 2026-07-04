import apiClient from './apiClient'

export const complianceApi = {
  getAll: (params) => apiClient.get('/compliance', { params }),
  getViolations: () => apiClient.get('/compliance/violations'),
  getExpiredCertificates: () => apiClient.get('/compliance/expired-certificates'),
  getMissingDocuments: () => apiClient.get('/compliance/missing-documents'),
  getSummary: () => apiClient.get('/compliance/summary'),
  exportCsv: (params) => apiClient.get('/compliance/export/csv', { params, responseType: 'blob' }),
}
