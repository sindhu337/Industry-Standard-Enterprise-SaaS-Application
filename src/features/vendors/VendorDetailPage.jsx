import { Typography, Paper } from '@mui/material'
import PageContainer from '@/components/common/layout/PageContainer'

export default function VendorDetailPage() {
  return (
    <PageContainer sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Paper sx={{ p: 4, textAlign: 'center', minWidth: 300 }}>
        <Typography variant="h5" fontWeight="bold">
          Vendor Profile Details
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Placeholder page for vendor risk assessment, contacts, and logs.
        </Typography>
      </Paper>
    </PageContainer>
  )
}
