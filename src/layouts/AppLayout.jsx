import { Box } from '@mui/material'
import Sidebar from '@/components/navigation/Sidebar'
import Topbar from '@/components/navigation/Topbar'

const SIDEBAR_WIDTH = 260
const SIDEBAR_COLLAPSED_WIDTH = 72
const TOPBAR_HEIGHT = 64

export default function AppLayout({ children }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar width={SIDEBAR_WIDTH} collapsedWidth={SIDEBAR_COLLAPSED_WIDTH} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          overflow: 'hidden',
        }}
      >
        <Topbar height={TOPBAR_HEIGHT} />
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            mt: `${TOPBAR_HEIGHT}px`,
            overflow: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
