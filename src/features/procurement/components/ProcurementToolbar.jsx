


import { memo } from 'react';
import { Box, Typography, Button, Skeleton } from '@mui/material';
import {
  Add as AddIcon,
  Download as ExportIcon,
  Refresh as RefreshIcon
} from
  '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

const ProcurementToolbar = memo(function ProcurementToolbar({
  title,
  subtitle,
  loading = false,
  onRefresh,
  onExport
}) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2,
        mb: 2
      }}>

      <Box>
        {loading ?
          <>
            <Skeleton width={260} height={32} />
            <Skeleton width={400} height={20} sx={{ mt: 0.5 }} />
          </> :

          <>
            <Typography variant="h3" fontWeight="bold" id="procurement-page-title">
              {title}
            </Typography>
            {subtitle &&
              <Typography
                variant="body2"
                color="text.secondary"
                display="block"
                sx={{ mt: 0.5 }}>

                {subtitle}
              </Typography>
            }
          </>
        }
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 1.5,
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>


        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={onRefresh}
          id="btn-refresh-procurement"
          sx={{
            borderRadius: 1.5,
            px: 2,
            py: 0.5,
            fontWeight: 700,
            whiteSpace: 'nowrap'
          }}>

          Refresh
        </Button>
        <Button
          variant="outlined"
          startIcon={<ExportIcon />}
          onClick={onExport}
          id="btn-export-procurement"
          sx={{
            borderRadius: 1.5,
            px: 2,
            py: 0.5,
            fontWeight: 700,
            whiteSpace: 'nowrap'
          }}>

          Export
        </Button>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate(ROUTES.PROCUREMENT_CREATE)}
          id="btn-create-procurement"
          sx={{
            borderRadius: 1.5,
            px: 2,
            py: 0.5,
            fontWeight: 700,
            whiteSpace: 'nowrap'
          }}>

          Create Request
        </Button>
      </Box>
    </Box>);

});

export default ProcurementToolbar;