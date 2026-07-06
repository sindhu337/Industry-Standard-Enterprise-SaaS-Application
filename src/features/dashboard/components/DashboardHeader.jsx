import { useSelector } from 'react-redux'
import { Box, Typography, Chip } from '@mui/material'

export default function DashboardHeader() {
  const { user } = useSelector((state) => state.auth)

  const getGreeting = () => {
    const hrs = new Date().getHours()
    if (hrs < 12) return 'Good Morning'
    if (hrs < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  const getFormattedDate = () => {
    return new Date().toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <Box sx={{ mb: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'center' }, justifyContent: 'space-between', gap: 2 }}>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          <Typography variant="h3" fontWeight={700} color="text.primary">
            {getGreeting()}, {user?.name || 'User'}
          </Typography>
          <Chip
            label={user?.role || 'Employee'}
            color="primary"
            variant="outlined"
            size="small"
            sx={{ fontWeight: 500, fontSize: '0.75rem', borderRadius: 1.5 }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Here is the governance, risk, compliance and procurement summary for your workspace.
        </Typography>
      </Box>
      <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
        <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
          {getFormattedDate()}
        </Typography>
        <Typography variant="caption" color="primary" fontWeight="bold">
          System Live
        </Typography>
      </Box>
    </Box>
  )
}
