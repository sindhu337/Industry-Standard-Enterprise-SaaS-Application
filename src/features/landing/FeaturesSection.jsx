import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
  alpha
} from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined'
import { motion } from 'framer-motion'

const features = [
  {
    title: 'Procurement Management',
    description: 'Automate purchase requests, approvals, and vendor partnerships across teams.',
    icon: ShoppingCartOutlinedIcon,
    color: '#0288d1'
  },
  {
    title: 'Compliance Monitoring',
    description: 'Maintain policy oversight and regulatory controls with real-time visibility.',
    icon: VerifiedUserOutlinedIcon,
    color: '#388e3c'
  },
  {
    title: 'Audit Management',
    description: 'Track findings, verify controls, and close audit activities effortlessly.',
    icon: FactCheckOutlinedIcon,
    color: '#d32f2f'
  },
  {
    title: 'Risk Management',
    description: 'Identify, assess, and mitigate enterprise risks in one centralized platform.',
    icon: ShieldOutlinedIcon,
    color: '#ed6c02'
  },
  {
    title: 'Role-Based Access',
    description: 'Secure access controls tailored to every user and operational role.',
    icon: LockOutlinedIcon,
    color: '#7b1fa2'
  },
  {
    title: 'Reports & Analytics',
    description: 'Powerful dashboards and insights that support fast executive decisions.',
    icon: AssessmentOutlinedIcon,
    color: '#1976d2'
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

export default function FeaturesSection() {
  const theme = useTheme()

  return (
    <Box component="section" id="features" sx={{ py: { xs: 12, md: 16 }, bgcolor: 'background.paper', scrollMarginTop: { xs: 88, md: 96 } }}>
      <Container maxWidth="lg">
        <Stack alignItems="center" spacing={2} sx={{ mb: 8, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Typography variant="overline" sx={{ letterSpacing: 3, color: 'primary.main', fontWeight: 700 }}>
              Powerful Features
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, mt: 1, mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}>
              Everything you need to <br />manage your enterprise.
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', fontWeight: 400 }}>
              Deliver capability across procurement, compliance, audit, risk, and access management in a single, unified interface.
            </Typography>
          </motion.div>
        </Stack>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <Grid container spacing={3} justifyContent="center">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={feature.title} component={motion.div} variants={itemVariants}>
                  <Card
                    elevation={0}
                    sx={{
                      minHeight: 240,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: feature.color,
                        boxShadow: `0 12px 32px ${alpha(feature.color, 0.15)}`,
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4, height: '100%' }}>
                      <Stack spacing={3}>
                        <Box
                          sx={{
                            width: 56,
                            height: 56,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: alpha(feature.color, 0.1),
                            color: feature.color,
                            borderRadius: 2
                          }}
                        >
                          <Icon fontSize="medium" />
                        </Box>
                        <Box>
                          <Typography variant="h6" fontWeight={800} gutterBottom>
                            {feature.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                            {feature.description}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  )
}
