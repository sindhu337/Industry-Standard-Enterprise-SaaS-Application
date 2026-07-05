import { useEffect, useMemo, useState } from 'react'
import { Box, Typography, Divider, Paper, Chip } from '@mui/material'
import { Security as SecurityIcon } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import PageContainer from '@/components/common/layout/PageContainer'
import ComplianceReviewTable from './components/ComplianceReviewTable'
import ComplianceReviewDetail from './components/ComplianceReviewDetail'
import { useProcurement } from '@/features/procurement/hooks/useProcurement'
import { updateProcurement } from '@/features/procurement/procurementSlice'
import { showSnackbar } from '@/app/store/slices/uiSlice'

export default function CompliancePage() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { items, loading, loadAll } = useProcurement()
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

  const summaryLabel = `${approvedItems.length} approved request${approvedItems.length === 1 ? '' : 's'}`

  return (
    <PageContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: 'info.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SecurityIcon sx={{ color: '#fff', fontSize: 22 }} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={700} lineHeight={1.2}>Compliance Officer Review Queue</Typography>
            <Typography variant="caption" color="text.secondary">
              Review approved procurement requests, mark them compliant, and request additional information when needed.
            </Typography>
          </Box>
        </Box>
        <Chip label={summaryLabel} color="success" variant="outlined" sx={{ fontWeight: 700 }} />
      </Box>

      <Paper elevation={0} sx={{ p: 2.5, mb: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
        <ComplianceReviewTable rows={approvedItems} loading={loading} onReviewAction={handleReviewAction} />
      </Paper>

      <ComplianceReviewDetail item={selectedItem} onReviewAction={handleReviewAction} onAddComment={handleAddComment} />
    </PageContainer>
  )
}
