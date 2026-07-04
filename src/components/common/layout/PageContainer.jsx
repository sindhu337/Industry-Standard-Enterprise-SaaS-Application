import { Box } from '@mui/material'

export default function PageContainer({ children, sx = {} }) {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', md: '90%', lg: '90%', xl: 1800 },
        mx: 'auto',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
