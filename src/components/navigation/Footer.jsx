import { memo } from 'react'
import { Box, Typography } from '@mui/material'
import { APP_CONFIG } from '@/constants/appConfig'

const Footer = memo(function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 1.5,
        px: { xs: 2, sm: 3 },
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        textAlign: { xs: 'center', sm: 'left' },
      }}
    >
      <Typography variant="caption" color="text.secondary">
        © {new Date().getFullYear()} {APP_CONFIG.APP_NAME} — {APP_CONFIG.APP_FULL_NAME} v{APP_CONFIG.VERSION}
      </Typography>
    </Box>
  )
})

export default Footer
