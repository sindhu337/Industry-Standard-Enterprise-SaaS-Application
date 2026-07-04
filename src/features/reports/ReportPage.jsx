import { Box, Typography, Paper } from '@mui/material'

export default function ReportPage() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Paper sx={{ p: 4, textAlign: 'center', minWidth: 300 }}>
        <Typography variant="h5" fontWeight="bold">
          Reporting Center
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Placeholder page for procurement, vendor, compliance, and risk analytics exports.
        </Typography>
      </Paper>
    </Box>
  )
}
