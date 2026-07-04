import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

export default function ServerErrorPage() {
  const navigate = useNavigate()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: 2 }}>
      <Typography variant="h1" color="error.main" fontWeight={800}>500</Typography>
      <Typography variant="h5">Internal Server Error</Typography>
      <Typography variant="body2" color="text.secondary">Something went wrong on our end. Please try again later.</Typography>
      <Button variant="contained" onClick={() => navigate(ROUTES.DASHBOARD)}>Go to Dashboard</Button>
    </Box>
  )
}
