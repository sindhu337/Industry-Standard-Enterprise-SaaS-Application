import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRisks, fetchRiskSummary, setRiskFilters } from '../riskSlice'

export function useRisk() {
  const dispatch = useDispatch()
  const { items, summary, trendData, categoryBreakdown, loading, error, filters } =
    useSelector((state) => state.risk)

  const loadAll = useCallback(() => {
    dispatch(fetchRisks())
    dispatch(fetchRiskSummary())
  }, [dispatch])

  const updateFilters = useCallback((f) => dispatch(setRiskFilters(f)), [dispatch])

  return { items, summary, trendData, categoryBreakdown, loading, error, filters, loadAll, updateFilters }
}
