import { useMemo } from 'react'
import { Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { SeverityChip, ComplianceStatusChip } from './ComplianceStatusChip'

export default function ViolationsTable({ rows = [], loading = false }) {
  const columns = useMemo(() => [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'framework', headerName: 'Framework', width: 120 },
    { field: 'title', headerName: 'Violation', flex: 1.5, minWidth: 220 },
    {
      field: 'severity', headerName: 'Severity', width: 120,
      renderCell: ({ value }) => <SeverityChip severity={value} />,
    },
    {
      field: 'status', headerName: 'Status', width: 130,
      renderCell: ({ value }) => {
        const statusMap = {
          Open: 'Non-Compliant',
          'In Progress': 'Under Review',
          Closed: 'Compliant',
        }
        return <ComplianceStatusChip status={statusMap[value] || value} />
      },
    },
    { field: 'owner', headerName: 'Owner', width: 130 },
    { field: 'reportedDate', headerName: 'Reported', width: 115 },
    { field: 'dueDate', headerName: 'Due Date', width: 110 },
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
