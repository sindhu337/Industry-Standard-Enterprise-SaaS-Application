/**
 * ProcurementListPage – Main procurement list/overview page
 */
import { useEffect } from 'react'
import { Box, Paper } from '@mui/material'

import PageContainer from '@/components/common/layout/PageContainer'
import ProcurementToolbar from '../components/ProcurementToolbar'
import ProcurementFilters from '../components/ProcurementFilters'
import ProcurementTable from '../components/ProcurementTable'
import { useProcurement } from '../hooks/useProcurement'

export default function ProcurementListPage() {
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

  return (
    <PageContainer>
      <ProcurementToolbar
        title="Procurement Workspace"
        subtitle="Manage corporate purchase requisitions, approval chains, and vendor budget compliance"
        loading={loading && filteredItems.length === 0}
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
