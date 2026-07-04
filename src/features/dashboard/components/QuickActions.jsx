import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, Typography, Box, Grid, ButtonBase, Paper } from '@mui/material'
import { getIcon } from '@/utils/iconMap'
import { dashboardMockData } from '../data/dashboardMockData'

export default function QuickActions() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const activeRole = user?.role || 'Employee'
  
  const allowedActions = dashboardMockData.quickActions.filter((action) =>
    action.roles.includes(activeRole)
  )

  if (allowedActions.length === 0) return null

  return (
    <Card sx={{ borderRadius: 2.5, boxShadow: 1, border: '1px solid', borderColor: 'divider', height: '100%' }}>
      <CardContent sx={{ p: 2.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
          Quick Access Workbench
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3 }}>
          Fast-track operational workflows matching your administrative role
        </Typography>
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          {allowedActions.map((action) => {
            const icon = getIcon(action.icon, { sx: { fontSize: 24, color: 'primary.main' } })
            return (
              <Grid item xs={12} sm={6} key={action.id}>
                <Paper
                  component={ButtonBase}
                  onClick={() => navigate(action.route)}
                  elevation={0}
                  sx={{
                    width: '100%',
                    height: '100%',
                    p: 2,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    gap: 1.5,
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'action.hover',
                      boxShadow: 2,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 1,
                      borderRadius: 1.5,
                      bgcolor: 'primary.light',
                      color: 'primary.main',
                    }}
                  >
                    {icon}
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold" color="text.primary">
                      {action.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block', fontWeight: 500 }}>
                      {action.description}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </CardContent>
    </Card>
  )
}
