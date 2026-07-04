import { Grid, Box } from '@mui/material'
import PageContainer from '@/components/common/layout/PageContainer'
import DashboardHeader from '../components/DashboardHeader'
import KpiCard from '../components/KpiCard'
import QuickActions from '../components/QuickActions'
import RecentActivity from '../components/RecentActivity'
import ProcurementTrendChart from '../components/ProcurementTrendChart'
import RiskDistributionChart from '../components/RiskDistributionChart'
import ComplianceStatusChart from '../components/ComplianceStatusChart'
import { dashboardMockData } from '../data/dashboardMockData'

export default function DashboardPage() {
  const kpiData = dashboardMockData.kpis

  return (
    <PageContainer>
      <DashboardHeader />
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <KpiCard
            type="totalProcurementRequests"
            label={kpiData.totalProcurementRequests.label}
            value={kpiData.totalProcurementRequests.value}
            change={kpiData.totalProcurementRequests.change}
            trend={kpiData.totalProcurementRequests.trend}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <KpiCard
            type="activeVendors"
            label={kpiData.activeVendors.label}
            value={kpiData.activeVendors.value}
            change={kpiData.activeVendors.change}
            trend={kpiData.activeVendors.trend}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <KpiCard
            type="openRisks"
            label={kpiData.openRisks.label}
            value={kpiData.openRisks.value}
            change={kpiData.openRisks.change}
            trend={kpiData.openRisks.trend}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <KpiCard
            type="complianceScore"
            label={kpiData.complianceScore.label}
            value={kpiData.complianceScore.value}
            change={kpiData.complianceScore.change}
            trend={kpiData.complianceScore.trend}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <KpiCard
            type="pendingApprovals"
            label={kpiData.pendingApprovals.label}
            value={kpiData.pendingApprovals.value}
            change={kpiData.pendingApprovals.change}
            trend={kpiData.pendingApprovals.trend}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <KpiCard
            type="auditFindings"
            label={kpiData.auditFindings.label}
            value={kpiData.auditFindings.value}
            change={kpiData.auditFindings.change}
            trend={kpiData.auditFindings.trend}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={8}>
          <ProcurementTrendChart />
        </Grid>
        <Grid item xs={12} lg={4}>
          <QuickActions />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <RiskDistributionChart />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <ComplianceStatusChart />
        </Grid>
        <Grid item xs={12} lg={4}>
          <RecentActivity />
        </Grid>
      </Grid>
    </PageContainer>
  )
}
