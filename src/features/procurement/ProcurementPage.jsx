import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Chip,
  IconButton,
  Tooltip,
  Paper,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import {
  Add as AddIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material'

import PageContainer from '@/components/common/layout/PageContainer'
import { fetchProcurements, deleteProcurement, setFilters } from './procurementSlice'
import { showSnackbar } from '@/app/store/slices/uiSlice'
import { ROUTES } from '@/constants/routes'

export default function ProcurementPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, loading, filters } = useSelector((state) => state.procurement)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchProcurements())
  }, [dispatch])

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete request ${id}?`)) {
      dispatch(deleteProcurement(id))
      dispatch(showSnackbar({ message: `Request ${id} deleted successfully.`, severity: 'success' }))
    }
  }

  const handleSearchChange = (e) => {
    dispatch(setFilters({ search: e.target.value }))
  }

  const handleStatusFilterChange = (e) => {
    dispatch(setFilters({ status: e.target.value }))
  }

  const handlePriorityFilterChange = (e) => {
    dispatch(setFilters({ priority: e.target.value }))
  }

  // Filter items in memory
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.id.toLowerCase().includes(filters.search.toLowerCase()) ||
      (item.vendor && item.vendor.toLowerCase().includes(filters.search.toLowerCase()))
    
    const matchesStatus = filters.status === 'All' || item.status === filters.status
    const matchesPriority = filters.priority === 'All' || item.priority === filters.priority

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusChip = (status) => {
    let color = 'default'
    if (status === 'Approved') color = 'success'
    else if (status === 'Pending Approval') color = 'warning'
    else if (status === 'Rejected') color = 'error'
    return <Chip label={status} color={color} size="small" sx={{ fontWeight: 'bold' }} />
  }

  const getPriorityChip = (priority) => {
    let color = 'default'
    if (priority === 'Critical') color = 'error'
    else if (priority === 'High') color = 'warning'
    else if (priority === 'Medium') color = 'info'
    return <Chip label={priority} color={color} variant="outlined" size="small" sx={{ fontWeight: 'bold' }} />
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 130, renderCell: (params) => <strong>{params.value}</strong> },
    { field: 'title', headerName: 'Request Title', flex: 1, minWidth: 200 },
    { field: 'department', headerName: 'Department', width: 130 },
    { field: 'vendor', headerName: 'Vendor', width: 160 },
    {
      field: 'amount',
      headerName: 'Budget',
      width: 140,
      valueGetter: (value, row) => `${row.amount.toLocaleString()} ${row.currency || 'USD'}`,
    },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 120,
      renderCell: (params) => getPriorityChip(params.value),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => getStatusChip(params.value),
    },
    { field: 'requestedDate', headerName: 'Request Date', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 0.5, height: '100%', alignItems: 'center' }}>
          <Tooltip title="View Details">
            <IconButton onClick={() => navigate(`/procurement/${params.row.id}`)} size="small" color="primary">
              <ViewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {(user?.role === 'Administrator' || user?.role === 'Procurement Manager' || params.row.requestedById === user?.id) && (
            <>
              <Tooltip title="Edit Request">
                <IconButton onClick={() => navigate(`/procurement/create`, { state: { editId: params.row.id } })} size="small" color="info">
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={() => handleDelete(params.row.id)} size="small" color="error">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Box>
      ),
    },
  ]

  return (
    <PageContainer>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Procurement Workspace
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Manage corporate purchase requisitions, approval chains, and vendor budget compliance
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate(ROUTES.PROCUREMENT_CREATE)}
          sx={{ borderRadius: 2, px: 2.5, py: 1.2, fontWeight: 'bold' }}
        >
          Create Requisition
        </Button>
      </Box>

      <Paper sx={{ p: 2.5, mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', borderRadius: 2 }}>
        <TextField
          size="small"
          placeholder="Search requests, IDs, vendors..."
          value={filters.search}
          onChange={handleSearchChange}
          slotProps={{
            input: {
              startAdornment: <SearchIcon fontSize="small" color="action" sx={{ mr: 1 }} />,
            },
          }}
          sx={{ flexGrow: 1, minWidth: 260 }}
        />

        <TextField
          select
          size="small"
          label="Status"
          value={filters.status}
          onChange={handleStatusFilterChange}
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="All">All Statuses</MenuItem>
          <MenuItem value="Draft">Draft</MenuItem>
          <MenuItem value="Pending Approval">Pending Approval</MenuItem>
          <MenuItem value="Approved">Approved</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
        </TextField>

        <TextField
          select
          size="small"
          label="Priority"
          value={filters.priority}
          onChange={handlePriorityFilterChange}
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="All">All Priorities</MenuItem>
          <MenuItem value="Critical">Critical</MenuItem>
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </TextField>
      </Paper>

      <Paper sx={{ width: '100%', height: 500, borderRadius: 2, overflow: 'hidden' }}>
        <DataGrid
          rows={filteredItems}
          columns={columns}
          loading={loading}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
          disableRowSelectionOnClick
          sx={{
            border: 'none',
            '& .MuiDataGrid-columnHeaders': {
              bgcolor: 'action.hover',
              borderBottom: '1px solid',
              borderColor: 'divider',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid',
              borderColor: 'divider',
            },
          }}
        />
      </Paper>
    </PageContainer>
  )
}
