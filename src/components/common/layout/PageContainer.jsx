import { Box } from '@mui/material'

export default function PageContainer({ children, sx = {} }) {
  return (
    <Box
      sx={{
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        py: 4,
        gap: 2,
        minHeight: '100%',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
