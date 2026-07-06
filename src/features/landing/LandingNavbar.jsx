import { useMemo } from 'react'
import { AppBar, Toolbar, Box, Button, IconButton, Stack, Typography, Container, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '@/app/store/slices/uiSlice'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { ROUTES } from '@/constants/routes'
import { motion, useScroll, useTransform } from 'framer-motion'
import AppLogo from '@/components/common/AppLogo'

const navItems = [
  { label: 'Home', id: 'hero' },
  { label: 'Features', id: 'features' },
  { label: 'Workflow', id: 'workflow' },
  { label: 'Roles', id: 'roles' },
  { label: 'About', id: 'about' },
]

export default function LandingNavbar() {
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const themeMode = useSelector((state) => state.ui.themeMode)
  const { scrollY } = useScroll()
  
  
  const navBg = useTransform(
    scrollY,
    [0, 50],
    ['transparent', theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.85)']
  )
  const navBorder = useTransform(
    scrollY,
    [0, 50],
    ['1px solid transparent', '1px solid rgba(15, 23, 42, 0.08)']
  )

  const scrollToSection = (id) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <AppBar
      component={motion.div}
      style={{ backgroundColor: navBg, borderBottom: navBorder }}
      position="fixed"
      elevation={0}
      sx={{
        backdropFilter: 'blur(16px)',
        color: 'text.primary',
        transition: 'none', 
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', minHeight: 80 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }} onClick={() => scrollToSection('hero')}>
            <AppLogo width={40} height={40} />
            <Box sx={{ minWidth: 0, display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="h6" fontWeight={800} noWrap sx={{ letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                e-GRCP
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap sx={{ fontWeight: 600 }}>
                Enterprise Platform
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <Stack direction="row" spacing={1}>
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  sx={{ 
                    textTransform: 'none', 
                    color: 'text.secondary', 
                    fontWeight: 600,
                    px: 2,
                    borderRadius: 2,
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: 'action.hover'
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          </Box>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <IconButton size="small" onClick={() => dispatch(toggleTheme())} sx={{ border: '1px solid', borderColor: 'divider' }}>
              {themeMode === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
            </IconButton>
            <Button 
              variant="contained" 
              size="medium" 
              onClick={() => navigate(ROUTES.LOGIN)} 
              sx={{ 
                borderRadius: 1.5, 
                textTransform: 'none', 
                fontWeight: 700,
                px: 3,
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: `0 4px 12px ${theme.palette.primary.main}40`
                }
              }}
            >
              Sign In
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
