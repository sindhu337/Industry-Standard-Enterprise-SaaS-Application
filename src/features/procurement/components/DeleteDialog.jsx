/**
 * DeleteDialog – Confirmation dialog for procurement request deletion
 */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
} from '@mui/material'
import { Delete as DeleteIcon, WarningAmber as WarnIcon } from '@mui/icons-material'

export default function DeleteDialog({ open, onClose, onConfirm, item, loading = false }) {
  if (!item) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      aria-labelledby="delete-dialog-title"
      slotProps={{ paper: { sx: { borderRadius: 3 } } }}
    >
      <DialogTitle id="delete-dialog-title" sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              bgcolor: 'error.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <WarnIcon sx={{ color: 'error.contrastText', fontSize: 20 }} />
          </Box>
          <Typography variant="h6" fontWeight="bold">
            Delete Requisition
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          Are you sure you want to permanently delete the following requisition? This action cannot
          be undone.
        </Typography>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: 'action.hover',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="caption" color="text.secondary" display="block">
            {item.id}
          </Typography>
          <Typography variant="subtitle2" fontWeight="bold">
            {item.title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {item.department} · {item.vendor}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={loading}
          id="btn-cancel-delete"
          sx={{ borderRadius: 2, px: 2.5 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={onConfirm}
          disabled={loading}
          id="btn-confirm-delete"
          sx={{ borderRadius: 2, px: 2.5, fontWeight: 700 }}
        >
          {loading ? 'Deleting…' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
