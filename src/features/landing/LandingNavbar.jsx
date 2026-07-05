import { useMemo } from 'react'
import { AppBar, Toolbar, Box, Button, IconButton, Stack, Typography, Container, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '@/app/store/slices/uiSlice'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { ROUTES } from '@/constants/routes'

const navItems = [
  { label: 'Home', id: 'hero' },
  { label: 'Features', id: 'features' },
  { label: 'Workflow', id: 'workflow' },
  { label: 'Roles', id: 'roles' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
]

export default function LandingNavbar() {
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const themeMode = useSelector((state) => state.ui.themeMode)

  const appBarStyles = useMemo(
    () => ({
      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      color: theme.palette.text.primary,
    }),
    [theme.palette.mode, theme.palette.text.primary],
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
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: appBarStyles.backgroundColor,
        color: appBarStyles.color,
        borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
        backdropFilter: 'blur(14px)',
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 3 } }}>
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', minHeight: 76 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: 2,
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1rem',
              }}
            >
              G
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="h6" fontWeight={700} noWrap>
                e-GRCP
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                Enterprise Governance, Risk, Compliance & Procurement
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <Stack direction="row" spacing={1.5}>
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  color="inherit"
                  onClick={() => scrollToSection(item.id)}
                  sx={{ textTransform: 'none', color: 'text.primary', fontWeight: 600 }}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          </Box>

          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton size="small" color="inherit" onClick={() => dispatch(toggleTheme())}>
              {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <Button variant="contained" size="medium" onClick={() => navigate(ROUTES.LOGIN)} sx={{ borderRadius: 8, textTransform: 'none' }}>
              Sign In
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
