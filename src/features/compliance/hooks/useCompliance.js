import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchComplianceData, fetchViolations } from '../complianceSlice'

export function useCompliance() {
  const dispatch = useDispatch()
  const { items, violations, summary, loading, error } = useSelector((state) => state.compliance)

  const loadAll = useCallback(() => {
    dispatch(fetchComplianceData())
    dispatch(fetchViolations())
  }, [dispatch])

  return { items, violations, summary, loading, error, loadAll }
}
