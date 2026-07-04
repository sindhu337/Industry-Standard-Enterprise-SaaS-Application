import { AppBar, Toolbar, Typography } from '@mui/material'

export default function Topbar({ height }) {
  return (
    <AppBar position="fixed" elevation={0} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, height }}>
      <Toolbar>
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
          Enterprise GRC Platform
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
