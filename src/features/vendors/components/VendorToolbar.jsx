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
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2,
            bgcolor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <StoreIcon sx={{ color: 'primary.contrastText', fontSize: 22 }} />
        </Box>
        <Box>
          {loading ? (
            <>
              <Skeleton width={200} height={28} />
              <Skeleton width={280} height={18} sx={{ mt: 0.5 }} />
            </>
          ) : (
            <>
              <Typography variant="h6" fontWeight={700} lineHeight={1.2}>
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="caption" color="text.secondary" display="block">
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
        sx={{ borderRadius: 2, fontWeight: 700, whiteSpace: 'nowrap', px: 2.5 }}
        onClick={() => navigate('/vendors/create')}
      >
        Add Vendor
      </Button>
    </Box>
  )
}
