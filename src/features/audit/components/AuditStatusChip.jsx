import { Chip } from '@mui/material'

const STATUS_MAP = {
  'Open':        { color: 'info',    label: 'Open' },
  'In Progress': { color: 'warning', label: 'In Progress' },
  'Closed':      { color: 'success', label: 'Closed' },
  'Escalated':   { color: 'error',   label: 'Escalated' },
}

const TYPE_MAP = {
  Internal:   { color: 'primary',  variant: 'outlined' },
  External:   { color: 'secondary', variant: 'outlined' },
  Regulatory: { color: 'error',     variant: 'outlined' },
  Compliance: { color: 'info',      variant: 'outlined' },
  IT:         { color: 'default',   variant: 'outlined' },
}

export function AuditStatusChip({ status, size = 'small' }) {
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

export function AuditTypeChip({ type, size = 'small' }) {
  const cfg = TYPE_MAP[type] || { color: 'default', variant: 'outlined' }
  return (
    <Chip
      label={type}
      color={cfg.color}
      size={size}
      variant={cfg.variant}
      sx={{ fontWeight: 500, fontSize: '0.72rem', borderRadius: 1.5 }}
    />
  )
}
