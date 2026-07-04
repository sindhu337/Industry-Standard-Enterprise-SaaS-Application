import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: 2 }}>
      <Typography variant="h1" color="primary" fontWeight={800}>404</Typography>
      <Typography variant="h5">Page Not Found</Typography>
      <Typography variant="body2" color="text.secondary">The page you are looking for does not exist.</Typography>
      <Button variant="contained" onClick={() => navigate(ROUTES.DASHBOARD)}>Go to Dashboard</Button>
    </Box>
  )
}
