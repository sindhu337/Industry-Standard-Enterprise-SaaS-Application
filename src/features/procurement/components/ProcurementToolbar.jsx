/**
 * ProcurementToolbar – Page header with title, description, and action buttons
 */
import { Box, Typography, Button, Skeleton } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

export default function ProcurementToolbar({ title, subtitle, loading = false }) {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2,
        mb: 0.5,
      }}
    >
      <Box>
        {loading ? (
          <>
            <Skeleton width={260} height={32} />
            <Skeleton width={400} height={20} sx={{ mt: 0.5 }} />
          </>
        ) : (
          <>
            <Typography variant="h5" fontWeight="bold" id="procurement-page-title">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.25 }}>
                {subtitle}
              </Typography>
            )}
          </>
        )}
      </Box>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => navigate(ROUTES.PROCUREMENT_CREATE)}
        id="btn-create-procurement"
        sx={{ borderRadius: 2, px: 2.5, py: 1.1, fontWeight: 700, whiteSpace: 'nowrap' }}
      >
        Create Requisition
      </Button>
    </Box>
  )
}
