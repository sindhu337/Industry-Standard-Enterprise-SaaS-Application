import { Chip } from '@mui/material'

const LEVEL_MAP = {
  Critical: { color: 'error',   label: 'Critical' },
  High:     { color: 'error',   label: 'High',    variant: 'outlined' },
  Medium:   { color: 'warning', label: 'Medium' },
  Low:      { color: 'success', label: 'Low' },
}

const STATUS_MAP = {
  'Open':        { color: 'error',   label: 'Open' },
  'In Progress': { color: 'warning', label: 'In Progress' },
  'Mitigated':   { color: 'info',    label: 'Mitigated' },
  'Closed':      { color: 'default', label: 'Closed' },
}

export function RiskLevelChip({ level, size = 'small' }) {
  const cfg = LEVEL_MAP[level] || { color: 'default', label: level }
  return (
    <Chip
      label={cfg.label}
      color={cfg.color}
      size={size}
      variant={cfg.variant || 'filled'}
      sx={{ fontWeight: 700, fontSize: '0.72rem', borderRadius: 1.5 }}
    />
  )
}

export function RiskStatusChip({ status, size = 'small' }) {
  const cfg = STATUS_MAP[status] || { color: 'default', label: status }
  return (
    <Chip
      label={cfg.label}
      color={cfg.color}
      size={size}
      variant="outlined"
      sx={{ fontWeight: 600, fontSize: '0.72rem', borderRadius: 1.5 }}
    />
  )
}
