import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

export default function ForbiddenPage() {
  const navigate = useNavigate()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: 2 }}>
      <Typography variant="h1" color="warning.main" fontWeight={800}>403</Typography>
      <Typography variant="h5">Access Forbidden</Typography>
      <Typography variant="body2" color="text.secondary">You do not have permission to view this page.</Typography>
      <Button variant="contained" onClick={() => navigate(ROUTES.DASHBOARD)}>Go to Dashboard</Button>
    </Box>
  )
}
