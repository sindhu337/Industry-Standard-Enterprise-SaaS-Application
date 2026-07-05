import { useEffect, useState } from 'react'
import { Box, Tabs, Tab, Typography } from '@mui/material'
import { Security as SecurityIcon } from '@mui/icons-material'
import PageContainer from '@/components/common/layout/PageContainer'
import ComplianceSummaryCards from './components/ComplianceSummaryCards'
import ComplianceTable from './components/ComplianceTable'
import ViolationsTable from './components/ViolationsTable'
import { useCompliance } from './hooks/useCompliance'

export default function CompliancePage() {
  const { items, violations, summary, loading, loadAll } = useCompliance()
  const [tab, setTab] = useState(0)

  useEffect(() => { loadAll() }, [loadAll])

  return (
    <PageContainer>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Box sx={{
          width: 44, height: 44, borderRadius: 2, bgcolor: 'info.main',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <SecurityIcon sx={{ color: '#fff', fontSize: 22 }} />
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={700} lineHeight={1.2}>Compliance Center</Typography>
          <Typography variant="caption" color="text.secondary">
            Framework compliance scores, violations tracking, and certificate management
          </Typography>
        </Box>
      </Box>

      {/* KPI Summary */}
      <ComplianceSummaryCards summary={summary} loading={loading && !summary} />

      {/* Tabs */}
      <Box sx={{ mt: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} id="compliance-tabs">
          <Tab label="Framework Overview" id="tab-frameworks" />
          <Tab label={`Active Violations (${violations.length})`} id="tab-violations" />
        </Tabs>
      </Box>

      <Box sx={{ mt: 2 }}>
        {tab === 0 && <ComplianceTable rows={items} loading={loading} />}
        {tab === 1 && <ViolationsTable rows={violations} loading={loading} />}
      </Box>
    </PageContainer>
  )
}
