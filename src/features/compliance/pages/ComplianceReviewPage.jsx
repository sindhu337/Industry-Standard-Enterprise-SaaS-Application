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

  const reviewStats = useMemo(() => ({
    approved: approvedItems.length,
    compliant: approvedItems.filter((item) => item.complianceStatus === 'Compliant').length,
    nonCompliant: approvedItems.filter((item) => item.complianceStatus === 'Non-Compliant').length,
    underReview: approvedItems.filter((item) => item.complianceStatus === 'Under Review').length,
  }), [approvedItems])

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

    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 2, mb: 3 }}>
      {[
        { label: 'Approved Items', value: reviewStats.approved, color: 'primary.main' },
        { label: 'Compliant', value: reviewStats.compliant, color: 'success.main' },
        { label: 'Non-Compliant', value: reviewStats.nonCompliant, color: 'error.main' },
        { label: 'Under Review', value: reviewStats.underReview, color: 'warning.main' },
      ].map((metric) => (
        <Paper key={metric.label} elevation={0} sx={{ p: 2.5, borderRadius: 1.5, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
          <Typography variant="h5" fontWeight={700} color={metric.color} sx={{ mb: 0.5 }}>
            {metric.value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {metric.label}
          </Typography>
        </Paper>
      ))}
    </Box>

      <Paper elevation={0} sx={{ p: 2.5, borderRadius: 1.5, border: '1px solid', borderColor: 'divider', mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
          Compliance Review Queue
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Approved procurements are listed here for review and compliance decision making.
        </Typography>
        <ComplianceReviewTable rows={approvedItems} loading={loading} onReviewAction={handleReviewAction} />
      </Paper>

      <ComplianceReviewDetail item={selectedItem} onReviewAction={handleReviewAction} onAddComment={handleAddComment} />
    </PageContainer>
  )
}
