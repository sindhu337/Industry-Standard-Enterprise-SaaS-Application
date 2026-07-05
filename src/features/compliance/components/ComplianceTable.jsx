import { useMemo } from 'react'
import { Box, LinearProgress, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { ComplianceStatusChip } from './ComplianceStatusChip'

export default function ComplianceTable({ rows = [], loading = false }) {
  const columns = useMemo(() => [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'framework', headerName: 'Framework', width: 130 },
    {
      field: 'status', headerName: 'Status', width: 145,
      renderCell: ({ value }) => <ComplianceStatusChip status={value} />,
    },
    {
      field: 'score', headerName: 'Score', width: 160,
      renderCell: ({ value }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
          <LinearProgress
            variant="determinate"
            value={value}
            color={value >= 85 ? 'success' : value >= 65 ? 'warning' : 'error'}
            sx={{ flexGrow: 1, height: 6, borderRadius: 3 }}
          />
          <Typography variant="caption" fontWeight={700} sx={{ minWidth: 30 }}>{value}%</Typography>
        </Box>
      ),
    },
    { field: 'owner', headerName: 'Owner', width: 140 },
    {
      field: 'controls', headerName: 'Controls', width: 100,
      align: 'center', headerAlign: 'center',
      renderCell: ({ row }) => (
        <Typography variant="body2">{row.passed}/{row.controls}</Typography>
      ),
    },
    {
      field: 'findings', headerName: 'Findings', width: 90,
      align: 'center', headerAlign: 'center',
      renderCell: ({ value }) => (
        <Typography variant="body2" fontWeight={700} color={value > 0 ? 'error.main' : 'success.main'}>
          {value}
        </Typography>
      ),
    },
    { field: 'lastAudit', headerName: 'Last Audit', width: 115 },
    { field: 'nextAudit', headerName: 'Next Audit', width: 115 },
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
