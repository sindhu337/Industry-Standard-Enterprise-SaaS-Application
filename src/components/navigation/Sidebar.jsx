import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, useTheme, useMediaQuery } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { getMenuForRole } from '@/app/config/sidebarConfig'
import { toggleSidebar, toggleSidebarCollapse } from '@/app/store/slices/uiSlice'
import { getIcon } from '@/utils/iconMap'

export default function Sidebar({ width, collapsedWidth }) {
  const theme = useTheme()
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
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'background.paper' }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: sidebarCollapsed && !isMobile ? 'center' : 'space-between', borderBottom: '1px solid', borderColor: 'divider' }}>
        {(!sidebarCollapsed || isMobile) ? (
          <Typography variant="h6" fontWeight="bold" color="primary">
            e-GRCP
          </Typography>
        ) : (
          <Typography variant="h6" fontWeight="bold" color="primary">
            G
          </Typography>
        )}
      </Box>
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <List sx={{ px: 1 }}>
          {menuItems.map((item) => {
            if (item.type === 'divider') {
              if (sidebarCollapsed && !isMobile) return <Divider key={item.id} sx={{ my: 1 }} />
              return (
                <Box key={item.id} sx={{ px: 2, py: 1.5 }}>
                  <Typography variant="caption" color="text.secondary" fontWeight="600">
                    {item.title}
                  </Typography>
                </Box>
              )
            }

            const active = location.pathname === item.route
            const icon = getIcon(item.icon, { color: active ? 'primary' : 'inherit' })

            return (
              <ListItem key={item.id} disablePadding sx={{ display: 'block', mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleItemClick(item.route)}
                  selected={active}
                  sx={{
                    minHeight: 48,
                    justifyContent: sidebarCollapsed && !isMobile ? 'center' : 'initial',
                    px: 2.5,
                    borderRadius: 2,
                    '&.Mui-selected': {
                      bgcolor: 'primary.light',
                      color: 'primary.contrastText',
                      '& .MuiListItemIcon-root': {
                        color: 'primary.contrastText',
                      },
                      '&:hover': {
                        bgcolor: 'primary.main',
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: sidebarCollapsed && !isMobile ? 'auto' : 3,
                      justifyContent: 'center',
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  {(!sidebarCollapsed || isMobile) && (
                    <ListItemText primary={item.title} sx={{ '& .MuiListItemText-primary': { fontSize: '0.875rem', fontWeight: active ? 600 : 500 } }} />
                  )}
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Box>
    </Box>
  )

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={sidebarOpen}
        onClose={() => dispatch(toggleSidebar())}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': { width, boxSizing: 'border-box' },
        }}
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
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      {renderContent()}
    </Drawer>
  )
}
