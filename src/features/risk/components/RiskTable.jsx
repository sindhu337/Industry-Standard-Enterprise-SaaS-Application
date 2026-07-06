import { useMemo } from 'react'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { Visibility as ViewIcon } from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid'
import { RiskLevelChip, RiskStatusChip } from './RiskLevelChip'

export default function RiskTable({ rows = [], loading = false }) {
  const columns = useMemo(() => [
    { field: 'id', headerName: 'Risk ID', width: 90 },
    { field: 'title', headerName: 'Risk Title', flex: 1.5, minWidth: 200 },
    { field: 'category', headerName: 'Category', width: 130 },
    { field: 'owner', headerName: 'Owner', width: 130 },
    {
      field: 'probability', headerName: 'Prob', width: 70,
      align: 'center', headerAlign: 'center',
      renderCell: ({ value }) => (
        <Typography variant="body2" fontWeight={700}>{value}/5</Typography>
      ),
    },
    {
      field: 'impact', headerName: 'Impact', width: 75,
      align: 'center', headerAlign: 'center',
      renderCell: ({ value }) => (
        <Typography variant="body2" fontWeight={700}>{value}/5</Typography>
      ),
    },
    {
      field: 'score', headerName: 'Score', width: 75,
      align: 'center', headerAlign: 'center',
      renderCell: ({ value }) => (
        <Typography
          variant="body2" fontWeight={800}
          color={value >= 15 ? 'error.main' : value >= 10 ? 'warning.dark' : value >= 6 ? 'warning.light' : 'success.main'}
        >
          {value}
        </Typography>
      ),
    },
    {
      field: 'level', headerName: 'Level', width: 110,
      renderCell: ({ value }) => <RiskLevelChip level={value} />,
    },
    {
      field: 'status', headerName: 'Status', width: 120,
      renderCell: ({ value }) => <RiskStatusChip status={value} />,
    },
    { field: 'reviewDate', headerName: 'Review Date', width: 120 },
    {
      field: 'actions', headerName: '', width: 60, sortable: false, filterable: false,
      renderCell: ({ row }) => (
        <Tooltip title="View Risk">
          <IconButton size="small" id={`btn-view-risk-${row.id}`}>
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
      pageSizeOptions={[10, 25, 50]}
      initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
      sx={{
        borderRadius: 1.5, border: '1px solid', borderColor: 'divider',
        '& .MuiDataGrid-columnHeaders': { bgcolor: 'action.hover', fontWeight: 700 },
        '& .MuiDataGrid-row:hover': { bgcolor: 'action.hover' },
        '& .MuiDataGrid-cell': { display: 'flex', alignItems: 'center' },
      }}
    />
  )
}
