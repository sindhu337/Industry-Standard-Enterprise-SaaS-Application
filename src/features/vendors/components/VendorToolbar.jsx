import { Box, Typography, Button, Skeleton } from '@mui/material'
import { Add as AddIcon, Store as StoreIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export default function VendorToolbar({ title, subtitle, loading = false }) {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box>
          {loading ? (
            <>
              <Skeleton width={200} height={28} />
              <Skeleton width={280} height={18} sx={{ mt: 0.5 }} />
            </>
          ) : (
            <>
              <Typography variant="h3" fontWeight={700} sx={{ lineHeight: 1.2 }}>
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="body2" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                  {subtitle}
                </Typography>
              )}
            </>
          )}
        </Box>
      </Box>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        id="btn-add-vendor"
        sx={{ borderRadius: 1.5, fontWeight: 700, whiteSpace: 'nowrap', px: 2, py: 0.5 }}
        onClick={() => navigate('/vendors/create')}
      >
        Add Vendor
      </Button>
    </Box>
  )
}
