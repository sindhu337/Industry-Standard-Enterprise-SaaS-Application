import { Chip } from '@mui/material'

const STATUS_MAP = {
  Active:         { color: 'success', label: 'Active' },
  Inactive:       { color: 'default', label: 'Inactive' },
  Blacklisted:    { color: 'error',   label: 'Blacklisted' },
  'Pending Review': { color: 'warning', label: 'Pending Review' },
}

const RISK_MAP = {
  Low:      { color: 'success', label: 'Low' },
  Medium:   { color: 'warning', label: 'Medium' },
  High:     { color: 'error',   label: 'High' },
  Critical: { color: 'error',   label: 'Critical' },
}

export function VendorStatusChip({ status, size = 'small' }) {
  const cfg = STATUS_MAP[status] || { color: 'default', label: status }
  return (
    <Chip
      label={cfg.label}
      color={cfg.color}
      size={size}
      sx={{ fontWeight: 600, fontSize: '0.72rem', borderRadius: 1.5 }}
    />
  )
}

export function VendorRiskChip({ level, size = 'small' }) {
  const cfg = RISK_MAP[level] || { color: 'default', label: level }
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
