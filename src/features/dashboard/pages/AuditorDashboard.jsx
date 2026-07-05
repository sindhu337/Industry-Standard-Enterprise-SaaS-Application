import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

export default function AuditorDashboard() {
  const { user } = useSelector((state) => state.auth)

  const placeholderModules = ['Audit Plans', 'Evidence Review', 'Findings Tracker']

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Auditor Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Welcome to your role-based workspace. This placeholder area is prepared for future auditor modules.
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        Logged-in user name: <strong>{user?.name || 'Guest'}</strong>
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        User role: <strong>{user?.role || 'Auditor'}</strong>
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        {placeholderModules.map((module) => (
          <Card key={module} variant="outlined" sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600}>
                {module}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Placeholder module for future audit workflows.
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  )
}
