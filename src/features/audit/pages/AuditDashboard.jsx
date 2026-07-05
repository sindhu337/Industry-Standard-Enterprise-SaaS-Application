import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { PROCUREMENT_MOCK_DATA } from '@/features/procurement/data/procurementMockData'

export default function AuditDashboard() {
  const pendingAudits = PROCUREMENT_MOCK_DATA.filter((item) => item.auditStatus === 'Pending Audit').length
  const completedAudits = PROCUREMENT_MOCK_DATA.filter((item) => item.auditStatus === 'Audited').length
  const observations = PROCUREMENT_MOCK_DATA.filter((item) => item.auditStatus === 'Observation Raised').length

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>Audit Dashboard</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>Audit queue summary and review status.</Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card variant="outlined"><CardContent><Typography variant="h6" fontWeight={700}>{pendingAudits}</Typography><Typography variant="body2" color="text.secondary">Pending Audits</Typography></CardContent></Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined"><CardContent><Typography variant="h6" fontWeight={700}>{completedAudits}</Typography><Typography variant="body2" color="text.secondary">Completed Audits</Typography></CardContent></Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined"><CardContent><Typography variant="h6" fontWeight={700}>{observations}</Typography><Typography variant="body2" color="text.secondary">Observations</Typography></CardContent></Card>
        </Grid>
      </Grid>
    </Box>
  )
}
