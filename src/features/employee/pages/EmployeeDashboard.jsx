import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { PROCUREMENT_MOCK_DATA } from '@/features/procurement/data/procurementMockData'

export default function EmployeeDashboard() {
  const { user } = useSelector((state) => state.auth)
  const myRequests = PROCUREMENT_MOCK_DATA.filter((item) => item.requestedBy === user?.name || item.requestedBy === user?.email)

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>Employee Dashboard</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>A focused workspace for your requests, updates, and notifications.</Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card variant="outlined"><CardContent><Typography variant="h6" fontWeight={700}>{myRequests.length}</Typography><Typography variant="body2" color="text.secondary">My Requests</Typography></CardContent></Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined"><CardContent><Typography variant="h6" fontWeight={700}>{myRequests.filter((item) => item.status === 'Pending').length}</Typography><Typography variant="body2" color="text.secondary">Pending Requests</Typography></CardContent></Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined"><CardContent><Typography variant="h6" fontWeight={700}>3</Typography><Typography variant="body2" color="text.secondary">Notifications</Typography></CardContent></Card>
        </Grid>
      </Grid>

      <Stack spacing={2}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" fontWeight={700}>My Requests</Typography>
            {myRequests.slice(0, 3).map((item) => (
              <Box key={item.id} sx={{ mt: 1, p: 1.25, borderRadius: 2, bgcolor: 'action.hover' }}>
                <Typography fontWeight={600}>{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">{item.status} • {item.amount}</Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Stack>
    </Box>
  )
}
