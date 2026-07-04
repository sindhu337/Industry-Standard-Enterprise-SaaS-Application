import { Box, Typography, Paper } from '@mui/material'

export default function ProcurementDetailPage() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Paper sx={{ p: 4, textAlign: 'center', minWidth: 300 }}>
        <Typography variant="h5" fontWeight="bold">
          Procurement Details
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Placeholder page for procurement details, history, comments and logs.
        </Typography>
      </Paper>
    </Box>
  )
}
