import { Card, CardContent, Grid, Typography } from '@mui/material'
import { PROCUREMENT_MOCK_DATA } from '@/features/procurement/data/procurementMockData'
import usersData from '@/mocks/users.json'
import vendorsData from '@/mocks/vendors.json'
import PageContainer from '@/components/common/layout/PageContainer'

export default function AdminDashboard() {
  const approvedRequests = PROCUREMENT_MOCK_DATA.filter((item) => item.status === 'Approved').length
  const activeVendors = vendorsData.filter((item) => item.status === 'Active').length

  return (
    <PageContainer>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Administrator Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mb: 3 }}>
        Cross-workspace oversight for users, procurement, compliance, and audit operations.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ minHeight: 150 }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Users
              </Typography>
              <Typography variant="h4" fontWeight={800}>
                {usersData.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ minHeight: 150 }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Procurement Requests
              </Typography>
              <Typography variant="h4" fontWeight={800}>
                {PROCUREMENT_MOCK_DATA.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ minHeight: 150 }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Approved Requests
              </Typography>
              <Typography variant="h4" fontWeight={800}>
                {approvedRequests}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ minHeight: 160 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                System Health
              </Typography>
              <Typography variant="body2" color="text.secondary">
                All governance services are online.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ minHeight: 160 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Active Vendors
              </Typography>
              <Typography variant="h4" fontWeight={800}>
                {activeVendors}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  )
}
