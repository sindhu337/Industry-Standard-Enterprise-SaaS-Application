import { Box, Card, CardContent, Container, Grid, Stack, Typography, Avatar, useTheme, alpha } from '@mui/material'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import { motion } from 'framer-motion'

const roles = [
  {
    title: 'Employee',
    responsibilities: 'Submit procurement requests, track status, and collaborate securely.',
    icon: PersonOutlineOutlinedIcon,
  },
  {
    title: 'Procurement Manager',
    responsibilities: 'Review requests, approve budgets, and oversee vendor relationships.',
    icon: LocalShippingOutlinedIcon,
  },
  {
    title: 'Compliance Officer',
    responsibilities: 'Assess regulations, review controls, and maintain audit readiness.',
    icon: VerifiedUserOutlinedIcon,
  },
  {
    title: 'Auditor',
    responsibilities: 'Validate processes, identify exceptions, and ensure continuous improvement.',
    icon: BalanceOutlinedIcon,
  },
  {
    title: 'Administrator',
    responsibilities: 'Manage roles, configure policies, and secure the enterprise environment.',
    icon: AdminPanelSettingsOutlinedIcon,
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

export default function RolesSection() {
  const theme = useTheme()

  return (
    <Box component="section" id="roles" sx={{ py: { xs: 12, md: 16 }, bgcolor: 'background.default', scrollMarginTop: { xs: 88, md: 96 } }}>
      <Container maxWidth="lg">
        <Stack alignItems="center" spacing={2} sx={{ mb: 8, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Typography variant="overline" sx={{ letterSpacing: 3, color: 'primary.main', fontWeight: 700 }}>
              Access Control
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, mt: 1, mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}>
              Designed for every <br />enterprise role.
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', fontWeight: 400 }}>
              Real role definitions with scoped visibility and permissions to match modern governance teams.
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
            {roles.map((role) => {
              const Icon = role.icon
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={role.title} component={motion.div} variants={itemVariants}>
                  <Card
                    elevation={0}
                    sx={{
                      minHeight: 220,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        borderColor: 'primary.main',
                        boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.15)}`,
                      }
                    }}
                  >
                    <CardContent sx={{ p: 4, height: '100%' }}>
                      <Stack spacing={3}>
                        <Avatar
                          sx={{
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: 'primary.main',
                            width: 56,
                            height: 56,
                            borderRadius: 2
                          }}
                        >
                          <Icon fontSize="medium" />
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight={800} gutterBottom>
                            {role.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                            {role.responsibilities}
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
