import { useMemo, useState } from 'react'
import { Box, Button, Stack, Typography, Chip } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ComplianceStatusChip } from './ComplianceStatusChip'
import { ROUTES } from '@/constants/routes'

function formatBudget(amount, currency = 'INR') {
  return `${Number(amount || 0).toLocaleString('en-IN')} ${currency}`
}

export default function ComplianceReviewTable({ rows = [], loading = false, onReviewAction }) {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const [processingId, setProcessingId] = useState(null)

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'Procurement ID', width: 150, renderCell: ({ value }) => <Typography variant="body2" fontWeight={700}>{value}</Typography> },
      { field: 'title', headerName: 'Request Title', flex: 1.2, minWidth: 220 },
      { field: 'requestedBy', headerName: 'Employee Name', width: 170 },
      { field: 'department', headerName: 'Department', width: 150 },
      { field: 'vendor', headerName: 'Vendor', width: 180 },
      {
        field: 'amount',
        headerName: 'Budget',
        width: 140,
        valueFormatter: (params) => formatBudget(params?.row?.amount, params?.row?.currency),
      },
      { field: 'status', headerName: 'Procurement Status', width: 150, renderCell: ({ value }) => <Chip label={value} size="small" color="success" variant="outlined" /> },
      {
        field: 'complianceStatus',
        headerName: 'Compliance Status',
        width: 190,
        renderCell: ({ value }) => <ComplianceStatusChip status={value || 'Pending Review'} />,
      },
      { field: 'requestedDate', headerName: 'Submitted Date', width: 150 },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 230,
        sortable: false,
        filterable: false,
        renderCell: ({ row }) => (
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', height: '100%' }}>
            <Button size="small" variant="outlined" onClick={() => navigate(`/procurement/${row.id}`)}>
              View Details
            </Button>
            <Button size="small" color="success" variant="contained" onClick={() => { setProcessingId(row.id); onReviewAction?.(row.id, 'Compliant', user?.name) }} disabled={processingId === row.id}>
              Compliant
            </Button>
            <Button size="small" color="error" variant="contained" onClick={() => { setProcessingId(row.id); onReviewAction?.(row.id, 'Non-Compliant', user?.name) }} disabled={processingId === row.id}>
              Non-Compliant
            </Button>
            <Button size="small" color="warning" variant="contained" onClick={() => { setProcessingId(row.id); onReviewAction?.(row.id, 'Additional Information Required', user?.name) }} disabled={processingId === row.id}>
              Request Info
            </Button>
          </Stack>
        ),
      },
    ],
    [navigate, onReviewAction, processingId, user?.name],
  )

  return (
    <Box>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
        Review approved requisitions and update the compliance posture for each request.
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        autoHeight
        disableRowSelectionOnClick
        pageSizeOptions={[10, 25]}
        initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
        sx={{
          borderRadius: 1.5,
          border: '1px solid',
          borderColor: 'divider',
          '& .MuiDataGrid-columnHeaders': { bgcolor: 'action.hover', fontWeight: 700 },
          '& .MuiDataGrid-row:hover': { bgcolor: 'action.hover' },
        }}
      />
    </Box>
  )
}
