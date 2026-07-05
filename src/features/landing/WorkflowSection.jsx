import { Box, Card, CardContent, Container, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'

const steps = [
  {
    title: 'Employee',
    description: 'Initiate procurement requests and maintain process visibility.',
    icon: <PersonOutlineOutlinedIcon fontSize="large" />,
  },
  {
    title: 'Procurement Manager',
    description: 'Review requests, assign vendors, and approve budgets efficiently.',
    icon: <LocalShippingOutlinedIcon fontSize="large" />,
  },
  {
    title: 'Compliance Officer',
    description: 'Validate regulatory alignment and maintain policy consistency.',
    icon: <VerifiedUserOutlinedIcon fontSize="large" />,
  },
  {
    title: 'Auditor',
    description: 'Inspect workflows, verify controls, and validate outcomes.',
    icon: <BalanceOutlinedIcon fontSize="large" />,
  },
  {
    title: 'Administrator',
    description: 'Manage roles, governance settings, and platform oversight.',
    icon: <AdminPanelSettingsOutlinedIcon fontSize="large" />,
  },
]

export default function WorkflowSection() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box component="section" id="workflow" sx={{ py: { xs: 10, md: 14 }, bgcolor: 'background.paper', scrollMarginTop: { xs: 88, md: 96 } }}>
      <Container maxWidth="xl">
        <Stack spacing={2} sx={{ maxWidth: 680, mb: 6 }}>
          <Typography variant="overline" sx={{ letterSpacing: 2, color: 'primary.main', fontWeight: 700 }}>
            End-to-End Enterprise Workflow
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Clear handoffs across every role in the enterprise cycle.
          </Typography>
        </Stack>

        <Grid container spacing={3} justifyContent="center">
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={2.4} key={step.title}>
              <Card sx={{ minHeight: 220, p: 2.5, borderRadius: 4, transition: 'transform 0.25s ease', '&:hover': { transform: 'translateY(-4px)' } }}>
                <CardContent>
                  <Stack spacing={2} alignItems="center" sx={{ textAlign: 'center' }}>
                    <Box sx={{ width: 58, height: 58, display: 'grid', placeItems: 'center', bgcolor: 'primary.light', color: 'primary.main', borderRadius: 3 }}>
                      {step.icon}
                    </Box>
                    <Typography variant="h6" fontWeight={700}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                      {step.description}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          {isMobile ? <ArrowDownwardIcon color="primary" sx={{ fontSize: 36 }} /> : <ArrowForwardIosIcon color="primary" sx={{ fontSize: 36 }} />}
        </Box>
      </Container>
    </Box>
  )
}
