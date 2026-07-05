import { Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import PageContainer from '@/components/common/layout/PageContainer'

export default function EmployeeDashboard() {
  const { user } = useSelector((state) => state.auth)
  const placeholderModules = ['Work Requests', 'Procurement Tasks', 'Personal Settings']

  return (
    <PageContainer>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Employee Dashboard
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720, mb: 3 }}>
        Welcome to your role-based workspace. This placeholder area is prepared for future employee modules.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6} lg={4}>
          <Card variant="outlined" sx={{ minHeight: 132 }}>
            <CardContent>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                {user?.name || 'Guest'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Role: {user?.role || 'Employee'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        {placeholderModules.map((module) => (
          <Card key={module} variant="outlined" sx={{ flex: 1, minHeight: 160 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
                {module}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Placeholder module for future employee workflows.
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </PageContainer>
  )
}
