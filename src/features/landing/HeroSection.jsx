import { Box, Button, Avatar, Chip, Container, Grid, Stack, Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined'
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

const featureCards = [
  { label: 'Procurement', icon: <LocalShippingOutlinedIcon fontSize="small" /> },
  { label: 'Compliance', icon: <VerifiedUserOutlinedIcon fontSize="small" /> },
  { label: 'Audit', icon: <FactCheckOutlinedIcon fontSize="small" /> },
  { label: 'Risk', icon: <ShieldOutlinedIcon fontSize="small" /> },
  { label: 'Reports', icon: <AssessmentOutlinedIcon fontSize="small" /> },
  { label: 'Role-Based Access', icon: <LockOutlinedIcon fontSize="small" /> },
]

export default function HeroSection() {
  const theme = useTheme()
  const navigate = useNavigate()

  return (
    <Box
      component="section"
      id="hero"
      sx={{
        pt: { xs: 14, md: 18 },
        pb: { xs: 8, md: 12 },
        bgcolor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
        scrollMarginTop: { xs: 88, md: 96 },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at top left, rgba(79, 70, 229, 0.12), transparent 28%), radial-gradient(circle at bottom right, rgba(16, 185, 129, 0.12), transparent 22%)',
          pointerEvents: 'none',
        }}
      />
      <Container maxWidth="xl">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Stack spacing={4} sx={{ maxWidth: 620 }}>
              <Box>
                <Typography variant="overline" sx={{ letterSpacing: 2, fontWeight: 700, color: 'primary.main' }}>
                  Welcome to
                </Typography>
                <Typography variant="h2" component="h1" sx={{ fontWeight: 800, lineHeight: 1.05, mt: 1 }}>
                  Enterprise Governance, Risk, Compliance & Procurement Platform
                </Typography>
              </Box>

              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 560, lineHeight: 1.75 }}>
                A unified enterprise platform designed to streamline procurement workflows, ensure compliance, manage organizational risks, perform audits, and provide secure role-based access for modern organizations.
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button variant="contained" size="large" onClick={() => navigate(ROUTES.LOGIN)} sx={{ minWidth: 170 }}>
                  Get Started
                </Button>
                <Button variant="outlined" size="large" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} sx={{ minWidth: 170 }}>
                  Learn More
                </Button>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                {featureCards.slice(0, 3).map((feature) => (
                  <Chip key={feature.label} label={feature.label} icon={feature.icon} color="primary" variant="outlined" />
                ))}
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative', width: '100%', minHeight: 440, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ position: 'absolute', inset: 0, borderRadius: '50%', bgcolor: 'primary.light', opacity: 0.15, filter: 'blur(30px)' }} />
              <Box
                sx={{
                  position: 'relative',
                  width: { xs: '100%', sm: 380 },
                  maxWidth: 420,
                  height: { xs: 360, sm: 420 },
                  borderRadius: '38% 62% 56% 44% / 45% 42% 58% 55%',
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  boxShadow: '0 32px 80px rgba(15, 23, 42, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  px: 4,
                  py: 5,
                }}
              >
                <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', color: '#fff', mb: 2 }}>
                  <ShieldOutlinedIcon fontSize="large" />
                </Avatar>
                <Typography variant="h6" fontWeight={800} sx={{ color: 'primary.main', mb: 1 }}>
                  e-GRCP Shield
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', maxWidth: 180 }}>
                  Secure enterprise governance, risk, compliance, and procurement.
                </Typography>
              </Box>

            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
