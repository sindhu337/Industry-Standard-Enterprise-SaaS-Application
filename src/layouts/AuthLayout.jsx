import { Box } from '@mui/material'

export default function AuthLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        bgcolor: 'background.default',
      }}
    >
      {children}
    </Box>
  )
}
