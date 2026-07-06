import { Grid, Paper, Typography, Box, Skeleton } from '@mui/material'
import {
  Shield as TotalIcon,
  Error as CritIcon,
  Warning as HighIcon,
  Info as MedIcon,
  CheckCircle as LowIcon,
} from '@mui/icons-material'

const cards = [
  { key: 'total',    label: 'Total Risks',      icon: TotalIcon, color: 'primary.main',  bg: 'primary.light' },
  { key: 'critical', label: 'Critical',          icon: CritIcon,  color: 'error.main',    bg: '#fdecea' },
  { key: 'high',     label: 'High',              icon: HighIcon,  color: 'warning.dark',  bg: '#fff3e0' },
  { key: 'medium',   label: 'Medium',            icon: MedIcon,   color: 'info.main',     bg: '#e3f2fd' },
  { key: 'low',      label: 'Low',               icon: LowIcon,   color: 'success.main',  bg: '#e8f5e9' },
  { key: 'mitigated',label: 'Mitigated',         icon: LowIcon,   color: 'text.secondary',bg: 'action.hover' },
]

export default function RiskSummaryCards({ summary, loading }) {
  return (
    <Grid container spacing={2}>
      {cards.map(({ key, label, icon: Icon, color, bg }) => (
        <Grid item xs={6} sm={4} md={2} key={key}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5, borderRadius: 1.5,
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
