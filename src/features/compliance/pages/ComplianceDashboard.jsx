import { Card, CardContent, Grid, Typography } from '@mui/material'
import { PROCUREMENT_MOCK_DATA } from '@/features/procurement/data/procurementMockData'
import PageContainer from '@/components/common/layout/PageContainer'

export default function ComplianceDashboard() {
  const stats = [
    { label: 'Pending Reviews', value: PROCUREMENT_MOCK_DATA.filter((item) => item.complianceStatus === 'Under Review').length, color: 'warning.main' },
    { label: 'Compliant', value: PROCUREMENT_MOCK_DATA.filter((item) => item.complianceStatus === 'Compliant').length, color: 'success.main' },
    { label: 'Violations', value: PROCUREMENT_MOCK_DATA.filter((item) => item.complianceStatus === 'Non-Compliant').length, color: 'error.main' },
  ]

  return (
    <PageContainer>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Compliance Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mb: 3 }}>
        Compliance review queue and status indicators.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {stats.map((metric) => (
          <Grid item xs={12} md={4} key={metric.label}>
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
    </PageContainer>
  )
}
