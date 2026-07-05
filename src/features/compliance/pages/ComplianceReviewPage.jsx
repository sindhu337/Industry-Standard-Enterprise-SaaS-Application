import { useEffect, useMemo, useState } from 'react'
import { Box, Button, Paper, Typography, Stack, Divider } from '@mui/material'
import { Refresh as RefreshIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PageContainer from '@/components/common/layout/PageContainer'
import ComplianceReviewTable from '../components/ComplianceReviewTable'
import ComplianceReviewDetail from '../components/ComplianceReviewDetail'
import { useProcurement } from '@/features/procurement/hooks/useProcurement'
import { showSnackbar } from '@/app/store/slices/uiSlice'
import { updateProcurement } from '@/features/procurement/procurementSlice'

export default function ComplianceReviewPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { items, loading, loadAll } = useProcurement()
  const { user } = useSelector((state) => state.auth)
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    loadAll()
  }, [loadAll])

  const approvedItems = useMemo(() => items.filter((item) => item.status === 'Approved'), [items])

  useEffect(() => {
    if (!selectedId && approvedItems.length > 0) {
      setSelectedId(approvedItems[0].id)
    }
  }, [approvedItems, selectedId])

  const selectedItem = approvedItems.find((item) => item.id === selectedId) || null

  const handleReviewAction = async (id, complianceStatus, reviewer = user?.name) => {
    const current = items.find((item) => item.id === id)
    const result = await dispatch(updateProcurement({
      id,
      data: {
        complianceStatus,
        reviewedBy: reviewer || 'Compliance Officer',
        reviewedDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        comments: [...(current?.comments || []), { author: reviewer || 'Compliance Officer', text: `${complianceStatus} reviewed.`, date: new Date().toISOString().split('T')[0] }],
      },
    }))

    if (updateProcurement.fulfilled.match(result)) {
      dispatch(showSnackbar({ message: `Compliance review updated to ${complianceStatus}.`, severity: 'success' }))
    } else {
      dispatch(showSnackbar({ message: 'Compliance review could not be saved.', severity: 'error' }))
    }
  }

  const handleAddComment = async (id, text) => {
    if (!text?.trim()) return
    const current = items.find((item) => item.id === id)
    const result = await dispatch(updateProcurement({
      id,
      data: {
        comments: [...(current?.comments || []), { author: user?.name || 'Compliance Officer', text: text.trim(), date: new Date().toISOString().split('T')[0] }],
        lastUpdated: new Date().toISOString().split('T')[0],
      },
    }))

    if (updateProcurement.fulfilled.match(result)) {
      dispatch(showSnackbar({ message: 'Review note saved.', severity: 'success' }))
    }
  }

  return (
    <PageContainer>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight={700}>Compliance Center</Typography>
          <Typography variant="caption" color="text.secondary">Review approved procurements, mark them compliant, and request additional information where needed.</Typography>
        </Box>
        <Stack direction="row" spacing={1.5}>
          <Button startIcon={<ArrowBackIcon />} variant="outlined" onClick={() => navigate('/dashboard')}>Back</Button>
          <Button startIcon={<RefreshIcon />} variant="outlined" onClick={loadAll}>Refresh</Button>
        </Stack>
      </Box>

      <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', p: 2.5, mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={700}>Approved Procurement Review Queue</Typography>
        <Typography variant="body2" color="text.secondary">Compliance Officer sees only approved procurements and can update review outcomes for each request.</Typography>
      </Paper>

      <ComplianceReviewTable rows={approvedItems} loading={loading} onReviewAction={handleReviewAction} />
      <Divider sx={{ my: 3 }} />
      <ComplianceReviewDetail item={selectedItem} onReviewAction={handleReviewAction} onAddComment={handleAddComment} />
    </PageContainer>
  )
}
