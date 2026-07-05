/**
 * ProcurementDetails – Full detail view for a single procurement request
 * Shows: summary, approval actions, comments, attachments, audit timeline
 */
import { useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Paper,
  Chip,
  Skeleton,
} from '@mui/material'
import {
  Check as ApproveIcon,
  Close as RejectIcon,
  AttachFile as FileIcon,
  Send as SendIcon,
  Timeline as TimelineIcon,
  ModeComment as CommentIcon,
} from '@mui/icons-material'

import { StatusChip, PriorityChip } from './StatusChip'

function InfoField({ label, value }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.25 }}>
        {label}
      </Typography>
      <Typography variant="subtitle2" fontWeight={700}>
        {value || '—'}
      </Typography>
    </Box>
  )
}

export default function ProcurementDetails({
  item,
  loading = false,
  canApprove = false,
  onApprove,
  onReject,
  onPostComment,
}) {
  const [commentText, setCommentText] = useState('')
  const [posting, setPosting] = useState(false)

  if (loading) {
    return (
      <Box>
        <Skeleton variant="rounded" height={240} sx={{ mb: 3, borderRadius: 3 }} />
        <Skeleton variant="rounded" height={180} sx={{ borderRadius: 3 }} />
      </Box>
    )
  }

  if (!item) return null

  const showApprovalBar =
    item.status === 'Pending Approval' && canApprove
  const decisionLabel =
    item.status === 'Rejected'
      ? 'Rejection Reason'
      : item.status === 'Revision Required'
        ? 'Revision Comments'
        : 'Approved Date'
  const decisionValue =
    item.status === 'Rejected'
      ? item.rejectionReason
      : item.status === 'Revision Required'
        ? item.revisionComments
        : item.approvedDate

  const handleComment = async () => {
    if (!commentText.trim()) return
    setPosting(true)
    await onPostComment?.(commentText)
    setCommentText('')
    setPosting(false)
  }

  const handleDownload = (filename) => {
    // Mock download – in production, trigger a presigned URL fetch
    window.dispatchEvent(
      new CustomEvent('mock-download', { detail: { filename } }),
    )
  }

  return (
    <Grid container spacing={3}>
      {/* ── Left column ─────────────────────────────────────────────── */}
      <Grid item xs={12} lg={8}>
        {/* Summary card */}
        <Card
          elevation={0}
          sx={{ borderRadius: 3, mb: 3, border: '1px solid', borderColor: 'divider' }}
        >
          <CardContent sx={{ p: 3 }}>
            {/* Header row */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1.5, mb: 2.5 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
                  {item.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.id} · Requested by <strong>{item.requestedBy}</strong> · {item.requestedDate}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
                <StatusChip status={item.status} />
                <PriorityChip priority={item.priority} />
              </Box>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
              {item.description}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={6} sm={4}>
                <InfoField label="Category" value={item.category} />
              </Grid>
              <Grid item xs={6} sm={4}>
                <InfoField label="Vendor" value={item.vendor} />
              </Grid>
              <Grid item xs={6} sm={4}>
                <InfoField label="Budget" value={`${Number(item.amount).toLocaleString()} ${item.currency || 'USD'}`} />
              </Grid>
              <Grid item xs={6} sm={4}>
                <InfoField label="Department" value={item.department} />
              </Grid>
              <Grid item xs={6} sm={4}>
                <InfoField label="Required Date" value={item.requiredDate} />
              </Grid>
              <Grid item xs={6} sm={4}>
                <InfoField label="Approved By" value={item.approvedBy} />
              </Grid>
              <Grid item xs={6} sm={4}>
                <InfoField label={decisionLabel} value={decisionValue} />
              </Grid>
              <Grid item xs={6} sm={4}>
                <InfoField label="Reviewed By" value={item.reviewedBy} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Approval action bar */}
        {showApprovalBar && (
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'warning.main',
              bgcolor: 'action.hover',
            }}
          >
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2, color: 'warning.main' }}>
              ⏳ Awaiting Your Approval
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                color="success"
                startIcon={<ApproveIcon />}
                onClick={onApprove}
                id="btn-approve"
                sx={{ borderRadius: 2, px: 3, fontWeight: 700 }}
              >
                Approve Requisition
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<RejectIcon />}
                onClick={onReject}
                id="btn-reject"
                sx={{ borderRadius: 2, px: 3, fontWeight: 700 }}
              >
                Reject Requisition
              </Button>
            </Box>
          </Paper>
        )}

        {/* Comments */}
        <Card
          elevation={0}
          sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <CommentIcon color="action" /> Comments &amp; Collaboration
              {item.comments?.length > 0 && (
                <Chip
                  label={item.comments.length}
                  size="small"
                  sx={{ ml: 1, fontWeight: 700, fontSize: '0.7rem' }}
                />
              )}
            </Typography>

            {/* New comment */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'flex-start' }}>
              <TextField
                size="small"
                fullWidth
                multiline
                minRows={2}
                placeholder="Add a comment, ask a question, or provide context…"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                id="field-new-comment"
                disabled={posting}
              />
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleComment}
                disabled={posting || !commentText.trim()}
                id="btn-post-comment"
                sx={{ borderRadius: 2, px: 2, py: 0.8, fontWeight: 700, whiteSpace: 'nowrap', mt: 0.5 }}
              >
                Post
              </Button>
            </Box>

            {/* Comment list */}
            {!item.comments || item.comments.length === 0 ? (
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ py: 3 }}
              >
                No comments yet. Be the first to add one.
              </Typography>
            ) : (
              <List disablePadding>
                {item.comments.map((c, idx) => (
                  <ListItem
                    key={idx}
                    alignItems="flex-start"
                    sx={{
                      px: 0,
                      py: 2,
                      borderBottom:
                        idx < item.comments.length - 1 ? '1px solid' : 'none',
                      borderColor: 'divider',
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        mr: 2,
                        fontSize: '0.85rem',
                        bgcolor: 'primary.main',
                        flexShrink: 0,
                      }}
                    >
                      {c.author?.charAt(0).toUpperCase()}
                    </Avatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle2" fontWeight={700}>
                            {c.author}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {c.date}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Typography variant="body2" sx={{ mt: 0.5, lineHeight: 1.6 }}>
                          {c.text}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* ── Right column ─────────────────────────────────────────────── */}
      <Grid item xs={12} lg={4}>
        {/* Attachments */}
        <Card
          elevation={0}
          sx={{ borderRadius: 3, mb: 3, border: '1px solid', borderColor: 'divider' }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
              Attachments
            </Typography>

            {!item.attachments || item.attachments.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No files attached to this request.
              </Typography>
            ) : (
              <List disablePadding>
                {item.attachments.map((file, idx) => (
                  <ListItem
                    key={idx}
                    onClick={() => handleDownload(file)}
                    sx={{
                      px: 1.5,
                      py: 1,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      mb: 1,
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'action.hover',
                        borderColor: 'primary.main',
                      },
                    }}
                  >
                    <FileIcon fontSize="small" color="action" sx={{ mr: 1.5, flexShrink: 0 }} />
                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          noWrap
                          title={file}
                          id={`attachment-${idx}`}
                        >
                          {file}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </CardContent>
        </Card>

        {/* Audit & Timeline */}
        <Card
          elevation={0}
          sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{ mb: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <TimelineIcon color="action" /> Approval History
            </Typography>

            {!item.auditLog || item.auditLog.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No audit entries yet.
              </Typography>
            ) : (
              <Box sx={{ position: 'relative', pl: 2.5, ml: 1 }}>
                {item.auditLog.map((log, idx) => {
                  const isLast = idx === item.auditLog.length - 1
                  return (
                    <Box
                      key={idx}
                      sx={{
                        position: 'relative',
                        pb: isLast ? 0 : 2.5,
                        '&::before': isLast
                          ? {}
                          : {
                              content: '""',
                              position: 'absolute',
                              left: -12,
                              top: 10,
                              bottom: 0,
                              width: 2,
                              bgcolor: 'divider',
                            },
                      }}
                    >
                      {/* Dot */}
                      <Box
                        sx={{
                          position: 'absolute',
                          left: -17,
                          top: 5,
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          bgcolor: isLast ? 'primary.main' : 'text.disabled',
                          border: '2px solid',
                          borderColor: isLast ? 'primary.main' : 'divider',
                        }}
                      />
                      <Typography variant="subtitle2" fontWeight={700} sx={{ lineHeight: 1.4 }}>
                        {log.action}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {log.by}
                      </Typography>
                      <Typography variant="caption" color="text.disabled" display="block">
                        {new Date(log.date).toLocaleString()}
                      </Typography>
                    </Box>
                  )
                })}
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
