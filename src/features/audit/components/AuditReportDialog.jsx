import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Divider, Grid, Paper, Box } from '@mui/material'

export default function AuditReportDialog({ open, onClose, item }) {
  if (!item) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Mock Audit Report</DialogTitle>
      <DialogContent dividers>
        <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>Procurement Audit Summary</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>{item.title}</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}><Typography variant="caption" color="text.secondary">Procurement ID</Typography><Typography variant="subtitle2">{item.id}</Typography></Grid>
            <Grid item xs={12} sm={6}><Typography variant="caption" color="text.secondary">Employee</Typography><Typography variant="subtitle2">{item.requestedBy}</Typography></Grid>
            <Grid item xs={12} sm={6}><Typography variant="caption" color="text.secondary">Department</Typography><Typography variant="subtitle2">{item.department}</Typography></Grid>
            <Grid item xs={12} sm={6}><Typography variant="caption" color="text.secondary">Vendor</Typography><Typography variant="subtitle2">{item.vendor}</Typography></Grid>
            <Grid item xs={12} sm={6}><Typography variant="caption" color="text.secondary">Budget</Typography><Typography variant="subtitle2">{Number(item.amount || 0).toLocaleString()} {item.currency || 'INR'}</Typography></Grid>
            <Grid item xs={12} sm={6}><Typography variant="caption" color="text.secondary">Audit Date</Typography><Typography variant="subtitle2">{item.auditDate || new Date().toISOString().split('T')[0]}</Typography></Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
          <Typography variant="subtitle1" fontWeight={700}>Approval Details</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Status: {item.status || 'Unknown'}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Compliance Result: {item.complianceStatus || 'Unknown'}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Audit Result: {item.auditStatus || 'Pending Audit'}</Typography>
          <Divider sx={{ my: 3 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">Prepared by: Auditor</Typography>
            <Typography variant="body2" color="text.secondary">Prepared on: {new Date().toISOString().split('T')[0]}</Typography>
          </Box>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
