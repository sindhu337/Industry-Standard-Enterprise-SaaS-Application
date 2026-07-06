import { Box, Button, Typography, Stack, Paper } from '@mui/material'
import { WarningAmber as ErrorOutlineIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

export default function FallbackPage() {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 520,
          width: '100%',
          p: 5,
          borderRadius: 3,
          textAlign: 'center',
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'error.main',
              color: 'common.white',
            }}
          >
            <ErrorOutlineIcon sx={{ fontSize: 36 }} />
          </Box>
          <Typography variant="h4" fontWeight={700}>
            Something went wrong
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 440 }}>
            An unexpected error occurred while loading this page. You can try refreshing the page, or return to the home dashboard.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
            <Button
              variant="contained"
              onClick={() => window.location.reload()}
              sx={{ minWidth: 160 }}
            >
              Refresh Page
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate(ROUTES.HOME)}
              sx={{ minWidth: 160 }}
            >
              Back to Home
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}
