import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material'

export default function ApprovalDecisionDialog({
  open,
  title,
  message,
  confirmLabel,
  confirmColor = 'primary',
  onConfirm,
  onClose,
  loading = false,
  confirmDisabled = false,
  children,
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>{title}</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            {message}
          </Typography>
          {children && <Box sx={{ mt: 2 }}>{children}</Box>}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button variant="outlined" onClick={onClose} disabled={loading} sx={{ borderRadius: 2 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color={confirmColor}
          onClick={onConfirm}
          disabled={loading || confirmDisabled}
          sx={{ borderRadius: 2, fontWeight: 700 }}
        >
          {loading ? 'Processing…' : confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
