import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Chip,
  Divider,
  TextField,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Card,
  CardContent,
} from '@mui/material'
import {
  ArrowBack as ArrowBackIcon,
  Check as ApproveIcon,
  Close as RejectIcon,
  AttachFile as FileIcon,
  Send as SendIcon,
  History as HistoryIcon,
} from '@mui/icons-material'

import PageContainer from '@/components/common/layout/PageContainer'
import { fetchProcurementById, updateProcurement, addComment } from './procurementSlice'
import { showSnackbar } from '@/app/store/slices/uiSlice'
import { ROUTES } from '@/constants/routes'

export default function ProcurementDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { selected, loading } = useSelector((state) => state.procurement)
  const { user } = useSelector((state) => state.auth)

  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    dispatch(fetchProcurementById(id))
  }, [dispatch, id])

  const handleStatusUpdate = async (status) => {
    const auditAction = status === 'Approved' ? 'Approved' : 'Rejected'
    const updatedAuditLog = [
      ...(selected.auditLog || []),
      {
        action: auditAction,
        by: user?.name || 'System User',
        date: new Date().toISOString(),
      },
    ]

    const result = await dispatch(
      updateProcurement({
        id,
        data: {
          status,
          approvedBy: status === 'Approved' ? user?.name : null,
          approvedDate: status === 'Approved' ? new Date().toISOString().split('T')[0] : null,
          auditLog: updatedAuditLog,
        },
      })
    )

    if (updateProcurement.fulfilled.match(result)) {
      dispatch(showSnackbar({ message: `Requisition ${id} has been ${status.toLowerCase()}.`, severity: status === 'Approved' ? 'success' : 'error' }))
    }
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return
    dispatch(
      addComment({
        id,
        comment: {
          author: user?.name || 'System User',
          text: newComment.trim(),
        },
      })
    )
    setNewComment('')
    dispatch(showSnackbar({ message: 'Comment posted successfully.', severity: 'success' }))
  }

  const handleDownload = (filename) => {
    dispatch(showSnackbar({ message: `Downloading attachment: ${filename}...`, severity: 'info' }))
  }

  if (loading || !selected) {
    return (
      <PageContainer sx={{ p: 4, textAlign: 'center' }}>
        <Typography>Loading details...</Typography>
      </PageContainer>
    )
  }

  const getStatusColor = (status) => {
    if (status === 'Approved') return 'success'
    if (status === 'Pending Approval') return 'warning'
    if (status === 'Rejected') return 'error'
    return 'default'
  }

  const getPriorityColor = (priority) => {
    if (priority === 'Critical') return 'error'
    if (priority === 'High') return 'warning'
    if (priority === 'Medium') return 'info'
    return 'default'
  }

  const showApprovalButtons =
    selected.status === 'Pending Approval' &&
    (user?.role === 'Administrator' || user?.role === 'Procurement Manager')

  return (
    <PageContainer>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(ROUTES.PROCUREMENT)}
          sx={{ mb: 2, textTransform: 'none', fontWeight: 'bold' }}
        >
          Back to Requisitions
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Requisition Details
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ID: {selected.id} | Submitter: {selected.requestedBy}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Chip
              label={selected.status}
              color={getStatusColor(selected.status)}
              sx={{ fontWeight: 'bold' }}
            />
            <Chip
              label={`${selected.priority} Priority`}
              color={getPriorityColor(selected.priority)}
              variant="outlined"
              sx={{ fontWeight: 'bold' }}
            />
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card sx={{ borderRadius: 2, mb: 3, border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                {selected.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                {selected.description}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Procurement Category
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {selected.category}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Target Supplier
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {selected.vendor}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Budget Amount
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {selected.amount.toLocaleString()} {selected.currency || 'USD'}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Requested Date
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {selected.requestedDate}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Required Delivery Date
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {selected.requiredDate}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Approver
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {selected.approvedBy || 'N/A'}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {showApprovalButtons && (
            <Paper sx={{ p: 3, mb: 3, bgcolor: 'action.hover', border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
              <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 2 }}>
                Approval Routing Center
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<ApproveIcon />}
                  onClick={() => handleStatusUpdate('Approved')}
                  sx={{ borderRadius: 2, px: 3, fontWeight: 'bold' }}
                >
                  Approve Requisition
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<RejectIcon />}
                  onClick={() => handleStatusUpdate('Rejected')}
                  sx={{ borderRadius: 2, px: 3, fontWeight: 'bold' }}
                >
                  Reject Requisition
                </Button>
              </Box>
            </Paper>
          )}

          <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Comments & Collaboration
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 4 }}>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Ask a question or add details..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button variant="contained" endIcon={<SendIcon />} onClick={handleAddComment} sx={{ minWidth: 120 }}>
                  Post
                </Button>
              </Box>

              <List disablePadding>
                {selected.comments?.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 2 }}>
                    No comments posted yet.
                  </Typography>
                ) : (
                  selected.comments?.map((comment, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        px: 0,
                        py: 2,
                        alignItems: 'flex-start',
                        borderBottom: index < (selected.comments?.length || 0) - 1 ? '1px solid' : 'none',
                        borderColor: 'divider',
                      }}
                    >
                      <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', mr: 2, width: 34, height: 34, fontSize: '0.85rem' }}>
                        {comment.author?.charAt(0).toUpperCase() || 'U'}
                      </Avatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                            <Typography variant="subtitle2" fontWeight="bold">
                              {comment.author || 'Unknown'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {comment.date || 'Unknown date'}
                            </Typography>
                          </Box>
                        }
                        secondary={<Typography variant="body2" sx={{ mt: 1 }}>{comment.text}</Typography>}
                      />
                    </ListItem>
                  ))
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card sx={{ borderRadius: 2, mb: 3, border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                Attachments
              </Typography>
              {selected.attachments && selected.attachments.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
                  No files attached.
                </Typography>
              ) : (
                <List disablePadding>
                  {selected.attachments?.map((file, idx) => (
                    <ListItem
                      key={idx}
                      onClick={() => handleDownload(file)}
                      sx={{
                        px: 1.5,
                        py: 1,
                        borderRadius: 1.5,
                        border: '1px solid',
                        borderColor: 'divider',
                        mb: 1,
                        cursor: 'pointer',
                        '&:hover': { bgcolor: 'action.hover', borderColor: 'primary.main' },
                      }}
                    >
                      <FileIcon fontSize="small" color="action" sx={{ mr: 1.5 }} />
                      <ListItemText
                        primary={<Typography variant="body2" fontWeight="bold">{file}</Typography>}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <HistoryIcon color="action" /> Audit & Transition History
              </Typography>

              <List disablePadding sx={{ pl: 1 }}>
                {selected.auditLog?.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                    No audit history is available for this requisition.
                  </Typography>
                ) : (
                  selected.auditLog?.map((log, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        px: 0,
                        py: 1.5,
                        alignItems: 'flex-start',
                        borderLeft: index < (selected.auditLog?.length || 0) - 1 ? '2px solid' : 'none',
                        borderColor: 'divider',
                        pl: 2.5,
                        ml: 0.5,
                        position: 'relative',
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          left: -6,
                          top: 20,
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                        }}
                      />
                      <ListItemText
                        primary={<Typography variant="subtitle2" fontWeight="bold">{log.action}</Typography>}
                        secondary={
                          <Box sx={{ mt: 0.5 }}>
                            <Typography variant="caption" color="text.secondary" display="block">
                              By: {log.by || 'System'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" display="block">
                              Date: {log.date ? new Date(log.date).toLocaleString() : 'Unknown'}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  )
}
