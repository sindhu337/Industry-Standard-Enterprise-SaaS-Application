import { Drawer, Box, Typography } from '@mui/material'

export default function Sidebar({ width, collapsedWidth }) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width, boxSizing: 'border-box' },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" color="primary">e-GRCP</Typography>
      </Box>
    </Drawer>
  )
}
