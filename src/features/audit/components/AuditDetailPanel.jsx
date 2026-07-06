import { Box, Card, CardContent, Divider, Grid, Stack, Typography, Chip } from '@mui/material'
import { Person as PersonIcon, Business as VendorIcon, Description as DocumentIcon, Timeline as TimelineIcon } from '@mui/icons-material'

export default function AuditDetailPanel({ item }) {
  if (!item) return null

  return (
    <Box>
      <Card elevation={0} sx={{ borderRadius: 1.5, border: '1px solid', borderColor: 'divider', mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5 }}>{item.title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.75 }}>{item.description}</Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
            <Chip label={item.status || 'Status Unknown'} color="success" variant="outlined" />
            <Chip label={item.complianceStatus || 'Compliance Unknown'} color="info" variant="outlined" />
            <Chip label={item.auditStatus || 'Pending Audit'} color="warning" />
          </Stack>
          <Typography variant="body2" color="text.secondary">
            This panel summarizes procurement and audit status data for the selected request. Use the timeline below to trace the request lifecycle.
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ borderRadius: 1.5, border: '1px solid', borderColor: 'divider', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}><PersonIcon color="action" /> <Typography variant="subtitle1" fontWeight={700}>Employee & Procurement Details</Typography></Box>
              <Typography variant="body2" color="text.secondary">Employee: {item.requestedBy}</Typography>
              <Typography variant="body2" color="text.secondary">Department: {item.department}</Typography>
              <Typography variant="body2" color="text.secondary">Budget: {Number(item.amount || 0).toLocaleString()} {item.currency || 'INR'}</Typography>
              <Typography variant="body2" color="text.secondary">Submitted: {item.requestedDate}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ borderRadius: 1.5, border: '1px solid', borderColor: 'divider', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}><VendorIcon color="action" /> <Typography variant="subtitle1" fontWeight={700}>Vendor Information</Typography></Box>
              <Typography variant="body2" color="text.secondary">Vendor: {item.vendor}</Typography>
              <Typography variant="body2" color="text.secondary">Category: {item.category}</Typography>
              <Typography variant="body2" color="text.secondary">Priority: {item.priority}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ borderRadius: 1.5, border: '1px solid', borderColor: 'divider', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}><DocumentIcon color="action" /> <Typography variant="subtitle1" fontWeight={700}>Attachments</Typography></Box>
              <Typography variant="body2" color="text.secondary">{item.attachments?.length ? item.attachments.join(', ') : 'No attachments available for this mock audit flow.'}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ borderRadius: 1.5, border: '1px solid', borderColor: 'divider', height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}><TimelineIcon color="action" /> <Typography variant="subtitle1" fontWeight={700}>Lifecycle Timeline</Typography></Box>
              <Typography variant="body2" color="text.secondary">Employee Created Request → Procurement Manager Approval → Compliance Review → Audit Review</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Approval: {item.reviewedBy || 'Pending'}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Compliance Review: {item.reviewedDate || 'Pending'}</Typography>
              <Typography variant="body2" color="text.secondary">Audit Status: {item.auditStatus || 'Pending Audit'}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
