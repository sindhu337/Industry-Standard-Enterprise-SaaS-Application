import { useMemo } from 'react'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { Visibility as ViewIcon } from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid'
import { AuditStatusChip, AuditTypeChip } from './AuditStatusChip'

export default function AuditTable({ rows = [], loading = false }) {
  const columns = useMemo(() => [
    { field: 'id', headerName: 'Audit ID', width: 90 },
    { field: 'title', headerName: 'Audit Title', flex: 1.5, minWidth: 200 },
    {
      field: 'type', headerName: 'Type', width: 120,
      renderCell: ({ value }) => <AuditTypeChip type={value} />,
    },
    {
      field: 'status', headerName: 'Status', width: 120,
      renderCell: ({ value }) => <AuditStatusChip status={value} />,
    },
    { field: 'auditor', headerName: 'Auditor/Assessor', width: 150 },
    {
      field: 'findings', headerName: 'Findings', width: 100,
      align: 'center', headerAlign: 'center',
      renderCell: ({ value }) => (
        <Typography variant="body2" fontWeight={700} color={value > 0 ? 'error.main' : 'success.main'}>
          {value}
        </Typography>
      ),
    },
    {
      field: 'criticalFindings', headerName: 'Critical', width: 100,
      align: 'center', headerAlign: 'center',
      renderCell: ({ value }) => (
        <Typography variant="body2" fontWeight={800} color={value > 0 ? 'error.dark' : 'text.secondary'}>
          {value}
        </Typography>
      ),
    },
    { field: 'startDate', headerName: 'Start Date', width: 120 },
    { field: 'endDate', headerName: 'End Date', width: 120 },
    {
      field: 'actions', headerName: '', width: 60, sortable: false, filterable: false,
      renderCell: ({ row }) => (
        <Tooltip title="View Details">
          <IconButton size="small" id={`btn-view-audit-${row.id}`}>
            <ViewIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ], [])

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      loading={loading}
      autoHeight
      disableRowSelectionOnClick
      pageSizeOptions={[10, 25]}
      initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
      sx={{
        borderRadius: 3, border: '1px solid', borderColor: 'divider',
        '& .MuiDataGrid-columnHeaders': { bgcolor: 'action.hover', fontWeight: 700 },
        '& .MuiDataGrid-row:hover': { bgcolor: 'action.hover' },
        '& .MuiDataGrid-cell': { display: 'flex', alignItems: 'center' },
      }}
    />
  )
}
