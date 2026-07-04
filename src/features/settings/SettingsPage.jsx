import { Typography, Paper } from '@mui/material'
import PageContainer from '@/components/common/layout/PageContainer'

export default function SettingsPage() {
  return (
    <PageContainer sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Paper sx={{ p: 4, textAlign: 'center', minWidth: 300 }}>
        <Typography variant="h5" fontWeight="bold">
          Settings Page
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Placeholder page for profiles, theme configurations, security, and preferences.
        </Typography>
      </Paper>
    </PageContainer>
  )
}
