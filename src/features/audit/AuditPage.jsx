import { useEffect, useState } from 'react'
import { Box, Tabs, Tab, Typography } from '@mui/material'
import { Assignment as AuditIcon } from '@mui/icons-material'
import PageContainer from '@/components/common/layout/PageContainer'
import AuditSummaryCards from './components/AuditSummaryCards'
import AuditTable from './components/AuditTable'
import AuditLogTimeline from './components/AuditLogTimeline'
import { useAudit } from './hooks/useAudit'

export default function AuditPage() {
  const { reports, summary, systemLogs, userActivities, loading, loadAll } = useAudit()
  const [tab, setTab] = useState(0)

  useEffect(() => { loadAll() }, [loadAll])

  return (
    <PageContainer>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Box sx={{
          width: 44, height: 44, borderRadius: 2, bgcolor: 'primary.main',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <AuditIcon sx={{ color: '#fff', fontSize: 22 }} />
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={700} lineHeight={1.2}>Audit Center</Typography>
          <Typography variant="caption" color="text.secondary">
            Audit scopes, reports register, and system/user activity logs
          </Typography>
        </Box>
      </Box>

      {/* KPI Cards */}
      <AuditSummaryCards summary={summary} loading={loading && !summary} />

      {/* Tabs */}
      <Box sx={{ mt: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} id="audit-tabs">
          <Tab label="Audit Reports" id="tab-reports" />
          <Tab label={`System Logs (${systemLogs.length})`} id="tab-system-logs" />
          <Tab label={`User Activities (${userActivities.length})`} id="tab-user-activities" />
        </Tabs>
      </Box>

      <Box sx={{ mt: 2 }}>
        {tab === 0 && <AuditTable rows={reports} loading={loading} />}
        {tab === 1 && <AuditLogTimeline logs={systemLogs} />}
        {tab === 2 && <AuditLogTimeline logs={userActivities} />}
      </Box>
    </PageContainer>
  )
}
