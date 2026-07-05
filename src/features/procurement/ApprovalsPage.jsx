import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material'
import {
  Check as ApproveIcon,
  Close as RejectIcon,
  Visibility as ViewIcon,
  AssignmentTurnedIn as VerifiedIcon,
} from '@mui/icons-material'

import PageContainer from '@/components/common/layout/PageContainer'
import { fetchProcurements, updateProcurement } from './procurementSlice'
import { showSnackbar } from '@/app/store/slices/uiSlice'

export default function ApprovalsPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, loading } = useSelector((state) => state.procurement)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchProcurements())
  }, [dispatch])

  const pendingRequests = items.filter((item) => item.status === 'Pending Approval')

  const handleStatusUpdate = async (id, title, status) => {
    const item = items.find((i) => i.id === id)
    const auditAction = status === 'Approved' ? 'Approved' : 'Rejected'
    const updatedAuditLog = [
      ...(item?.auditLog || []),
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
      dispatch(
        showSnackbar({
          message: `Requisition "${title}" has been ${status.toLowerCase()}.`,
          severity: status === 'Approved' ? 'success' : 'error',
        })
      )
    }
  }

  const isAuthorized = user?.role === 'Administrator' || user?.role === 'Procurement Manager'

  return (
    <PageContainer>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Approval Workbench
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Review and approve pending corporate spend requests matching your signing limits
        </Typography>
      </Box>

      {!isAuthorized ? (
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
          <Typography variant="h6" color="text.secondary">
            Access Restricted
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Only Administrators and Procurement Managers are authorized to perform sign-offs.
          </Typography>
        </Paper>
      ) : pendingRequests.length === 0 ? (
        <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 2 }}>
          <VerifiedIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
          <Typography variant="h6" fontWeight="bold">
            All Caught Up!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            There are no procurement requests pending your authorization.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {pendingRequests.map((req) => (
            <Grid item xs={12} key={req.id}>
              <Card sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, boxShadow: 1 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1, flexWrap: 'wrap' }}>
                        <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                          {req.title}
                        </Typography>
                        <Chip label={req.id} size="small" sx={{ fontWeight: 'bold' }} />
                        <Chip
                          label={`${req.priority} Priority`}
                          color={req.priority === 'Critical' ? 'error' : req.priority === 'High' ? 'warning' : 'info'}
                          size="small"
                          sx={{ fontWeight: 'bold' }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {req.description}
                      </Typography>

                      <Grid container spacing={2}>
                        <Grid item xs={6} sm={3}>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Requester
                          </Typography>
                          <Typography variant="body2" fontWeight="bold">
                            {req.requestedBy} ({req.department})
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Vendor
                          </Typography>
                          <Typography variant="body2" fontWeight="bold">
                            {req.vendor}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Total Budget
                          </Typography>
                          <Typography variant="body2" fontWeight="bold" color="primary.main">
                            {req.amount.toLocaleString()} {req.currency || 'USD'}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Request Date
                          </Typography>
                          <Typography variant="body2" fontWeight="bold">
                            {req.requestedDate}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, alignSelf: { xs: 'flex-start', sm: 'center' } }}>
                      <Tooltip title="View Details">
                        <IconButton
                          onClick={() => navigate(`/procurement/${req.id}`)}
                          color="primary"
                          sx={{ border: '1px solid', borderColor: 'divider' }}
                        >
                          <ViewIcon />
                        </IconButton>
                      </Tooltip>
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<ApproveIcon />}
                        onClick={() => handleStatusUpdate(req.id, req.title, 'Approved')}
                        sx={{ borderRadius: 2, fontWeight: 'bold' }}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<RejectIcon />}
                        onClick={() => handleStatusUpdate(req.id, req.title, 'Rejected')}
                        sx={{ borderRadius: 2, fontWeight: 'bold' }}
                      >
                        Reject
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </PageContainer>
  )
}
