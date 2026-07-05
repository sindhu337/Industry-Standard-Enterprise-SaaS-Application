import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import PageContainer from '@/components/common/layout/PageContainer'
import VendorCard from './components/VendorCard'
import { useVendors } from './hooks/useVendors'

export default function VendorDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { selected, loading, loadById } = useVendors()

  useEffect(() => { loadById(id) }, [loadById, id])

  return (
    <PageContainer>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/vendors')}
          sx={{ mb: 2, textTransform: 'none', fontWeight: 700 }}
          id="btn-back-to-vendors"
        >
          Back to Vendors
        </Button>
        <Typography variant="h5" fontWeight={700} id="vendor-detail-title">
          Vendor Profile
        </Typography>
        {selected && (
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.25 }}>
            {selected.id} · {selected.category} · {selected.country}
          </Typography>
        )}
      </Box>

      <VendorCard vendor={selected} loading={loading} />
    </PageContainer>
  )
}
