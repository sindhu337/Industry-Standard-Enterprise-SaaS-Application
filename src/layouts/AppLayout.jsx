import { Box, useTheme, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import Sidebar from '@/components/navigation/Sidebar'
import Topbar from '@/components/navigation/Topbar'
import Footer from '@/components/navigation/Footer'
import Breadcrumbs from '@/components/navigation/Breadcrumbs'

const SIDEBAR_WIDTH = 260
const SIDEBAR_COLLAPSED_WIDTH = 72
const TOPBAR_HEIGHT = 64

export default function AppLayout({ children }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    /*
     * Outer wrapper: full-height horizontal flex container.
     * The Sidebar Drawer (permanent variant on desktop) occupies its own
     * natural width inside this flex row. The main <Box> beside it gets
     * flexGrow:1 so it fills whatever remains — no manual ml/width needed.
     */
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Fixed AppBar — sits above the flex row via zIndex */}
      <Topbar height={TOPBAR_HEIGHT} />

      {/*
       * Permanent Drawer on desktop: participates in the flex row and
       * automatically pushes the content to the right by its own width.
       * On mobile it renders as a temporary overlay (zero flow width).
       */}
      <Sidebar width={SIDEBAR_WIDTH} collapsedWidth={SIDEBAR_COLLAPSED_WIDTH} />

      {/*
       * Main content column.
       * flexGrow:1 fills remaining width after the Drawer.
       * minWidth:0 prevents flex children from overflowing.
       * No ml or explicit width — the Drawer's own flex footprint does the job.
       */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          // Smooth resize when sidebar collapses/expands
          transition: theme.transitions.create(['width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        {/* Inner content wrapper — accounts for fixed Topbar height */}
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            pt: `${TOPBAR_HEIGHT + 16}px`,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Breadcrumbs />
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {children}
          </Box>
        </Box>

        {/* Footer stays at the bottom of the content column */}
        <Footer />
      </Box>
    </Box>
  )
}
