import { useState, useEffect, useMemo, useCallback } from 'react'
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
  Tooltip,
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
import AppLogo from '@/components/common/AppLogo'
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

  const unreadNotificationsCount = useMemo(() => notifications.filter((n) => !n.isRead).length, [notifications])

  const [profileAnchorEl, setProfileAnchorEl] = useState(null)
  const [notifAnchorEl, setNotifAnchorEl] = useState(null)

  const isProfileMenuOpen = Boolean(profileAnchorEl)
  const isNotifOpen = Boolean(notifAnchorEl)

  useEffect(() => {
    dispatch(fetchNotifications())
  }, [dispatch])

  const handleProfileMenuOpen = useCallback((event) => {
    setProfileAnchorEl(event.currentTarget)
  }, [])

  const handleProfileMenuClose = useCallback(() => {
    setProfileAnchorEl(null)
  }, [])

  const handleNotifOpen = useCallback((event) => {
    setNotifAnchorEl(event.currentTarget)
  }, [])

  const handleNotifClose = useCallback(() => {
    setNotifAnchorEl(null)
  }, [])

  const handleLogout = useCallback(() => {
    setProfileAnchorEl(null)
    dispatch(logout())
    navigate(ROUTES.LOGIN)
  }, [dispatch, navigate])

  const handleSettingsClick = useCallback(() => {
    setProfileAnchorEl(null)
    navigate(ROUTES.SETTINGS)
  }, [navigate])

  const handleToggleSidebar = useCallback(() => {
    if (isMobile) {
      dispatch(toggleSidebar())
    } else {
      dispatch(toggleSidebarCollapse())
    }
  }, [isMobile, dispatch])

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
        <Tooltip title="Toggle sidebar">
          <IconButton
            color="inherit"
            aria-label="toggle sidebar"
            edge="start"
            onClick={handleToggleSidebar}
            sx={{ mr: 2 }}
          >
            {isMobile ? <MenuIcon /> : sidebarCollapsed ? <MenuIcon /> : <MenuOpenIcon />}
          </IconButton>
        </Tooltip>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 3 }}>
          <AppLogo width={64} height={64} />
        </Box>

        <Box sx={{ flexGrow: 1, maxWidth: 420, mx: 2, display: { xs: 'none', sm: 'block' } }}>
          <TextField
            size="small"
            fullWidth
            placeholder="Search workspace..."
            aria-label="Search workspace"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" sx={{ mr: -1.5 }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
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
          slotProps={{
            paper: {
              elevation: 3,
              sx: {
                mt: 1.5,
                minWidth: 250,
                borderRadius: 1.5,
              },
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
                ml: 1 ,
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
