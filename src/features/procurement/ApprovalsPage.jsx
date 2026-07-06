import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  Box,
  Paper,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Button,
  Stack,
  Divider,
  TextField,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import {
  Visibility as ViewIcon,
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Reply as SendBackIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material'

import PageContainer from '@/components/common/layout/PageContainer'
import { ROUTES } from '@/constants/routes'
import { useProcurement } from './hooks/useProcurement'
import { StatusChip, PriorityChip } from './components/StatusChip'
import ApprovalDecisionDialog from './components/ApprovalDecisionDialog'

function formatBudget(amount, currency = 'INR') {
  return `${Number(amount || 0).toLocaleString('en-IN')} ${currency}`
}

export default function ApprovalsPage() {
  const navigate = useNavigate()
  const { items, loading, loadAll, submitApproval } = useProcurement()
  const { user } = useSelector((state) => state.auth)

  const [pendingAction, setPendingAction] = useState(null)
  const [processingId, setProcessingId] = useState(null)
  const [decisionText, setDecisionText] = useState('')

  const canManageApprovals = user?.role === 'Procurement Manager'

  const rows = useMemo(
    () =>
      [...items].sort((left, right) => {
        const leftDate = new Date(left.requestedDate || left.createdAt || 0).getTime()
        const rightDate = new Date(right.requestedDate || right.createdAt || 0).getTime()
        return rightDate - leftDate
      }),
    [items],
  )

  useEffect(() => {
    loadAll()
  }, [loadAll])

  const handleDecision = async (id, status, details = {}) => {
    setProcessingId(id)
    await submitApproval(id, status, details)
    setProcessingId(null)
    setPendingAction(null)
    setDecisionText('')
  }

  const columns = [
    {
      field: 'id',
      headerName: 'Procurement ID',
      width: 150,
      renderCell: (params) => (
        <Box
          component="span"
          sx={{ fontWeight: 700, color: 'primary.main', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
          onClick={() => navigate(`/procurement/${params.value}`)}
        >
          {params.value}
        </Box>
      ),
    },
    { field: 'title', headerName: 'Title', flex: 1.2, minWidth: 220 },
    { field: 'requestedBy', headerName: 'Employee Name', width: 170 },
    { field: 'department', headerName: 'Department', width: 150 },
    { field: 'vendor', headerName: 'Preferred Vendor', width: 180 },
    {
      field: 'amount',
      headerName: 'Estimated Budget',
      width: 140,
      valueFormatter: (params) => formatBudget(params?.row?.amount, params?.row?.currency),
    },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 120,
      renderCell: (params) => <PriorityChip priority={params.value} />,
    },
    {
      field: 'status',
      headerName: 'Current Status',
      width: 150,
      renderCell: (params) => <StatusChip status={params.value} />,
    },
    {
      field: 'requestedDate',
      headerName: 'Submitted Date',
      width: 150,
      valueFormatter: (params) => params?.row?.requestedDate || params?.row?.createdAt || '—',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', height: '100%' }}>
          <Tooltip title="View Details">
            <IconButton size="small" color="primary" onClick={() => navigate(`/procurement/${params.row.id}`)}>
              <ViewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {canManageApprovals && (
            <>
              <Tooltip title="Approve">
                <IconButton
                  size="small"
                  color="success"
                  onClick={() => setPendingAction({ id: params.row.id, title: params.row.title, status: 'Approved' })}
                  disabled={processingId === params.row.id}
                >
                  <ApproveIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Reject">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => setPendingAction({ id: params.row.id, title: params.row.title, status: 'Rejected' })}
                  disabled={processingId === params.row.id}
                >
                  <RejectIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Send Back for Revision">
                <IconButton
                  size="small"
                  color="warning"
                  onClick={() => setPendingAction({ id: params.row.id, title: params.row.title, status: 'Revision Required' })}
                  disabled={processingId === params.row.id}
                >
                  <SendBackIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Stack>
      ),
    },
  ]

  return (
    <PageContainer>
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
        <Box>
          <Typography variant="h3" fontWeight={700} id="approval-workbench-title">
            Approval Workbench
          </Typography>
          <Typography variant="body2" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
            Review procurement requests, approve spend, reject exceptions, or send requests back for revision.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
          {!canManageApprovals && (
            <Chip label="Read only" variant="outlined" color="default" sx={{ fontWeight: 500 }} />
          )}
          <Button variant="outlined" startIcon={<RefreshIcon />} onClick={loadAll} sx={{ borderRadius: 1.5, px: 2, py: 0.5, fontWeight: 700 }}>
            Refresh
          </Button>
        </Box>
      </Box>

      <Paper elevation={0} sx={{ borderRadius: 1.5, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ px: 2.5, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1.5 }}>
          <Box>
            <Typography variant="subtitle1" fontWeight={700}>
              All Procurement Requests
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Visible to {user?.role || 'authorized reviewers'} with current workflow status and action controls.
            </Typography>
          </Box>
          <Chip label={`${rows.length} Requests`} color="primary" variant="outlined" sx={{ fontWeight: 700 }} />
        </Box>
        <Divider />
        <Box sx={{ width: '100%', overflowX: 'auto' }}>
          <Box sx={{ minWidth: 1100 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              loading={loading}
              pageSizeOptions={[5, 10, 25]}
              initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
              disableRowSelectionOnClick
              autoHeight
              sx={{
                border: 'none',
                '& .MuiDataGrid-columnHeaders': {
                  bgcolor: 'action.selected',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                },
                '& .MuiDataGrid-row:hover': {
                  bgcolor: 'action.hover',
                },
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                },
              }}
            />
          </Box>
        </Box>
      </Paper>

      <ApprovalDecisionDialog
        open={Boolean(pendingAction)}
        title={
          pendingAction?.status === 'Approved'
            ? 'Approve Procurement Request'
            : pendingAction?.status === 'Rejected'
              ? 'Reject Procurement Request'
              : 'Send Back for Revision'
        }
        message={
          pendingAction?.status === 'Approved'
            ? `Approve "${pendingAction?.title}" and move the request to Approved status?`
            : pendingAction?.status === 'Rejected'
              ? `Reject "${pendingAction?.title}" and close the request as Rejected?`
              : `Send "${pendingAction?.title}" back to the employee for revision?`
        }
        confirmLabel={pendingAction?.status === 'Approved' ? 'Approve' : pendingAction?.status === 'Rejected' ? 'Reject' : 'Send Back'}
        confirmColor={pendingAction?.status === 'Approved' ? 'success' : pendingAction?.status === 'Rejected' ? 'error' : 'warning'}
        loading={Boolean(processingId && pendingAction?.id === processingId)}
        confirmDisabled={Boolean(
          pendingAction?.status !== 'Approved' && !decisionText.trim(),
        )}
        onClose={() => {
          setPendingAction(null)
          setDecisionText('')
        }}
        onConfirm={() =>
          handleDecision(
            pendingAction.id,
            pendingAction.status,
            pendingAction.status === 'Rejected'
              ? { reason: decisionText.trim() }
              : pendingAction.status === 'Revision Required'
                ? { comments: decisionText.trim() }
                : {},
          )
        }
      >
        {pendingAction?.status !== 'Approved' && (
          <TextField
            autoFocus
            fullWidth
            multiline
            minRows={3}
            label={pendingAction?.status === 'Rejected' ? 'Rejection Reason' : 'Revision Comments'}
            placeholder={pendingAction?.status === 'Rejected' ? 'Explain why this request is being rejected.' : 'Describe the changes required before resubmission.'}
            value={decisionText}
            onChange={(event) => setDecisionText(event.target.value)}
          />
        )}
      </ApprovalDecisionDialog>
    </PageContainer>
  )
}
