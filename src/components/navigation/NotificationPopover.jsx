import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Popover,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material'
import {
  Warning as WarningIcon,
  Info as InfoIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  FiberManualRecord as DotIcon,
} from '@mui/icons-material'

import { markAsRead, markAllAsRead } from '@/features/notifications/notificationSlice'
import { ROUTES } from '@/constants/routes'

export default function NotificationPopover({ anchorEl, open, onClose }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items } = useSelector((state) => state.notifications)

  const unreadCount = items.filter((n) => !n.isRead).length

  const handleMarkAllRead = () => {
    dispatch(markAllAsRead())
  }

  const handleNotificationClick = (item) => {
    if (!item.isRead) {
      dispatch(markAsRead(item.id))
    }
    onClose()
  }

  const handleViewAll = () => {
    onClose()
    navigate(ROUTES.NOTIFICATIONS)
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'warning':
        return <WarningIcon color="warning" sx={{ mr: 2, mt: 0.5 }} />
      case 'success':
        return <SuccessIcon color="success" sx={{ mr: 2, mt: 0.5 }} />
      case 'error':
        return <ErrorIcon color="error" sx={{ mr: 2, mt: 0.5 }} />
      case 'info':
      default:
        return <InfoIcon color="info" sx={{ mr: 2, mt: 0.5 }} />
    }
  }

  const formatTimestamp = (dateString) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + ' ' + 
             date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
    } catch {
      return dateString
    }
  }

  return (
    <Popover
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      slotProps={{
        paper: {
          sx: {
            width: { xs: '100%', sm: 360 },
            maxWidth: '100vw',
            borderRadius: 2,
            boxShadow: 3,
          },
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Notifications {unreadCount > 0 && `(${unreadCount})`}
        </Typography>
        {unreadCount > 0 && (
          <Button size="small" onClick={handleMarkAllRead} sx={{ fontSize: '0.75rem' }}>
            Mark all read
          </Button>
        )}
      </Box>
      <Divider />

      <List disablePadding sx={{ maxHeight: 360, overflowY: 'auto' }}>
        {items.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No notifications
            </Typography>
          </Box>
        ) : (
          items.slice(0, 5).map((item) => (
            <ListItem
              key={item.id}
              onClick={() => handleNotificationClick(item)}
              sx={{
                py: 1.5,
                px: 2,
                cursor: 'pointer',
                bgcolor: item.isRead ? 'transparent' : 'action.hover',
                borderBottom: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  bgcolor: 'action.selected',
                },
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              {getNotificationIcon(item.type)}
              <Box sx={{ flexGrow: 1, mr: 1 }}>
                <Typography variant="subtitle2" fontWeight={item.isRead ? 500 : 700} color="text.primary" sx={{ lineBreak: 'anywhere' }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {item.message}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                  {formatTimestamp(item.createdAt)}
                </Typography>
              </Box>
              {!item.isRead && (
                <Tooltip title="Unread">
                  <IconButton size="small" sx={{ p: 0, mt: 0.5 }}>
                    <DotIcon color="primary" sx={{ fontSize: 12 }} />
                  </IconButton>
                </Tooltip>
              )}
            </ListItem>
          ))
        )}
      </List>

      <Divider />
      <Box sx={{ p: 1, textAlign: 'center' }}>
        <Button size="small" fullWidth onClick={handleViewAll}>
          View all notifications
        </Button>
      </Box>
    </Popover>
  )
}
