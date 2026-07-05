import { Box } from '@mui/material'

export default function PageContainer({ children, sx = {} }) {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', md: '92%', lg: '92%', xl: 1680 },
        mx: 'auto',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        px: { xs: 2, sm: 3 },
        py: 3,
        gap: 3,
        minHeight: '100%',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
