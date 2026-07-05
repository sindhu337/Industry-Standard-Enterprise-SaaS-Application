import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined'

const features = [
  {
    title: 'Procurement Management',
    description: 'Automate purchase requests, approvals, and vendor partnerships across teams.',
    icon: <ShoppingCartOutlinedIcon fontSize="large" />,
  },
  {
    title: 'Compliance Monitoring',
    description: 'Maintain policy oversight and regulatory controls with real-time visibility.',
    icon: <VerifiedUserOutlinedIcon fontSize="large" />,
  },
  {
    title: 'Audit Management',
    description: 'Track findings, verify controls, and close audit activities effortlessly.',
    icon: <FactCheckOutlinedIcon fontSize="large" />,
  },
  {
    title: 'Risk Management',
    description: 'Identify, assess, and mitigate enterprise risks in one centralized platform.',
    icon: <ShieldOutlinedIcon fontSize="large" />,
  },
  {
    title: 'Role-Based Access',
    description: 'Secure access controls tailored to every user and operational role.',
    icon: <LockOutlinedIcon fontSize="large" />,
  },
  {
    title: 'Reports & Analytics',
    description: 'Powerful dashboards and insights that support fast executive decisions.',
    icon: <AssessmentOutlinedIcon fontSize="large" />,
  },
]

export default function FeaturesSection() {
  return (
    <Box component="section" id="features" sx={{ py: { xs: 10, md: 14 }, bgcolor: 'background.default', scrollMarginTop: { xs: 88, md: 96 } }}>
      <Container maxWidth="xl">
        <Stack spacing={2} sx={{ maxWidth: 640, mb: 6 }}>
          <Typography variant="overline" sx={{ letterSpacing: 2, color: 'primary.main', fontWeight: 700 }}>
            Powerful Features for Modern Enterprises
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Deliver capability across procurement, compliance, audit, risk, and access management.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {features.map((feature) => (
            <Grid item xs={12} sm={6} md={4} key={feature.title}>
              <Card
                sx={{
                  minHeight: 200,
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 24px 48px rgba(15, 23, 42, 0.12)',
                  },
                }}
              >
                <CardContent>
                  <Stack spacing={2}>
                    <Box sx={{ width: 54, height: 54, display: 'grid', placeItems: 'center', bgcolor: 'primary.light', color: 'primary.main', borderRadius: 3 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" fontWeight={700}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {feature.description}
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
