import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, useTheme, useMediaQuery } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { getMenuForRole } from '@/app/config/sidebarConfig'
import { toggleSidebar } from '@/app/store/slices/uiSlice'
import { getIcon } from '@/utils/iconMap'
import AppLogo from '@/components/common/AppLogo'

export default function Sidebar({ width, collapsedWidth }) {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { sidebarOpen, sidebarCollapsed } = useSelector((state) => state.ui)

  const activeRole = user?.role || 'Employee'
  const menuItems = getMenuForRole(activeRole)

  const drawerWidth = sidebarCollapsed && !isMobile ? collapsedWidth : width

  const handleItemClick = (route) => {
    if (route) {
      navigate(route)
      if (isMobile) {
        dispatch(toggleSidebar(false))
      }
    }
  }

  const renderContent = () => (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      {/* Brand header */}
      <Box sx={{
        px: 2.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: sidebarCollapsed && !isMobile ? 'center' : 'flex-start',
        borderBottom: '1px dashed',
        borderColor: 'divider',
        minHeight: 64,
        gap: 1.25,
      }}>
        <AppLogo width={32} />
        {(!sidebarCollapsed || isMobile) && (
          <Typography variant="h6" fontWeight={800} color="text.primary" letterSpacing="-0.3px">
            e-GRCP
          </Typography>
        )}
      </Box>

      {/* Menu items */}
      <Box sx={{
        flex: 1,
        overflowY: 'auto',
        py: 1,
        '&::-webkit-scrollbar': { width: 4 },
        '&::-webkit-scrollbar-thumb': { bgcolor: alpha(theme.palette.text.primary, 0.1), borderRadius: 2 },
      }}>
        <List sx={{ px: 1 }} disablePadding>
          {menuItems.map((item) => {
            if (item.type === 'divider') {
              if (sidebarCollapsed && !isMobile) return <Divider key={item.id} sx={{ my: 1 }} />
              return (
                <Box key={item.id} sx={{ px: 1.5, pt: 2, pb: 0.5 }}>
                  <Typography
                    variant="caption"
                    color="text.disabled"
                    sx={{ fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.65rem' }}
                  >
                    {item.title}
                  </Typography>
                </Box>
              )
            }

            const active = location.pathname === item.route
            const icon = getIcon(item.icon, {
              sx: { color: active ? 'primary.main' : 'text.secondary', fontSize: 20 },
            })

            return (
              <ListItem key={item.id} disablePadding sx={{ display: 'block', mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleItemClick(item.route)}
                  selected={active}
                  sx={{
                    minHeight: 44,
                    justifyContent: sidebarCollapsed && !isMobile ? 'center' : 'initial',
                    px: 1.5,
                    py: 0.75,
                    borderRadius: 2,
                    color: active ? 'primary.main' : 'text.primary',
                    bgcolor: active ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                    '&:hover': {
                      bgcolor: active
                        ? alpha(theme.palette.primary.main, 0.12)
                        : alpha(theme.palette.text.primary, 0.04),
                    },
                    '&.Mui-selected': {
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.12) },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: sidebarCollapsed && !isMobile ? 'auto' : 2,
                      justifyContent: 'center',
                      color: active ? 'primary.main' : 'text.secondary',
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  {(!sidebarCollapsed || isMobile) && (
                    <ListItemText
                      primary={item.title}
                      sx={{
                        '& .MuiListItemText-primary': {
                          fontSize: '0.84rem',
                          fontWeight: active ? 600 : 500,
                          color: active ? 'primary.main' : 'text.primary',
                        },
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Box>
    </Box>
  )

  const drawerPaperSx = {
    width: isMobile ? width : drawerWidth,
    boxSizing: 'border-box',
    overflowX: 'hidden',
    borderRadius: 0,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={sidebarOpen}
        onClose={() => dispatch(toggleSidebar())}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': drawerPaperSx }}
      >
        {renderContent()}
      </Drawer>
    )
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        '& .MuiDrawer-paper': drawerPaperSx,
      }}
    >
      {renderContent()}
    </Drawer>
  )
}
