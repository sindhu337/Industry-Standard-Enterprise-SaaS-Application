import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuditReports, fetchAuditHistory, fetchSystemLogs, fetchUserActivities, loadAuditorQueue, markAuditItemAudited, addAuditObservation } from '../auditSlice'

export function useAudit() {
  const dispatch = useDispatch()
  const { reports, history, systemLogs, userActivities, queue, loading, error } = useSelector((state) => state.audit)

  const loadAll = useCallback(() => {
    dispatch(fetchAuditReports())
    dispatch(fetchAuditHistory())
    dispatch(fetchSystemLogs())
    dispatch(fetchUserActivities())
    dispatch(loadAuditorQueue())
  }, [dispatch])

  const markAudited = useCallback((id, auditedBy, auditDate) => dispatch(markAuditItemAudited({ id, auditedBy, auditDate })), [dispatch])
  const addObservation = useCallback((id, observation, auditorName, auditDate) => dispatch(addAuditObservation({ id, observation, auditorName, auditDate })), [dispatch])

  return {
    reports,
    history,
    systemLogs,
    userActivities,
    queue,
    loading,
    error,
    loadAll,
    markAudited,
    addObservation,
  }
}
