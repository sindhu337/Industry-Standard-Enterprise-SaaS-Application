


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Tooltip, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon } from
'@mui/icons-material';

import { StatusChip, PriorityChip } from './StatusChip';
import DeleteDialog from './DeleteDialog';

export default function ProcurementTable({
  rows,
  loading,
  user,
  onDelete
}) {
  const navigate = useNavigate();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const canEditRow = (row) =>
  user?.role === 'Administrator' ||
  user?.role === 'Procurement Manager' ||
  row.requestedById === user?.id;

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    await onDelete(deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
  };

  const columns = [
  {
    field: 'id',
    headerName: 'Procurement ID',
    width: 140,
    renderCell: (params) =>
    <Box
      component="span"
      sx={{
        fontWeight: 700,
        color: 'primary.main',
        cursor: 'pointer',
        '&:hover': { textDecoration: 'underline' }
      }}
      onClick={() => navigate(`/procurement/${params.value}`)}>
      
          {params.value}
        </Box>

  },
  {
    field: 'title',
    headerName: 'Request Title',
    flex: 1.5,
    minWidth: 200
  },
  {
    field: 'department',
    headerName: 'Department',
    width: 130
  },
  {
    field: 'requestedBy',
    headerName: 'Requested By',
    width: 140
  },
  {
    field: 'vendor',
    headerName: 'Vendor',
    width: 160
  },
  {
    field: 'amount',
    headerName: 'Budget',
    width: 140,
    type: 'number',
    valueFormatter: (value) => {
      if (value == null) return '';
      return `₹${Number(value).toLocaleString('en-IN')}`;
    },
    headerAlign: 'left',
    align: 'left'
  },
  {
    field: 'priority',
    headerName: 'Priority',
    width: 110,
    renderCell: (params) => <PriorityChip priority={params.value} />
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
    renderCell: (params) => <StatusChip status={params.value} />
  },
  {
    field: 'requestedDate',
    headerName: 'Request Date',
    width: 130
  },
  {
    field: 'lastUpdated',
    headerName: 'Last Updated',
    width: 130
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 130,
    sortable: false,
    filterable: false,
    renderCell: (params) =>
    <Box sx={{ display: 'flex', gap: 0.5, height: '100%', alignItems: 'center' }}>
          <Tooltip title="View Details">
            <IconButton
          size="small"
          color="primary"
          id={`btn-view-${params.row.id}`}
          onClick={() => navigate(`/procurement/${params.row.id}`)}>
          
              <ViewIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          {canEditRow(params.row) &&
      <>
              <Tooltip title="Edit Requisition">
                <IconButton
            size="small"
            color="info"
            id={`btn-edit-${params.row.id}`}
            onClick={() => navigate(`/procurement/${params.row.id}/edit`)}>
            
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete">
                <IconButton
            size="small"
            color="error"
            id={`btn-delete-${params.row.id}`}
            onClick={() => setDeleteTarget(params.row)}>
            
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
      }
        </Box>

  }];


  return (
    <>
      <Paper
        sx={{
          width: '100%',
          borderRadius: 1.5,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider'
        }}
        elevation={0}>
        
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          pageSizeOptions={[5, 10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } }
          }}
          disableRowSelectionOnClick
          autoHeight
          sx={{
            border: 'none',
            '& .MuiDataGrid-columnHeaders': {
              bgcolor: 'action.selected',
              fontWeight: 700,
              fontSize: '0.78rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            },
            '& .MuiDataGrid-row:hover': {
              bgcolor: 'action.hover'
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid',
              borderColor: 'divider',
              alignItems: 'center',
              display: 'flex'
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: '1px solid',
              borderColor: 'divider'
            }
          }} />
        
      </Paper>

      <DeleteDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        item={deleteTarget}
        loading={deleting} />
      
    </>);

}