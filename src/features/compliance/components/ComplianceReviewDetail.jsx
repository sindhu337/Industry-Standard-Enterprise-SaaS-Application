import { useState } from 'react'
import { Box, Card, CardContent, Grid, Typography, TextField, Button, Chip, Divider, Stack } from '@mui/material'
import { Assignment as AssignmentIcon, AttachFile as AttachFileIcon } from '@mui/icons-material'
import { ComplianceStatusChip } from './ComplianceStatusChip'

export default function ComplianceReviewDetail({ item, onReviewAction, onAddComment }) {
  const [commentText, setCommentText] = useState('')

  if (!item) return null

  const reviewComments = item.comments || []

  return (
    <Box>
      <Card elevation={0} sx={{ borderRadius: 1.5, border: '1px solid', borderColor: 'divider', mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <Box>
              <Typography variant="h6" fontWeight={700}>{item.title}</Typography>
              <Typography variant="caption" color="text.secondary">{item.id} · Requested by {item.requestedBy}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <ComplianceStatusChip status={item.complianceStatus || 'Pending Review'} />
              <Chip label={item.status} color="success" variant="outlined" size="small" />
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>{item.description}</Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={2}>
            <Grid size={{xs: 6, sm: 4}}><Typography variant="caption" color="text.secondary">Vendor</Typography><Typography variant="subtitle2" fontWeight={700}>{item.vendor}</Typography></Grid>
            <Grid size={{xs: 6, sm: 4}}><Typography variant="caption" color="text.secondary">Budget</Typography><Typography variant="subtitle2" fontWeight={700}>{item.amount?.toLocaleString()} {item.currency || 'INR'}</Typography></Grid>
            <Grid size={{xs: 6, sm: 4}}><Typography variant="caption" color="text.secondary">Department</Typography><Typography variant="subtitle2" fontWeight={700}>{item.department}</Typography></Grid>
            <Grid size={{xs: 6, sm: 4}}><Typography variant="caption" color="text.secondary">Submitted Date</Typography><Typography variant="subtitle2" fontWeight={700}>{item.requestedDate}</Typography></Grid>
            <Grid size={{xs: 6, sm: 4}}><Typography variant="caption" color="text.secondary">Reviewed By</Typography><Typography variant="subtitle2" fontWeight={700}>{item.reviewedBy || '—'}</Typography></Grid>
            <Grid size={{xs: 6, sm: 4}}><Typography variant="caption" color="text.secondary">Reviewed Date</Typography><Typography variant="subtitle2" fontWeight={700}>{item.reviewedDate || '—'}</Typography></Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card elevation={0} sx={{ borderRadius: 1.5, border: '1px solid', borderColor: 'divider', mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="subtitle1" fontWeight={700} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}><AssignmentIcon /> Review Notes</Typography>
          <TextField
            fullWidth
            multiline
            minRows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add review comments or request additional information."
          />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
            <Button variant="contained" color="success" onClick={() => { onReviewAction?.(item.id, 'Compliant'); setCommentText('') }}>
              Mark Compliant
            </Button>
            <Button variant="contained" color="error" onClick={() => { onReviewAction?.(item.id, 'Non-Compliant'); setCommentText('') }}>
              Mark Non-Compliant
            </Button>
            <Button variant="contained" color="warning" onClick={() => { onReviewAction?.(item.id, 'Additional Information Required'); setCommentText('') }}>
              Request More Information
            </Button>
            <Button variant="outlined" onClick={() => { onAddComment?.(item.id, commentText); setCommentText('') }}>
              Save Note
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card elevation={0} sx={{ borderRadius: 1.5, border: '1px solid', borderColor: 'divider', mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="subtitle1" fontWeight={700} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}><AttachFileIcon /> Attachments</Typography>
          <Typography variant="body2" color="text.secondary">{(item.attachments || []).join(', ') || 'No attachments attached to this request.'}</Typography>
        </CardContent>
      </Card>

      <Card elevation={0} sx={{ borderRadius: 1.5, border: '1px solid', borderColor: 'divider' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>Review History</Typography>
          {reviewComments.length ? (
            <Stack spacing={1}>
              {reviewComments.map((comment, index) => (
                <Box key={index} sx={{ p: 2, borderRadius: 2, bgcolor: 'action.hover' }}>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{comment.author}</Typography>
                  <Typography variant="caption" color="text.secondary">{comment.date}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>{comment.text}</Typography>
                </Box>
              ))}
            </Stack>
          ) : (
            <Typography variant="body2" color="text.secondary">No review notes are available for this request.</Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}
