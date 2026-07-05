/**
 * ProcurementListPage – Main procurement list/overview page
 */
import { useEffect } from 'react'
import { Box, Paper } from '@mui/material'
import { useDispatch } from 'react-redux'

import PageContainer from '@/components/common/layout/PageContainer'
import ProcurementToolbar from '../components/ProcurementToolbar'
import ProcurementFilters from '../components/ProcurementFilters'
import ProcurementTable from '../components/ProcurementTable'
import { useProcurement } from '../hooks/useProcurement'
import { showSnackbar } from '@/app/store/slices/uiSlice'

export default function ProcurementListPage() {
  const dispatch = useDispatch()
  const {
    filteredItems,
    loading,
    filters,
    user,
    loadAll,
    updateFilters,
    submitDelete,
  } = useProcurement()

  useEffect(() => {
    loadAll()
  }, [loadAll])

  const handleExport = () => {
    dispatch(
      showSnackbar({
        message: 'CSV export completed successfully (Demo mode).',
        severity: 'success',
      }),
    )
  }

  return (
    <PageContainer>
      <ProcurementToolbar
        title="Procurement Workspace"
        subtitle="Manage corporate purchase requisitions, approval chains, and vendor budget compliance"
        loading={loading && filteredItems.length === 0}
        onRefresh={loadAll}
        onExport={handleExport}
      />

      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          mt: 2,
          mb: 2.5,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <ProcurementFilters filters={filters} onFilterChange={updateFilters} />
      </Paper>

      <Box>
        <ProcurementTable
          rows={filteredItems}
          loading={loading}
          user={user}
          onDelete={submitDelete}
        />
      </Box>
    </PageContainer>
  )
}
