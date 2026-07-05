import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { PROCUREMENT_MOCK_DATA } from '@/features/procurement/data/procurementMockData'

export default function ComplianceDashboard() {
  const pendingReviews = PROCUREMENT_MOCK_DATA.filter((item) => item.complianceStatus === 'Under Review').length
  const complianceStatus = PROCUREMENT_MOCK_DATA.filter((item) => item.complianceStatus === 'Compliant').length
  const violations = PROCUREMENT_MOCK_DATA.filter((item) => item.complianceStatus === 'Non-Compliant').length

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>Compliance Dashboard</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>Compliance review queue and status indicators.</Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card variant="outlined"><CardContent><Typography variant="h6" fontWeight={700}>{pendingReviews}</Typography><Typography variant="body2" color="text.secondary">Pending Reviews</Typography></CardContent></Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined"><CardContent><Typography variant="h6" fontWeight={700}>{complianceStatus}</Typography><Typography variant="body2" color="text.secondary">Compliance Status</Typography></CardContent></Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined"><CardContent><Typography variant="h6" fontWeight={700}>{violations}</Typography><Typography variant="body2" color="text.secondary">Violations</Typography></CardContent></Card>
        </Grid>
      </Grid>
    </Box>
  )
}
