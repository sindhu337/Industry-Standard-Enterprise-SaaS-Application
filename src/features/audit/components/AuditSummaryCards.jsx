import { Grid, Paper, Typography, Box, Skeleton } from '@mui/material'
import {
  Assignment as PendingIcon,
  CheckCircle as CompletedIcon,
  ReportProblem as ObservationIcon,
  Percent as CompletionIcon,
} from '@mui/icons-material'

const cards = [
  { key: 'pending', label: 'Pending Audits', icon: PendingIcon, color: 'warning.main', bg: '#fff3e0' },
  { key: 'completed', label: 'Completed Audits', icon: CompletedIcon, color: 'success.main', bg: '#e8f5e9' },
  { key: 'observations', label: 'Observations Raised', icon: ObservationIcon, color: 'error.main', bg: '#fdecea' },
  { key: 'completionRate', label: 'Audit Completion Rate', icon: CompletionIcon, color: 'primary.main', bg: 'primary.light' },
]

export default function AuditSummaryCards({ summary, loading }) {
  return (
    <Grid container spacing={2}>
      {cards.map(({ key, label, icon: Icon, color, bg }) => (
        <Grid item xs={6} sm={3} md={3} key={key}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5, borderRadius: 3,
              border: '1px solid', borderColor: 'divider',
              display: 'flex', flexDirection: 'column', gap: 1,
              transition: 'box-shadow 0.2s',
              '&:hover': { boxShadow: 4 },
            }}
          >
            <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon sx={{ color, fontSize: 22 }} />
            </Box>
            {loading ? (
              <Skeleton width={40} height={32} />
            ) : (
              <Typography variant="h5" fontWeight={800} color={color}>
                {key === 'completionRate' ? `${summary?.[key] ?? '—'}%` : summary?.[key] ?? '—'}
              </Typography>
            )}
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              {label}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}
