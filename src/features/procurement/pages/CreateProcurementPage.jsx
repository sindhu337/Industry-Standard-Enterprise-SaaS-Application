/**
 * CreateProcurementPage – New requisition creation page
 */
import { Box, Typography, Button, Paper } from '@mui/material'
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

import PageContainer from '@/components/common/layout/PageContainer'
import ProcurementForm from '../components/ProcurementForm'
import { useProcurement } from '../hooks/useProcurement'
import { ROUTES } from '@/constants/routes'
import { useState } from 'react'

export default function CreateProcurementPage() {
  const navigate = useNavigate()
  const { submitCreate } = useProcurement()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data) => {
    setIsSubmitting(true)
    await submitCreate(data)
    setIsSubmitting(false)
  }

  return (
    <PageContainer>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(ROUTES.PROCUREMENT)}
          sx={{ mb: 2, textTransform: 'none', fontWeight: 700 }}
          id="btn-back-to-list"
        >
          Back to Requisitions
        </Button>
        <Typography variant="h5" fontWeight={700} id="create-page-title">
          New Procurement Requisition
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.25 }}>
          Complete the form below to submit a procurement request for approval
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 4 },
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <ProcurementForm
          editItem={null}
          onSubmit={handleSubmit}
          onCancel={() => navigate(ROUTES.PROCUREMENT)}
          isSubmitting={isSubmitting}
        />
      </Paper>
    </PageContainer>
  )
}
