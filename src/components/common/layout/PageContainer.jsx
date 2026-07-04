import { Box } from '@mui/material'

export default function PageContainer({ children, sx = {} }) {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1600,
        mx: 'auto',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
