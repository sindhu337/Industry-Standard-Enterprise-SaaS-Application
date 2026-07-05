import { Chip } from '@mui/material'

const STATUS_MAP = {
  'Compliant':     { color: 'success', label: 'Compliant' },
  'Non-Compliant': { color: 'error',   label: 'Non-Compliant' },
  'Under Review':  { color: 'warning', label: 'Under Review' },
  'Expired':       { color: 'error',   label: 'Expired', variant: 'outlined' },
}

const SEVERITY_MAP = {
  Critical: { color: 'error',   label: 'Critical' },
  High:     { color: 'error',   label: 'High',    variant: 'outlined' },
  Medium:   { color: 'warning', label: 'Medium' },
  Low:      { color: 'success', label: 'Low' },
}

export function ComplianceStatusChip({ status, size = 'small' }) {
  const cfg = STATUS_MAP[status] || { color: 'default', label: status }
  return (
    <Chip
      label={cfg.label}
      color={cfg.color}
      size={size}
      variant={cfg.variant || 'filled'}
      sx={{ fontWeight: 600, fontSize: '0.72rem', borderRadius: 1.5 }}
    />
  )
}

export function SeverityChip({ severity, size = 'small' }) {
  const cfg = SEVERITY_MAP[severity] || { color: 'default', label: severity }
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
