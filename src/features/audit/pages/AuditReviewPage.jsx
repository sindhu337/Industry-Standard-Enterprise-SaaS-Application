import { useEffect, useMemo, useState } from 'react'
import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material'
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PageContainer from '@/components/common/layout/PageContainer'
import AuditQueueTable from '../components/AuditQueueTable'
import AuditDetailPanel from '../components/AuditDetailPanel'
import AuditReportDialog from '../components/AuditReportDialog'
import { useAudit } from '../hooks/useAudit'
import { showSnackbar } from '@/app/store/slices/uiSlice'

export default function AuditReviewPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { queue, loading, loadAll, markAudited, addObservation } = useAudit()
  const [selectedId, setSelectedId] = useState(null)
  const [reportItem, setReportItem] = useState(null)

  useEffect(() => {
    loadAll()
  }, [loadAll])

  useEffect(() => {
    if (!selectedId && queue.length > 0) setSelectedId(queue[0].id)
  }, [queue, selectedId])

  const selectedItem = useMemo(() => queue.find((item) => item.id === selectedId) || null, [queue, selectedId])

  const auditStats = useMemo(() => ({
    total: queue.length,
    pending: queue.filter((item) => item.auditStatus === 'Pending Audit').length,
    completed: queue.filter((item) => item.auditStatus === 'Audited').length,
    observations: queue.filter((item) => item.auditStatus === 'Observation Raised').length,
  }), [queue])

  const handleMarkAudited = (id, auditorName, auditDate) => {
    markAudited(id, auditorName, auditDate)
    dispatch(showSnackbar({ message: 'Request marked as audited.', severity: 'success' }))
  }

  const handleAddObservation = (id, observation, auditorName, auditDate) => {
    if (!observation?.trim()) {
      dispatch(showSnackbar({ message: 'Please enter an observation.', severity: 'error' }))
      return
    }
    addObservation(id, observation, auditorName, auditDate)
    dispatch(showSnackbar({ message: 'Observation saved.', severity: 'success' }))
  }

  return (
    <PageContainer>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight={700}>Audit Center</Typography>
          <Typography variant="caption" color="text.secondary">Review compliant procurement requests, add observations, and generate mock audit reports.</Typography>
        </Box>
        <Button startIcon={<ArrowBackIcon />} variant="outlined" onClick={() => navigate('/dashboard')}>Back</Button>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 2, mb: 3 }}>
        {[
          { label: 'Total Audits', value: auditStats.total, color: 'primary.main' },
          { label: 'Pending Audits', value: auditStats.pending, color: 'warning.main' },
          { label: 'Completed Audits', value: auditStats.completed, color: 'success.main' },
          { label: 'Observations', value: auditStats.observations, color: 'error.main' },
        ].map((metric) => (
          <Paper key={metric.label} elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
            <Typography variant="h5" fontWeight={700} color={metric.color} sx={{ mb: 0.5 }}>
              {metric.value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {metric.label}
            </Typography>
          </Paper>
        ))}
      </Box>
      <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid', borderColor: 'divider', mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={700}>Auditor Queue</Typography>
        <Typography variant="body2" color="text.secondary">Only approved and compliant procurement requests are shown.</Typography>
      </Paper>

      <AuditQueueTable rows={queue} loading={loading} onMarkAudited={handleMarkAudited} onAddObservation={handleAddObservation} />
      <Divider sx={{ my: 3 }} />
      <Box sx={{ mb: 3 }}>
        <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h6" fontWeight={700}>Audit Review Detail</Typography>
              <Typography variant="body2" color="text.secondary">Inspect the selected audit entry below and take action as needed.</Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" onClick={() => setReportItem(selectedItem)} disabled={!selectedItem}>Generate Mock Report</Button>
              <Button
                variant="contained"
                color="success"
                disabled={!selectedItem}
                onClick={() => handleMarkAudited(selectedItem?.id, user?.name || 'Auditor', new Date().toISOString().split('T')[0])}
              >
                Mark as Audited
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Box>
      <AuditDetailPanel item={selectedItem} />
      <AuditReportDialog open={Boolean(reportItem)} onClose={() => setReportItem(null)} item={reportItem} />
    </PageContainer>
  )
}
