import { useMemo, useState } from 'react'
import { Box, Button, Stack, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AuditStatusChip from './AuditStatusChip'

function formatBudget(amount, currency = 'INR') {
  return `${Number(amount || 0).toLocaleString('en-IN')} ${currency}`
}

export default function AuditQueueTable({ rows = [], loading = false, onMarkAudited, onAddObservation }) {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const [selectedItem, setSelectedItem] = useState(null)
  const [observationText, setObservationText] = useState('')

  const columns = useMemo(() => [
    { field: 'id', headerName: 'Procurement ID', width: 150 },
    { field: 'title', headerName: 'Request Title', flex: 1.2, minWidth: 220 },
    { field: 'requestedBy', headerName: 'Employee Name', width: 170 },
    { field: 'department', headerName: 'Department', width: 150 },
    { field: 'vendor', headerName: 'Vendor', width: 180 },
    { field: 'amount', headerName: 'Budget', width: 140, valueFormatter: (params) => formatBudget(params?.row?.amount, params?.row?.currency) },
    { field: 'status', headerName: 'Procurement Status', width: 160 },
    { field: 'complianceStatus', headerName: 'Compliance Status', width: 180 },
    {
      field: 'auditStatus',
      headerName: 'Audit Status',
      width: 150,
      renderCell: ({ value }) => <AuditStatusChip status={value || 'Pending Audit'} />,
    },
    { field: 'auditDate', headerName: 'Audit Date', width: 140, valueGetter: (value, row) => row.auditDate || '—' },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 260,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <Button size="small" variant="outlined" onClick={() => navigate(`/procurement/${row.id}`)}>Details</Button>
          <Button size="small" color="warning" variant="contained" onClick={() => { setSelectedItem(row); setObservationText('') }}>Observe</Button>
          <Button size="small" color="success" variant="contained" onClick={() => onMarkAudited?.(row.id, user?.name || 'Auditor', new Date().toISOString().split('T')[0])}>Mark Audited</Button>
        </Stack>
      ),
    },
  ], [navigate, onMarkAudited, user?.name])

  return (
    <Box>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
        Auditor review queue for approved and compliant procurement requests.
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        autoHeight
        disableRowSelectionOnClick
        pageSizeOptions={[10, 25]}
        initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
        sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}
      />
      <Dialog open={Boolean(selectedItem)} onClose={() => setSelectedItem(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Audit Observation</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Add a note for {selectedItem?.title || 'this request'}.</Typography>
          <TextField multiline minRows={4} fullWidth label="Observation" value={observationText} onChange={(e) => setObservationText(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedItem(null)}>Cancel</Button>
          <Button variant="contained" color="warning" onClick={() => { onAddObservation?.(selectedItem.id, observationText, user?.name || 'Auditor', new Date().toISOString().split('T')[0]); setSelectedItem(null) }}>Save Observation</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
