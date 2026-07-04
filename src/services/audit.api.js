import apiClient from './apiClient'

export const auditApi = {
  getReports: (params) => apiClient.get('/audit/reports', { params }),
  getReportById: (id) => apiClient.get(`/audit/reports/${id}`),
  getHistory: (params) => apiClient.get('/audit/history', { params }),
  getUserActivities: (params) => apiClient.get('/audit/user-activities', { params }),
  getSystemLogs: (params) => apiClient.get('/audit/system-logs', { params }),
  exportCsv: (params) => apiClient.get('/audit/export/csv', { params, responseType: 'blob' }),
}
