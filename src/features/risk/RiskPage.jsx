import { useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Shield as ShieldIcon } from '@mui/icons-material';
import PageContainer from '@/components/common/layout/PageContainer';
import RiskSummaryCards from './components/RiskSummaryCards';
import RiskHeatmap from './components/RiskHeatmap';
import RiskTrendChart from './components/RiskTrendChart';
import RiskTable from './components/RiskTable';
import { useRisk } from './hooks/useRisk';

export default function RiskPage() {
  const { items, summary, trendData, loading, loadAll } = useRisk();

  useEffect(() => {loadAll();}, [loadAll]);

  return (
    <PageContainer>
      {}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Box>
          <Typography variant="h3" fontWeight={700} sx={{ lineHeight: 1.2 }}>Risk Management</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Enterprise risk register, heatmap, and trend analysis
          </Typography>
        </Box>
      </Box>

      {}
      <RiskSummaryCards summary={summary} loading={loading && !summary} />

      {}
      <Grid container spacing={3} sx={{ mt: 0.5 }}>
        <Grid item xs={12} md={5}>
          <RiskHeatmap risks={items} />
        </Grid>
        <Grid item xs={12} md={7}>
          <RiskTrendChart data={trendData} />
        </Grid>
      </Grid>

      {}
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1.5 }}>
          Risk Register
        </Typography>
        <RiskTable rows={items} loading={loading} />
      </Box>
    </PageContainer>);

}