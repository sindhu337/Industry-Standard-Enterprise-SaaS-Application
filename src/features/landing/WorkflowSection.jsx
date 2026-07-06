import { Box, Card, CardContent, Container, Grid, Stack, Typography, useMediaQuery, useTheme, alpha } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import { motion } from 'framer-motion'

const steps = [
  {
    title: 'Employee',
    description: 'Initiate procurement requests and maintain process visibility.',
    icon: PersonOutlineOutlinedIcon,
  },
  {
    title: 'Procurement Manager',
    description: 'Review requests, assign vendors, and approve budgets efficiently.',
    icon: LocalShippingOutlinedIcon,
  },
  {
    title: 'Compliance Officer',
    description: 'Validate regulatory alignment and maintain policy consistency.',
    icon: VerifiedUserOutlinedIcon,
  },
  {
    title: 'Auditor',
    description: 'Inspect workflows, verify controls, and validate outcomes.',
    icon: BalanceOutlinedIcon,
  },
  {
    title: 'Administrator',
    description: 'Manage roles, governance settings, and platform oversight.',
    icon: AdminPanelSettingsOutlinedIcon,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

export default function WorkflowSection() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box component="section" id="workflow" sx={{ py: { xs: 12, md: 16 }, mx: 'auto', bgcolor: 'background.default', scrollMarginTop: { xs: 88, md: 96 } }}>
      <Container maxWidth="xl">
        <Stack alignItems="center" spacing={2} sx={{ mb: 8, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Typography variant="overline" sx={{ letterSpacing: 3, color: 'primary.main', fontWeight: 700 }}>
              End-to-End Workflow
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, mt: 1, mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}>
              Clear handoffs across every <br />role in the enterprise cycle.
            </Typography>
          </motion.div>
        </Stack>

        <Box sx={{ position: 'relative' }}>
          {}
          {!isMobile && (
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 48, 
                left: '10%', 
                right: '10%', 
                height: 2, 
                bgcolor: 'divider',
                zIndex: 0 
              }} 
            />
          )}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <Grid container spacing={4} justifyContent="center" columns={{ xs: 12, sm: 12, md: 10 }} sx={{ position: 'relative', zIndex: 1 }}>
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <Grid size={{ xs: 12, sm: 6, md: 2 }} key={step.title} component={motion.div} variants={itemVariants}>
                    <Stack alignItems="center" spacing={3} sx={{ textAlign: 'center' }}>
                      
                      <Box 
                        sx={{ 
                          width: 80, 
                          height: 80, 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          bgcolor: 'background.paper', 
                          color: 'primary.main', 
                          borderRadius: '50%',
                          border: '2px solid',
                          borderColor: 'primary.main',
                          boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
                          position: 'relative'
                        }}
                      >
                        <Icon fontSize="large" />
                        <Box 
                          sx={{ 
                            position: 'absolute', 
                            top: -10, 
                            right: -10, 
                            width: 28, 
                            height: 28, 
                            borderRadius: '50%', 
                            bgcolor: 'primary.main', 
                            color: 'primary.contrastText',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '0.875rem'
                          }}
                        >
                          {index + 1}
                        </Box>
                      </Box>
                      
                      <Box>
                        <Typography variant="h6" fontWeight={800} gutterBottom>
                          {step.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, maxWidth: 220, mx: 'auto' }}>
                          {step.description}
                        </Typography>
                      </Box>

                      {isMobile && index < steps.length - 1 && (
                        <ArrowDownwardIcon color="primary" sx={{ opacity: 0.5 }} />
                      )}
                    </Stack>
                  </Grid>
                )
              })}
            </Grid>
          </motion.div>
        </Box>
      </Container>
    </Box>
  )
}
