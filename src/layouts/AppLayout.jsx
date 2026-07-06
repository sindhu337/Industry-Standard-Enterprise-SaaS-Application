import { Box, useTheme, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import Sidebar from '@/components/navigation/Sidebar';
import Topbar from '@/components/navigation/Topbar';
import Footer from '@/components/navigation/Footer';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';

const SIDEBAR_WIDTH = 260;
const SIDEBAR_COLLAPSED_WIDTH = 72;
const TOPBAR_HEIGHT = 64;

export default function AppLayout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { sidebarCollapsed } = useSelector((state) => state.ui);

  const currentSidebarWidth = isMobile
    ? 0
    : sidebarCollapsed
      ? SIDEBAR_COLLAPSED_WIDTH
      : SIDEBAR_WIDTH;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Topbar height={TOPBAR_HEIGHT} />
      <Sidebar width={SIDEBAR_WIDTH} collapsedWidth={SIDEBAR_COLLAPSED_WIDTH} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 1.5, sm: 2, md: 3 },
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

        <Footer />
      </Box>
    </Box>
  );
}