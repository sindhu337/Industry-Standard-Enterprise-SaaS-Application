import apiClient from './apiClient'

export const dashboardApi = {
  getKpis: () => apiClient.get('/dashboard/kpis'),
  getChartData: () => apiClient.get('/dashboard/charts'),
  getActivityTimeline: () => apiClient.get('/dashboard/activity'),
  getPendingApprovals: () => apiClient.get('/dashboard/approvals'),
  getRecentNotifications: () => apiClient.get('/dashboard/notifications'),
}
