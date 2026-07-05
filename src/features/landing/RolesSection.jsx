import { Box, Card, CardContent, Container, Grid, Stack, Typography, Avatar } from '@mui/material'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'

const roles = [
  {
    title: 'Employee',
    responsibilities: 'Submit procurement requests, track status, and collaborate securely.',
    icon: <PersonOutlineOutlinedIcon fontSize="medium" />,
  },
  {
    title: 'Procurement Manager',
    responsibilities: 'Review requests, approve budgets, and oversee vendor relationships.',
    icon: <LocalShippingOutlinedIcon fontSize="medium" />,
  },
  {
    title: 'Compliance Officer',
    responsibilities: 'Assess regulations, review controls, and maintain audit readiness.',
    icon: <VerifiedUserOutlinedIcon fontSize="medium" />,
  },
  {
    title: 'Auditor',
    responsibilities: 'Validate processes, identify exceptions, and ensure continuous improvement.',
    icon: <BalanceOutlinedIcon fontSize="medium" />,
  },
  {
    title: 'Administrator',
    responsibilities: 'Manage roles, configure policies, and secure the enterprise environment.',
    icon: <AdminPanelSettingsOutlinedIcon fontSize="medium" />,
  },
]

export default function RolesSection() {
  return (
    <Box component="section" id="roles" sx={{ py: { xs: 10, md: 14 }, bgcolor: 'background.paper', scrollMarginTop: { xs: 88, md: 96 } }}>
      <Container maxWidth="xl">
        <Stack spacing={2} sx={{ maxWidth: 640, mb: 6 }}>
          <Typography variant="overline" sx={{ letterSpacing: 2, color: 'primary.main', fontWeight: 700 }}>
            Designed for Every Enterprise Role
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Real role definitions for modern governance teams.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {roles.map((role) => (
            <Grid item xs={12} md={6} lg={4} key={role.title}>
              <Card sx={{ minHeight: 210, borderRadius: 3, transition: 'transform 0.25s ease', '&:hover': { transform: 'translateY(-6px)' } }}>
                <CardContent>
                  <Stack spacing={2}>
                    <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', width: 52, height: 52 }}>
                      {role.icon}
                    </Avatar>
                    <Typography variant="h6" fontWeight={700}>
                      {role.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {role.responsibilities}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
