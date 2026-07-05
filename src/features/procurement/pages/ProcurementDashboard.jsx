import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { PROCUREMENT_MOCK_DATA } from '@/features/procurement/data/procurementMockData'

export default function ProcurementDashboard() {
  const pendingApprovals = PROCUREMENT_MOCK_DATA.filter((item) => item.status === 'Pending Approval').length
  const recentRequests = PROCUREMENT_MOCK_DATA.slice(0, 4)

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>Procurement Manager Dashboard</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>Approval queue and recent procurement activity in one place.</Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined"><CardContent><Typography variant="h6" fontWeight={700}>{pendingApprovals}</Typography><Typography variant="body2" color="text.secondary">Pending Approvals</Typography></CardContent></Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card variant="outlined"><CardContent><Typography variant="h6" fontWeight={700}>{recentRequests.length}</Typography><Typography variant="body2" color="text.secondary">Recent Requests</Typography></CardContent></Card>
        </Grid>
      </Grid>

      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" fontWeight={700}>Recent Requests</Typography>
          {recentRequests.map((item) => (
            <Box key={item.id} sx={{ mt: 1, p: 1.25, borderRadius: 2, bgcolor: 'action.hover' }}>
              <Typography fontWeight={600}>{item.title}</Typography>
              <Typography variant="body2" color="text.secondary">{item.requestedBy} • {item.status}</Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  )
}
