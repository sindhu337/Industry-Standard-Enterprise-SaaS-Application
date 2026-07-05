import { useEffect } from 'react'
import { Box, Paper } from '@mui/material'
import PageContainer from '@/components/common/layout/PageContainer'
import VendorToolbar from './components/VendorToolbar'
import VendorFilters from './components/VendorFilters'
import VendorTable from './components/VendorTable'
import { useVendors } from './hooks/useVendors'

export default function VendorPage() {
  const { filteredItems, loading, filters, loadAll, updateFilters } = useVendors()

  useEffect(() => { loadAll() }, [loadAll])

  return (
    <PageContainer>
      <VendorToolbar
        title="Vendor Governance"
        subtitle="Manage vendor relationships, compliance scores, contracts, and risk ratings"
        loading={loading && filteredItems.length === 0}
      />

      <Paper
        elevation={0}
        sx={{ p: 2.5, mt: 2, mb: 2.5, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}
      >
        <VendorFilters filters={filters} onFilterChange={updateFilters} />
      </Paper>

      <VendorTable rows={filteredItems} loading={loading} />
    </PageContainer>
  )
}
