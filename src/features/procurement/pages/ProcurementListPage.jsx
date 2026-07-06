

import { useEffect, useMemo, useCallback } from 'react';
import { Box, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import PageContainer from '@/components/common/layout/PageContainer';
import ProcurementToolbar from '../components/ProcurementToolbar';
import ProcurementFilters from '../components/ProcurementFilters';
import ProcurementTable from '../components/ProcurementTable';
import { useProcurement } from '../hooks/useProcurement';
import { showSnackbar } from '@/app/store/slices/uiSlice';
import { exportProcurementPdf } from '../utils/exportProcurementPdf';

export default function ProcurementListPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user: authUser } = useSelector((state) => state.auth);
  const {
    filteredItems,
    loading,
    filters,
    user,
    loadAll,
    updateFilters,
    submitDelete
  } = useProcurement();

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const isEmployee = authUser?.role === 'Employee';
  const showMyRequests = isEmployee || location.state?.myRequests === true;
  const visibleRows = useMemo(() => {
    if (showMyRequests) {
      return filteredItems.filter((item) => item.requestedById === authUser?.id || item.requestedBy === authUser?.name);
    }
    return filteredItems;
  }, [showMyRequests, filteredItems, authUser?.id, authUser?.name]);

  const handleExport = useCallback(() => {
    try {
      const pdfTitle = showMyRequests ? 'My Procurement Requests' : 'Procurement Requisitions';
      exportProcurementPdf(visibleRows, pdfTitle);
      dispatch(
        showSnackbar({
          message: 'PDF report downloaded successfully.',
          severity: 'success'
        })
      );
    } catch {
      dispatch(
        showSnackbar({
          message: 'Failed to generate PDF. Please try again.',
          severity: 'error'
        })
      );
    }
  }, [showMyRequests, visibleRows, dispatch]);

  return (
    <PageContainer>
      <ProcurementToolbar
        title={showMyRequests ? 'My Requests' : 'Procurement Workspace'}
        subtitle={showMyRequests ? 'Requests created by you and currently tracked in the workspace.' : 'Manage corporate purchase requisitions, approval chains, and vendor budget compliance'}
        loading={loading && filteredItems.length === 0}
        onRefresh={loadAll}
        onExport={handleExport} />
      

      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          mt: 0,
          borderRadius: 1.5,
          border: '1px solid',
          borderColor: 'divider'
        }}>
        
        <ProcurementFilters filters={filters} onFilterChange={updateFilters} />
      </Paper>

      <Box>
        <ProcurementTable
          rows={visibleRows}
          loading={loading}
          user={authUser}
          onDelete={submitDelete} />
        
      </Box>
    </PageContainer>);

}