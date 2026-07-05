import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuditReports, fetchAuditHistory, fetchSystemLogs, fetchUserActivities } from '../auditSlice'

export function useAudit() {
  const dispatch = useDispatch()
  const { reports, history, systemLogs, userActivities, loading, error } = useSelector((state) => state.audit)

  const loadAll = useCallback(() => {
    dispatch(fetchAuditReports())
    dispatch(fetchAuditHistory())
    dispatch(fetchSystemLogs())
    dispatch(fetchUserActivities())
  }, [dispatch])

  return {
    reports,
    history,
    systemLogs,
    userActivities,
    loading,
    error,
    loadAll,
  }
}
