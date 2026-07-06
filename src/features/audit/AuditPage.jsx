import { useEffect, useMemo, useState } from 'react'
import { Box, Tabs, Tab, Typography, Paper, Divider, Button } from '@mui/material'
import { Assignment as AuditIcon } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import PageContainer from '@/components/common/layout/PageContainer'
import AuditSummaryCards from './components/AuditSummaryCards'
import AuditQueueTable from './components/AuditQueueTable'
import AuditDetailPanel from './components/AuditDetailPanel'
import AuditReportDialog from './components/AuditReportDialog'
import { useAudit } from './hooks/useAudit'
import { showSnackbar } from '@/app/store/slices/uiSlice'

export default function AuditPage() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { queue, loading, loadAll, markAudited, addObservation } = useAudit()
  const [tab, setTab] = useState(0)
  const [selectedId, setSelectedId] = useState(null)
  const [reportItem, setReportItem] = useState(null)

  useEffect(() => { loadAll() }, [loadAll])

  useEffect(() => {
    if (!selectedId && queue.length > 0) setSelectedId(queue[0].id)
  }, [queue, selectedId])

  const selectedItem = useMemo(() => queue.find((item) => item.id === selectedId) || null, [queue, selectedId])

  const auditSummary = {
    pending: queue.filter((item) => item.auditStatus === 'Pending Audit').length,
    completed: queue.filter((item) => item.auditStatus === 'Audited').length,
    observations: queue.reduce((acc, item) => acc + (item.observations?.length || 0), 0),
    completionRate: queue.length ? Math.round((queue.filter((item) => item.auditStatus === 'Audited').length / queue.length) * 100) : 0,
  }

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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Box>
          <Typography variant="h3" fontWeight={700} sx={{ lineHeight: 1.2 }}>Audit Center</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Review compliant procurement requests, add observations, and generate mock audit reports.</Typography>
        </Box>
      </Box>

      <AuditSummaryCards summary={auditSummary} loading={loading && !queue.length} />

      <Paper elevation={0} sx={{ mt: 3, borderRadius: 1.5, border: '1px solid', borderColor: 'divider', p: 2.5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="subtitle1" fontWeight={700}>Audit Review Workflow</Typography>
              <Typography variant="body2" color="text.secondary">Switch between the queue and the selected review detail view.</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">{queue.length} audit records available</Typography>
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab} onChange={(_, v) => setTab(v)} id="audit-tabs">
              <Tab label="Audit Queue" id="tab-queue" />
              <Tab label="Review Detail" id="tab-detail" />
            </Tabs>
          </Box>

          <Box sx={{ mt: 2 }}>
            {tab === 0 && <AuditQueueTable rows={queue} loading={loading} onMarkAudited={handleMarkAudited} onAddObservation={handleAddObservation} />}
            {tab === 1 && (
              <Box>
                <Paper elevation={0} sx={{ p: 2.5, borderRadius: 1.5, border: '1px solid', borderColor: 'divider', mb: 3, bgcolor: 'background.paper' }}>
                  <Typography variant="subtitle1" fontWeight={700}>Selected Procurement Review</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedItem?.title || 'Select a request from the queue to inspect its lifecycle.'}
                  </Typography>
                </Paper>
                <AuditDetailPanel item={selectedItem} />
                <Divider sx={{ my: 3 }} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap', gap: 1 }}>
                  <Button variant="outlined" onClick={() => setReportItem(selectedItem)} disabled={!selectedItem}>
                    Generate Mock Report
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    disabled={!selectedItem}
                    onClick={() => handleMarkAudited(selectedItem?.id, user?.name || 'Auditor', new Date().toISOString().split('T')[0])}
                  >
                    Mark as Audited
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Paper>

      <AuditReportDialog open={Boolean(reportItem)} onClose={() => setReportItem(null)} item={reportItem} />
    </PageContainer>
  )
}
