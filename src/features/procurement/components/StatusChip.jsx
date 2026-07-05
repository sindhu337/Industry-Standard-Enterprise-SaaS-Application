


import { Chip } from '@mui/material';

const STATUS_CONFIG = {
  Approved: { color: 'success', variant: 'filled' },
  Pending: { color: 'warning', variant: 'filled' },
  'In Review': { color: 'secondary', variant: 'filled' },
  'Revision Required': { color: 'warning', variant: 'outlined' },
  Rejected: { color: 'error', variant: 'filled' },
  Draft: { color: 'default', variant: 'outlined' },
  Completed: { color: 'info', variant: 'filled' }
};

const PRIORITY_CONFIG = {
  Critical: { color: 'error', variant: 'filled' },
  High: { color: 'warning', variant: 'outlined' },
  Medium: { color: 'info', variant: 'outlined' },
  Low: { color: 'default', variant: 'outlined' }
};

export function StatusChip({ status, size = 'small' }) {
  const config = STATUS_CONFIG[status] || { color: 'default', variant: 'outlined' };
  return (
    <Chip
      label={status}
      color={config.color}
      variant={config.variant}
      size={size}
      sx={{ fontWeight: 700, letterSpacing: 0.2 }} />);


}

export function PriorityChip({ priority, size = 'small' }) {
  const config = PRIORITY_CONFIG[priority] || { color: 'default', variant: 'outlined' };
  return (
    <Chip
      label={priority}
      color={config.color}
      variant={config.variant}
      size={size}
      sx={{ fontWeight: 700, letterSpacing: 0.2 }} />);


}