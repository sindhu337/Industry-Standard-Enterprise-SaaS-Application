import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { PROCUREMENT_MOCK_DATA } from '@/features/procurement/data/procurementMockData'
import PageContainer from '@/components/common/layout/PageContainer'

export default function ProcurementDashboard() {
  const pendingApprovals = PROCUREMENT_MOCK_DATA.filter((item) => item.status === 'Pending Approval').length
  const recentRequests = PROCUREMENT_MOCK_DATA.slice(0, 4)
  const stats = [
    { label: 'Pending Approvals', value: pendingApprovals, color: 'warning.main' },
    { label: 'Recent Requests', value: recentRequests.length, color: 'primary.main' },
  ]

  return (
    <PageContainer>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Procurement Manager Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mb: 3 }}>
        Approval queue and recent procurement activity in one place.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {stats.map((metric) => (
          <Grid item xs={12} md={6} key={metric.label}>
            <Card variant="outlined" sx={{ minHeight: 132, borderRadius: 1.5, borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h5" fontWeight={700} gutterBottom color={metric.color}>
                  {metric.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {metric.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card variant="outlined" sx={{ borderRadius: 1.5, borderColor: 'divider' }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
            Recent Requests
          </Typography>
          <Box sx={{ display: 'grid', gap: 2 }}>
            {recentRequests.map((item) => (
              <Box key={item.id} sx={{ p: 2, borderRadius: 1.5, bgcolor: 'action.hover' }}>
                <Typography variant="subtitle1" fontWeight={700}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.requestedBy} • {item.status}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </PageContainer>
  )
}
