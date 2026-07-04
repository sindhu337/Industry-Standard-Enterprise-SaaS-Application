import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
  useTheme,
  useMediaQuery,
  TextField,
  InputAdornment,
} from '@mui/material'
import {
  Menu as MenuIcon,
  MenuOpen as MenuOpenIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Shield as ShieldIcon,
} from '@mui/icons-material'

import { toggleTheme, toggleSidebar, toggleSidebarCollapse } from '@/app/store/slices/uiSlice'
import { logout } from '@/features/auth/authSlice'
import { fetchNotifications } from '@/features/notifications/notificationSlice'
import NotificationPopover from './NotificationPopover'
import { ROUTES } from '@/constants/routes'
import { APP_CONFIG } from '@/constants/appConfig'

export default function Topbar({ height }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const { themeMode, sidebarCollapsed } = useSelector((state) => state.ui)
  const { items: notifications } = useSelector((state) => state.notifications)

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length

  const [profileAnchorEl, setProfileAnchorEl] = useState(null)
  const [notifAnchorEl, setNotifAnchorEl] = useState(null)

  const isProfileMenuOpen = Boolean(profileAnchorEl)
  const isNotifOpen = Boolean(notifAnchorEl)

  useEffect(() => {
    dispatch(fetchNotifications())
  }, [dispatch])

  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null)
  }

  const handleNotifOpen = (event) => {
    setNotifAnchorEl(event.currentTarget)
  }

  const handleNotifClose = () => {
    setNotifAnchorEl(null)
  }

  const handleLogout = () => {
    handleProfileMenuClose()
    dispatch(logout())
    navigate(ROUTES.LOGIN)
  }

  const handleSettingsClick = () => {
    handleProfileMenuClose()
    navigate(ROUTES.ROUTES || ROUTES.SETTINGS)
  }

  const handleToggleSidebar = () => {
    if (isMobile) {
      dispatch(toggleSidebar())
    } else {
      dispatch(toggleSidebarCollapse())
    }
  }

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        height,
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ minHeight: height, px: { xs: 2, sm: 3 } }}>
        <IconButton
          color="inherit"
          aria-label="toggle sidebar"
          edge="start"
          onClick={handleToggleSidebar}
          sx={{ mr: 2 }}
        >
          {isMobile ? <MenuIcon /> : sidebarCollapsed ? <MenuIcon /> : <MenuOpenIcon />}
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 3 }}>
          <ShieldIcon color="primary" sx={{ fontSize: 28 }} />
          {!isMobile && (
            <Typography variant="h6" fontWeight="bold" noWrap>
              {APP_CONFIG.APP_NAME}
            </Typography>
          )}
        </Box>

        <Box sx={{ flexGrow: 1, maxWidth: 400, mx: 2, display: { xs: 'none', sm: 'block' } }}>
          <TextField
            size="small"
            fullWidth
            placeholder="Global search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: 'action.hover',
                '& fieldset': { border: 'none' },
              },
            }}
          />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit" onClick={() => dispatch(toggleTheme())}>
            {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          <IconButton color="inherit" onClick={handleNotifOpen}>
            <Badge badgeContent={unreadNotificationsCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
            <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0 }}>
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  width: 36,
                  height: 36,
                  fontSize: '0.95rem',
                  fontWeight: 'bold',
                }}
              >
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </Avatar>
            </IconButton>
          </Box>
        </Box>

        <NotificationPopover
          anchorEl={notifAnchorEl}
          open={isNotifOpen}
          onClose={handleNotifClose}
        />

        <Menu
          anchorEl={profileAnchorEl}
          id="primary-search-account-menu"
          keepMounted
          open={isProfileMenuOpen}
          onClose={handleProfileMenuClose}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1.5,
              minWidth: 200,
              borderRadius: 2,
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle2" fontWeight="bold">
              {user?.name || 'User Account'}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              {user?.email || ''}
            </Typography>
            <Typography
              variant="caption"
              color="primary"
              fontWeight="bold"
              sx={{
                display: 'inline-block',
                bgcolor: 'action.selected',
                px: 1,
                py: 0.2,
                borderRadius: 1,
                mt: 0.5,
              }}
            >
              {user?.role || 'Employee'}
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={handleSettingsClick}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            Profile Settings
          </MenuItem>
          <MenuItem onClick={handleSettingsClick}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            Preferences
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" color="error" />
            </ListItemIcon>
            <Typography color="error">Sign Out</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
