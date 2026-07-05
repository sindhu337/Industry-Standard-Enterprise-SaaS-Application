import { Grid, Paper, Typography, Box, Skeleton, LinearProgress } from '@mui/material'
import {
  CheckCircle as CompliantIcon,
  Cancel as NonCompliantIcon,
  HourglassEmpty as ReviewIcon,
  Warning as ExpiredIcon,
  Security as SecurityIcon,
} from '@mui/icons-material'

export default function ComplianceSummaryCards({ summary, loading }) {
  const cards = [
    {
      key: 'compliant', label: 'Compliant', icon: CompliantIcon,
      color: 'success.main', bg: '#e8f5e9',
    },
    {
      key: 'nonCompliant', label: 'Non-Compliant', icon: NonCompliantIcon,
      color: 'error.main', bg: '#fdecea',
    },
    {
      key: 'underReview', label: 'Under Review', icon: ReviewIcon,
      color: 'warning.dark', bg: '#fff3e0',
    },
    {
      key: 'expired', label: 'Expired', icon: ExpiredIcon,
      color: 'error.dark', bg: '#ffebee',
    },
  ]

  return (
    <Grid container spacing={2}>
      {/* Overall score card */}
      <Grid item xs={12} sm={6} md={3}>
        <Paper elevation={0} sx={{
          p: 2.5, borderRadius: 3, border: '1px solid', borderColor: 'divider',
          display: 'flex', flexDirection: 'column', gap: 1, height: '100%',
          transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 4 },
        }}>
          <Box sx={{
            width: 40, height: 40, borderRadius: 2, bgcolor: 'primary.light',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <SecurityIcon sx={{ color: 'primary.main', fontSize: 22 }} />
          </Box>
          {loading ? <Skeleton width={60} height={36} /> : (
            <>
              <Typography variant="h4" fontWeight={800} color="primary.main">
                {summary?.overallScore ?? '—'}%
              </Typography>
              <Box>
                <LinearProgress
                  variant="determinate"
                  value={summary?.overallScore ?? 0}
                  color={summary?.overallScore >= 80 ? 'success' : summary?.overallScore >= 60 ? 'warning' : 'error'}
                  sx={{ height: 6, borderRadius: 3, mt: 0.5 }}
                />
              </Box>
            </>
          )}
          <Typography variant="caption" color="text.secondary" fontWeight={600}>Overall Score</Typography>
        </Paper>
      </Grid>

      {/* Status count cards */}
      {cards.map(({ key, label, icon: Icon, color, bg }) => (
        <Grid item xs={6} sm={3} md={2.25} key={key}>
          <Paper elevation={0} sx={{
            p: 2.5, borderRadius: 3, border: '1px solid', borderColor: 'divider',
            display: 'flex', flexDirection: 'column', gap: 1,
            transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 4 },
          }}>
            <Box sx={{
              width: 40, height: 40, borderRadius: 2, bgcolor: bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon sx={{ color, fontSize: 22 }} />
            </Box>
            {loading ? <Skeleton width={32} height={32} /> : (
              <Typography variant="h5" fontWeight={800} color={color}>
                {summary?.[key] ?? '—'}
              </Typography>
            )}
            <Typography variant="caption" color="text.secondary" fontWeight={600}>{label}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}
