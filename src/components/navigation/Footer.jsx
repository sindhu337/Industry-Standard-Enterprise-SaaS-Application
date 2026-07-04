import { Box, Typography } from '@mui/material'
import { APP_CONFIG } from '@/constants/appConfig'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 1.5,
        px: 3,
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="caption" color="text.secondary">
        © {new Date().getFullYear()} {APP_CONFIG.APP_NAME} — {APP_CONFIG.APP_FULL_NAME} v{APP_CONFIG.VERSION}
      </Typography>
    </Box>
  )
}
