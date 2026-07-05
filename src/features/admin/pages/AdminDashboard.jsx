import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { PROCUREMENT_MOCK_DATA } from '@/features/procurement/data/procurementMockData'
import usersData from '@/mocks/users.json'
import { VENDOR_MOCK_DATA } from '@/features/vendors/data/vendorMockData'

export default function AdminDashboard() {
  const approvedRequests = PROCUREMENT_MOCK_DATA.filter((item) => item.status === 'Approved').length
  const activeVendors = VENDOR_MOCK_DATA.filter((item) => item.status === 'Active').length

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>Administrator Dashboard</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>Cross-workspace oversight for users, procurement, compliance, and audit operations.</Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}><Card variant="outlined"><CardContent><Typography variant="h6" fontWeight={700}>{usersData.length}</Typography><Typography variant="body2" color="text.secondary">Users</Typography></CardContent></Card></Grid>
        <Grid item xs={12} md={4}><Card variant="outlined"><CardContent><Typography variant="h6" fontWeight={700}>{PROCUREMENT_MOCK_DATA.length}</Typography><Typography variant="body2" color="text.secondary">Procurement Requests</Typography></CardContent></Card></Grid>
        <Grid item xs={12} md={4}><Card variant="outlined"><CardContent><Typography variant="h6" fontWeight={700}>{approvedRequests}</Typography><Typography variant="body2" color="text.secondary">Approved Requests</Typography></CardContent></Card></Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}><Card variant="outlined"><CardContent><Typography variant="h6" fontWeight={700}>System Health</Typography><Typography variant="body2" color="text.secondary">All governance services are online.</Typography></CardContent></Card></Grid>
        <Grid item xs={12} md={6}><Card variant="outlined"><CardContent><Typography variant="h6" fontWeight={700}>Active Vendors</Typography><Typography variant="h6" fontWeight={700}>{activeVendors}</Typography></CardContent></Card></Grid>
      </Grid>
    </Box>
  )
}
