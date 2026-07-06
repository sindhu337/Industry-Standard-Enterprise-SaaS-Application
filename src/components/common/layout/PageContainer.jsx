import { memo } from 'react'
import { Box } from '@mui/material'

const PageContainer = memo(function PageContainer({ children, sx = {} }) {
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
})

export default PageContainer
