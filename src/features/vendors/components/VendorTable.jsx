import { useMemo } from 'react'
import { Box, IconButton, Tooltip, LinearProgress } from '@mui/material'
import { Visibility as ViewIcon, Edit as EditIcon } from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import { VendorStatusChip, VendorRiskChip } from './VendorStatusChip'

function ComplianceBar({ score }) {
  const color = score >= 85 ? 'success' : score >= 65 ? 'warning' : 'error'
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
      <LinearProgress
        variant="determinate"
        value={score}
        color={color}
        sx={{ flexGrow: 1, height: 6, borderRadius: 1.5 }}
      />
      <Box sx={{ fontSize: '0.75rem', fontWeight: 700, minWidth: 30, color: `${color}.main` }}>
        {score}%
      </Box>
    </Box>
  )
}

export default function VendorTable({ rows = [], loading = false }) {
  const navigate = useNavigate()

  const columns = useMemo(() => [
    { field: 'id', headerName: 'Vendor ID', width: 90 },
    { field: 'name', headerName: 'Vendor Name', flex: 1.4, minWidth: 180 },
    { field: 'category', headerName: 'Category', width: 140 },
    { field: 'country', headerName: 'Country', width: 110 },
    {
      field: 'status', headerName: 'Status', width: 130,
      renderCell: ({ value }) => <VendorStatusChip status={value} />,
    },
    {
      field: 'riskLevel', headerName: 'Risk', width: 110,
      renderCell: ({ value }) => <VendorRiskChip level={value} />,
    },
    {
      field: 'complianceScore', headerName: 'Compliance', width: 160,
      renderCell: ({ value }) => <ComplianceBar score={value} />,
    },
    {
      field: 'totalSpend', headerName: 'Total Spend', width: 140,
      renderCell: ({ value }) => `$${(value / 1000).toFixed(0)}K`,
      align: 'right', headerAlign: 'right',
    },
    {
      field: 'activeContracts', headerName: 'Active Contracts', width: 140,
      align: 'center', headerAlign: 'center',
    },
    {
      field: 'actions', headerName: 'Actions', width: 100, sortable: false, filterable: false,
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title="View Details">
            <IconButton size="small" onClick={() => navigate(`/vendors/${row.id}`)} id={`btn-view-vendor-${row.id}`}>
              <ViewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => navigate(`/vendors/${row.id}/edit`)} id={`btn-edit-vendor-${row.id}`}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ], [navigate])

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
        borderRadius: 1.5,
        border: '1px solid',
        borderColor: 'divider',
        '& .MuiDataGrid-columnHeaders': { bgcolor: 'action.hover', fontWeight: 700 },
        '& .MuiDataGrid-row:hover': { bgcolor: 'action.hover' },
        '& .MuiDataGrid-cell': { display: 'flex', alignItems: 'center' },
      }}
    />
  )
}
