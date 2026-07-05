import { Card, CardContent, Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import PageContainer from '@/components/common/layout/PageContainer'

export default function AdministratorDashboard() {
  const { user } = useSelector((state) => state.auth)
  const placeholderModules = ['Platform Administration', 'Role Management', 'System Health']

  return (
    <PageContainer>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Administrator Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mb: 3 }}>
        Welcome to your role-based workspace. This placeholder area is prepared for future administrator modules.
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ minHeight: 132 }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                User
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                {user?.name || 'Guest'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ minHeight: 132 }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Role
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                {user?.role || 'Administrator'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {placeholderModules.map((module) => (
          <Grid item xs={12} md={4} key={module}>
            <Card variant="outlined" sx={{ minHeight: 160 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
                  {module}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Placeholder module for future administrator workflows.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  )
}
