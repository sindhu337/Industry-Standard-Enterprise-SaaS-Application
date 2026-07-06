import { Box, Button, Container, Typography, Stack, useTheme, Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { motion } from 'framer-motion'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SecurityIcon from '@mui/icons-material/Security'

export default function HeroSection() {
  const theme = useTheme()
  const navigate = useNavigate()

  return (
    <Box
      component="section"
      id="hero"
      sx={{
        pt: { xs: 16, md: 24 },
        pb: { xs: 12, md: 16 },
        position: 'relative',
        bgcolor: 'background.default',
        overflow: 'hidden',
      }}
    >
      {/* Dynamic Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: theme.palette.mode === 'dark' ? 0.05 : 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          pointerEvents: 'none',
        }}
      />
      
      {/* Gradient Glow */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        sx={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: { xs: '100%', md: '80%' },
          height: '60%',
          background: `radial-gradient(ellipse at top, ${theme.palette.primary.main}40, transparent 70%)`,
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <Stack alignItems="center" spacing={4}>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 1, borderRadius: 8, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', mb: 2 }}>
              <SecurityIcon color="primary" fontSize="small" />
              <Typography variant="caption" fontWeight={700} color="text.primary">
                Next-Gen Enterprise Governance Platform
              </Typography>
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          >
            <Typography 
              variant="h1" 
              sx={{ 
                fontWeight: 900, 
                lineHeight: 1.1, 
                fontSize: { xs: '3rem', md: '5rem' },
                letterSpacing: '-0.02em',
              }}
            >
              Govern, Manage, &<br />
              <Box component="span" sx={{ color: 'primary.main' }}>
                Secure Everything.
              </Box>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', fontWeight: 400, lineHeight: 1.6 }}>
              A unified enterprise platform designed to streamline procurement workflows, ensure compliance, manage organizational risks, and provide secure role-based access.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mt: 2 }}>
              <Button 
                variant="contained" 
                size="large" 
                onClick={() => navigate(ROUTES.LOGIN)} 
                endIcon={<ArrowForwardIcon />}
                sx={{ 
                  py: 1.5, 
                  px: 4, 
                  borderRadius: 1.5, 
                  fontWeight: 700, 
                  fontSize: '1rem',
                  boxShadow: `0 8px 24px ${theme.palette.primary.main}40`,
                }}
              >
                Access Platform
              </Button>
              <Button 
                variant="outlined" 
                size="large" 
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} 
                sx={{ 
                  py: 1.5, 
                  px: 4, 
                  borderRadius: 1.5, 
                  fontWeight: 700, 
                  fontSize: '1rem' 
                }}
              >
                Explore Features
              </Button>
            </Stack>
          </motion.div>

          {/* Interactive Mockup Preview */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            style={{ width: '100%', marginTop: '64px' }}
          >
            <Box 
              sx={{ 
                width: '100%', 
                height: { xs: 300, md: 500 },
                borderRadius: 3, 
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: theme.palette.mode === 'dark' ? '0 32px 100px rgba(0,0,0,0.5)' : '0 32px 100px rgba(15, 23, 42, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              {/* Mock Dashboard Wireframe */}
              <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 60, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', px: 3, gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'error.main' }} />
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'warning.main' }} />
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'success.main' }} />
                </Box>
                <Box sx={{ flexGrow: 1, height: 28, borderRadius: 1, bgcolor: 'action.hover', maxWidth: 400, mx: 'auto' }} />
              </Box>
              <Typography variant="h5" color="text.disabled" fontWeight={700}>
                Dashboard Interface Preview
              </Typography>
            </Box>
          </motion.div>

        </Stack>
      </Container>
    </Box>
  )
}
