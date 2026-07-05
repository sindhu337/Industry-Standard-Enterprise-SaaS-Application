import { Grid, Paper, Typography, Box, Skeleton } from '@mui/material'
import {
  Assignment as TotalIcon,
  FolderOpen as OpenIcon,
  PlayArrow as ProgressIcon,
  CheckCircle as ClosedIcon,
  Error as EscalatedIcon,
} from '@mui/icons-material'

const cards = [
  { key: 'total',      label: 'Total Audits', icon: TotalIcon,     color: 'primary.main',  bg: 'primary.light' },
  { key: 'open',       label: 'Open',         icon: OpenIcon,      color: 'info.main',     bg: '#e3f2fd' },
  { key: 'inProgress', label: 'In Progress',  icon: ProgressIcon,  color: 'warning.dark',  bg: '#fff3e0' },
  { key: 'closed',     label: 'Closed',       icon: ClosedIcon,    color: 'success.main',  bg: '#e8f5e9' },
  { key: 'escalated',  label: 'Escalated',    icon: EscalatedIcon, color: 'error.main',    bg: '#fdecea' },
]

export default function AuditSummaryCards({ summary, loading }) {
  return (
    <Grid container spacing={2}>
      {cards.map(({ key, label, icon: Icon, color, bg }) => (
        <Grid item xs={6} sm={4} md={2.4} key={key}>
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
            <Box
              sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Icon sx={{ color, fontSize: 22 }} />
            </Box>
            {loading ? (
              <Skeleton width={40} height={32} />
            ) : (
              <Typography variant="h5" fontWeight={800} color={color}>
                {summary?.[key] ?? '—'}
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
