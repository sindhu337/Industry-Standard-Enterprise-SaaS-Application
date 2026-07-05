import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchVendors, fetchVendorById, setVendorFilters } from '../vendorSlice'

export function useVendors() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, selected, loading, error, filters } = useSelector((state) => state.vendors)

  const loadAll = useCallback(() => dispatch(fetchVendors()), [dispatch])
  const loadById = useCallback((id) => dispatch(fetchVendorById(id)), [dispatch])
  const updateFilters = useCallback((f) => dispatch(setVendorFilters(f)), [dispatch])

  const filteredItems = useMemo(() => {
    let result = [...items]
    const search = (filters.search || '').toLowerCase()
    if (search) {
      result = result.filter((v) =>
        v.name.toLowerCase().includes(search) ||
        v.category.toLowerCase().includes(search) ||
        v.country.toLowerCase().includes(search) ||
        v.contactName.toLowerCase().includes(search)
      )
    }
    if (filters.status && filters.status !== 'All') {
      result = result.filter((v) => v.status === filters.status)
    }
    if (filters.riskLevel && filters.riskLevel !== 'All') {
      result = result.filter((v) => v.riskLevel === filters.riskLevel)
    }
    if (filters.category && filters.category !== 'All') {
      result = result.filter((v) => v.category === filters.category)
    }
    return result
  }, [items, filters])

  return {
    items,
    filteredItems,
    selected,
    loading,
    error,
    filters,
    loadAll,
    loadById,
    updateFilters,
    navigate,
  }
}
